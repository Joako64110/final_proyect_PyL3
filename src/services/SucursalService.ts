import { BackendClient } from "./BackendClient";
import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";
import { ISucursal } from "../types/ISucursal";

class SucursalesService extends BackendClient<ISucursal> {
  constructor() {
    super(`${import.meta.env.VITE_URL_API}/sucursales`);
  }

  // Método para crear una nueva sucursal
  async createSucursal(data: ICreateSucursal): Promise<ISucursal> {
    try {
        const response = await fetch(`${this.baseUrl}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Solo lanza un error si el estado de la respuesta no es exitoso
        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Error en la solicitud POST: ${response.status} - ${errorDetails}`);
        }

        const newSucursal = await response.json();
        return newSucursal as ISucursal;
    } catch (error) {
        console.error("Error en la solicitud POST:", error);
        throw error; // Lanza el error para que el componente de llamado pueda manejarlo
    }
}
  

  // Método para actualizar una sucursal existente
  async updateSucursal(id: number, data: IUpdateSucursal): Promise<ISucursal> {
    const response = await fetch(`${this.baseUrl}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updatedSucursal = await response.json();
    return updatedSucursal as ISucursal;
  }

  // Método para obtener sucursales por ID de empresa
  async getByEmpresaId(empresaId: number): Promise<ISucursal[]> {
    const response = await fetch(`${this.baseUrl}/porEmpresa/${empresaId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Convierte la respuesta a JSON y la retorna
    const sucursales = await response.json();
    return sucursales as ISucursal[];
  }

    // Método para obtener una sucursal por ID

  async getSucursalById(id: number): Promise<ISucursal> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error al obtener la sucursal: ${response.status} - ${errorDetails}`);
      }

      const sucursal = await response.json();
      return sucursal as ISucursal;
    } catch (error) {
      console.error("Error al obtener la sucursal:", error);
      throw error;
    }
  }
}

// Exportamos una instancia del servicio
const sucursalesService = new SucursalesService();
export default sucursalesService;