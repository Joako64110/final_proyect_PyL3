import { useState, useEffect } from 'react';
import Actions from '../../ui/Actions/actions';
import CustomTable from '../../ui/featureds/featuredTables/customTables';
import TopBar from '../../ui/topBar/topBar';
import CrearAlergeno from "../../modals/CrearAlergeno/CrearAlergeno";
import SideBarFunc from '../../ui/SideBarr/SideBarFun/SideBarFun';
import { AlergenoService } from '../../../services/AlergenoService';

interface Allergen {
    id: number;
    Nombre: string;
    Acciones: JSX.Element;
}

export const Alergenos = () => {
    const columns = ["Nombre", "Acciones"];
    const [data, setData] = useState<Array<Allergen>>([]);
    const [isAlergenoOpen, setIsAlergenoOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [allergenToEdit, setAllergenToEdit] = useState<{ name: string; index: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredData = data.filter((allergen) =>
        allergen.Nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const allergensService = new AlergenoService('http://190.221.207.224:8090/alergenos');

    useEffect(() => {
        const fetchAllergens = async () => {
            try {
                const allergens = await allergensService.getAllAllergens();
                setData(
                    allergens.map((allergen) => ({
                        id: allergen.id,
                        Nombre: allergen.denominacion,
                        Acciones: (
                            <Actions
                                id={allergen.id}
                                actions={["editar", "eliminar"]}
                                onEditar={() => openEditModal(allergen.denominacion)}
                                onEliminar={() => deleteAllergen(allergen.id)} // Llama a la función deleteAllergen
                            />
                        ),
                    }))
                );
            } catch (error) {
                console.error("Error al obtener los alérgenos:", error);
            }
        };

        fetchAllergens();
    });

    const handleAddAllergen = () => {
        setIsAlergenoOpen(true);
    };

    const closeAlergenoModal = () => {
        setIsAlergenoOpen(false);
    };

    const handleCreateAllergen = async (alergenoName: string) => {
        const newAllergen = {
            denominacion: alergenoName,
            imagen: null,
        };
    
        try {
            const createdAllergen = await allergensService.createAllergen(newAllergen);
            setData((prevData) => [
                ...prevData,
                {
                    id: createdAllergen.id,
                    Nombre: createdAllergen.denominacion,
                    Acciones: (
                        <Actions
                            id={createdAllergen.id}
                            actions={["editar", "eliminar"]}
                            onEditar={() => openEditModal(createdAllergen.denominacion)}
                            onEliminar={() => deleteAllergen(createdAllergen.id)}
                        />
                    ),
                },
            ]);
            closeAlergenoModal();
        } catch (error) {
            console.error("Error al crear el alérgeno:", error);
        }
    };

    const openEditModal = (allergenName: string) => {
        const index = data.findIndex((item) => item.Nombre === allergenName);
        setAllergenToEdit({ name: allergenName, index });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setAllergenToEdit(null);
    };

    const editAllergen = async (newName: string) => {
        if (allergenToEdit) {
            const updatedAllergen = {
                id: data[allergenToEdit.index].id,
                denominacion: newName,
                imagen: null,
            };
            try {
                const updated = await allergensService.updateAllergen(updatedAllergen.id, updatedAllergen);
                const updatedData = [...data];
                updatedData[allergenToEdit.index] = {
                    ...updatedData[allergenToEdit.index],
                    Nombre: updated.denominacion,
                };
                setData(updatedData);
                closeEditModal();
            } catch (error) {
                console.error("Error al editar el alérgeno:", error);
            }
        }
    };

    const deleteAllergen = async (id: number) => {
        try {
            // Primero eliminar el alérgeno del estado local
            setData((prevData) => prevData.filter((item) => item.id !== id));
            // Luego eliminarlo en el backend
            await allergensService.deleteAlergeno(id);
        } catch (error) {
            console.error("Error al eliminar el alérgeno:", error);
        }
    };

    return (
        <div className="container-screen">
            <SideBarFunc />
            <div className="featured">
            <TopBar
                nombre="Masco Mida - Palmares"
                placeholder="Buscar..."
                onAddBranch={handleAddAllergen}
                tareaBoton="Agregar un Alergeno"
                setSearchQuery={setSearchQuery}
            />
            <CustomTable
                columns={columns}
                data={filteredData.map((allergen) => ({
                    Nombre: allergen.Nombre,
                    Acciones: allergen.Acciones,
                }))}
            />
                {isAlergenoOpen && (
                    <CrearAlergeno
                        onClose={closeAlergenoModal}
                        onCreate={handleCreateAllergen}
                    />
                )}
                {isEditModalOpen && allergenToEdit && (
                    <CrearAlergeno
                        onClose={closeEditModal}
                        onCreate={editAllergen}
                        initialValue={allergenToEdit.name}
                    />
                )}
            </div>
        </div>
    );
};

export default Alergenos;
