def predict_tfidf(text: str):
    if "game" in text.lower():
        return "Sports"
    return "World"