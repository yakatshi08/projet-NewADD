from typing import List, Optional
from fastapi import APIRouter, Query, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from api import deps
from models.product import Customer, Sale
from schemas.product import Customer as CustomerSchema

router = APIRouter()

@router.get("/", response_model=List[CustomerSchema])
def read_customers(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    segment: Optional[str] = None,
    db: Session = Depends(deps.get_db)
):
    """
    Récupérer la liste des clients avec filtres optionnels
    """
    query = db.query(Customer)
    
    if segment:
        query = query.filter(Customer.segment == segment)
    
    customers = query.offset(skip).limit(limit).all()
    return customers

@router.get("/{customer_id}", response_model=CustomerSchema)
def read_customer(customer_id: int, db: Session = Depends(deps.get_db)):
    """
    Récupérer un client par son ID
    """
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.get("/{customer_id}/stats")
def get_customer_stats(customer_id: int, db: Session = Depends(deps.get_db)):
    """
    Obtenir les statistiques d'achat d'un client
    """
    # Vérifier que le client existe
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    # Calculer les stats
    stats = db.query(
        func.count(Sale.id).label('total_orders'),
        func.sum(Sale.total_amount).label('total_spent'),
        func.avg(Sale.total_amount).label('avg_order_value'),
        func.max(Sale.sale_date).label('last_purchase')
    ).filter(Sale.customer_id == customer_id).first()
    
    return {
        "customer_id": customer.customer_id,
        "customer_name": customer.name,
        "total_orders": stats.total_orders or 0,
        "total_spent": float(stats.total_spent or 0),
        "average_order_value": float(stats.avg_order_value or 0),
        "last_purchase": str(stats.last_purchase) if stats.last_purchase else None,
        "segment": customer.segment
    }