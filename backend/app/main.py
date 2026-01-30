from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.zero_shot import router as zero_router
from app.routers.supervised import router as sup_router
from app.routers.traditional import router as trad_router
from app.routers.history import router as history_router

app = FastAPI(title="NLP Text Classification API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(zero_router, prefix="/zero-shot", tags=["Zero Shot"])
app.include_router(sup_router, prefix="/supervised", tags=["Supervised"])
app.include_router(trad_router, prefix="/traditional", tags=["Traditional NLP"])
app.include_router(history_router, prefix="/history", tags=["History"])

@app.get("/")
def root():
    return {"message": "API is running"}
