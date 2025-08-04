from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from api.api_v1.api import api_router
from db.session import engine
from db.base_class import Base
import uvicorn
import logging

# Configuration des logs
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Créer les tables - COMMENTÉ TEMPORAIREMENT
# Base.metadata.create_all(bind=engine)  # Commenté temporairement - erreur encodage

# Créer l'application
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Debug: Vérifier l'import des modules
print("=== VÉRIFICATION DES IMPORTS ===")
try:
    from api.api_v1.endpoints import auth
    print("✅ Module auth importé")
    print(f"   Routes dans auth: {[r.path for r in auth.router.routes]}")
except Exception as e:
    print(f"❌ Erreur import auth: {e}")
    import traceback
    traceback.print_exc()

# Inclure les routes API - C'EST LA LIGNE CLÉ !
print("\n=== INCLUSION DU ROUTER API ===")
app.include_router(api_router, prefix=settings.API_V1_STR)

# Afficher toutes les routes
print("\n=== ROUTES ENREGISTRÉES ===")
for route in app.routes:
    if hasattr(route, 'path'):
        print(f"   {route.methods if hasattr(route, 'methods') else 'N/A'} {route.path}")

# Routes de base
@app.get("/")
def root():
    return {
        "message": "BI Analytics API",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    print("\n=== DÉMARRAGE DU SERVEUR ===")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)