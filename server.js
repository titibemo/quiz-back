require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');

process.env.ACCESS_TOKEN_SECRET;

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded());

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3020']
}))

let session = require('express-session')

app.use(session({ secret: '$2y$10$xMkfOk/iYD69yU93pS.hUensoqZXrDa9DCHKFvyURdOlYbDIRVngu' }));

 
app.use(cookieParser());

const flash = require('connect-flash'); 
app.use(flash()) 

/*
app.use(function (req, res, next) {
    req.session.message = req.session.message || { error: [], success: [], info: [] };
    app.locals.message  = req.session.message;
   })
*/




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
  
const userRoutes = require('./routes/users')
const quizRoutes = require('./routes/quiz.js')
const questionRoutes = require('./routes/question.js')

app.use('/api/users/register', userRoutes);
app.use('/api/users/login', userRoutes);
app.use('/api/users/logout', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/getUserById/:id', userRoutes);
app.use('/api/users/eraseUser/:id', userRoutes);
app.use('/api/users/modifyUser/:id', userRoutes);
app.use('/api/users/getCookie', userRoutes);

app.use('/api/users/bbb', userRoutes);

app.use('/api/quiz', quizRoutes);
app.use('/api/quiz/listQuiz', quizRoutes);
app.use('/api/quiz/listAvailableQuiz', quizRoutes);
app.use('/api/quiz/eraseQuiz', quizRoutes);
app.use('/api/quiz/getQuizById/:id', quizRoutes);
app.use('/api/quiz/modifyQuiz/:id', quizRoutes);
app.use('/api/quiz/availableQuiz', quizRoutes);
app.use('/api/quiz/validateUserQuiz/:id', quizRoutes);

app.use('/api/quiz/success', quizRoutes);
app.use('/api/quiz/display', quizRoutes);

app.use('/api/question', questionRoutes);
app.use('/api/question/validateQuestions/:id', questionRoutes);
app.use('/api/question/showQuestions/:id', questionRoutes);


/* TEST */

app.use((req, res, next) => {
    if (req.cookies.flashMessage) {
      res.locals.flashMessage = req.cookies.flashMessage;
      res.clearCookie('flashMessage'); // Une fois le message affiché, on supprime le cookie
    } else {
      res.locals.flashMessage = null;
    }
    next();
  });
  
  // Route pour définir un message flash
  app.get('/success', (req, res) => {
    // Définir un message flash dans un cookie
    res.cookie('flashMessage', 'Opération réussie !');
    res.redirect('/display');
  });
  
  // Route pour afficher la vue avec le message flash dans une balise <p>
  app.get('/display', (req, res) => {
    res.render('display'); // Affiche la page "display.ejs"
  });


module.exports = app;



