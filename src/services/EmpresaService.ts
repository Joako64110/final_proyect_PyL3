import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { IUpdateEmpresaDto } from "../types/dtos/empresa/IUpdateEmpresaDto";
import { IEmpresa } from "../types/IEmpresa";

class EmpresaService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${import.meta.env.VITE_URL_API}/empresas`; // Usa la URL de tu API
    }


    // Método para obtener todas las empresas
    public async getAll(): Promise<IEmpresa[]> {
        try {
            const response = await fetch(this.baseUrl);

            if (!response.ok) {
                throw new Error(`Error al obtener empresas: ${response.statusText}`);
            }

            const data = await response.json();
            return data as IEmpresa[];
        } catch (error) {
            console.error("Error al obtener empresas:", error);
            throw error;
        }
    }

     // Método para crear una empresa
    public async create(empresaData: ICreateEmpresaDto): Promise<IEmpresa> {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empresaData),
            });

            if (!response.ok) {
                throw new Error(`Error al crear la empresa: ${response.statusText}`);
            }

            const data = await response.json();
            return data as IEmpresa;
        } catch (error) {
            console.error("Error al crear la empresa:", error);
            throw error;
        }
    }

    // Método para actualizar una empresa
    public async update(id: number, empresaData: IUpdateEmpresaDto): Promise<IEmpresa> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empresaData),
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar la empresa con ID ${id}: ${response.statusText}`);
            }

            const data = await response.json();
            return data as IEmpresa;
        } catch (error) {
            console.error(`Error al actualizar la empresa con ID ${id}:`, error);
            throw error;
        }
    }

    public async getById(id: number): Promise<IEmpresa | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`);

            if (!response.ok) {
                throw new Error(`Error al obtener la empresa con ID ${id}: ${response.statusText}`);
            }

            const data = await response.json();
            return data as IEmpresa;
        } catch (error) {
            console.error(`Error al obtener la empresa con ID ${id}:`, error);
            throw error;
        }
    }

}

const empresaService = new EmpresaService();
export default empresaService;