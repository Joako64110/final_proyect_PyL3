import React, { useState } from 'react';
import './CrearAlergeno.css';

interface PopupFormProps {
    onClose: () => void;
}

const CrearAlergeno: React.FC<PopupFormProps> = ({ onClose }) => {
    const [alergenoName, setAlergenoName] = useState('');

    const handleSubmit = () => {
        alert(`Alérgeno creado: ${alergenoName}`);
        onClose();
    };

    return (
        <div className="modal-overlayCrearAlergeno">
            <div className="modal-contentCrearAlergeno">
                <h2>Crear un Alérgeno</h2>
                <label>Ingrese una denominación:</label>
                <input
                    type="text"
                    value={alergenoName}
                    onChange={(e) => setAlergenoName(e.target.value)}
                />
                <button className="confirm">Ingresar una Imagen</button>
                <br />
                <button onClick={handleSubmit} className="confirm">Confirmar</button>
                <button onClick={onClose} className="cancel">Cancelar</button>
            </div>
        </div>
    );
};

export default CrearAlergeno;
