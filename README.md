# To-Do App (LocalStack + AWS Sim)

## Stack

- Node.js
- AWS Lambda (Simulated via LocalStack)
- DynamoDB (Simulated via LocalStack)

## Setup Instructions

1. **Start LocalStack**

````bash
docker-compose up

2. **Deploy Backend**
```bash
cd backend && npm install && node scripts/create-tables.js && sls deploy --stage local

3. **Run Frontend**
```bash
cd ../frontend && npm install && npm start
````
