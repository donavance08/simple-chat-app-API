const Message = require("../models/messageModel");

module.exports.sendMessage = (body) => {
   try{
    const {message, from, to } = body;
    
    const newMessage = new Message({
        message: message,
        users: [from, to],
        sender: from
    });

    return newMessage.save().then(savedMessage => {
        if(savedMessage){
            return{
                status: true,
                message: "message added successfully"
            }
        }

        return {
            status: false,
            message: "failed to add message to database"
        }
    });
   } catch(err){
        console.log(err.message);
   }
};

module.exports.getMessages = async (body) => {
    try {
        const { from, to } = body;

        const messages = await Message.find({
            users: { $all: [from, to]}
        })
        .sort({updatedAt: 1});
        
        if(messages){
            return messages.map(message => {
                return {
                    ownMessage: message.sender.toString() === from,
                    message: message.message
                };
            });
        }
        
        return Promise.resolve([]);

    }catch (error) {
        console.log(error.message);
    }
};