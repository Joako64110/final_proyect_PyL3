import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmpresa } from '../../types/IEmpresa';
import empresaService from '../../services/EmpresaService'; // Asegúrate de importar el servicio

interface EmpresasState {
    empresas: IEmpresa[];
    empresaSeleccionada: IEmpresa | null;
    loading: boolean;
    error: string | null;
}

const initialState: EmpresasState = {
    empresas: [],
    empresaSeleccionada: null,
    loading: false,
    error: null,
};

const empresasSlice = createSlice({
    name: 'empresas',
    initialState,
    reducers: {
        seleccionarEmpresa: (state, action: PayloadAction<number>) => {
        const empresa = state.empresas.find(e => e.id === action.payload);
        state.empresaSeleccionada = empresa || null;
        },
        agregarEmpresa: (state, action: PayloadAction<IEmpresa>) => {
        state.empresas.push(action.payload);
        },
        setEmpresas: (state, action: PayloadAction<IEmpresa[]>) => {
        state.empresas = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
        },
    },
});

export const { seleccionarEmpresa, agregarEmpresa, setEmpresas, setLoading, setError } = empresasSlice.actions;

    export const loadEmpresas = () => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
        const empresas = await empresaService.getAll();
        dispatch(setEmpresas(empresas));
    } catch (error) {
        dispatch(setError("Error al cargar las empresas"));
    } finally {
        dispatch(setLoading(false));
    }
};

export default empresasSlice.reducer;
