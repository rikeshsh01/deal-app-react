import React, { useState, useEffect } from 'react';
import { FaTimes } from "react-icons/fa";

export default function Modals({ isOpen, onClose, title, onSubmit, children }) {

    // State variables to store form data
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tag: '',
        latitude: 0,
        longitude: 0,
        location: ''
    });

    // useEffect to fetch subtags when a tag is selected
    useEffect(() => {
        // Fetch subtag data based on tag ID, if needed
    }, [formData.tag]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Call onSubmit prop with form data
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn"><FaTimes onClick={onClose} /></button>
                <h2>{title}</h2>
                <div className="modal-content">
                    {children}

                </div>
            </div>
        </div>
    );
}
