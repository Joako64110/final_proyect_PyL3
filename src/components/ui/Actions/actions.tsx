import './actions.css'

type ActionType = "ver" | "editar" | "eliminar" | "desplegar" | "agregar"| "abrirSuc";

interface ActionsProps {
  nombre: string;
  actions: ActionType[];
  onVer?: (nombre: string) => void;
  onEditar?: (nombre: string) => void;
  onEliminar?: (nombre: string) => void;
  onDesplegar?: (nombre: string) => void;
  onAgregar?: (nombre: string) => void;
  onAbrirSuc?: (nombre: string) => void;
  isExpanded?: boolean;
}

const Actions: React.FC<ActionsProps> = ({ nombre, actions, onVer, onEditar, onEliminar, onDesplegar, onAgregar, onAbrirSuc, isExpanded = false }) => {
  const renderIcon = (action: ActionType) => {
    switch (action) {
      case "ver":
        return <i className="bi bi-eye-fill icono-accion" style={{color:"rgba(232, 185, 49, 1)"}} onClick={() => onVer && onVer(nombre)} />; // Ver
      case "editar":
        return <i className="bi bi-pencil-fill icono-accion" style={{color:"rgba(135, 176, 241, 1)"}} onClick={() => onEditar && onEditar(nombre)} />; // Editar
      case "eliminar":
        return <i className="bi bi-trash-fill icono-accion" style={{color:"rgba(228, 31, 31, 1)"}} onClick={() => onEliminar && onEliminar(nombre)} />; // Eliminar
      case "desplegar":
        return <i 
        className={`bi ${isExpanded ? "bi-chevron-up" : "bi-chevron-down"} icono-accion`} 
        onClick={() => onDesplegar && onDesplegar(nombre)} 
        />; // Desplegar
      case "agregar":
        return <i className="bi bi-plus-square-fill icono-accion" style={{color:"rgba(31, 228, 38, 1)"}} onClick={() => onAgregar && onAgregar(nombre)} />; // Agregar
      case "abrirSuc":
        return <i className="bi bi-building-fill icono-accion" style={{color:"green"}} onClick={() => onAbrirSuc && onAbrirSuc(nombre)} />; // abrirSuc
      default:
        return null;
    }
  };

  return <div className="icons-actions">{actions.map((action) => renderIcon(action))}</div>;
};

export default Actions;