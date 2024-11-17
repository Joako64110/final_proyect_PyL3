import { IAlergenos } from "./IAlergenos";
import { ICategorias } from "./ICategorias";
import { IImagen } from "./IImagen";

export interface IProductos {
  id: number;
  denominacion: string;
  precioVenta: number;
  descripcion: string;
  categoria: ICategorias;
  eliminado: boolean;
  habilitado: boolean;
  codigo: string;
  alergenos: IAlergenos[];
  imagenes: IImagen[];
}
