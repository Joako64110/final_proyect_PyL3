import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Empresa {
    id: number;
    nombre: string;
    seleccionado: boolean;
}

interface EmpresasState {
    empresas: Empresa[];
}

const initialState: EmpresasState = {
    empresas: [
        { id: 1, nombre: 'Empresa 1', seleccionado: true },
        { id: 2, nombre: 'Empresa 2', seleccionado: false },
        { id: 3, nombre: 'Empresa 3', seleccionado: false },
        { id: 4, nombre: 'Empresa 4', seleccionado: false },
    ],
};

const empresasSlice = createSlice({
    name: 'empresas',
    initialState,
    reducers: {
        agregarEmpresa: (state, action: PayloadAction<string>) => {
            const nuevaEmpresa = {
                id: state.empresas.length + 1,
                nombre: action.payload,
                seleccionado: false,
            };
            state.empresas.push(nuevaEmpresa);
        },
        seleccionarEmpresa: (state, action: PayloadAction<number>) => {
            state.empresas.forEach((empresa) => {
                empresa.seleccionado = empresa.id === action.payload;
            });
        },
        editarEmpresa: (state, action: PayloadAction<{ id: number; nombre: string }>) => {
            const empresa = state.empresas.find((e) => e.id === action.payload.id);
            if (empresa) empresa.nombre = action.payload.nombre;
        },
    },
});

export const { agregarEmpresa, seleccionarEmpresa, editarEmpresa } = empresasSlice.actions;
export default empresasSlice.reducer;
