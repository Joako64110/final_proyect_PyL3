import React, { useState } from 'react';
import './CrearSubcategoria.css';

interface PopupFormProps {
    onClose: () => void;
}

const CrearSubcategoria: React.FC<PopupFormProps> = ({ onClose }) => {
    const [subcategoryName, setSubcategoryName] = useState('');

    const handleSubmit = () => {
        alert(`Subcategoría creada: ${subcategoryName}`);
        onClose();
    };

    return (
        <div className="modal-overlaySubCategoria">
            <div className="modal-contentSubCategoria">
                <h2>Crear una subcategoría</h2>
                <label>Ingrese una denominación:</label>
                <input
                    type="text"
                    className='inputCategoria'
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    placeholder="Ingrese una denominación"
                />
                <br />
                <button onClick={handleSubmit} className="confirm">Confirmar</button>
                <button onClick={onClose} className="cancel">Cancelar</button>
            </div>
        </div>
    );
};

export default CrearSubcategoria;
