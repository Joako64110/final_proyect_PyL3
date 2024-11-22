import './actions.css'

type ActionType = "ver" | "editar" | "eliminar" | "desplegar" | "agregar" | "abrirSuc" | "regresar";

interface ActionsProps {
  id: number; 
  actions: ActionType[];
  onVer?: (id: number) => void; 
  onEditar?: (id: number) => void;  
  onEliminar?: (id: number) => void; 
  onDesplegar?: (id: number) => void; 
  onAgregar?: (id: number) => void; 
  onAbrirSuc?: (id: number) => void;
  onRegresar?: () => void;
  isExpanded?: boolean;
}

const Actions: React.FC<ActionsProps> = ({ id, actions, onVer, onEditar, onEliminar, onDesplegar, onAgregar, onAbrirSuc, onRegresar, isExpanded = false }) => {
  const renderIcon = (action: ActionType) => {
    switch (action) {
      case "ver":
        return <i key={action} className="bi bi-eye-fill icono-accion" style={{color:"rgba(232, 185, 49, 1)"}} onClick={() => onVer && onVer(id)} />; // Ver
      case "editar":
        return <i key={action} className="bi bi-pencil-fill icono-accion" style={{color:"rgba(135, 176, 241, 1)"}} onClick={() => onEditar && onEditar(id)} />; // Editar
      case "eliminar":
        return <i key={action} className="bi bi-trash-fill icono-accion" style={{color:"rgba(228, 31, 31, 1)"}} onClick={() => onEliminar && onEliminar(id)} />; // Eliminar
      case "desplegar":
        return <i key={action} className={`bi ${isExpanded ? "bi-chevron-up" : "bi-chevron-down"} icono-accion`} onClick={() => onDesplegar && onDesplegar(id)} />; // Desplegar
      case "agregar":
        return <i key={action} className="bi bi-plus-square-fill icono-accion" style={{color:"rgba(31, 228, 38, 1)"}} onClick={() => onAgregar && onAgregar(id)} />; // Agregar
      case "abrirSuc":
        return <i key={action} className="bi bi-building-fill icono-accion" style={{color:"green"}} onClick={() => onAbrirSuc && onAbrirSuc(id)} />; // abrirSuc
      case "regresar":
        return <i key={action} className="bi bi-arrow-left icono-accion" onClick={() => onRegresar && onRegresar()} />; // Regresar
      default:
        return null;
    }
  };

  return <div className="icons-actions">{actions.map((action) => renderIcon(action))}</div>;
};

export default Actions;