import React, { useState, useEffect } from "react";
import "./CrearArticulo.css";

interface CrearArticuloProps {
    onClose: () => void;
    onAddProduct: (product: {
        Nombre: string;
        Precio: string;
        Descripción: string;
        Categoría: string;
        Habilitado: boolean;
    }) => Promise<void>;
    onUpdateProduct: (id: number, updatedProduct: any) => void;
    editingProduct: any;
}

const CrearArticulo: React.FC<CrearArticuloProps> = ({
    onClose,
    onAddProduct,
    onUpdateProduct,
    editingProduct,
}) => {
    const [nombre, setNombre] = useState<string>(editingProduct?.Nombre || "");
    const [precio, setPrecio] = useState<string>(editingProduct?.Precio || "");
    const [descripcion, setDescripcion] = useState<string>(editingProduct?.Descripción || "");
    const [categoria, setCategoria] = useState<string>(editingProduct?.Categoría || "");
    const [alergenos, setAlergenos] = useState<string>(editingProduct?.Alergenos || "");
    const [habilitado, setHabilitado] = useState<boolean>(editingProduct?.Habilitado || false);
    const [codigo, setCodigo] = useState<string>(editingProduct?.Codigo || ""); 
    const [imagen, setImagen] = useState<any>(null);

    useEffect(() => {
        if (editingProduct) {
            setNombre(editingProduct.Nombre || "");
            setPrecio(editingProduct.Precio || "");
            setDescripcion(editingProduct.Descripción || "");
            setCategoria(editingProduct.Categoría || "");
            setAlergenos(editingProduct.Alergenos || "");
            setHabilitado(editingProduct.Habilitado || false);
            setCodigo(editingProduct.Codigo || ""); 
        }
    }, [editingProduct]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImagen(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const product = {
            Nombre: nombre,
            Precio: precio,
            Descripción: descripcion,
            Categoría: categoria,
            Alergenos: alergenos,
            Habilitado: habilitado,
            Codigo: codigo, 
        };

        if (editingProduct) {
            onUpdateProduct(editingProduct.id, product);
        } else {
            await onAddProduct(product);
        }

        onClose();
    };

    return (
        <div className="modal-overlayCrearArticulo">
            <div className="modal-contentCrearArticulo">
                <h2>{editingProduct ? "Actualizar" : "Crear"} un artículo</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ingrese una denominación"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="inputCrearArticulo"
                        required
                    />
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                        <option value="">Selecciona una categoría</option>
                        <option value="Categoria 1">Categoría 1</option>
                        <option value="Categoria 2">Categoría 2</option>
                        <option value="Categoria 3">Categoría 3</option>
                    </select>
                    <select value={alergenos} onChange={(e) => setAlergenos(e.target.value)} required>
                        <option value="">Selecciona un alérgeno</option>
                        <option value="Alergeno 1">Alérgeno 1</option>
                        <option value="Alergeno 2">Alérgeno 2</option>
                        <option value="Alergeno 3">Alérgeno 3</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Ingresa un precio de venta"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        className="inputCrearArticulo"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Ingresa un código"
                        value={codigo} 
                        onChange={(e) => setCodigo(e.target.value)}
                        className="inputCrearArticuloCodigo"
                    />
                    <textarea
                        placeholder="Ingrese una descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <div className="label-check">
                        <input
                            type="checkbox"
                            checked={habilitado}
                            onChange={(e) => setHabilitado(e.target.checked)}
                        />
                        <label>Habilitado</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="inputImagen"
                        />
                    </div>
                    <button type="submit" className="confirm">{editingProduct ? "Actualizar" : "Confirmar"}</button>
                    <button type="button" className="cancel" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default CrearArticulo;
