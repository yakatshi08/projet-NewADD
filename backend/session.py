from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Force l'encodage UTF-8
os.environ['PGCLIENTENCODING'] = 'UTF8'

# URL avec paramètres d'encodage explicites
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost:5432/bi_analytics_clean?client_encoding=utf8"

# Créer l'engine avec des options supplémentaires
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={
        "client_encoding": "utf8",
        "options": "-c client_encoding=utf8"
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()