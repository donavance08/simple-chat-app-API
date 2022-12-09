const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;



mongoose.connect(process.env.MONGOSERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongodDB");
})
.catch((err)=> {
    console.log(err.message);
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/users", userRoutes);
app.use("/message", messageRoutes);
app.listen(port, () => console.log(`API is now running on localhost:${port}`))
