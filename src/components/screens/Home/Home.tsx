import React, { useState } from 'react';
import { empresas } from '../../../data/empresa';
import EmpresaSidebar from '../../EmpresaSidebar';
import SucursalesGrid from '../../ui/featureds/featuredCardGrid/CardGrid';
import TopBar from '../../ui/featureds/topBar/topBar';
import '../screen.css'

interface ISucursal {
    id: string;
    nombre: string;
    direccion: string;
    apertura: string;
}

interface IEmpresa {
    id: number;
    nombre: string;
    ciudad: string;
    sucursales: ISucursal[];
}

export const Home: React.FC = () => {
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState<IEmpresa | null>(null);

    const handleEmpresaSelect = (empresaId: number) => {
        const empresa = empresas.find((emp) => emp.id === empresaId) || null;
        setEmpresaSeleccionada(empresa);
    };

    const handleAddBranch = () => {
        console.log("Sucursal agregada");
    };

    return (
        <div className='container-screen'>
                <EmpresaSidebar empresas={empresas} onEmpresaSelect={handleEmpresaSelect} />
            <div className='featured-home'>
                <TopBar
                    nombre="Empresa 1"
                    placeholder="Buscar..."
                    onAddBranch={handleAddBranch}
                    tareaBoton="Agregar Sucursal"
                />
                <SucursalesGrid sucursales={empresaSeleccionada?.sucursales || []} ciudad={empresaSeleccionada?.ciudad || ''} />
            </div>
        </div>
    );
};

export default Home;
