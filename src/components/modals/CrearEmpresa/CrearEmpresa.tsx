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
    onAddSucursal: (newSucursal: ISucursal) => void;
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
        <div className="modal-crear-sucursal">
            <div className="card-crear-sucursal">
                <div className="card-body-crear-sucursal">
                    <h5 className="card-title-crear-sucursal">Crear una Sucursal</h5>
                    {warningMessage && <div className="alert-warning">{warningMessage}</div>}
                    <div className="container-crear-sucursal">
                        <div className="grid-container-crear-sucursal">
                            {placeholders.map((item, index) => (
                                <input
                                    key={index}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    className="form-control-crear-sucursal"
                                    onChange={handleChange}
                                />
                            ))}
                        </div>
                        <div className="img-buttons-crear-sucursal">
                            <div className="input-group-crear-sucursal">
                                <input
                                    type="file"
                                    className="form-control-crear-sucursal"
                                    onChange={handleFileChange}
                                />
                                <span className="input-group-text">
                                    <FaImage />
                                </span>
                            </div>
                            <div className="buttons-crear-sucursal">
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
