import { ICreateCategoria } from "../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../types/dtos/categorias/IUpdateCategoria";
import { ICategorias } from "../types/ICategorias";

class CategoriaService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${import.meta.env.VITE_URL_API}/categorias`;
    }

    // Método para obtener todas las categorías
    async getAll(): Promise<ICategorias[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as ICategorias[];
    }

    // Método para obtener una categoría por ID
    async getById(id: number): Promise<ICategorias> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as ICategorias;
    }

    // Método para obtener todas las categorias padres por sucursal
    async getAllCategoriasPadrePorSucursal(idSucursal: number): Promise<ICategorias[]> {
        const response = await fetch(`${this.baseUrl}/allCategoriasPadrePorSucursal/${idSucursal}`)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as ICategorias[];
    }

    // Método para obtener todas las categorias hija por id del padre
    async getAllSubCategoriasPorCategoriaPadre(id: number, idSucursal: number): Promise<ICategorias[]> {
        const response = await fetch(`${this.baseUrl}/allSubCategoriasPorCategoriaPadre/${id}/${idSucursal}`)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as ICategorias[];
    }

    // Método para obtener todas las categorias hijas por sucursal
    async getAllSubCategoriasPorSucursal(id: number): Promise<ICategorias> {
        const response = await fetch(`${this.baseUrl}/allSubCategoriasPorSucursal/${id}`)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as ICategorias;
    }

    // Método para crear una nueva categoría
    async create(categoria: ICreateCategoria): Promise<ICategorias> {
        const response = await fetch(`${this.baseUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as ICategorias;
    }

    // Método para actualizar una categoría existente
    async update(id: number, categoria: IUpdateCategoria): Promise<ICategorias> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as ICategorias;
    }

    // Método para eliminar una categoría
    async delete(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }
}

const categoriaService = new CategoriaService();
export default categoriaService;