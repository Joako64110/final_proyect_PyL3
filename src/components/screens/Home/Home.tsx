import React, { useState } from 'react';
import { empresas } from '../../../data/empresa';
import SucursalesGrid from '../../ui/featureds/featuredCardGrid/CardGrid';
import TopBar from '../../ui/topBar/topBar';
import { CrearSucursal } from '../../modals/CrearSucursal/CrearSucursal';
import '../screen.css'
import SideBar from '../../ui/SideBarr/SideBar/SideBar';
import EmpresaSidebar from '../../EmpresaSidebar';

interface ISucursal {
    id: string;
    nombre: string;
    apertura: string;
    cierre: string;
    pais: string;
    provincia: string;
    localidad: string;
    calle: string;
    numero: string;
    codigoPostal: string;
}

interface IEmpresa {
    id: number;
    nombre: string;
    ciudad: string;
    sucursales: ISucursal[];
}


export const Home: React.FC = () => {
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState<IEmpresa | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    const handleEmpresaSelect = (empresaId: number) => {
        const empresa = empresas.find((emp) => emp.id === empresaId) || null;
        setEmpresaSeleccionada(empresa);
    };

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
        <div className="container-screen">
            <SideBar/>
            {/* <EmpresaSidebar empresas={empresas} onEmpresaSelect={handleEmpresaSelect} /> */}
            <div className="featured">
                <TopBar
                    nombre={empresaSeleccionada?.nombre || 'Seleccione una empresa'}
                    placeholder="Buscar..."
                    onAddBranch={handleAddBranch}
                    tareaBoton="Agregar Sucursal"
                />
                <SucursalesGrid sucursales={empresaSeleccionada?.sucursales || []} ciudad={empresaSeleccionada?.ciudad || ''} />

                {/* Renderizar el modal cuando isModalOpen es true */}
                {isModalOpen && <CrearSucursal onClose={handleCloseModal} onAddSucursal={handleAddSucursal} />}
            </div>
        </div>
    );
};

export default Home;
