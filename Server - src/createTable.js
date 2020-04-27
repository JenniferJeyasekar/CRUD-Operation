// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'ap-south-1', endpoint: 'http://localhost:8000' });
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB();
var params = {
    TableName: 'Employee',
    KeySchema: [
        {
            AttributeName: 'EmpId',
            KeyType: 'HASH'
        },
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'EmpId',
            AttributeType: 'N'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },

    StreamSpecification: {
        StreamEnabled: false
    }
};

// Call DynamoDB to create the table
ddb.createTable(params, function (err, data) {
    if (err) {
        console.log("Error", JSON.stringify(err, null, 2));
    } else {
        console.log("Table Created", JSON.stringify(data, null, 2));
    }
});




