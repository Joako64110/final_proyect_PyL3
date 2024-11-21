import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import styles from './SucursalesGrid.module.css';
import Actions from '../../Actions/actions';
import { useNavigate } from 'react-router-dom';
import { MostrarSucursal } from '../../../modals/MostrarSucursal/MostrarSucursal';
import sucursalesService from '../../../../services/SucursalService';
import { ISucursal } from '../../../../types/ISucursal';

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

    return (
        <div className={styles.containerSucPage}>
            {filteredSucursales.length === 0 ? (
                <p style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '2rem' }}>
                    No se encontraron sucursales...
                </p>
            ) : (
                filteredSucursales.map((sucursal) => (
                    <div key={sucursal.id} className={styles.containerSuc}>
                        <Card.Title className={styles.containerTextSucPage}>
                            <h3>{sucursal.nombre}</h3>
                        </Card.Title>
                        <div className={styles.containerImgSucPage}>
                            <Card.Img />
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
                                onEditar={() => console.log('Editar')}
                            />
                        </div>
                    </div>
                ))
            )}
            {modalVisible && selectedSucursal && (
                <MostrarSucursal sucursal={selectedSucursal} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default SucursalesGrid;





