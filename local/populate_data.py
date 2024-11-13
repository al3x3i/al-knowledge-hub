import json
import logging
import http.client
import os

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)


url = 'localhost:3000/api/learnings'

def populate_data(data):
    logging.info("Start populating data.")
    req_counter = 0
    req_counter +=1
    for entry in data:

        payload  = json.dumps({
            "date": entry['date'],
            'title': entry['title'],
            'hashtag': entry['hashtag'],
            'content': entry['content']
        })
        
        con = http.client.HTTPConnection(url)
        headers = {'Content-Type': 'application/json'}
        try:
            logging.info("Sending request `%s` to the API", req_counter)
            req_counter +=1

            conn.request('POST', payload, headers)
            response = conn.getresponse()
            res_data = response.read().decode('utf-8')

            if (res_data.status == '201'):
                logging.info("Successfully api request for: %s", entry['title'])
            else:
                logging.error("Failed api status %s request for %s", entry['title'], response.status)    


        except Exception as e:
            logging.error('Error while sending api request, payload: %s', payload)
        finally:
            conn.close()

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