const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.registerNewUser = async(body) => {
    try{
        const { userName, nickName, email, password } = body;

        const userNameCheck = await User.findOne({userName});
        if(userNameCheck) return Promise.resolve({status: false, message: "Username already in use. Please choose a different one."});
    
        const emailCheck = await User.findOne({email});
        if(emailCheck) return Promise.resolve({status: false, message: "Email already in use. Please choose a different one."});
    
        const encrypted_password = await bcrypt.hashSync(password, 10);
        const user = await User.create({
            email, nickName, userName, password: encrypted_password
        });
        return ({
            status: true,
            message: "You have succesfully registered!",
            user: user
        })
        
    }
    catch(error) {
        console.log(error);
        return Promise.resolve({status: false, message: "Registration failed. An unknown error has occured"});
    }
}

module.exports.login = async(body) => {
    const { userName, password } = body;
    const user =  await User.findOne({userName}).lean();

    if(user){
        const isCorrectPassword = await bcrypt.compareSync(password, user.password)
        if(isCorrectPassword){
 
            delete user.password;
            return Promise.resolve({
                status: true,
                message: "Login successful",
                user: user
            })
        }
        console.log('wrong password route');
        return Promise.resolve({
            status: false,
            message: "Login failure"
        })
   
    }

    return Promise.resolve({
        status: false,
        message: "Username does not exist"
    })
}

module.exports.getAllContacts = async(ownId)=> {
   
    try{
        const users = await User.find({ _id: { $ne: ownId} }).select([
            "email",
            "nickName",
            "_id"
        ]);

        return users;
    } catch(err){
        console.log(err.message);
    } 
}

