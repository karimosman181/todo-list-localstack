const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
});

exports.handler = async (event) => {
  const { task } = JSON.parse(event.body);
  const id = uuidv4();

  const params = {
    TableName: "Todos",
    Item: {
      id,
      task,
      completed: false,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ id, task, completed: false }),
    };
  } catch (error) {
    console.error("Error creating todo:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not create todo" }),
    };
  }
};
