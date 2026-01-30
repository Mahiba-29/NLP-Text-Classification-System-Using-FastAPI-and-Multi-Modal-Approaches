from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb://localhost:27017")
db = client["nlp_classification"]

predictions_collection = db["predictions"]


def save_prediction(data: dict):
    data["timestamp"] = datetime.utcnow()
    predictions_collection.insert_one(data)
    return True   
