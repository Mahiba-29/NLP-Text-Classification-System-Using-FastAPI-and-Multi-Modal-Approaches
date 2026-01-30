from pydantic import BaseModel
from typing import List, Optional

class ClassificationRequest(BaseModel):
    text: str
    labels: Optional[List[str]] = None
