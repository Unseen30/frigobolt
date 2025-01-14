import { useState, useEffect } from 'react'
    import { useNavigate } from 'react-router-dom'

    export default function Auth({ supabase }) {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [isDriver, setIsDriver] = useState(true)
      const navigate = useNavigate()

      const handleLogin = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (!error) {
          navigate(isDriver ? '/driver' : '/admin')
        }
      }

      return (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={isDriver}
                onChange={() => setIsDriver(!isDriver)}
              />
              Soy conductor
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
      )
    }
