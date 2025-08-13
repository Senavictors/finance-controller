Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Finance Controller API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Iniciando o servidor backend..." -ForegroundColor Yellow
Write-Host ""

Set-Location backend

Write-Host "Verificando dependencias..." -ForegroundColor Green
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "Iniciando servidor na porta 3001..." -ForegroundColor Green
Write-Host ""
Write-Host "URLs disponiveis:" -ForegroundColor Cyan
Write-Host "- Backend API: http://localhost:3001" -ForegroundColor White
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""

npm run dev

Read-Host "Pressione Enter para sair"
