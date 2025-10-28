import React, { useRef, useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useParams } from 'react-router-dom'
import { getVisit, getPatient, getVisitPrescriptions } from '../api/tauri'
import DoctorHeader from '../components/prescription-print/DoctorHeader'
import PatientInfoBar from '../components/prescription-print/PatientInfoBar'
import PrescriptionContent from '../components/prescription-print/PrescriptionContent'
import PrescriptionFooter from '../components/prescription-print/PrescriptionFooter'

export default function PrescriptionPrint() {
  const { id } = useParams()
  const ref = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [prescription, setPrescription] = useState<any>(null)

  useEffect(() => {
    loadVisitData()
  }, [id])

  async function loadVisitData() {
    if (!id) {
      setError('No visit ID provided')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      
      // Fetch visit data
      const visitData: any = await getVisit(parseInt(id))
      
      // Fetch patient data
      const patientData: any = await getPatient(visitData.patient_id)
      
      // Fetch prescriptions for this visit
      const prescriptionsData: any = await getVisitPrescriptions(parseInt(id))
      
      // Parse the notes JSON to get all prescription details
      let parsedNotes: any = {}
      try {
        if (visitData.notes) {
          parsedNotes = JSON.parse(visitData.notes)
        }
      } catch (e) {
        console.error('Failed to parse visit notes:', e)
      }

      // Build the prescription object
      const prescriptionData = {
        doctor: {
          name: 'DR. BIJOY KUMAR',
          qualification: 'MBBS(DU), MD(Endocrinology)',
          designation: 'Consultant-Diabetologist, Endocrinologist & Metabolic Disorder Specialist',
          specialty: 'ডায়াবেটিস, হরমোন ও মেটাবলিক বিশেষজ্ঞ',
          contact: 'মোবাইল: ০১৯১২-৪৭৮৭৬৭ (নিয়োগ: ১০টা - ১টা, ৪-৮টা সন্ধ্যা ৬-৮টা)',
        },
        patient: {
          name: parsedNotes.patientInfo?.name || patientData.name || '',
          age: parsedNotes.patientInfo?.age || patientData.age || 0,
          gender: parsedNotes.patientInfo?.gender || patientData.gender || '',
          date: parsedNotes.visitDate || visitData.date || '',
          pid: parsedNotes.patientInfo?.id || patientData.id || '',
        },
        chiefComplaint: parsedNotes.chiefComplaints || [],
        history: parsedNotes.histories || [],
        examination: parsedNotes.examinations || [],
        investigation: parsedNotes.investigations || [],
        diagnosis: parsedNotes.diagnoses || [],
        medicines: parsedNotes.medicines || prescriptionsData.map((p: any) => ({
          name: p.medicine,
          genericName: p.generic_name,
          dosage: p.dosage,
          instructions: p.instructions
        })),
        advice: parsedNotes.advices || [],
        followUp: parsedNotes.followUps || [],
        treatmentPlan: parsedNotes.treatmentPlans ? parsedNotes.treatmentPlans.join(', ') : '',
        specialNotes: parsedNotes.specialNotes || [],
      }

      setPrescription(prescriptionData)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load visit data:', error)
      setError((error as Error).message || 'Failed to load prescription data')
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-2">Loading prescription...</div>
          <div className="text-sm text-gray-600">Please wait</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-2">Error loading prescription</div>
          <div className="text-sm text-gray-600">{error}</div>
        </div>
      </div>
    )
  }

  if (!prescription) {
    return (
      <div className="bg-gray-50 min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-lg">No prescription data found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto mb-4 flex gap-2 no-print">
        <button onClick={handlePDF} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save as PDF
        </button>
        <button onClick={() => window.print()} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Print
        </button>
      </div>
      
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
        }
      `}} />
      
      <div ref={ref} className="max-w-4xl mx-auto bg-white shadow-lg p-6 print-area">
        <DoctorHeader />
        <PatientInfoBar patient={prescription.patient} />
        <PrescriptionContent prescription={prescription} />
        <PrescriptionFooter />
      </div>
    </div>
  )
}
