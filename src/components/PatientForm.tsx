import React, { useState, useEffect } from 'react'

interface PatientFormProps {
  patient?: any
  onSave: (patient: any) => void
  onCancel: () => void
}

export default function PatientForm({ patient, onSave, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    address: '',
    bloodGroup: ''
  })

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        age: patient.age?.toString() || '',
        gender: patient.gender || 'Male',
        phone: patient.phone || '',
        address: patient.address || '',
        bloodGroup: patient.bloodGroup || ''
      })
    }
  }, [patient])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({
      ...formData,
      age: parseInt(formData.age) || 0
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 relative">
        <div className="bg-gray-800 text-white px-4 py-2 -mx-6 -mt-6 mb-4 rounded-t-lg flex justify-between items-center">
          <span className="text-sm">AddPatient</span>
          <button onClick={onCancel} type="button" className="text-white hover:text-gray-300 text-xl">✕</button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Add Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name:</label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone:</label>
              <input
                type="tel"
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address:</label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Age:</label>
              <input
                type="number"
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Blood Group:</label>
              <select
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              >
                <option value="">Select...</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-8 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
