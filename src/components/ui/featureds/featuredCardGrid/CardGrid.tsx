import React, { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import styles from "./CardGrid.module.css";
import Actions from '../../Actions/actions';
import { useNavigate } from 'react-router-dom';
import { MostrarSucursal } from '../../../modals/MostrarSucursal/MostrarSucursal';
import sucursalesService from '../../../../services/SucursalService';
import { ISucursal } from '../../../../types/ISucursal';

const SucursalesGrid: React.FC = () => {
    const [sucursales, setSucursales] = useState<ISucursal[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSucursal, setSelectedSucursal] = useState<ISucursal | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const data = await sucursalesService.getAll();
                setSucursales(data);
            } catch (error) {
                console.error("Error al obtener las sucursales:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSucursales();
    }, []);

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

    if (loading) {
        return <p>Cargando sucursales...</p>;
    }


    return (
        <div className={styles.containerSucPage}>
            {sucursales.map((sucursal) => (
                <div key={sucursal.id} className={styles.containerSuc}>
                    <Card.Title className={styles.containerTextSucPage}>
                        <h3>{sucursal.nombre}</h3>
                    </Card.Title>
                    <div className={styles.containerImgSucPage}>
                        <Card.Img/>
                    </div>
                    <div className={styles.containerTextSucPage}>
                            <p>
                                <b>Apertura:</b> {sucursal.horarioApertura} - {sucursal.horarioCierre}
                            </p>
                            <p>
                                <b>Dirección:</b> {sucursal.calle} {sucursal.latitud}
                            </p>
                            <p>
                                <b>Ciudad:</b> {sucursal.domicilio.localidad.nombre}
                            </p>
                        <Actions
                            id={sucursal.id}
                            actions={["abrirSuc", "editar", "ver"]}
                            onAbrirSuc={() => handleAbrirSuc(sucursal.id)}
                            onVer={() => handleVer(sucursal)}
                            onEditar={() => console.log("Editar")}
                        />
                    </div>
                </div>
            ))}
            {modalVisible && selectedSucursal && (
                <MostrarSucursal sucursal={selectedSucursal} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default SucursalesGrid;
