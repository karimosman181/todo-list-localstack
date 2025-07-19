const AWS = require("aws-sdk");

// Configure AWS SDK to point to LocalStack DynamoDB
AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
});

const dynamodb = new AWS.DynamoDB();

async function createTodosTable() {
  const params = {
    TableName: "Todos",
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S", // String
      },
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH", // Partition key
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  try {
    console.log("Creating Todos table...");
    await dynamodb.createTable(params).promise();
    console.log("Todos table created successfully!");
  } catch (err) {
    if (err.code === "ResourceInUseException") {
      console.log("Todos table already exists.");
    } else {
      console.error("Error creating Todos table:", err);
      process.exit(1);
    }
  }
}

createTodosTable();
