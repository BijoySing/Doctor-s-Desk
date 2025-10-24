import React, { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useParams } from 'react-router-dom'

export default function PrescriptionPrint() {
  const { id } = useParams()
  const ref = useRef<HTMLDivElement | null>(null)

  async function handlePDF() {
    if (!ref.current) return
    const canvas = await html2canvas(ref.current, { scale: 2 })
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgProps = (pdf as any).getImageProperties(img)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`prescription-${id}.pdf`)
  }

  // Sample data - replace with actual patient data
  const prescription = {
    doctor: {
      name: 'DR. BIJOY KUMAR',
      qualification: 'MBBS(DU), MD(Endocrinology)',
      designation: 'Consultant-Diabetologist, Endocrinologist & Metabolic Disorder Specialist',
      specialty: 'ডায়াবেটিস, হরমোন ও মেটাবলিক বিশেষজ্ঞ',
      contact: 'মোবাইল: ০১৯১২-৪৭৮৭৬৭ (নিয়োগ: ১০টা - ১টা, ৪-৮টা সন্ধ্যা ৬-৮টা)',
    },
    patient: {
      name: 'Marid',
      age: 66,
      date: '14-07-2024',
      pid: '15314072024J',
    },
    chiefComplaint: [
      'Fever',
      'Tumor',
      'poor sleep',
      'কাশি আছে',
      'Fever',
      'Cancer',
      'Lose hair loss etc',
      'Pain in back of chest-rt side',
      'Cough etc',
    ],
    history: [
      'DM (10yrs)',
      'HTN',
      'Pneumonia',
      'Covid for 3 weeks',
    ],
    examination: [
      'wt=60kg',
      'BP=130/80 mm Hg',
      'Wt=37 kg',
      'BP=140/80 mm Hg',
    ],
    investigation: [
      'ECG',
      'CBC',
      'CBC',
      'CXR',
      'HbA1C',
      'Wt=68kg',
      'CXR',
      'RBS',
      'S.TSH, FT4',
      'S.Litt, ESH, Prolactin',
      'USG of whole abdomen',
      'USG of thyroid',
    ],
    diagnosis: [
      'DM',
      'Ovrwt. to Obese',
      'Hair-loss (under evaluation)',
      'NSCP',
    ],
    medicines: [
      { name: 'Tab. NatrumGold', dosage: '০+০+১', duration: 'রাত্রে / ৫ মাস যাবত পড়ে ৩০টি', frequency: '' },
      { name: 'IV. Exerph+Mgm 1 gm', dosage: '১+০+০', duration: 'খাবার ১/২ ঘণ্টা আগে প্রতি ১০টি', frequency: '' },
      { name: 'Tab. AFDCFC 75 mg + 150 mg', dosage: '০+০+০', duration: '', frequency: '' },
      { name: 'Tab. Nimocen 500 mg', dosage: '১+০+০', duration: '১ মাস', frequency: 'যন্ত্র; যন্ত্র; যন্ত্রলগ্ন পড়ে ১৩০মাস' },
      { name: 'Tab. Opintal 50 mg', dosage: '০+০+১', duration: '', frequency: 'বিকেল ৪টা বা রাত খাবার পড়ে ১২ মাস' },
      { name: 'Tab. Viazac 75 ( +++++)', dosage: '১+০+০', duration: '(যদিও যদি কাজ আসল যাবে) ১৩টি', frequency: '' },
      { name: 'Tab. Tulutol 100 mg', dosage: '০+০+০', duration: '/রাত', frequency: '' },
      { name: 'Tab. Donsepzilhydrocloride 5 mg', dosage: '০+০+০', duration: '/রাত', frequency: '' },
      { name: 'Tab. Opintal 50 mg', dosage: '০+০+০', duration: '', frequency: '' },
      { name: 'Tab. Donsepzilhydrocloride 5 mg', dosage: '০+০+০', duration: '/রাত', frequency: '' },
      { name: 'Tab. AFDCFC 275 mg + 75 mg + 400 mg + 150 mg', dosage: '০+০+০', duration: '', frequency: '' },
      { name: 'Sup. Napa 125 mg', dosage: '০+০+০', duration: '/দিন', frequency: '' },
      { name: 'Tab. AFDCFC 275 mg + 75 mg + 400 mg + 150 mg', dosage: '০+০+০', duration: '', frequency: '' },
      { name: 'Tab. Nimocen 500 mg', dosage: '০+০+০', duration: '/রাত', frequency: '' },
      { name: 'Tab. Neutin 600 mg', dosage: '০+০+০', duration: '/রাত', frequency: '' },
    ],
    advice: [
      'please avoid oily and sugary food and drinks',
      'follow up after 30days',
      'gym korben',
      'joto paren haten',
      'gang niye ghurben',
      'hello',
      'kire',
    ],
    followUp: [
      'after 30days',
      'ok vai tthik ache',
      'fy din por ashun',
    ],
    treatmentPlan: 'Kisu nai',
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto mb-4 flex gap-2">
        <button onClick={handlePDF} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save as PDF
        </button>
        <button onClick={() => window.print()} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Print
        </button>
      </div>
      
      <div ref={ref} className="max-w-4xl mx-auto bg-white shadow-lg" style={{ padding: '20px', fontSize: '11px', lineHeight: '1.3' }}>
        {/* Header */}
        <div className="text-center border-b-2 border-gray-300 pb-3 mb-3">
          <h1 className="text-xl font-bold text-gray-800">{prescription.doctor.name}</h1>
          <p className="text-xs text-gray-600">{prescription.doctor.qualification}</p>
          <p className="text-sm font-semibold text-gray-700">{prescription.doctor.designation}</p>
          <p className="text-sm text-gray-600">{prescription.doctor.specialty}</p>
        </div>

        {/* Patient Info Bar */}
        <div className="grid grid-cols-4 gap-2 bg-gray-200 p-2 mb-3 text-xs">
          <div>
            <span className="font-semibold">Pt's Name: </span>
            <span>{prescription.patient.name}</span>
          </div>
          <div>
            <span className="font-semibold">Age: </span>
            <span>{prescription.patient.age}</span>
          </div>
          <div>
            <span className="font-semibold">Date: </span>
            <span>{prescription.patient.date}</span>
          </div>
          <div>
            <span className="font-semibold">PID: </span>
            <span>{prescription.patient.pid}</span>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-3 gap-3">
          {/* Left Column - Patient Details */}
          <div className="col-span-1 space-y-3">
            {/* Chief Complaint */}
            <div>
              <h3 className="font-bold text-xs mb-1 underline">Chief Complaint:</h3>
              <ul className="list-disc list-inside text-xs space-y-0.5">
                {prescription.chiefComplaint.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* History */}
            <div>
              <h3 className="font-bold text-xs mb-1 underline">History +</h3>
              <ul className="list-disc list-inside text-xs space-y-0.5">
                {prescription.history.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* On Examination */}
            <div>
              <h3 className="font-bold text-xs mb-1 underline">On Examination +</h3>
              <ul className="list-disc list-inside text-xs space-y-0.5">
                {prescription.examination.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Investigation */}
            <div>
              <h3 className="font-bold text-xs mb-1 underline">Investigation +</h3>
              <ul className="list-disc list-inside text-xs space-y-0.5">
                {prescription.investigation.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Diagnosis */}
            <div>
              <h3 className="font-bold text-xs mb-1 underline">Diagnosis +</h3>
              <ul className="list-disc list-inside text-xs space-y-0.5">
                {prescription.diagnosis.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Treatment Plan */}
            <div>
              <h3 className="font-bold text-xs mb-1 underline">Treatment Plan +</h3>
              <ul className="list-disc list-inside text-xs">
                <li>{prescription.treatmentPlan}</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Prescription */}
          <div className="col-span-2 border-l-2 border-gray-300 pl-3">
            <h3 className="font-bold text-sm mb-2">Rx +</h3>
            <div className="space-y-1">
              {prescription.medicines.map((med, i) => (
                <div key={i} className="text-xs">
                  <div className="flex">
                    <span className="font-semibold mr-2">{i + 1}.</span>
                    <div className="flex-1">
                      <div className="font-semibold">{med.name}</div>
                      <div className="ml-4">
                        {med.dosage && <span className="mr-3">{med.dosage}</span>}
                        {med.duration && <span className="mr-2">{med.duration}</span>}
                        {med.frequency && <span>{med.frequency}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Advice Section */}
            <div className="mt-4">
              <h3 className="font-bold text-xs mb-1 underline">Advices +</h3>
              <ul className="list-disc list-inside text-xs space-y-0.5">
                {prescription.advice.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Follow Up */}
            <div className="mt-3">
              <h3 className="font-bold text-xs mb-1 underline">Follow Up +</h3>
              <ul className="list-disc list-inside text-xs space-y-0.5">
                {prescription.followUp.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-gray-300 text-center text-xs">
          <p className="text-gray-600">{prescription.doctor.contact}</p>
        </div>
      </div>
    </div>
  )
}
