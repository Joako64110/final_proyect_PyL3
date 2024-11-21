import React, { useState, useEffect } from "react";
import { IUpdateSucursal } from "../../../types/dtos/sucursal/IUpdateSucursal";
import { getAllPais } from "../../../services/PaisService";
import { getProvinciasByPais } from "../../../services/ProvinciaService";
import { getLocalidadesByProvincia } from "../../../services/LocalidadService";
import sucursalesService from "../../../services/SucursalService";
import { ISucursal } from "../../../types/ISucursal";

interface EditarSucursalProps {
    sucursal: ISucursal; // Asegúrate de que el tipo sea ISucursal
    onClose: () => void;
    onUpdateSucursal: (updatedSucursal: IUpdateSucursal) => void; // Asegúrate de que onUpdateSucursal reciba un IUpdateSucursal
}

export const EditarSucursal: React.FC<EditarSucursalProps> = ({ sucursal, onClose, onUpdateSucursal }) => {
    const [sucursalData, setSucursalData] = useState<IUpdateSucursal>({
        id: sucursal.id,
        nombre: "",
        horarioApertura: "",
        horarioCierre: "",
        domicilio: {
            id: 0,
            calle: "",
            numero: 0,
            cp: 0,
            piso: 0,
            nroDpto: 0,
            idLocalidad: 0,
        },
        idEmpresa: 0,
        logo: null,
        categorias: [], // Inicializa correctamente el arreglo de categorías
        esCasaMatriz: false,
        eliminado: false,
        latitud: 0,
        longitud: 0,
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name in sucursalData.domicilio) {
            setSucursalData({
                ...sucursalData,
                domicilio: { ...sucursalData.domicilio, [name]: value },
            });
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
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSucursalData((prevState) => ({
                    ...prevState,
                    logo: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
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
        <div className="modals">
            <div className="card-sucursal">
                <div className="card-body">
                    <h5 className="card-title">Editar Sucursal</h5>
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
                            {/* Aquí agregarás el resto del formulario de provincias, localidades, y más */}
                        </div>
                    </div>
                    <div className="buttons-CS">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={handleConfirm}
                        >
                            Confirmar
                        </button>
                        <button
                            type="button"
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



