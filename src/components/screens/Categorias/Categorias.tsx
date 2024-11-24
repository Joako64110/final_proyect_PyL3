import { useEffect, useState } from 'react';
import TopBar from "../../ui/topBar/topBar";
import CrearCategoriaPadre from "../../modals/CrearCategoriaPadre/CrearCategoriaPadre";
import CrearSubcategoria from "../../modals/CrearSubcategoria/CrearSubcategoria";
import Actions from "../../ui/Actions/actions";
import SideBarFunc from '../../ui/SideBarr/SideBarFun/SideBarFun';
import CategoriaTable from '../../ui/featureds/featuredCategoriaTable/CategoriaTable';
import CategoriaService from '../../../services/CategoriaService';
import { ICategorias } from '../../../types/ICategorias';
import { useParams } from 'react-router-dom';
import sucursalesService from "../../../services/SucursalService";



interface Category {
  id: number;
  denominacion: string;
  subCategorias: ICategorias[];
  Acciones: JSX.Element;
}

export const Categorias = () => {
  const [isCategoriaPadreOpen, setIsCategoriaPadreOpen] = useState(false);
  const [isSubcategoriaOpen, setIsSubcategoriaOpen] = useState(false);
  const [data, setData] = useState<Array<Category>>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<{ id: number; denominacion: string } | null>(null);
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Array<string>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const params= useParams()
  const [sucursalNombre, setSucursalNombre] = useState<string>("");


  
  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      const idSucursal = localStorage.getItem("idSucursal"); // Recuperar el idSucursal
      if (!idSucursal) {
        console.error("idSucursal no encontrado en el localStorage");
        return;
      }

      try {
        const categoriasPadre = await CategoriaService.getAllCategoriasPadrePorSucursal(parseInt(idSucursal));
        setData(categoriasPadre.map((categoria) => ({
          id: categoria.id,
          denominacion: categoria.denominacion,
          subCategorias: [],
          Acciones: (
            <Actions
              id={categoria.id}
              actions={["desplegar", "editar", "eliminar", "agregar"]}
              onDesplegar={() => {
                if (categoria.subCategorias.length === 0) {
                  fetchSubcategories(categoria.id, categoria.denominacion, parseInt(idSucursal));
                } else {
                  toggleExpandCategory(categoria.denominacion);
                }
              }}
              onEditar={() => openEditModal((categoria.id).toString())}
              onEliminar={() => deleteCategory((categoria.id).toString())}
              onAgregar={() => openSubcategoriaModal(categoria.denominacion)}
            />
          ),
        })));
      } catch (error) {
        console.error('Error al cargar las categorías padre:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSucursalNombre = async () => {
      const idSucursal = localStorage.getItem("idSucursal"); // Recuperar el idSucursal
      if (!idSucursal) {
        console.error("idSucursal no encontrado en el localStorage");
        return;
      }

      try {
        // Llama a la función getSucursalById para obtener los datos de la sucursal
        const sucursal = await sucursalesService.getSucursalById(Number(idSucursal));
        setSucursalNombre(sucursal.nombre); // Actualiza el estado con el nombre de la sucursal
      } catch (error) {
        console.error("Error al obtener la sucursal:", error);
      }
    };

    fetchSucursalNombre();
  }, []); 

  const fetchSubcategories = async (parentId: number, parentName: string, idSucursal: number) => {
    try {
      const subCategorias = await CategoriaService.getAllSubCategoriasPorCategoriaPadre(parentId, idSucursal);
      setData((prevData) =>
        prevData.map((categoria) =>
          categoria.denominacion === parentName
            ? { ...categoria, subCategorias }
            : categoria
        )
      );
      toggleExpandCategory(parentName);
    } catch (error) {
      console.error('Error al cargar las subcategorías:', error);
    }
  };

  const toggleExpandCategory = (categoryName: string) => {
    setExpandedCategories((prevExpanded) =>
      prevExpanded.includes(categoryName)
        ? prevExpanded.filter((name) => name !== categoryName)
        : [...prevExpanded, categoryName]
    );
  };

  const addCategory = async (categoryName: string) => {
    try {
      const newCategory = await CategoriaService.create({
        denominacion: categoryName,
        idEmpresa: 0,
        idCategoriaPadre: null
      });
      setData((prevData) => [
        ...prevData,
        {
          id: newCategory.id,
          denominacion: newCategory.denominacion,
          subCategorias: [],
          Acciones: (
            <Actions
              id={newCategory.id}
              actions={["desplegar", "editar", "eliminar", "agregar"]}
              onDesplegar={() => toggleExpandCategory(newCategory.denominacion)}
              onEditar={() => openEditModal((newCategory.id).toString())}
              onEliminar={() => deleteCategory((newCategory.id).toString())}
              onAgregar={() => openSubcategoriaModal(newCategory.denominacion)}
            />
          ),
        },
      ]);
      closeSubcategoriaModal();
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
    }
  };

  const deleteCategory = async (categoryName: string) => {
    const category = data.find(cat => cat.denominacion === categoryName);
    if (category) {
        try {
            await CategoriaService.delete(category.id);
            setData((prevData) => prevData.filter((item) => item.id !== category.id));
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
        }
    }
};

  const openEditModal = (categoryName: string) => {
    const category = data.find(cat => cat.denominacion === categoryName);
    if (category) {
        setCategoryToEdit({ id: category.id, denominacion: category.denominacion });
        setIsEditModalOpen(true);
    }
};

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCategoryToEdit(null);
  };

  const editCategory = async (newName: string) => {
    if (categoryToEdit) {
      try {
        const updatedCategory = await CategoriaService.update(categoryToEdit.id, {
          denominacion: newName,
          id: 0,
          eliminado: false,
          idEmpresa: 0,
          idSucursales: []
        });
        setData((prevData) =>
          prevData.map((category) =>
            category.id === updatedCategory.id
              ? { ...category, denominacion: updatedCategory.denominacion }
              : category
          )
        );
        closeEditModal();
      } catch (error) {
        console.error('Error al editar la categoría:', error);
      }
    }
  };

  const addSubcategory = async (subcategoryName: string) => {
    if (parentCategory) {
      try {
        // Encuentra el ID de la categoría padre seleccionada
        const parentCategoryData = data.find(cat => cat.denominacion === parentCategory);
        if (!parentCategoryData) {
          console.error('No se encontró la categoría padre.');
          return;
        }
  
        const newSubcategory = await CategoriaService.create({
          denominacion: subcategoryName,
          idEmpresa: 0,
          idCategoriaPadre: parentCategoryData.id,
        });

        setData((prevData) => [
          ...prevData,
          {
            id: newSubcategory.id,
            denominacion: newSubcategory.denominacion,
            subCategorias: [],
            Acciones: (
              <Actions
                id={newSubcategory.id}
                actions={["desplegar", "editar", "eliminar", "agregar"]}
                onDesplegar={() => toggleExpandCategory(newSubcategory.denominacion)}
                onEditar={() => openEditModal((newSubcategory.id).toString())}
                onEliminar={() => deleteCategory((newSubcategory.id).toString())}
                onAgregar={() => openSubcategoriaModal(newSubcategory.denominacion)}
              />
            ),
          },
        ]);
  
        closeSubcategoriaModal();
      } catch (error) {
        console.error('Error al agregar la subcategoría:', error);
      }
    } else {
      console.error('No se seleccionó una categoría padre.');
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

  const closeCategoriaPadreModal = () => {
    setIsCategoriaPadreOpen(false);
  };

  return (
    <div className="container-screen">
      <SideBarFunc />
      <div className="featured">
        <TopBar
          nombre={sucursalNombre}
          placeholder="Buscar..."
          onAddBranch={() => setIsCategoriaPadreOpen(true)}
          tareaBoton="Agregar Categoria"
          setSearchQuery={setSearchTerm}/>
        <CategoriaTable
          data={data.map(({ denominacion, subCategorias }) => ({
            Nombre: denominacion,
            Subcategorias: subCategorias,
            Acciones: <></>,
          }))}
          onAddSubcategory={openSubcategoriaModal}
          onEditCategory={openEditModal}
          onDeleteCategory={deleteCategory} onDeleteSubcategory={deleteCategory}
        />
        {isCategoriaPadreOpen && (
          <CrearCategoriaPadre onClose={closeCategoriaPadreModal} onSubmit={addCategory} initialValue="" />
        )}
        {isEditModalOpen && categoryToEdit && (
          <CrearCategoriaPadre onClose={closeEditModal} onSubmit={editCategory} initialValue={categoryToEdit.denominacion} />
        )}
        {isSubcategoriaOpen && <CrearSubcategoria onClose={closeSubcategoriaModal} onSubmit={addSubcategory} />}
      </div>
    </div>
  );
};

export default Categorias;
