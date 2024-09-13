require('dotenv').config();
const connexionDatabase = () => { 
    const mysql = require('mysql2')
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })   
    return connection;
}

module.exports = connexionDatabase;




/* test
connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
*/

/* ------------------ code doc working ----------------------------- */

/*
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
*/



/* ------------------------------ code beginning ------------------------------------ */

/*


const mysql = require('mysql2');

let db = null;

const connexionDatabase = async () =>{
    if (db) {
        console.log('Already connected to the database');
        return db;
    }

    const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    });
    return db;
}

*/

/* ------------------------------ kevin code below ------------------------------------ */

/*
const database = db.connect((err) => {
    if(err){
        console.log('erreur');        
    }
    else{
        console.log("bravo thierry");
        return database;
    }
})

module.exports = connexionDatabase;

*/


/*

const mysql = require('mysql2/promise'); // Utilisation de 'mysql2/promise' pour les requêtes asynchrones
require('dotenv').config();

let db = null; // Initialisation de la variable pour la connexion

const connectToDb = async () => {
    if (db) {
        console.log('Already connected to the database');
        return db;
    }

    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD, // Ajout du mot de passe si nécessaire
            
        });

        console.log('Connected to database.');
        return db;
    } catch (error) {
        console.error('Database connection failed: ', error);
        db = null;
        return null;
    }
};

module.exports = connectToDb;

*/
    



