import Actions from "../../Actions/actions";
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
            <Actions
                    nombre={empresa.nombre}
                    actions={["ver", "editar"]}
                    onVer={() => console.log("Ver")}
                    onEditar={() => console.log("Editar")}
                />
        </div>
    )
}

export default CardEmpresa;