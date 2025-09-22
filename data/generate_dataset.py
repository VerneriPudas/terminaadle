import json
import os

source_dir = "pdf_downloads"
destination_name = "dataset.json"


def generate_dataset(source, destination_name):
    files = []
    # Files with the new index style terminaali<yy><ee>
    edition_max = 10
    year_max = 25
    name = "terminaali"
    format = ".pdf"

    year = 2011
    while year < year_max + 1:
        edition = 0
        while edition < edition_max + 1:
            filename = name + str(year)[-2:] + str(edition).zfill(2) + format
            if os.path.isfile(os.path.join(source, filename)):
                files.append({"filename": filename, "year": year, "edition": edition})
            edition += 1
        year += 1

    # Files with older style indexing terminaali<ee><yy>
    # Edition numbers are not zeropadded in the older style
    year = 1988
    year_max = 2011
    while year < year_max + 1:
        edition = 0
        while edition < edition_max + 1:
            filename = name + str(edition) + str(year)[-2:] + format
            if os.path.isfile(os.path.join(source, filename)):
                files.append({"filename": filename, "year": year, "edition": edition})
            edition += 1
        year += 1

    # Handling pecial editions goes here
    # TODO

    # JSONify
    with open(destination_name, "w", encoding="utf-8") as f:
        json.dump(files, f, indent=4)


if __name__ == "__main__":
    print("Generating dataset from " + str(source_dir) + " to " + str(destination_name))
    generate_dataset(source_dir, destination_name)
