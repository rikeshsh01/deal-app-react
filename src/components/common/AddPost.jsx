import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Modals from "./Modals"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AddPost = () => {
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        // Close the modal
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            initializeMap();
            fetchTagData();
        }
    }, [isModalOpen]);

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
        handleModalClose();
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
        let authToken = localStorage.getItem("authToken")
        await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/post`, {
            method: 'POST',
            body: formDataToSend,
            headers: {
                "auth-token": authToken
            },
        });
    };

    const fetchTagData = async () => {
        try {
            let authToken = localStorage.getItem("authToken")
            const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/tag`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
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
            let authToken = localStorage.getItem("authToken")
            const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/subtag/${tagId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
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

    // if (!isModalOpen) return null;

    return (
        <>
            <div className="add-button-wrapper">
                <div className="add-icon">
                    <button className="add-icon-button" onClick={openModal}>
                        <FaPlus size={40} />
                    </button>

                </div>
            </div>
            {/* <Modal isOpen={isModalOpen} onClose={closeModal} /> */}
            <Modals
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Add post"
                onSubmit={handleSubmit}
            >
                <form className="addpost__form" onSubmit={handleSubmit}>
                    <div className="addpost__input__section">
                        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="addpost__select__section">
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
                    </div>
                    <div className="addpost__map__section">
                        <div id="map" style={{ height: '300px', width: '100%' }}></div>
                        <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} />
                        <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} />
                        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </Modals>
        </>
    );
}

export default AddPost;