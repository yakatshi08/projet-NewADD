"""
Script tout-en-un pour initialiser la base et tester
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import create_engine, text
from backend.core.config import settings
from backend.db.base import Base
from backend.db.init_db import init_db

def setup_database():
    print("🚀 Configuration de la base de données...")
    
    # 1. Créer l'engine
    engine = create_engine(str(settings.DATABASE_URL))
    
    # 2. Tester la connexion
    print("\n🔍 Test de connexion...")
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ Connexion à PostgreSQL réussie!")
    except Exception as e:
        print(f"❌ Erreur de connexion : {e}")
        print("\n💡 Vérifiez que :")
        print("   1. PostgreSQL est démarré")
        print("   2. La base 'bi_analytics' existe")
        print("   3. Le fichier .env contient les bons identifiants")
        return False
    
    # 3. Créer les tables
    print("\n📊 Création des tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Tables créées avec succès!")
    except Exception as e:
        print(f"❌ Erreur lors de la création des tables : {e}")
        return False
    
    # 4. Initialiser les données
    print("\n🌱 Initialisation des données de test...")
    try:
        init_db()
        print("✅ Données de test créées!")
    except Exception as e:
        print(f"❌ Erreur lors de l'initialisation : {e}")
        return False
    
    # 5. Vérifier les données
    print("\n📋 Vérification des données...")
    with engine.connect() as conn:
        tables = ['products', 'customers', 'sales', 'stores', 'users']
        for table in tables:
            try:
                result = conn.execute(text(f"SELECT COUNT(*) FROM {table}"))
                count = result.scalar()
                print(f"   ✓ {table}: {count} enregistrements")
            except:
                print(f"   ✗ {table}: non trouvée")
    
    print("\n✅ Base de données prête à l'emploi!")
    return True

if __name__ == "__main__":
    setup_database()
