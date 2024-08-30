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

router.get('/', (req, res) =>{
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
    
    const sql = 'SELECT * FROM users';
    connexionDatabase.query(sql, (err, results) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
           
            res.status(200).json(results); // Good value
            
           //return res.status(200).json(results); // Good value
           

          //return console.log(res.status(200));
            // Good value

           // Good value
        
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

            res.status(201);
            res.redirect('http://localhost:8080');
            
            }
            })
            
           
        //const { username, password, name, firstname } = req.body;
        //res.send(username)

       // a utiliser -< récupération des datas
       //res.send(JSON.stringify(req.body.username));

})


/*
app.use(session({
    name: 'sessionIdCookie',
    secret: 'thisshouldbeasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 3600000, // 1hr
      secure: true, // cookie is only accessible over HTTP, requires HTTPS
    }

}));
*/


// router login avant jwt


/* 

router.post('/login', async (req, res) =>{

    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
      
    const { username, password} = req.body;

    const sql =`SELECT id, password FROM users WHERE username = ?;`;
    
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

                res.cookie('cookie_quiz', 'cookie_value', {
                    expire : 24 * 60 * 60 * 1000
                    //secure: true
                });
                res.status(201);
                res.redirect('http://localhost:8080/liste-utilisateur');
            } else {
                // Passwords don't match, authentication failed
                res.status(201).send({
                    succes: "pas le même mot de passe",
                })
                
            }
        });
    })
})

*/

/*
router.post('/login', async (req, res) =>{

    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
      
    const { username, password} = req.body;

    const sql =`SELECT id, password FROM users WHERE username = ?;`;
    
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

                const token = jwt.sign({userId: 10}, "$2y$10$Fq.tYdn8ejM0JtXpvRoAaOnwv7HdlEb33.fpGGo3h0uOgfHyPFmaq"//, { expiresIn: '3 hours' })
                )
                //return res.json({ access_token: token })

                //res.cookie('coucou', token);
                
                res.status(201).send(token);
                //res.redirect('http://localhost:8080/liste-utilisateur');
            } else {
                // Passwords don't match, authentication failed
                res.status(201).send({
                    succes: "pas le même mot de passe",
                })
                
            }
        });
    })
})
*/




/*

router.post('/login', async (req, res) =>{

    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
      
    const { username, password} = req.body;

    const sql =`SELECT id, password FROM users WHERE username = ?;`;
    
    connexionDatabase.query(sql, [username], (err, resultQueryPassword) =>{
        //const Userpassword = resultQueryPassword[0];

        res.status(201).send({
            succes: resultQueryPassword[0].id,
        })
        
    })
})

*/

/*
set cookie;
*/

/*
router.get('/logout',function(req, res){
    res.clearCookie('cookie_quiz');
    return res.redirect('http://localhost:8080');
});
*/


router.post("/login", user.login)
router.post("/register", user.register)
router.post("/listUsers", user.listUsers)
router.get("/test", auth.authorization, user.test)

//router.get("/getA", auth.getA)




module.exports = router;