import React from 'react';
import { FaTimes } from "react-icons/fa";

export default function Modals({ isOpen, onClose, title, children, customClassName }) {


    if (!isOpen) return null;

    return (
        <div className="modal-overlay" >
            <div className={`modal ${customClassName}`} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn"><FaTimes onClick={onClose} /></button>
                <h2>{title}</h2>
                <div className="modal-content">
                    {children}

                </div>
            </div>
        </div>
    );
}
