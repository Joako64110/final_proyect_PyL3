import { useState } from "react";
import CustomTable from "../../ui/featureds/featuredTables/customTables";
import TopBar from "../../ui/featureds/topBar/topBar";
import Actions from "../../ui/Actions/actions";


export const Categorias = () => {
  const columns = ["Nombre", "Acciones"];

  // Estado inicial de la tabla vacío
  const [data, setData] = useState<Array<{ Nombre: string; Acciones: JSX.Element }>>([]);

  const handleAddCategory = () => {
    // Lógica para agregar una nueva categoría
    const newCategory = {
      Nombre: `Categoría ${data.length + 1}`,
      Acciones: (
        <Actions
          nombre={`Categoría ${data.length + 1}`}
          actions={["desplegar", "editar", "agregar"]}
          onDesplegar={() => console.log("Desplegar")}
          onEditar={() => console.log("Editar")}
          onAgregar={() => console.log("Agregar")}
        />
      ),
    };
    setData((prevData) => [...prevData, newCategory]); // Agrega la nueva categoría al estado
  };

  return (
    <div>
      <h3>Categorias</h3>
      <TopBar
        nombre="Masco Mida - Palmares"
        placeholder="Filtrar... "
        onAddBranch={handleAddCategory} // Asocia la función al botón en TopBar
        tareaBoton="Agregar Categoría"
      />
      <CustomTable columns={columns} data={data} />
    </div>
  );
};

export default Categorias;