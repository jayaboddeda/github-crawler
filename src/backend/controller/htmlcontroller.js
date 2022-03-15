var axios = require("axios");
var qs = require("qs");

function login(req, res) {
  //   var data = qs.stringify({
  //     name: "root",
  //     pwd: "Bizgaze@123",
  //     encodedpwd: "Qml6Z2F6ZUAxMjM=",
  //   });
  //   var config = {
  //     method: "post",
  //     url: "https://proxmox.bizgaze.app:8443/cgi/login.cgi",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(response.headers["set-cookie"]);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  res.cookie("__Host-SID", "ukhkhhk", {
    secure: true,
    httpOnly: true,
  });

  res.render("login");
}

function signup(req, res) {
  res.render("signup");
}

function index(req, res) {
  res.render("index");
}
function search(req, res) {
  res.redirect("/index");
}

module.exports = {
  login,
  signup,
  index,
  search,
};
