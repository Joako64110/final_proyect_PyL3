
export interface ICreateSucursal {
  id?: number;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  latitud: number | ""; // Cambiado para aceptar "" también
  longitud: number | ""; // Cambiado para aceptar "" también
  domicilio: {
      calle: string;
      numero: number | ""; // Cambiado para aceptar "" también
      cp: number | ""; // Cambiado para aceptar "" también
      piso: number | ""; // Cambiado para aceptar "" también
      nroDpto: number | ""; // Cambiado para aceptar "" también
      idLocalidad: number;
  };
  idEmpresa: number;
  logo: string | null;
}
