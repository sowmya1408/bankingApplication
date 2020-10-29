//require mongoose module
const mongoose = require('mongoose');
//require chalk module to give colors to console text
 const chalk = require('chalk');
//require database URL from properties file
const dbURL = require('./properties.js').DB;
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;
//export this function and imported by server.js
module.exports =function(){
    mongoose.connect(dbURL);
    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", dbURL));
    });
    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });
    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}
let connection;
const getConnection = async () => {
    if (!connection) {
        // 2. Insert the correct db url
        // Your URL should be mongodb://localhost/<database name>, ie. mongodb://localhost/<database name>
        connection = await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
    }
    return connection;
}
module.exports = {
    getConnection: getConnection
}