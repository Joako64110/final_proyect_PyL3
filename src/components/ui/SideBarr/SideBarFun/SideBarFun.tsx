import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import styles from "./SideBarFun.module.css";
import Actions from "../../Actions/actions";
import { Link, useLocation } from "react-router-dom";

const SideBarFuncionalidad: React.FC = () => {
    const location = useLocation(); // Obtén la ubicación actual

    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? `${styles["card-funcionalidad"]} ${styles.activo}`
            : styles["card-funcionalidad"];
    };

    const dispatch = useDispatch<AppDispatch>();

    const handleVolverAEmpresas = () => {
        console.log("Volver a Empresas");
    };

    return (
        <div className={styles["sidebar-funcionalidad"]}>
            <h4 className={styles["titulo-funcionalidad"]}>Administración</h4>
            <Link to="/" className={styles["enlace-funcionalidad"]}>
                <button
                    onClick={handleVolverAEmpresas}
                    className={styles["boton-funcionalidad"]}
                >
                    <Actions id={1} actions={["regresar"]} /> <p>Empresas</p>
                </button>
            </Link>
            <div className={styles["cards-funcionalidad"]}>
                <Link to="/Categorias" className={getLinkClass("/Categorias")}>
                    {" "}
                    <p> Categorias </p>
                </Link>
                <Link to="/Productos" className={getLinkClass("/Productos")}>
                    {" "}
                    <p> Productos </p>
                </Link>
                <Link to="/Alergenos" className={getLinkClass("/Alergenos")}>
                    {" "}
                    <p> Alergenos </p>
                </Link>
            </div>
        </div>
    );
};

export default SideBarFuncionalidad;
