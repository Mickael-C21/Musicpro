from pydantic import BaseModel, field_validator, computed_field
from datetime import datetime
from typing import Optional, List, Dict, Any
import json

# 👤 USER
class UserCreate(BaseModel):
    email: str
    password: str
    phone: str


# 📦 PRODUCT
class ProductCreate(BaseModel):
    name: str
    description: str
    category: str
    price: int
    image: str
    long_description: str
    in_stock: bool = True
    brand: str
    model: str
    condition: str
    year: int
    features: List[str]

class ProductOut(BaseModel):
    id: int
    name: str
    description: str
    category: str
    price: int
    image: str
    features: List[str]

    model_config = {"from_attributes": True}

    @field_validator("features", mode="before")
    def parse_features(cls, value):
        if isinstance(value, str):
            try:
                return json.loads(value)
            except Exception:
                return [item.strip() for item in value.split(",") if item.strip()]
        return value

    @computed_field
    @property
    def longDescription(self) -> str:
        return getattr(self, "long_description", "") or ""

    @computed_field
    @property
    def inStock(self) -> bool:
        return getattr(self, "in_stock", True)

    @computed_field
    @property
    def specifications(self) -> Dict[str, Any]:
        return {
            "brand": getattr(self, "brand", None),
            "model": getattr(self, "model", None),
            "year": getattr(self, "year", None),
            "condition": getattr(self, "condition", None),
        }


# 📞 CALL
class CallCreate(BaseModel):
    product_id: int
    call_type: str
    name: str
    phone: str
    email: str
    subject: Optional[str] = None
    scheduled_at: Optional[datetime] = None


class Feedback(BaseModel):
    feedback: str
    result: str