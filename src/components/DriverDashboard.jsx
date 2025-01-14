import { useState, useEffect } from 'react'
    import { MapContainer, TileLayer, Marker } from 'react-leaflet'
    import 'leaflet/dist/leaflet.css'

    export default function DriverDashboard({ supabase }) {
      const [tripStarted, setTripStarted] = useState(false)
      const [vehiclePlate, setVehiclePlate] = useState('')
      const [totalCattle, setTotalCattle] = useState(0)
      const [position, setPosition] = useState(null)

      const startTrip = async () => {
        if (!vehiclePlate || !totalCattle) return
        setTripStarted(true)
        navigator.geolocation.watchPosition(
          (pos) => {
            setPosition([pos.coords.latitude, pos.coords.longitude])
            // Update position in Supabase
          },
          (err) => console.error(err),
          { enableHighAccuracy: true }
        )
      }

      return (
        <div>
          <h1>Driver Dashboard</h1>
          {!tripStarted ? (
            <div>
              <input
                type="text"
                placeholder="Matrícula del camión"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
              <input
                type="number"
                placeholder="Cantidad total de ganado"
                value={totalCattle}
                onChange={(e) => setTotalCattle(e.target.value)}
              />
              <button onClick={startTrip}>Iniciar viaje</button>
            </div>
          ) : (
            <div>
              <h2>Viaje en curso</h2>
              {position && (
                <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} />
                </MapContainer>
              )}
            </div>
          )}
        </div>
      )
    }
