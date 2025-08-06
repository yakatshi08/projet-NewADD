import psycopg2

try:
    # Test direct sans SQLAlchemy
    conn = psycopg2.connect(
        host="localhost",
        database="bi_analytics_clean",
        user="postgres",
        password="password",
        options="-c client_encoding=utf8"
    )
    print("✅ Connexion réussie!")
    
    # Créer un utilisateur test
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    print("✅ Table users accessible!")
    cur.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Erreur: {e}")
    import traceback
    traceback.print_exc()
