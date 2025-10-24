import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addVisit, addPrescription, getPatient, listPatients as listPatientsApi, addPatient } from '../api/tauri'
import PatientForm from '../components/PatientForm'
import { searchMedicines, type Medicine } from '../data/medicines'

// Search Modal Component
interface SearchModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  searchItems: string[]
  onAdd: (item: string, duration?: string, note?: string) => void
  showDuration?: boolean
  showNote?: boolean
}

function SearchModal({ title, isOpen, onClose, searchItems, onAdd, showDuration, showNote }: SearchModalProps) {
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

// Medicine Search Modal
function MedicineSearchModal({ isOpen, onClose, onAdd }: any) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [schedule, setSchedule] = useState({ morning: 0, noon: 0, evening: 0, night: 0 })
  const [unit, setUnit] = useState('টি')
  const [beforeAfterMeal, setBeforeAfterMeal] = useState('')
  const [duration, setDuration] = useState('')

  if (!isOpen) return null

  // Use the search function from medicines database
  const filteredMedicines = searchTerm ? searchMedicines(searchTerm) : []

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

export default function Prescription() {
  const navigate = useNavigate()
  const [patientName, setPatientName] = useState('')
  const [patientAge, setPatientAge] = useState('')
  const [patientId, setPatientId] = useState('')
  const [showAddPatientModal, setShowAddPatientModal] = useState(false)
  const [searchPatientQuery, setSearchPatientQuery] = useState('')

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

  // Search items
  const complaintItems = ['Fever', 'Cough', 'Headache', 'Body ache', 'Chest pain', 'Shortness of breath', 'Abdominal pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Dizziness', 'Weakness', 'Loss of appetite', 'Weight loss', 'Insomnia', 'Sore throat', 'Running nose', 'জ্বর', 'কাশি', 'মাথা ব্যথা', 'পেট ব্যথা']
  const historyItems = ['HTN (Hypertension)', 'DM (Diabetes Mellitus)', 'Asthma', 'COPD', 'IHD (Ischemic Heart Disease)', 'Stroke', 'CKD (Chronic Kidney Disease)', 'Thyroid disorder', 'Previous surgery', 'Drug allergy', 'Family history of DM', 'Family history of HTN', 'Smoking history', 'Alcohol history']
  const examinationItems = ['BP-120/80 mm Hg', 'BP-140/90 mm Hg', 'Pulse-80/min', 'Temp-98.6°F', 'Temp-100°F', 'RR-18/min', 'Weight-65 kg', 'Weight-70 kg', 'Height-170 cm', 'BMI-24', 'Pallor present', 'Jaundice present', 'Edema present', 'Lymphadenopathy', 'Thyroid enlarged']
  const investigationItems = ['CBC (Complete Blood Count)', 'RBS (Random Blood Sugar)', 'FBS (Fasting Blood Sugar)', 'HbA1c', 'Lipid profile', 'Creatinine', 'Urea', 'Electrolytes', 'Liver function test', 'Thyroid function test', 'ECG', 'Chest X-ray', 'Ultrasound abdomen', 'Urine R/E', 'Stool R/E']
  const diagnosisItems = ['HTN (Hypertension)', 'Type 2 DM', 'URTI (Upper Respiratory Tract Infection)', 'Gastritis', 'Peptic ulcer disease', 'Asthma', 'COPD', 'Pneumonia', 'UTI (Urinary Tract Infection)', 'Typhoid fever', 'Dengue fever', 'Hypothyroidism', 'Hyperthyroidism', 'Anemia', 'Migraine']
  const treatmentItems = ['Bed rest', 'Plenty of fluid intake', 'Avoid oily/spicy food', 'Light diet', 'Low salt diet', 'Diabetic diet', 'Regular exercise', 'Weight reduction', 'Avoid smoking', 'Avoid alcohol', 'Strict glucose control']
  const adviceItems = ['Take adequate rest', 'Drink plenty of water', 'Avoid cold drinks', 'Avoid outside food', 'Maintain personal hygiene', 'Regular hand washing', 'Use mosquito net', 'Check blood pressure regularly', 'Check blood sugar regularly', 'Maintain food chart', 'Regular exercise 30 min daily']
  const followUpItems = ['After 7 days', 'After 15 days', 'After 1 month', 'After 3 months', 'After 6 months', 'With reports', 'If condition worsens', 'SOS (If needed)', 'Regular follow-up', '৭ দিন পর আসুন', '১৫ দিন পর আসুন', 'রিপোর্ট নিয়ে আসুন']

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20mm;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
          .print-area {
            page-break-after: avoid;
          }
          /* Reduce spacing for print */
          .print-area h1 {
            font-size: 18pt !important;
          }
          .print-area h2 {
            font-size: 16pt !important;
          }
          .print-area .text-sm {
            font-size: 10pt !important;
          }
          .print-area .text-xs {
            font-size: 8pt !important;
          }
          .print-area .p-4 {
            padding: 6px 0 !important;
          }
          .print-area .p-6 {
            padding: 10px 0 !important;
          }
          .print-area .mb-4 {
            margin-bottom: 6px !important;
          }
          .print-area .space-y-4 > * + * {
            margin-top: 12px !important;
          }
          .print-area .border-l-4 {
            border-left: none !important;
          }
          .print-area .bg-white {
            background: transparent !important;
          }
          .print-only {
            display: block !important;
          }
          .print-area .border-t-2 {
            border-top: 1px solid #000 !important;
             margin-top: 15px !important;
            padding-top: 10px !important;
          }
        }
      `}} />
      
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
        {/* <div className="flex gap-3">
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
            🖨 Print Preview
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search Prescription"
              className="px-4 py-2 border-2 border-gray-300 rounded w-64"
            />
          </div>
        </div> */}
      </div>

      <div className="p-6 print-area">
        {/* Doctor Header */}
        <div className="p-6 mb-0">
          {/* <div className="text-center mb-4">
            <div className="grid grid-cols-5 gap-2 text-xs text-gray-500">
              <div>WHO<br/>যিনি</div>
              <div>makes<br/>রোগ</div>
              <div>(you)ill,<br/>দিয়েছেন,</div>
              <div>regulates all things.<br/>তিনিই সবকিছু করেন।</div>
              <div>Pray to HIM.<br/>তাঁরই করুণা যাচেন।</div>
            </div>
            <hr className="my-2"/>
          </div> */}
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
            {/* <button 
              className="text-gray-600 hover:text-gray-800 text-xs ml-1"
            >
              🔍 Search Patient */}
            {/* </button> */}
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

            {/* Treatment Plan */}
            <div className="mb-3">
              <button
                onClick={() => setActiveModal('treatment')}
                className="font-bold text-gray-900 mb-1 hover:text-gray-600 text-sm no-print"
              >
                Treatment Plan +
              </button>
              <div className="font-bold text-gray-900 text-sm print-only hidden">Treatment:</div>
              {treatmentPlans.length > 0 && (
                <div className="text-sm text-gray-700 ml-4">
                  {treatmentPlans.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      • {item}
                      <button
                        onClick={() => removeItem('treatment', idx)}
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
                  chiefComplaints,
                  histories,
                  examinations,
                  investigations,
                  diagnoses,
                  treatmentPlans,
                  advices,
                  followUps
                })
                
                const visitId = await addVisit(parseInt(patientId), currentDate, notes)
                
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
                  chiefComplaints,
                  histories,
                  examinations,
                  investigations,
                  diagnoses,
                  treatmentPlans,
                  advices,
                  followUps
                })
                
                const visitId = await addVisit(parseInt(patientId), currentDate, notes)
                
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
