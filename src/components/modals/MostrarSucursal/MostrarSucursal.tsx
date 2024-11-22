import React from 'react';
import './MostrarSucursal.css';
import { ISucursal } from '../../../types/ISucursal';

interface MostrarSucursalProps {
    sucursal: ISucursal;
    onClose: () => void;
}

export const MostrarSucursal: React.FC<MostrarSucursalProps> = ({ sucursal, onClose }) => {
    return (
        <div className="modals">
            <div className="card-suc" style={{ backgroundColor: "aliceblue", width: "400px" }}>
                <div className="card-body-suc">
                    <h5 className="card-title-suc">Sucursal</h5>
                    <div className="cardContent-suc">
                        <p className="card-text"><b>Nombre:</b> {sucursal.nombre}</p>
                        <p className="card-text"><b>Empresa:</b> {sucursal.empresa?.nombre}</p>
                        <p className="card-text"><b>Domicilio:</b> {sucursal.domicilio.calle} {sucursal.domicilio.numero} - {sucursal.domicilio.localidad.nombre}</p>
                        <p className="card-text"><b>¿Casa Matriz?:</b> {sucursal.esCasaMatriz ? 'SI' : 'NO'}</p>
                        <p className="card-text"><b>Horario Apertura:</b> {sucursal.horarioApertura}</p>
                        <p className="card-text"><b>Horario Cierre:</b> {sucursal.horarioCierre}</p>
                        <div className="logo">
                            {sucursal.logo ? (
                                <div>
                                    <p><b>Logo:</b></p>
                                    <img src={sucursal.logo} alt="Logo de la empresa" style={{ width: "100px", height: "100px" }} />
                                </div>
                            ) : (
                                <p><b>Logo:</b> No disponible</p>
                            )}
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

