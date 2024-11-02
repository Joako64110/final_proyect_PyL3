import { useState } from "react";
import { FaImage } from "react-icons/fa";
import '../../styles/modalsStyles/ModalsStyles.css';


export const ModalEmpresa: React.FC = () => {
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name); // Guarda el nombre del archivo cargado
        }
    };

    return (
        <div className="modals">
            <div className="card" style={{maxWidth:"550px"}}>
                <div className="card-body">
                    <h5 className="card-title">Crear una Empresa</h5>
                    <div className="mb-3-main">
                        <input 
                            type="text"
                            
                            className="form-control mb-2" 
                            id="FormEmpresa1" 
                            placeholder="Ingrese un nombre:" 
                        />
                        <input
                            type="text"
                            placeholder="Ingrese la razon social:" 
                            className="form-control mb-2" 
                            id="FormEmpresa2" 
                        />
                        <input
                            type="text"
                            placeholder="Ingrese el CUIT:" 
                            className="form-control mb-2" 
                            id="FormEmpresa3" 
                        />
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
    );
};