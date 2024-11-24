import React, { useState, useEffect } from 'react';
import './CrearSubcategoria.css';

interface PopupFormProps {
  onClose: () => void;
  onSubmit: (subcategoryName: string) => void;
  initialValue?: string; // Agregamos una propiedad opcional para el valor inicial
}

const CrearSubcategoria: React.FC<PopupFormProps> = ({ onClose, onSubmit, initialValue }) => {
  const [subcategoryName, setSubcategoryName] = useState(initialValue || ''); // Usamos el initialValue si está presente

  useEffect(() => {
    // Si `initialValue` cambia, actualizamos el nombre de la subcategoría
    if (initialValue !== undefined) {
      setSubcategoryName(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = () => {
    if (subcategoryName.trim()) {
      onSubmit(subcategoryName);
      onClose();
    } else {
      alert("El nombre de la subcategoría no puede estar vacío."); // Mensaje de alerta si el nombre está vacío
    }
  };

  return (
    <div className="modal-overlaySubCategoria">
      <div className="modal-contentSubCategoria">
        <h2>{initialValue ? 'Editar subcategoría' : 'Crear una subcategoría'}</h2>
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
