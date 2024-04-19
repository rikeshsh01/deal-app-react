import React from "react";
import { FaTimes } from "react-icons/fa"

export default function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn"><FaTimes onClick={onClose} /></button>
                <h2>Add Item</h2>
                <div className="modal-content">
                    <form>
                        <input type="text" placeholder="Title" />
                        <textarea type="text" placeholder="Description" />
                        <select>
                            <option value="tag1">Tag 1</option>
                            <option value="tag2">Tag 2</option>
                            <option value="tag3">Tag 3</option>
                            {/* Add more options as needed */}
                        </select>
                        <input type="text" placeholder="Latitude" />
                        <input type="text" placeholder="Longitude" />
                        <input type="text" placeholder="Location" />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    );
}
