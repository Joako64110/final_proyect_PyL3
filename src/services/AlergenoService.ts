import { IAlergenos } from "../types/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../types/dtos/alergenos/IUpdateAlergeno";
import { BackendClient } from "./BackendClient";

export class AlergenoService extends BackendClient<IAlergenos | ICreateAlergeno | IUpdateAlergeno> {

    async createAllergen(allergenData: ICreateAlergeno): Promise<IAlergenos> {
		const response = await fetch(`${this.baseUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(allergenData),
		});
		if (!response.ok) {
			throw new Error("Error al crear el alérgeno");
		}
		return await response.json();
	}

    async getAllAllergens(): Promise<IAlergenos[]> {
        const response = await fetch(`${this.baseUrl}`);
        const data = await response.json();
        return data as IAlergenos[];
    }

	async updateAllergen(id: number, allergenData: IUpdateAlergeno): Promise<IAlergenos> {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(allergenData),
		});
		if (!response.ok) {
			throw new Error("Error al actualizar el alérgeno");
		}
		return await response.json();
	}

	async deleteAlergeno(id: number): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.error(`Error al eliminar el alérgeno con ID ${id}:`, response.statusText);
                throw new Error(`Error al eliminar el alérgeno: ${response.status} ${response.statusText}`);
            }

            console.log(`Alérgeno con ID ${id} eliminado exitosamente.`);
        } catch (error) {
            console.error(`Error en la solicitud DELETE para el alérgeno con ID ${id}:`, error);
            throw error;
        }
    }
}