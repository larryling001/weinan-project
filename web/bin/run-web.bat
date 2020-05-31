@echo off
echo.
echo [info] Run the web project using the vue
echo.

%~d0
cd %~dp0

cd ..
npm run dev

pause