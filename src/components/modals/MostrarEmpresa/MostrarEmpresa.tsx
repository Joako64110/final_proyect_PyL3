import React from 'react';
import './MostrarEmpresa.css';

export const MostrarEmpresa: React.FC = () => {
    return (
        <div className="modals">
            <div className="card-em" style={{backgroundColor:"aliceblue", width:"400px"}}>
                <div className="card-body-em">
                    <h5 className="card-title-em">Empresa</h5>
                    <div className='cardContent-em'>
                        <p className="card-text">Nombre de la Empresa: Ejemplo S.A.</p>
                        <p className="card-text">Razón Social: Empresa Ejemplo</p>
                        <p className="card-text">CUIT: 30-12345678-9</p>

                        <div className="logo">
                            <p>Logo:</p>
                            <img src="ruta-del-logo.png" alt="Logo de la empresa" style={{ width: "100px", height: "100px" }} />
                        </div>

                        <button type="button" className="btn btn-dark" style={{width:"7rem"}}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};