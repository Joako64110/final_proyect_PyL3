import React from 'react';

export const ModalMostrarSucursal: React.FC = () => {
    return (
        <div className="modals">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Sucursal</h5>
                    <div className="cardContent">
                        <p className="card-text">Nombre: </p>
                        <p className="card-text">Empresa: </p>
                        <p className="card-text">Domicilio: </p>
                        <p className="card-text">¿Casa Matriz?: SI/NO</p>
                        <p className="card-text">Horario Apertura: </p>
                        <p className="card-text">Horario Cierre: </p>
                        <div className="logo">
                        <p>Logo:</p>
                        <img src="ruta-del-logo.png" alt="Logo de la empresa" style={{ width: "100px", height: "100px" }} />
                        </div>
                        <button type="button" className="btn btn-dark">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};