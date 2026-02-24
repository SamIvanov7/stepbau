from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    firma: Optional[str] = ""
    telefon: str
    email: str
    nachricht: str
    datenschutz: bool = True
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactForm(BaseModel):
    name: str
    firma: Optional[str] = ""
    telefon: str
    email: EmailStr
    nachricht: str
    datenschutz: bool

# Routes
@api_router.get("/")
async def root():
    return {"message": "STEPBAU API"}

@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(form: ContactForm):
    submission = ContactSubmission(**form.model_dump())
    doc = submission.model_dump()
    await db.contact_submissions.insert_one(doc)
    # Remove _id added by MongoDB
    return submission

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contacts():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    return submissions

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
