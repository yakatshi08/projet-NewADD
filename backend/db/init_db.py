from sqlalchemy.orm import Session
from db import base  # noqa: F401
from db.session import SessionLocal
from models.product import Product, Customer, Sale, Store
from models.user import User
from core.security import get_password_hash
import random
from datetime import datetime, timedelta
import uuid

def init_db():
    db = SessionLocal()
    
    # Créer un utilisateur admin
    admin_user = db.query(User).filter(User.email == "admin@bi-analytics.com").first()
    if not admin_user:
        admin_user = User(
            email="admin@bi-analytics.com",
            username="admin",
            full_name="Administrateur",
            hashed_password=get_password_hash("admin123"),
            is_superuser=True
        )
        db.add(admin_user)
        db.commit()
        print("✅ Utilisateur admin créé")
    
    # Vérifier si des données existent déjà
    if db.query(Product).count() > 0:
        print("ℹ️ Des données existent déjà dans la base")
        return
    
    print("🌱 Initialisation des données de test retail...")
    
    # Créer des catégories et produits
    categories = {
        "Électronique": [
            ("Laptop Pro 15", 999.99, 50),
            ("Smartphone X12", 799.99, 100),
            ("Tablette Ultra", 499.99, 75),
            ("Écouteurs Wireless", 149.99, 200),
            ("Smartwatch Pro", 299.99, 80)
        ],
        "Vêtements": [
            ("T-shirt Classic", 29.99, 300),
            ("Jean Premium", 79.99, 150),
            ("Veste Sport", 99.99, 100),
            ("Chaussures Running", 119.99, 120),
            ("Casquette Style", 24.99, 200)
        ],
        "Alimentation": [
            ("Café Premium 1kg", 15.99, 500),
            ("Thé Bio Assortiment", 12.99, 300),
            ("Chocolat Noir 70%", 4.99, 1000),
            ("Biscuits Artisanaux", 6.99, 400),
            ("Miel Local 500g", 9.99, 200)
        ],
        "Mobilier": [
            ("Bureau Ergonomique", 299.99, 30),
            ("Chaise Gaming", 199.99, 50),
            ("Étagère Modulable", 89.99, 60),
            ("Lampe LED Design", 49.99, 100),
            ("Table Basse Moderne", 149.99, 40)
        ],
        "Sports": [
            ("Tapis Yoga Premium", 39.99, 150),
            ("Haltères 10kg Set", 79.99, 80),
            ("Ballon Fitness", 29.99, 100),
            ("Corde à Sauter Pro", 19.99, 200),
            ("Gourde Isotherme 1L", 24.99, 250)
        ]
    }
    
    products = []
    product_id = 1
    
    for category, items in categories.items():
        for name, price, stock in items:
            product = Product(
                product_id=f"P{product_id:04d}",
                name=name,
                category=category,
                price=price,
                stock_quantity=stock
            )
            products.append(product)
            db.add(product)
            product_id += 1
    
    db.commit()
    print(f"✅ {len(products)} produits créés")
    
    # Créer des magasins
    stores_data = [
        ("S001", "BI Store Paris", "Île-de-France", "Paris", "Marie Dupont"),
        ("S002", "BI Store Lyon", "Auvergne-Rhône-Alpes", "Lyon", "Jean Martin"),
        ("S003", "BI Store Marseille", "Provence-Alpes-Côte d'Azur", "Marseille", "Sophie Bernard"),
        ("S004", "BI Store Toulouse", "Occitanie", "Toulouse", "Pierre Dubois"),
        ("S005", "BI Store Bordeaux", "Nouvelle-Aquitaine", "Bordeaux", "Claire Moreau")
    ]
    
    stores = []
    for store_id, name, region, city, manager in stores_data:
        store = Store(
            store_id=store_id,
            name=name,
            region=region,
            city=city,
            manager=manager
        )
        stores.append(store)
        db.add(store)
    
    db.commit()
    print(f"✅ {len(stores)} magasins créés")
    
    # Créer des clients
    customers = []
    segments = ["Premium", "Standard", "Occasionnel", "Nouveau"]
    
    for i in range(1, 101):  # 100 clients
        customer = Customer(
            customer_id=f"C{i:04d}",
            name=f"Client {i}",
            email=f"client{i}@example.com",
            phone=f"+33 6 {random.randint(10, 99)} {random.randint(10, 99)} {random.randint(10, 99)} {random.randint(10, 99)}",
            segment=random.choice(segments)
        )
        customers.append(customer)
        db.add(customer)
    
    db.commit()
    print(f"✅ {len(customers)} clients créés")
    
    # Créer des ventes (6 mois de données)
    sales = []
    start_date = datetime.now() - timedelta(days=180)
    
    for day in range(180):
        current_date = start_date + timedelta(days=day)
        # Nombre de ventes par jour (plus le weekend)
        num_sales = random.randint(20, 50) if current_date.weekday() < 5 else random.randint(40, 80)
        
        for _ in range(num_sales):
            product = random.choice(products)
            customer = random.choice(customers)
            store = random.choice(stores)
            quantity = random.randint(1, 5)
            
            # Appliquer des réductions aléatoires
            discount = random.choice([0, 0, 0, 0.1, 0.15, 0.2])  # 60% sans réduction
            unit_price = product.price * (1 - discount)
            
            sale = Sale(
                sale_id=str(uuid.uuid4()),
                product_id=product.id,
                customer_id=customer.id,
                quantity=quantity,
                unit_price=unit_price,
                total_amount=unit_price * quantity,
                sale_date=current_date,
                store_id=store.store_id,
                region=store.region
            )
            sales.append(sale)
            db.add(sale)
            
            # Mettre à jour le stock
            product.stock_quantity = max(0, product.stock_quantity - quantity)
        
        # Commit par batch pour les performances
        if day % 30 == 0:
            db.commit()
            print(f"📊 Ventes jusqu'au jour {day} créées...")
    
    db.commit()
    print(f"✅ {len(sales)} ventes créées sur 6 mois")
    
    # Afficher les statistiques
    print("\n📈 Statistiques de la base de données :")
    print(f"   - Produits : {db.query(Product).count()}")
    print(f"   - Clients : {db.query(Customer).count()}")
    print(f"   - Magasins : {db.query(Store).count()}")
    print(f"   - Ventes : {db.query(Sale).count()}")
    print(f"   - Utilisateurs : {db.query(User).count()}")
    
    db.close()

if __name__ == "__main__":
    init_db()
