let jwt = require("jsonwebtoken");
const getDatabase = require('../config/db');
const bcrypt = require('bcrypt');

exports.newQuestion = (req, res,) =>{
/*
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
*/

    const { question15 } = req.body;
      
    
/*
    const sql =`INSERT INTO quiz (name_quiz) VALUES (?);`
    connexionDatabase.query(sql, [quiz_name], (err,result) =>{
        if(err){
            return res.status(500).send(err)
            }
            else{

            res.status(201);
            res.redirect('http://localhost:8080/admin/les-quiz');
            
            }
            })
*/


    res.status(201).send({question15})
}

