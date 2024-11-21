import React from 'react';
import './MostrarSucursal.css';
import { ISucursal } from '../../ui/featureds/featuredCardGrid/CardGrid';

interface MostrarSucursalProps {
    sucursal: ISucursal;
    onClose: () => void;
}

export const MostrarSucursal: React.FC<MostrarSucursalProps> = ({ sucursal, onClose }) => {
    return (
        <div className="modal-sucursal">
            <div className="card-sucursal" style={{ backgroundColor: "aliceblue", width: "400px" }}>
                <div className="card-body-sucursal">
                    <h5 className="card-title-sucursal">Sucursal</h5>
                    <div className="card-content-sucursal">
                        <p className="card-text">
                            <b>Nombre:</b> {sucursal.nombre}
                        </p>
                        <p className="card-text">
                            <b>Empresa:</b> {sucursal.nombre}
                        </p>
                        <p className="card-text">
                            <b>Domicilio:</b> {sucursal.calle} {sucursal.numero}
                        </p>
                        <p className="card-text">
                            <b>¿Casa Matriz?:</b> {sucursal.id === '1' ? 'SI' : 'NO'}
                        </p>
                        <p className="card-text">
                            <b>Horario Apertura:</b> {sucursal.apertura}
                        </p>
                        <p className="card-text">
                            <b>Horario Cierre:</b> {sucursal.cierre}
                        </p>
                        <div className="logo">
                            <p>
                                <b>Logo:</b>
                            </p>
                            <img
                                src="ruta-del-logo.png"
                                alt="Logo de la empresa"
                                style={{ width: "100px", height: "100px" }}
                            />
                        </div>
                        <button type="button" className="btn btn-dark" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostrarSucursal;
