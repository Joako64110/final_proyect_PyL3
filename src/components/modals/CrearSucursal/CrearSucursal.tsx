import { useState } from "react";
import { FaImage } from "react-icons/fa";
import './CrearSucursal.css';

interface ISucursal {
    id: string;
    nombre: string;
    apertura: string;
    cierre: string;
    pais: string;
    provincia: string;
    localidad: string;
    calle: string;
    numero: string;
    codigoPostal: string;
}

interface ModalSucursalProps {
    onClose: () => void;
    onAddSucursal: (newSucursal: ISucursal) => void; // Prop para manejar la nueva sucursal
}

export const CrearSucursal: React.FC<ModalSucursalProps> = ({ onClose, onAddSucursal }) => {
    const [sucursalData, setSucursalData] = useState<ISucursal>({
        id: Date.now().toString(), // ID único basado en el timestamp
        nombre: "",
        apertura: "",
        cierre: "",
        pais: "",
        provincia: "",
        localidad: "",
        calle: "",
        numero: "",
        codigoPostal: "",
    });

    const [warningMessage, setWarningMessage] = useState<string>(""); // Estado para el mensaje de advertencia
    const [imageSelected, setImageSelected] = useState<boolean>(false); // Estado para saber si se ha seleccionado una imagen

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSucursalData({ ...sucursalData, [name]: value }); // Actualiza el estado con el valor del campo
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageSelected(true); // Indica que se ha seleccionado una imagen
        } else {
            setImageSelected(false); // No se ha seleccionado imagen
        }
    };

    const handleConfirm = () => {
        const allFieldsFilled = Object.values(sucursalData).every(field => field !== "") && imageSelected;
    
        if (!allFieldsFilled) {
            setWarningMessage("Por favor, asegúrate de completar todos los campos.");
        } else {
            setWarningMessage(""); // Limpiar el mensaje de advertencia
            onAddSucursal(sucursalData);
            onClose();
        }
    };

    const placeholders = [
        { name: "nombre", placeholder: "Ingrese un nombre:" },
        { name: "apertura", placeholder: "Horario de apertura:" },
        { name: "cierre", placeholder: "Horario de cierre:" },
        { name: "pais", placeholder: "Ingrese el país:" },
        { name: "provincia", placeholder: "Ingrese la provincia:" },
        { name: "localidad", placeholder: "Ingrese la localidad:" },
        { name: "calle", placeholder: "Nombre de la calle:" },
        { name: "numero", placeholder: "Número de calle:" },
        { name: "codigoPostal", placeholder: "Código postal:" },
    ];

    return (
        <div className="modals">
            <div className="card-sucursal">
                <div className="card-body">
                    <h5 className="card-title">Crear una Sucursal</h5>
                    {warningMessage && <div className="alert alert-warning">{warningMessage}</div>} {/* Mensaje de advertencia */}
                    <div className="container-sucursal">
                        <div className="grid-container">
                            {placeholders.map((item, index) => (
                                <input
                                    key={index}
                                    name={item.name}
                                    placeholder={item.placeholder} 
                                    className="form-control"
                                    style={{ marginBottom: "10px", textAlign:"center" }}
                                    onChange={handleChange}
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
                                <button type="button" className="btn btn-dark" onClick={handleConfirm}>Confirmar</button>
                                <button type="button" className="btn btn-danger" onClick={onClose}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};