// Categorias.tsx
import React, { useState } from 'react';
import CustomTable from "../../ui/featureds/featuredTables/customTables";
import TopBar from "../../ui/featureds/topBar/topBar";
import CrearCategoriaPadre from "../../modals/CrearCategoriaPadre/CrearCategoriaPadre";
import CrearSubcategoria from "../../modals/CrearSubcategoria/CrearSubcategoria";
import Actions from "../../ui/Actions/actions";

interface Category {
  Nombre: string;
  Subcategorias: Array<string>;
  Acciones: JSX.Element;
}

export const Categorias = () => {
  const columns = ["Nombre", "Acciones"];
  const [isCategoriaPadreOpen, setIsCategoriaPadreOpen] = useState(false);
  const [isSubcategoriaOpen, setIsSubcategoriaOpen] = useState(false);
  const [data, setData] = useState<Array<Category>>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<{ name: string; index: number } | null>(null); 
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Array<string>>([]); // Estado para manejar las categorías desplegadas

  const handleAddCategory = () => {
    setIsCategoriaPadreOpen(true);
  };

  const closeCategoriaPadreModal = () => {
    setIsCategoriaPadreOpen(false);
  };

  const addCategory = (categoryName: string) => {
    const newCategory = {
      Nombre: categoryName,
      Subcategorias: [],
      Acciones: (
        <Actions
          nombre={categoryName}
          actions={["desplegar", "editar", "eliminar", "agregar"]}
          onDesplegar={() => toggleExpandCategory(categoryName)}
          onEditar={() => openEditModal(categoryName)}
          onEliminar={() => deleteCategory(categoryName)}
          onAgregar={() => openSubcategoriaModal(categoryName)}
        />
      ),
    };

    setData((prevData) => [...prevData, newCategory]);
    closeCategoriaPadreModal(); 
  };

  const deleteCategory = (categoryName: string) => {
    setData((prevData) => prevData.filter((item) => item.Nombre !== categoryName));
  };

  const openEditModal = (categoryName: string) => {
    const index = data.findIndex(item => item.Nombre === categoryName);
    setCategoryToEdit({ name: categoryName, index });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCategoryToEdit(null);
  };

  const editCategory = (newName: string) => {
    if (categoryToEdit) {
      const updatedData = [...data];
      updatedData[categoryToEdit.index] = {
        ...updatedData[categoryToEdit.index],
        Nombre: newName,
        Acciones: (
          <Actions
            nombre={newName}
            actions={["desplegar", "editar", "eliminar", "agregar"]}
            onDesplegar={() => toggleExpandCategory(newName)}
            onEditar={() => openEditModal(newName)}
            onEliminar={() => deleteCategory(newName)}
            onAgregar={() => openSubcategoriaModal(newName)}
          />
        ),
      };
      setData(updatedData);
      closeEditModal();
    }
  };

  const addSubcategory = (subcategoryName: string) => {
    if (parentCategory) {
      const updatedData = data.map((category) => {
        if (category.Nombre === parentCategory) {
          return {
            ...category,
            Subcategorias: [...category.Subcategorias, subcategoryName],
          };
        }
        return category;
      });
      setData(updatedData);
      closeSubcategoriaModal();
    }
  };

  const toggleExpandCategory = (categoryName: string) => {
    setExpandedCategories((prevExpanded) =>
      prevExpanded.includes(categoryName)
        ? prevExpanded.filter((name) => name !== categoryName)
        : [...prevExpanded, categoryName]
    );
  };

  const openSubcategoriaModal = (parentCategoryName: string) => {
    setParentCategory(parentCategoryName);
    setIsSubcategoriaOpen(true);
  };

  const closeSubcategoriaModal = () => {
    setIsSubcategoriaOpen(false);
    setParentCategory(null);
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
      <table className="mi-clase-tabla">
        <thead className="mi-clase-thead">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="mi-clase-th">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="mi-clase-tbody">
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr className="mi-clase-tr">
                <td className="mi-clase-td">{row.Nombre}</td>
                <td className="mi-clase-td">{row.Acciones}</td>
              </tr>
              {expandedCategories.includes(row.Nombre) &&
                row.Subcategorias.map((sub, subIndex) => (
                  <tr key={subIndex} className="mi-clase-tr">
                    <td className="mi-clase-td" style={{ paddingLeft: "20px" }}>
                      - {sub}
                    </td>
                    <td className="mi-clase-td"></td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {isCategoriaPadreOpen && (
        <CrearCategoriaPadre
          onClose={closeCategoriaPadreModal}
          onSubmit={addCategory}
          initialValue="" 
        />
      )}
      {isEditModalOpen && categoryToEdit && (
        <CrearCategoriaPadre
          onClose={closeEditModal}
          onSubmit={editCategory}
          initialValue={categoryToEdit.name} 
        />
      )}
      {isSubcategoriaOpen && (
        <CrearSubcategoria onClose={closeSubcategoriaModal} onSubmit={addSubcategory} />
      )}
    </div>
  );
};

export default Categorias;
