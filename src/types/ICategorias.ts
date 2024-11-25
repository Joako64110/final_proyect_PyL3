import { IProductos } from "./IProductos";
import { ISucursal } from "./ISucursal";

export interface ICategorias {
  id: number;
  denominacion: string;
  eliminado: boolean;
  sucursales: ISucursal[];
  subCategorias: ICategorias[];
  categoriaPadre?: ICategorias | null;
  articulos: IProductos;
}
