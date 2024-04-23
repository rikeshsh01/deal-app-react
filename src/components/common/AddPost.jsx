import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";

export default function AddButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="add-button-wrapper">
            <div className="add-icon">
                <button className="add-icon-button" onClick={openModal}>
                    <FaPlus size={40} />
                </button>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </div>
    );
}