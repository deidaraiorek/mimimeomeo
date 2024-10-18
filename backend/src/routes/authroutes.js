const express = require("express");
const router = express.Router();

let users = {}

router.post("/signup", (req,res) => {
    try {
        const {username, email, password, cfpw} = req.body;
        const userExist = users.hasOwnProperty(username, email, password, cfpw)

        if (userExist) {
            res.send("User exists")
        }

        if (!validateName(username)) {
            res.send("Invalid name")
        }


    } catch (e) {

    }

})
module.exports = router