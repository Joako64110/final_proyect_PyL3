import React, { useState } from 'react';
import Actions from '../../Actions/actions';
import './CategoriaTable.css';
import { ICategorias } from '../../../../types/ICategorias';

interface CategoriaTableProps {
    data: Array<{
        Nombre: string;
        Subcategorias: ICategorias[];
        Acciones: JSX.Element;
    }>;
    onAddSubcategory: (parentCategoryName: string) => void;
    onEditCategory: (categoryName: string) => void;
    onDeleteCategory: (categoryName: string) => void;
    onDeleteSubcategory: (categoryName: string, subcategoryName: string) => void;
}

const CategoriaTable: React.FC<CategoriaTableProps> = ({
    data,
    onAddSubcategory,
    onEditCategory,
    onDeleteCategory,
    onDeleteSubcategory,
}) => {
    const [expandedCategories, setExpandedCategories] = useState<Array<string>>([]);

    const toggleExpandCategory = (categoryName: string) => {
        setExpandedCategories((prevExpanded) =>
            prevExpanded.includes(categoryName)
                ? prevExpanded.filter((name) => name !== categoryName)
                : [...prevExpanded, categoryName]
        );
    };

    return (
        <div className='table-container'>
            <table className="mi-clase-tabla">
                <thead className="mi-clase-thead">
                    <tr>
                        <th className="mi-clase-th-1">Nombre</th>
                        <th className="mi-clase-th-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="mi-clase-tbody">
                    {data.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <tr className="mi-clase-tr">
                                <td className="mi-clase-td-1">{row.Nombre}</td>
                                <td className="mi-clase-td-2">
                                    <Actions
                                        id={1}
                                        actions={["desplegar", "editar", "eliminar", "agregar"]}
                                        onDesplegar={() => toggleExpandCategory(row.Nombre)}
                                        onEditar={() => onEditCategory(row.Nombre)}
                                        onEliminar={() => onDeleteCategory(row.Nombre)}
                                        onAgregar={() => onAddSubcategory(row.Nombre)}
                                        isExpanded={expandedCategories.includes(row.Nombre)}
                                    />
                                </td>
                            </tr>
                            {expandedCategories.includes(row.Nombre) &&
                                row.Subcategorias.map((sub, subIndex) => (
                                    <tr key={`${rowIndex}-${subIndex}`} className="mi-clase-tr">
                                        <td className="mi-clase-td-3">{sub.denominacion}</td>
                                        <td className="mi-clase-td-4">
                                            <Actions
                                                id={1}
                                                actions={["editar", "eliminar"]}
                                                onEditar={() => onEditCategory(sub.denominacion)}
                                                onEliminar={() => onDeleteSubcategory(row.Nombre, sub.denominacion)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriaTable;
