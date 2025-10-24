import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPatient, getPatientVisits, addVisit } from '../api/tauri'

export default function PatientDetail() {
  const { id } = useParams()
  const [patient, setPatient] = useState<any>(null)
  const [visits, setVisits] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddVisit, setShowAddVisit] = useState(false)
  const [visitNotes, setVisitNotes] = useState('')

  async function loadData() {
    if (!id) return
    setLoading(true)
    try {
      const patientData: any = await getPatient(parseInt(id))
      setPatient(patientData)
      const visitsData: any = await getPatientVisits(parseInt(id))
      setVisits(Array.isArray(visitsData) ? visitsData : [])
    } catch (error) {
      console.error('Failed to load patient data', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  async function handleAddVisit(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return
    try {
      const today = new Date().toISOString().split('T')[0]
      await addVisit(parseInt(id), today, visitNotes)
      setVisitNotes('')
      setShowAddVisit(false)
      await loadData()
    } catch (error) {
      alert('Failed to add visit')
      console.error(error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!patient) {
    return <div className="text-center py-8">Patient not found</div>
  }

  return (
    <div>
      <div className="bg-white rounded shadow p-6 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <div className="text-gray-600 mt-2 space-y-1">
              <div>Age: {patient.age} | Gender: {patient.gender}</div>
              <div>Phone: {patient.phone || 'N/A'}</div>
              <div>Address: {patient.address || 'N/A'}</div>
            </div>
          </div>
          <Link to="/patients" className="text-blue-600 hover:underline">← Back to Patients</Link>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Visit History</h2>
          <button 
            onClick={() => setShowAddVisit(!showAddVisit)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Visit
          </button>
        </div>

        {showAddVisit && (
          <form onSubmit={handleAddVisit} className="mb-4 p-4 bg-gray-50 rounded">
            <label className="block text-sm font-medium mb-1">Visit Notes</label>
            <textarea
              className="w-full border rounded px-3 py-2 mb-2"
              rows={3}
              value={visitNotes}
              onChange={(e) => setVisitNotes(e.target.value)}
              placeholder="Enter visit notes, chief complaint, etc."
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save Visit
              </button>
              <button type="button" onClick={() => setShowAddVisit(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </form>
        )}

        {visits.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No visits recorded yet</div>
        ) : (
          <div className="space-y-3">
            {visits.map((v: any) => (
              <div key={v.id} className="border rounded p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">{v.date}</div>
                    <div className="text-gray-800">{v.notes}</div>
                  </div>
                  <Link 
                    to={`/print/${v.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Print Prescription
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
