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
    const [categoriaAEditar, setCategoriaAEditar] = useState<ICategorias | null>(null); // Para editar categoría
    const [isSubcategoriaOpen, setIsSubcategoriaOpen] = useState(false); // Estado para la subcategoría


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
            idCategoriaPadre: idCategoriaPadre, // Se usa el idCategoriaPadre proporcionado
        };
    
        try {
            const createdCategory = await CategoriaService.create(newCategoria);    
            setCategorias((prevCategorias) => {
                if (idCategoriaPadre) {
                    // Si es una subcategoría, encuentra la categoría padre y agrega la subcategoría
                    return prevCategorias.map((categoria) =>
                        categoria.id === idCategoriaPadre
                            ? {
                                ...categoria,
                                subCategorias: [...categoria.subCategorias, createdCategory],
                            }
                            : categoria
                    );
                } else {
                    // Si es una categoría padre, simplemente agréguela
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
    
        // Asegúrate de que idSucursales contiene solo los IDs de las sucursales
        const idSucursales = categoriaAEditar.sucursales ? categoriaAEditar.sucursales.map(sucursal => sucursal.id) : [];
    
        const updatedCategoria: IUpdateCategoria = {
            id: categoriaAEditar.id,
            denominacion: categoryName,
            eliminado: categoriaAEditar.eliminado,
            idSucursales: idSucursales, // Aquí aseguramos que se mantengan los ID de las sucursales
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

    // Abre el modal para crear una nueva categoría
    const openCreateModal = () => {
        setCategoriaAEditar(null); // Restablece a null cuando se quiere crear
        setIsCategoriaPadreOpen(true); // Abre el modal en modo creación
    };


    // Abre el modal para editar una categoría
    const openEditModal = (categoria: ICategorias) => {
        setCategoriaAEditar(categoria); // Establece la categoría a editar
        setIsCategoriaPadreOpen(true); // Abre el modal en modo edición
    };

    // Abre el modal para crear una subcategoría
    const openSubcategoriaModal = (categoriaPadre: ICategorias) => {
        setCategoriaAEditar(categoriaPadre);  // Establece la categoría a editar (padre)
        setIsSubcategoriaOpen(true); // Abre el modal en modo subcategoría
    };

    // Y cuando crees la subcategoría, pasa el idCategoriaPadre
    const handleCreateSubcategoria = (subcategoryName: string) => {
        if (!categoriaAEditar) {
            console.error("No se ha seleccionado una categoría padre");
            return;
        }
    
        handleCreateCategory(subcategoryName, categoriaAEditar.id);  // Pasa el idCategoriaPadre
        setIsSubcategoriaOpen(false); // Cierra el modal después de crearla
    };

    const handleDeleteCategory = async (id: number) => {
        try {
            // Usamos SweetAlert2 para mostrar el modal de confirmación
            const result = await Swal.fire({
                title: "¿Estás seguro de eliminar esta categoría?",
                text: "¡Esta acción no se puede deshacer!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33", // Color del botón de confirmación
                cancelButtonColor: "#3085d6", // Color del botón de cancelación
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar",
            });
    
            if (result.isConfirmed) {
                // Llama a la función delete para eliminar la categoría usando su id
                await CategoriaService.delete(id);
    
                // Actualiza el estado de las categorías, eliminando la categoría
                setCategorias(prevCategorias => prevCategorias.filter(categoria => categoria.id !== id));
    
                // Notificación de éxito
                Swal.fire("Eliminado", "La categoría ha sido eliminada.", "success");
            }
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
            // Notificación de error si algo sale mal
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

            {/* Modal para crear o editar categoría */}
            {isCategoriaPadreOpen && (
                <CrearCategoriaPadre
                    initialValue={categoriaAEditar?.denominacion || ''} // Pasa el valor de la categoría a editar
                    onClose={() => setIsCategoriaPadreOpen(false)}
                    onSubmit={categoriaAEditar ? handleEditCategory : handleCreateCategory} // Verifica si se está editando o creando
                />
            )}

            {/* Modal para crear subcategoría */}
            {isSubcategoriaOpen && (
                <CrearSubcategoria
                    onClose={() => setIsSubcategoriaOpen(false)}
                    onSubmit={handleCreateSubcategoria} // Llama a la función para crear la subcategoría
                />
            )}
        </div>
    );
};

export default Categoria;