import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import styles from './SucursalesGrid.module.css';
import Actions from '../../Actions/actions';
import { useNavigate } from 'react-router-dom';
import { MostrarSucursal } from '../../../modals/MostrarSucursal/MostrarSucursal';
import sucursalesService from '../../../../services/SucursalService';
import { ISucursal } from '../../../../types/ISucursal';
import { IUpdateSucursal } from '../../../../types/dtos/sucursal/IUpdateSucursal';
import { EditarSucursal } from '../../../modals/EditarSucursal/EditarSucursal';

interface SucursalesGridProps {
    empresaId: number; // Recibe solo el ID de la empresa
    onAddSucursal: (newSucursal: ISucursal) => void; // Recibe la función como prop
    searchTerm: string; // Nueva prop

}

const SucursalesGrid: React.FC<SucursalesGridProps> = ({ empresaId, searchTerm }) => {
    const [sucursales, setSucursales] = useState<ISucursal[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSucursal, setSelectedSucursal] = useState<ISucursal | null>(null);
    const [previousSucursales, setPreviousSucursales] = useState<ISucursal[]>([]); // Para comparación de cambios
    const [filteredSucursales, setFilteredSucursales] = useState<ISucursal[]>([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [sucursalAEditar, setSucursalAEditar] = useState<ISucursal | null>(null);

    

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSucursales = async () => {
            setLoading(true);
            try {
                const data = await sucursalesService.getByEmpresaId(empresaId); // Se hace la llamada usando el ID de la empresa
                setSucursales(data); // Se guardan las sucursales
            } catch (error) {
                console.error('Error al obtener las sucursales:', error);
            } finally {
                setLoading(false);
            }
        };

        if (empresaId) {
            fetchSucursales(); // Llama solo si hay un ID de empresa válido
        }
    }, [empresaId]);

    // **2. Filtrar sucursales basado en el searchTerm**
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredSucursales(sucursales); // Sin filtro
        } else {
            const filtered = sucursales.filter((sucursal) =>
                sucursal.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sucursal.domicilio.calle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sucursal.domicilio.localidad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSucursales(filtered);
        }
    }, [searchTerm, sucursales]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (empresaId) {
                try {
                    const data = await sucursalesService.getByEmpresaId(empresaId); // Obtener las sucursales
                    const currentIds = data.map(sucursal => sucursal.id);
                    const previousIds = previousSucursales.map(sucursal => sucursal.id);

                    // Solo actualizamos si hay un cambio en los IDs de las sucursales
                    if (JSON.stringify(currentIds) !== JSON.stringify(previousIds)) {
                        setSucursales(data); // Actualizar las sucursales
                        setPreviousSucursales(data); 
                    }
                } catch (error) {
                    console.error('Error al obtener las sucursales:', error);
                }
            }
        }, 50); 

        return () => clearInterval(intervalId);
    }, [empresaId, previousSucursales]);

    const handleAbrirSuc = (id: number) => {
        localStorage.setItem("idSucursal", id.toString()); // Guardar el idSucursal en localStorage
        navigate(`/categorias/allCategoriasPorSucursal/${id}`); // Navegar a la ruta
    };
    const handleVer = (sucursal: ISucursal) => {
        setSelectedSucursal(sucursal);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedSucursal(null);
    };

    const handleAddSucursal = (newSucursal: ISucursal) => {
        setSucursales((prevSucursales) => [...prevSucursales, newSucursal]);
    };

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando sucursales...</p>;
    }

    const handleEditar = (sucursal: ISucursal) => {
        setSucursalAEditar(sucursal); // Almacena la sucursal seleccionada
        setEditModalVisible(true); // Muestra el modal
    };

    const handleCloseEditModal = () => {
        setEditModalVisible(false);
        setSucursalAEditar(null);
    };

    const handleUpdateSucursal = async (updatedSucursal: IUpdateSucursal) => {
        setSucursales(prevSucursales =>
            prevSucursales.map(sucursal => {
                // Actualizamos solo la sucursal que tiene el mismo ID
                if (sucursal.id === updatedSucursal.id) {
                    return {
                        ...sucursal,
                        nombre: updatedSucursal.nombre || sucursal.nombre,
                        domicilio: {
                            ...sucursal.domicilio,
                            calle: updatedSucursal.domicilio.calle || sucursal.domicilio.calle,
                            numero: updatedSucursal.domicilio.numero || sucursal.domicilio.numero,
                        }
                    };
                }
                return sucursal;
            })
        );
    
        // Recarga las sucursales desde la API después de la actualización
        try {
            const updatedSucursales = await sucursalesService.getByEmpresaId(empresaId);
            setSucursales(updatedSucursales);
        } catch (error) {
            console.error('Error al recargar las sucursales:', error);
        }
    };
    

    return (
        <div className={styles.containerSucPage}>
            {filteredSucursales.length === 0 ? (
                <p style={{ position: "absolute", fontWeight: "bold", marginLeft: "30%", marginTop: '2rem' }}>
                    No se encontraron sucursales...
                </p>
            ) : (
                filteredSucursales.map((sucursal) => (
                    <div key={sucursal.id} className={styles.containerSuc}>
                        <Card.Title className={styles.containerTextSucPage}>
                            <h3>{sucursal.nombre}</h3>
                        </Card.Title>
                        <div className={styles.containerImgSucPage}>
                            {/* Mostrar el logo si está disponible */}
                            {sucursal.logo ? (
                                <img
                                    src={sucursal.logo} 
                                    alt={`Logo de ${sucursal.nombre}`} 
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            ) : (
                                <p>No disponible</p>
                            )}
                        </div>
                        <div className={styles.containerTextSucPage}>
                            <p>
                                <b>Apertura:</b> {sucursal.horarioApertura} - {sucursal.horarioCierre}
                            </p>
                            <p>
                                <b>Dirección:</b> {sucursal.domicilio.calle} {sucursal.domicilio.numero}
                            </p>
                            <p>
                                <b>Ciudad:</b> {sucursal.domicilio.localidad.nombre}
                            </p>
                            <Actions
                                id={sucursal.id}
                                actions={['abrirSuc', 'editar', 'ver']}
                                onAbrirSuc={() => handleAbrirSuc(sucursal.id)}
                                onVer={() => handleVer(sucursal)}
                                onEditar={() => handleEditar(sucursal)} // Llama a la función handleEditar
                                />
                        </div>
                    </div>
                ))
            )}
            {modalVisible && selectedSucursal && (
                <MostrarSucursal sucursal={selectedSucursal} onClose={handleCloseModal} />
            )}

            {editModalVisible && sucursalAEditar && (
                <EditarSucursal
                    sucursal={sucursalAEditar} // Pasa la sucursal seleccionada
                    onClose={handleCloseEditModal} // Función para cerrar el modal
                    onUpdateSucursal={handleUpdateSucursal} // Actualizar la lista tras la edición
                />
            )}
        </div>
    );
};

export default SucursalesGrid;





