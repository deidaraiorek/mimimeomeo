const express = require("express");
const UserRouter = require("./src/routes/User");
const connectDB = require("./src/utils/db");
const app = express();
// const route = require("./src/routes/authroutes")
const port = 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(express.static("public"))

connectDB()
app.use('/log', (req, res) => {
    res.send("hi")
})
app.use("/user", UserRouter)


app.listen(port, () => {
    console.log('App is running at port = ', port);
})
