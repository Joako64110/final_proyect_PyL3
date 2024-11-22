import React, { useEffect, useState } from "react";
import CustomTable from "../../ui/featureds/featuredTables/customTables";
import TopBar from "../../ui/topBar/topBar";
import Actions from "../../ui/Actions/actions";
import CrearArticulo from "../../modals/CrearArticulo/CrearArticulo";
import SideBarFunc from "../../../components/ui/SideBarr/SideBarFun/SideBarFun";
import { fetchArticulosBySucursal, createArticulo, updateArticulo, deleteArticulo } from "../../../services/ProductoService";
import { ICategorias } from "../../../types/ICategorias";
import { IAlergenos } from "../../../types/IAlergenos";
import { IImagen } from "../../../types/IImagen";

export const Productos = () => {
    const columns = ["Nombre", "Precio", "Descripción", "Categoría", "Habilitado", "Acciones"];
    const [data, setData] = useState<Array<{ id: number; Nombre: string; Precio: number; Descripción: string; Categoría: string; Habilitado: boolean; Acciones: JSX.Element; }>>([]);
    const [isArticuloOpen, setIsArticuloOpen] = useState(false);
    const [isProductViewOpen, setIsProductViewOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewingProduct, setViewingProduct] = useState<any>(null);
    const sucursalId = 1;

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const articulos = await fetchArticulosBySucursal(sucursalId);
                const formattedData = articulos.map((articulo: any) => ({
                    id: articulo.id,
                    Nombre: articulo.denominacion,
                    Precio: articulo.precioVenta,
                    Descripción: articulo.descripcion,
                    Categoría: articulo.categoria?.nombre || "Sin categoría",
                    Habilitado: articulo.habilitado,
                    Acciones: (
                        <Actions
                            id={articulo.id}
                            actions={["ver", "editar", "eliminar"]}
                            onVer={() => handleViewProduct(articulo)}
                            onEditar={() => handleEditProduct(articulo)}
                            onEliminar={() => handleDeleteProduct(articulo.id)}
                        />
                    ),
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Error al obtener los artículos:", error);
            }
        };

        fetchArticulos();
    }, [sucursalId]);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsArticuloOpen(true);
    };

    const closeArticuloModal = () => {
        setIsArticuloOpen(false);
    };

    const handleViewProduct = (product: any) => {
        setViewingProduct(product);
        setIsProductViewOpen(true);
    };

    const closeProductViewModal = () => {
        setIsProductViewOpen(false);
    };

    const addProductToList = async (product: { Nombre: string; Precio: number; Descripción: string; Habilitado: boolean; Codigo: string; Imagenes: IImagen[]; IdCategoria: number; IdAlergenos: number[] }) => {
        try {
            const newProduct = await createArticulo({
                denominacion: product.Nombre,
                precioVenta: product.Precio,
                descripcion: product.Descripción,
                habilitado: product.Habilitado,
                codigo: product.Codigo, 
                imagenes: product.Imagenes, 
                idCategoria: product.IdCategoria, 
                idAlergenos: product.IdAlergenos, 
            });
    
            setData((prevData) => [
                ...prevData,
                {
                    id: newProduct.id,
                    Nombre: newProduct.denominacion,
                    Precio: newProduct.precioVenta.toString(),
                    Descripción: newProduct.descripcion,
                    Categoría: newProduct.categoria?.nombre || "Sin categoría",
                    Habilitado: newProduct.habilitado,
                    Acciones: (
                        <Actions
                            id={newProduct.id}
                            actions={["ver", "editar", "eliminar"]}
                            onVer={() => handleViewProduct(newProduct)}
                            onEditar={() => handleEditProduct(newProduct)}
                            onEliminar={() => handleDeleteProduct(newProduct.id)}
                        />
                    ),
                },
            ]);
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }
    };

    const handleEditProduct = (product: any) => {
        setEditingProduct(product);
        setIsArticuloOpen(true);
    };

    const handleUpdateProduct = async (id: number, updatedProduct: any) => {
        try {
            const updatedArticulo = await updateArticulo(id, updatedProduct);
            const articulos = await fetchArticulosBySucursal(sucursalId);
            setData(articulos);
        } catch (error) {
            console.error("Error al actualizar el artículo:", error);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmation) {
            try {
                await deleteArticulo(id);
                setData((prevData) => prevData.filter((producto) => producto.id !== id));
            } catch (error) {
                console.error("Error al eliminar el artículo:", error);
            }
        }
    };

    const filteredData = data.filter((product) =>
        product.Nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container-screen">
            <SideBarFunc />
            <div className="featured">
                <TopBar
                    nombre="Masco Mida - Palmares"
                    placeholder="Filtrar..."
                    onAddBranch={handleAddProduct}
                    tareaBoton="Agregar Artículo"
                    setSearchQuery={setSearchQuery}
                />

                <CustomTable columns={columns} data={filteredData} />

                {isArticuloOpen && (
                    <CrearArticulo
                        onClose={closeArticuloModal}
                        onAddProduct={addProductToList}
                        onUpdateProduct={handleUpdateProduct}
                        editingProduct={editingProduct}
                    />
                )}

                {isProductViewOpen && viewingProduct && (
                    <div className="view-product-modal">
                        <div className="modal-content">
                            <h2>{viewingProduct.Nombre}</h2>
                            <p><strong>Precio:</strong> {viewingProduct.Precio}</p>
                            <p><strong>Descripción:</strong> {viewingProduct.Descripción}</p>
                            <p><strong>Categoría:</strong> {viewingProduct.Categoría}</p>
                            <p><strong>Habilitado:</strong> {viewingProduct.Habilitado ? "Sí" : "No"}</p>
                            <button onClick={closeProductViewModal}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Productos;
