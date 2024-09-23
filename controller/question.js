const getDatabase = require('../config/db');

exports.validateQuestions = (req, res) =>{
    
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
    
   const { questions, answers, correctAnswer } = req.body
   
   let id = req.params.id
     let questionsJson = JSON.stringify(questions);
     let answersJson = JSON.stringify(answers);
     let correctAnswerJson = JSON.stringify(correctAnswer);


    const sql =`UPDATE questions SET name_question = ?, answers_question = ?, correct_answer = ?, id_quiz = ? WHERE EXISTS (SELECT id_quiz FROM questions WHERE id_quiz = ?)`


    connexionDatabase.query(sql, [questionsJson, answersJson, correctAnswerJson, id, id], (err,result) =>{
        if(err){
            return res.status(500).send(err)
            }
           if(result.affectedRows== 0){
            const sql =`INSERT INTO questions (name_question, answers_question, correct_answer, id_quiz) VALUES (?,?,?,?);`
            connexionDatabase.query(sql, [questionsJson, answersJson, correctAnswerJson, id], (err,result) =>{
                if(err){
                    return res.status(500).send(err)
                }
                else{
                    res.status(201);
                }
            })
           
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

exports.validateUserQuiz = (req, res) =>{
/*
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()

    const { userAnswers, idUser, idQuiz } = req.body
    let userAnswersJson = JSON.stringify(userAnswers);

    const sql =`INSERT INTO useranswers (answers, id_user, id_quiz) VALUES (?,?,?);`
    connexionDatabase.query(sql, [userAnswersJson, idUser, idQuiz], (err,result) =>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            res.status(201);
        }
    })
*/ 

    let connexionDatabase = getDatabase();
    connexionDatabase.connect()

    const { userAnswers, idUser, idQuiz } = req.body

    let userAnswersJson = JSON.stringify(userAnswers);
     let idUserJson = JSON.stringify(idUser);
     let idQuizJson = JSON.stringify(idQuiz);


    const sql = `
    UPDATE useranswers
    SET answers = ?
    WHERE EXISTS (
    SELECT id_user, id_quiz 
    FROM useranswers 
    WHERE id_user = ? AND id_quiz = ?
    );`
    connexionDatabase.query(sql, [userAnswersJson, idUserJson, idQuizJson], (err,result) =>{

        if(err){
            return res.status(500).send(err)
        }
        if(result.affectedRows== 0){
            const sql =`INSERT INTO useranswers (answers, id_user, id_quiz) VALUES (?,?,?);`
            connexionDatabase.query(sql, [userAnswersJson, idUser, idQuiz], (err,result) =>{
                if(err){
                    return res.status(500).send(err)
                }
                else{
                    res.status(201);
                }
            })
           
        }
    })
}


