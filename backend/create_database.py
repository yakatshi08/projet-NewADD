"""
Créer la base de données directement avec Python
"""
import psycopg2
from psycopg2 import sql
import getpass

def create_database():
    print("🗄️ Création de la base de données BI Analytics...")
    
    # Demander les informations de connexion
    host = input("Host PostgreSQL (par défaut: localhost): ") or "localhost"
    port = input("Port PostgreSQL (par défaut: 5432): ") or "5432"
    username = input("Utilisateur PostgreSQL (par défaut: postgres): ") or "postgres"
    password = getpass.getpass("Mot de passe PostgreSQL: ")
    
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
            response = input("Voulez-vous la recréer ? (o/N): ")
            if response.lower() == 'o':
                print("🗑️  Suppression de l'ancienne base...")
                cursor.execute("DROP DATABASE bi_analytics")
                print("✅ Ancienne base supprimée")
            else:
                print("✅ Utilisation de la base existante")
                cursor.close()
                conn.close()
                return True
        
        # Créer la nouvelle base
        print("📝 Création de la base bi_analytics...")
        cursor.execute("CREATE DATABASE bi_analytics")
        print("✅ Base de données 'bi_analytics' créée avec succès!")
        
        cursor.close()
        conn.close()
        
        # Créer le fichier .env
        update_env_file(host, port, username, password)
        
        return True
        
    except Exception as e:
        print(f"❌ Erreur : {e}")
        return False

def update_env_file(host, port, username, password):
    """Mettre à jour le fichier .env"""
    print("\n📝 Mise à jour du fichier .env...")
    
    env_content = f"""# Application
PROJECT_NAME="BI Analytics API"
VERSION="1.0.0"

# Security
SECRET_KEY="your-secret-key-here-change-in-production"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Database
POSTGRES_SERVER={host}
POSTGRES_USER={username}
POSTGRES_PASSWORD={password}
POSTGRES_DB=bi_analytics
POSTGRES_PORT={port}

# Redis
REDIS_URL=redis://localhost:6379

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
"""
    
    with open('.env', 'w') as f:
        f.write(env_content)
    
    print("✅ Fichier .env mis à jour")

if __name__ == "__main__":
    if create_database():
        print("\n✅ Base de données prête!")
        print("📌 Exécutez maintenant : python init_and_test.py")
