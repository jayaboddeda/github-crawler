const express = require('express');
const router = express.Router();
const htmlcontroller = require("../controller/htmlcontroller")
const authenticationcontroller = require("../controller/authenticationcontroller")
const apicontroller = require("../controller/apicontroller")

router.route("/").get(authenticationcontroller.redirecthome,apicontroller.bmcsensor)
router.route("/signup").get(authenticationcontroller.redirecthome,htmlcontroller.signup)
router.route("/index").get(authenticationcontroller.checksession,apicontroller.trending)
router.route("/logout").get(authenticationcontroller.logout)
router.route("/search").get(authenticationcontroller.checksession,apicontroller.search)
router.route("/search/:page/:username").get(authenticationcontroller.checksession,apicontroller.search)
router.route("/fetchuserinfo").get(authenticationcontroller.checksession,apicontroller.fetchuserinfo)


router.route("/signuppost").post(authenticationcontroller.signup)
router.route("/loginpost").post(authenticationcontroller.login)
router.route("/themepost").post(authenticationcontroller.themepost)
router.route("/search").post(apicontroller.search)



module.exports = router;