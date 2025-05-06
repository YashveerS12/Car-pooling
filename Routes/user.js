const express = require("express");
const app = express();
app.use(express.json());
const router=express.Router();
const userController=require("../Controllers/user.js");

router.post("/signup",userController.signup);
router.post("/login",userController.login)


module.exports =router;