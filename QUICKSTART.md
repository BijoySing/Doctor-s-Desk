# 🚀 Quick Start Guide - SmartClinic

## Run the App NOW!

### Web Development Mode (Fast)
```bash
npm run dev
```
Then open http://localhost:5173/ in your browser.

**Login**: username `bijoy` password `admin`

### Desktop Mode (Full Features)
```bash
npm run tauri:dev
```

This builds the Rust backend and launches the desktop app.

## First Time Setup

If you haven't installed dependencies yet:

```bash
npm install
```

## Common Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start web dev server (browser) |
| `npm run tauri:dev` | Start desktop app with hot reload |
| `npm run build` | Build optimized frontend |
| `npm run tauri:build` | Build desktop installer/exe |

## Quick Feature Test

1. **Login** with `bijoy` / `admin`
2. Click **"Patients"** → **"+ New Patient"**
3. Add a test patient
4. Click the patient name
5. Click **"+ Add Visit"**
6. Click **"Print Prescription"**
7. Click **"Save as PDF"**

## Current Status

✅ **READY TO USE!**

- Frontend running at http://localhost:5173/
- Prescription format matches your medical template
- Full CRUD for patients
- Visit tracking
- PDF export working
- SQLite database integrated

## What's Working

| Feature | Status |
|---------|--------|
| Login (offline) | ✅ Working |
| Patient CRUD | ✅ Working |
| Visit History | ✅ Working |
| Prescription PDF | ✅ Working |
| Dashboard Stats | ✅ Working |
| SQLite DB | ✅ Working |
| Search Patients | ✅ Working |

## Next Steps

The app is fully functional! You can:
- Test in web mode with `npm run dev`
- Build desktop app with `npm run tauri:build`
- Customize doctor info in `src/pages/PrescriptionPrint.tsx`
- Add more patients and test the workflow

## Need Help?

Check `README.md` for detailed documentation.
