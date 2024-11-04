import React from 'react';
import './MostrarSucursal.css';
export const MostrarSucursal: React.FC = () => {
    return (
        <div className="modals">
            <div className="card-suc" style={{backgroundColor:"aliceblue", width:"400px"}}>
                <div className="card-body-suc">
                    <h5 className="card-title-suc">Sucursal</h5>
                    <div className="cardContent-suc">
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