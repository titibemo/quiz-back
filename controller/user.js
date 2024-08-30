let jwt = require("jsonwebtoken");
const getDatabase = require('../config/db');
const bcrypt = require('bcrypt');

//---------------------------------LOGIN---------------------------------------
exports.login = (req, res,) =>{

    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
      
    const { username, password} = req.body;

    const sql =`SELECT id, role, password FROM users WHERE username = ?;`;
    
    connexionDatabase.query(sql, [username], (err, resultQuery) =>{
        //const Userpassword = resultQueryPassword[0];
        
        if(err){
            return res.status(500).send(err)
        }
        bcrypt.compare(password, resultQuery[0].password, (err, result) => {
            if (err) {
                // Handle error
                console.error('Error comparing passwords:', result, err);
                return;
            }
        
            if (result) {
                // Passwords match, authentication successful

                let token = jwt.sign({
                    userId: resultQuery[0].id,
                    userRole: resultQuery[0].role
                    }, "$2y$10$xMkfOk/iYD69yU93pS.hUensoqZXrDa9DCHKFvyURdOlYbDIRVngu", { expiresIn: '5 hours' })

                res.cookie('quiz_website', token);

                /*
                res.cookie("quiz_site", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None"
                });
                */

               // res.status(201).json({succes: a});
                res.redirect('http://localhost:8080/liste-utilisateur');

                
               /* res.status(201).send({
                    succes: token,
                })*/
                
            } else {
                // Passwords don't match, authentication failed
                res.status(201).send({
                    succes: "pas le même mot de passe",
                })
                
            }
        });
    })

}
//--------------------------------- AUTHENTIFICATION USERS ---------------------------------------
exports.auth = (req,res) => { 

    try{
        //const token = req.headers.authorization.split(' ')[1]
        const token = req.headers
        res.status(200).json(token);


        //req.token = jwt.verify(token, "$2y$10$xMkfOk/iYD69yU93pS.hUensoqZXrDa9DCHKFvyURdOlYbDIRVngu")
        //next();

        /*
        const token = req.headers.authorization.split(' ')[1]
        req.token = jwt.verify(token, "$2y$10$xMkfOk/iYD69yU93pS.hUensoqZXrDa9DCHKFvyURdOlYbDIRVngu")
    
        res.status(200).json(
            {
                success: true,
                data: 'les-donnes'
            }
        )*/
            
    }
    catch{
        res.status(401).json({messsage: "probleme d'authentification"})
    }

    //const myJwt = retrieveJwt(request);
    res.status(200).json({message: "authentification réussi"})
    


    //res.status(200).json({message: "authentification réussi"})


        
    //res.status(200).json({message: "authentification réussi, id :" + req.token.userId})
}



//---------------------------------LIST USERS ---------------------------------------
exports.listUsers = (req, res) =>{
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
}


//--------------------------------- REGISTRATION USERS ---------------------------------------
exports.register = async (req, res) =>{
    
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

}

//--------------------------------- test ---------------------------------------

exports.test = (req, res) => {
    res.status(200).json({
        message: 'valide',
        id: req.token.userId,
        role: req.token.userRole

    })
}












