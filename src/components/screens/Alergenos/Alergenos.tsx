import { useState } from 'react';
import Actions from '../../ui/Actions/actions';
import CustomTable from '../../ui/featureds/featuredTables/customTables';
import TopBar from '../../ui/topBar/topBar';
import CrearAlergeno from "../../modals/CrearAlergeno/CrearAlergeno";
import SideBarFunc from '../../ui/SideBarr/SideBarSuc/SideBarFun';

export const Alergenos = () => {
    const columns = ["Nombre", "Acciones"];
    const [data, setData] = useState<Array<{ Nombre: string; Acciones: JSX.Element }>>([]);
    const [isAlergenoOpen, setIsAlergenoOpen] = useState(false); // Estado para gestionar la visibilidad del modal

    const handleAddAllergen = () => {
        setIsAlergenoOpen(true); // Abre el modal para agregar un nuevo alérgeno
    };

    const closeAlergenoModal = () => {
        setIsAlergenoOpen(false); // Cierra el modal
    };

    const handleCreateAllergen = (alergenoName: string) => {
        const newAllergen = {
            Nombre: alergenoName,
            Acciones: (
                <Actions
                    id={1}
                    actions={["ver", "editar", "eliminar"]}
                    onVer={() => console.log("Ver")}
                    onEditar={() => console.log("Editar")}
                    onEliminar={() => console.log("Eliminar")}
                />
            ),
        };

        setData((prevData) => [...prevData, newAllergen]); // Agrega el nuevo alérgeno al estado
        closeAlergenoModal(); // Cierra el modal después de agregar
    };

    return (
        <div className='container-screen'>
            <SideBarFunc/>
            <div className='featured'>
                <TopBar 
                    nombre="Masco Mida - Palmares"
                    placeholder="Buscar..."
                    onAddBranch={handleAddAllergen}
                    tareaBoton="Agregar un Alergeno"
                />
                <CustomTable columns={columns} data={data} />
                {isAlergenoOpen && <CrearAlergeno onClose={closeAlergenoModal} onCreate={handleCreateAllergen} />}
            </div>
        </div>
    );
};

export default Alergenos;