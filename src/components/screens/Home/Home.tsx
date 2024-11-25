import React, { useState, useEffect } from 'react';
import SucursalesGrid from '../../ui/featureds/SucursalesGrid/SucursalesGrid';
import TopBar from '../../ui/topBar/topBar';
import { CrearSucursal } from '../../modals/CrearSucursal/CrearSucursal';
import '../screen.css';
import SideBar from '../../ui/SideBarr/SideBarHome/SideBar';
import empresaService from '../../../services/EmpresaService';
import { ISucursal } from '../../../types/ISucursal';

export const Home: React.FC = () => {
    const [empresaId, setEmpresaId] = useState<number | null>(null);
    const [empresaNombre, setEmpresaNombre] = useState<string>('');
    const [sucursales, setSucursales] = useState<ISucursal[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');


    const handleSelectEmpresa = (empresaId: number) => {
        setEmpresaId(empresaId);
    };

    useEffect(() => {
        const fetchEmpresaData = async () => {
            if (empresaId) {
                try {
                    const empresa = await empresaService.getById(empresaId);
                    if (empresa) {
                        setEmpresaNombre(empresa.nombre);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos de la empresa:', error);
                }
            }
        };

        fetchEmpresaData();
    }, [empresaId]);


    const handleAddBranch = () => {
        if (empresaId) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddSucursal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container-screen">
            <SideBar onSelectEmpresa={handleSelectEmpresa} />
            <div className="featured">
            <TopBar
                nombre={empresaNombre || 'Seleccione una empresa'}
                placeholder="Buscar..."
                onAddBranch={handleAddBranch} 
                tareaBoton="Agregar Sucursal" 
                setSearchQuery={setSearchTerm} 
            />
                {empresaId && <SucursalesGrid 
                                empresaId={empresaId}
                                onAddSucursal={handleAddSucursal}
                                searchTerm={searchTerm} 
                                />}
                {isModalOpen && empresaId && (
                    <CrearSucursal
                        idEmpresa={empresaId}
                        onClose={handleCloseModal}
                        onAddSucursal={handleAddSucursal} 
                    />
                )}
            </div>
        </div>
    );
};

export default Home;







