
import React, { useState, useEffect } from 'react';
import './CrearCategoriaPadre.css';

interface PopupFormProps {
    onClose: () => void;
    onSubmit: (categoryName: string) => void;
    initialValue?: string;
}

const CrearCategoriaPadre: React.FC<PopupFormProps> = ({ onClose, onSubmit, initialValue = '' }) => {
    const [categoryName, setCategoryName] = useState(initialValue);

    useEffect(() => {
        setCategoryName(initialValue);
    }, [initialValue]);

    const handleSubmit = () => {
        if (categoryName.trim()) {
            onSubmit(categoryName);
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
