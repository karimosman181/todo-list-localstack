const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  endpoint: "http://localstack:4566",
  region: "us-east-1",
});

exports.handler = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: "Todos",
    Key: { id },
  };

  try {
    await dynamoDb.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Todo deleted successfully" }),
    };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not delete todo" }),
    };
  }
};
