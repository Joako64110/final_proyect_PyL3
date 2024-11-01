import { ISucursal } from "../types/ISucursal"

export interface IEmpresa {
id: number;
nombre: string;
ciudad: string;
sucursales: ISucursal[];
}