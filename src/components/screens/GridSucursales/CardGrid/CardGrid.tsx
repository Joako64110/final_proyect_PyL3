import React from 'react';
import { Card } from "react-bootstrap"
import styles from "./CardGrid.module.css"
import { ISucursal } from '../../../../types/ISucursal';

interface SucursalesGridProps {
    sucursales: ISucursal[];
    ciudad: string;
}

const SucursalesGrid: React.FC<SucursalesGridProps> = ({ sucursales, ciudad }) => {
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
                                    <b>Apertura:</b> {sucursal.apertura}
                                </p>
                                <p>
                                    <b>Dirección:</b> {sucursal.direccion}
                                </p>
                                <p>
                                    <b>Ciudad:</b> {ciudad}
                                </p>
                        </Card.Text>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SucursalesGrid;
