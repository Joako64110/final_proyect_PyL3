export interface IEmpelados {
  id: number;

  nombre: string;
  apellido: string;
  email: string;
  dni: number;
  telefono: number;
  rol: "superAdmin" | "adminEmpresa" | "adminSucursal";
}
