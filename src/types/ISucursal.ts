import { ICategorias } from "./ICategorias";
import { IDomicilio } from "./IDomicilio";
import { IEmpresa } from "./IEmpresa";

export interface ISucursal {
  id: number;
  nombre: string;
  empresa: IEmpresa;
  domicilio: IDomicilio;
  calle: string;
  latitud: number;
  longitud: number;
  categorias: ICategorias[];
  esCasaMatriz: boolean;
  horarioApertura: string;
  horarioCierre: string;
  eliminado: boolean;
  logo?: string;
}
