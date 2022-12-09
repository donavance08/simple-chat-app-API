const router = require("express").Router();
const messageController = require("../controllers/messageController");
const bcrypt = require("bcrypt");

router.post("/send", (request, response)=> {
  
    messageController.sendMessage(request.body)
    .then(result => response.send(result));
})

router.post("/retrieve-message", (request, response)=> {
    messageController.getMessages(request.body)
    .then(result => response.send(result));
})


module.exports = router;