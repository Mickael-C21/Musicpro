from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean
from database import Base
from datetime import datetime

# 👤 USERS
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)
    phone = Column(String)
    role = Column(String, default="client")


# 📦 PRODUCTS
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(Text)
    category = Column(String)
    price = Column(Integer)
    image = Column(String)
    long_description = Column(Text)
    in_stock = Column(Boolean, default=True)

    brand = Column(String)
    model = Column(String)
    condition = Column(String)
    year = Column(Integer)

    features = Column(Text)


# 📞 CALLS
class Call(Base):
    __tablename__ = "calls"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))

    scheduled_at = Column(DateTime)
    status = Column(String, default="pending")

    feedback = Column(Text)
    result = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)