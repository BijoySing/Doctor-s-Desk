# 🚀 Quick Start: Collect All Bangladesh Medicines

## What I Created For You

I've built a complete **web scraper** to collect all Bangladesh medicine data from **MedEx Bangladesh** - the largest online medicine database in Bangladesh with **16,600+ medicines**!

## 📊 Database Statistics

- **Current**: 300+ medicines
- **After Scraping**: 16,600+ medicines (all Bangladesh medicines!)
- **Source**: MedEx Bangladesh (https://medex.com.bd/brands)
- **Data**: Brand, Generic, Strength, Dosage Form, Manufacturer

## 🎯 Super Easy - 2 Ways to Run

### Method 1: Windows Double-Click (Easiest!)

1. **Navigate to**: `scripts` folder
2. **Double-click**: `run_scraper.bat`
3. **Choose**: Option 3 (Full database)
4. **Wait**: ~30 minutes
5. **Done!** ✅

### Method 2: Command Line (All Platforms)

```bash
# 1. Go to scripts folder
cd scripts

# 2. Install dependencies (first time only)
pip install -r requirements.txt

# 3. Run scraper
python scrape_medex_medicines.py

# 4. Choose option 3 when prompted (full database)
```

## 📦 What You'll Get

After running the scraper:

### 1. medicines_raw.json
- Raw backup in JSON format
- Located in `scripts/` folder
- ~16,600 medicine entries

### 2. src/data/medicines.ts (AUTO-UPDATED!)
- Ready-to-use TypeScript file
- Automatically replaces your current 300+ database
- Includes all helper functions
- **No manual work needed!**

## ⏱️ Time Required

| Option | Pages | Medicines | Time |
|--------|-------|-----------|------|
| Quick Test | 10 | ~200 | 1 min |
| Medium | 100 | ~2,000 | 5 min |
| **Full** | **830** | **~16,600** | **30 min** |

## 📋 Example Medicine Data

The scraper collects structured data like:

```typescript
{
  brand: "Napa",
  generic: "Paracetamol",
  strength: "500 mg",
  dosageForm: "Tablet",
  manufacturer: "Beximco Pharmaceuticals Ltd."
}
```

## ✅ After Scraping

1. **Backup created**: Your old 300+ database is preserved
2. **New file ready**: `src/data/medicines.ts` with 16,600+ medicines
3. **Restart app**: Just restart your development server
4. **Test search**: Try searching "Napa", "Seclo", etc.

## 🔍 What The Scraper Does

1. ✅ Visits all 830 pages of MedEx Bangladesh
2. ✅ Extracts medicine information (brand, generic, strength, form, manufacturer)
3. ✅ Removes duplicate entries
4. ✅ Formats data for TypeScript
5. ✅ Generates ready-to-use file
6. ✅ Includes search helper functions

## 🛡️ Safety Features

- **Rate limiting**: 2-second delay between requests (respects server)
- **Error handling**: Continues even if individual pages fail
- **Progress tracking**: Shows live progress every 50 pages
- **Backup**: Keeps your original database safe

## 📱 Visual Progress

When running, you'll see:

```
Starting to scrape 830 pages from MedEx Bangladesh...
This may take approximately 27.7 minutes.

Scraping page 1/830...
Scraping page 50/830...
Progress: 50/830 pages | 987 medicines collected

Progress: 100/830 pages | 1,954 medicines collected
...
Progress: 830/830 pages | 16,543 medicines collected

Scraping complete! Total medicines collected: 16,543
Unique medicines after deduplication: 15,876
Generated TypeScript file: ../src/data/medicines.ts

SCRAPING COMPLETE!
```

## 🎓 Technical Details

### Parser Intelligence
The scraper intelligently parses medicine names like:
- "Tablet Napa 500 mg Paracetamol Beximco Pharmaceuticals"
- "Capsule Seclo 20 mg Omeprazole Square Pharmaceuticals PLC"
- "Injection Monocef 1 g Ceftriaxone ACME Laboratories"

And extracts:
- Dosage Form → "Tablet", "Capsule", "Injection"
- Brand → "Napa", "Seclo", "Monocef"  
- Strength → "500 mg", "20 mg", "1 g"
- Generic → "Paracetamol", "Omeprazole", "Ceftriaxone"
- Manufacturer → Full company name

## 🚨 Important Notes

1. **First time?** Start with Option 1 or 2 to test (1-5 minutes)
2. **Internet required**: Only during scraping (after that, 100% offline)
3. **Legal**: For personal/educational use only
4. **Respectful**: Built-in delays to not overwhelm server
5. **Backup**: Script automatically backs up your current database

## 🆘 Troubleshooting

### "Python not found"
→ Install Python 3.7+ from https://www.python.org/downloads/

### "Module not found"
```bash
pip install -r requirements.txt
```

### "Connection timeout"
→ Check internet, try smaller option first (Option 1)

### "No medicines collected"
→ Website might have changed, check if medex.com.bd is accessible

## 📚 Documentation

- **Full Guide**: [MEDICINE_DATABASE.md](../MEDICINE_DATABASE.md)
- **Script Details**: [scripts/README.md](README.md)
- **Main README**: [README.md](../README.md)

## 🎉 Ready?

Let's collect all Bangladesh medicines!

```bash
cd scripts
python scrape_medex_medicines.py
# Choose option 3
# Wait 30 minutes ☕
# Enjoy 16,600+ medicines! 🎊
```

---

**Created**: October 27, 2025  
**Status**: Ready to Use ✅  
**Source**: MedEx Bangladesh (medex.com.bd)  
**Total Time**: ~30 minutes for complete database
