# Description

## Project Structure

## Local development

### Development 

How to create a learnings entry 
```sh
curl -X POST http://localhost:3000/api/learnings \
-H "Content-Type: application/json" \
-d '{
    "date": "2024-11-07",
    "title": "Example of Mixed Content Types",
    "hashtag": ["API, YAML, SQL, Bash, Images"],
    "content": [
        {
            "type": "yaml",
            "access_level": "L1",
            "data": {
                "content": "Data",
                "language": "yaml",
                "description": "Docker Compose configuration for HBase and AKHQ services"
            }
        }
    ]
}'

```

Better name for the repository: alex-journey-docs | al-journey-docs

