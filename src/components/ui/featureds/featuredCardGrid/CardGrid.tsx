import React, { useState } from 'react';
import { Card } from "react-bootstrap"
import styles from "./CardGrid.module.css"
import Actions from '../../Actions/actions';
import { useNavigate } from 'react-router-dom';
import { MostrarSucursal } from '../../../modals/MostrarSucursal/MostrarSucursal';

interface SucursalesGridProps {
    sucursales: ISucursal[];
    ciudad: string;
}

export interface ISucursal {
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

const SucursalesGrid: React.FC<SucursalesGridProps> = ({ sucursales, ciudad }) => {
    const navigate = useNavigate();
    
    const handleAbrirSuc = (id: string) => {
        // Redirige a la página de categorías de la sucursal específica
        navigate(`/sucursales/${id}/Categorias`);
        navigate(`Categorias`);
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSucursal, setSelectedSucursal] = useState<ISucursal | null>(null);

    const handleVer = (sucursal: ISucursal) => {
        setSelectedSucursal(sucursal);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedSucursal(null);
    };

    return (
        <div className={styles.containerSucPage}>
            {sucursales.map((sucursal) => (
                <div key={sucursal.id} className={styles.containerSuc}>
                    <Card.Title className={styles.containerTextSucPage}>
                        <h3>{sucursal.nombre}</h3>
                    </Card.Title>
                    <div className={styles.containerImgSucPage}>
                        <Card.Img variant="top" src={`/assets/heroes/${sucursal.id}.jpg`} />
                    </div>
                    <div className={styles.containerTextSucPage}>
                        <Card.Text>
                                <p>
                                    <b>Apertura:</b> {sucursal.apertura} - {sucursal.cierre}
                                </p>
                                <p>
                                    <b>Dirección:</b> {sucursal.calle} {sucursal.numero}
                                </p>
                                <p>
                                    <b>Ciudad:</b> {ciudad}
                                </p>
                        </Card.Text>
                        <Actions
                            nombre={sucursal.id}
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
