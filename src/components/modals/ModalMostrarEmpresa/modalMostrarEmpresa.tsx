import React from 'react';
import '../../styles/modalsStyles/ModalsStyles.css';

export const ModalMostrarEmpresa: React.FC = () => {
    return (
        <div className="modals">
            <div className="card" style={{backgroundColor:"aliceblue", width:"400px"}}>
                <div className="card-body">
                    <h5 className="card-title">Empresa</h5>
                    <div className='cardContent'>
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