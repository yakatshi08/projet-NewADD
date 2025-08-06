from db.session import engine
import psycopg2

print("Test de connexion à la base de données...")
try:
    # Test avec SQLAlchemy
    conn = engine.connect()
    print("✅ Connexion SQLAlchemy OK!")
    conn.close()
    
    # Test direct avec psycopg2
    conn2 = psycopg2.connect(
        host="localhost",
        database="newadd_analytics",
        user="postgres",
        password="postgres123"
    )
    print("✅ Connexion psycopg2 OK!")
    conn2.close()
    
except Exception as e:
    print(f"❌ Erreur: {e}")
