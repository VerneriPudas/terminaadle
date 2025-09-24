import base64
import json
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn
import get_random

app = FastAPI()

@app.get("/generate-image")
async def get_data():
    """
    Generates a new image and JSON file, then returns them as a single JSON response.
    """
    try:
        # Step 1: Call the generation script
        get_random.get()

        # Step 2: Read the generated files
        with open("random.jpg", "rb") as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode("utf-8")

        with open("answer.json", "r") as json_file:
            answer_data = json.load(json_file)

        # Step 3: Combine them into a single response
        response_data = {
            "image_base64": encoded_image,
            "answer_data": answer_data
        }

        # Step 4: Return the combined JSON response
        return JSONResponse(content=response_data)

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

if __name__ == "__main__":
    uvicorn.run("backend:app", host="0.0.0.0", port=8000, reload=True)
    
