import os
import tempfile
import zipfile

from api_client import call_anthropic_api
from auth import (
    verify_token,
)
from config import get_api_key
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from text_processing import combine_texts, consolidate_texts, group_text_into_batches

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload-zip")
async def upload_zip(file: UploadFile = File(...), token: str = Depends(verify_token)):
    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            zip_path = os.path.join(temp_dir, file.filename)
            with open(zip_path, "wb") as f:
                contents = await file.read()
                f.write(contents)

            with zipfile.ZipFile(zip_path, "r") as zip_ref:
                zip_ref.extractall(temp_dir)

            pdf_texts, csv_texts = consolidate_texts(temp_dir)
            combined_text = combine_texts(pdf_texts, csv_texts)
            batches = group_text_into_batches(
                combined_text.splitlines(keepends=True), target_batch_size=86000
            )

            headers = {
                "x-api-key": get_api_key(),
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            }
            prechart = call_anthropic_api(batches, headers)

        return JSONResponse(
            content={
                "message": "File processed and API called successfully",
                "batches_processed": len(batches),
                "prechart": prechart,
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.get("/health")
async def health_check():
    return JSONResponse(
        status_code=200,
        content={
            "message": "File processed and API called successfully",
            "batches_processed": 0,
            "prechart": "hi",
        },
    )
