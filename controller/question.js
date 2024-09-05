let jwt = require("jsonwebtoken");
const getDatabase = require('../config/db');
const bcrypt = require('bcrypt');

exports.validateQuestions = (req, res,) =>{
    /*
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
    
   
   const { idQuestion, questions, answers, correctAnswer } = req.body

let id = req.params.id

  
    const sql =`INSERT INTO question (id_question, name_question, answers_question, correct_answer) VALUES (?, ?, ?, ?);`
    connexionDatabase.query(sql, [idQuestion, questions, answers, correctAnswer], (err,result) =>{
        if(err){
            return res.status(500).send(err)
            }
            else{

            res.status(201);
            res.redirect('http://localhost:8080/admin/les-quiz');
            
            }
            })
*/



    res.status(201).send({
       /* idQuestion : idQuestion,
        questions : questions,
        answers : answers,
        correctAnswer : correctAnswer,*/
        id: id
    })





}

