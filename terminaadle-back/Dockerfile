FROM python:3.11 AS builder
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir uvicorn

FROM python:3.11
ENV PYTHONBUFFERED 1

WORKDIR /app

RUN apt update && \
    apt install -y wget && \
    apt install -y poppler-utils && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

COPY . .

EXPOSE 8080
CMD ["bash", "startup.sh"]