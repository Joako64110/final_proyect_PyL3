import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { seleccionarEmpresa, agregarEmpresa, loadEmpresas } from '../../../../redux/slices/empresasSlice';
import CardEmpresa from '../CardEmpresa/CardEmpresa';
import styles from './SideBar.module.css';

const SideBar: React.FC = () => {
        const { empresas, loading, error } = useSelector((state: RootState) => state.empresas);
        const dispatch = useDispatch<AppDispatch>();
        const [empresaSeleccionada, setEmpresaSeleccionada] = useState<number | null>(null);
    
        const handleSelectEmpresa = (id: number) => {
        setEmpresaSeleccionada(id);
        };
    
        const handleAgregarEmpresa = () => {
        const nombre = prompt("Nombre de la nueva empresa:");
        if (nombre) {
            const nuevaEmpresa = {
            id: Date.now(),
            nombre,
            razonSocial: "",
            cuit: 0,
            logo: null,
            sucursales: [],
            pais: { id: 1, nombre: "Argentina" },
            };
            dispatch(agregarEmpresa(nuevaEmpresa));
        }
        };
    
        // Cargar empresas cuando el componente se monte
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
                onSelect={() => handleSelectEmpresa(empresa.id)}
                isSeleccionada={empresa.id === empresaSeleccionada}
            />
            ))}
        </div>
        );
};

export default SideBar;
