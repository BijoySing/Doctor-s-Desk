import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPatient, getPatientVisits, addVisit, deleteVisit } from '../api/tauri'

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

  async function handleDeletePrescription(visitId: number) {
    if (!window.confirm('Are you sure you want to delete this prescription?')) return;
    try {
      // Call backend API to delete visit
      await deleteVisit(visitId);
      // Remove from local state
      setVisits((prev) => prev.filter((v) => v.id !== visitId));
    } catch (error) {
      alert('Failed to delete prescription');
      console.error(error);
    }
  }
  
  // Handler for deleting a prescription
  function handleDeletePrescriptionLegacy(visitId: number) {
    // TODO: Implement delete logic (API call, update state)
    alert(`Delete prescription for visit ${visitId}`)
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
              <div><span className="font-semibold">Age:</span> {patient.age} years</div>
              <div><span className="font-semibold">Gender:</span> {patient.gender}</div>
              <div><span className="font-semibold">Phone:</span> {patient.phone || 'N/A'}</div>
              <div><span className="font-semibold">Address:</span> {patient.address || 'N/A'}</div>
              <div className="text-sm text-gray-500 mt-2">
                <span className="font-semibold">Patient ID:</span> {patient.id}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">Created:</span> {patient.created_at ? new Date(patient.created_at).toLocaleDateString('en-GB') : 'N/A'}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link 
              to={`/prescription?patientId=${id}`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Create Prescription
            </Link>
            <Link to="/patients" className="text-blue-600 hover:underline px-4 py-2">
              ← Back to Patients
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Visit History</h2>
          <button 
            onClick={() => setShowAddVisit(!showAddVisit)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Visit Note
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
                Save Visit Note
              </button>
              <button type="button" onClick={() => setShowAddVisit(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </form>
        )}

        {visits.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-3">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-4">No visits recorded yet</p>
            <p className="text-sm text-gray-400 mb-4">
              Patient information has been saved. Create a prescription to record the first visit.
            </p>
            <Link 
              to={`/prescription?patientId=${id}`}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Create First Prescription
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {visits.map((v: any) => {
              // Parse the notes JSON if available
              let visitData: any = null
              try {
                visitData = v.notes ? JSON.parse(v.notes) : null
              } catch (e) {
                console.error('Failed to parse visit notes:', e)
              }

              // Extract date and time
              const visitDate = visitData?.visitDate || v.date
              const visitTime = visitData?.visitTime || ''
              
              return (
                <div key={v.id} className="border rounded p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-2 font-semibold">
                        📅 {visitDate} {visitTime && `⏰ ${visitTime}`}
                      </div>
                      
                      {visitData ? (
                        <div className="space-y-2 text-sm">
                          {visitData.chiefComplaints?.length > 0 && (
                            <div>
                              <span className="font-semibold text-gray-700">Chief Complaints:</span>{' '}
                              <span className="text-gray-600">{visitData.chiefComplaints.join(', ')}</span>
                            </div>
                          )}
                          {visitData.diagnoses?.length > 0 && (
                            <div>
                              <span className="font-semibold text-gray-700">Diagnosis:</span>{' '}
                              <span className="text-gray-600">{visitData.diagnoses.join(', ')}</span>
                            </div>
                          )}
                          {visitData.medicines?.length > 0 && (
                            <div>
                              <span className="font-semibold text-gray-700">Medicines:</span>{' '}
                              <span className="text-gray-600">
                                {visitData.medicines.map((m: any) => m.medicine).join(', ')}
                              </span>
                            </div>
                          )}
                          {visitData.advices?.length > 0 && (
                            <div>
                              <span className="font-semibold text-gray-700">Advice:</span>{' '}
                              <span className="text-gray-600">{visitData.advices.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-800">{v.notes}</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Link 
                        to={`/print/${v.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Print Prescription
                      </Link>
                      <Link 
                        to={`/prescription?editVisitId=${v.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                      >
                        Edit Prescription
                      </Link>
                      <button 
                        onClick={() => handleDeletePrescription(v.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Delete Prescription
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
