import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './topBar.css'

interface TopBarProps {
    nombre: string;
    placeholder: string;
    onAddBranch: () => void;
    tareaBoton: string;
    onSearch: (value: string) => void;

}

const TopBar: React.FC<TopBarProps> = ({ nombre, placeholder, onAddBranch, tareaBoton, onSearch  }) => {
    return (
        <div className="top-bar">
            <div className="company-name">{nombre}</div>
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="search-input"
                    onChange={(e) => onSearch(e.target.value)} 
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