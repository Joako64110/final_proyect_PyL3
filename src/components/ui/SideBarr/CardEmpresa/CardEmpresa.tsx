import { IEmpresa } from "../../../../types/IEmpresa";
import Actions from "../../Actions/actions";
import styles from "./CardEmpresa.module.css";

interface Props {
    empresa: IEmpresa;
    onSelect: () => void;
    isSeleccionada: boolean
}

export const CardEmpresa: React.FC<Props> = ({ empresa, onSelect, isSeleccionada }) => {
    return (
        <div
            className={`${styles.tarjetaEmpresa} ${isSeleccionada ? styles.selected : ''}`}
            onClick={onSelect}
        >
            <p>{empresa.nombre}</p>
            <Actions
                id={empresa.id}
                actions={["ver", "editar"]}
                onVer={() => console.log("Ver")}
                onEditar={() => console.log("Editar")}
            />
        </div>
    );
};

export default CardEmpresa;