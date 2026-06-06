from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib


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


# ----------------------------------------
# LOAD MODEL
# ----------------------------------------

model = joblib.load("model (1).pkl")


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


    return {

        "loan_prediction": prediction
    }