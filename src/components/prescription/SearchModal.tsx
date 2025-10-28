import React, { useState } from 'react'

interface SearchModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  searchItems: string[]
  onAdd: (item: string, duration?: string, note?: string) => void
  showDuration?: boolean
  showNote?: boolean
}

export default function SearchModal({ title, isOpen, onClose, searchItems, onAdd, showDuration, showNote }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [duration, setDuration] = useState('')
  const [note, setNote] = useState('')

  if (!isOpen) return null

  const filteredItems = searchItems.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    if (selectedItem) {
      onAdd(selectedItem, duration, note)
      setSelectedItem('')
      setDuration('')
      setNote('')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[700px] max-h-[600px] flex flex-col">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
          <span className="text-sm">{title}</span>
          <button onClick={onClose} className="text-white hover:text-gray-300">✕</button>
        </div>
        
        <div className="p-4 flex-1 overflow-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="bg-gray-100 p-3 rounded mb-4 min-h-[100px]">
            <div className="flex flex-wrap gap-2">
              {filteredItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                  className={`px-3 py-1 rounded ${
                    selectedItem === item
                      ? 'bg-gray-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {selectedItem && (
            <div className="space-y-3 bg-gray-50 p-4 rounded">
              <div className="flex items-center gap-3">
                <span className="font-medium min-w-[100px]">{selectedItem}</span>
                {showDuration && (
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded"
                  >
                    <option value="">দিন</option>
                    <option value="1 দিন">1 দিন</option>
                    <option value="3 দিন">3 দিন</option>
                    <option value="7 দিন">7 দিন</option>
                    <option value="15 দিন">15 দিন</option>
                    <option value="1 মাস">1 মাস</option>
                  </select>
                )}
                {showNote && (
                  <input
                    type="text"
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded"
                  />
                )}
                <button
                  onClick={() => setSelectedItem('')}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-300 px-4 py-3 rounded-b-lg">
          <button
            onClick={handleAdd}
            className="w-full text-gray-700 font-medium hover:text-gray-900"
          >
            Add To Prescription
          </button>
        </div>
      </div>
    </div>
  )
}
