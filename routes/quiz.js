const express = require('express');
const router = express.Router();
const getDatabase = require('./../config/db.js');
let jwt = require('jsonwebtoken');


const app = express()
const bodyParse = require('body-parser')
//app.use(bodyParser.urlencoded({ extended: true }));

const user = require("../controller/user.js")
const quiz = require("../controller/quiz.js")
const auth = require("../middleware/auth.js")

router.post("/newQuiz", quiz.newQuiz)
router.get("/listQuiz", quiz.listQuiz)
router.post("/eraseQuiz", quiz.eraseQuiz)
router.get("/getQuizById/:id", quiz.getQuizById)
router.post("/modifyQuiz/:id", quiz.modifyQuiz)
router.post("/availableQuiz", quiz.availableQuiz)
router.get("/listAvailableQuiz", quiz.listAvailableQuiz)



/* a effacer à la fin
router.post("/login", user.login)
router.get("/logout", user.logout)
router.post("/register", user.register)
router.get("/listUsers", user.listUsers)
router.get("/test", auth.authorization, user.test)
*/

//router.get("/getA", auth.getA)




module.exports = router;