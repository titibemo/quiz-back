let jwt = require("jsonwebtoken");
const getDatabase = require('../config/db');
const bcrypt = require('bcrypt');

//---------------------------------------------------------------CREATE QUIZ---------------------------------------

exports.newQuiz = (req, res,) =>{

     let connexionDatabase = getDatabase();
     connexionDatabase.connect()

    const { quiz_name } = req.body;

    let slug = quiz_name.trim().toLowerCase().replace(/\s+/g, '-');


    

    const sql =`INSERT INTO quiz (name_quiz, slug_quiz) VALUES (?, ?);`
    connexionDatabase.query(sql, [quiz_name, slug], (err,result) =>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            res.status(201);
            res.redirect('http://localhost:8080/admin/les-quiz');
            
        }
    })
}
/*
res.status(200).send({
    "slug": slug
})
}*/

//---------------------------------------------------------------Display list QUIZ---------------------------------------

exports.listQuiz = (req, res) =>{
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()

    const { quiz_name } = req.body;
    
    const sql = 'SELECT * FROM quiz';
    connexionDatabase.query(sql, (err, results) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            
            res.status(200).json(results); // Good value
                        
        }
    })
}

exports.listAvailableQuiz = (req, res) =>{
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()

    const available = 'true';

    //const { quiz_name } = req.body;
    
    const sql = 'SELECT * FROM quiz WHERE available = ?';
    connexionDatabase.query(sql, [available] ,(err, results) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            
            res.status(200).json(results); // Good value
                        
        }
    })
}

//---------------------------------------------------------------Erase QUIZ---------------------------------------

exports.eraseQuiz = (req, res) =>{

    const { id_quiz } = req.body;
  

    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
    
    const sql = 'DELETE FROM quiz WHERE id_quiz = ?';

    connexionDatabase.query(sql, [id_quiz], (err,result) =>{
        if(err){
            return res.status(500).send(err)
            }
            else{

            res.status(201);
            res.redirect('http://localhost:8080/admin/les-quiz');
            
            }
            })


//res.status(200).send({test})

}

//---------------------------------------------------------------modify QUIZ---------------------------------------


exports.getQuizById = (req, res) =>{

    //res.status(200).send("ok")

    //res.send("Id is set to " + req.params.id);

    let id = req.params.id

  
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()

    
    const sql = 'SELECT * FROM quiz WHERE id_quiz = ?';

    connexionDatabase.query(sql, [id], (err,result) =>{
        if(err){
            return res.status(500).send(err)
            }
            else{
                res.status(200).json(result);
                //res.redirect('http://localhost:8080/admin/modifier-un-quiz');
            
            }
            })

//res.status(200).json(id);

}

exports.modifyQuiz = (req, res) =>{

    //res.status(200).send("ok")

    //res.send("Id is set to " + req.params.id);

    let id = req.params.id

    const { quiz_name } = req.body;

  
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()

    
    const sql = 'UPDATE quiz SET name_quiz = ? WHERE id_quiz = ?';

    connexionDatabase.query(sql, [quiz_name, id], (err,result) =>{
        if(err){
            return res.status(500).send(err)
            }
            else{
                res.status(201);
                res.redirect('http://localhost:8080/admin/les-quiz');
            
            }
            })

//res.status(200).json(id);

}


exports.availableQuiz = (req, res) =>{

    const { toggleValue, idQuiz} = req.body

  
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()

    
    const sql = 'UPDATE quiz SET available = ? WHERE id_quiz = ?';

    connexionDatabase.query(sql, [toggleValue, idQuiz], (err,result) =>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            res.status(201)
            //res.redirect('http://localhost:8080/admin/les-quiz');
        }
    })
/*
res.status(200).send({
    
    //"test": toggleValue
    //"toggle": toggleValue,
   //"answers": idQuiz

});
*/

}