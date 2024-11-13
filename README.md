# Description

## Project Structure

### Leaning data model
```json
Access levels : L1 - public, L2 - restricted, L3 - full access
{
    "date": "string",
    "title": "string",
    "hashtag": "string[]",
    "content": "{ type: string | shell | image, access_level: L1 | L2 | l3 data: object }"
}

{
    "date": "2024-11-07",
    "title": "Example of Mixed Content Types",
    "hashtag": ["API, YAML, SQL, Bash, Images"],
    "content": [
        {
            "type": "yaml",
            "access_level": "L1",
            "data": {
                "content": "version: \"3.8\"\n\nservices:\n  hbase:\n    image: harisekhon/hbase:1\n    hostname: hbase-master\n    container_name: hbase-master\n    ports:\n    - \"16000:16000\"\n    - \"16010:16010\"\n    - \"16020:16020\"\n    - \"16030:16030\"\n    volumes:\n    - hbase-data:/hbase-data\n    network_mode: host\n    ulimits:\n      nofile:\n        soft: 65536\n        hard: 65536\n    depends_on:\n    - zookeeper\n    profiles:\n    - linux\n\n  akhq:\n    image: tchiotludo/akhq:0.25.1\n    container_name: job-akhq\n    environment:\n      AKHQ_CONFIGURATION: |\n        akhq:\n          connections:\n            mykafka:\n              properties:\n                bootstrap.servers: \"kafka:19092\"\n              schema-registry:\n                url: \"http://schema-registry:8082\"\n    ports:\n    - \"8000:8080\"\n\nvolumes:\n  hbase-data:\n",
                "language": "yaml",
                "description": "Docker Compose configuration for HBase and AKHQ services"
            }
        },
        {
            "type": "shell",
            "access_level": "L2",
            "data": {
                "content": "#!/bin/bash\n\njq -rR '\n    . as $json |\n    try (fromjson | \"\\u001b[34m\\(.['@timestamp']) \\u001b[32m\\(.log.level)\\u001b[0m \\(.message)\")\n    catch ($json)\n'\n",
                "language": "bash",
                "description": "A Bash script to format JSON logs for easy reading in the terminal"
            }
        },
        {
            "type": "sql",
            "access_level": "L2",
            "data": {
                "content": "SELECT round(100.0 * sum(blks_hit) / (sum(blks_hit) + sum(blks_read)), 2) as cache_hit_ratio FROM pg_stat_database;",
                "language": "sql",
                "description": "SQL query to calculate PostgreSQL cache hit ratio"
            }
        },
        {
            "type": "json",
            "access_level": "L1",
            "data": {
                "content": "{\"@timestamp\":\"2024-08-12T10:11:44.61+02:00\",\"message\":\"middleware-republish: partitions assigned: []\",\"log\":{\"level\":\"INFO\",\"logger\":\"org.springframework.kafka.listener.KafkaMessageListenerContainer\"},\"process\":{\"thread\":{\"name\":\"org.springframework.kafka.KafkaListenerEndpointContainer#1-1-C-1\"}},\"error\":{\"root_cause\":{}}}",
                "language": "json",
                "description": "Log entry in JSON format from a Kafka listener"
            }
        },
        {
            "type": "image",
            "access_level": "L1",
            "data": {
                "url": "https://example.com/images/sample-image.png",
                "alt_text": "A sample image for display",
                "width": 800,
                "height": 600,
                "mime_type": "image/png",
                "description": "Sample image showcasing the API’s image support"
            }
        }
    ]
}
```

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

