import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Default icon settings to avoid missing icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
});

const MapComponent = () => {
  const [vehiclePosition, setVehiclePosition] = useState([51.505, -0.09]); // Initial position
  const [path, setPath] = useState([[51.505, -0.09]]); // Initial path

  useEffect(() => {
    // Simulate real-time position updates
    const interval = setInterval(() => {
      setVehiclePosition((prevPosition) => {
        const newLat = prevPosition[0] + (Math.random() - 0.5) * 0.001;
        const newLng = prevPosition[1] + (Math.random() - 0.5) * 0.001;
        const newPosition = [newLat, newLng];
        
        // Update the path
        setPath((prevPath) => [...prevPath, newPosition]);

        return newPosition;
      });
    }, 1000); // Update every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={vehiclePosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={vehiclePosition} />
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
};

export default MapComponent;
