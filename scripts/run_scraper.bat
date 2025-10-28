@echo off
echo ========================================
echo Bangladesh Medicine Database Scraper
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/downloads/
    pause
    exit /b 1
)

echo Python found!
echo.

REM Navigate to scripts directory
cd /d "%~dp0"

REM Check if requirements are installed
echo Checking dependencies...
pip show requests >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies...
    pip install -r requirements.txt
) else (
    echo Dependencies already installed!
)

echo.
echo Starting medicine scraper...
echo.

REM Run the scraper
python scrape_medex_medicines.py

echo.
echo ========================================
echo Scraping Complete!
echo ========================================
echo.
pause
