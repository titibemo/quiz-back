let jwt = require("jsonwebtoken");
   

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



// token de la personne : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjb3Vjb3UiLCJpYXQiOjE3MjUwMTA5MzZ9.bDqdEwknFkO9Xe826L8CmfKvustkDzB42aROiJV1j_8

//hash clé secrete : $2y$10$xMkfOk/iYD69yU93pS.hUensoqZXrDa9DCHKFvyURdOlYbDIRVngu

/*
exports.getA = (req,res,next) =>{
    const myJwt = retrieveJwt(request);
    res.status(200).json(
        {
            success: true,
            data: myJwt
        }
    
    
    )}
*/