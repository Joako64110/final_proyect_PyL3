import { IEmpresa } from "../types/IEmpresa";

class EmpresaService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${import.meta.env.VITE_URL_API}/empresas`; // Usa la URL de tu API
    }

    // Método para obtener todas las empresas
    async getAll(): Promise<IEmpresa[]> {
        const response = await fetch(this.baseUrl);
        const data = await response.json();
        return data as IEmpresa[];
    }
}

const empresaService = new EmpresaService();
export default empresaService;