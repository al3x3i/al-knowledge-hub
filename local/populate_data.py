import json
import logging
import http.client
import os
import yaml

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)

url = '127.0.0.1'
port = 3000
path = '/api/learnings'

def populate_data(data):
    logging.info("Start populating data.")
    req_counter = 0
    req_counter +=1
    success_request = 0
    failed_request= 0
    for entry in data:

        payload  = json.dumps({
            "date": entry['date'],
            'title': entry['title'],
            'hashtag': entry['hashtag'],
            'content': entry['content']
        })
        
        conn = http.client.HTTPConnection(url, port)
        headers = {'Content-Type': 'application/json'}
        try:
            logging.info("Sending request `%s` to the API", req_counter)
            req_counter +=1

            conn.request('POST', path, body=payload, headers=headers)
            response = conn.getresponse()
            res_data = response.read().decode('utf-8')

            if (response.status == 201):
                logging.info("Successfully api request for: %s", entry['title'])
                success_request+=1;
            else:
                logging.error("Failed api status %s request for %s", entry['title'], response.status)
                failed_request +=1   


        except Exception as e:
            logging.error('Error while sending api request, payload: %s', payload)
        finally:
            conn.close()

    logging.info("Data population complete.\n")
    logging.info("Successful requests: %s", success_request)
    logging.info("Failed requests: %s", failed_request)
    

def read_data_from_file():
    logging.info("Start reading data from file.")

    script_directory = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(script_directory, 'learnings.yaml')

    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)

    logging.info("Finished reading data.")

    return data

if __name__ == '__main__':
    data = read_data_from_file();

    populate_data(data)