import React, { useState, useEffect } from 'react';
import './CrearCategoriaPadre.css';

interface CrearCategoriaPadreProps {
    initialValue: string;
    onClose: () => void;
    onSubmit: (categoryName: string, idCategoriaPadre: number | null) => void; // Acepta dos parámetros
    idCategoriaPadre?: number | null; // Si es necesario, puedes pasar el idCategoriaPadre aquí
}

const CrearCategoriaPadre: React.FC<CrearCategoriaPadreProps> = ({ onClose, onSubmit, initialValue = '', idCategoriaPadre = null }) => {
    const [categoryName, setCategoryName] = useState(initialValue);

    useEffect(() => {
        setCategoryName(initialValue);
    }, [initialValue]);

    const handleSubmit = () => {
        if (categoryName.trim()) {
            console.log("Datos que se enviarán al confirmar:", categoryName);
            onSubmit(categoryName, idCategoriaPadre); // Pasar ambos parámetros
            onClose();
        } else {
            alert("El nombre de la categoría no puede estar vacío.");
        }
    };

    return (
        <div className="modal-overlayCategoriaPadre">
            <div className="categoria-padre">
                <h2>{initialValue ? "Editar Categoría" : "Crear Categoría"}</h2>
                <label>Ingrese una denominación:</label>
                <input
                    type="text"
                    className="inputCategoriaPadre"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <br />
                <button onClick={handleSubmit} className="confirm">Confirmar</button>
                <button onClick={onClose} className="cancel">Cancelar</button>
            </div>
        </div>
    );
};

export default CrearCategoriaPadre;
