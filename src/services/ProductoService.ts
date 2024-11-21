const API_BASE_URL = "http://190.221.207.224:8090/articulos"; // Asegúrate de que este sea el endpoint correcto.

export const fetchArticulosBySucursal = async (sucursalId: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/porSucursal/${sucursalId}`, {
            method: "GET",
        });

        if (!response.ok) {

            throw new Error(`Error HTTP: ${response.status}`);
        }

        const articulos = await response.json();
        return articulos;
    } catch (error) {
        console.error("Error al obtener los artículos:", error);
        throw error; // Lanzamos el error para manejarlo en el componente.
    }
};

export const createArticulo = async (articulo: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(articulo),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const newArticulo = await response.json();
        return newArticulo;
    } catch (error) {
        console.error("Error al crear el artículo:", error);
        throw error;
    }
};

export const updateArticulo = async (id: number, articulo: any) => {
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

        const updatedArticulo = await response.json();
        return updatedArticulo;
    } catch (error) {
        console.error("Error al actualizar el artículo:", error);
        throw error;
    }
};

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
