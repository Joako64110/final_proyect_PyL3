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
        id: Date.now().toString(),
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

    const [warningMessage, setWarningMessage] = useState<string>("");
    const [imageSelected, setImageSelected] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSucursalData({ ...sucursalData, [name]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageSelected(!!event.target.files?.length);
    };

    const handleConfirm = () => {
        const allFieldsFilled = Object.values(sucursalData).every(field => field.trim() !== "") && imageSelected;

        if (!allFieldsFilled) {
            setWarningMessage("Por favor, asegúrate de completar todos los campos.");
        } else {
            setWarningMessage("");
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
        <div className="modal-sucursal">
            <div className="card-sucursal-modal">
                <div className="card-sucursal-body">
                    <h5 className="card-sucursal-title">Crear una Sucursal</h5>
                    {warningMessage && <div className="alert alert-warning">{warningMessage}</div>}
                    <div className="container-sucursal-main">
                        <div className="grid-container-sucursal">
                            {placeholders.map((item, index) => (
                                <input
                                    key={index}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    className="form-control-sucursal"
                                    style={{ marginBottom: "10px", textAlign: "center" }}
                                    onChange={handleChange}
                                />
                            ))}
                        </div>
                        <div className="img-buttons-sucursal">
                            <div className="input-group-sucursal">
                                <input
                                    type="file"
                                    className="form-control-sucursal"
                                    id="inputGroupFile"
                                    aria-label="Upload"
                                    onChange={handleFileChange}
                                    style={{ cursor: "pointer" }}
                                />
                                <span className="input-group-text">
                                    <FaImage />
                                </span>
                            </div>
                            <div className="buttons-sucursal">
                                <button type="button" className="btn btn-dark" onClick={handleConfirm}>
                                    Confirmar
                                </button>
                                <button type="button" className="btn btn-danger" onClick={onClose}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
