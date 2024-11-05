import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { seleccionarEmpresa, agregarEmpresa } from '../../../redux/slices/empresasSlice';
import CardEmpresa from './CardEmpresa';
import styles from './ListEmpresas.module.css'

const ListaEmpresas: React.FC = () => {
    const empresas = useSelector((state: RootState) => state.empresas.empresas);
    const dispatch = useDispatch<AppDispatch>();

    const handleAgregarEmpresa = () => {
        const nombre = prompt("Nombre de la nueva empresa:");
        if (nombre) {
            dispatch(agregarEmpresa(nombre));
        }
    };

    return (
        
        <div className={styles.listaEmpresas}>
            <button onClick={handleAgregarEmpresa}>Agregar Empresa</button>
            {empresas.map((empresa) => (
                <CardEmpresa
                    key={empresa.id}
                    empresa={empresa}
                    onSelect={() => dispatch(seleccionarEmpresa(empresa.id))}
                />
            ))}
        </div>
    );
};

export default ListaEmpresas;
