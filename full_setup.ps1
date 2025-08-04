# Script complet de configuration PostgreSQL + Backend
Write-Host @"
╔═══════════════════════════════════════════════╗
║   🚀 Configuration Complète PostgreSQL + API  ║
╚═══════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

# Se positionner dans le backend
Set-Location "C:\PROJETS-DEVELOPPEMENT\NOUVEAU_PROJET_ANALYSE-DE-DONNEES\projet-NewADD\backend"

# Étape 1: Créer/activer l'environnement virtuel
Write-Host "`n📌 Étape 1: Configuration Python..." -ForegroundColor Yellow
if (!(Test-Path "venv")) {
    Write-Host "Création de l'environnement virtuel..." -ForegroundColor Yellow
    python -m venv venv
}
& .\venv\Scripts\Activate.ps1

# Étape 2: Installer les dépendances
Write-Host "`n📌 Étape 2: Installation des dépendances..." -ForegroundColor Yellow
pip install -r requirements.txt

# Étape 3: Créer la base de données avec Python
Write-Host "`n📌 Étape 3: Création de la base de données..." -ForegroundColor Yellow
python create_database.py

# Étape 4: Initialiser les tables et données
Write-Host "`n📌 Étape 4: Initialisation des tables et données..." -ForegroundColor Yellow
python init_and_test.py

Write-Host "`n✅ Configuration terminée!" -ForegroundColor Green
Write-Host "📌 Pour lancer le backend : uvicorn main:app --reload" -ForegroundColor Cyan
