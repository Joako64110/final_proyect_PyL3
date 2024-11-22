import axios from 'axios';

const API_URL = import.meta.env.VITE_URL_API; // En lugar de process.env

// Método para obtener todos los países
export const getAllPais = async () => {
    try {
        const response = await axios.get(`${API_URL}/paises`);
        return response.data; // Suponiendo que la respuesta es un array de países
    } catch (error) {
        console.error("Error obteniendo los países:", error);
        throw error;
    }
};