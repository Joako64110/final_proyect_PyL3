import React, { useState, useEffect } from 'react';
import SucursalesGrid from '../../ui/featureds/featuredSucursalesGrid/SucursalesGrid';
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


    // Función para manejar la selección de una empresa desde el SideBar
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


    // Función para abrir el modal
    const handleAddBranch = () => {
        if (empresaId) {
            setIsModalOpen(true); // Abre el modal solo si hay una empresa seleccionada
        }
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false); // Establece isModalOpen en false para cerrar el modal
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
                onAddBranch={handleAddBranch} // Función para abrir el modal
                tareaBoton="Agregar Sucursal" // Texto del botón
                setSearchQuery={setSearchTerm} // Actualiza el estado de búsqueda
            />
                {empresaId && <SucursalesGrid 
                                empresaId={empresaId}
                                onAddSucursal={handleAddSucursal} // Pasa la función de actualización
                                searchTerm={searchTerm} // Nueva prop
                                />}
                {/* Renderiza el modal solo cuando isModalOpen es true */}
                {isModalOpen && empresaId && (
                    <CrearSucursal
                        idEmpresa={empresaId}
                        onClose={handleCloseModal} // Se pasa handleCloseModal como prop
                        onAddSucursal={handleAddSucursal} // Cierra el modal tras agregar sucursal
                    />
                )}
            </div>
        </div>
    );
};

export default Home;







