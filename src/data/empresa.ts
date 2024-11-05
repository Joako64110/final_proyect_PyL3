import { IEmpresa } from "../types/IEmpresa"

export const empresas: IEmpresa[] = [
    {
        id: 1,
        nombre: 'Empresa 1',
        ciudad: 'Ciudad 1',
        sucursales: [
        { id: "dc-batman", nombre: 'Sucursal 1', direccion: 'Salta 123', apertura: '00:00hs - 00:00hs' },
        { id: "dc-black", nombre: 'Sucursal 2', direccion: 'Salta 124', apertura: '08:00hs - 18:00hs' },
        { id: "dc-flash", nombre: 'Sucursal 3', direccion: 'Salta 124', apertura: '08:00hs - 18:00hs' },
        { id: "dc-wonder", nombre: 'Sucursal 4', direccion: 'Salta 124', apertura: '08:00hs - 18:00hs' },
        ],
    },
    {
        id: 2,
        nombre: 'Empresa 2',
        ciudad: 'Ciudad 2',
        sucursales: [
        { id: "dc-superman", nombre: 'Sucursal 1', direccion: 'Av. Libertador 123', apertura: '09:00hs - 20:00hs' },
        { id: "dc-blue", nombre: 'Sucursal 2', direccion: 'Av. Siempre Viva 456', apertura: '10:00hs - 22:00hs' },
        { id: "dc-robin", nombre: 'Sucursal 3', direccion: 'Salta 124', apertura: '08:00hs - 18:00hs' },
        { id: "dc-green", nombre: 'Sucursal 4', direccion: 'Salta 124', apertura: '08:00hs - 18:00hs' },
        ],
    },
];
