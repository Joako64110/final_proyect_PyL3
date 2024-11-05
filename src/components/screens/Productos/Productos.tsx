import React, { useState } from "react";
import CustomTable from "../../ui/featureds/featuredTables/customTables";
import TopBar from "../../ui/featureds/topBar/topBar";
import Actions from "../../ui/Actions/actions";
import CrearArticulo from "../../modals/CrearArticulo/CrearArticulo";

export const Productos = () => {
    const columns = ["Nombre", "Precio", "Descripción", "Categoría", "Habilitado", "Acciones"];

    const [data, setData] = useState<Array<{
        Nombre: string;
        Precio: number;
        Descripción: string;
        Categoría: string;
        Habilitado: boolean;
        Acciones: JSX.Element;
    }>>([]);

    const [isArticuloOpen, setIsArticuloOpen] = useState(false);

    const handleAddProduct = () => {
        setIsArticuloOpen(true);
    };

    const closeArticuloModal = () => {
        setIsArticuloOpen(false);
    };

    const addProductToList = (product: {
        Nombre: string;
        Precio: number;
        Descripción: string;
        Categoría: string;
        Habilitado: boolean;
    }) => {
        const newProduct = {
            ...product,
            Acciones: (
                <Actions
                    nombre={product.Nombre}
                    actions={["ver", "editar", "eliminar"]}
                    onVer={() => console.log("Ver")}
                    onEditar={() => console.log("Editar")}
                    onEliminar={() => console.log("Eliminar")}
                />
            ),
        };

        setData((prevData) => [...prevData, newProduct]);
    };

    return (
        <div>
            <h3>Productos</h3>
            <TopBar 
                nombre="Masco Mida - Palmares"
                placeholder="Seleccione una Categoría..."
                onAddBranch={handleAddProduct} // Asocia la función para abrir el modal
                tareaBoton="Agregar Producto"/>
            <CustomTable columns={columns} data={data} />
            {isArticuloOpen && <CrearArticulo onClose={closeArticuloModal} onAddProduct={addProductToList} />}
        </div>
    );
};

export default Productos;
