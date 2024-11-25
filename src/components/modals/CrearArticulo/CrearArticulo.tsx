import React, { useEffect, useState } from "react";
import "./CrearArticulo.css";
import { ICategorias } from "../../../types/ICategorias";
import { IAlergenos } from "../../../types/IAlergenos";
import categoriaService from "../../../services/CategoriaService";
import { AlergenoService } from "../../../services/AlergenoService";
import { ImageService } from "../../../services/ImageService";
import { createArticulo, updateArticulo } from "../../../services/ProductoService";
import Swal from "sweetalert2";
import { IUpdateProducto } from "../../../types/dtos/productos/IUpdateProducto";

interface CrearArticuloProps {
    onClose: () => void;
    onProductCreated: (newProduct: any) => void; 
    title: string; 
    editingProduct?: any; 
    onUpdateProduct: (updatedProduct: any) => void; 
}

const CrearArticulo: React.FC<CrearArticuloProps> = ({ onClose, onProductCreated, title, editingProduct, onUpdateProduct   }) => {
    const [denominacion, setDenominacion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [alergenos, setAlergenos] = useState("");
    const [precioVenta, setPrecioVenta] = useState("");
    const [codigo, setCodigo] = useState("");
    const [habilitado, setHabilitado] = useState(false);
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState<File | null>(null);
    const [categorias, setCategorias] = useState<ICategorias[]>([]);
    const [alergenosDisponibles, setAlergenosDisponibles] = useState<IAlergenos[]>([]);
    const alergenosService = new AlergenoService("http://190.221.207.224:8090/alergenos");
    const imageService = new ImageService("http://190.221.207.224:8090");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImagen(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (editingProduct) {
            setDenominacion(editingProduct.denominacion || "");
            setCategoria(editingProduct.categoria?.id || "");
            setAlergenos(editingProduct.alergenos?.map((a: any) => a.id.toString()) || []);
            setPrecioVenta(editingProduct.precioVenta?.toString() || "");
            setCodigo(editingProduct.codigo || "");
            setHabilitado(editingProduct.habilitado || false);
            setDescripcion(editingProduct.descripcion || "");
        }
    }, [editingProduct]);

    useEffect(() => {
        const idSucursal = localStorage.getItem("idSucursal");

        if (!idSucursal) {
            console.error("No se encontró el idSucursal en el localStorage.");
            return;
        }

        const fetchCategoriasPadre = async () => {
            try {
                const categoriasPadre = await categoriaService.getAllCategoriasPadrePorSucursal(Number(idSucursal));
                setCategorias(categoriasPadre);
            } catch (error) {
                console.error("Error al cargar categorías padre:", error);
            }
        };

        const fetchAlergenos = async () => {
            try {
                const alergenos = await alergenosService.getAllAllergens();
                setAlergenosDisponibles(alergenos);
            } catch (error) {
                console.error("Error al cargar alérgenos:", error);
            }
        };

        fetchCategoriasPadre();
        fetchAlergenos();
    }, []);

    const handleConfirm = async () => {
        try {
            Swal.fire({
                title: title.includes("Editar") ? "Actualizando artículo..." : "Creando artículo...",
                text: "Estamos procesando tu solicitud.",
                icon: "info",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            let imagenSubida = null;
            if (imagen) {
                imagenSubida = await imageService.uploadImage(imagen);
            }

            // Formato de imágenes para la API
            const imagenesConExtension = imagenSubida
                ? [
                    {
                        id: 0, // ID temporal, la API puede manejarlo
                        eliminado: false,
                        name: imagenSubida.name,
                        url: imagenSubida.url,
                    },
                ]
                : editingProduct?.imagenes || []; // Usar las imágenes existentes en edición

            // Preparar el objeto para la API con el orden correcto de los campos
            const formData: IUpdateProducto = {
                id: editingProduct?.id || 0,
                eliminado: editingProduct?.eliminado || false,
                denominacion,
                precioVenta: parseFloat(precioVenta),
                descripcion, // Sin asignar `null`
                habilitado,
                codigo,
                idCategoria: Number(categoria),
                idAlergenos: alergenos ? [Number(alergenos)] : [], // Asegurarse de mapear los IDs
                imagenes: imagenesConExtension,  // Asegurarse de incluir el campo imagenes
            };

            console.log("Datos a enviar al servidor:", formData);

            let updatedProduct;

            if (editingProduct) {
                // Editar artículo existente
                updatedProduct = await updateArticulo(editingProduct.id, formData);
                onUpdateProduct(updatedProduct); // Llamada al callback de actualización
            } else {
                // Crear nuevo artículo
                updatedProduct = await createArticulo(formData);
            }

            Swal.fire({
                title: "¡Éxito!",
                text: title.includes("Editar")
                    ? "El artículo se ha actualizado correctamente."
                    : "El artículo se ha creado correctamente.",
                icon: "success",
                confirmButtonText: "OK",
            });

            onProductCreated(updatedProduct);
            onClose();
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: title.includes("Editar")
                    ? "Hubo un problema al actualizar el artículo. Por favor, inténtalo de nuevo."
                    : "Hubo un problema al crear el artículo. Por favor, inténtalo de nuevo.",
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        }
    };
    
    

    return (
        <div className="modals-Art">
            <div className="card-Art">
                <h5 className="card-title-art">{title}</h5>
                <div className="card-body-Art">
                    <div className="containerPrincipal-art">
                        <div className="contenido1">
                            <div className="cardConten">
                                <input
                                    className="form"
                                    type="text"
                                    value={denominacion}
                                    onChange={(e) => setDenominacion(e.target.value)}
                                    placeholder="Ingrese una denominación"
                                />
                            </div>

                            <div className="cardConten">
                                <select
                                    className="form"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.denominacion}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="cardConten">
                                <select
                                    className="form"
                                    value={alergenos}
                                    onChange={(e) => setAlergenos(e.target.value)}
                                >
                                    <option value="">Seleccione un alérgeno</option>
                                    {alergenosDisponibles.map((alergenos) => (
                                        <option key={alergenos.id} value={alergenos.id}>
                                            {alergenos.denominacion}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="cardConten">
                                <input
                                    className="form"
                                    type="number"
                                    value={precioVenta}
                                    onChange={(e) => setPrecioVenta(e.target.value)}
                                    placeholder="Ingresa un precio de venta"
                                />
                            </div>

                            <div className="cardConten">
                                <input
                                    className="form"
                                    type="text"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                    placeholder="Ingresa un código"
                                />
                            </div>

                            <div className="cardConten">
                                <label>Habilitado</label>
                                <input
                                    type="checkbox"
                                    checked={habilitado}
                                    onChange={(e) => setHabilitado(e.target.checked)}
                                />
                            </div>
                        </div>
                        <div className="content2">
                            <div className="cardContent-2">
                                <textarea
                                    className="form-2"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    placeholder="Ingrese una descripción..."
                                />
                            </div>

                            {/* Solo mostrar el campo de imagen cuando no se está editando */}
                            {!editingProduct && (
                                <div className="cardContent-2">
                                    <input type="file" onChange={handleImageUpload} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="buttons-CS">
                        <button
                            onClick={handleConfirm}
                            style={{ backgroundColor: "rgba(44, 44, 44, 1)", color: "aliceblue", width: "30%" }}
                        >
                            Confirmar
                        </button>
                        <button
                            onClick={onClose}
                            style={{ backgroundColor: "rgba(236, 34, 31, 1)", color: "aliceblue", width: "30%" }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearArticulo;
