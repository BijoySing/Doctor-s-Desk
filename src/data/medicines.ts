// Bangladesh Medicine Database
// Data sourced from medex.com.bd and Kaggle Bangladesh Medicine Dataset
// https://www.kaggle.com/ahmedshahriarsakib/assorted-medicine-dataset-of-bangladesh

export interface Medicine {
  brand: string
  generic: string
  strength?: string
  dosageForm?: string
  manufacturer?: string
}

export const MEDICINES_DATABASE: Medicine[] = [
  // Paracetamol
  { brand: 'Napa', generic: 'Paracetamol', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Napa', generic: 'Paracetamol', strength: '125 mg', dosageForm: 'Suppository' },
  { brand: 'Napa', generic: 'Paracetamol', strength: '250 mg', dosageForm: 'Suppository' },
  { brand: 'Napa Extend', generic: 'Paracetamol', strength: '665 mg', dosageForm: 'Tablet' },
  { brand: 'Ace', generic: 'Paracetamol', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Panadol', generic: 'Paracetamol', strength: '500 mg', dosageForm: 'Tablet' },
  
  // Antibiotics - Cephalosporins
  { brand: 'Cef-3', generic: 'Cefixime', strength: '200 mg', dosageForm: 'Capsule' },
  { brand: 'Cefatop', generic: 'Cefixime', strength: '200 mg', dosageForm: 'Capsule' },
  { brand: 'Cefufine', generic: 'Cefixime', strength: '125 mg/5ml', dosageForm: 'Powder' },
  { brand: 'Monocef', generic: 'Ceftriaxone', strength: '1 gm', dosageForm: 'Injection' },
  { brand: 'Ceftum', generic: 'Cefuroxime', strength: '250 mg', dosageForm: 'Tablet' },
  
  // Antibiotics - Penicillins
  { brand: 'Amoclan', generic: 'Amoxicillin + Clavulanic Acid', strength: '500 mg + 125 mg', dosageForm: 'Tablet' },
  { brand: 'Amoxin', generic: 'Amoxicillin', strength: '500 mg', dosageForm: 'Capsule' },
  { brand: 'Cloxacil', generic: 'Cloxacillin', strength: '500 mg', dosageForm: 'Capsule' },
  
  // Antibiotics - Fluoroquinolones
  { brand: 'Ciprocin', generic: 'Ciprofloxacin', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Levoflox', generic: 'Levofloxacin', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Ofloxacin', generic: 'Ofloxacin', strength: '200 mg', dosageForm: 'Tablet' },
  
  // Antibiotics - Macrolides
  { brand: 'Azithro', generic: 'Azithromycin', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Azimax', generic: 'Azithromycin', strength: '250 mg', dosageForm: 'Capsule' },
  { brand: 'Ery', generic: 'Erythromycin', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Klacid', generic: 'Clarithromycin', strength: '500 mg', dosageForm: 'Tablet' },
  
  // Antibiotics - Others
  { brand: 'Flagyl', generic: 'Metronidazole', strength: '400 mg', dosageForm: 'Tablet' },
  { brand: 'Amodis', generic: 'Metronidazole', strength: '400 mg', dosageForm: 'Tablet' },
  { brand: 'Secnil', generic: 'Secnidazole', strength: '1 gm', dosageForm: 'Tablet' },
  
  // Proton Pump Inhibitors
  { brand: 'Opental', generic: 'Omeprazole', strength: '20 mg', dosageForm: 'Capsule' },
  { brand: 'Losectil', generic: 'Omeprazole', strength: '20 mg', dosageForm: 'Capsule' },
  { brand: 'Pentium', generic: 'Pantoprazole', strength: '40 mg', dosageForm: 'Tablet' },
  { brand: 'Pantonix', generic: 'Pantoprazole', strength: '20 mg', dosageForm: 'Tablet' },
  { brand: 'Esoral', generic: 'Esomeprazole', strength: '20 mg', dosageForm: 'Capsule' },
  { brand: 'Seclo', generic: 'Esomeprazole', strength: '40 mg', dosageForm: 'Capsule' },
  { brand: 'Ranitac', generic: 'Ranitidine', strength: '150 mg', dosageForm: 'Tablet' },
  { brand: 'Famotac', generic: 'Famotidine', strength: '40 mg', dosageForm: 'Tablet' },
  
  // NSAIDs (Non-Steroidal Anti-Inflammatory Drugs)
  { brand: 'Nimocon', generic: 'Nimesulide', strength: '100 mg', dosageForm: 'Tablet' },
  { brand: 'Maxeflam', generic: 'Aceclofenac', strength: '100 mg', dosageForm: 'Tablet' },
  { brand: 'Fenac', generic: 'Diclofenac Sodium', strength: '50 mg', dosageForm: 'Tablet' },
  { brand: 'Indopan', generic: 'Indomethacin', strength: '25 mg', dosageForm: 'Capsule' },
  { brand: 'Brufen', generic: 'Ibuprofen', strength: '400 mg', dosageForm: 'Tablet' },
  { brand: 'Naprox', generic: 'Naproxen', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Xefo', generic: 'Lornoxicam', strength: '8 mg', dosageForm: 'Tablet' },
  { brand: 'Arcoxia', generic: 'Etoricoxib', strength: '90 mg', dosageForm: 'Tablet' },
  
  // Antihistamines
  { brand: 'Alatrol', generic: 'Cetirizine', strength: '10 mg', dosageForm: 'Tablet' },
  { brand: 'Cetirizine', generic: 'Cetirizine', strength: '10 mg', dosageForm: 'Tablet' },
  { brand: 'Fexo', generic: 'Fexofenadine', strength: '120 mg', dosageForm: 'Tablet' },
  { brand: 'Histacin', generic: 'Chlorpheniramine', strength: '4 mg', dosageForm: 'Tablet' },
  { brand: 'Loratin', generic: 'Loratadine', strength: '10 mg', dosageForm: 'Tablet' },
  { brand: 'Deslo', generic: 'Desloratadine', strength: '5 mg', dosageForm: 'Tablet' },
  
  // Antihypertensives - ACE Inhibitors
  { brand: 'Lisinop', generic: 'Lisinopril', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Ramace', generic: 'Ramipril', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Renitec', generic: 'Enalapril', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Perindo', generic: 'Perindopril', strength: '4 mg', dosageForm: 'Tablet' },
  
  // Antihypertensives - ARBs (Angiotensin Receptor Blockers)
  { brand: 'Losectil', generic: 'Losartan', strength: '50 mg', dosageForm: 'Tablet' },
  { brand: 'Telmi', generic: 'Telmisartan', strength: '40 mg', dosageForm: 'Tablet' },
  { brand: 'Valzaar', generic: 'Valsartan', strength: '80 mg', dosageForm: 'Tablet' },
  { brand: 'Irban', generic: 'Irbesartan', strength: '150 mg', dosageForm: 'Tablet' },
  
  // Antihypertensives - Calcium Channel Blockers
  { brand: 'Amdocal', generic: 'Amlodipine', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Norvasc', generic: 'Amlodipine', strength: '10 mg', dosageForm: 'Tablet' },
  { brand: 'Dilcard', generic: 'Diltiazem', strength: '60 mg', dosageForm: 'Tablet' },
  { brand: 'Nif', generic: 'Nifedipine', strength: '10 mg', dosageForm: 'Tablet' },
  
  // Antihypertensives - Beta Blockers
  { brand: 'Betaloc', generic: 'Metoprolol', strength: '50 mg', dosageForm: 'Tablet' },
  { brand: 'Atenolol', generic: 'Atenolol', strength: '50 mg', dosageForm: 'Tablet' },
  { brand: 'Carvedilol', generic: 'Carvedilol', strength: '6.25 mg', dosageForm: 'Tablet' },
  { brand: 'Nebicard', generic: 'Nebivolol', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Bisoprolol', generic: 'Bisoprolol', strength: '5 mg', dosageForm: 'Tablet' },
  
  // Diuretics
  { brand: 'Frusemide', generic: 'Furosemide', strength: '40 mg', dosageForm: 'Tablet' },
  { brand: 'Spironolactone', generic: 'Spironolactone', strength: '25 mg', dosageForm: 'Tablet' },
  { brand: 'Indapamide', generic: 'Indapamide', strength: '2.5 mg', dosageForm: 'Tablet' },
  { brand: 'Torasemide', generic: 'Torasemide', strength: '10 mg', dosageForm: 'Tablet' },
  
  // Antidiabetic Drugs - Oral
  { brand: 'Glucopage', generic: 'Metformin', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Metformin', generic: 'Metformin', strength: '850 mg', dosageForm: 'Tablet' },
  { brand: 'Daonil', generic: 'Glibenclamide', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Glizid', generic: 'Gliclazide', strength: '80 mg', dosageForm: 'Tablet' },
  { brand: 'Glimepiride', generic: 'Glimepiride', strength: '2 mg', dosageForm: 'Tablet' },
  { brand: 'Januvia', generic: 'Sitagliptin', strength: '100 mg', dosageForm: 'Tablet' },
  { brand: 'Vildagliptin', generic: 'Vildagliptin', strength: '50 mg', dosageForm: 'Tablet' },
  { brand: 'Pioglitazone', generic: 'Pioglitazone', strength: '15 mg', dosageForm: 'Tablet' },
  
  // Antidiabetic - Insulin
  { brand: 'Insulatard', generic: 'Insulin NPH', strength: '100 IU/ml', dosageForm: 'Injection' },
  { brand: 'Actrapid', generic: 'Insulin Regular', strength: '100 IU/ml', dosageForm: 'Injection' },
  { brand: 'Mixtard', generic: 'Insulin Mixed', strength: '30/70', dosageForm: 'Injection' },
  
  // Lipid Lowering Agents
  { brand: 'Atorvastatin', generic: 'Atorvastatin', strength: '10 mg', dosageForm: 'Tablet' },
  { brand: 'Rosuva', generic: 'Rosuvastatin', strength: '10 mg', dosageForm: 'Tablet' },
  { brand: 'Simvastatin', generic: 'Simvastatin', strength: '20 mg', dosageForm: 'Tablet' },
  { brand: 'Fenofibrate', generic: 'Fenofibrate', strength: '160 mg', dosageForm: 'Tablet' },
  { brand: 'Ezetimibe', generic: 'Ezetimibe', strength: '10 mg', dosageForm: 'Tablet' },
  
  // Antiplatelet / Anticoagulant
  { brand: 'Clopidogrel', generic: 'Clopidogrel', strength: '75 mg', dosageForm: 'Tablet' },
  { brand: 'Ecosprin', generic: 'Aspirin', strength: '75 mg', dosageForm: 'Tablet' },
  { brand: 'Aspirin', generic: 'Aspirin', strength: '300 mg', dosageForm: 'Tablet' },
  { brand: 'AFDCFC', generic: 'Clopidogrel + Aspirin', strength: '75 mg + 150 mg', dosageForm: 'Tablet' },
  { brand: 'Warfarin', generic: 'Warfarin', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Rivaroxaban', generic: 'Rivaroxaban', strength: '10 mg', dosageForm: 'Tablet' },
  
  // Thyroid Medications
  { brand: 'Thyrox', generic: 'Levothyroxine', strength: '50 mcg', dosageForm: 'Tablet' },
  { brand: 'Levothyroxine', generic: 'Levothyroxine', strength: '100 mcg', dosageForm: 'Tablet' },
  { brand: 'Carbimazole', generic: 'Carbimazole', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'PTU', generic: 'Propylthiouracil', strength: '50 mg', dosageForm: 'Tablet' },
  
  // Vitamins and Supplements
  { brand: 'Adbon', generic: 'Calcium + Vitamin D3', strength: '500 mg + 200 IU', dosageForm: 'Tablet' },
  { brand: 'Calcin', generic: 'Calcium Carbonate', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Folic Acid', generic: 'Folic Acid', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Vitamin B Complex', generic: 'B Complex', strength: 'Various', dosageForm: 'Tablet' },
  { brand: 'Vitamin C', generic: 'Ascorbic Acid', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Vitamin D3', generic: 'Cholecalciferol', strength: '1000 IU', dosageForm: 'Capsule' },
  { brand: 'Vitamin E', generic: 'Tocopherol', strength: '400 IU', dosageForm: 'Capsule' },
  { brand: 'Multivitamin', generic: 'Multivitamin', strength: 'Various', dosageForm: 'Tablet' },
  { brand: 'Ferrous Sulfate', generic: 'Iron', strength: '200 mg', dosageForm: 'Tablet' },
  { brand: 'Zinc', generic: 'Zinc Sulfate', strength: '20 mg', dosageForm: 'Tablet' },
  
  // Antacids and Digestive Aids
  { brand: 'Motigut', generic: 'Domperidone', strength: '10 mg', dosageForm: 'Tablet' },
  { brand: 'Ganaton', generic: 'Itopride', strength: '50 mg', dosageForm: 'Tablet' },
  { brand: 'Acimax', generic: 'Magaldrate', strength: '800 mg', dosageForm: 'Tablet' },
  { brand: 'Gaviscon', generic: 'Alginate + Antacid', strength: 'Various', dosageForm: 'Suspension' },
  
  // Antiemetics
  { brand: 'Ondansetron', generic: 'Ondansetron', strength: '4 mg', dosageForm: 'Tablet' },
  { brand: 'Emeset', generic: 'Ondansetron', strength: '8 mg', dosageForm: 'Tablet' },
  { brand: 'Metoclopramide', generic: 'Metoclopramide', strength: '10 mg', dosageForm: 'Tablet' },
  
  // Respiratory Medications
  { brand: 'Montair', generic: 'Montelukast', strength: '10 mg', dosageForm: 'Tablet' },
  { brand: 'Salbutamol', generic: 'Salbutamol', strength: '4 mg', dosageForm: 'Tablet' },
  { brand: 'Ventolin Inhaler', generic: 'Salbutamol', strength: '100 mcg/dose', dosageForm: 'Inhaler' },
  { brand: 'Tiotropium', generic: 'Tiotropium', strength: '18 mcg', dosageForm: 'Inhaler' },
  { brand: 'Deriphyllin', generic: 'Theophylline', strength: '300 mg', dosageForm: 'Tablet' },
  { brand: 'Ncutin', generic: 'N-Acetylcysteine', strength: '600 mg', dosageForm: 'Tablet' },
  
  // Antiepileptic Drugs
  { brand: 'Levetiracetam', generic: 'Levetiracetam', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Keppra', generic: 'Levetiracetam', strength: '750 mg', dosageForm: 'Tablet' },
  { brand: 'Carbamazepine', generic: 'Carbamazepine', strength: '200 mg', dosageForm: 'Tablet' },
  { brand: 'Valproate', generic: 'Sodium Valproate', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'Lamotrigine', generic: 'Lamotrigine', strength: '100 mg', dosageForm: 'Tablet' },
  { brand: 'Phenytoin', generic: 'Phenytoin', strength: '100 mg', dosageForm: 'Capsule' },
  { brand: 'Gabapentin', generic: 'Gabapentin', strength: '300 mg', dosageForm: 'Capsule' },
  { brand: 'Pregabalin', generic: 'Pregabalin', strength: '75 mg', dosageForm: 'Capsule' },
  
  // Antidepressants and Anxiolytics
  { brand: 'Escitalopram', generic: 'Escitalopram', strength: '10 mg', dosageForm: 'Tablet' },
  { brand: 'Fluoxetine', generic: 'Fluoxetine', strength: '20 mg', dosageForm: 'Capsule' },
  { brand: 'Sertraline', generic: 'Sertraline', strength: '50 mg', dosageForm: 'Tablet' },
  { brand: 'Clonazepam', generic: 'Clonazepam', strength: '0.5 mg', dosageForm: 'Tablet' },
  { brand: 'Alprazolam', generic: 'Alprazolam', strength: '0.5 mg', dosageForm: 'Tablet' },
  { brand: 'Bromazepam', generic: 'Bromazepam', strength: '3 mg', dosageForm: 'Tablet' },
  
  // Antipsychotics
  { brand: 'Risperidone', generic: 'Risperidone', strength: '2 mg', dosageForm: 'Tablet' },
  { brand: 'Olanzapine', generic: 'Olanzapine', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Quetiapine', generic: 'Quetiapine', strength: '100 mg', dosageForm: 'Tablet' },
  { brand: 'Haloperidol', generic: 'Haloperidol', strength: '5 mg', dosageForm: 'Tablet' },
  
  // Anti-TB (Tuberculosis) Drugs
  { brand: 'Tubutol', generic: 'Ethambutol', strength: '400 mg', dosageForm: 'Tablet' },
  { brand: 'Rifampicin', generic: 'Rifampicin', strength: '450 mg', dosageForm: 'Capsule' },
  { brand: 'Isoniazid', generic: 'Isoniazid', strength: '300 mg', dosageForm: 'Tablet' },
  { brand: 'Pyrazinamide', generic: 'Pyrazinamide', strength: '500 mg', dosageForm: 'Tablet' },
  { brand: 'AFDCDT', generic: 'Isoniazid + Rifampicin + Pyrazinamide', strength: '50 mg + 150 mg + 75 mg', dosageForm: 'Dispersible' },
  
  // Dementia / Alzheimer's
  { brand: 'Donepezil', generic: 'Donepezil Hydrochloride', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Rivastigmine', generic: 'Rivastigmine', strength: '1.5 mg', dosageForm: 'Capsule' },
  { brand: 'Memantine', generic: 'Memantine', strength: '10 mg', dosageForm: 'Tablet' },
  
  // Laxatives and Stool Softeners
  { brand: 'Dulcolax', generic: 'Bisacodyl', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Sapotor', generic: 'Bisacodyl', strength: '10 mg', dosageForm: 'Suppository' },
  { brand: 'Glycerin', generic: 'Glycerin', strength: '1.035 gm', dosageForm: 'Suppository' },
  { brand: 'Lactulose', generic: 'Lactulose', strength: '10 gm/15 ml', dosageForm: 'Syrup' },
  
  // Antimalarials
  { brand: 'Chloroquine', generic: 'Chloroquine', strength: '250 mg', dosageForm: 'Tablet' },
  { brand: 'Artemether + Lumefantrine', generic: 'Artemether + Lumefantrine', strength: '20 mg + 120 mg', dosageForm: 'Tablet' },
  { brand: 'Primaquine', generic: 'Primaquine', strength: '15 mg', dosageForm: 'Tablet' },
  
  // Antivirals
  { brand: 'Acyclovir', generic: 'Acyclovir', strength: '400 mg', dosageForm: 'Tablet' },
  { brand: 'Oseltamivir', generic: 'Oseltamivir', strength: '75 mg', dosageForm: 'Capsule' },
  { brand: 'Remdesivir', generic: 'Remdesivir', strength: '100 mg', dosageForm: 'Injection' },
  
  // Corticosteroids
  { brand: 'Prednisolone', generic: 'Prednisolone', strength: '5 mg', dosageForm: 'Tablet' },
  { brand: 'Dexamethasone', generic: 'Dexamethasone', strength: '0.5 mg', dosageForm: 'Tablet' },
  { brand: 'Hydrocortisone', generic: 'Hydrocortisone', strength: '100 mg', dosageForm: 'Injection' },
  { brand: 'Methylprednisolone', generic: 'Methylprednisolone', strength: '4 mg', dosageForm: 'Tablet' },
  
  // Anticoagulants (Injectable)
  { brand: 'Heparin', generic: 'Heparin', strength: '5000 IU/ml', dosageForm: 'Injection' },
  { brand: 'Enoxaparin', generic: 'Enoxaparin', strength: '40 mg', dosageForm: 'Injection' },
  { brand: 'Fondaparinux', generic: 'Fondaparinux', strength: '2.5 mg', dosageForm: 'Injection' },
  
  // Erectile Dysfunction
  { brand: 'Sildenafil', generic: 'Sildenafil', strength: '50 mg', dosageForm: 'Tablet' },
  { brand: 'Tadalafil', generic: 'Tadalafil', strength: '20 mg', dosageForm: 'Tablet' },
  
  // Antifungals
  { brand: 'Fluconazole', generic: 'Fluconazole', strength: '150 mg', dosageForm: 'Capsule' },
  { brand: 'Itraconazole', generic: 'Itraconazole', strength: '100 mg', dosageForm: 'Capsule' },
  { brand: 'Terbinafine', generic: 'Terbinafine', strength: '250 mg', dosageForm: 'Tablet' },
  
  // Eye/Ear Drops
  { brand: 'Timolol', generic: 'Timolol', strength: '0.5%', dosageForm: 'Eye Drops' },
  { brand: 'Latanoprost', generic: 'Latanoprost', strength: '0.005%', dosageForm: 'Eye Drops' },
  { brand: 'Ciprofloxacin', generic: 'Ciprofloxacin', strength: '0.3%', dosageForm: 'Eye/Ear Drops' },
  { brand: 'Chloramphenicol', generic: 'Chloramphenicol', strength: '0.5%', dosageForm: 'Eye Drops' },
  
  // Topical Preparations
  { brand: 'Betnovate', generic: 'Betamethasone', strength: '0.1%', dosageForm: 'Cream' },
  { brand: 'Fluocinolone', generic: 'Fluocinolone', strength: '0.01%', dosageForm: 'Cream' },
  { brand: 'Fusidic Acid', generic: 'Fusidic Acid', strength: '2%', dosageForm: 'Cream' },
  { brand: 'Clotrimazole', generic: 'Clotrimazole', strength: '1%', dosageForm: 'Cream' },
  { brand: 'Mupirocin', generic: 'Mupirocin', strength: '2%', dosageForm: 'Ointment' },
  
  // Antiparasitic
  { brand: 'Albendazole', generic: 'Albendazole', strength: '400 mg', dosageForm: 'Tablet' },
  { brand: 'Mebendazole', generic: 'Mebendazole', strength: '100 mg', dosageForm: 'Tablet' },
  { brand: 'Ivermectin', generic: 'Ivermectin', strength: '6 mg', dosageForm: 'Tablet' },
  
  // Emergency Drugs
  { brand: 'Adrenaline', generic: 'Epinephrine', strength: '1 mg/ml', dosageForm: 'Injection' },
  { brand: 'Atropine', generic: 'Atropine', strength: '0.6 mg/ml', dosageForm: 'Injection' },
  { brand: 'Dopamine', generic: 'Dopamine', strength: '40 mg/ml', dosageForm: 'Injection' },
  { brand: 'Noradrenaline', generic: 'Noradrenaline', strength: '4 mg/ml', dosageForm: 'Injection' },
]

// Helper function to search medicines
export function searchMedicines(query: string): Medicine[] {
  const lowerQuery = query.toLowerCase()
  return MEDICINES_DATABASE.filter(
    (med) =>
      med.brand.toLowerCase().includes(lowerQuery) ||
      med.generic.toLowerCase().includes(lowerQuery)
  ).slice(0, 50) // Limit to 50 results for performance
}

// Helper function to get unique generic names
export function getUniqueGenerics(): string[] {
  const generics = new Set(MEDICINES_DATABASE.map((med) => med.generic))
  return Array.from(generics).sort()
}

// Helper function to get medicines by generic name
export function getMedicinesByGeneric(generic: string): Medicine[] {
  return MEDICINES_DATABASE.filter((med) => med.generic === generic)
}
