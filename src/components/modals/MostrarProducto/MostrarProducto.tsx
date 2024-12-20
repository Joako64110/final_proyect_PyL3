import React from 'react';
import { IProductos } from "../../../types/IProductos"; 
import './MostrarProducto.css';

interface MostrarProductoProps {
    producto: IProductos;
    onClose: () => void;
}

export const MostrarProducto: React.FC<MostrarProductoProps> = ({ producto, onClose }) => {
    const { denominacion, descripcion, precioVenta, categoria, imagenes, habilitado } = producto || {};

    const imagenUrl = imagenes && imagenes.length > 0 ? imagenes[0]?.url : ''; 

    return (
        <div className="modals">
            <div className="card-pr" style={{ backgroundColor: "aliceblue", width: "400px" }}>
                <div className="card-body-pr">
                    <h5 className="card-title-pr">Producto</h5>
                    <div className="cardContent-pr">
                        <p className="card-text"><b>Nombre:</b> {denominacion || "No disponible"}</p>
                        <p className="card-text"><b>Precio:</b> ${precioVenta || "No disponible"}</p>
                        <p className="card-text"><b>Descripción:</b> {descripcion || "No disponible"}</p>
                        <p className="card-text"><b>Categoría:</b> {categoria?.denominacion || "No disponible"}</p>
                        <p className="card-text"><b>Habilitado:</b> {habilitado ? "Sí" : "No"}</p>

                        <div className="producto-imagen">
                            {imagenUrl ? (
                                <div>
                                    <p><b>Imagen:</b></p>
                                    <img
                                        src={imagenUrl}
                                        alt={`Imagen de ${denominacion || 'Producto'}`}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                </div>
                            ) : (
                                <p><b>Imagen:</b> No disponible</p>
                            )}
                        </div>

                        <button
                            type="button"
                            className="btn btn-dark"
                            style={{ width: "7rem" }}
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostrarProducto;
