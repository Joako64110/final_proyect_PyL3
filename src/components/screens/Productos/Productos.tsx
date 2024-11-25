import React, { useEffect, useState } from "react";
import CustomTable from "../../ui/featureds/Tables/customTables";
import TopBar from "../../ui/topBar/topBar";
import Actions from "../../ui/Actions/actions";
import CrearArticulo from "../../modals/CrearArticulo/CrearArticulo";
import SideBarFunc from "../../../components/ui/SideBarr/SideBarFun/SideBarFun";
import { fetchArticulosBySucursal, createArticulo, updateArticulo, deleteArticulo } from "../../../services/ProductoService";
import sucursalesService from "../../../services/SucursalService";
import Swal from "sweetalert2";
import { MostrarProducto } from "../../modals/MostrarProducto/MostrarProducto";

export const Productos = () => {
    const columns = ["Nombre", "Precio", "Descripción", "Categoría", "Habilitado", "Acciones"];
    const [data, setData] = useState<Array<{
        id: number;
        Nombre: string;
        Precio: number;
        Descripción: string;
        Categoría: string;
        Habilitado: string;
        Acciones: JSX.Element;
    }>>([]);
    const [isArticuloOpen, setIsArticuloOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sucursalNombre, setSucursalNombre] = useState<string>("");
    const [isProductViewOpen, setIsProductViewOpen] = useState(false); 
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    useEffect(() => {
        const fetchArticulos = async () => {
            const sucursalId = localStorage.getItem("idSucursal");
            if (!sucursalId) {
                console.error("No se encontró el idSucursal en el localStorage.");
                return;
            }
    
            try {
                const articulos = await fetchArticulosBySucursal(parseInt(sucursalId, 10));
                if (articulos.length === 0) {
                    console.log("Aún no hay artículos en esta sucursal.");
                }
                const formattedData = articulos.map((articulo: any) => ({
                    id: articulo.id,
                    Nombre: articulo.denominacion,
                    Precio: articulo.precioVenta,
                    Descripción: articulo.descripcion,
                    Categoría: articulo.categoria?.denominacion || "Sin categoría",
                    Habilitado: articulo.habilitado ? "Sí" : "No",
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
    }, []);

    useEffect(() => {
        const fetchSucursalNombre = async () => {
            const idSucursal = localStorage.getItem("idSucursal");
            if (!idSucursal) {
                console.error("idSucursal no encontrado en el localStorage");
                return;
            }
        
            try {
                const sucursal = await sucursalesService.getSucursalById(Number(idSucursal));
                setSucursalNombre(sucursal.nombre); 
            } catch (error) {
                console.error("Error al obtener la sucursal:", error);
            }
        };
    
        fetchSucursalNombre();
    }, []); 

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsArticuloOpen(true);
    };

    const closeArticuloModal = () => {
        setIsArticuloOpen(false);
    };

    const handleViewProduct = (product: any) => {
        setSelectedProduct(product); 
        setIsProductViewOpen(true); 
    };

    const closeProductViewModal = () => {
        setIsProductViewOpen(false); 
    };

    const fetchArticulos = async () => {
        const sucursalId = localStorage.getItem("idSucursal");
        if (!sucursalId) {
            console.error("No se encontró el idSucursal en el localStorage.");
            return;
        }

        try {
            const articulos = await fetchArticulosBySucursal(parseInt(sucursalId, 10));
            if (articulos.length === 0) {
            }
            const formattedData = articulos.map((articulo: any) => ({
                id: articulo.id,
                Nombre: articulo.denominacion,
                Precio: articulo.precioVenta,
                Descripción: articulo.descripcion,
                Categoría: articulo.categoria?.denominacion || "Sin categoría",
                Habilitado: articulo.habilitado ? "Sí" : "No",
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

    const handleUpdateProduct = async (updatedProduct: any) => {
        try {
            if (!updatedProduct.id) {
                throw new Error("El producto actualizado no contiene un ID.");
            }
    
            const updatedArticulo = await updateArticulo(updatedProduct.id, updatedProduct);
        
            await fetchArticulos();
    
            closeArticuloModal();
    
    
        } catch (error) {
        }
    };
    
    const addNewProductToList = (newProduct: any) => {
        setData((prevData) => [
            ...prevData,
            {
                id: newProduct.id,
                Nombre: newProduct.denominacion,
                Precio: newProduct.precioVenta.toString(),
                Descripción: newProduct.descripcion,
                Categoría: newProduct.categoria?.denominacion || "Sin categoría",
                Habilitado: newProduct.habilitado ? "Sí" : "No",
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
        closeArticuloModal();
    };

    const handleEditProduct = (product: any) => {
        setEditingProduct(product);
        setIsArticuloOpen(true);
    };

    const handleDeleteProduct = async (id: number) => {
        const result = await Swal.fire({
            title: "¿Estás seguro de eliminar este producto?",
            text: "¡Esta acción no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        });
    
        if (result.isConfirmed) {
            try {
                await deleteArticulo(id);
                setData((prevData) => prevData.filter((producto) => producto.id !== id));
                Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
            } catch (error) {
                console.error("Error al eliminar el artículo:", error);
                Swal.fire("Error", "Hubo un problema al eliminar el producto.", "error");
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
                    nombre={sucursalNombre}
                    placeholder="Filtrar..."
                    onAddBranch={handleAddProduct}
                    tareaBoton="Agregar Artículo"
                    setSearchQuery={setSearchQuery}
                />

                {filteredData.length > 0 ? (
                    <CustomTable columns={columns} data={filteredData} />
                ) : (
                    <h3 style={{ textAlign: "center", marginTop: "20px" }}>Aún no hay artículos</h3>
                )}
                {isArticuloOpen && (
                    <CrearArticulo
                        onClose={closeArticuloModal}
                        onProductCreated={addNewProductToList}
                        title={editingProduct ? "Editar Artículo" : "Crear Artículo"}
                        editingProduct={editingProduct}
                        onUpdateProduct={handleUpdateProduct} // Pasamos la función de actualización aquí
                    />
                )}
                                {isProductViewOpen && selectedProduct && (
                    <MostrarProducto producto={selectedProduct} onClose={closeProductViewModal} />
                )}
            </div>
        </div>
    );
};

export default Productos;
