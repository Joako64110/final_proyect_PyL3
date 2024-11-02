import React, { useState } from 'react';
import CrearCategoriaPadre from './components/modals/CrearCategoriaPadre/CrearCategoriaPadre';
import CrearSubcategoria from './components/modals/CrearSubcategoria/CrearSubcategoria';
import CrearArticulo from './components/modals/CrearArticulo/CrearArticulo';
import CrearAlergeno from './components/modals/CrearAlergeno/CrearAlergeno';

const App: React.FC = () => {

    /*Estado de los modales, abierto-cerrado*/ 
    const [isCategoriaPadreOpen, setIsCategoriaPadreOpen] = useState(false);
    const [isSubcategoriaOpen, setIsSubcategoriaOpen] = useState(false);
    const [isArticuloOpen, setIsArticuloOpen] = useState(false);
    const [isAlergenoOpen, setIsAlergenoOpen] = useState(false);

    /*Funciones para abrir y cerrar modales*/ 
    const openCategoriaPadreModal = () => setIsCategoriaPadreOpen(true);
    const closeCategoriaPadreModal = () => setIsCategoriaPadreOpen(false);

    const openSubcategoriaModal = () => setIsSubcategoriaOpen(true);
    const closeSubcategoriaModal = () => setIsSubcategoriaOpen(false);

    const openArticuloModal = () => setIsArticuloOpen(true);
    const closeArticuloModal = () => setIsArticuloOpen(false);

    const openAlergenoModal = () => setIsAlergenoOpen(true);
    const closeAlergenoModal = () => setIsAlergenoOpen(false);

    return (

        /*Buttons (Falta classname para poder ponerlos en su lugar)*/ 
        <div>
            <button onClick={openCategoriaPadreModal}>Crear categoría padre</button>
            {isCategoriaPadreOpen && <CrearCategoriaPadre onClose={closeCategoriaPadreModal} />}
            
            <button onClick={openSubcategoriaModal}>Crear subcategoría</button>
            {isSubcategoriaOpen && <CrearSubcategoria onClose={closeSubcategoriaModal} />}
            
            <button onClick={openArticuloModal}>Crear artículo</button>
            {isArticuloOpen && <CrearArticulo onClose={closeArticuloModal} />}
            
            <button onClick={openAlergenoModal}>Crear alérgeno</button>
            {isAlergenoOpen && <CrearAlergeno onClose={closeAlergenoModal} />}
        </div>
    );
};

export default App;