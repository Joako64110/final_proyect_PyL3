import React, { useState } from 'react';
import './CrearCategoriaPadre.css';

interface PopupFormProps {
    onClose: () => void;
}

const CrearCategoriaPadre: React.FC<PopupFormProps> = ({ onClose }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = () => {
        alert(`Categoría creada: ${categoryName}`);
        onClose();
    };

    return (
        <div className="modal-overlayCategoriaPadre">
            <div className="categoria-padre"> 
                <h2>Crear Categoría Padre</h2>
                <label>Ingrese una denominación:</label>
                <input
                    type="text"
                    className='inputCategoriaPadre'
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
