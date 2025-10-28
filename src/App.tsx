import React from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import PrescriptionPrint from './pages/PrescriptionPrint'
import Prescription from './pages/Prescription'
import Settings from './pages/Settings'
import Statistics from './pages/Statistics'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const hideSidebar = location.pathname === '/login'
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  if (hideSidebar) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* App Bar */}
      <div
        className={`fixed top-0 right-0 bg-gray-800 text-white z-30 transition-all duration-300 ease-in-out ${
          open ? 'left-60' : 'left-0'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleDrawerOpen}
            className={`text-white hover:bg-gray-700 p-2 rounded transition-colors ${
              open ? 'hidden' : 'block'
            }`}
            aria-label="open drawer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Doctor's Desk</h1>
          <div></div>
        </div>
      </div>

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } w-60`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-end px-4 py-3 border-b">
          <button
            onClick={handleDrawerClose}
            className="text-gray-600 hover:bg-gray-100 p-2 rounded transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <nav className="py-4 flex flex-col h-[calc(100%-60px)]">
          <div className="flex-1">
            <Link
              to="/"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl mr-4">🏠</span>
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link
              to="/prescription"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl mr-4">℞</span>
              <span className="text-sm font-medium">Prescription</span>
            </Link>
            <Link
              to="/patients"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl mr-4">👥</span>
              <span className="text-sm font-medium">Patients</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl mr-4">⚙️</span>
              <span className="text-sm font-medium">Settings</span>
            </Link>
            <Link
              to="/statistics"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl mr-4">📊</span>
              <span className="text-sm font-medium">Statistics</span>
            </Link>
          </div>

          {/* User Profile Section */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="px-4 py-2">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
                  BS
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">BIJOY SING</p>
                  <p className="text-xs text-gray-500">Doctor</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
              >
                <span className="mr-2">🚪</span>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out pt-14 ${
          open ? 'ml-60' : 'ml-0'
        }`}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
          <Route path="/print/:id" element={<PrescriptionPrint />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </main>
    </div>
  )
}
