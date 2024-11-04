import React, { useState } from 'react';
import './CrearArticulo.css';

interface PopupFormProps {
    onClose: () => void;
    onAddProduct: (product: {
        Nombre: string;
        Precio: number;
        Descripción: string;
        Categoría: string;
        Habilitado: boolean;
    }) => void;
}

const CrearArticulo: React.FC<PopupFormProps> = ({ onClose, onAddProduct }) => {
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [alergenos, setAlergenos] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [habilitado, setHabilitado] = useState(false);

    const handleSubmit = () => {
        onAddProduct({
            Nombre: nombre,
            Precio: parseFloat(precioVenta),
            Descripción: descripcion,
            Categoría: categoria,
            Habilitado: habilitado,
        });
        onClose();
    };

    return (
        <div className="modal-overlayCrearArticulo">
            <div className="modal-contentCrearArticulo">
                <h2>Crear un artículo</h2>
                <div className='content1'>
                    <div className='content2'>
                        <div className='content3'>
                            <label>Ingrese una denominación:</label>
                            <input
                                className='inputCrearArticulo'
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ingrese una denominación"
                            />
                            <label>Categoría:</label>
                            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                <option value="">Seleccionar categoría</option>
                                <option value="Categoria 1">Categoría 1</option>
                                <option value="Categoria 2">Categoría 2</option>
                                <option value="Categoria 3">Categoría 3</option>
                            </select>
                            <label>Alergenos:</label>
                            <select value={alergenos} onChange={(e) => setAlergenos(e.target.value)}>
                                <option value="">Seleccionar alérgenos</option>
                                <option value="Alergeno 1">Alérgeno 1</option>
                                <option value="Alergeno 2">Alérgeno 2</option>
                                <option value="Alergeno 3">Alérgeno 3</option>
                            </select>
                            <label>Ingresa un precio de venta:</label>
                            <input
                                className='inputCrearArticulo'
                                type="text"
                                value={precioVenta}
                                onChange={(e) => setPrecioVenta(e.target.value)}
                                placeholder="Ingresa un precio de venta"
                            />
                            <label>Ingresa un código:</label>
                            <input
                                type="text"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                placeholder="Ingresa un código"
                            />
                            <label>
                                <input
                                    className='inputCrearArticulo'
                                    type="checkbox"
                                    checked={habilitado}
                                    onChange={(e) => setHabilitado(e.target.checked)}
                                />
                                Habilitado
                            </label>
                        </div>
                        <div className='content4'>
                            <textarea style={{height:'60%'}}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Ingrese una descripción"
                            ></textarea>
                            <button className="confirm">Ingresar una Imagen</button>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="confirm">Confirmar</button>
                        <button onClick={onClose} className="cancel">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearArticulo;
