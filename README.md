 
---

# 🏥 Doctors Desk

**Offline Clinic Management System** for doctors.
Works on **Windows, macOS, and Linux** — no internet required.

---

## ✨ Features

* 🔐 **Offline Login**
  Secure local login for doctors.
  Default user: `bijoy / admin`.

* 💊 **Medicine Database**
  34,000+ Bangladesh medicines included.
  Search by brand or generic name.

* 👥 **Patient Management**
  Add, edit, or delete patients.
  Store name, age, gender, phone, and address.

* 📋 **Visit Records**
  Record patient visits with notes.
  Track complaints, diagnosis, and treatment.

* 💊 **Prescriptions**
  Add medicines with dosage and instructions.
  Link prescriptions to each visit and export to PDF.

* 📄 **PDF Printing**
  Print or save prescriptions professionally.
  Include patient info, notes, and treatment.

* 📊 **Dashboard**
  View total patients and visits.
  See top prescribed medicines with real-time stats.

* 💾 **Offline Storage**
  Data stored locally in SQLite.
  Fully offline and persistent across sessions.

---

## ⚙️ Tech Stack

* **Frontend:** React + TypeScript + Tailwind
* **Backend:** Tauri (Rust) + SQLite
* **PDF & Charts:** jsPDF + html2canvas + Recharts

---

## 🚀 How to Run

1. Install **Node.js** and **Rust**.
2. Install dependencies and run the app:

```bash
npm install
npm run tauri:dev
```

3. To build for production:

```bash
npm run tauri:build
```

---

## 🧭 Usage

1. Login → `bijoy / admin`
2. Add patient → name, age, phone, etc.
3. Add visit → notes and complaints
4. Add medicines → dosage and instructions
5. Print prescription → PDF or direct print

---

## 🔧 Customize

* Change doctor info → `src/pages/PrescriptionPrint.tsx`
* Database location:

  * Windows → `%APPDATA%/Doctors Desk/Doctors Desk.db`

---

## 🌱 Future Plans

* Multi-user roles
* Appointment scheduling
* Billing system
* Dark mode
* Backup & restore

---

**Made for doctors — simple, fast, and fully offline.**

---

  
