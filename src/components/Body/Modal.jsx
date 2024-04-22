import React, { useState, useEffect } from 'react';
import { FaTimes } from "react-icons/fa"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Modal({ isOpen, onClose }) {
    // State variables to store form data
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tag: '',
        latitude: 0,
        longitude: 0,
        location: ''
    });

    const [map, setMap] = useState(null); // State to hold the map instance

    // useEffect to initialize the map once the component is mounted
    useEffect(() => {
        if (isOpen) {
            const nepalCoordinates = [27.7293, 85.3343]; // Coordinates of Nepal
            const newMap = L.map('map').setView(nepalCoordinates, 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(newMap);

            setMap(newMap); // Set the map instance in state

            // Custom marker icon
            const customIcon = L.icon({ // Define marker icon
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconSize: [25, 41], // Size of the icon
                iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
                popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor

            });

            // Initialize marker as null
            let marker = null;

            // Add click event listener to the map
            newMap.on('click', async (e) => {
                const { lat, lng } = e.latlng; // Get latitude and longitude of clicked point

                const response = await fetch(`https://route-init.gallimap.com/api/v1/reverse/generalReverse?accessToken=83a5ccd3-fc18-4eb3-8d98-a734446a4c2a&lat=${lat}&lng=${lng}`);
                // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
                const data = await response.json();     //location name

                // console.log(data.data.generalName)
         

                // If marker exists, remove it from the map
                if (marker) {
                    newMap.removeLayer(marker);
                }

                // Add a marker to the clicked location with custom icon
                marker = L.marker([lat, lng], { icon: customIcon }).addTo(newMap);

                // Update form data with the clicked coordinates
                setFormData(prevState => ({
                    ...prevState,
                    latitude: lat.toFixed(6), // Round latitude to 6 decimal places
                    longitude: lng.toFixed(6), // Round longitude to 6 decimal places
                    location:data.data.generalName
                }));
            });
        }
    }, [isOpen]);




    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission
        console.log(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn"><FaTimes onClick={onClose} /></button>
                <h2>Add Item</h2>
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
                        <select name="tag" value={formData.tag} onChange={handleChange}>
                            <option value="tag1">Tag 1</option>
                            <option value="tag2">Tag 2</option>
                            <option value="tag3">Tag 3</option>
                            {/* Add more options as needed */}
                        </select>
                        <input type="file" name="file" accept="image/*, .pdf, .doc, .docx" multiple />
                        <div id="map" style={{ height: '300px', width: '100%' }}></div>
                        <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} />
                        <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} />
                        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
