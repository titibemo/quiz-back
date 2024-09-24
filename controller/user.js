let jwt = require("jsonwebtoken");
const getDatabase = require('../config/db');
const bcrypt = require('bcrypt');

//------------------------------------------------------------------------------LOGIN---------------------------------------

/**
 * @swagger
 * api/users/login:
 *      post:
 *          summary: Connexion
 *          tags:
 *            - Users
 *          responses:
 *              200:
 *                  description: Se connecte avec un username et un mot de passe
 *                  content:
 *                      application/json:
 *                         schema:
 *                            type: array
 *                            items:
 *                               type: object
 *                               properties:
 *                                  username:
 *                                      type: string
 *                                      example: choupi 
 *                                  password:
 *                                      type: string 
 *                                      example: choupi 
 */
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
                res.status(201)
                let token = jwt.sign({
                    userId: resultQuery[0].id,
                    userRole: resultQuery[0].role
                    }, "$2y$10$xMkfOk/iYD69yU93pS.hUensoqZXrDa9DCHKFvyURdOlYbDIRVngu", { expiresIn: '5 hours' })

                res.cookie('quiz_website', token);

                
                // res.cookie("quiz_site", token, {
                //     httpOnly: true,
                //     secure: true,
                //     sameSite: "None"
                // });
                

               // res.status(201).json({succes: a});
               
               res.redirect('http://localhost:8080/quiz');
               
                
               // res.status(201).send({
                //     succes: token,
                // })
                
            }
            else {
                // Passwords don't match, authentication failed
                res.status(201).send({
                    succes: "pas le même mot de passe",
                })
                
            }
        });
    })
}
//-------------------------------------------------------------------------- CHECK ROLE USER ADMIN ---------------------------------------

exports.authorization = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        req.token = jwt.verify(token, "$2y$10$xMkfOk/iYD69yU93pS.hUensoqZXrDa9DCHKFvyURdOlYbDIRVngu")
         next();

    }
    catch{
        res.status(401).json({message: "probleme d'authentification"})
    }
}



//--------------------------------------------------------------------------- AUTHENTIFICATION USERS ---------------------------------------

exports.auth = (req,res, next) => { 

    try{
        //const token = req.headers.authorization.split(' ')[1]
        //const token = req.headers
        //res.status(200).json(token);


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
       res.status(200).json({message: "ok"})
       next()
            
    }
    catch{
        res.status(401).json({messsage: "probleme d'authentification"})
    }

    //const myJwt = retrieveJwt(request);
   // res.status(200).json({message: "authentification réussi"})
    


    //res.status(200).json({message: "authentification réussi"})


        
    //res.status(200).json({message: "authentification réussi, id :" + req.token.userId})
}



//-----------------------------------------------------------------------------------LIST USERS ---------------------------------------

/**
 * @swagger
 * /api/users/listUsers:
 *      get:
 *          summary: récupère tous les utilisateurs
 *          tags:
 *            - Users
 *          responses:
 *              200:
 *                  description: Liste des utilisateurs
 *                  content:
 *                      application/json:
 *                         schema:
 *                            type: array
 *                            items:
 *                               type: object
 *                               properties:
 *                                  id:
 *                                      type: integer 
 *                                      example: 25 
 *                                  username:
 *                                      type: string 
 *                                      example: titi 
 */
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


//---------------------------------------------------------------------------------- REGISTRATION USERS ---------------------------------------
/**
 * @swagger
 * api/users/register:
 *      post:
 *          summary: Inscription des utilisateurs
 *          tags:
 *            - Users
 *          responses:
 *              200:
 *                  description: Les utilisateurs s'inscrivent en renseignant un username, mot de passe, un nom et prénom 
 *                  content:
 *                      application/json:
 *                         schema:
 *                            type: array
 *                            items:
 *                               type: object
 *                               properties:
 *                                  Entrez votre nom d'utilisateur:
 *                                      type: string
 *                                      example: choupi 
 *                                  Entrez votre mot de passe:
 *                                      type: string 
 *                                      example: tarte 
 *                                  Entrez votre nom:
 *                                      type: string 
 *                                      example: john
 *                                  Entrez votre prénom:
 *                                      type: string 
 *                                      example: doe 
 *  
 */
exports.register = async (req, res) =>{
    
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
    
    
    const { username, password, name, firstname } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql =`INSERT INTO users (username, password ,name, firstname) VALUES (?, ?, ?, ?);`
    connexionDatabase.query(sql, [username, hashedPassword, name, firstname], (err,res) =>{
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

//------------------------------------------------------------------------ Distribute cookie id and role from database---------------------------------------

exports.test = (req, res) => {

    res.status(200).json({
        message: 'valide',
        id: req.token.userId,
        role: req.token.userRole

    })
}


//------------------------------------------------------------------------ Logout ---------------------------------------
/**
 * @swagger
 * api/users/logout:
 *      post:
 *          summary: Déconnection
 *          tags:
 *            - Users
 *          responses:
 *              200:
 *                  description: Les utilisateurs se déconnectent de l'application en effaçant le cookie et en le retournant à la page d'accueil.
 *                  content:
 *                      application/json:
 *                         schema:
 *                            type: array
 *                            items:
 *                               type: object
 *                               properties:
 *                                  Entrez votre nom d'utilisateur:
 *                                      type: string
 *                                      example: choupi 
 *                                  Entrez votre mot de passe:
 *                                      type: string 
 *                                      example: tarte 
 *                                  Entrez votre nom:
 *                                      type: string 
 *                                      example: john
 *                                  Entrez votre prénom:
 *                                      type: string 
 *                                      example: doe 
 *  
 */
exports.logout = (req, res) => {
    res.status(200).clearCookie('quiz_website')
    res.redirect('http://localhost:8080');
}


exports.eraseUser = (req, res) => {

    const idUser = req.params.id
  
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
    
    const sql = 'DELETE FROM users WHERE id = ?';

    connexionDatabase.query(sql, [idUser], (err,result) =>{
        if(err){
            return res.status(500).send(err)
            }
            else{

            res.status(201);
            res.redirect('http://localhost:8080/admin/les-quiz');
            
            }
            })
            /*
            res.status(200).send({
                test: id
            })*/
}

exports.getUserById = (req, res) => {

    const idUser = req.params.id

    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
    
    const sql = 'SELECT firstname, name, username FROM users WHERE id = ?';
    connexionDatabase.query(sql, [idUser], (err, results) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            
            res.status(200).json(results); // Good value
   
        }
    })

        /*
        res.status(200).send({
            test: "test",
            id: idUser
        })
*/


}

exports.modifyUser = (req, res) => {

    const idUser = req.params.id

    const { firstname, name, username } = req.body;
  
    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
    
    const sql = 'UPDATE users SET firstname = ?, name = ?, username = ? WHERE id = ?';

    connexionDatabase.query(sql, [firstname, name, username, idUser], (err,result) =>{
        if(err){
            return res.status(500).send(err)
            }
            else{

            res.status(201);
            res.redirect('http://localhost:8080/admin/les-quiz');
            
            }
            })
            
           /*
            res.status(200).send({
                test: "test"
            })*/
}


exports.getUserQuizById = (req, res) => {

    const idUser = req.params.id

    let connexionDatabase = getDatabase();
    connexionDatabase.connect()
    
    const sql = 'SELECT UA.answers, QUI.name_quiz, QUES.name_question, QUES.answers_question, QUES.correct_answer FROM useranswers as UA INNER JOIN quiz as QUI INNER JOIN questions as QUES ON UA.id_quiz = QUI.id_quiz AND UA.id_quiz = QUES.id_quiz WHERE UA.id_user = ?;';
    connexionDatabase.query(sql, [idUser], (err, results) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            
            res.status(200).json(results); // Good value
   
        }
    })

        /*
        res.status(200).send({
            test: "test",
            id: idUser
        })
*/


}


/*
exports.bbb = (req, res) => {
    res.status(200).send({
        success: "ok"
    })
  };
*/







