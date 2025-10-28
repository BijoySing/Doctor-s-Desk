import React from 'react'

interface PrescriptionContentProps {
  prescription: {
    chiefComplaint?: string[]
    history?: string[]
    examination?: string[]
    investigation?: string[]
    diagnosis?: string[]
    treatmentPlan?: string
    medicines?: any[]
    advice?: string[]
    followUp?: string[]
  }
}

export default function PrescriptionContent({ prescription }: PrescriptionContentProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-2 border-r border-gray-300 pr-6">
        {/* Chief Complaint */}
        {prescription.chiefComplaint && prescription.chiefComplaint.length > 0 && (
          <div className="mb-3">
            <div className="font-bold text-gray-900 text-sm mb-1">Chief Complaint:</div>
            <div className="text-sm text-gray-700 ml-4">
              {prescription.chiefComplaint.map((item: string, idx: number) => (
                <div key={idx} className="mb-1">• {item}</div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        {prescription.history && prescription.history.length > 0 && (
          <div className="mb-3">
            <div className="font-bold text-gray-900 text-sm mb-1">History:</div>
            <div className="text-sm text-gray-700 ml-4">
              {prescription.history.map((item: string, idx: number) => (
                <div key={idx} className="mb-1">• {item}</div>
              ))}
            </div>
          </div>
        )}

        {/* On Examination */}
        {prescription.examination && prescription.examination.length > 0 && (
          <div className="mb-3">
            <div className="font-bold text-gray-900 text-sm mb-1">On Examination:</div>
            <div className="text-sm text-gray-700 ml-4">
              {prescription.examination.map((item: string, idx: number) => (
                <div key={idx} className="mb-1">• {item}</div>
              ))}
            </div>
          </div>
        )}

        {/* Investigation */}
        {prescription.investigation && prescription.investigation.length > 0 && (
          <div className="mb-3">
            <div className="font-bold text-gray-900 text-sm mb-1">Investigations:</div>
            <div className="text-sm text-gray-700 ml-4">
              {prescription.investigation.map((item: string, idx: number) => (
                <div key={idx} className="mb-1">• {item}</div>
              ))}
            </div>
          </div>
        )}

        {/* Diagnosis */}
        {prescription.diagnosis && prescription.diagnosis.length > 0 && (
          <div className="mb-3">
            <div className="font-bold text-gray-900 text-sm mb-1">Diagnosis:</div>
            <div className="text-sm text-gray-700 ml-4">
              {prescription.diagnosis.map((item: string, idx: number) => (
                <div key={idx} className="mb-1">• {item}</div>
              ))}
            </div>
          </div>
        )}

        {/* Treatment Plan */}
        {prescription.treatmentPlan && (
          <div className="mb-3">
            <div className="font-bold text-gray-900 text-sm mb-1">Treatment:</div>
            <div className="text-sm text-gray-700 ml-4">
              <div className="mb-1">• {prescription.treatmentPlan}</div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-2">
        {/* Rx (Medicines) */}
        {prescription.medicines && prescription.medicines.length > 0 && (
          <div className="mb-3">
            <div className="font-bold text-gray-900 text-sm mb-1">Rx</div>
            <ol className="list-decimal ml-6 space-y-2 text-sm">
              {prescription.medicines.map((med: any, idx: number) => (
                <li key={idx} className="text-gray-700">
                  <div>
                    <div className="font-medium">{med.name || med.medicine}</div>
                    {(med.genericName || med.generic_name) && (
                      <div className="text-xs text-blue-600 ml-1">({med.genericName || med.generic_name})</div>
                    )}
                    <div className="text-xs text-gray-600 ml-1">
                      {med.schedule || med.dosage}
                      {med.unit && ` (${med.unit})`}
                      {med.beforeAfterMeal && ` - ${med.beforeAfterMeal}`}
                      {med.duration && ` - ${med.duration}`}
                      {med.instructions && ` - ${med.instructions}`}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Advices */}
        {prescription.advice && prescription.advice.length > 0 && (
          <div className="mb-3">
            <div className="font-bold text-gray-900 text-sm mb-1">Advice:</div>
            <div className="text-sm text-gray-700 ml-4">
              {prescription.advice.map((item: string, idx: number) => (
                <div key={idx} className="mb-1">• {item}</div>
              ))}
            </div>
          </div>
        )}

        {/* Follow Up */}
        {prescription.followUp && prescription.followUp.length > 0 && (
          <div className="mb-3">
            <div className="font-bold text-gray-900 text-sm mb-1">Follow-up:</div>
            <div className="text-sm text-gray-700 ml-4">
              {prescription.followUp.map((item: string, idx: number) => (
                <div key={idx} className="mb-1">• {item}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
