import styles from "./CardEmpresa.module.css"

interface Props {
    empresa: {
        id: number;
        nombre: string;
        seleccionado: boolean;
    };
    onSelect: () => void;
}

export const CardEmpresa: React.FC<Props> = ({ empresa, onSelect }) => {
    
    return (
        <div
            className={styles.tarjetaEmpresa}
            onClick={onSelect}
        >
            <p>{empresa.nombre}</p>
            <div className={styles.botones}>
                <button>👁️</button>
                <button>✏️</button>
            </div>
        </div>
    )
}

export default CardEmpresa;