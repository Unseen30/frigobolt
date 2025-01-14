import { BrowserRouter, Routes, Route } from 'react-router-dom'
    import { createClient } from '@supabase/supabase-js'
    import Auth from './components/Auth'
    import DriverDashboard from './components/DriverDashboard'
    import AdminDashboard from './components/AdminDashboard'

    const supabase = createClient(
      'YOUR_SUPABASE_URL',
      'YOUR_SUPABASE_ANON_KEY'
    )

    export default function App() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth supabase={supabase} />} />
            <Route path="/driver" element={<DriverDashboard supabase={supabase} />} />
            <Route path="/admin" element={<AdminDashboard supabase={supabase} />} />
          </Routes>
        </BrowserRouter>
      )
    }
