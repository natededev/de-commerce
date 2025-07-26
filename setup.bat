@echo off
echo 🚀 Setting up De-Commerce Project...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
@echo off
setlocal EnableDelayedExpansion

REM === DE-Commerce Setup Script (Windows) ===
REM Installs dependencies, checks/creates .env files, prints next steps

echo.
echo ===============================
echo   DE-Commerce Setup (Windows)
echo ===============================
echo.

REM --- Install root, backend, and frontend dependencies ---
echo Installing dependencies (root, backend, frontend)...
if exist package.json npm install
cd backend
if exist package.json npm install
cd ..\frontend
if exist package.json npm install
cd ..
echo.

REM --- Check/create backend/.env ---
if not exist backend\.env (
    echo Creating backend\.env from .env.example...
    if exist backend\.env.example (
        copy backend\.env.example backend\.env >nul
        echo [!] Please edit backend\.env with your Supabase/Stripe keys.
    ) else (
        echo [!] backend\.env.example not found. Please create backend\.env manually.
    )
) else (
    echo backend\.env already exists.
)
echo.

REM --- Check/create frontend/.env ---
if not exist frontend\.env (
    echo Creating frontend\.env from .env.example...
    if exist frontend\.env.example (
        copy frontend\.env.example frontend\.env >nul
        echo [!] Please edit frontend\.env if needed.
    ) else (
        echo [!] frontend\.env.example not found. Please create frontend\.env manually.
    )
) else (
    echo frontend\.env already exists.
)
echo.

REM --- Print next steps ---
echo Setup complete!
echo.
echo Next steps:
echo   1. Start backend:   cd backend && npm run dev
echo   2. Start frontend:  cd frontend && npm run dev
echo   3. (Optional) Seed demo data: see SEEDING_GUIDE.md
echo.
echo For more info, see README.md and DEVELOPMENT.md
echo.
REM --- Extra: Print helpful troubleshooting tips ---
echo If you encounter issues:
echo   - Check .env files for correct values
echo   - See DEVELOPMENT.md for troubleshooting common errors
echo   - Use npm run lint, type-check, and test for code quality
echo.
exit /b 0
