const router = require("express").Router();
const userController = require("../controllers/userController");
const bcrypt = require("bcrypt");

router.post('/validate-username', (request,response) => {
    userController.isEmailInUse(request.body)
    .then(result => response.send(result));
})

router.post('/register', (request, response) => {
    userController.registerNewUser(request.body)
    .then(result => response.send(result));
})

router.post("/login", (request, response ) => {
    userController.login(request.body)
    .then(result => response.send(result));
})

router.get("/getAllUsers/:id", (request, response)=> {
    userController.getAllContacts(request.params.id)
    .then(result => response.send(result));
})

module.exports = router;

