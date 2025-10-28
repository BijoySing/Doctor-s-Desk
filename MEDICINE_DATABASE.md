# Bangladesh Medicine Database Collection

## Overview
This project includes a web scraper to collect comprehensive Bangladesh medicine data from **MedEx Bangladesh** (medex.com.bd), the largest online medicine database in Bangladesh.

## Database Statistics
- **Source**: MedEx Bangladesh (https://medex.com.bd/brands)
- **Total Pages**: 830
- **Estimated Medicines**: 16,600+
- **Current Database**: 300+ medicines (can be expanded to full database)
- **Data Includes**: Brand name, Generic name, Strength, Dosage form, Manufacturer

## Quick Start - Collect All Bangladesh Medicines

### 1. Install Python Dependencies
```bash
cd scripts
pip install -r requirements.txt
```

### 2. Run the Scraper
```bash
python scrape_medex_medicines.py
```

### 3. Choose Collection Size
When prompted, select:
- **Option 1**: Quick test (10 pages, ~200 medicines) - 1 minute
- **Option 2**: Medium collection (100 pages, ~2,000 medicines) - 5 minutes
- **Option 3**: Full database (830 pages, ~16,600 medicines) - 30 minutes **[RECOMMENDED]**

### 4. Output Files
The script generates:
- `medicines_raw.json` - Raw JSON data for backup
- `src/data/medicines.ts` - TypeScript database file (ready to use)

## Current Dataset Information

The database currently includes **300+ medicines** with the following information:
- **Brand Name**: Commercial/trade name of the medicine
- **Generic Name**: Active pharmaceutical ingredient (API)
- **Strength**: Dosage strength (e.g., 500 mg, 10 mg)
- **Dosage Form**: Tablet, Capsule, Injection, Syrup, etc.
- **Manufacturer**: (optional) Company name

## Categories Included

### 1. **Analgesics & Antipyretics**
   - Paracetamol (Napa, Ace, Panadol)
   - NSAIDs (Nimocon, Maxeflam, Fenac, Brufen)

### 2. **Antibiotics**
   - Cephalosporins (Cef-3, Cefatop, Monocef)
   - Penicillins (Amoclan, Amoxin)
   - Fluoroquinolones (Ciprocin, Levoflox)
   - Macrolides (Azithro, Klacid)
   - Others (Flagyl, Secnil)

### 3. **Gastrointestinal Drugs**
   - Proton Pump Inhibitors (Opental, Pentium, Esoral, Seclo)
   - H2 Receptor Antagonists (Ranitac, Famotac)
   - Antacids and Digestive Aids (Motigut, Ganaton)
   - Antiemetics (Ondansetron, Metoclopramide)

### 4. **Cardiovascular Drugs**
   - Antihypertensives (ACE Inhibitors, ARBs, Beta Blockers, CCBs)
   - Lipid Lowering Agents (Atorvastatin, Rosuva)
   - Antiplatelet/Anticoagulants (Clopidogrel, Aspirin, Warfarin)
   - Diuretics (Frusemide, Spironolactone)

### 5. **Antidiabetic Drugs**
   - Oral Hypoglycemics (Metformin, Glibenclamide, Glimepiride)
   - DPP-4 Inhibitors (Januvia, Vildagliptin)
   - Insulin (Insulatard, Actrapid, Mixtard)

### 6. **Respiratory Medications**
   - Bronchodilators (Salbutamol, Ventolin)
   - Leukotriene Antagonists (Montair)
   - Mucolytics (Ncutin)
   - Theophylline (Deriphyllin)

### 7. **Neurological & Psychiatric**
   - Antiepileptics (Levetiracetam, Carbamazepine, Valproate)
   - Antidepressants (Escitalopram, Fluoxetine, Sertraline)
   - Anxiolytics (Clonazepam, Alprazolam)
   - Antipsychotics (Risperidone, Olanzapine, Quetiapine)
   - Anti-Dementia (Donepezil, Rivastigmine, Memantine)

### 8. **Anti-TB Drugs**
   - Single agents (Tubutol, Rifampicin, Isoniazid, Pyrazinamide)
   - Combination (AFDCDT)

### 9. **Vitamins & Supplements**
   - Calcium + Vitamin D (Adbon, Calcin)
   - B Complex, Vitamin C, Vitamin D3, Vitamin E
   - Iron, Zinc, Folic Acid
   - Multivitamins

### 10. **Hormones & Endocrine**
   - Thyroid Medications (Levothyroxine, Carbimazole, PTU)
   - Corticosteroids (Prednisolone, Dexamethasone)

### 11. **Antihistamines & Allergy**
   - Cetirizine, Fexofenadine, Loratadine, Desloratadine

### 12. **Antimicrobials (Others)**
   - Antifungals (Fluconazole, Itraconazole, Terbinafine)
   - Antivirals (Acyclovir, Oseltamivir, Remdesivir)
   - Antimalarials (Chloroquine, Artemether + Lumefantrine)
   - Antiparasitics (Albendazole, Mebendazole, Ivermectin)

### 13. **Topical & Ophthalmic Preparations**
   - Eye Drops (Timolol, Latanoprost, Ciprofloxacin)
   - Ear Drops
   - Creams & Ointments (Betnovate, Clotrimazole, Mupirocin)

### 14. **Emergency Drugs**
   - Adrenaline, Atropine, Dopamine, Noradrenaline

### 15. **Others**
   - Laxatives (Dulcolax, Lactulose)
   - Erectile Dysfunction (Sildenafil, Tadalafil)
   - Injectable Anticoagulants (Heparin, Enoxaparin)

## Usage in Application

### Search Functionality
```typescript
import { searchMedicines } from '../data/medicines'

// Search by brand name or generic name
const results = searchMedicines('napa')  // Returns all Napa variants
const results2 = searchMedicines('paracetamol')  // Returns all paracetamol medicines
```

### Getting Medicines by Generic
```typescript
import { getMedicinesByGeneric } from '../data/medicines'

// Get all brands of a generic medicine
const paracetamolBrands = getMedicinesByGeneric('Paracetamol')
```

### Unique Generic Names
```typescript
import { getUniqueGenerics } from '../data/medicines'

// Get list of all unique generic names
const allGenerics = getUniqueGenerics()
```

## Features

✅ **300+ medicines** from Bangladesh market (expandable to 16,600+)
✅ **Brand name** with strength information
✅ **Generic name** for each medicine
✅ **Dosage form** (Tablet, Capsule, Injection, etc.)
✅ **Manufacturer** information
✅ **Smart search** - Search by brand OR generic name
✅ **Real-time filtering** in the UI
✅ **Comprehensive coverage** of most prescribed categories

## Important Notes

### Rate Limiting
- The scraper includes 2-second delays between requests to be respectful to the server
- Full scraping (830 pages) takes approximately 30 minutes
- Do not reduce the delay to avoid overwhelming the server

### Data Quality
- The scraper automatically:
  - Parses medicine names to extract structured data
  - Removes duplicates based on brand + strength
  - Formats data for TypeScript integration
  - Preserves manufacturer information

### Legal & Ethical
- This scraper is for **educational and personal use only**
- MedEx Bangladesh data is publicly accessible
- Please respect their terms of service
- Consider supporting MedEx by using their official API if available

## Troubleshooting

### Error: Module not found
```bash
pip install -r requirements.txt
```

### Error: Connection timeout
- Check your internet connection
- The website might be temporarily unavailable
- Try again later or reduce the number of pages

### Error: No medicines collected
- Website structure might have changed
- Check if medex.com.bd is accessible in your browser
- Report the issue for script updates

## Backup Current Database

Before running the scraper:
```bash
# Backup your current medicine database
cp src/data/medicines.ts src/data/medicines.backup.ts
```

## Updates

The database can be easily extended by:
1. **Running the scraper** to collect all Bangladesh medicines (recommended)
2. **Manual addition** by adding entries to `MEDICINES_DATABASE` array
3. **Periodic updates** by re-running the scraper

---

**Last Updated**: October 27, 2025
**Status**: Scraper Ready ✅
**Database Version**: 1.0 (300+ medicines, expandable to 16,600+)

## Contributing

To add new medicines:
1. Open `src/data/medicines.ts`
2. Add new entries following the existing format:
```typescript
{
  brand: 'Brand Name',
  generic: 'Generic Name',
  strength: '100 mg',  // optional
  dosageForm: 'Tablet', // optional
  manufacturer: 'Company Name' // optional
}
```

## License

Data compiled from publicly available sources for educational and clinical purposes.

---

**Last Updated**: October 24, 2025
**Total Medicines**: 300+
**Data Sources**: Medex.com.bd, Kaggle Bangladesh Medicine Dataset
