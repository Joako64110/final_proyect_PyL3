import React, { useState, useEffect } from "react";
import { IUpdateSucursal } from "../../../types/dtos/sucursal/IUpdateSucursal";
import { getAllPais } from "../../../services/PaisService";
import { getProvinciasByPais } from "../../../services/ProvinciaService";
import { getLocalidadesByProvincia } from "../../../services/LocalidadService";
import sucursalesService from "../../../services/SucursalService";
import { ISucursal } from "../../../types/ISucursal";
import "./EditarSucursal.css"


interface EditarSucursalProps {
    sucursal: ISucursal; // Asegúrate de que el tipo sea ISucursal
    onClose: () => void;
    onUpdateSucursal: (updatedSucursal: IUpdateSucursal) => void; // Asegúrate de que onUpdateSucursal reciba un IUpdateSucursal
}

export const EditarSucursal: React.FC<EditarSucursalProps> = ({ sucursal, onClose, onUpdateSucursal }) => {
    const [sucursalData, setSucursalData] = useState<IUpdateSucursal>({
        id: sucursal.id,
        nombre: sucursal.nombre,
        horarioApertura: sucursal.horarioApertura,
        horarioCierre: sucursal.horarioCierre,
        domicilio: {
            id: sucursal.domicilio.id,
            calle: sucursal.domicilio.calle,
            numero: sucursal.domicilio.numero,
            cp: sucursal.domicilio.cp,
            piso: sucursal.domicilio.piso || 0,
            nroDpto: sucursal.domicilio.nroDpto || 0,
            idLocalidad: sucursal.domicilio.localidad.id,
        },
        idEmpresa: sucursal.empresa.id,
        logo: sucursal.logo || null,
        categorias: sucursal.categorias || [],
        esCasaMatriz: sucursal.esCasaMatriz,
        eliminado: sucursal.eliminado,
        latitud: sucursal.latitud || 0,
        longitud: sucursal.longitud || 0,
    });

    const [paises, setPaises] = useState<any[]>([]);
    const [provincias, setProvincias] = useState<any[]>([]);
    const [localidades, setLocalidades] = useState<any[]>([]);
    const [selectedPais, setSelectedPais] = useState<number | null>(
        sucursal.domicilio.localidad.provincia.pais.id
    );
    const [selectedProvincia, setSelectedProvincia] = useState<number | null>(
        sucursal.domicilio.localidad.provincia.id
    );

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
        if (selectedPais !== null) {
            const fetchProvincias = async () => {
                try {
                    const provincias = await getProvinciasByPais(selectedPais);
                    setProvincias(provincias);
                } catch (error) {
                    console.error("Error al cargar provincias:", error);
                }
            };
            fetchProvincias();
        }
    }, [selectedPais]);

    useEffect(() => {
        if (selectedProvincia !== null) {
            const fetchLocalidades = async () => {
                try {
                    const localidades = await getLocalidadesByProvincia(selectedProvincia);
                    setLocalidades(localidades);
                } catch (error) {
                    console.error("Error al cargar localidades:", error);
                }
            };
            fetchLocalidades();
        }
    }, [selectedProvincia]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSucursalData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDomicilioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSucursalData((prev) => ({
            ...prev,
            domicilio: {
                ...prev.domicilio,
                [name]: name === "numero" || name === "cp" ? parseInt(value) : value,
            },
        }));
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === "pais") {
            setSelectedPais(parseInt(value));
            setSucursalData((prev) => ({
                ...prev,
                domicilio: {
                    ...prev.domicilio,
                    idLocalidad: 0, // Reiniciar localidad
                },
            }));
        } else if (name === "provincia") {
            setSelectedProvincia(parseInt(value));
        } else if (name === "localidad") {
            setSucursalData((prev) => ({
                ...prev,
                domicilio: {
                    ...prev.domicilio,
                    idLocalidad: parseInt(value),
                },
            }));
        }
    };

    const handleConfirm = async () => {
        try {
            await sucursalesService.updateSucursal(sucursalData.id, sucursalData);
            onUpdateSucursal(sucursalData);
            onClose();
        } catch (error) {
            console.error("Error al actualizar la sucursal:", error);
        }
    };

    return (
        <div className="modals-ed">
            <div className="card-sucursal-ed">
                <div className="card-body-ed">
                    <h5 className="card-title">Editar Sucursal</h5>
                    <div className="container-sucursal-ed">
                        <div className="grid-container-ed">
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
                                value={selectedPais ?? ""}
                                onChange={handleSelectChange}
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
                                value={selectedProvincia ?? ""}
                                onChange={handleSelectChange}
                                className="form-control"
                            >
                                <option value="">Seleccionar provincia</option>
                                {provincias.map((provincia) => (
                                    <option key={provincia.id} value={provincia.id}>
                                        {provincia.nombre}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="localidad"
                                value={sucursalData.domicilio.idLocalidad ?? ""}
                                onChange={handleSelectChange}
                                className="form-control"
                            >
                                <option value="">Seleccionar localidad</option>
                                {localidades.map((localidad) => (
                                    <option key={localidad.id} value={localidad.id}>
                                        {localidad.nombre}
                                    </option>
                                ))}
                            </select>
                            <input
                                name="calle"
                                placeholder="Calle"
                                value={sucursalData.domicilio.calle}
                                onChange={handleDomicilioChange}
                                className="form-control"
                            />
                            <input
                                name="numero"
                                placeholder="Número de la calle"
                                type="number"
                                value={sucursalData.domicilio.numero}
                                onChange={handleDomicilioChange}
                                className="form-control"
                            />
                            <input
                                name="cp"
                                placeholder="Código Postal"
                                type="number"
                                value={sucursalData.domicilio.cp}
                                onChange={handleDomicilioChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="buttons-CS">
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
    );
};



