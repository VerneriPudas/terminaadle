import json
import random
import os
from pypdf import PdfReader
from pdf2image import convert_from_path

def get():
    pdf_dir = "..//..//data//pdf_downloads"
    json_file = "..//..//data//dataset.json"
    image_path = "random.jpg"

    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    random_item = random.choice(data)
    filename = random_item["filename"]
    path_to_pdf = os.path.join(pdf_dir, filename)

    reader = PdfReader(path_to_pdf)
    num_pages = len(reader.pages)

    random_page_num = random.randint(0, num_pages - 1)
    print("Page " + str(random_page_num + 1) + " from " + filename)
    
    # Answers text portion as json
    answer_data = {
        "page": random_page_num + 1,
        "edition": random_item["edition"],
        "year": random_item["year"],
        "image_url": f"http://localhost:8000/{image_path}"
    }

    with open('answer.json', "w") as answer_file:
        json.dump(answer_data, answer_file, indent=4)
    
    # Image
    images = convert_from_path(
        path_to_pdf, first_page=random_page_num + 1, last_page=random_page_num + 1
    )
    output_file = (
        f"{image_path}"
    )
    images[0].save(output_file, "JPEG")
    print("Saved: ", output_file)

if __name__ == "__main__":
    get()
    
