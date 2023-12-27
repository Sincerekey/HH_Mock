// Importing the 'mysql2' module to enable MySQL database connections
const mysql = require('mysql2');

// Creating a MySQL connection configuration
const connection = mysql.createConnection({
    // The host where the MySQL database is running (in this case, locally)
    host: 'booksdb.cjkww2me0e4m.us-east-1.rds.amazonaws.com',
    // The MySQL user 
    user: 'admin',    
    // The password for the specified user
    password: 'hopehacks',
    // The name of the MySQL database to connect to
    database: 'bookApp',
});

// Attempting to connect to the MySQL database using the configuration
connection.connect(function (err) {
    // If an error occurs during connection, throw an error
    if (err) throw err;    
    // Log a success message if connected without errors
    console.log('MySQL Database is Connected!!!!'); 
});

// Exporting the established MySQL connection 
module.exports = connection;