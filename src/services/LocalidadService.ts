import axios from 'axios';

const API_URL = import.meta.env.VITE_URL_API; // En lugar de process.env

export const getLocalidadesByProvincia = async (provinciaId: number) => {
    try {
        const response = await axios.get(`${API_URL}/localidades/findByProvincia/${provinciaId}`);
        return response.data; // Array de localidades
    } catch (error) {
        console.error("Error obteniendo localidades:", error);
        throw error;
    }
};
