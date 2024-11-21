import { IEmpresa } from "../../../types/IEmpresa";
import { ICreateEmpresaDto } from "../../../types/dtos/empresa/ICreateEmpresaDto";
import empresaService from "../../../services/EmpresaService"; // Importar el servicio
import { useState } from "react";
import './CrearEmpresa.css';

interface CrearEmpresaProps {
    mode: "crear" | "editar"; // Añadimos el modo de la acción (crear o editar)
    empresaData?: IEmpresa; // Datos de empresa si estamos en modo edición
    onClose: () => void;
    onConfirm: (empresa: IEmpresa | ICreateEmpresaDto) => void; // Cambiar el tipo de `onConfirm` para aceptar tanto IEmpresa como ICreateEmpresaDto
}

export const CrearEmpresa: React.FC<CrearEmpresaProps> = ({ mode, empresaData, onClose, onConfirm }) => {
    const [nombre, setNombre] = useState<string>(empresaData?.nombre || ""); // Prellena los campos si estamos en modo edición
    const [razonSocial, setRazonSocial] = useState<string>(empresaData?.razonSocial || "");
    const [cuit, setCuit] = useState<number | null>(empresaData?.cuit || null);
    const [fileName, setFileName] = useState<string>(empresaData?.logo || "");

    // Función para manejar la confirmación
    const handleConfirmClick = async () => {
        const nuevaEmpresa: ICreateEmpresaDto = {
            nombre,
            razonSocial,
            cuit: cuit || 0,
            logo: fileName,
        };

        if (mode === "crear") {
            try {
                // Llamar al método create del servicio para crear la empresa
                const empresaCreada = await empresaService.create(nuevaEmpresa);
                onConfirm(empresaCreada); // Llamamos a onConfirm con la empresa creada
            } catch (error) {
                console.error("Error al crear la empresa:", error);
                alert("Hubo un error al crear la empresa");
            }
        } else if (mode === "editar" && empresaData) {
            // Si estamos en modo edición, creamos el objeto de empresa con los datos editados
            const empresaEditada: IEmpresa = {
                ...empresaData,
                nombre,
                razonSocial,
                cuit: cuit || 0,
                logo: fileName,
            };

            try {
                // Llamar al método update del servicio para editar la empresa
                await empresaService.update(empresaData.id, empresaEditada);
                onConfirm(empresaEditada); // Llamamos a onConfirm con la empresa editada
            } catch (error) {
                console.error("Error al actualizar la empresa:", error);
                alert("Hubo un error al actualizar la empresa");
            }
        }

        onClose(); // Cerrar el modal después de la confirmación
    };

    return (
        <div className="modals-CE">
            <div className="card-CE" style={{ maxWidth: "550px" }}>
                <div className="card-body-CE">
                    <h5 className="card-title-CE">{mode === "crear" ? "Crear una Empresa" : "Editar Empresa"}</h5>
                    <div className="mb-3-main-CE">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ingrese un nombre:"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ingrese la razón social:"
                            value={razonSocial}
                            onChange={(e) => setRazonSocial(e.target.value)}
                        />
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Ingrese el CUIT:"
                            value={cuit || ""}
                            onChange={(e) => setCuit(Number(e.target.value))}
                        />
                        <div className="buttons-CE">
                            <button
                                type="button"
                                style={{backgroundColor:"rgba(44, 44, 44, 1)", color:"aliceblue", width:"30%"}}
                                className="btn btn-dark"
                                onClick={handleConfirmClick}
                            >
                                Confirmar
                            </button>
                            <button
                                type="button"
                                style={{backgroundColor:"rgba(236, 34, 31, 1)", color:"aliceblue", width:"30%"}}
                                className="btn btn-danger"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};







