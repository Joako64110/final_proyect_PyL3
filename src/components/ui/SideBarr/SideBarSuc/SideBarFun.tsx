import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import styles from "./SideBarFun.module.css"
import Actions from "../../Actions/actions";
import { Link, useLocation } from "react-router-dom";

const SideBarFun: React.FC = () => {

    const location = useLocation(); // Obtén la ubicación actual

    const getLinkClass = (path: string) => {
        return location.pathname === path ? `${styles.card} ${styles.active}` : styles.card;
    };

    const dispatch = useDispatch<AppDispatch>();

    const handleVolverAEmpresas = () => {
        // Aquí puedes manejar la lógica para volver a la vista de empresas
        console.log("Volver a Empresas");
    };

    return (
        <div className={styles.sidebarFun}>
            <h4 className={styles.titulo}>Administración</h4>
            <Link to="/" className={styles.link}>
                <button onClick={handleVolverAEmpresas} className={styles.boton}>
                    <Actions
                            id={1}
                            actions={["regresar"]}
                        /> <p>Empresas</p>
                </button>
            </Link>
            <div className={styles.cards}>
                <Link to="/Categorias" className={getLinkClass("/Categorias")}> <p> Categorias </p></Link>
                <Link to="/Productos" className={getLinkClass("/Productos")}> <p> Productos </p></Link>
                <Link to="/Alergenos" className={getLinkClass("/Alergenos")}> <p> Alergenos </p></Link>
            </div>
        </div>
    );
};

export default SideBarFun;