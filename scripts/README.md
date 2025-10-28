# Medicine Database Scraper Scripts

## Quick Start (Windows)

### Double-click to run:
```
run_scraper.bat
```

This will:
1. Check if Python is installed
2. Install required dependencies automatically
3. Run the medicine scraper
4. Generate updated database files

## Manual Run (All Platforms)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run Scraper
```bash
python scrape_medex_medicines.py
```

## Files

- **scrape_medex_medicines.py** - Main scraper script
- **requirements.txt** - Python dependencies
- **run_scraper.bat** - Windows automation script
- **medicines_raw.json** - Generated: Raw JSON backup
- **../src/data/medicines.ts** - Generated: TypeScript database

## Collection Options

When you run the scraper, you'll see:

```
Options:
1. Quick test (first 10 pages) - ~200 medicines
2. Medium collection (first 100 pages) - ~2000 medicines
3. Full database (all 830 pages) - ~16,600+ medicines [RECOMMENDED]

Enter your choice (1/2/3) [default: 2]:
```

### Recommendation

- **For testing**: Choose Option 1 (1 minute)
- **For development**: Choose Option 2 (5 minutes)
- **For production**: Choose Option 3 (30 minutes)

## Output

After completion, you'll have:

1. **medicines_raw.json** (in scripts folder)
   - Raw JSON format
   - Useful for backup and data analysis

2. **src/data/medicines.ts** (in src/data folder)
   - Ready-to-use TypeScript file
   - Automatically integrated with your application
   - Includes helper functions

## Verification

Check if the scraper worked:

```bash
# Check file size
ls -lh ../src/data/medicines.ts

# Count medicines
grep -c "brand:" ../src/data/medicines.ts
```

## Troubleshooting

### Python not found
Install Python 3.7+ from https://www.python.org/downloads/

### Dependencies installation failed
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Connection errors
- Check internet connection
- Verify medex.com.bd is accessible
- Try reducing pages (Option 1 or 2)

### No output files generated
- Check Python console for errors
- Ensure write permissions in directories
- Try running as administrator (Windows)

## Example Output

```
Starting to scrape 830 pages from MedEx Bangladesh...
This may take approximately 27.7 minutes.

Scraping page 1/830...
Scraping page 50/830...
Progress: 50/830 pages | 987 medicines collected
...
Progress: 830/830 pages | 16543 medicines collected

Scraping complete! Total medicines collected: 16543
Unique medicines after deduplication: 15876
Generated TypeScript file: ../src/data/medicines.ts

SCRAPING COMPLETE!
```

## Next Steps

After scraping:

1. Review the generated `medicines.ts` file
2. Backup your current database if needed
3. Restart your development server
4. Test medicine search functionality
5. Verify data quality with common medicines

## Support

For issues:
- Check MEDICINE_DATABASE.md in project root
- Review scraper code comments
- Test with smaller page ranges first
- Verify MedEx Bangladesh website structure hasn't changed
