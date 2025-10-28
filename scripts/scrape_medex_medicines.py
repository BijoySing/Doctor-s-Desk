"""
MedEx Bangladesh Medicine Database Scraper
-------------------------------------------
This script scrapes medicine data from medex.com.bd and generates a TypeScript
medicine database file for the Doctors Desk application.

Total Pages: 830 (approximately 16,600+ medicines)
Source: https://medex.com.bd/brands
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from typing import List, Dict

class MedExScraper:
    def __init__(self):
        self.base_url = "https://medex.com.bd/brands"
        self.medicines = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    
    def parse_medicine_name(self, text: str) -> Dict[str, str]:
        """
        Parse medicine text to extract dosage form, brand name, strength, and generic name.
        Example: "Tablet Ace 500 mg Paracetamol Square Pharmaceuticals PLC"
        """
        # Clean up the text
        text = ' '.join(text.split())
        parts = text.split()
        
        if len(parts) < 3:
            return None
        
        dosage_form = parts[0]  # Tablet, Capsule, Syrup, etc.
        
        # Find strength pattern (numbers with mg, ml, IU, mcg, g, %)
        strength_pattern = r'(\d+(?:\.\d+)?)\s*(mg|ml|mcg|IU|%|g|gm)(?:/\d+\s*ml)?'
        strength_match = re.search(strength_pattern, text, re.IGNORECASE)
        
        if strength_match:
            strength = strength_match.group(0)
            # Extract brand name (between dosage form and strength)
            brand_start = len(dosage_form)
            brand_end = strength_match.start()
            brand_name = text[brand_start:brand_end].strip()
            
            # Extract remaining text after strength
            remaining_start = strength_match.end()
            remaining_text = text[remaining_start:].strip()
            
            # Find manufacturer pattern
            manufacturer_patterns = [
                r'(Ltd\.|Limited|PLC|Pharmaceuticals|Corporation|Healthcare|Laboratories|Lab\.|Industries|Pharma|Inc\.).*$',
                r'(ACME|Square|Beximco|Incepta|Renata|Opsonin|ACI|Aristopharma|Healthcare).*$'
            ]
            
            manufacturer = ""
            generic_name = remaining_text
            
            for pattern in manufacturer_patterns:
                manu_match = re.search(pattern, remaining_text, re.IGNORECASE)
                if manu_match:
                    generic_name = remaining_text[:manu_match.start()].strip()
                    manufacturer = manu_match.group(0).strip()
                    break
            
            # Clean generic name
            if not generic_name:
                generic_name = remaining_text
            
        else:
            # No strength found
            brand_name = parts[1] if len(parts) > 1 else ""
            generic_name = ' '.join(parts[2:]) if len(parts) > 2 else ""
            manufacturer = ""
            strength = ""
        
        return {
            'brand': brand_name.strip(),
            'generic': generic_name.strip(),
            'strength': strength.strip(),
            'dosageForm': dosage_form.strip(),
            'manufacturer': manufacturer.strip()
        }
    
    def scrape_page(self, page_number: int) -> List[Dict]:
        """Scrape a single page of medicines."""
        url = f"{self.base_url}?page={page_number}" if page_number > 1 else self.base_url
        
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find all medicine links
            medicine_links = soup.find_all('a', href=re.compile(r'/brands/\d+/'))
            
            page_medicines = []
            for link in medicine_links:
                text = link.get_text(strip=True)
                if text:
                    medicine_data = self.parse_medicine_name(text)
                    if medicine_data and medicine_data['brand']:
                        page_medicines.append(medicine_data)
            
            return page_medicines
        
        except Exception as e:
            print(f"Error scraping page {page_number}: {e}")
            return []
    
    def scrape_all(self, max_pages: int = 830, start_page: int = 1):
        """Scrape all pages of medicines."""
        print(f"Starting to scrape {max_pages} pages from MedEx Bangladesh...")
        print(f"This may take approximately {max_pages * 2 / 60:.1f} minutes.\n")
        
        for page in range(start_page, max_pages + 1):
            print(f"Scraping page {page}/{max_pages}...", end='\r')
            
            page_medicines = self.scrape_page(page)
            self.medicines.extend(page_medicines)
            
            # Progress update every 50 pages
            if page % 50 == 0:
                print(f"\nProgress: {page}/{max_pages} pages | {len(self.medicines)} medicines collected")
            
            # Rate limiting - be respectful to the server
            time.sleep(2)  # 2 seconds between requests
        
        print(f"\n\nScraping complete! Total medicines collected: {len(self.medicines)}")
    
    def save_to_json(self, filename: str = "medicines_raw.json"):
        """Save medicines to JSON file."""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.medicines, f, indent=2, ensure_ascii=False)
        print(f"Saved to {filename}")
    
    def generate_typescript_file(self, filename: str = "medicines_database.ts"):
        """Generate TypeScript file for the application."""
        
        # Remove duplicates based on brand + strength
        unique_medicines = []
        seen = set()
        
        for med in self.medicines:
            key = f"{med['brand']}_{med['strength']}".lower()
            if key not in seen:
                seen.add(key)
                unique_medicines.append(med)
        
        print(f"Unique medicines after deduplication: {len(unique_medicines)}")
        
        # Generate TypeScript content
        ts_content = '''/**
 * Bangladesh Medicine Database
 * Source: MedEx Bangladesh (medex.com.bd)
 * Generated: ''' + time.strftime("%Y-%m-%d %H:%M:%S") + '''
 * Total Medicines: ''' + str(len(unique_medicines)) + '''
 */

export interface Medicine {
  brand: string;
  generic: string;
  strength: string;
  dosageForm: string;
  manufacturer: string;
}

export const MEDICINES_DATABASE: Medicine[] = [
'''
        
        # Add medicines
        for med in unique_medicines:
            ts_content += f'''  {{
    brand: "{med['brand'].replace('"', '\\"')}",
    generic: "{med['generic'].replace('"', '\\"')}",
    strength: "{med['strength'].replace('"', '\\"')}",
    dosageForm: "{med['dosageForm'].replace('"', '\\"')}",
    manufacturer: "{med['manufacturer'].replace('"', '\\"')}"
  }},
'''
        
        ts_content += '''];

// Helper function to search medicines
export function searchMedicines(query: string, limit: number = 100): Medicine[] {
  if (!query || query.trim() === '') {
    return MEDICINES_DATABASE.slice(0, limit);
  }
  
  const searchTerm = query.toLowerCase();
  const results = MEDICINES_DATABASE.filter(med => 
    med.brand.toLowerCase().includes(searchTerm) ||
    med.generic.toLowerCase().includes(searchTerm)
  );
  
  return results.slice(0, limit);
}

// Get unique generic names
export function getUniqueGenerics(): string[] {
  const generics = new Set<string>();
  MEDICINES_DATABASE.forEach(med => {
    if (med.generic) generics.add(med.generic);
  });
  return Array.from(generics).sort();
}

// Get medicines by generic name
export function getMedicinesByGeneric(generic: string): Medicine[] {
  return MEDICINES_DATABASE.filter(med => 
    med.generic.toLowerCase() === generic.toLowerCase()
  );
}
'''
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(ts_content)
        
        print(f"Generated TypeScript file: {filename}")


def main():
    print("=" * 60)
    print("MedEx Bangladesh Medicine Database Scraper")
    print("=" * 60)
    print()
    
    scraper = MedExScraper()
    
    # Options for user
    print("Options:")
    print("1. Quick test (first 10 pages) - ~200 medicines")
    print("2. Medium collection (first 100 pages) - ~2000 medicines")
    print("3. Full database (all 830 pages) - ~16,600+ medicines [RECOMMENDED]")
    print()
    
    choice = input("Enter your choice (1/2/3) [default: 2]: ").strip() or "2"
    
    page_ranges = {
        "1": 10,
        "2": 100,
        "3": 830
    }
    
    max_pages = page_ranges.get(choice, 100)
    
    print(f"\nYou selected: {max_pages} pages")
    print("Starting in 3 seconds...")
    time.sleep(3)
    
    # Scrape medicines
    scraper.scrape_all(max_pages=max_pages)
    
    # Save outputs
    scraper.save_to_json("medicines_raw.json")
    scraper.generate_typescript_file("../src/data/medicines.ts")
    
    print("\n" + "=" * 60)
    print("SCRAPING COMPLETE!")
    print("=" * 60)
    print(f"\nFiles generated:")
    print(f"  1. medicines_raw.json - Raw JSON data")
    print(f"  2. ../src/data/medicines.ts - TypeScript database file")
    print(f"\nNext steps:")
    print(f"  1. Review the generated medicines.ts file")
    print(f"  2. Backup your current src/data/medicines.ts if needed")
    print(f"  3. Replace it with the new file")
    print(f"  4. Restart your development server")


if __name__ == "__main__":
    main()
