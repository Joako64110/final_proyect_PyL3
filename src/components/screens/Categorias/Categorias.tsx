import { useState } from 'react';
import CustomTable from "../../ui/featureds/featuredTables/customTables";
import TopBar from "../../ui/featureds/topBar/topBar";
import CrearCategoriaPadre from "../../modals/CrearCategoriaPadre/CrearCategoriaPadre"

export const Categorias = () => {
  const columns = ["Nombre", "Acciones"];

  const [isCategoriaPadreOpen, setIsCategoriaPadreOpen] = useState(false);
  const [data, setData] = useState<Array<{ Nombre: string; Acciones: JSX.Element }>>([]);

  const handleAddCategory = () => {
    setIsCategoriaPadreOpen(true);
  };

  const closeCategoriaPadreModal = () => {
    setIsCategoriaPadreOpen(false);
  };

  return (
    <div>
      <h3>Categorias</h3>
      <TopBar
        nombre="Masco Mida - Palmares"
        placeholder="Filtrar... "
        onAddBranch={handleAddCategory}
        tareaBoton="Agregar Categoría"
      />
      <CustomTable columns={columns} data={data} />
      {isCategoriaPadreOpen && <CrearCategoriaPadre onClose={closeCategoriaPadreModal} />}
    </div>
  );
};

export default Categorias;
