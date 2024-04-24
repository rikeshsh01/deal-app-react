import L from 'leaflet';

export default function initializeMap() {
    const nepalCoordinates = [27.7293, 85.3343]; // Coordinates of Nepal
    const newMap = L.map('map').setView(nepalCoordinates, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(newMap);

    return newMap;
}