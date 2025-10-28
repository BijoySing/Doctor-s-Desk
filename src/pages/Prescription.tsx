import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addVisit, addPrescription, getPatient, listPatients as listPatientsApi, addPatient } from '../api/tauri'
import PatientForm from '../components/PatientForm'
import SearchModal from '../components/prescription/SearchModal'
import MedicineSearchModal from '../components/prescription/MedicineSearchModal'
import PrescriptionHeader from '../components/prescription/PrescriptionHeader'
import PatientInfoBar from '../components/prescription/PatientInfoBar'
import PrescriptionSection from '../components/prescription/PrescriptionSection'
import PrintStyles from '../components/prescription/PrintStyles'
import { 
  complaintItems, 
  historyItems, 
  examinationItems, 
  investigationItems, 
  diagnosisItems, 
  treatmentItems, 
  adviceItems, 
  followUpItems 
} from '../data/prescriptionItems'

export default function Prescription() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [patientName, setPatientName] = useState('')
  const [patientAge, setPatientAge] = useState('')
  const [patientGender, setPatientGender] = useState('')
  const [patientId, setPatientId] = useState('')
  const [showAddPatientModal, setShowAddPatientModal] = useState(false)
  const [searchPatientQuery, setSearchPatientQuery] = useState('')

  // Load patient data from URL params if available
  useEffect(() => {
    const patientIdFromUrl = searchParams.get('patientId')
    if (patientIdFromUrl) {
      loadPatientData(patientIdFromUrl)
    }
  }, [searchParams])

  async function loadPatientData(id: string) {
    try {
      const patientData: any = await getPatient(parseInt(id))
      if (patientData) {
        setPatientId(id)
        setPatientName(patientData.name)
        setPatientAge(patientData.age.toString())
        setPatientGender(patientData.gender || '')
      }
    } catch (error) {
      console.error('Failed to load patient data:', error)
    }
  }

  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null)

  // Data arrays
  const [chiefComplaints, setChiefComplaints] = useState<string[]>([])
  const [histories, setHistories] = useState<string[]>([])
  const [examinations, setExaminations] = useState<string[]>([])
  const [investigations, setInvestigations] = useState<string[]>([])
  const [diagnoses, setDiagnoses] = useState<string[]>([])
  const [treatmentPlans, setTreatmentPlans] = useState<string[]>([])
  const [medicines, setMedicines] = useState<any[]>([])
  const [advices, setAdvices] = useState<string[]>([])
  const [followUps, setFollowUps] = useState<string[]>([])
  const [specialNotes, setSpecialNotes] = useState<string[]>([])

  const handleAddItem = (type: string, item: string, duration?: string, note?: string) => {
    let displayText = item
    if (duration) displayText += ` (${duration})`
    if (note) displayText += ` - ${note}`

    switch (type) {
      case 'complaint':
        setChiefComplaints([...chiefComplaints, displayText])
        break
      case 'history':
        setHistories([...histories, displayText])
        break
      case 'examination':
        setExaminations([...examinations, displayText])
        break
      case 'investigation':
        setInvestigations([...investigations, displayText])
        break
      case 'diagnosis':
        setDiagnoses([...diagnoses, displayText])
        break
      case 'treatment':
        setTreatmentPlans([...treatmentPlans, displayText])
        break
      case 'advice':
        setAdvices([...advices, displayText])
        break
      case 'followup':
        setFollowUps([...followUps, displayText])
        break
      case 'specialnote':
        setSpecialNotes([...specialNotes, displayText])
        break
    }
  }

  const handleAddMedicine = (medicine: any) => {
    setMedicines([...medicines, medicine])
  }

  const removeItem = (type: string, index: number) => {
    switch (type) {
      case 'complaint':
        setChiefComplaints(chiefComplaints.filter((_, i) => i !== index))
        break
      case 'history':
        setHistories(histories.filter((_, i) => i !== index))
        break
      case 'examination':
        setExaminations(examinations.filter((_, i) => i !== index))
        break
      case 'investigation':
        setInvestigations(investigations.filter((_, i) => i !== index))
        break
      case 'diagnosis':
        setDiagnoses(diagnoses.filter((_, i) => i !== index))
        break
      case 'treatment':
        setTreatmentPlans(treatmentPlans.filter((_, i) => i !== index))
        break
      case 'medicine':
        setMedicines(medicines.filter((_, i) => i !== index))
        break
      case 'advice':
        setAdvices(advices.filter((_, i) => i !== index))
        break
      case 'followup':
        setFollowUps(followUps.filter((_, i) => i !== index))
        break
      case 'specialnote':
        setSpecialNotes(specialNotes.filter((_, i) => i !== index))
        break
    }
  }

  const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  const currentDateTime = new Date().toISOString()

  return (
    <div className="min-h-screen bg-gray-50">
      <PrintStyles />
      
      {/* Action Bar - Hide on print */}
      <div className="bg-white border-b px-6 py-3 flex justify-between items-center no-print">
         <div className="flex justify-center items-center gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
          >
            ⊕ New Prescription
          </button>
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
          >
            🖨 Print / Download
          </button>
        </div>
       
      </div>

      <div className="p-6 print-area">
        {/* Doctor Header */}
        <div className="p-6 mb-0">
       
          <div className="flex justify-between items-center ">
            <div>
              <h1 className="text-3xl font-bold text-gray-600 mb-1">BIJOY SING</h1>
              <p className="text-gray-600 italic text-sm">BSC IN COMPUTER SCIENCE IN ENGINEERING</p>
              <p className="text-gray-600 italic text-sm">
                SHAHJALAL UNIVERSITY OF SCIENCE AND TECHNOLOGY, SYLHET
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-600 mb-1">বিজয় সিং</h2>
              <p className="text-gray-600 italic text-sm">বিএসসি ইন কম্পিউটার সায়েন্স ইন ইঞ্জিনিয়ারিং</p>
              <p className="text-gray-600 italic text-sm">শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়, সিলেট</p>
            </div>
          </div>
            <div>
            <p className="text-gray-600 italic text-sm font-bold  text-center">
              Heart Specialist , Endocrinologist , Neuro Specialist
              <br />
              হৃদরোগ বিশেষজ্ঞ , এন্ডোক্রাইনোলজিস্ট , নিউরো স্পেশালিস্ট
            
            </p>
            <p className="text-gray-600 italic text-sm mt-1 text-center">
              Address: 123 Medical St, Health City, Country , মোবাইল: +880123456789 
            </p>
          </div>
        
        </div>
        
        

        {/* Patient Info Bar */}
        <div className="bg-gray-200 border border-gray-100 p-2 mb-4 flex items-center text-sm">
          <div className="flex items-center gap-1">
            <span className="font-bold">Name:</span>
            {!patientName && (
              <button 
                onClick={() => setShowAddPatientModal(true)}
                className="text-blue-600 font-bold hover:text-blue-800   text-sm ml-1  px-2 py-1 rounded bg-white border border-gray-400"
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

        {/* Main Content - Two Column Layout matching PDF */}
        <div className="mt-4 grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-2 border-r border-gray-300 ">
            {/* Chief Complaint */}
            <div className="mb-3">
              <button
                onClick={() => setActiveModal('complaint')}
                className="font-bold text-gray-900 mb-1 hover:text-gray-600 text-sm no-print"
              >
                Chief Complaint +
              </button>
              <div className="font-bold text-gray-900 text-sm print-only hidden">                Chief Complaint:  </div>
              {chiefComplaints.length > 0 && (
                <div className="text-sm text-gray-700 ml-4">
                  {chiefComplaints.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      • {item}
                      <button
                        onClick={() => removeItem('complaint', idx)}
                        className="text-red-500 hover:text-red-700 ml-2 text-xs no-print"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* History */}
            <div className="mb-3">
              <button
                onClick={() => setActiveModal('history')}
                className="font-bold text-gray-900 mb-1 hover:text-gray-600 text-sm no-print"
              >
                History +
              </button>
              <div className="font-bold text-gray-900 text-sm print-only hidden">History:</div>
              {histories.length > 0 && (
                <div className="text-sm text-gray-700 ml-4">
                  {histories.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      • {item}
                      <button
                        onClick={() => removeItem('history', idx)}
                        className="text-red-500 hover:text-red-700 ml-2 text-xs no-print"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* On Examination */}
            <div className="mb-3">
              <button
                onClick={() => setActiveModal('examination')}
                className="font-bold text-gray-900 mb-1 hover:text-gray-600 text-sm no-print"
              >
                On Examination +
              </button>
              <div className="font-bold text-gray-900 text-sm print-only hidden">On Examination:</div>
              {examinations.length > 0 && (
                <div className="text-sm text-gray-700 ml-4">
                  {examinations.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      • {item}
                      <button
                        onClick={() => removeItem('examination', idx)}
                        className="text-red-500 hover:text-red-700 ml-2 text-xs no-print"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Investigation */}
            <div className="mb-3">
              <button
                onClick={() => setActiveModal('investigation')}
                className="font-bold text-gray-900 mb-1 hover:text-gray-600 text-sm no-print"
              >
                Investigation +
              </button>
              <div className="font-bold text-gray-900 text-sm print-only hidden">Investigations:</div>
              {investigations.length > 0 && (
                <div className="text-sm text-gray-700 ml-4">
                  {investigations.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      • {item}
                      <button
                        onClick={() => removeItem('investigation', idx)}
                        className="text-red-500 hover:text-red-700 ml-2 text-xs no-print"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Diagnosis */}
            <div className="mb-3">
              <button
                onClick={() => setActiveModal('diagnosis')}
                className="font-bold text-gray-900 mb-1 hover:text-gray-600 text-sm no-print"
              >
                Diagnosis +
              </button>
              <div className="font-bold text-gray-900 text-sm print-only hidden">Diagnosis:</div>
              {diagnoses.length > 0 && (
                <div className="text-sm text-gray-700 ml-4">
                  {diagnoses.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      • {item}
                      <button
                        onClick={() => removeItem('diagnosis', idx)}
                        className="text-red-500 hover:text-red-700 ml-2 text-xs no-print"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

           
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            {/* Rx (Medicines) */}
            <div className="mb-3  border-gray-300 pt-3">
              <button
                onClick={() => setActiveModal('medicine')}
                className="font-bold text-gray-900 mb-1 hover:text-gray-600 text-sm no-print"
              >
                Rx +
              </button>
              <div className="font-bold text-gray-900 text-sm print-only hidden">Rx</div>
              {medicines.length > 0 && (
                <ol className="list-decimal ml-6 space-y-2 text-sm">
                  {medicines.map((med, idx) => (
                    <li key={idx} className="text-gray-700">
                      <div>
                        <div className="font-medium">{med.medicine}</div>
                        {med.genericName && (
                          <div className="text-xs text-blue-600 ml-1">({med.genericName})</div>
                        )}
                        <div className="text-xs text-gray-600 ml-1">
                          {med.schedule} ({med.unit})
                          {med.beforeAfterMeal && ` - ${med.beforeAfterMeal}`}
                          {med.duration && ` - ${med.duration}`}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem('medicine', idx)}
                        className="text-red-500 hover:text-red-700 ml-2 text-xs no-print"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Advices */}
            <div className="mb-3">
              <button
                onClick={() => setActiveModal('advice')}
                className="font-bold text-gray-900 mb-1 hover:text-gray-600 text-sm no-print"
              >
                Advices +
              </button>
              <div className="font-bold text-gray-900 text-sm print-only hidden">Advice:</div>
              {advices.length > 0 && (
                <div className="text-sm text-gray-700 ml-4">
                  {advices.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      • {item}
                      <button
                        onClick={() => removeItem('advice', idx)}
                        className="text-red-500 hover:text-red-700 ml-2 text-xs no-print"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Follow Up */}
            <div className="mb-3">
              <button
                onClick={() => setActiveModal('followup')}
                className="font-bold text-gray-900 mb-1 hover:text-gray-600 text-sm no-print"
              >
                Follow Up +
              </button>
              <div className="font-bold text-gray-900 text-sm print-only hidden">Follow-up:</div>
              {followUps.length > 0 && (
                <div className="text-sm text-gray-700 ml-4">
                  {followUps.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      • {item}
                      <button
                        onClick={() => removeItem('followup', idx)}
                        className="text-red-500 hover:text-red-700 ml-2 text-xs no-print"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Action Bar - Hide on print */}
        <div className="mt-6 grid grid-cols-2 gap-4 no-print">
          <button 
            onClick={async () => {
              try {
                if (!patientId) {
                  alert('Please select a patient first!')
                  return
                }
                
                // Create a visit with all prescription details
                const notes = JSON.stringify({
                  visitDateTime: currentDateTime,
                  visitDate: currentDate,
                  visitTime: currentTime,
                  patientInfo: {
                    name: patientName,
                    age: patientAge,
                    gender: patientGender,
                    id: patientId
                  },
                  chiefComplaints,
                  histories,
                  examinations,
                  investigations,
                  diagnoses,
                  medicines,
                  treatmentPlans,
                  advices,
                  followUps,
                  specialNotes
                })
                
                const visitId = await addVisit(parseInt(patientId), currentDateTime, notes)
                
                // Add all medicines as prescriptions
                for (const med of medicines) {
                  const dosage = `${med.schedule} (${med.unit})`
                  const instructions = `${med.beforeAfterMeal || ''} ${med.duration || ''}`.trim()
                  await addPrescription(visitId as number, med.medicine, med.genericName || '', dosage, instructions)
                }
                
                alert('Prescription saved successfully!')
              } catch (error) {
                const errorMsg = error instanceof Error ? error.message : String(error)
                alert('Failed to save prescription: ' + errorMsg)
                console.error('Prescription save error:', error)
              }
            }}
            className="bg-gray-200 text-gray-800 py-4 rounded-lg font-medium hover:bg-gray-300 flex items-center justify-center gap-2"
          >
            💾 Save
          </button>
          <button 
            onClick={async () => {
              try {
                if (!patientId) {
                  alert('Please select a patient first!')
                  return
                }
                
                // Create a visit with all prescription details
                const notes = JSON.stringify({
                  visitDateTime: currentDateTime,
                  visitDate: currentDate,
                  visitTime: currentTime,
                  patientInfo: {
                    name: patientName,
                    age: patientAge,
                    gender: patientGender,
                    id: patientId
                  },
                  chiefComplaints,
                  histories,
                  examinations,
                  investigations,
                  diagnoses,
                  medicines,
                  treatmentPlans,
                  advices,
                  followUps,
                  specialNotes
                })
                
                const visitId = await addVisit(parseInt(patientId), currentDateTime, notes)
                
                // Add all medicines as prescriptions
                for (const med of medicines) {
                  const dosage = `${med.schedule} (${med.unit})`
                  const instructions = `${med.beforeAfterMeal || ''} ${med.duration || ''}`.trim()
                  await addPrescription(visitId as number, med.medicine, med.genericName || '', dosage, instructions)
                }
                
                alert('Prescription saved!')
                setTimeout(() => window.print(), 500)
              } catch (error) {
                const errorMsg = error instanceof Error ? error.message : String(error)
                alert('Failed to save prescription: ' + errorMsg)
                console.error('Prescription save error:', error)
              }
            }}
            className="bg-gray-200 text-black py-4 rounded-lg font-medium hover:bg-gray-300 flex items-center justify-center gap-2"
          >
            💾 Save & Print
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 bg-red-00 border-2 px-4 py-2  border-gray-200">
          <div className="flex justify-between text-xs">
            <div className="flex items-start">
              <div className="mr-2">⚠️</div>
              <div>
                <p className="font-bold">চেম্বারঃ XYZ ডায়াগনস্টিক সেন্টার</p>
                <p className="font-bold">ঠিকানা:শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়,
                সিলেট</p>
              </div>
            </div>
            {/* <div className="w-px bg-gray-400"></div> */}
            <div className="text-right">
              <p className="font-bold">রোগী দেখার সময়ঃ প্রতি শনি, সোম, মঙ্গল ও বুধবার</p>
              <p className="font-bold">যোগাযোগঃ +8801894-943029 (সকাল ১০টা - ১২টা)  <br />
              রবি, বৃহস্পতি ও শুক্রবার বন্ধ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals - Hide on print */}
      <div className="no-print">
      <SearchModal
        title="Chief Complaints"
        isOpen={activeModal === 'complaint'}
        onClose={() => setActiveModal(null)}
        searchItems={complaintItems}
        onAdd={(item, duration, note) => handleAddItem('complaint', item, duration, note)}
        showDuration={true}
        showNote={true}
      />

      <SearchModal
        title="HistorySearchWindow"
        isOpen={activeModal === 'history'}
        onClose={() => setActiveModal(null)}
        searchItems={historyItems}
        onAdd={(item, duration, note) => handleAddItem('history', item, duration, note)}
        showNote={true}
      />

      <SearchModal
        title="ExaminationSearchWindow"
        isOpen={activeModal === 'examination'}
        onClose={() => setActiveModal(null)}
        searchItems={examinationItems}
        onAdd={(item) => handleAddItem('examination', item)}
      />

      <SearchModal
        title="InvestigationSearchWindow"
        isOpen={activeModal === 'investigation'}
        onClose={() => setActiveModal(null)}
        searchItems={investigationItems}
        onAdd={(item) => handleAddItem('investigation', item)}
      />

      <SearchModal
        title="DiagnosisSearchWindow"
        isOpen={activeModal === 'diagnosis'}
        onClose={() => setActiveModal(null)}
        searchItems={diagnosisItems}
        onAdd={(item) => handleAddItem('diagnosis', item)}
      />

      <SearchModal
        title="TreatmentSearchWindow"
        isOpen={activeModal === 'treatment'}
        onClose={() => setActiveModal(null)}
        searchItems={treatmentItems}
        onAdd={(item, duration, note) => handleAddItem('treatment', item, duration, note)}
        showNote={true}
      />

      <MedicineSearchModal
        isOpen={activeModal === 'medicine'}
        onClose={() => setActiveModal(null)}
        onAdd={handleAddMedicine}
      />

      <SearchModal
        title="AdviceSearchWindow"
        isOpen={activeModal === 'advice'}
        onClose={() => setActiveModal(null)}
        searchItems={adviceItems}
        onAdd={(item) => handleAddItem('advice', item)}
      />

      <SearchModal
        title="Follow-UpSearchWindow"
        isOpen={activeModal === 'followup'}
        onClose={() => setActiveModal(null)}
        searchItems={followUpItems}
        onAdd={(item) => handleAddItem('followup', item)}
      />

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <PatientForm
          onSave={async (patientData) => {
            try {
              const result: any = await addPatient(
                patientData.name,
                patientData.age,
                patientData.gender,
                patientData.phone || '',
                patientData.address || ''
              )
              
              // Set the newly created patient's info
              setPatientName(patientData.name)
              setPatientAge(patientData.age.toString())
              setPatientGender(patientData.gender || '')
              setPatientId(result?.toString() || '')
              setShowAddPatientModal(false)
              
              alert('Patient added successfully!')
            } catch (error) {
              const errorMsg = (error as Error).message
              console.error('Add patient error:', errorMsg)
              
              if (errorMsg.includes('Tauri not available')) {
                // In demo mode, just set the patient info without saving to database
                setPatientName(patientData.name)
                setPatientAge(patientData.age.toString())
                setPatientGender(patientData.gender || '')
                setPatientId(Date.now().toString()) // Generate a temporary ID
                setShowAddPatientModal(false)
                
                alert('⚠️ Demo Mode: Running in browser.\n\nPatient info filled but not saved to database.\nTo save permanently, run: npm run tauri:dev')
              } else {
                alert('Failed to add patient: ' + errorMsg)
              }
            }
          }}
          onCancel={() => setShowAddPatientModal(false)}
        />
      )}
      </div>
    </div>
  )
}
