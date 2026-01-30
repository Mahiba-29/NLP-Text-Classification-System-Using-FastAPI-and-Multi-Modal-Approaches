from fastapi import APIRouter
from app.database.mongo import predictions_collection

router = APIRouter()

@router.get("/")
def get_history():
    data = []
    for doc in predictions_collection.find():
        doc["_id"] = str(doc["_id"])  # ✅ FIX ObjectId
        data.append(doc)
    return data
