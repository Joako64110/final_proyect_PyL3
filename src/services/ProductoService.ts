export const fetchArticulosBySucursal = async (sucursalId: number) => {
    try {
        const response = await fetch(`http://190.221.207.224:8090/articulos/porSucursal/${sucursalId}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const articulos = await response.json();
        return articulos;
    } catch (error) {
        console.error("Error al obtener los artículos:", error);
        throw error; // Re-lanzar el error para que el componente lo maneje si es necesario
    }
};

export const createArticulo = async (articulo: any) => {
    try {
        const response = await fetch(`http://190.221.207.224:8090/articulos/create`, {
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
        const response = await fetch(`http://190.221.207.224:8090/articulos/update/${id}`, {
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
        const response = await fetch(`http://190.221.207.224:8090/articulos/${id}`, {
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
