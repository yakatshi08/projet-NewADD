from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from api import deps

router = APIRouter()


@router.get("/dashboard")
def get_dashboard_stats(db: Session = Depends(deps.get_db)):
    """
    Obtenir les statistiques du dashboard
    """
    return {
        "total_revenue": 50000.0,
        "total_sales": 1200,
        "total_customers": 100,
        "average_order_value": 41.67,
        "revenue_change": 12.5,
        "current_month_revenue": 15000.0,
        "last_month_revenue": 13333.0
    }


@router.get("/sales-by-category")
def get_sales_by_category(db: Session = Depends(deps.get_db)):
    """
    Obtenir les ventes par catégorie
    """
    return [
        {"category": "Électronique", "total_sales": 35000.0, "quantity_sold": 150},
        {"category": "Vêtements", "total_sales": 25000.0, "quantity_sold": 400},
        {"category": "Alimentation", "total_sales": 20000.0, "quantity_sold": 1000},
        {"category": "Mobilier", "total_sales": 12000.0, "quantity_sold": 50},
        {"category": "Sports", "total_sales": 8000.0, "quantity_sold": 200}
    ]


@router.get("/sales-by-month")
def get_sales_by_month(db: Session = Depends(deps.get_db)):
    """
    Obtenir les ventes par mois
    """
    return [
        {"month": "Jan", "total_sales": 8000.0, "quantity_sold": 200},
        {"month": "Fév", "total_sales": 7500.0, "quantity_sold": 180},
        {"month": "Mar", "total_sales": 9800.0, "quantity_sold": 250},
        {"month": "Avr", "total_sales": 8900.0, "quantity_sold": 220},
        {"month": "Mai", "total_sales": 10200.0, "quantity_sold": 280},
        {"month": "Jun", "total_sales": 11500.0, "quantity_sold": 300}
    ]


@router.get("/top-products")
def get_top_products(limit: int = Query(3, ge=1, le=50), db: Session = Depends(deps.get_db)):
    """
    Obtenir les top produits
    """
    products = [
        {
            "product_id": "P0001",
            "product_name": "Laptop Pro 15",
            "total_revenue": 14999.85,
            "quantity_sold": 15
        },
        {
            "product_id": "P0002",
            "product_name": "Smartphone X12",
            "total_revenue": 11999.85,
            "quantity_sold": 15
        },
        {
            "product_id": "P0006",
            "product_name": "T-shirt Classic",
            "total_revenue": 8997.00,
            "quantity_sold": 300
        },
        {
            "product_id": "P0007",
            "product_name": "Bureau Ergonomique",
            "total_revenue": 8997.00,
            "quantity_sold": 30
        },
        {
            "product_id": "P0008",
            "product_name": "Café Premium",
            "total_revenue": 7995.00,
            "quantity_sold": 500
        }
    ]
    return products[:limit]


@router.get("/sales-trend")
def get_sales_trend(days: int = Query(30, ge=7, le=365), db: Session = Depends(deps.get_db)):
    """
    Obtenir la tendance des ventes sur N jours
    """
    # Données de test simplifiées
    trend_data = []
    from datetime import datetime, timedelta
    
    for i in range(min(days, 30)):
        date = datetime.now() - timedelta(days=i)
        trend_data.append({
            "date": str(date.date()),
            "sales": 1500.0 + (i * 50),
            "transactions": 30 + i
        })
    
    return trend_data
