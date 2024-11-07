import express from 'express'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000


// Access levels : L1 - public, L2 - restricted, L3 - full access
// {
//     date: string,
//     title: string,
//     technology: string,
//     content: { type: string | shell | image, access_level: L1 | L2 | l3 data: object }
// }

// {
//     "date": "2024-11-07",
//     "title": "Example of Mixed Content Types",
//     "technology": "API, YAML, SQL, Bash, Images",
//     "content": [
//         {
//             "type": "yaml",
//             "access_level": "L1",
//             "data": {
//                 "content": "version: \"3.8\"\n\nservices:\n  hbase:\n    image: harisekhon/hbase:1\n    hostname: hbase-master\n    container_name: hbase-master\n    ports:\n    - \"16000:16000\"\n    - \"16010:16010\"\n    - \"16020:16020\"\n    - \"16030:16030\"\n    volumes:\n    - hbase-data:/hbase-data\n    network_mode: host\n    ulimits:\n      nofile:\n        soft: 65536\n        hard: 65536\n    depends_on:\n    - zookeeper\n    profiles:\n    - linux\n\n  akhq:\n    image: tchiotludo/akhq:0.25.1\n    container_name: job-akhq\n    environment:\n      AKHQ_CONFIGURATION: |\n        akhq:\n          connections:\n            mykafka:\n              properties:\n                bootstrap.servers: \"kafka:19092\"\n              schema-registry:\n                url: \"http://schema-registry:8082\"\n    ports:\n    - \"8000:8080\"\n\nvolumes:\n  hbase-data:\n",
//                 "language": "yaml",
//                 "description": "Docker Compose configuration for HBase and AKHQ services"
//             }
//         },
//         {
//             "type": "shell",
//             "access_level": "L2",
//             "data": {
//                 "content": "#!/bin/bash\n\njq -rR '\n    . as $json |\n    try (fromjson | \"\\u001b[34m\\(.['@timestamp']) \\u001b[32m\\(.log.level)\\u001b[0m \\(.message)\")\n    catch ($json)\n'\n",
//                 "language": "bash",
//                 "description": "A Bash script to format JSON logs for easy reading in the terminal"
//             }
//         },
//         {
//             "type": "sql",
//             "access_level": "L2",
//             "data": {
//                 "content": "SELECT round(100.0 * sum(blks_hit) / (sum(blks_hit) + sum(blks_read)), 2) as cache_hit_ratio FROM pg_stat_database;",
//                 "language": "sql",
//                 "description": "SQL query to calculate PostgreSQL cache hit ratio"
//             }
//         },
//         {
//             "type": "json",
//             "access_level": "L1",
//             "data": {
//                 "content": "{\"@timestamp\":\"2024-08-12T10:11:44.61+02:00\",\"message\":\"middleware-republish: partitions assigned: []\",\"log\":{\"level\":\"INFO\",\"logger\":\"org.springframework.kafka.listener.KafkaMessageListenerContainer\"},\"process\":{\"thread\":{\"name\":\"org.springframework.kafka.KafkaListenerEndpointContainer#1-1-C-1\"}},\"error\":{\"root_cause\":{}}}",
//                 "language": "json",
//                 "description": "Log entry in JSON format from a Kafka listener"
//             }
//         },
//         {
//             "type": "image",
//             "access_level": "L1",
//             "data": {
//                 "url": "https://example.com/images/sample-image.png",
//                 "alt_text": "A sample image for display",
//                 "width": 800,
//                 "height": 600,
//                 "mime_type": "image/png",
//                 "description": "Sample image showcasing the API’s image support"
//             }
//         }
//     ]
// }


const learnings: Learning[] = [
    {
        date: '20.10.2024',
        title: 'Efficiently converting multiple JPEG images into a single PDF file',
        technology: '#Shell',
        content: `Use this script to convert multiple JPEG images to one PDF file:\n\nsudo pacman -S img2pdf\n\nimg2pdf *.jpg -o image_%d.pdf`
    },
    {
        date: '18.10.2024',
        title: 'Finished "TypeScript Essential Training" LinkedIn course',
        technology: '#TypeScript',
        content: `In this course I enhanced my existing skills:\n\n- Integration: Learned to add TypeScript to my projects easily.\n- Type Safety: Improved my understanding of basic types, interfaces, and generics.\n- Advanced Types: Learned about union types and keyof/typeof operators.\n- Decorators: Discovered how to use method and class decorators.\n- Module Management: Enhanced my skills in importing/exporting code and using ambient modules.`
    },
    {
        date: '15.10.2024',
        title: 'Use shared_buffers to Enhance PostgreSQL Performance',
        technology: '#PostgreSQL',
        content: `One of our databases was having performance issues, and it was not clear at first why it was slow. We tried different steps to improve it, such as increasing memory and removing CPU limits in Kubernetes for the pod.\nOne big improvement was changing the shared_buffers setting from the default 128MB to 1GB. This change increased the cache hit ratio from about 56% to 92.77%. As a result, queries ran faster, and the system read less data from the disk.\n\nThis SQL query shows cache hit ratio:\n\nSELECT round(100.0 * sum(blks_hit) / (sum(blks_hit) + sum(blks_read)), 2) as cache_hit_ratio \nFROM pg_stat_database;`
    },
    {
        date: '15.10.2024',
        title: 'Use shared_buffers to Enhance PostgreSQL Performance',
        technology: '#PostgreSQL',
        content: `One of our databases was having performance issues, and it was not clear at first why it was slow. We tried different steps to improve it, such as increasing memory and removing CPU limits in Kubernetes for the pod.\nOne big improvement was changing the shared_buffers setting from the default 128MB to 1GB. This change increased the cache hit ratio from about 56% to 92.77%. As a result, queries ran faster, and the system read less data from the disk.\n\nThis SQL query shows cache hit ratio:\n\nSELECT round(100.0 * sum(blks_hit) / (sum(blks_hit) + sum(blks_read)), 2) as cache_hit_ratio \nFROM pg_stat_database;`
    },
    {
        date: '15.10.2024',
        title: 'Use shared_buffers to Enhance PostgreSQL Performance',
        technology: '#PostgreSQL',
        content: `One of our databases was having performance issues, and it was not clear at first why it was slow. We tried different steps to improve it, such as increasing memory and removing CPU limits in Kubernetes for the pod.\nOne big improvement was changing the shared_buffers setting from the default 128MB to 1GB. This change increased the cache hit ratio from about 56% to 92.77%. As a result, queries ran faster, and the system read less data from the disk.\n\nThis SQL query shows cache hit ratio:\n\nSELECT round(100.0 * sum(blks_hit) / (sum(blks_hit) + sum(blks_read)), 2) as cache_hit_ratio \nFROM pg_stat_database;`
    },
    {
        date: '15.10.2024',
        title: 'Use shared_buffers to Enhance PostgreSQL Performance',
        technology: '#PostgreSQL',
        content: `One of our databases was having performance issues, and it was not clear at first why it was slow. We tried different steps to improve it, such as increasing memory and removing CPU limits in Kubernetes for the pod.\nOne big improvement was changing the shared_buffers setting from the default 128MB to 1GB. This change increased the cache hit ratio from about 56% to 92.77%. As a result, queries ran faster, and the system read less data from the disk.\n\nThis SQL query shows cache hit ratio:\n\nSELECT round(100.0 * sum(blks_hit) / (sum(blks_hit) + sum(blks_read)), 2) as cache_hit_ratio \nFROM pg_stat_database;`
    },
]

// (Cross-Origin Resource Sharing)
app.use(cors()) 
app.use(express.json())

let counter = 0
app.get('/api/learnings', (req,res) => {
    counter ++
    console.log('learnings request!' + counter)
    res.status(200).json(learnings)
    
})


app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT} `)
})