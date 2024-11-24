import { baseDto } from "../baseDto/baseDto";

export interface IUpdateCategoria extends baseDto {
  id: number;
  denominacion: string;
  eliminado: boolean;
  idSucursales: number[];
  idCategoriaPadre?: number | null;
}
