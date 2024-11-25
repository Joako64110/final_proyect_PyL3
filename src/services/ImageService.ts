import { BackendClient } from "./BackendClient";
import { IImagen } from "../types/IImagen";
const API_URL = import.meta.env.VITE_URL_API;

export class ImageService extends BackendClient<IImagen> {
    async uploadImage(file: File): Promise<IImagen> {
            const formData = new FormData();
            formData.append("uploads", file);

            const response = await fetch(`${this.baseUrl}/images/uploads`, {
            method: "POST",
            body: formData,
            });
        
            if (!response.ok) {
            throw new Error("Error al subir la imagen");
            }
        
            const textData = await response.text();
        
            const data = textData.startsWith("{")
            ? JSON.parse(textData)
            : { url: textData, name: "generatedPublicId" };
                    
            return { name: data.name, url: data.url };
        }
}