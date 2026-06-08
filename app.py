from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL
from datetime import datetime


# ----------------------------------------
# CREATE FASTAPI APP
# ----------------------------------------

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
import os
from urllib.parse import quote_plus

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    # Running on Render
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg2://", 1)
else:
    # Running locally
    password = quote_plus("Glorymanutd@7")
    DATABASE_URL = f"postgresql+psycopg2://postgres:{password}@localhost:5432/loaniq_db"

engine = create_engine(DATABASE_URL)

# Create table if not exists
with engine.connect() as conn:
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS loan_predictions (
            id SERIAL PRIMARY KEY,
            no_of_dependents INTEGER,
            education VARCHAR(20),
            self_employed VARCHAR(5),
            income_annum INTEGER,
            loan_amount INTEGER,
            loan_term INTEGER,
            cibil_score INTEGER,
            residential_assets_value INTEGER,
            commercial_assets_value INTEGER,
            luxury_assets_value INTEGER,
            bank_asset_value INTEGER,
            prediction VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """))
    conn.commit()



# ----------------------------------------
# LOAD MODEL
# ----------------------------------------

model = joblib.load("model.pkl")


# ----------------------------------------
# PYDANTIC MODEL
# ----------------------------------------

class LoanData(BaseModel):

    no_of_dependents: int
    education: str
    self_employed: str
    income_annum: int
    loan_amount: int
    loan_term: int
    cibil_score: int
    residential_assets_value: int
    commercial_assets_value: int
    luxury_assets_value: int
    bank_asset_value: int


# ----------------------------------------
# HOME ROUTE
# ----------------------------------------

@app.get("/")
def home():

    return {
        "message": "Loan Prediction API Running!"
    }


# ----------------------------------------
# PREDICTION ROUTE
# ----------------------------------------

@app.post("/predict")
def predict(data: LoanData):

    input_data = pd.DataFrame([{

        "no_of_dependents": data.no_of_dependents,
        "education": data.education,
        "self_employed": data.self_employed,
        "income_annum": data.income_annum,
        "loan_amount": data.loan_amount,
        "loan_term": data.loan_term,
        "cibil_score": data.cibil_score,
        "residential_assets_value": data.residential_assets_value,
        "commercial_assets_value": data.commercial_assets_value,
        "luxury_assets_value": data.luxury_assets_value,
        "bank_asset_value": data.bank_asset_value
    }])


    prediction = model.predict(input_data)[0]
# ----------------------------------------
# HISTORY ROUTE
# ----------------------------------------

@app.get("/history")
def history():
    with engine.connect() as conn:
        df = pd.read_sql("""
            SELECT * FROM loan_predictions 
            ORDER BY created_at DESC
        """, conn)
        return df.to_dict(orient="records")    
    with engine.connect() as conn:
        conn.execute(text("""
            INSERT INTO loan_predictions 
            (no_of_dependents, education, self_employed, income_annum, 
            loan_amount, loan_term, cibil_score, residential_assets_value,
            commercial_assets_value, luxury_assets_value, bank_asset_value, prediction)
            VALUES 
            (:no_of_dependents, :education, :self_employed, :income_annum,
            :loan_amount, :loan_term, :cibil_score, :residential_assets_value,
            :commercial_assets_value, :luxury_assets_value, :bank_asset_value, :prediction)
        """), {
            "no_of_dependents": data.no_of_dependents,
            "education": data.education,
            "self_employed": data.self_employed,
            "income_annum": data.income_annum,
            "loan_amount": data.loan_amount,
            "loan_term": data.loan_term,
            "cibil_score": data.cibil_score,
            "residential_assets_value": data.residential_assets_value,
            "commercial_assets_value": data.commercial_assets_value,
            "luxury_assets_value": data.luxury_assets_value,
            "bank_asset_value": data.bank_asset_value,
            "prediction": str(prediction)
        })
        conn.commit()



    return {

        "loan_prediction": prediction
    }