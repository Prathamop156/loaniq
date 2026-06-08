
from sqlalchemy.engine import URL
from sqlalchemy import create_engine

connection_url = URL.create(
   drivername="postgresql+psycopg2",
    username="postgres",
    password="Glorymanutd@7", 
    host="localhost",
    port=5432,
    database="loaniq_db"
)

engine = create_engine(connection_url)

# try:
#     with engine.connect() as conn:
#         print("✅ Connected to PostgreSQL successfully!")
# except Exception as e:
#     print(f"❌ Error: {e}")
from sqlalchemy import text     

# # Create a table
# with engine.connect() as conn:
#     conn.execute(text("""
#         CREATE TABLE IF NOT EXISTS loan_predictions (
#             id SERIAL PRIMARY KEY,
#             applicant_name VARCHAR(100),
#             income INTEGER,
#             loan_amount INTEGER,
#             cibil_score INTEGER,
#             prediction VARCHAR(20),
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#         )
#     """))
#     conn.commit()
#     print("✅ Table created successfully!")

# with engine.connect() as conn:
#     conn.execute(text("""
#         INSERT INTO loan_predictions 
#         (applicant_name, income, loan_amount, cibil_score, prediction)
#         VALUES 
#         (:name, :income, :loan_amount, :cibil_score, :prediction)
#     """), {
#         "name": "Rohan Kapoor",
#         "income": 800000,
#         "loan_amount": 2000000,
#         "cibil_score": 742,
#         "prediction": "Approved"
#     })
#     conn.commit()
#     print("✅ Data inserted successfully!")    
# import pandas as pd

# with engine.connect() as conn:
#     df = pd.read_sql("SELECT * FROM loan_predictions", conn)
#     print(df)   

# with engine.connect() as conn:
#     conn.execute(text("""
#         UPDATE loan_predictions 
#         SET prediction = 'Rejected'
#         WHERE id = 1
#     """))
#     conn.commit()
#     print("✅ Updated successfully!")

# with engine.connect() as conn:
#     conn.execute(text("""
#         DELETE FROM loan_predictions 
#         WHERE id = 2
#     """))
#     conn.commit()
#     print("✅ Deleted successfully!")     

import pandas as pd 

with engine.connect() as conn:
    df = pd.read_sql("SELECT * FROM loan_predictions ORDER BY created_at DESC", conn)
    print(df)   
# with engine.connect() as conn:
#     df = pd.read_sql("""
#         SELECT table_name 
#         FROM information_schema.tables 
#         WHERE table_schema = 'public'
#     """, conn)
#     print(df)
# with engine.connect() as conn:
#     df = pd.read_sql("""
#         SELECT * FROM loan_predictions 
#         ORDER BY created_at DESC
#     """, conn)
#     print(df)
#     print(df.columns.tolist())     
# with engine.connect() as conn:
#     conn.execute(text("DROP TABLE loan_predictions"))
#     conn.commit()
#     print("✅ Old table dropped!")

