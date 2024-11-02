import TopBar from "../../ui/featureds/topBar/topBar"

export const Home = () => {

    const handleAddBranch = () => {
        console.log("Sucursal agregada");
    };

    return (
        <div>Home
            <TopBar 
                nombre="Empresa 1"
                placeholder="Buscar..."
                onAddBranch={handleAddBranch}
                tareaBoton="Agregar Sucursal"/>
        </div>
    )
}
