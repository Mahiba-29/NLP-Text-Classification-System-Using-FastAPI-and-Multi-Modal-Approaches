from fastapi import APIRouter
from app.schemas.request import ClassificationRequest
from app.database.mongo import save_prediction
from app.models.tfidf_model import predict_tfidf
from app.models.word2vec_model import predict_word2vec

router = APIRouter()

@router.post("/predict")
def zero_shot(req: ClassificationRequest):
    text = req.text.lower()

    if "stock" in text:
        label = "Business"
        confidence = 0.82
    else:
        label = "World"
        confidence = 0.75

    response = {
        "text": req.text,
        "model_type": "zero-shot",
        "model_name": "rule-based",
        "predicted_label": label,
        "confidence": confidence
    }

    save_prediction(response)

    return response

@router.post("/tfidf")
def tfidf(req: ClassificationRequest):
    label = predict_tfidf(req.text)

    save_prediction({
        "text": req.text,
        "model_type": "zero-shot",
        "model_name": "tfidf",
        "predicted_label": label
    })

    return {
        "status": "success",
        "label": label
    }

@router.post("/word2vec")
def zero_shot_word2vec(req: ClassificationRequest):
    label = predict_word2vec(req.text)

    save_prediction({
        "text": req.text,
        "model_type": "zero-shot",
        "model": "word2vec",
        "label": label
    })

    return {
        "status": "success",
        "label": label
    }