from fastapi import APIRouter

router = APIRouter()

@router.post("/csv")
def import_csv():
    return {"message": "CSV import endpoint"}
