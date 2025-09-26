# Game Backend API

Minimal FastAPI backend for a web game. Serves a dynamically generated image and game data as a single JSON response.

### Prerequisites

* Python 3.7+
* `fastapi`, `uvicorn`, `pillow`

### Run server
```bash
python backend.py
```

### API Endpoint
```bash
GET /generate-image
URL: http://localhost:8000/generate-image
```

* Response

image_base64: "/base64imagedatablaablaablaa

answer_data:
```J́SON
{
    "page": 69,
    "edition": 420,
    "year": 1337,
    "image_url": "http://localhost:8000/random.jpg"
}
```
