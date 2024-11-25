import React, { useState } from 'react';
import { IEmpresa } from "../../../../types/IEmpresa";
import Actions from "../../Actions/actions";
import { MostrarEmpresa } from '../../../modals/MostrarEmpresa/MostrarEmpresa';
import { CrearEmpresa } from '../../../modals/CrearEmpresa/CrearEmpresa';
import styles from "./CardEmpresa.module.css";
import { ICreateEmpresaDto } from '../../../../types/dtos/empresa/ICreateEmpresaDto';
import { AppDispatch } from '../../../../redux/store';

interface Props {
    empresa: IEmpresa;
    onSelect: () => void;
    isSeleccionada: boolean;
    dispatch: AppDispatch;
    onConfirmarEdicion: () => void;
}

export const CardEmpresa: React.FC<Props> = ({ empresa, onSelect, isSeleccionada, dispatch, onConfirmarEdicion }) => {
    const [isModalVerVisible, setIsModalVerVisible] = useState<boolean>(false);
    const [isModalEditarVisible, setIsModalEditarVisible] = useState<boolean>(false);

    const handleVerClick = (id: number) => {
        setIsModalVerVisible(true);
    };

    const handleEditarClick = (id: number) => {
        setIsModalEditarVisible(true);
    };

    const handleCloseModalVer = () => {
        setIsModalVerVisible(false);
    };

    const handleCloseModalEditar = () => {
        setIsModalEditarVisible(false);
    };

    const handleConfirmarEdicion = async (empresaEditada: IEmpresa | ICreateEmpresaDto) => {
        try {
            onConfirmarEdicion();
            setIsModalEditarVisible(false);
        } catch (error) {
            console.error("Error al editar la empresa:", error);
            alert("Hubo un error al editar la empresa");
        }
    };

    const handleSelectEmpresa = () => {
        localStorage.setItem('idEmpresa', String(empresa.id));
        onSelect();
    };

    return (
        <div
            className={`${styles.tarjetaEmpresa} ${isSeleccionada ? styles.selected : ''}`}
            onClick={handleSelectEmpresa}
        >
            <p>{empresa.nombre}</p>
            <Actions
                id={empresa.id}
                actions={["ver", "editar"]}
                onVer={() => handleVerClick(empresa.id)}
                onEditar={() => handleEditarClick(empresa.id)}
            />

            {isModalVerVisible && (
                <MostrarEmpresa
                    empresa={empresa}
                    onClose={handleCloseModalVer}
                />
            )}

            {isModalEditarVisible && (
                <CrearEmpresa
                    mode="editar"
                    empresaData={empresa}
                    onClose={handleCloseModalEditar}
                    onConfirm={handleConfirmarEdicion}
                />
            )}
        </div>
    );
};

export default CardEmpresa;
