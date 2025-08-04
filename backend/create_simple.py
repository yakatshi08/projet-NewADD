import psycopg2

print("Creation de la base de donnees BI Analytics...")

# Parametres de connexion
host = "localhost"
port = "5432"
username = "postgres"
password = "Newadd"

try:
    print("Connexion a PostgreSQL...")
    conn = psycopg2.connect(
        host=host,
        port=port,
        user=username,
        password=password,
        database="postgres"
    )
    conn.autocommit = True
    cursor = conn.cursor()
    
    # Verifier si la base existe
    cursor.execute("SELECT 1 FROM pg_database WHERE datname = 'bi_analytics'")
    if cursor.fetchone():
        print("Base existante, suppression...")
        cursor.execute("DROP DATABASE bi_analytics")
    
    # Creer la base
    print("Creation de bi_analytics...")
    cursor.execute("CREATE DATABASE bi_analytics")
    print("Base de donnees creee avec succes!")
    
    cursor.close()
    conn.close()
    
    # Creer .env
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
    
    with open('.env', 'w') as f:
        f.write(env_content)
    
    print("Fichier .env cree")
    print("OK! Executez maintenant : python init_and_test.py")
    
except Exception as e:
    print(f"Erreur : {e}")
