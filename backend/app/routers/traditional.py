from fastapi import APIRouter
from app.schemas.request import ClassificationRequest
from app.models.tfidf_model import predict_tfidf
from app.models.word2vec_model import predict_word2vec

router = APIRouter()

@router.post("/tfidf")
def tfidf(req: ClassificationRequest):
    return {
        "model": "tfidf",
        "label": predict_tfidf(req.text),
        "confidence": 0.70
    }

@router.post("/word2vec")
def word2vec(req: ClassificationRequest):
    return {
        "model": "word2vec",
        "label": predict_word2vec(req.text),
        "confidence": 0.72
    }
