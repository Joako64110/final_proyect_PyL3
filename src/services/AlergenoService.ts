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

	async deleteAllergen(id: number) {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: 'DELETE',
		});
	
		// Verifica la respuesta del servidor
		if (!response.ok) {
			const errorMessage = await response.text();  // Captura el mensaje de error de la respuesta
			console.error("Error al eliminar el alérgeno:", errorMessage);
			throw new Error('Error al eliminar el alérgeno');
		}
	
		// Si la respuesta es exitosa, puedes intentar obtener el JSON o manejar la respuesta según lo que devuelva la API
		return response.json();  // O, si no hay respuesta JSON, simplemente puedes retornar algo diferente
	}
}