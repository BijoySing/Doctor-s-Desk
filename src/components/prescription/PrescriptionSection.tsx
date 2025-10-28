import React from 'react'

interface PrescriptionSectionProps {
  title: string
  items: any[]
  onAdd: () => void
  onRemove: (index: number) => void
  isMedicineSection?: boolean
}

export default function PrescriptionSection({ 
  title, 
  items, 
  onAdd, 
  onRemove, 
  isMedicineSection = false 
}: PrescriptionSectionProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="font-bold text-gray-900 text-sm">{title}</div>
        <button
          onClick={onAdd}
          className="text-green-600 hover:text-green-800 text-xs"
        >
          + Add
        </button>
      </div>
      <div className="text-sm text-gray-700 ml-4">
        {items.length === 0 && (
          <div className="text-gray-400 italic">No items added</div>
        )}
        {items.map((item: any, idx: number) => (
          <div key={idx} className="mb-1 flex items-start justify-between group">
            {isMedicineSection ? (
              <div className="flex-1">
                <div className="flex items-start">
                  <span className="mr-2">{idx + 1}.</span>
                  <div>
                    <div className="font-medium">{item.medicine}</div>
                    {item.genericName && (
                      <div className="text-xs text-blue-600 ml-1">({item.genericName})</div>
                    )}
                    <div className="text-xs text-gray-600 ml-1">
                      {item.schedule} {item.unit}
                      {item.beforeAfterMeal && ` - ${item.beforeAfterMeal}`}
                      {item.duration && ` - ${item.duration}`}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <span className="flex-1">• {item}</span>
            )}
            <button
              onClick={() => onRemove(idx)}
              className="text-red-500 hover:text-red-700 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
