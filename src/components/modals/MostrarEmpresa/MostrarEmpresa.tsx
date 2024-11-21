import React from 'react';
import { IEmpresa } from "../../../types/IEmpresa";
import './MostrarEmpresa.css';

interface MostrarEmpresaProps {
    empresa: IEmpresa;
    onClose: () => void;
}

export const MostrarEmpresa: React.FC<MostrarEmpresaProps> = ({ empresa, onClose }) => {
    return (
        <div className="modals">
            <div className="card-em" style={{ backgroundColor: "aliceblue", width: "400px" }}>
                <div className="card-body-em">
                    <h5 className="card-title-em">Empresa</h5>
                    <div className="cardContent-em">
                        <p className="card-text">Nombre: {empresa.nombre}</p>
                        <p className="card-text">Razón Social: {empresa.razonSocial}</p>
                        <p className="card-text">CUIT: {empresa.cuit}</p>

                        <div className="logo">
                            <p>Logo:</p>
                            <img
                                src=""
                                alt={`Logo de ${empresa.nombre}`}
                                style={{ width: "100px", height: "100px" }}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-dark"
                            style={{ width: "7rem" }}
                            onClick={onClose} // Cierra el modal al hacer clic en el botón
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};