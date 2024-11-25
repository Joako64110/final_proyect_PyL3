import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import React, { useEffect, useState } from "react";
import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal"; 
import { getAllPais } from "../../../services/PaisService";
import { getProvinciasByPais } from "../../../services/ProvinciaService"; 
import { getLocalidadesByProvincia } from "../../../services/LocalidadService";
import './CrearSucursal.css';
import sucursalesService from "../../../services/SucursalService";
import { ImageService } from "../../../services/ImageService";
import "./CrearSucursal.css"

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
        logo: null, 
    });

    const [paises, setPaises] = useState<any[]>([]);
    const [provincias, setProvincias] = useState<any[]>([]);
    const [localidades, setLocalidades] = useState<any[]>([]);
    const [selectedPais, setSelectedPais] = useState<number | null>(null);
    const [selectedProvincia, setSelectedProvincia] = useState<number | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    


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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
    
        if (name === "calle") {
            setSucursalData({
                ...sucursalData,
                domicilio: { ...sucursalData.domicilio, calle: value },
            });
        } else if (name in sucursalData.domicilio) {
            const updatedValue = ["numero", "cp", "piso", "nroDpto"].includes(name)
                ? (value === "" ? "" : parseInt(value)) 
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

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === "localidad") {
            setSucursalData({
                ...sucursalData,
                domicilio: { ...sucursalData.domicilio, idLocalidad: parseInt(value) },
            });
        } else {
            setSucursalData({ ...sucursalData, [name]: value });
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setLogoFile(file);
        }
    };

    const handleConfirm = async () => {
        try {
            Swal.fire({
                title: 'Subiendo Sucursal',
                text: 'Por favor espera...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(); 
                },
            });

            let logoUrl = null;
    
            const imageService = new ImageService(import.meta.env.VITE_URL_API);
    
            if (logoFile) {
                const uploadedImage = await imageService.uploadImage(logoFile); 
                logoUrl = uploadedImage.url; 
            }
    
            const newSucursalData = {
                ...sucursalData,
                logo: logoUrl,
            };
    
            await sucursalesService.createSucursal(newSucursalData);

            Swal.fire({
                icon: 'success',
                title: 'Sucursal creada',
                text: 'La sucursal se ha creado exitosamente.',
            });


            onClose(); 
            onAddSucursal(newSucursalData); 
        } catch (error) {
            console.error("Error al crear la sucursal:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al crear la sucursal. Por favor, intenta nuevamente.',
            });
        }
    };

    return (
        <div className="modals">
            <div className="card-sucursal">
                <div className="card-body">
                    <h5 className="card-title">Crear una Sucursal</h5>
                    <div className="container-sucursal">
                        <div className="grid-container">

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
                                value={sucursalData.domicilio.calle || ""} 
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
