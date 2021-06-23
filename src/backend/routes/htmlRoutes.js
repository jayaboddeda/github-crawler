const express = require('express');
const router = express.Router();
const htmlcontroller = require("../controller/htmlcontroller")
const authenticationcontroller = require("../controller/authenticationcontroller")
const apicontroller = require("../controller/apicontroller")

router.route("/").get(authenticationcontroller.redirecthome,htmlcontroller.login)
router.route("/signup").get(authenticationcontroller.redirecthome,htmlcontroller.signup)
router.route("/index").get(authenticationcontroller.checksession,apicontroller.api)
router.route("/logout").get(authenticationcontroller.logout)


router.route("/signuppost").post(authenticationcontroller.signup)
router.route("/loginpost").post(authenticationcontroller.login)
router.route("/themepost").post(authenticationcontroller.themepost)



module.exports = router;