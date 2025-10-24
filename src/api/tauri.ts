// Lazy-loaded Tauri APIs
let _invoke: any = null
let _initPromise: Promise<void> | null = null

async function initTauriApis() {
  if (_initPromise) return _initPromise
  
  _initPromise = (async () => {
    try {
      // Check if Tauri is available (Tauri v1 uses __TAURI__)
      if (typeof window === 'undefined' || !('__TAURI__' in window)) {
        throw new Error('Tauri not available - running in browser mode')
      }
      
      // Import Tauri v1 API
      const tauriModule = await import('@tauri-apps/api/tauri')
      _invoke = tauriModule.invoke
      
      if (!_invoke) {
        throw new Error('Failed to load Tauri APIs - invoke is undefined')
      }
    } catch (err) {
      console.error('Tauri API initialization failed:', err)
      throw new Error('Tauri not available')
    }
  })()
  
  return _initPromise
}

export async function listPatients() {
  await initTauriApis()
  return await _invoke('list_patients')
}

export async function addPatient(name: string, age: number, gender: string, phone: string, address: string) {
  await initTauriApis()
  return await _invoke('add_patient', { name, age, gender, phone, address })
}

export async function updatePatient(id: number, name: string, age: number, gender: string, phone: string, address: string) {
  await initTauriApis()
  return await _invoke('update_patient', { id, name, age, gender, phone, address })
}

export async function deletePatient(id: number) {
  await initTauriApis()
  return await _invoke('delete_patient', { id })
}

export async function getPatient(id: number) {
  await initTauriApis()
  return await _invoke('get_patient', { id })
}

export async function verifyLogin(username: string, password: string) {
  await initTauriApis()
  return await _invoke('verify_login', { username, password })
}

export async function addVisit(patientId: number, date: string, notes: string) {
  await initTauriApis()
  return await _invoke('add_visit', { patientId, date, notes })
}

export async function getPatientVisits(patientId: number) {
  await initTauriApis()
  return await _invoke('get_patient_visits', { patientId })
}

export async function addPrescription(visitId: number, medicine: string, genericName: string, dosage: string, instructions: string) {
  await initTauriApis()
  return await _invoke('add_prescription', { visitId, medicine, genericName, dosage, instructions })
}

export async function getVisitPrescriptions(visitId: number) {
  await initTauriApis()
  return await _invoke('get_visit_prescriptions', { visitId })
}

export async function getStatistics() {
  await initTauriApis()
  return await _invoke('get_statistics')
}
