import React, { useState } from 'react';
import { empresas } from '../data/empresa';
import EmpresaSidebar from './EmpresaSidebar';
import SucursalesGrid from './screens/GridSucursales/CardGrid/CardGrid';
import { IEmpresa } from '../types/IEmpresa';

const EmpresasApp: React.FC = () => {
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState<IEmpresa | null>(null);

    const handleEmpresaSelect = (empresaId: number) => {
        const empresa = empresas.find((emp) => emp.id === empresaId) || null;
        setEmpresaSeleccionada(empresa);
    };

    return (
        <div style={{ display: 'flex' }}>
        <EmpresaSidebar empresas={empresas} onEmpresaSelect={handleEmpresaSelect} />
        <SucursalesGrid sucursales={empresaSeleccionada?.sucursales || []} ciudad={empresaSeleccionada?.ciudad || ''} />
        </div>
    );
};

export default EmpresasApp;
