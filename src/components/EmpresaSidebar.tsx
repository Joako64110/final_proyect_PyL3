import React from 'react';

interface EmpresaSidebarProps {
    empresas: { id: number; nombre: string }[];
    onEmpresaSelect: (empresaId: number) => void;
}

const EmpresaSidebar: React.FC<EmpresaSidebarProps> = ({ empresas, onEmpresaSelect }) => {
    return (
        <div style={{ width: '200px', backgroundColor: '#f1f1f1', padding: '10px' }}>
        <button>Agregar Empresa</button>
        {empresas.map((empresa) => (
            <div key={empresa.id} style={{ marginTop: '10px' }}>
            <button onClick={() => onEmpresaSelect(empresa.id)}>{empresa.nombre}</button>
            </div>
        ))}
        </div>
    );
};

export default EmpresaSidebar;
