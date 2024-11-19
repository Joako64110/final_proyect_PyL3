import React, { useState, useEffect } from "react";

interface CrearArticuloProps {
    onClose: () => void;
    onAddProduct: (product: {
        Nombre: string;
        Precio: number;
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
    // Inicializar el estado de los campos con valores predeterminados
    const [nombre, setNombre] = useState<string>(editingProduct?.Nombre || "");
    const [precio, setPrecio] = useState<number>(editingProduct?.Precio || 0);
    const [descripcion, setDescripcion] = useState<string>(editingProduct?.Descripción || "");
    const [categoria, setCategoria] = useState<string>(editingProduct?.Categoría || "");
    const [habilitado, setHabilitado] = useState<boolean>(editingProduct?.Habilitado || false);

    // Actualizar los campos si el producto está en edición
    useEffect(() => {
        if (editingProduct) {
            setNombre(editingProduct.Nombre || "");
            setPrecio(editingProduct.Precio || 0);
            setDescripcion(editingProduct.Descripción || "");
            setCategoria(editingProduct.Categoría || "");
            setHabilitado(editingProduct.Habilitado || false);
        }
    }, [editingProduct]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const product = {
            Nombre: nombre,
            Precio: precio,
            Descripción: descripcion,
            Categoría: categoria,
            Habilitado: habilitado,
        };

        if (editingProduct) {
            // Actualizar producto si está editando
            onUpdateProduct(editingProduct.id, product);
        } else {
            // Agregar nuevo producto si no está editando
            await onAddProduct(product);
        }

        onClose(); // Cerrar el modal después de agregar o actualizar el producto
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Precio</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Descripción</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div>
                    <label>Categoría</label>
                    <input
                        type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Habilitado</label>
                    <input
                        type="checkbox"
                        checked={habilitado}
                        onChange={(e) => setHabilitado(e.target.checked)}
                    />
                </div>
                <button type="submit">{editingProduct ? "Actualizar" : "Agregar"} Producto</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default CrearArticulo;
