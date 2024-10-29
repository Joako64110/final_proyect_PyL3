import { useState } from "react";
import { FaImage } from "react-icons/fa";
import './modalSucursal.css'



export const ModalSucursal: React.FC = () => {
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name); // Guarda el nombre del archivo cargado
        }
    };

    const placeholders = [
        "Ingrese un nombre:", 
        "Horario de apertura:", 
        "Horario de cierre:", 
        "Ingrese el país:", 
        "Ingrese la provincia:", 
        "Ingrese la localidad:", 
        "Nombre de la calle:", 
        "Número de calle:", 
        "Código postal:"
    ];

    return (
        <div className="modals">
            <div className="card" style={{backgroundColor:"rgba(212, 224, 242, 1)", width:"55%"}}>
                <div className="card-body">
                    <h5 className="card-title">Crear una Sucursal</h5>
                    <div className="container-sucursal">
                        <div className="grid-container">
                            {placeholders.map((placeholder, index) => (
                                <input
                                    key={index}
                                    placeholder={placeholder} 
                                    className="form-control"
                                    style={{ marginBottom: "10px" }}
                                />
                            ))}
                        </div>
                        <div className="img-buttons">
                            <div className="input-group">
                                <input
                                    type="file"
                                    className="form-control"
                                    id="inputGroupFile"
                                    aria-label="Upload"
                                    onChange={handleFileChange}
                                    style={{ cursor: "pointer" }}
                                />
                                <span className="input-group-text">
                                    <FaImage />
                                </span>
                            </div>
                            <div className="buttons">
                                <button type="button" className="btn btn-dark">Confirmar</button>
                                <button type="button" className="btn btn-danger">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};