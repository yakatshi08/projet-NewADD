from typing import List, Optional
from fastapi import APIRouter, Query, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from datetime import datetime, date
from api import deps
from models.product import Sale, Product, Customer
from schemas.product import Sale as SaleSchema

router = APIRouter()

@router.get("/", response_model=List[SaleSchema])
def read_sales(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    store_id: Optional[str] = None,
    region: Optional[str] = None,
    db: Session = Depends(deps.get_db)
):
    """
    Récupérer les ventes avec filtres optionnels
    """
    query = db.query(Sale).options(
        joinedload(Sale.product),
        joinedload(Sale.customer)
    )
    
    if start_date:
        query = query.filter(Sale.sale_date >= start_date)
    if end_date:
        query = query.filter(Sale.sale_date <= end_date)
    if store_id:
        query = query.filter(Sale.store_id == store_id)
    if region:
        query = query.filter(Sale.region == region)
    
    sales = query.order_by(Sale.sale_date.desc()).offset(skip).limit(limit).all()
    return sales

@router.get("/recent")
def get_recent_sales(
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(deps.get_db)
):
    """
    Obtenir les ventes les plus récentes
    """
    sales = db.query(Sale).options(
        joinedload(Sale.product),
        joinedload(Sale.customer)
    ).order_by(Sale.sale_date.desc()).limit(limit).all()
    
    return [
        {
            "sale_id": sale.sale_id,
            "sale_date": sale.sale_date,
            "product_name": sale.product.name if sale.product else "Unknown",
            "customer_name": sale.customer.name if sale.customer else "Unknown",
            "quantity": sale.quantity,
            "total_amount": sale.total_amount,
            "store_id": sale.store_id,
            "region": sale.region
        }
        for sale in sales
    ]