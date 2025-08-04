"""
Script de test de connexion à la base de données
"""
from sqlalchemy import create_engine, text
from backend.core.config import settings

def test_connection():
    print("🔍 Test de connexion à PostgreSQL...")
    print(f"📌 URL: {settings.DATABASE_URL}")
    
    try:
        # Créer le moteur
        engine = create_engine(str(settings.DATABASE_URL))
        
        # Tester la connexion
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.fetchone()[0]
            print(f"✅ Connexion réussie!")
            print(f"📊 Version PostgreSQL : {version}")
            
            # Tester les tables
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """))
            tables = [row[0] for row in result]
            
            if tables:
                print(f"\n📋 Tables trouvées :")
                for table in tables:
                    print(f"   - {table}")
            else:
                print("\n⚠️ Aucune table trouvée. Exécutez d'abord l'initialisation.")
                
    except Exception as e:
        print(f"❌ Erreur de connexion : {str(e)}")
        print("\n💡 Vérifiez :")
        print("   1. PostgreSQL est démarré")
        print("   2. La base de données 'bi_analytics' existe")
        print("   3. Les identifiants dans .env sont corrects")

if __name__ == "__main__":
    test_connection()
