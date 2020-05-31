@echo off
echo.
echo [info] build Web peoject，create node_modules。
echo.

%~d0
cd %~dp0

cd ..
npm install --registry=https://registry.npm.taobao.org

pause