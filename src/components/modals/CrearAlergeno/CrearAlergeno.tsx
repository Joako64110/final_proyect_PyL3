import React, { useState, useEffect } from 'react';
import './CrearAlergeno.css';

interface PopupFormProps {
    onClose: () => void;
    onCreate: (alergenoName: string) => void;
    initialValue?: string;
}

const CrearAlergeno: React.FC<PopupFormProps> = ({ onClose, onCreate, initialValue = '' }) => {
    const [alergenoName, setAlergenoName] = useState(initialValue);

    useEffect(() => {
        setAlergenoName(initialValue);
    }, [initialValue]);

    const handleSubmit = () => {
        if (alergenoName.trim() === '') {
            alert('El nombre del alérgeno no puede estar vacío.');
            return;
        }
        onCreate(alergenoName); 
        onClose();
    };

    return (
        <div className="modal-overlayCrearAlergeno">
            <div className="modal-contentCrearAlergeno">
                <h2>{initialValue ? 'Editar Alérgeno' : 'Crear un Alérgeno'}</h2>
                <label>Ingrese una denominación:</label>
                <input
                    className="inputAlergeno"
                    type="text"
                    value={alergenoName}
                    onChange={(e) => setAlergenoName(e.target.value)}
                />
                <button onClick={handleSubmit} className="confirm">Confirmar</button>
                <button onClick={onClose} className="cancel">Cancelar</button>
            </div>
        </div>
    );
};

export default CrearAlergeno;
