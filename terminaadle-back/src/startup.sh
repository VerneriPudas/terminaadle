cd data/
#./download_files.sh https://otit.fi/toiminta/terminaali/verkkoversiot/ &&\
python generate_dataset.py

cd ..
exec uvicorn main:app --host 0.0.0.0 --port 8080