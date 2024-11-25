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
    empresaId: number;
    onAddSucursal: (newSucursal: ISucursal) => void;
    searchTerm: string;
}

const SucursalesGrid: React.FC<SucursalesGridProps> = ({ empresaId, searchTerm }) => {
    const [sucursales, setSucursales] = useState<ISucursal[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSucursal, setSelectedSucursal] = useState<ISucursal | null>(null);
    const [previousSucursales, setPreviousSucursales] = useState<ISucursal[]>([]);
    const [filteredSucursales, setFilteredSucursales] = useState<ISucursal[]>([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [sucursalAEditar, setSucursalAEditar] = useState<ISucursal | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSucursales = async () => {
            setLoading(true);
            try {
                const data = await sucursalesService.getByEmpresaId(empresaId);
                setSucursales(data);
            } catch (error) {
                console.error('Error al obtener las sucursales:', error);
            } finally {
                setLoading(false);
            }
        };

        if (empresaId) {
            fetchSucursales();
        }
    }, [empresaId]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredSucursales(sucursales);
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
                    const data = await sucursalesService.getByEmpresaId(empresaId);
                    const currentIds = data.map(sucursal => sucursal.id);
                    const previousIds = previousSucursales.map(sucursal => sucursal.id);

                    if (JSON.stringify(currentIds) !== JSON.stringify(previousIds)) {
                        setSucursales(data);
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
        localStorage.setItem("idSucursal", id.toString());
        navigate(`/categorias/allCategoriasPorSucursal/${id}`);
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
        setSucursalAEditar(sucursal);
        setEditModalVisible(true);
    };

    const handleCloseEditModal = () => {
        setEditModalVisible(false);
        setSucursalAEditar(null);
    };

    const handleUpdateSucursal = async (updatedSucursal: IUpdateSucursal) => {
        setSucursales(prevSucursales =>
            prevSucursales.map(sucursal => {
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
                                onEditar={() => handleEditar(sucursal)}
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
                    sucursal={sucursalAEditar}
                    onClose={handleCloseEditModal}
                    onUpdateSucursal={handleUpdateSucursal}
                />
            )}
        </div>
    );
};

export default SucursalesGrid;
