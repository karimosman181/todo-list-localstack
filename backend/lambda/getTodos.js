const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
});

exports.handler = async () => {
  const params = {
    TableName: "Todos",
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not fetch todos" }),
    };
  }
};
