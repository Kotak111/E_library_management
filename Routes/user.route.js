const Usercontroller=require("../controller/user.controller");

const router=require("express").Router();
router.post("/signup",Usercontroller.create)
router.post("/login",Usercontroller.login)
router.post("/logout",Usercontroller.logout)

module.exports=router;