import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import styles from "./SideBarFun.module.css";
import Actions from "../../Actions/actions";
import { Link, useLocation, useParams } from "react-router-dom";

const SideBarFuncionalidad: React.FC = () => {
    const location = useLocation(); // Obtén la ubicación actual
    const params= useParams()
    const paramsNumber= parseInt(params.id as string);

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
                <Link to={`/categorias/allCategoriasPorSucursal/${paramsNumber}`} className={getLinkClass(`/categorias/allCategoriasPorSucursal/${paramsNumber}`)}>
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
