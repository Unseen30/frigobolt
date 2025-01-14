import { useEffect, useState } from 'react'

    export default function AdminDashboard({ supabase }) {
      const [trips, setTrips] = useState([])
      const [filter, setFilter] = useState('')

      useEffect(() => {
        const fetchTrips = async () => {
          const { data, error } = await supabase
            .from('trips')
            .select('*')
            .ilike('driver_name', `%${filter}%`)
          if (!error) setTrips(data)
        }
        fetchTrips()
      }, [filter])

      return (
        <div>
          <h1>Admin Dashboard</h1>
          <input
            type="text"
            placeholder="Filtrar por conductor"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>Conductor</th>
                <th>Matrícula</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Distancia</th>
                <th>Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td>{trip.driver_name}</td>
                  <td>{trip.vehicle_plate}</td>
                  <td>{trip.total_cattle}</td>
                  <td>{trip.completed ? 'Completado' : 'En curso'}</td>
                  <td>{trip.distance} km</td>
                  <td>{trip.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
