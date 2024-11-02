import { useState } from "react";
import CustomTable from "../../ui/featureds/featuredTables/customTables";
import TopBar from "../../ui/featureds/topBar/topBar";
import Actions from "../../ui/Actions/actions";


export const Productos = () => {
    const columns = ["Nombre", "Precio", "Descripción", "Categoría", "Habilitado", "Acciones"];

    const [data, setData] = useState<Array<{
        Nombre: string;
        Precio: number; // Mantener como número
        Descripción: string;
        Categoría: string;
        Habilitado: boolean;
        Acciones: JSX.Element;
    }>>([]);

    const handleAddProduct = () => {
        // Lógica para agregar un nuevo producto
        const newProduct = {
            Nombre: `Producto ${data.length + 1}`,
            Precio: parseFloat((Math.random() * 100).toFixed(2)), // Precio aleatorio como número
            Descripción: `Descripción del producto ${data.length + 1}`,
            Categoría: `Categoría ${Math.floor(Math.random() * 5) + 1}`, // Categoría aleatoria
            Habilitado: true, // Puedes cambiar esto según la lógica que necesites
            Acciones: (
                <Actions
                    nombre={`Producto ${data.length + 1}`}
                    actions={["ver", "editar", "eliminar"]}
                    onVer={() => console.log("Ver")}
                    onEditar={() => console.log("Editar")}
                    onEliminar={() => console.log("Eliminar")}
                />
            ),
        };

        setData((prevData) => [...prevData, newProduct]); // Agrega el nuevo producto al estado
    };

    return (
        <div>
            <h3>Productos</h3>
            <TopBar 
                nombre="Masco Mida - Palmares"
                placeholder="Seleccione una Categoría..."
                onAddBranch={handleAddProduct} // Asocia la función para agregar un producto
                tareaBoton="Agregar Producto"/>
            <CustomTable columns={columns} data={data} />
        </div>
    );
};

export default Productos;