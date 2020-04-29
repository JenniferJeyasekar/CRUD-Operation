localDynamo = require('local-dynamo');
localDynamo.launch({
    port: 8000,
    cors: '*',
    sharedDb: true,
    dir: 'C:\\Temp\\Github\\CRUD-Operation\\Server - src',
    heap: '512m'
});