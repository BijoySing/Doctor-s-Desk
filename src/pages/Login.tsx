import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyLogin } from '../api/tauri'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    try {
      const isValid = await verifyLogin(username, password)
      if (isValid) {
        localStorage.setItem('sc_user', username)
        navigate('/')
      } else {
        alert('Invalid credentials')
      }
    } catch (error) {
      // Fallback for web dev (Tauri not available)
      if (username === 'bijoy' && password === 'admin') {
        localStorage.setItem('sc_user', username)
        navigate('/')
      } else {
        alert('Invalid credentials (demo: bijoy / admin)')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gray-800 text-white px-4 py-2 flex items-center">
        <span className="text-sm font-medium">Smart Doctor</span>
      </div>

      <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-xl w-96 mt-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="enter username"
            className="w-full border-2 border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full border-2 border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <button 
            type="button" 
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password
          </button>
          <button 
            type="submit" 
            className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 font-medium"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}
