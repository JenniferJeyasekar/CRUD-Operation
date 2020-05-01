localDynamo = require('local-dynamo');
localDynamo.launch({
    port: 8000,
    cors: '*',
    sharedDb: true,
    dir: process.cwd(),
    heap: '512m'
});