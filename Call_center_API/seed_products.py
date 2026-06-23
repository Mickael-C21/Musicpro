import json
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import model

model.Base.metadata.create_all(bind=engine)

products = [
    {
        "name": "Guitare Acoustique Yamaha FG800",
        "description": "Une guitare folk polyvalente avec un son riche et équilibré.",
        "category": "guitares",
        "price": 249,
        "image": "https://images.unsplash.com/photo-1760413209602-bb726f8830f9?auto=format&fit=crop&w=1024&q=80",
        "long_description": "La Yamaha FG800 est une guitare acoustique folk qui offre un excellent rapport qualité-prix. Sa table en épicéa massif et son dos en nato produisent un son chaud et clair.",
        "in_stock": True,
        "brand": "Yamaha",
        "model": "FG800",
        "condition": "Neuf",
        "year": 2024,
        "features": json.dumps([
            "Table en épicéa massif",
            "Dos et éclisses en nato",
            "Finition naturelle brillante",
            "Action confortable pour débutants",
            "Son équilibré et chaleureux"
        ])
    },
    {
        "name": "Synthétiseur Roland JUNO-DS88",
        "description": "Un synthétiseur de scène complet avec 88 touches et de nombreux sons.",
        "category": "studio",
        "price": 1299,
        "image": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1024&q=80",
        "long_description": "Le Roland JUNO-DS88 offre une vaste bibliothèque de sons professionnels, des effets de haute qualité et une interface intuitive.",
        "in_stock": True,
        "brand": "Roland",
        "model": "JUNO-DS88",
        "condition": "Neuf",
        "year": 2023,
        "features": json.dumps([
            "88 touches lestées",
            "Plus de 1000 sons",
            "Effets professionnels intégrés",
            "Séquenceur 8 pistes",
            "Entrée/sortie MIDI complète"
        ])
    },
    {
        "name": "Batterie Électronique Alesis Nitro Mesh",
        "description": "Une batterie électronique silencieuse avec peaux mesh ultra-réactives.",
        "category": "batteries",
        "price": 499,
        "image": "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1024&q=80",
        "long_description": "La Alesis Nitro Mesh est une batterie électronique idéale pour la pratique à domicile avec 385 sons et 60 morceaux accompagnés.",
        "in_stock": True,
        "brand": "Alesis",
        "model": "Nitro Mesh Kit",
        "condition": "Neuf",
        "year": 2024,
        "features": json.dumps([
            "Peaux mesh ultra-silencieuses",
            "385 sons de batterie",
            "60 play-along tracks",
            "Sortie casque et USB-MIDI",
            "Rack stable et ajustable"
        ])
    }
]

with SessionLocal() as db:
    existing = db.query(model.Product).count()
    if existing > 0:
        print(f"{existing} produits déjà présents, aucun ajout effectué.")
    else:
        for product_data in products:
            product = model.Product(**product_data)
            db.add(product)
        db.commit()
        print(f"Ajouté {len(products)} produits dans la base.")
