import React from 'react';
import styles from './CardEmpresa.module.css'

interface Props {
    empresa: {
        id: number;
        nombre: string;
        seleccionado: boolean;
    };
    onSelect: () => void;
}

const TarjetaEmpresa: React.FC<Props> = ({ empresa, onSelect }) => {
    return (
        <div
            className={styles.tarjetaEmpresa}
            onClick={onSelect}
        >
            <p>{empresa.nombre}</p>
                <button>👁️</button>
                <button>✏️</button>
        </div>
    );
};

export default TarjetaEmpresa;
