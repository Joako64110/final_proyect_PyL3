import React, { useState } from 'react';
import SucursalesGrid from '../../ui/featureds/featuredCardGrid/CardGrid';
import TopBar from '../../ui/topBar/topBar';
import { CrearSucursal } from '../../modals/CrearSucursal/CrearSucursal';
import '../screen.css'
import SideBar from '../../ui/SideBarr/SideBarHome/SideBar';
import { ISucursal } from '../../../types/ISucursal';
import { IEmpresa } from '../../../types/IEmpresa';


export const Home: React.FC = () => {
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState<IEmpresa | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


     // Función para abrir el modal
    const handleAddBranch = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddSucursal = (newSucursal: ISucursal) => {
        if (empresaSeleccionada) {
            const updatedSucursales = [...empresaSeleccionada.sucursales, newSucursal];
            setEmpresaSeleccionada({ ...empresaSeleccionada, sucursales: updatedSucursales }); 
        }
        setIsModalOpen(false);
    };

    return (
        <div  className="container-screen">
            <SideBar/>
            <div className="featured">
                <TopBar
                    nombre={empresaSeleccionada?.nombre || 'Seleccione una empresa'}
                    placeholder="Buscar..."
                    onAddBranch={handleAddBranch}
                    tareaBoton="Agregar Sucursal"
                />
                <SucursalesGrid/>

                {/* Renderizar el modal cuando isModalOpen es true */}
                {isModalOpen && <CrearSucursal onClose={handleCloseModal} onAddSucursal={handleAddSucursal} />}
            </div>
        </div>
    );
};

export default Home;
