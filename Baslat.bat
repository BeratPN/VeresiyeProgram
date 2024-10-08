@echo off

REM Sunucuyu başlat
cd ./backend
start cmd /k "npm run startServer"

REM Sunucuya bağlanana kadar bekle
:waitForServer
timeout /t 2 > nul
curl -s http://localhost:3000 > nul
if %errorlevel% neq 0 goto waitForServer

REM ./frontend klasörüne git (bulunduğu yerden)
cd ../frontend

REM AnaSayfa.html dosyasını aç
start  AnaSayfa.html
