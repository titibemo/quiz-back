const cors = require('cors');



require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());



app.use(cors);
  app.use(cors({
    origin: "http://localhost:8080"
  }))
 


const getDatabase = require('./config/db.js');
let connexionDatabase = getDatabase();
//console.log("a =", a, "test =", test, "fct test =", test());



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});



/*
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    })
    
    
    
    */
   
   
connexionDatabase.connect()

/*
connection.connect()
*/

connexionDatabase.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connexionDatabase.end()

/*
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
*/








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
*/


const userRoutes = require('./routes/users')

app.use('/api/users', userRoutes);
app.use('/api/users/register', userRoutes);
app.use('/api/users/login', userRoutes)



