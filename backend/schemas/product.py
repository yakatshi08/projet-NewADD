from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime

# Product schemas
class ProductBase(BaseModel):
    product_id: str
    name: str
    category: str
    price: float
    stock_quantity: int

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    stock_quantity: Optional[int] = None

class Product(ProductBase):
    id: int
    
    class Config:
        from_attributes = True

# Customer schemas
class CustomerBase(BaseModel):
    customer_id: str
    name: str
    email: str
    segment: str

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    segment: Optional[str] = None

class Customer(CustomerBase):
    id: int
    
    class Config:
        from_attributes = True

# Sale schemas
class SaleBase(BaseModel):
    sale_id: str
    product_id: int
    customer_id: int
    store_id: str
    quantity: int
    total_amount: float
    sale_date: datetime
    region: str

class SaleCreate(BaseModel):
    product_id: int
    customer_id: int
    store_id: str
    quantity: int
    region: str

class Sale(SaleBase):
    id: int
    product: Optional[Product] = None
    customer: Optional[Customer] = None
    
    class Config:
        from_attributes = True

# Store schemas
class StoreBase(BaseModel):
    store_id: str
    name: str
    region: str

class StoreCreate(StoreBase):
    pass

class Store(StoreBase):
    id: int
    
    class Config:
        from_attributes = True

# Analytics schemas
class SalesByCategory(BaseModel):
    category: str
    total_sales: float
    quantity_sold: int

class SalesByMonth(BaseModel):
    month: str
    total_sales: float
    quantity_sold: int

class TopProduct(BaseModel):
    product_id: str
    product_name: str
    total_revenue: float
    quantity_sold: int

# Import data schemas
class ImportResponse(BaseModel):
    message: str
    imported: int
    errors: List[str] = []