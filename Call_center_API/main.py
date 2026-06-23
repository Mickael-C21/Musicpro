from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
import model, schema, auth
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

# Create tables
model.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DB ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def product_to_dict(product: model.Product):
    try:
        features = json.loads(product.features) if isinstance(product.features, str) else product.features
    except Exception:
        features = [item.strip() for item in (product.features or "").split(",") if item.strip()]

    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "category": product.category,
        "price": product.price,
        "image": product.image,
        "longDescription": product.long_description or "",
        "inStock": product.in_stock if product.in_stock is not None else True,
        "features": features,
        "specifications": {
            "brand": product.brand,
            "model": product.model,
            "year": product.year,
            "condition": product.condition,
        },
    }


# ---------------- AUTH ----------------

@app.post("/register")
def register(user: schema.UserCreate, db: Session = Depends(get_db)):
    hashed = auth.hash_password(user.password)

    new_user = model.User(
        email=user.email,
        password=hashed,
        phone=user.phone
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "user created"}


@app.post("/login")
def login(user: schema.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(model.User).filter(model.User.email == user.email).first()

    if not db_user or not auth.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="invalid credentials")

    token = auth.create_token({
        "user_id": db_user.id,
        "role": db_user.role
    })

    return {"access_token": token}


# ---------------- PRODUCTS ----------------

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(model.Product).all()
    return [product_to_dict(product) for product in products]


@app.get("/products/{id}")
def get_product(id: int, db: Session = Depends(get_db)):
    product = db.query(model.Product).filter(model.Product.id == id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product_to_dict(product)


@app.post("/products")
def create_product(product: schema.ProductCreate, db: Session = Depends(get_db)):
    product_data = product.dict()
    product_data["features"] = json.dumps(product_data["features"])

    new_product = model.Product(**product_data)

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


# ---------------- CALLS ----------------

@app.post("/calls")
def create_call(call: schema.CallCreate, db: Session = Depends(get_db)):
    new_call = model.Call(
        user_id=1,  # temporaire (JWT après)
        product_id=call.product_id,
        scheduled_at=call.scheduled_at,
        status="pending"
    )

    db.add(new_call)
    db.commit()
    db.refresh(new_call)

    return new_call


@app.get("/calls")
def get_calls(db: Session = Depends(get_db)):
    return db.query(model.Call).order_by(model.Call.created_at.desc()).all()


@app.put("/calls/{id}/feedback")
def add_feedback(id: int, data: schema.Feedback, db: Session = Depends(get_db)):
    call = db.query(model.Call).filter(model.Call.id == id).first()

    if not call:
        raise HTTPException(status_code=404, detail="Call not found")

    call.feedback = data.feedback
    call.result = data.result
    call.status = "done"

    db.commit()
    db.refresh(call)

    return call

# ---------------- USERS ----------------

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(model.User).all()


@app.get("/users/{id}")
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(model.User).filter(model.User.id == id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user