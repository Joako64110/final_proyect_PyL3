import { useState } from 'react';
import TopBar from "../../ui/topBar/topBar";
import CrearCategoriaPadre from "../../modals/CrearCategoriaPadre/CrearCategoriaPadre";
import CrearSubcategoria from "../../modals/CrearSubcategoria/CrearSubcategoria";
import Actions from "../../ui/Actions/actions";
import SideBar from '../../ui/SideBarr/SideBarHome/SideBar';
import CategoriaTable from '../../ui/featureds/featuredCategoriaTable/CategoriaTable';
import SideBarFunc from '../../ui/SideBarr/SideBarSuc/SideBarFun';

interface Category {
  Nombre: string;
  Subcategorias: Array<string>;
  Acciones: JSX.Element;
}

export const Categorias = () => {
  const [isCategoriaPadreOpen, setIsCategoriaPadreOpen] = useState(false);
  const [isSubcategoriaOpen, setIsSubcategoriaOpen] = useState(false);
  const [data, setData] = useState<Array<Category>>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<{ name: string; index: number } | null>(null);
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Array<string>>([]);

  const handleAddCategory = () => setIsCategoriaPadreOpen(true);
  const closeCategoriaPadreModal = () => setIsCategoriaPadreOpen(false);

  const toggleExpandCategory = (categoryName: string) => {
    setExpandedCategories((prevExpanded) =>
    prevExpanded.includes(categoryName)
        ? prevExpanded.filter((name) => name !== categoryName)
        : [...prevExpanded, categoryName]
    );
};

  const addCategory = (categoryName: string) => {
    const newCategory: Category = {
      Nombre: categoryName,
      Subcategorias: [],
      Acciones: (
        <Actions
          id={1}
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

  const onDeleteSubcategory = (categoryName: string, subcategoryName: string) => {
    setData((prevData) =>
      prevData.map((category) =>
        category.Nombre === categoryName
          ? { ...category, Subcategorias: category.Subcategorias.filter((sub) => sub !== subcategoryName) }
          : category
      )
    );
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
      updatedData[categoryToEdit.index] = { ...updatedData[categoryToEdit.index], Nombre: newName };
      setData(updatedData);
      closeEditModal();
    }
  };

  const addSubcategory = (subcategoryName: string) => {
    if (parentCategory) {
      const updatedData = data.map((category) => {
        if (category.Nombre === parentCategory) {
          return { ...category, Subcategorias: [...category.Subcategorias, subcategoryName] };
        }
        return category;
      });
      setData(updatedData);
      closeSubcategoriaModal();
    }
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
    <div className="container-screen">
      <SideBarFunc />
      <div className="featured">
        <TopBar
          nombre="Masco Mida - Palmares"
          placeholder="Filtrar... "
          onAddBranch={handleAddCategory}
          tareaBoton="Agregar Categoría"
        />
        <CategoriaTable
          data={data.map(category => ({
            Nombre: category.Nombre,
            Subcategorias: category.Subcategorias,
            Acciones: <></>,
          }))}
          onAddSubcategory={openSubcategoriaModal}
          onEditCategory={openEditModal}
          onDeleteCategory={deleteCategory}
          onDeleteSubcategory={onDeleteSubcategory}
        />
        
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
          <CrearSubcategoria
            onClose={closeSubcategoriaModal}
            onSubmit={addSubcategory}
          />
        )}
      </div>
    </div>
  );
};

export default Categorias;
