import React, { useState } from 'react';
import { ICategorias } from '../../../../types/ICategorias'; 
import Actions from '../../Actions/actions';
import "./CategoriaTable.css";

interface CategoriaTableProps {
    categorias: ICategorias[];
    onEditCategory: (categoria: ICategorias) => void;  
    onDeleteCategory: (id: number) => void;
    onAddSubcategory: (categoria: ICategorias) => void;
    onEditSubcategory: (categoria: string, subcategoria: string) => void;
}

const CategoriaTable: React.FC<CategoriaTableProps> = ({
    categorias,
    onEditCategory,
    onDeleteCategory,
    onAddSubcategory,
    onEditSubcategory,
}) => {
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

    const toggleExpandCategory = (categoryId: number) => {
        setExpandedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleEditClick = (categoria: ICategorias) => {
        onEditCategory(categoria);
    };

    return (
        <div className="table-container">
            {categorias.length === 0 ? (
                <h3 style={{textAlign:"center", marginTop:"20px"}}>Aún no hay categorías</h3>
            ) : (
                <table className="mi-clase-tabla">
                    <thead className="mi-clase-thead">
                        <tr>
                            <th className="mi-clase-th-1">Nombre</th>
                            <th className="mi-clase-th-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="mi-clase-tbody">
                        {categorias.map((categoria) => (
                            <React.Fragment key={categoria.id}>
                                <tr className="mi-clase-tr">
                                    <td className="mi-clase-td-1">{categoria.denominacion}</td>
                                    <td className="mi-clase-td-2">
                                        <Actions
                                            id={categoria.id}
                                            actions={["desplegar", "editar", "eliminar", "agregar"]}
                                            onDesplegar={() => toggleExpandCategory(categoria.id)}
                                            onEditar={() => handleEditClick(categoria)} // Pasar el objeto completo de la categoría
                                            onEliminar={() => onDeleteCategory(categoria.id)}
                                            onAgregar={() => onAddSubcategory(categoria)}
                                            isExpanded={expandedCategories.includes(categoria.id)}
                                        />
                                    </td>
                                </tr>

                                {expandedCategories.includes(categoria.id) && categoria.subCategorias.map((subcategoria) => (
                                    <tr key={subcategoria.id}>
                                        <td className="mi-clase-td-3">-{subcategoria.denominacion}</td>
                                        <td className="mi-clase-td-4">
                                            <Actions
                                                id={subcategoria.id}
                                                actions={["editar"]}
                                                onEditar={() => onEditSubcategory(categoria.denominacion, subcategoria.denominacion)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CategoriaTable;
