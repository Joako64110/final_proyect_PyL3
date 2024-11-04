import React, { useState } from 'react';
import './CrearAlergeno.css';

interface PopupFormProps {
    onClose: () => void;
    onCreate: (alergenoName: string) => void;
}

const CrearAlergeno: React.FC<PopupFormProps> = ({ onClose, onCreate }) => {
    const [alergenoName, setAlergenoName] = useState('');

    const handleSubmit = () => {
        onCreate(alergenoName); // Llama a la función onCreate pasando el nombre del alérgeno
        onClose();
    };

    return (
        <div className="modal-overlayCrearAlergeno">
            <div className="modal-contentCrearAlergeno">
                <h2>Crear un Alérgeno</h2>
                <label>Ingrese una denominación:</label>
                <input
                    className='inputAlergeno'
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
