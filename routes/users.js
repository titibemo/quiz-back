const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const getDatabase = require('./../config/db.js');
let jwt = require('jsonwebtoken');


const app = express()
const bodyParse = require('body-parser')
//app.use(bodyParser.urlencoded({ extended: true }));

const user = require("../controller/user.js")
const auth = require("../middleware/auth.js")

router.post("/login", user.login)
router.get("/logout", user.logout)
router.get("/listUsers", user.listUsers)
router.get("/getUserQuizById/:id", user.getUserQuizById)
router.get("/getUserById/:id", user.getUserById)
router.post("/eraseUser/:id", user.eraseUser)
router.post("/modifyUser/:id", user.modifyUser)
router.post("/register", user.register)
router.get("/test", auth.authorization, user.test)




router.post("/bbb",(req, res) => {
  
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
              res.status(500).send({success: "error"})
              return;
          }
      
          if (result) {
              res.status(201).send({success: "ok"})
          }
          else {
              // Passwords don't match, authentication failed
              res.status(201).send({
                  succes: "pas le même mot de passe",
              })
              
          }
      });
    })

   //res.status(200).send({success: "ok"})
  });






module.exports = router;