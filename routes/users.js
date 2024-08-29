const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const getDatabase = require('./../config/db.js');
const cors = require('cors');

const app = express()
const bodyParse = require('body-parser')

router.get('/', (req, res) =>{

    app.use(cors);
    app.use(cors({
    origin: "http://localhost:8080/connexion"
    }))
 

    let connexionDatabase = getDatabase();
    connexionDatabase.connect()

    const sql = 'SELECT * FROM users';
    connexionDatabase.query(sql, (err, results) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
           res.status(200).json(results); // Good value
            
            //res.status(200).json(results).render("./../../front/quiz-project/src/views/ListUserView.vue");
            //return console.log("ok");
            //res.send(console.log("coucou"));
            
            
            
            
        }
    })
})


router.post('/register', async (req, res) =>{
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()

    const { username, password, name, firstname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =`INSERT INTO users (username, password ,name, firstname) VALUES (?, ?, ?, ?);`
    connexionDatabase.query(sql, [username, hashedPassword, name, firstname], (err,result) =>{
        if(err){
            return res.status(500).send(err)
        }
        else{
           //return res.status(201).render("./../../front/quiz-project/src/views/HomeView.vue")
           res.status(201).send({message: 'utilisateur créée'})
        }
    })
})



// TODO router login

router.post('/login', async (req, res) =>{

    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
      
    const { username, password} = req.body;

    const sql =`SELECT password FROM users WHERE username = ?;`;
    
    connexionDatabase.query(sql, [username], (err, resultQueryPassword) =>{
        const Userpassword = resultQueryPassword[0];
        
        if(err){
            return res.status(500).send(err)
        }
        bcrypt.compare(password, Userpassword.password, (err, result) => {
            if (err) {
                // Handle error
                console.error('Error comparing passwords:', result, err);
                return;
            }
        
            if (result) {
                // Passwords match, authentication successful
                res.status(201).send({
                    succes: "réussi",
                })
            } else {
                // Passwords don't match, authentication failed
                res.status(201).send({
                    succes: "pas le même mot de passe",
                })
            }
        });
    

    /*
    res.status(201).send({
        succes: "ok",
        motdepasseindiqué: password,
        aaaa: Userpassword
    })
       */ 


    })
})


module.exports = router;