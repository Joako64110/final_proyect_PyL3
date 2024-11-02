import { useState } from "react";
import Actions from "../../ui/Actions/actions";
import CustomTable from "../../ui/featureds/featuredTables/customTables";
import TopBar from "../../ui/featureds/topBar/topBar";


export const Alergenos = () => {
    const columns = ["Nombre", "Acciones"];
    const [data, setData] = useState<Array<{ Nombre: string; Acciones: JSX.Element }>>([]);

    const handleAddAllergen = () => {
        // Lógica para agregar un nuevo alérgeno
        const newAllergen = {
            Nombre: `Alergeno ${data.length + 1}`,
            Acciones: (
                <Actions
                nombre={`Alergeno ${data.length + 1}`}
                actions={["ver", "editar", "eliminar"]}
                onVer={() => console.log("Ver")}
                onEditar={() => console.log("Editar")}
                onEliminar={() => console.log("Eliminar")}
                />
            ),
            };
        
            setData((prevData) => [...prevData, newAllergen]); // Agrega el nuevo alérgeno al estado
        };
        
    return (
        <div>Alergenos
            <TopBar 
                nombre="Masco Mida - Palmares"
                placeholder="Buscar..."
                onAddBranch={handleAddAllergen}
                tareaBoton="Agregar un Alergeno"/>

            <CustomTable columns={columns} data={data} />
        </div>
    )
}
