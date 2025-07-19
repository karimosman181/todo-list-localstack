const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
});

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const { task, completed } = JSON.parse(event.body);

  const params = {
    TableName: "Todos",
    Key: { id },
    UpdateExpression: "set task = :task, completed = :completed",
    ExpressionAttributeValues: {
      ":task": task,
      ":completed": completed,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error("Error updating todo:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update todo" }),
    };
  }
};
