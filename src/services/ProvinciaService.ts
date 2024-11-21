import axios from 'axios';

const API_URL = import.meta.env.VITE_URL_API; // En lugar de process.env

// Método para obtener las provincias por país
export const getProvinciasByPais = async (paisId: number) => {
    try {
        const response = await axios.get(`${API_URL}/provincias/findByPais/${paisId}`);
        return response.data; // Suponiendo que la respuesta es un array de provincias
    } catch (error) {
        console.error(`Error obteniendo provincias para el país ${paisId}:`, error);
        throw error;
    }
};