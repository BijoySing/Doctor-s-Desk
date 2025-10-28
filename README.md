# 🏥 SmartClinic - Offline Clinic Management System

A cross-platform desktop application for doctors to manage their clinics entirely offline. Built with **Tauri + React + TypeScript + SQLite**.

## ✨ Features

### 🔐 Authentication
- **Offline login** with local credentials
- Default user: `bijoy` / `admin`
- Credentials stored securely in SQLite

### � Medicine Database
- **300+ Bangladesh medicines** (expandable to 16,600+)
- Search by brand name or generic name
- Includes: strength, dosage form, manufacturer
- Offline medicine database from MedEx Bangladesh
- **Auto-scraper included** to collect all BD medicines
- See [MEDICINE_DATABASE.md](MEDICINE_DATABASE.md) for details

### �👥 Patient Management
- Add, edit, and delete patients
- Search patients by name
- Store: name, age, gender, phone, address
- View complete patient profiles

### 📋 Visit & Prescription Management
- Record patient visits with notes
- Add multiple prescriptions per visit
- Track medicine, dosage, and instructions
- Complete visit history per patient

### 📄 Prescription Printing
- Professional prescription format matching medical standards
- Includes: patient info, chief complaint, history, examination, investigation, diagnosis, treatment plan (Rx), advice, and follow-up
- Export to PDF using jsPDF + html2canvas
- Print directly from the app

### 📊 Dashboard & Statistics
- Total patients count
- Total visits count
- Top prescribed medicines chart (Recharts pie chart)
- Real-time statistics from local database

### 💾 Offline Database
- **100% offline** - no internet required
- Local SQLite database (`smartclinic.db`)
- Automatic database initialization
- Data persists in app data directory

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS
- **Desktop Runtime**: Tauri v2 (Rust)
- **Database**: SQLite (rusqlite)
- **Charts**: Recharts
- **PDF Generation**: jsPDF + html2canvas
- **Routing**: React Router v6

## 📋 Prerequisites

### For Development

1. **Node.js** 18+ and npm
   ```bash
   node --version  # Should be 18 or higher
   ```

2. **Rust** toolchain (for Tauri)
   ```bash
   # Install Rust
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   # Or on Windows: https://rustup.rs/
   
   # Verify installation
   rustc --version
   cargo --version
   ```

3. **Tauri Prerequisites**
   - **Windows**: 
     - Microsoft Visual C++ Build Tools
     - WebView2 (usually pre-installed on Windows 10/11)
   - **macOS**: 
     - Xcode Command Line Tools: `xcode-select --install`
   - **Linux**: 
     - Various dependencies - see [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd "E:/Web development code/Personal_project/DigiDoctor"
npm install
```

### 2. Development Mode

#### Web Development (Browser - faster iteration)
```bash
npm run dev
```
Opens at `http://localhost:5173/`

**Note**: Tauri APIs won't work in browser mode. App uses fallback sample data.

#### Desktop Development (Tauri - full features)
```bash
npm run tauri:dev
```
Builds Rust backend and launches native desktop app.

### 3. Build for Production

```bash
# Build frontend
npm run build

# Build desktop app
npm run tauri:build
```

Output locations:
- **Windows**: `src-tauri/target/release/SmartClinic.exe`
- **Windows Installer**: `src-tauri/target/release/bundle/msi/`
- **macOS**: `src-tauri/target/release/bundle/macos/`
- **macOS DMG**: `src-tauri/target/release/bundle/dmg/`

## 📖 Usage Guide

### First Launch

1. **Login**
   - Username: `bijoy`
   - Password: `admin`

2. **Add Patients**
   - Click "Patients" in navigation
   - Click "+ New Patient"
   - Fill in patient details
   - Click "Save"

3. **Record Visits**
   - Click on a patient name
   - Click "+ Add Visit"
   - Enter visit notes/complaints
   - Click "Save Visit"

4. **Create Prescriptions**
   - From patient detail page, click "Print Prescription" on any visit
   - Customize prescription details (currently uses demo data)
   - Click "Save as PDF" or "Print"

5. **View Statistics**
   - Go to "Dashboard"
   - See total patients, visits, and top medicines

## 📁 Project Structure

```
SmartClinic/
├── src/                      # React frontend
│   ├── api/
│   │   └── tauri.ts         # Tauri command wrappers
│   ├── components/
│   │   └── PatientForm.tsx  # Patient add/edit modal
│   ├── pages/
│   │   ├── Login.tsx        # Login page
│   │   ├── Dashboard.tsx    # Statistics dashboard
│   │   ├── Patients.tsx     # Patient list with CRUD
│   │   ├── PatientDetail.tsx # Visit history
│   │   └── PrescriptionPrint.tsx # Prescription PDF
│   ├── App.tsx              # Main app with routes
│   ├── main.tsx             # React entry point
│   └── styles.css           # Tailwind CSS
├── src-tauri/               # Rust backend
│   ├── src/
│   │   └── main.rs          # Tauri commands & SQLite logic
│   ├── Cargo.toml           # Rust dependencies
│   └── tauri.conf.json      # Tauri configuration
├── package.json             # Node dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.cjs      # Tailwind CSS config
└── vite.config.ts           # Vite bundler config
```

## 🗄️ Database Schema

The SQLite database (`smartclinic.db`) includes:

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

### Patients Table
```sql
CREATE TABLE patients (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    phone TEXT,
    address TEXT
);
```

### Visits Table
```sql
CREATE TABLE visits (
    id INTEGER PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    date TEXT,
    notes TEXT,
    FOREIGN KEY(patient_id) REFERENCES patients(id)
);
```

### Prescriptions Table
```sql
CREATE TABLE prescriptions (
    id INTEGER PRIMARY KEY,
    visit_id INTEGER NOT NULL,
    medicine TEXT,
    dosage TEXT,
    instructions TEXT,
    FOREIGN KEY(visit_id) REFERENCES visits(id)
);
```

## 🔧 Available Tauri Commands

| Command | Description |
|---------|-------------|
| `list_patients` | Get all patients |
| `add_patient` | Create new patient |
| `update_patient` | Update patient info |
| `delete_patient` | Delete patient |
| `get_patient` | Get single patient by ID |
| `verify_login` | Authenticate user |
| `add_visit` | Record new visit |
| `get_patient_visits` | Get all visits for a patient |
| `add_prescription` | Add prescription to visit |
| `get_visit_prescriptions` | Get prescriptions for visit |
| `get_statistics` | Get dashboard stats |

## 🎨 Customization

### Change Doctor Information
Edit `src/pages/PrescriptionPrint.tsx` line ~30:
```typescript
doctor: {
  name: 'DR. YOUR NAME',
  qualification: 'MBBS, MD(Specialty)',
  designation: 'Your designation here',
  // ...
}
```

### Modify Prescription Layout
The prescription format is in `src/pages/PrescriptionPrint.tsx`. Adjust the JSX structure and Tailwind classes to match your clinic's branding.

### Database Location
The database is stored in the OS-specific app data directory:
- **Windows**: `%APPDATA%/SmartClinic/smartclinic.db`
- **macOS**: `~/Library/Application Support/SmartClinic/smartclinic.db`
- **Linux**: `~/.local/share/SmartClinic/smartclinic.db`

## 🐛 Troubleshooting

### "Could not find module 'react'" error
```bash
npm install --save-dev @types/react @types/react-dom
```

### Tauri build fails
1. Ensure Rust is installed: `rustc --version`
2. Update Rust: `rustup update`
3. Check [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) for your OS

### Database not initializing
Check console logs. The DB path is printed on startup. Ensure the app has write permissions to the app data directory.

## 📝 Future Enhancements

- [ ] Multi-user support with role-based access
- [ ] Patient photos and document attachments
- [ ] Appointment scheduling
- [ ] Billing and invoice generation
- [ ] Data backup and restore
- [ ] Print customization UI
- [ ] Dark mode
- [ ] Multi-language support

## 📄 License

This project is for educational and personal use.

## 👨‍💻 Developer

Built for offline clinic management needs.

**Happy Coding! 🚀**

# Doctor-s-Desk
# Doctor-s-Desk
