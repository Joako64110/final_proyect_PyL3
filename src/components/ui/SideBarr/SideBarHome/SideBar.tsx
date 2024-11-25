import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { loadEmpresas } from '../../../../redux/slices/empresasSlice';
import CardEmpresa from '../CardEmpresa/CardEmpresa';
import { CrearEmpresa } from '../../../modals/CrearEmpresa/CrearEmpresa';
import { CrearSucursal } from '../../../modals/CrearSucursal/CrearSucursal';
import styles from './SideBar.module.css';
import { IEmpresa } from '../../../../types/IEmpresa';

interface SideBarProps {
    onSelectEmpresa: (empresaId: number) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onSelectEmpresa }) => {
    const { empresas, loading, error } = useSelector((state: RootState) => state.empresas);
    const dispatch = useDispatch<AppDispatch>();
    const [isCrearEmpresaModalOpen, setIsCrearEmpresaModalOpen] = useState<boolean>(false);
    const [isCrearSucursalModalOpen, setIsCrearSucursalModalOpen] = useState<boolean>(false);
    const [selectedEmpresaId, setSelectedEmpresaId] = useState<number | null>(null);

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
        setSelectedEmpresaId(empresa.id);
        onSelectEmpresa(empresa.id);
    };

    const handleAgregarSucursal = () => {
        if (selectedEmpresaId) {
            setIsCrearSucursalModalOpen(true);
        }
    };

    const handleAddSucursal = (newSucursal: any) => {
        console.log("Sucursal agregada:", newSucursal);
        setIsCrearSucursalModalOpen(false);
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
                    isSeleccionada={selectedEmpresaId === empresa.id}
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
                    idEmpresa={selectedEmpresaId}
                    onClose={() => setIsCrearSucursalModalOpen(false)}
                    onAddSucursal={handleAddSucursal}
                />
            )}
        </div>
    );
};

export default SideBar;
