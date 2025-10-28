import React from 'react'

interface PatientInfoBarProps {
  patientName: string
  setPatientName: (value: string) => void
  patientAge: string
  setPatientAge: (value: string) => void
  patientGender: string
  setPatientGender: (value: string) => void
  patientId: string
  setPatientId: (value: string) => void
  currentDate: string
  onAddPatient: () => void
}

export default function PatientInfoBar({
  patientName,
  setPatientName,
  patientAge,
  setPatientAge,
  patientGender,
  setPatientGender,
  patientId,
  setPatientId,
  currentDate,
  onAddPatient
}: PatientInfoBarProps) {
  return (
    <div className="bg-gray-200 border border-gray-100 p-2 mb-4 flex items-center text-sm">
      <div className="flex items-center gap-1">
        <span className="font-bold">Name:</span>
        {!patientName && (
          <button 
            onClick={onAddPatient}
            className="text-blue-600 font-bold hover:text-blue-800 text-sm ml-1 px-2 py-1 rounded bg-white border border-gray-400"
          >
            Add Patient
          </button>
        )} 
        {patientName && (
          <input 
            type="text" 
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="bg-white border border-gray-400 px-2 py-0.5 w-40 ml-2" 
            placeholder="Patient name"
          />
        )}
      </div>
      <div className="flex items-center gap-1 ml-4">
        <span className="font-bold">Age:</span>
        <input 
          type="text" 
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
          className="bg-white border border-gray-400 px-2 py-0.5 w-16" 
          placeholder="Age"
        />
      </div>
      <div className="flex items-center gap-1 ml-4">
        <span className="font-bold">Sex:</span>
        <input 
          type="text" 
          value={patientGender}
          onChange={(e) => setPatientGender(e.target.value)}
          className="bg-white border border-gray-400 px-2 py-0.5 w-16" 
          placeholder="Sex"
        />
      </div>
      <div className="flex items-center gap-1 ml-4">
        <span className="font-bold">Date:</span>
        <input 
          type="text" 
          value={currentDate}
          readOnly
          className="bg-white border border-gray-400 px-2 py-0.5 w-28" 
        />
      </div>
      <div className="flex items-center gap-1 ml-4">
        <span className="font-bold">Id:</span>
        <input 
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="bg-white border border-gray-400 px-2 py-0.5 w-24 ml-2" 
          placeholder="Patient ID"
        />
      </div>
    </div>
  )
}
