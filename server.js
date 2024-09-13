const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');




require('dotenv').config();

process.env.ACCESS_TOKEN_SECRET;

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded());

app.use(cors({
  // TODO GOOD VALUE origin: "http://localhost:8080",
  origin: ['http://localhost:8080', 'http://localhost:3020']

}))
 
app.use(cookieParser());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API QUIZ',
            version: '0.0.1',
            description: "Venez souffrir dans des quiz d'une difficulté extrême",
            contact: {
                name: "titibemo"
            },
            servers : [{url: 'http://localhost:3020'}]
        },
    },
        apis: ['./controller/*.js']
    }


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const getDatabase = require('./config/db.js');
let connexionDatabase = getDatabase();
//console.log("a =", a, "test =", test, "fct test =", test());



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
  
connexionDatabase.connect()


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
const quizRoutes = require('./routes/quiz.js')
const questionRoutes = require('./routes/question.js')

app.use('/api/users', userRoutes);
app.use('/api/users/register', userRoutes);
app.use('/api/users/login', userRoutes);
app.use('/api/users/logout', userRoutes);
app.use('/api/users/getCookie', userRoutes);

app.use('/api/quiz', quizRoutes);
app.use('/api/quiz/listQuiz', quizRoutes);
app.use('/api/quiz/eraseQuiz', quizRoutes);
app.use('/api/quiz/getQuizById/:id', quizRoutes);
app.use('/api/quiz/modifyQuiz/:id', quizRoutes);

app.use('/api/question', questionRoutes);
app.use('/api/question/validateQuestions/:id', questionRoutes);
app.use('/api/question/showQuestions/:id', questionRoutes);


module.exports = app;



