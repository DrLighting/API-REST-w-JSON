const swggerAutogen = require('swagger-autogen')()

output = './swagger.json'
endpoints = ['./index.js']

const doc = {
    "info": {
    "version": "1.0.0",
    "title": "API REST Games Compilation",
    "description": "Uma API REST que server como compliado de jogos e suas publisher tendo como storage Json"
  }
}

swggerAutogen(output, endpoints, doc)