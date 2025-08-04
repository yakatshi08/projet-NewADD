from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from models.product import Product, Sale, Customer, Store
from datetime import datetime, timedelta
from typing import Dict, List, Any

class AnalyticsService:
    @staticmethod
    def get_dashboard_stats(db: Session) -> Dict[str, Any]:
        # Revenus totaux
        total_revenue = db.query(func.sum(Sale.total_amount)).scalar() or 0
        
        # Nombre total de ventes
        total_sales = db.query(func.count(Sale.id)).scalar() or 0
        
        # Nombre de clients uniques
        total_customers = db.query(func.count(func.distinct(Sale.customer_id))).scalar() or 0
        
        # Panier moyen
        average_order_value = total_revenue / total_sales if total_sales > 0 else 0
        
        return {
            "total_revenue": float(total_revenue),
            "total_sales": total_sales,
            "total_customers": total_customers,
            "average_order_value": round(average_order_value, 2)
        }
    
    @staticmethod
    def get_sales_by_category(db: Session) -> List[Dict[str, Any]]:
        results = db.query(
            Product.category,
            func.sum(Sale.total_amount).label('total_sales'),
            func.sum(Sale.quantity).label('quantity_sold')
        ).join(
            Sale, Product.id == Sale.product_id
        ).group_by(Product.category).all()
        
        return [
            {
                "category": r.category,
                "total_sales": float(r.total_sales),
                "quantity_sold": r.quantity_sold
            }
            for r in results
        ]
    
    @staticmethod
    def get_sales_by_month(db: Session) -> List[Dict[str, Any]]:
        # 6 derniers mois
        six_months_ago = datetime.now() - timedelta(days=180)
        
        results = db.query(
            extract('month', Sale.sale_date).label('month'),
            extract('year', Sale.sale_date).label('year'),
            func.sum(Sale.total_amount).label('total_sales'),
            func.sum(Sale.quantity).label('quantity_sold')
        ).filter(
            Sale.sale_date >= six_months_ago
        ).group_by(
            extract('year', Sale.sale_date),
            extract('month', Sale.sale_date)
        ).order_by(
            extract('year', Sale.sale_date),
            extract('month', Sale.sale_date)
        ).all()
        
        months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
        
        return [
            {
                "month": months[int(r.month) - 1],
                "total_sales": float(r.total_sales),
                "quantity_sold": r.quantity_sold
            }
            for r in results
        ]
    
    @staticmethod
    def get_top_products(db: Session, limit: int = 10) -> List[Dict[str, Any]]:
        results = db.query(
            Product.product_id,
            Product.name,
            func.sum(Sale.total_amount).label('total_revenue'),
            func.sum(Sale.quantity).label('quantity_sold')
        ).join(
            Sale, Product.id == Sale.product_id
        ).group_by(
            Product.id, Product.product_id, Product.name
        ).order_by(
            func.sum(Sale.total_amount).desc()
        ).limit(limit).all()
        
        return [
            {
                "product_id": r.product_id,
                "product_name": r.name,
                "total_revenue": float(r.total_revenue),
                "quantity_sold": r.quantity_sold
            }
            for r in results
        ]