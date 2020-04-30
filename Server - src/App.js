const express = require('express')
const app = express()
const port = 5000
var cors = require("cors")
const methodOverride = require('method-override')
var AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1', endpoint: 'http://localhost:8000' });
var ddb = new AWS.DynamoDB.DocumentClient();
//Sets header 
app.all("/*", function (req, res, next) {
    //Allow all websites to connect
    res.header("Access-Control-Allow-Origin", "*");
    //Set to true to include cookies in the sent request
    res.header("Access-Control-Allow-Credentials", "true");
    //Allow request headers
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, token, Origin, Accept, Authorization, Content-Type, X-Requested-With");
    //Allow request methods
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    return next();
});
//Retives all the data
app.get('/', cors(), function (req, res, next) {
    var params = {
        TableName: "Employee"
    };
    console.log("Scanning Customer list table.");
    ddb.scan(params, onScan);
    function onScan(err, data) {
        if (err) { console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2)); }
        else {
            res.send(data),
                console.log("Scan succeeded.");
        }
    }
});
//Retrives the requested data
app.get('/employee', cors(), function (req, res, next) {
    const id = parseInt(req.query.id);
    console.log(id);
    var table = "Employee";

    var params = {
        TableName: table,
        Key: {
            "EmpId": id
        },
        ConditionExpression: "#EmpId <> :id"
    }
    console.log("sending data");
    ddb.get(params, function (err, data) {
        console.log("In get function");
        try {
            if (err) {
                res.send(err);
                console.log("Error", JSON.stringify(err, null, 2));
            } else {
                res.send(data);
                console.log("Data Read", JSON.stringify(data, null, 2));
            }
        }
        catch (err) {
            res.send(err);
            console.log(err);
        }
    });
})
//Loads data into the table
app.post('/create', cors(), function (req, res, next) {
    console.log("Importing Customer into DynamoDB. Please Wait.");
    const EmpId = parseInt(req.query.id);
    console.log(EmpId);
    const EmpFname = req.query.fname;
    console.log(EmpFname);
    const EmpSname = req.query.sname;
    console.log(EmpSname);
    const Email = req.query.email;
    console.log(Email);
    const DOB = req.query.dob;
    console.log(DOB);
    const Gender = req.query.gender;
    console.log(Gender);
    var params = {
        TableName: "Employee",
        Item: {
            "EmpId": EmpId,
            "EmpFname": EmpFname,
            "EmpSurname": EmpSname,
            "Email": Email,
            "DOB": DOB,
            "Gender": Gender
        }
    };
    ddb.put(params, function (err, data) {
        try {
            if (err) {
                console.log("Error", JSON.stringify(err, null, 2));
            } else {
                console.log("Sending the loaded data");
                res.send("Data added successfully!!")
                console.log("Data Added", JSON.stringify(data, null, 2));
            }
        }
        catch (err) {
            res.send(err);
            console.log(err);
        }
    });
});
//Updates an item in the table
app.put('/employee', function (req, res) {
    console.log("Update Data");
    //res.send('Got a PUT request at /user');

    const id = parseInt(req.query.id);
    console.log(id);
    const fname = req.query.fname;
    console.log(fname);
    const sname = req.query.sname;
    console.log(sname);
    const email = req.query.email;
    console.log(email);
    const dob = req.query.dob;
    console.log(dob);
    const gender = req.query.gender;
    console.log(gender);
    var params = {
        TableName: "Employee",
        Key: {
            "EmpId": id
        },
        UpdateExpression: "set EmpFname = :fname, EmpSurname = :sname,Email = :email, DOB = :dob,Gender = :gender",
        ExpressionAttributeValues: {
            ":fname": fname,
            ":sname": sname,
            ":email": email,
            ":dob": dob,
            ":gender": gender
        },
        ReturnValues: "ALL_NEW"
    };
    ddb.update(params, function (err, data) {
        if (err) {
            console.log("Error", JSON.stringify(err, null, 2));
        } else {
            res.send("Data updated successfully!!");
            console.log("Data updated", JSON.stringify(data, null, 2));
        }
    });
});
//Deletes an item in the table
var docClient = new AWS.DynamoDB();
app.delete('/employee', function (req, res, next) {
    console.log("Start Delete Op");
    const id = parseInt(req.query.id);
    console.log(id);
    var table = "Employee";
    var params = {
        TableName: table,
        Key: {
            "EmpId": { N: String(id) }
        }
    }
    console.log("Deleting data");
    docClient.deleteItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            res.send("Data deleted successfully!!");
            console.log("Data Deleted", data);
        }
    });
});
//Server is listening on port 5000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))