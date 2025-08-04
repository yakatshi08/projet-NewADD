# -*- coding: utf-8 -*-
"""
Créer la base de données avec mot de passe intégré
"""
import psycopg2
from psycopg2 import sql

def create_database():
    print("🗄️ Création de la base de données BI Analytics...")
    
    # Paramètres de connexion directement définis
    host = "localhost"
    port = "5432"
    username = "postgres"
    password = "Newadd"  # Votre mot de passe
    
    print(f"📌 Connexion à PostgreSQL...")
    print(f"   Host: {host}")
    print(f"   Port: {port}")
    print(f"   User: {username}")
    
    try:
        # Se connecter au serveur PostgreSQL
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=username,
            password=password,
            database="postgres"
        )
        conn.autocommit = True
        cursor = conn.cursor()
        
        # Vérifier si la base existe
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = 'bi_analytics'")
        exists = cursor.fetchone()
        
        if exists:
            print("⚠️  La base 'bi_analytics' existe déjà.")
            print("🗑️  Suppression de l'ancienne base...")
            cursor.execute("DROP DATABASE bi_analytics")
            print("✅ Ancienne base supprimée")
        
        # Créer la nouvelle base
        print("📝 Création de la base bi_analytics...")
        cursor.execute("CREATE DATABASE bi_analytics")
        print("✅ Base de données 'bi_analytics' créée avec succès!")
        
        cursor.close()
        conn.close()
        
        # Créer le fichier .env
        create_env_file()
        
        return True
        
    except Exception as e:
        print(f"❌ Erreur : {e}")
        return False

def create_env_file():
    """Créer le fichier .env avec les bonnes informations"""
    print("\n📝 Création du fichier .env...")
    
    env_content = """# Application
PROJECT_NAME="BI Analytics API"
VERSION="1.0.0"

# Security
SECRET_KEY="your-secret-key-here-change-in-production"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Database
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Newadd
POSTGRES_DB=bi_analytics
POSTGRES_PORT=5432

# Redis
REDIS_URL=redis://localhost:6379

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
"""
    
    with open('.env', 'w', encoding='utf-8') as f:
        f.write(env_content)
    
    print("✅ Fichier .env créé")

if __name__ == "__main__":
    if create_database():
        print("\n✅ Base de données prête!")
        print("📌 Exécutez maintenant : python init_and_test.py")
    else:
        print("\n❌ La création a échoué. Vérifiez que PostgreSQL est démarré.")
