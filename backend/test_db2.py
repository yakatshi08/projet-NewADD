import psycopg2

try:
    # Utiliser 127.0.0.1 au lieu de localhost
    conn = psycopg2.connect(
        host="127.0.0.1",
        port="5432",
        database="bi_analytics_clean",
        user="postgres",
        password="password"
    )
    print("✅ Connexion réussie!")
    
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    print("✅ Table users accessible!")
    cur.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Erreur: {e}")
    import traceback
    traceback.print_exc()
