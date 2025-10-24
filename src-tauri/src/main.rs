#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;

use rusqlite::{Connection, params};
use std::sync::Mutex;
use tauri::{Manager, State};

pub struct AppState {
    pub db: Mutex<Connection>,
}

#[tauri::command]
fn list_patients(state: State<AppState>) -> Result<serde_json::Value, String> {
    let db = state.db.lock().unwrap();
    let mut stmt = db.prepare("SELECT id, name, age, gender, phone, address FROM patients")
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |r| {
            Ok(serde_json::json!({
                "id": r.get::<_, i64>(0)?,
                "name": r.get::<_, String>(1)?,
                "age": r.get::<_, Option<i64>>(2)?.unwrap_or(0),
                "gender": r.get::<_, Option<String>>(3)?.unwrap_or_default(),
                "phone": r.get::<_, Option<String>>(4)?.unwrap_or_default(),
                "address": r.get::<_, Option<String>>(5)?.unwrap_or_default(),
            }))
        })
        .map_err(|e| e.to_string())?;
    let mut vec = vec![];
    for r in rows {
        vec.push(r.map_err(|e| e.to_string())?);
    }
    Ok(serde_json::Value::Array(vec))
}

#[tauri::command]
fn add_patient(state: State<AppState>, name: String, age: i64, gender: String, phone: String, address: String) -> Result<i64, String> {
    let db = state.db.lock().unwrap();
    db.execute(
        "INSERT INTO patients (name, age, gender, phone, address) VALUES (?1, ?2, ?3, ?4, ?5)",
        params![name, age, gender, phone, address],
    ).map_err(|e| e.to_string())?;
    Ok(db.last_insert_rowid())
}

#[tauri::command]
fn update_patient(state: State<AppState>, id: i64, name: String, age: i64, gender: String, phone: String, address: String) -> Result<String, String> {
    let db = state.db.lock().unwrap();
    db.execute(
        "UPDATE patients SET name=?1, age=?2, gender=?3, phone=?4, address=?5 WHERE id=?6",
        params![name, age, gender, phone, address, id],
    ).map_err(|e| e.to_string())?;
    Ok("ok".into())
}

#[tauri::command]
fn delete_patient(state: State<AppState>, id: i64) -> Result<String, String> {
    let db = state.db.lock().unwrap();
    db.execute("DELETE FROM patients WHERE id=?1", params![id])
        .map_err(|e| e.to_string())?;
    Ok("ok".into())
}

#[tauri::command]
fn get_patient(state: State<AppState>, id: i64) -> Result<serde_json::Value, String> {
    let db = state.db.lock().unwrap();
    let mut stmt = db.prepare("SELECT id, name, age, gender, phone, address FROM patients WHERE id=?1")
        .map_err(|e| e.to_string())?;
    let patient = stmt.query_row([id], |r| {
        Ok(serde_json::json!({
            "id": r.get::<_, i64>(0)?,
            "name": r.get::<_, String>(1)?,
            "age": r.get::<_, Option<i64>>(2)?.unwrap_or(0),
            "gender": r.get::<_, Option<String>>(3)?.unwrap_or_default(),
            "phone": r.get::<_, Option<String>>(4)?.unwrap_or_default(),
            "address": r.get::<_, Option<String>>(5)?.unwrap_or_default(),
        }))
    }).map_err(|e| e.to_string())?;
    Ok(patient)
}

#[tauri::command]
fn verify_login(state: State<AppState>, username: String, password: String) -> Result<bool, String> {
    let db = state.db.lock().unwrap();
    let mut stmt = db.prepare("SELECT COUNT(*) FROM users WHERE username=?1 AND password=?2")
        .map_err(|e| e.to_string())?;
    let count: i64 = stmt.query_row(params![username, password], |r| r.get(0))
        .map_err(|e| e.to_string())?;
    Ok(count > 0)
}

#[tauri::command]
fn add_visit(state: State<AppState>, patient_id: i64, date: String, notes: String) -> Result<i64, String> {
    let db = state.db.lock().unwrap();
    db.execute(
        "INSERT INTO visits (patient_id, date, notes) VALUES (?1, ?2, ?3)",
        params![patient_id, date, notes],
    ).map_err(|e| e.to_string())?;
    Ok(db.last_insert_rowid())
}

#[tauri::command]
fn get_patient_visits(state: State<AppState>, patient_id: i64) -> Result<serde_json::Value, String> {
    let db = state.db.lock().unwrap();
    let mut stmt = db.prepare("SELECT id, patient_id, date, notes FROM visits WHERE patient_id=?1 ORDER BY date DESC")
        .map_err(|e| e.to_string())?;
    let rows = stmt.query_map([patient_id], |r| {
        Ok(serde_json::json!({
            "id": r.get::<_, i64>(0)?,
            "patient_id": r.get::<_, i64>(1)?,
            "date": r.get::<_, String>(2)?,
            "notes": r.get::<_, Option<String>>(3)?.unwrap_or_default(),
        }))
    }).map_err(|e| e.to_string())?;
    let mut vec = vec![];
    for r in rows {
        vec.push(r.map_err(|e| e.to_string())?);
    }
    Ok(serde_json::Value::Array(vec))
}

#[tauri::command]
fn add_prescription(state: State<AppState>, visit_id: i64, medicine: String, generic_name: String, dosage: String, instructions: String) -> Result<i64, String> {
    let db = state.db.lock().unwrap();
    db.execute(
        "INSERT INTO prescriptions (visit_id, medicine, generic_name, dosage, instructions) VALUES (?1, ?2, ?3, ?4, ?5)",
        params![visit_id, medicine, generic_name, dosage, instructions],
    ).map_err(|e| e.to_string())?;
    Ok(db.last_insert_rowid())
}

#[tauri::command]
fn get_visit_prescriptions(state: State<AppState>, visit_id: i64) -> Result<serde_json::Value, String> {
    let db = state.db.lock().unwrap();
    let mut stmt = db.prepare("SELECT id, visit_id, medicine, generic_name, dosage, instructions FROM prescriptions WHERE visit_id=?1")
        .map_err(|e| e.to_string())?;
    let rows = stmt.query_map([visit_id], |r| {
        Ok(serde_json::json!({
            "id": r.get::<_, i64>(0)?,
            "visit_id": r.get::<_, i64>(1)?,
            "medicine": r.get::<_, String>(2)?,
            "generic_name": r.get::<_, Option<String>>(3)?.unwrap_or_default(),
            "dosage": r.get::<_, String>(4)?,
            "instructions": r.get::<_, String>(5)?,
        }))
    }).map_err(|e| e.to_string())?;
    let mut vec = vec![];
    for r in rows {
        vec.push(r.map_err(|e| e.to_string())?);
    }
    Ok(serde_json::Value::Array(vec))
}

#[tauri::command]
fn get_statistics(state: State<AppState>) -> Result<serde_json::Value, String> {
    let db = state.db.lock().unwrap();
    
    let patient_count: i64 = db.query_row("SELECT COUNT(*) FROM patients", [], |r| r.get(0))
        .map_err(|e| e.to_string())?;
    
    let visit_count: i64 = db.query_row("SELECT COUNT(*) FROM visits", [], |r| r.get(0))
        .map_err(|e| e.to_string())?;
    
    let mut stmt = db.prepare("SELECT medicine, COUNT(*) as count FROM prescriptions GROUP BY medicine ORDER BY count DESC LIMIT 10")
        .map_err(|e| e.to_string())?;
    let medicines = stmt.query_map([], |r| {
        Ok(serde_json::json!({
            "name": r.get::<_, String>(0)?,
            "value": r.get::<_, i64>(1)?,
        }))
    }).map_err(|e| e.to_string())?;
    let mut med_vec = vec![];
    for m in medicines {
        med_vec.push(m.map_err(|e| e.to_string())?);
    }
    
    Ok(serde_json::json!({
        "patient_count": patient_count,
        "visit_count": visit_count,
        "top_medicines": med_vec,
    }))
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let app_data_dir = app
                .path_resolver()
                .app_data_dir()
                .expect("Failed to get app data directory");

            std::fs::create_dir_all(&app_data_dir).expect("Failed to create app data directory");

            let db_path = app_data_dir.join("smartclinic.db");
            let conn = database::initialize_database(&db_path)
                .expect("Failed to initialize database");

            app.manage(AppState {
                db: Mutex::new(conn),
            });

            println!("DB initialized at {:?}", db_path);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            list_patients, 
            add_patient, 
            update_patient, 
            delete_patient, 
            get_patient,
            verify_login,
            add_visit,
            get_patient_visits,
            add_prescription,
            get_visit_prescriptions,
            get_statistics
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
