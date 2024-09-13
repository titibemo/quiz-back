const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const getDatabase = require('./../config/db.js');
const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(express.json());



/* FONCTIONNE MAIS USELESS
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Replace with actual authentication logic
  if (username === 'testuser' && password === 'testpassword') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
*/

app.post('/api/users/login', (req, res) => {
  let connexionDatabase = getDatabase();
  connexionDatabase.connect()
    
  const { username, password} = req.body;

  const sql =`SELECT id, role, password FROM users WHERE username = ?;`;
  
  connexionDatabase.query(sql, [username], (err, resultQuery) =>{
   
    if(err){
        return res.status(500).send(err)
    }
    bcrypt.compare(password, resultQuery[0].password, (err, result) => {
        if (err) {
            res.status(500)
            return;
        }
    
        if (result) {
            res.status(201)
            connexionDatabase.end()
        }
        else {
            // Passwords don't match, authentication failed
            res.status(201).send({
                succes: "pas le même mot de passe",
            })
            
        }
    });
  })
});

/*
app.get('/api/users/bbb', (req, res) => {
  res.send('Server is up and running');
});
*/

module.exports = app;