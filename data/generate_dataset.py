import json
import os

# Directory that contains pdf files
source_dir = "pdf_downloads"
destination_name = "dataset.json"


def generate_dataset(source, destination_name):
    for filename in os.listdir(source):
        print(os.path.join(source, filename))  # this just prints the filename
        # Actually do the json generation


if __name__ == "__main__":
    print("Generating dataset from " + str(source_dir) + " to " + str(destination_name))
    generate_dataset(source_dir, destination_name)
