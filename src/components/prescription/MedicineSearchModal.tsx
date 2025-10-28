import React, { useState } from 'react'
import { searchMedicines, type Medicine } from '../../data/medicines'

interface MedicineSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (medicine: any) => void
}

export default function MedicineSearchModal({ isOpen, onClose, onAdd }: MedicineSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [schedule, setSchedule] = useState({ morning: 0, noon: 0, evening: 0, night: 0 })
  const [unit, setUnit] = useState('টি')
  const [beforeAfterMeal, setBeforeAfterMeal] = useState('')
  const [duration, setDuration] = useState('')

  if (!isOpen) return null

  const filteredMedicines = searchMedicines(searchTerm || '')

  const handleAdd = () => {
    if (selectedMedicine) {
      const scheduleText = `${schedule.morning} + ${schedule.noon} + ${schedule.evening} + ${schedule.night}`
      onAdd({
        medicine: selectedMedicine.brand,
        genericName: selectedMedicine.generic,
        schedule: scheduleText,
        unit,
        beforeAfterMeal,
        duration
      })
      setSelectedMedicine(null)
      setSchedule({ morning: 0, noon: 0, evening: 0, night: 0 })
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[700px] flex flex-col">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
          <span className="text-sm">Medicine Search</span>
          <button onClick={onClose} className="text-white hover:text-gray-300">✕</button>
        </div>
        
        <div className="p-4 flex-1 overflow-auto">
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="🔍"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-full"
            />
            <button className="px-4 py-2 bg-gray-200 rounded-full">⊕ Create</button>
            <select className="px-4 py-2 border-2 border-gray-300 rounded">
              <option>Brand Name</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="bg-gray-200 text-center py-2 font-medium mb-2">Medicine</div>
              <div className="bg-gray-100 p-3 rounded min-h-[200px] max-h-[300px] overflow-auto">
                <div className="space-y-1">
                  {filteredMedicines.map((med, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMedicine(med)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedMedicine === med
                          ? 'bg-blue-600 text-white'
                          : 'bg-white hover:bg-blue-50'
                      }`}
                    >
                      <div className="font-medium text-sm">
                        {med.brand} {med.strength && `- ${med.strength}`}
                      </div>
                      <div className={`text-xs mt-1 ${selectedMedicine === med ? 'text-blue-100' : 'text-gray-500'}`}>
                        {med.generic} {med.dosageForm && `(${med.dosageForm})`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-200 text-center py-2 font-medium mb-2">Medicine Group</div>
              <div className="bg-gray-100 p-3 rounded min-h-[200px]"></div>
            </div>
          </div>

          {selectedMedicine && (
            <div className="bg-blue-50 p-4 rounded border-2 border-blue-200">
              <div className="mb-3 bg-white p-3 rounded shadow-sm">
                <div className="font-bold text-gray-900 text-lg">
                  {selectedMedicine.brand} {selectedMedicine.strength && `${selectedMedicine.strength}`}
                </div>
                <div className="text-sm text-blue-700 font-medium mt-1">
                  Generic: {selectedMedicine.generic}
                </div>
                {selectedMedicine.dosageForm && (
                  <div className="text-xs text-gray-600 mt-1">
                    Form: {selectedMedicine.dosageForm}
                  </div>
                )}
                {selectedMedicine.manufacturer && (
                  <div className="text-xs text-gray-600">
                    Manufacturer: {selectedMedicine.manufacturer}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-medium mb-2">Schedule</div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="number"
                      min="0"
                      value={schedule.morning}
                      onChange={(e) => setSchedule({...schedule, morning: parseInt(e.target.value) || 0})}
                      className="w-16 px-2 py-1 border rounded text-center"
                    />
                    <span>+</span>
                    <input
                      type="number"
                      min="0"
                      value={schedule.noon}
                      onChange={(e) => setSchedule({...schedule, noon: parseInt(e.target.value) || 0})}
                      className="w-16 px-2 py-1 border rounded text-center"
                    />
                    <span>+</span>
                    <input
                      type="number"
                      min="0"
                      value={schedule.evening}
                      onChange={(e) => setSchedule({...schedule, evening: parseInt(e.target.value) || 0})}
                      className="w-16 px-2 py-1 border rounded text-center"
                    />
                    <span>+</span>
                    <input
                      type="number"
                      min="0"
                      value={schedule.night}
                      onChange={(e) => setSchedule({...schedule, night: parseInt(e.target.value) || 0})}
                      className="w-16 px-2 py-1 border rounded text-center"
                    />
                  </div>

                  <div className="font-medium mb-2">Unit</div>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-3"
                  >
                    <option value="টি">টি</option>
                    <option value="ml">ml</option>
                    <option value="gm">gm</option>
                  </select>

                  <div className="flex gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={beforeAfterMeal === 'খাওয়ার আগে'}
                        onChange={() => setBeforeAfterMeal(beforeAfterMeal === 'খাওয়ার আগে' ? '' : 'খাওয়ার আগে')}
                        className="mr-2"
                      />
                      খাওয়ার আগে
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={beforeAfterMeal === 'খাওয়ার পরে'}
                        onChange={() => setBeforeAfterMeal(beforeAfterMeal === 'খাওয়ার পরে' ? '' : 'খাওয়ার পরে')}
                        className="mr-2"
                      />
                      খাওয়ার পরে
                    </label>
                  </div>
                </div>

                <div>
                  <div className="font-medium mb-2">Note</div>
                  <input
                    type="text"
                    placeholder="Duration (e.g., 10 দিন)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2">
          <button
            onClick={handleAdd}
            className="bg-gray-300 px-4 py-3 font-medium hover:bg-gray-400"
          >
            Add To Prescription
          </button>
          <button className="bg-gray-400 px-4 py-3 font-medium hover:bg-gray-500">
            Create Medicine Group
          </button>
        </div>
      </div>
    </div>
  )
}
