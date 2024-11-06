import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './topBar.css'

interface TopBarProps {
    nombre: string;
    placeholder: string;
    onAddBranch: () => void;
    tareaBoton: string;
}

const TopBar: React.FC<TopBarProps> = ({ nombre, placeholder, onAddBranch, tareaBoton }) => {
    return (
        <div className="top-bar">
            <div className="company-name">{nombre}</div>
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="search-input"
                />
                <i className="bi bi-search search-icon"></i>
            </div>
            
            <button
                onClick={onAddBranch}
                className="add-branch-button"
            >
                {tareaBoton}
            </button>
        </div>
    );
};

export default TopBar;