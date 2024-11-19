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
    const [editingProduct, setEditingProduct] = useState<any>(null); // Producto en edición
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
        setEditingProduct(null); // No hay producto en edición
        setIsArticuloOpen(true); // Abre el modal
    };

    // Cierra el modal
    const closeArticuloModal = () => {
        setIsArticuloOpen(false); // Cierra el modal
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
        setEditingProduct(product); // Configura el producto en edición
        setIsArticuloOpen(true); // Abre el modal
    };

    // Actualiza un producto
    const handleUpdateProduct = async (id: number, updatedProduct: any) => {
        try {
            const updatedArticulo = await updateArticulo(id, updatedProduct);
            setData((prevData) =>
                prevData.map((articulo) =>
                    articulo.id === id
                        ? {
                              ...articulo,
                              Nombre: updatedArticulo.denominacion,
                              Precio: updatedArticulo.precioVenta,
                              Descripción: updatedArticulo.descripcion,
                              Categoría: updatedArticulo.categoria?.nombre || "Sin categoría",
                              Habilitado: updatedArticulo.habilitado,
                          }
                        : articulo
                )
            );
        } catch (error) {
            console.error("Error al actualizar el artículo:", error);
        }
    };

    // Ver un producto
    const handleViewProduct = (product: any) => {
        console.log(product);
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

    return (
        <div className="container-screen">
            <SideBarFunc />
            <div className="featured">
                <TopBar
                    nombre="Masco Mida - Palmares"
                    placeholder="Seleccione una Categoría..."
                    onAddBranch={handleAddProduct} // Abre el modal al hacer clic en el botón
                    tareaBoton="Agregar Producto"
                />
                <CustomTable columns={columns} data={data} />
                {isArticuloOpen && (
                    <CrearArticulo
                        onClose={closeArticuloModal} // Cierra el modal
                        onAddProduct={addProductToList} // Agrega un nuevo producto
                        onUpdateProduct={handleUpdateProduct} // Actualiza el producto
                        editingProduct={editingProduct} // Producto que se está editando
                    />
                )}
            </div>
        </div>
    );
};

export default Productos;
