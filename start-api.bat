@echo off
echo ========================================
echo    Finance Controller API
echo ========================================
echo.
echo Iniciando o servidor backend...
echo.

cd backend

echo Verificando dependencias...
if not exist node_modules (
    echo Instalando dependencias...
    npm install
)

echo.
echo Iniciando servidor na porta 3001...
echo.
echo URLs disponiveis:
echo - Backend API: http://localhost:3001
echo - Frontend: http://localhost:3000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

npm run dev

pause
