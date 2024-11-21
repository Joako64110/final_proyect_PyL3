import React, { useEffect, useState } from "react";
import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal"; // Importa la interfaz ICreateSucursal
import { getAllPais } from "../../../services/PaisService"; // Servicio para obtener países
import { getProvinciasByPais } from "../../../services/ProvinciaService"; // Servicio para obtener provincias
import { getLocalidadesByProvincia } from "../../../services/LocalidadService"; // Servicio para obtener localidades
import './CrearSucursal.css';
import sucursalesService from "../../../services/SucursalService";

interface ModalSucursalProps {
    onClose: () => void;
    onAddSucursal: (newSucursal: ICreateSucursal) => void;
    idEmpresa: number;

}

export const CrearSucursal: React.FC<ModalSucursalProps> = ({ onClose, onAddSucursal, idEmpresa }) => {
    const [sucursalData, setSucursalData] = useState<ICreateSucursal>({
        nombre: "",
        horarioApertura: "",
        horarioCierre: "",
        esCasaMatriz: false,
        latitud: "",
        longitud: "", 
        domicilio: {
            calle: "",
            numero: "", 
            cp: "", 
            piso: "", 
            nroDpto: "", 
            idLocalidad: 0,
        },
        idEmpresa: idEmpresa, 
        logo: null, // Aquí guardamos la imagen (logo)
    });

    const [paises, setPaises] = useState<any[]>([]);
    const [provincias, setProvincias] = useState<any[]>([]);
    const [localidades, setLocalidades] = useState<any[]>([]);
    const [selectedPais, setSelectedPais] = useState<number | null>(null);
    const [selectedProvincia, setSelectedProvincia] = useState<number | null>(null);

    // Cargar los países al montar el componente
    useEffect(() => {
        const fetchPaises = async () => {
            try {
                const paises = await getAllPais();
                setPaises(paises);
            } catch (error) {
                console.error("Error al cargar países:", error);
            }
        };
        fetchPaises();
    }, []);

    // Cargar provincias cuando se selecciona un país
    useEffect(() => {
        const fetchProvincias = async () => {
            if (selectedPais !== null) {
                try {
                    const provinciasResponse = await getProvinciasByPais(selectedPais);
                    setProvincias(provinciasResponse);
                    setSelectedProvincia(null);
                } catch (error) {
                    console.error("Error al cargar provincias:", error);
                    setProvincias([]);
                }
            }
        };

        fetchProvincias();
    }, [selectedPais]);

    // Cargar localidades cuando se selecciona una provincia
    useEffect(() => {
        const fetchLocalidades = async () => {
            if (selectedProvincia !== null) {
                try {
                    const localidades = await getLocalidadesByProvincia(selectedProvincia);
                    setLocalidades(localidades);
                } catch (error) {
                    console.error("Error al cargar localidades:", error);
                }
            }
        };

        fetchLocalidades();
    }, [selectedProvincia]);

    // Manejador para inputs (como nombre, horario, etc.)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
    
        // Si el campo es 'calle', lo tratamos como texto
        if (name === "calle") {
            setSucursalData({
                ...sucursalData,
                domicilio: { ...sucursalData.domicilio, calle: value },
            });
        } else if (name in sucursalData.domicilio) {
            // Para otros campos numéricos, permitimos que '0' sea un valor válido
            const updatedValue = ["numero", "cp", "piso", "nroDpto"].includes(name)
                ? (value === "" ? "" : parseInt(value)) // Permitimos '0' y otros números
                : value;
    
            setSucursalData({
                ...sucursalData,
                domicilio: { ...sucursalData.domicilio, [name]: updatedValue },
            });
        } else if (name === "esCasaMatriz") {
            setSucursalData({ ...sucursalData, [name]: event.target.checked });
        } else {
            setSucursalData({ ...sucursalData, [name]: value });
        }
    };

    // Manejador para selects (como país, provincia, localidad)
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === "localidad") {
            setSucursalData({
                ...sucursalData,
                domicilio: { ...sucursalData.domicilio, idLocalidad: parseInt(value) }, // Asignamos el idLocalidad
            });
        } else {
            setSucursalData({ ...sucursalData, [name]: value });
        }
    };

    // Manejador para la imagen (logo)
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSucursalData((prevState) => ({
                    ...prevState,
                    logo: reader.result as string, // Guarda la imagen como base64
                }));
            };
            reader.readAsDataURL(file); // Convierte la imagen a base64
        }
    };

    const handleConfirm = async () => {
        try {
            // Realizar el POST para crear la nueva sucursal
            await sucursalesService.createSucursal(sucursalData);
            onClose();  // Cerrar el modal
    
            // Llamar al callback para agregar la nueva sucursal
            await onAddSucursal(sucursalData);
        } catch (error) {
            console.error("Error al crear la sucursal:", error);
        }
    };

    return (
        <div className="modals">
            <div className="card-sucursal">
                <div className="card-body">
                    <h5 className="card-title">Crear una Sucursal</h5>
                    <div className="container-sucursal">
                        <div className="grid-container">

                            {/* Campos de texto */}
                            <input
                                name="nombre"
                                placeholder="Nombre de la sucursal"
                                value={sucursalData.nombre}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                            <input
                                name="horarioApertura"
                                placeholder="Horario de apertura"
                                value={sucursalData.horarioApertura}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                            <input
                                name="horarioCierre"
                                placeholder="Horario de cierre"
                                value={sucursalData.horarioCierre}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                            {/* Selección de País */}
                            <select
                                name="pais"
                                onChange={(e) => setSelectedPais(parseInt(e.target.value))}
                                value={selectedPais ?? ""}
                                className="form-control"
                            >
                                <option value="">Seleccionar país</option>
                                {paises.map((pais) => (
                                    <option key={pais.id} value={pais.id}>
                                        {pais.nombre}
                                    </option>
                                ))}
                            </select>

                            {/* Selección de Provincia */}
                            <select
                                name="provincia"
                                onChange={(e) => setSelectedProvincia(parseInt(e.target.value))}
                                value={selectedProvincia ?? ""}
                                className="form-control"
                                disabled={!selectedPais}
                            >
                                <option value="">Seleccionar provincia</option>
                                {provincias.length > 0 ? (
                                    provincias.map((provincia) => (
                                        <option key={provincia.id} value={provincia.id}>
                                            {provincia.nombre}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No hay provincias disponibles</option>
                                )}
                            </select>

                            {/* Selección de Localidad */}
                            <select
                                name="localidad"
                                onChange={handleSelectChange}
                                value={sucursalData.domicilio.idLocalidad || ""}
                                className="form-control"
                                disabled={!selectedProvincia}
                            >
                                <option value="">Seleccionar localidad</option>
                                {localidades.map((localidad) => (
                                    <option key={localidad.id} value={localidad.id}>
                                        {localidad.nombre}
                                    </option>
                                ))}
                            </select>

                            {/* Campos numéricos */}
                            <div className="form-group">
                                <input
                                    id="latitud"
                                    name="latitud"
                                    type="number"
                                    placeholder="Latitud"
                                    value={sucursalData.latitud}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    id="longitud"
                                    name="longitud"
                                    type="number"
                                    placeholder="Longitud"
                                    value={sucursalData.longitud}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                            <input
                                id="calle"
                                name="calle"
                                placeholder="Calle"
                                value={sucursalData.domicilio.calle || ""}  // Asegúrate de que nunca sea NaN
                                onChange={handleInputChange}
                                className="form-control"
                            />
                            </div>

                            <div className="form-group">
                                <input
                                    id="numero"
                                    name="numero"
                                    type="number"
                                    placeholder="Número"
                                    value={sucursalData.domicilio.numero}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    id="cp"
                                    name="cp"
                                    type="number"
                                    placeholder="Código Postal"
                                    value={sucursalData.domicilio.cp}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    id="piso"
                                    name="piso"
                                    type="number"
                                    placeholder="Piso"
                                    value={sucursalData.domicilio.piso}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    id="nroDpto"
                                    name="nroDpto"
                                    type="number"
                                    placeholder="Número de Departamento"
                                    value={sucursalData.domicilio.nroDpto}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-check">
                                <input
                                    name="esCasaMatriz"
                                    type="checkbox"
                                    checked={sucursalData.esCasaMatriz}
                                    onChange={handleInputChange}
                                    className="form-check-input"
                                />
                                <label className="form-check-label" htmlFor="esCasaMatriz">
                                    ¿Es Casa Matriz?
                                </label>
                            </div>

                            {/* Campo de Imagen (Logo) */}
                            <div className="form-group">
                                <input
                                    type="file"
                                    name="logo"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="form-control"
                                />
                                {sucursalData.logo && (
                                    <img
                                        src={sucursalData.logo}
                                        alt="Logo preview"
                                        className="logo-preview"
                                        style={{ width: "100px", height: "100px", marginTop: "10px" }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="buttons-CS">
                            <button
                                type="button"
                                style={{backgroundColor:"rgba(44, 44, 44, 1)", color:"aliceblue", width:"30%"}}
                                className="btn btn-dark"
                                onClick={handleConfirm} 
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
    );
};