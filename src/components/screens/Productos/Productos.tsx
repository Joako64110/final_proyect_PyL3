import React, { useEffect, useState } from "react";
import CustomTable from "../../ui/featureds/featuredTables/customTables";
import TopBar from "../../ui/topBar/topBar";
import Actions from "../../ui/Actions/actions";
import CrearArticulo from "../../modals/CrearArticulo/CrearArticulo";
import SideBarFunc from "../../ui/SideBarr/SideBarSuc/SideBarFun";
import { fetchArticulosBySucursal, createArticulo, updateArticulo, deleteArticulo } from "../../../services/ProductoService";

export const Productos = () => {
    const columns = ["Nombre", "Precio", "Descripción", "Categoría", "Habilitado", "Acciones"];
    const [data, setData] = useState<Array<{ id: number; Nombre: string; Precio: number; Descripción: string; Categoría: string; Habilitado: boolean; Acciones: JSX.Element; }>>([]);
    const [isArticuloOpen, setIsArticuloOpen] = useState(false); // Control del modal
    const [isProductViewOpen, setIsProductViewOpen] = useState(false); // Control del modal de ver producto
    const [editingProduct, setEditingProduct] = useState<any>(null); // Producto en edición
    const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
    const [viewingProduct, setViewingProduct] = useState<any>(null); // Producto a ver
    const sucursalId = 1; // Cambia esto a la sucursal seleccionada dinámicamente.

    // Obtener artículos desde la API
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

    // Abre el modal para agregar un nuevo producto
    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsArticuloOpen(true);
    };

    // Cierra el modal de edición/creación
    const closeArticuloModal = () => {
        setIsArticuloOpen(false);
    };

    // Abre el modal para ver los detalles del producto
    const handleViewProduct = (product: any) => {
        setViewingProduct(product);
        setIsProductViewOpen(true);
    };

    // Cierra el modal de ver producto
    const closeProductViewModal = () => {
        setIsProductViewOpen(false);
    };

    // Agrega el producto a la lista
    const addProductToList = async (product: { Nombre: string; Precio: number; Descripción: string; Categoría: string; Habilitado: boolean; }) => {
        try {
            const newProduct = await createArticulo({
                denominacion: product.Nombre,
                precioVenta: product.Precio,
                descripcion: product.Descripción,
                categoria: product.Categoría,
                habilitado: product.Habilitado,
            });

            setData((prevData) => [
                ...prevData,
                {
                    id: newProduct.id,
                    Nombre: newProduct.denominacion,
                    Precio: newProduct.precioVenta,
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

    // Editar un producto
    const handleEditProduct = (product: any) => {
        setEditingProduct(product);
        setIsArticuloOpen(true);
    };

    // Actualiza un producto
    const handleUpdateProduct = async (id: number, updatedProduct: any) => {
        try {
            const updatedArticulo = await updateArticulo(id, updatedProduct);
            // Volver a cargar los productos actualizados
            const articulos = await fetchArticulosBySucursal(sucursalId);
            setData(articulos);
        } catch (error) {
            console.error("Error al actualizar el artículo:", error);
        }
    };

    // Eliminar un producto
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

    // Filtrar los productos basados en la consulta de búsqueda
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
                    setSearchQuery={setSearchQuery} // Pasar el setter de búsqueda
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
