import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listPatients as listPatientsApi, addPatient, updatePatient, deletePatient } from '../api/tauri'
import PatientForm from '../components/PatientForm'

type Patient = { id: number; name: string; age: number; gender: string; phone?: string; address?: string; created_at?: string }

export default function Patients() {
  const [query, setQuery] = useState('')
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)

  async function loadPatients() {
    setLoading(true)
    try {
      const res: any = await listPatientsApi()
      if (Array.isArray(res)) {
        setPatients(res as Patient[])
        setIsDemoMode(false)
      }
    } catch (e) {
      const errorMsg = (e as Error).message
      console.error('listPatients error:', errorMsg)
      
      // Only use demo mode if Tauri is not available
      if (errorMsg.includes('Tauri not available')) {
        console.log('Running in demo mode (browser)')
        setIsDemoMode(true)
        setPatients([
          { id: 163, name: 'Kajol', age: 25, gender: 'Male', phone: '01993884832', address: 'Dhaka', created_at: '4/28/2024 5:26:09 PM' },
          { id: 162, name: 'Nahid Islam', age: 24, gender: 'Female', phone: '', address: '', created_at: '4/22/2024 2:41:14 PM' },
          { id: 155, name: 'Marid', age: 66, gender: 'Male', phone: '', address: '', created_at: '4/22/2024 2:35:13 PM' },
          { id: 147, name: 'Nihan', age: 23, gender: 'Male', phone: '346678', address: 'Modina Market', created_at: '3/10/2024 11:45:56 AM' },
          { id: 161, name: 'Leel', age: 0, gender: 'Male', phone: '', address: '', created_at: '3/10/2024 10:00:41 AM' },
          { id: 159, name: 'Neel', age: 12, gender: 'Male', phone: '987654', address: '', created_at: '3/10/2024 9:57:35 AM' },
          { id: 157, name: 'Amar Jonno', age: 24, gender: 'Male', phone: '01758084', address: '', created_at: '3/13/2024 10:58:38 PM' },
        ])
      } else {
        // Database error - show to user but keep empty list
        alert('Database error: ' + errorMsg)
        setPatients([])
        setIsDemoMode(false)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPatients()
  }, [])

  async function handleSave(patientData: any) {
    if (isDemoMode) {
      alert('⚠️ Demo Mode: Changes not saved.\n\nTo save patients, run: npm run tauri:dev')
      setShowForm(false)
      setEditingPatient(null)
      return
    }
    
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.id, patientData.name, patientData.age, patientData.gender, patientData.phone, patientData.address)
      } else {
        await addPatient(patientData.name, patientData.age, patientData.gender, patientData.phone, patientData.address)
      }
      await loadPatients()
      setShowForm(false)
      setEditingPatient(null)
    } catch (error) {
      alert('Failed to save patient: ' + (error as Error).message)
      console.error(error)
    }
  }

  async function handleDelete(id: number) {
    if (isDemoMode) {
      alert('⚠️ Demo Mode: Changes not saved.\n\nTo delete patients, run: npm run tauri:dev')
      return
    }
    
    if (!confirm('Are you sure you want to delete this patient?')) return
    try {
      await deletePatient(id)
      await loadPatients()
    } catch (error) {
      alert('Failed to delete patient: ' + (error as Error).message)
      console.error(error)
    }
  }

  const filtered = patients.filter((p: Patient) => p.name.toLowerCase().includes(query.toLowerCase()))

  if (loading) {
    return <div className="text-center py-8">Loading patients...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Bar */}
      <div className="bg-gray-700 text-white px-6 py-3 flex justify-between items-center fixed top-0 left-16 right-0 z-10">
        <div></div>
        <div className="flex items-center gap-6">
          <span className="font-medium">Bijoy sing</span>
          <button onClick={() => window.location.href = '/login'} className="text-white hover:text-gray-300">Log Out</button>
        </div>
      </div>

      <div className="pt-16 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Patient List</h1>
            <button 
              onClick={() => { setEditingPatient(null); setShowForm(true) }} 
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
            >
              Add Patient
            </button>
          </div>
          <input 
            placeholder="Search patients..." 
            value={query} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} 
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
              {query ? 'No patients found' : 'No patients yet. Add your first patient!'}
            </div>
          ) : (
            filtered.map((p: Patient) => (
              <div key={p.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-blue-900 text-white px-4 py-3 flex justify-between items-center">
                  <Link to={`/patients/${p.id}`} className="font-medium hover:underline">
                    {p.name} {p.created_at && <span className="text-sm ml-2">{p.created_at}</span>}
                  </Link>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="bg-blue-700 hover:bg-blue-600 px-4 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
                <div className="p-4 grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Phone:</span> {p.phone || '-'}
                  </div>
                  <div>
                    <span className="font-medium">Address:</span> {p.address || '-'}
                  </div>
                  <div>
                    <span className="font-medium">Age:</span> {p.age}
                  </div>
                  <div>
                    <span className="font-medium">Serial No:</span> {p.id}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showForm && (
        <PatientForm
          patient={editingPatient}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingPatient(null) }}
        />
      )}
    </div>
  )
}