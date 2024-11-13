import json
import logging
import os

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)

def populate_data(data):
    logging.info("Start populating data.")
    req_counter = 0
    req_counter +=1
    for entry in data:
        
        logging.info("Sending request `%s` to the API", req_counter)
        req_counter +=1


    logging.info("Data population complete.")

def read_data_from_file():
    logging.info("Start reading data from file.")

    script_directory = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(script_directory, 'learnings.json')
    with open(file_path, 'r') as file:
        data = json.load(file)

    logging.info("Finished reading data.")

    return data

if __name__ == '__main__':
    data = read_data_from_file();

    populate_data(data)