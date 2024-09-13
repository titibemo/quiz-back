let jwt = require("jsonwebtoken");
const getDatabase = require('../config/db');
const bcrypt = require('bcrypt');

exports.validateQuestions = (req, res) =>{
    
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
    
   
   const { questions, answers, correctAnswer } = req.body
   //JSON.stringify(questions, answers, correctAnswer)
   
   let id = req.params.id
     let questionsJson = JSON.stringify(questions);
     let answersJson = JSON.stringify(answers);
     let correctAnswerJson = JSON.stringify(correctAnswer);

 
    //const sql =`INSERT INTO questions (name_question, answers_question, correct_answer) VALUES (?), (?), (?), (?);`
    const sql =`INSERT INTO questions (name_question, answers_question, correct_answer, id_quiz) VALUES (?,?,?,?);`

    //connexionDatabase.query(sql, [questions, answers, correctAnswer], (err,result) =>{
    connexionDatabase.query(sql, [questionsJson, answersJson, correctAnswerJson, id], (err,result) =>{
        if(err){
            return res.status(500).send(err)
            }
            else{

            res.status(201);
            //res.redirect('http://localhost:8080/admin');
        
            }
            })

}


exports.showQuestions = (req, res) =>{
    
     let connexionDatabase = getDatabase();
     connexionDatabase.connect()
   
    let id = req.params.id

    const sql = 'SELECT ques.id_question, ques.name_question, ques.answers_question, ques.correct_answer, ques.id_quiz, qui.id_quiz, qui.name_quiz FROM questions as ques INNER JOIN quiz as qui ON ques.id_quiz = qui.id_quiz WHERE ques.id_quiz = ?;'
    
    
    connexionDatabase.query(sql, [id], (err,result) =>{
        if(err){
            return res.status(500).send(err)
            }
            else{

            res.status(201).json(result);
            //res.redirect('http://localhost:8080/admin');
        
            }
            })

}

