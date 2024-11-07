# AL Knowledge Learnings
This project is a personal knowledge sharing website where I list and manage my daily learnings. 
The site is built with React, TypeScript, and Vite for the client side, and the server is a TypeScript-based Node.js 
application that serves dummy data.

## Getting Started
These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites
- Node.js
- npm

## Installation
Clone this repository and install the dependencies for both the client and server.
```shell
  npm install client
  npm install server
```

## Usage
To start the client and server, run the following commands in separate terminal windows.
```shell
  # Run mongo DB on your local machine
  cd local && docker-compose up   
  # Start client
  npm run client
  
  # Start server
  npm run server
```
## Development
### VS Code Configuration
This project includes configurations to enhance your development experience in Visual Studio Code:
Launch Configurations: Available in .vscode/launch.json, which allow you to debug both the server and client efficiently.

### Database Connection
Database Connection: The project uses Mongoose, an ODM (Object Document Mapper) for MongoDB, to manage data in MongoDB. 
The connection is made via a URI that includes the admin username and password.

### Populate date to the database by script
Details on populating data are documented in [how-to-insert-date.md](local/how-to-insert-date.md)

This script helps to restore records in database from file:
`curl -X DELETE localhost:3000/api/learnings && python ./local/populate_data.py && npm run client`


### Populate date by running the following command
How to create a learnings entry
Note:
- The date format is YYYY-MM-DD
- The title is a string
- The hashtag is an array of strings
- The type specifies the content type: MARKDOWN, TEXT, IMAGE
- The access_level specifies the level of access for the content: L1 public, L2 restricted, L3 private
- The MARKDOWN and IMAGE type has 'content' as a key in the data object
- The IMAGE type has 'url', 'alt_text', 'width', 'height', 'mime_type', and 'description' as keys in the data object

```shell
  curl -X POST http://localhost:3000/api/learnings \
  -H "Content-Type: application/json" \
  -d '{
      "date": "2024-11-07",
      "title": "Example of Mixed Content Types",
      "hashtag": ["API, YAML, SQL, Bash, Images"],
      "content": [
          {
              "type": "MARKDOWN | TEXT | IMAGE",
              "access_level": "L1",
              "data": {
                  "content": "Write your content here",
                  "url": "https://example.com/images/sample-image.png",
                  "alt_text": "A sample image for display",
                  "width": 800,
                  "height": 600,
                  "mime_type": "image/png",
                  "description": "Sample image showcasing the API’s image support"
              }
          }
      ]
  }'
```

## Deployment
### Client deployment
The client is deployed to GitHub Pages.
The client deployment can be done without pushing the changes to the main branch.
To deploy, use the following npm command:
```shell
  npm run deploy:client
```

### Server deployment
The server is deployed manually on [Render.com](https://dashboard.render.com/).
First push the changes to the main branch, and then deploy the server from the Render dashboard.

### Render Dummy Server
The server is deployed manually on [Render.com](https://dashboard.render.com/).
The render-dummy server is a lightweight Express.js application primarily used for development testing.

It maintains a main server live by sending a request to the main server every 1-9 minutes.
