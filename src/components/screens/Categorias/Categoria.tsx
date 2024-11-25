import React, { useEffect, useState } from 'react';
import CategoriaService from '../../../services/CategoriaService';
import { ICategorias } from '../../../types/ICategorias'; 
import { ICreateCategoria } from '../../../types/dtos/categorias/ICreateCategoria';
import CategoriaTable from '../../ui/featureds/CategoriaTable/CategoriaTable';
import SideBarFun from '../../ui/SideBarr/SideBarFun/SideBarFun';
import TopBar from '../../ui/topBar/topBar';
import sucursalesService from '../../../services/SucursalService';
import CrearCategoriaPadre from '../../modals/CrearCategoriaPadre/CrearCategoriaPadre';
import { IUpdateCategoria } from '../../../types/dtos/categorias/IUpdateCategoria';
import Swal from 'sweetalert2';
import CrearSubcategoria from '../../modals/CrearSubcategoria/CrearSubcategoria';

const Categoria = () => {
    const [categorias, setCategorias] = useState<ICategorias[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isCategoriaPadreOpen, setIsCategoriaPadreOpen] = useState(false);
    const [sucursalNombre, setSucursalNombre] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [categoriaAEditar, setCategoriaAEditar] = useState<ICategorias | null>(null);
    const [isSubcategoriaOpen, setIsSubcategoriaOpen] = useState(false);

    const idSucursal = localStorage.getItem('idSucursal');

    useEffect(() => {
        const fetchCategorias = async () => {
            if (!idSucursal) {
                setError('No se encontró el idSucursal en el localStorage');
                return;
            }
    
            setLoading(true);
            setError(null);
    
            try {
                const categoriasPadre = await CategoriaService.getAllCategoriasPadrePorSucursal(Number(idSucursal));
                setCategorias(categoriasPadre);
            } catch (err) {
                console.error('Error al obtener las categorías:', err);
                setError('Hubo un error al cargar las categorías');
            } finally {
                setLoading(false);
            }
        };
    
        fetchCategorias();
    }, [idSucursal]);

    useEffect(() => {
        const fetchSucursalNombre = async () => {
            const idSucursal = localStorage.getItem("idSucursal");
            if (!idSucursal) {
                console.error("idSucursal no encontrado en el localStorage");
                return;
            }

            try {
                const sucursal = await sucursalesService.getSucursalById(Number(idSucursal));
                setSucursalNombre(sucursal.nombre);
            } catch (error) {
                console.error("Error al obtener la sucursal:", error);
            }
        };

        fetchSucursalNombre();
    }, []);

    const handleCreateCategory = async (categoryName: string, idCategoriaPadre: number | null) => {
        const idSucursal = localStorage.getItem('idSucursal');
        const idEmpresa = localStorage.getItem('idEmpresa');
    
        if (!idSucursal || !idEmpresa) {
            console.error('Faltan los datos de idSucursal o idEmpresa');
            setError('No se pudo crear la categoría. Faltan datos necesarios.');
            return;
        }
    
        const newCategoria: ICreateCategoria = {
            denominacion: categoryName,
            idEmpresa: Number(idEmpresa),
            idCategoriaPadre: idCategoriaPadre,
        };
    
        try {
            const createdCategory = await CategoriaService.create(newCategoria);    
            setCategorias((prevCategorias) => {
                if (idCategoriaPadre) {
                    return prevCategorias.map((categoria) =>
                        categoria.id === idCategoriaPadre
                            ? {
                                ...categoria,
                                subCategorias: [...categoria.subCategorias, createdCategory],
                            }
                            : categoria
                    );
                } else {
                    return [...prevCategorias, createdCategory];
                }
            });
        } catch (error) {
            console.error("Error al crear la categoría:", error);
            setError('Hubo un error al crear la categoría. Por favor, intenta de nuevo.');
        }
    };

    const handleEditCategory = async (categoryName: string) => {
        if (!categoriaAEditar) {
            return;
        }
    
        const idSucursal = localStorage.getItem('idSucursal');
        const idEmpresa = localStorage.getItem('idEmpresa');
        
        if (!idSucursal || !idEmpresa || !categoriaAEditar.id) {
            console.error('Faltan los datos de idSucursal, idEmpresa o idCategoria');
            return;
        }
    
        const idSucursales = categoriaAEditar.sucursales ? categoriaAEditar.sucursales.map(sucursal => sucursal.id) : [];
    
        const updatedCategoria: IUpdateCategoria = {
            id: categoriaAEditar.id,
            denominacion: categoryName,
            eliminado: categoriaAEditar.eliminado,
            idSucursales: idSucursales,
            idCategoriaPadre: null,
        };
        
        try {
            const updatedCategory = await CategoriaService.update(categoriaAEditar.id, updatedCategoria);
            setCategorias(prevCategorias =>
                prevCategorias.map(cat =>
                    cat.id === updatedCategory.id ? updatedCategory : cat
                )
            );
        } catch (error) {
            console.error("Error al editar la categoría:", error);
            setError('Hubo un error al editar la categoría');
        }
    };

    const openCreateModal = () => {
        setCategoriaAEditar(null);
        setIsCategoriaPadreOpen(true);
    };

    const openEditModal = (categoria: ICategorias) => {
        setCategoriaAEditar(categoria);
        setIsCategoriaPadreOpen(true);
    };

    const openSubcategoriaModal = (categoriaPadre: ICategorias) => {
        setCategoriaAEditar(categoriaPadre);
        setIsSubcategoriaOpen(true);
    };

    const handleCreateSubcategoria = (subcategoryName: string) => {
        if (!categoriaAEditar) {
            console.error("No se ha seleccionado una categoría padre");
            return;
        }
    
        handleCreateCategory(subcategoryName, categoriaAEditar.id);
        setIsSubcategoriaOpen(false);
    };

    const handleDeleteCategory = async (id: number) => {
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro de eliminar esta categoría?",
                text: "¡Esta acción no se puede deshacer!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar",
            });
    
            if (result.isConfirmed) {
                await CategoriaService.delete(id);
                setCategorias(prevCategorias => prevCategorias.filter(categoria => categoria.id !== id));
                Swal.fire("Eliminado", "La categoría ha sido eliminada.", "success");
            }
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
            Swal.fire("Error", "Hubo un problema al eliminar la categoría.", "error");
        }
    };

    return (
        <div className="container-screen">
            <SideBarFun />
            <div className="featured">
                <TopBar
                    nombre={sucursalNombre}
                    placeholder="Buscar..."
                    onAddBranch={openCreateModal}
                    tareaBoton="Agregar Categoria"
                    setSearchQuery={setSearchTerm}
                />
                <CategoriaTable
                    categorias={categorias}
                    onEditCategory={openEditModal} 
                    onDeleteCategory={handleDeleteCategory}
                    onAddSubcategory={openSubcategoriaModal} 
                    onEditSubcategory={(categoria: string, subcategoria: string) => console.log('Editar subcategoría:', subcategoria)} 
                />
            </div>

            {isCategoriaPadreOpen && (
                <CrearCategoriaPadre
                    initialValue={categoriaAEditar?.denominacion || ''}
                    onClose={() => setIsCategoriaPadreOpen(false)}
                    onSubmit={categoriaAEditar ? handleEditCategory : handleCreateCategory}
                />
            )}

            {isSubcategoriaOpen && (
                <CrearSubcategoria
                    onClose={() => setIsSubcategoriaOpen(false)}
                    onSubmit={handleCreateSubcategoria}
                />
            )}
        </div>
    );
};

export default Categoria;
