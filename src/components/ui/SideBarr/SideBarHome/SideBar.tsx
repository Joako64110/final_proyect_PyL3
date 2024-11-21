import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { loadEmpresas } from '../../../../redux/slices/empresasSlice';
import CardEmpresa from '../CardEmpresa/CardEmpresa';
import { CrearEmpresa } from '../../../modals/CrearEmpresa/CrearEmpresa';
import { CrearSucursal } from '../../../modals/CrearSucursal/CrearSucursal'; // Asegúrate de importar CrearSucursal
import styles from './SideBar.module.css';
import { IEmpresa } from '../../../../types/IEmpresa';

interface SideBarProps {
    onSelectEmpresa: (empresaId: number) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onSelectEmpresa }) => {
    const { empresas, loading, error } = useSelector((state: RootState) => state.empresas);
    const dispatch = useDispatch<AppDispatch>();
    const [isCrearEmpresaModalOpen, setIsCrearEmpresaModalOpen] = useState<boolean>(false); // Modal para crear empresa
    const [isCrearSucursalModalOpen, setIsCrearSucursalModalOpen] = useState<boolean>(false); // Modal para crear sucursal
    const [selectedEmpresaId, setSelectedEmpresaId] = useState<number | null>(null); // Estado para la empresa seleccionada

    const handleAgregarEmpresa = () => {
        setIsCrearEmpresaModalOpen(true);
    };

    const handleCloseCrearEmpresaModal = () => {
        setIsCrearEmpresaModalOpen(false);
    };

    const handleConfirmarEmpresa = (empresa: any) => {
        dispatch(loadEmpresas());
        setIsCrearEmpresaModalOpen(false);
    };

    const handleConfirmarEdicion = () => {
        dispatch(loadEmpresas());
    };

    const handleSelectEmpresa = (empresa: IEmpresa) => {
        setSelectedEmpresaId(empresa.id); // Guarda el ID de la empresa seleccionada
        onSelectEmpresa(empresa.id); // Llama al prop onSelectEmpresa con el ID
    };

    // Función para abrir el modal de CrearSucursal
    const handleAgregarSucursal = () => {
        if (selectedEmpresaId) {
            setIsCrearSucursalModalOpen(true); // Abre el modal de CrearSucursal solo si hay una empresa seleccionada
        }
    };

    // Función para agregar una nueva sucursal
    const handleAddSucursal = (newSucursal: any) => {
        console.log("Sucursal agregada:", newSucursal);
        // Aquí puedes agregar la lógica para manejar la creación de la sucursal
        setIsCrearSucursalModalOpen(false); // Cerrar el modal de sucursal después de agregarla
    };

    useEffect(() => {
        dispatch(loadEmpresas());
    }, [dispatch]);

    if (loading) return <p>Cargando empresas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.listaEmpresas}>
            <h3>Empresas:</h3>
            <button onClick={handleAgregarEmpresa}>Agregar Empresa</button>
            {empresas.map((empresa) => (
                <CardEmpresa
                    key={empresa.id}
                    empresa={empresa}
                    onSelect={() => handleSelectEmpresa(empresa)}
                    isSeleccionada={selectedEmpresaId === empresa.id} // Compara para ver si es la empresa seleccionada
                    dispatch={dispatch}
                    onConfirmarEdicion={handleConfirmarEdicion}
                />
            ))}
            {isCrearEmpresaModalOpen && (
                <CrearEmpresa
                    mode="crear"
                    onClose={handleCloseCrearEmpresaModal}
                    onConfirm={handleConfirmarEmpresa}
                />
            )}
            {isCrearSucursalModalOpen && selectedEmpresaId && (
                <CrearSucursal
                    idEmpresa={selectedEmpresaId} // Pasa el idEmpresa seleccionado
                    onClose={() => setIsCrearSucursalModalOpen(false)} // Cierra el modal de sucursal
                    onAddSucursal={handleAddSucursal} // Aquí pasas la función de agregar sucursal
                />
            )}
        </div>
    );
};

export default SideBar;






