import { BackendClient } from "./BackendClient";
import {ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal"; 
import {IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";
import { ISucursal} from "../types/ISucursal"; 

class SucursalesService extends BackendClient<ISucursal> {
  constructor() {
    super(`${import.meta.env.VITE_URL_API}/sucursales`);
  }

  // Método para crear una nueva sucursal
  async createSucursal(data: ICreateSucursal): Promise<ISucursal> {
    const response = await fetch(`${this.baseUrl}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newSucursal = await response.json();
    return newSucursal as ISucursal;
  }

  // Método para actualizar una sucursal existente
  async updateSucursal(id: number, data: IUpdateSucursal): Promise<ISucursal> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updatedSucursal = await response.json();
    return updatedSucursal as ISucursal;
  }

  // Método para eliminar una sucursal por su ID
  async deleteSucursal(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar la sucursal con ID ${id}`);
    }
  }
}

// Exportamos una instancia del servicio
const sucursalesService = new SucursalesService();
export default sucursalesService;