from typing import List, Optional
from sqlalchemy.orm import Session
from crud.base import CRUDBase
from models.product import Product, Sale, Customer, Store
from schemas.product import ProductCreate, ProductUpdate

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get_by_product_id(self, db: Session, *, product_id: str) -> Optional[Product]:
        return db.query(Product).filter(Product.product_id == product_id).first()
    
    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[Product]:
        return db.query(Product).offset(skip).limit(limit).all()

product = CRUDProduct(Product)