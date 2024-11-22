import { ICreateProducto } from "../types/dtos/productos/ICreateProducto";
import { IUpdateProducto } from "../types/dtos/productos/IUpdateProducto";

const API_BASE_URL = "http://190.221.207.224:8090/articulos";

// Función para obtener artículos por sucursal
export const fetchArticulosBySucursal = async (sucursalId: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/porSucursal/${sucursalId}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json(); // Devuelve los artículos
    } catch (error) {
        console.error("Error al obtener los artículos:", error);
        throw error; // Relanzamos el error para manejarlo en el componente
    }
};

// Función para crear un artículo
export const createArticulo = async (articulo: ICreateProducto) => {
    try {
        const response = await fetch(`${API_BASE_URL}/articulo/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(articulo),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json(); // Devuelve el artículo creado
    } catch (error) {
        console.error("Error al crear el artículo:", error);
        throw error;
    }
};

// Función para actualizar un artículo
export const updateArticulo = async (id: number, articulo: IUpdateProducto) => {
    try {
        const response = await fetch(`${API_BASE_URL}/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(articulo),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json(); // Devuelve el artículo actualizado
    } catch (error) {
        console.error("Error al actualizar el artículo:", error);
        throw error;
    }
};

// Función para eliminar un artículo
export const deleteArticulo = async (id: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error("Error al eliminar el artículo:", error);
        throw error;
    }
};
