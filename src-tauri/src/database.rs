use rusqlite::{Connection, Result};
use std::path::Path;

pub fn run_migrations(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        r#"
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER,
            gender TEXT,
            phone TEXT,
            address TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS visits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER NOT NULL,
            date TEXT,
            notes TEXT,
            FOREIGN KEY(patient_id) REFERENCES patients(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS prescriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            visit_id INTEGER NOT NULL,
            medicine TEXT,
            generic_name TEXT,
            dosage TEXT,
            instructions TEXT,
            FOREIGN KEY(visit_id) REFERENCES visits(id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(name);
        CREATE INDEX IF NOT EXISTS idx_visits_patient_id ON visits(patient_id);
        CREATE INDEX IF NOT EXISTS idx_prescriptions_visit_id ON prescriptions(visit_id);

        INSERT OR IGNORE INTO users (id, username, password) VALUES (1, 'bijoy', 'admin');
        "#,
    )?;

    // Migration: Add generic_name column if it doesn't exist
    // This is safe to run multiple times
    let _ = conn.execute(
        "ALTER TABLE prescriptions ADD COLUMN generic_name TEXT",
        [],
    );

    Ok(())
}

pub fn initialize_database(db_path: &Path) -> Result<Connection> {
    let conn = Connection::open(db_path)?;
    conn.execute_batch("PRAGMA foreign_keys = ON;")?;
    run_migrations(&conn)?;
    Ok(conn)
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::NamedTempFile;

    #[test]
    fn test_migrations() {
        let temp_file = NamedTempFile::new().unwrap();
        let conn = initialize_database(temp_file.path()).unwrap();
        
        let table_count: i32 = conn
            .query_row(
                "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='patients'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        
        assert_eq!(table_count, 1);
    }
}
