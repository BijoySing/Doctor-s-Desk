import React from 'react'

interface PatientInfoBarProps {
  patient: {
    name: string
    age: number
    gender: string
    date: string
    pid: string | number
  }
}

export default function PatientInfoBar({ patient }: PatientInfoBarProps) {
  return (
    <div className="bg-gray-200 border border-gray-100 p-2 mb-4 flex items-center justify-between text-sm">
      <div className="flex items-center gap-1">
        <span className="font-bold">Name:</span>
        <span className="ml-2">{patient.name}</span>
      </div>
      <div className="flex items-center gap-1 ml-4">
        <span className="font-bold">Age:</span>
        <span className="ml-2">{patient.age}</span>
      </div>
      <div className="flex items-center gap-1 ml-4">
        <span className="font-bold">Sex:</span>
        <span className="ml-2">{patient.gender}</span>
      </div>
      <div className="flex items-center gap-1 ml-4">
        <span className="font-bold">Date:</span>
        <span className="ml-2">{patient.date}</span>
      </div>
      <div className="flex items-center gap-1 ml-4">
        <span className="font-bold">Id:</span>
        <span className="ml-2">{patient.pid}</span>
      </div>
    </div>
  )
}
