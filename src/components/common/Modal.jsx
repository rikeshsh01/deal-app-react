import React, { useState, useEffect } from 'react';
import { FaTimes } from "react-icons/fa"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Modal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tag: '',
        latitude: 0,
        longitude: 0,
        location: ''
    });

    const [map, setMap] = useState(null);
    const [tagData, setTagData] = useState(null);
    const [subtagData, setSubtagData] = useState(null);

    useEffect(() => {
        if (isOpen) {
            initializeMap();
            fetchTagData();
        }
    }, [isOpen]);

    useEffect(() => {
        if (formData.tag) {
            fetchSubtagData(formData.tag);
        }
    }, [formData.tag]);

    const initializeMap = () => {
        const nepalCoordinates = [27.7293, 85.3343];
        const newMap = L.map('map').setView(nepalCoordinates, 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(newMap);
        setMap(newMap);

        let marker = null;
        newMap.on('click', async (e) => {
            const { lat, lng } = e.latlng;
            const data = await fetchLocationData(lat, lng);
            if (marker) {
                newMap.removeLayer(marker);
            }
            marker = L.marker([lat, lng], { icon: customIcon }).addTo(newMap);
            setFormData(prevState => ({
                ...prevState,
                latitude: lat.toFixed(6),
                longitude: lng.toFixed(6),
                location: data.data.generalName
            }));
        });
    };

    const fetchLocationData = async (lat, lng) => {
        const response = await fetch(`https://route-init.gallimap.com/api/v1/reverse/generalReverse?accessToken=${process.env.REACT_APP_GALLI_MAP_ACCESS_TOKEN}&lat=${lat}&lng=${lng}`);
        return await response.json();
    };

    const customIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = prepareFormDataToSend();
        await submitFormData(formDataToSend);
        onClose();
    };

    const prepareFormDataToSend = () => {
        const formDataToSend = new FormData();
        const fileInput = document.querySelector('input[type="file"]');
        const files = fileInput.files;
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('tagId', formData.tag);
        formDataToSend.append('subtagId', formData.subtag);
        formDataToSend.append('latitude', formData.latitude);
        formDataToSend.append('longitude', formData.longitude);
        formDataToSend.append('location', formData.location);
        for (let i = 0; i < files.length; i++) {
            formDataToSend.append('image', files[i]);
        }
        return formDataToSend;
    };

    const submitFormData = async (formDataToSend) => {
        await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/post`, {
            method: 'POST',
            body: formDataToSend,
            headers: {
                "auth-token": process.env.REACT_APP_AUTH_TOKEN
            },
        });
    };

    const fetchTagData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/tag`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": process.env.REACT_APP_AUTH_TOKEN
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setTagData(data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchSubtagData = async (tagId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/subtag/${tagId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": process.env.REACT_APP_AUTH_TOKEN
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch subtag data");
            }
            const data = await response.json();
            setSubtagData(data.data);
        } catch (error) {
            console.error("Error fetching subtag data:", error);
        }
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
                            <option value="">Select Tag</option>
                            {tagData && tagData.map(tag => (
                                <option key={tag._id} value={tag._id}>{tag.title}</option>
                            ))}
                        </select>
                        {subtagData && (
                            <select name="subtag" value={formData.subtag} onChange={handleChange}>
                                <option value="">Select Subtag</option>
                                {subtagData.map(subtag => (
                                    <option key={subtag._id} value={subtag._id}>{subtag.title}</option>
                                ))}
                            </select>
                        )}

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
