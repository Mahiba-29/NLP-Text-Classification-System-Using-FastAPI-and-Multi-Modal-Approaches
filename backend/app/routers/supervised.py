from fastapi import APIRouter
from app.schemas.request import ClassificationRequest
from app.models.bert_model import predict_bert

router = APIRouter()

@router.post("/predict")
def supervised(req: ClassificationRequest):
    label = predict_bert(req.text)
    return {
        "model": "bert",
        "label": label,
        "confidence": 0.85
    }
