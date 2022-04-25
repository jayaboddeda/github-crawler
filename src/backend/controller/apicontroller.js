const fetch = require("node-fetch");
const cheerio = require("cheerio");
var axios = require('axios');
var qs = require('qs');
const https = require('https');
// const api = async(req,res,next)=>{
//     let page = req.query.page
//     let per_page = req.query.size
//     if(!page){
//         page = 1
//     }
//     if(!per_page){
//        per_page = 12
//     }

//    let  url = "https://api.github.com/orgs/octokit/repos?page=" + page + "&per_page=" + per_page;
//     const data = await fetch(url)
//     .then(res => res.json())
//     .then(json => json);
//     const c = await fetch('https://api.github.com/orgs/octokit/repos')
//     .then(res => res.json())
//     .then(json => json)

// const count =c.length;

//     res.render('index',{
//         data,
//         count,
//         page
//     })

// }

const trending = async (req, res) => {
  const response = await fetch("https://github.com/trending");
  const body = await response.text();
  const $ = cheerio.load(body);
  const trendingrepos = [];

  $(".Box-row").each((index, element) => {
    const repotitle = $(element)
      .find(".lh-condensed")
      .text()
      .replace(/\s\s+/g, "");
    const aboutrepo =
      $(element).find(".pr-4").text().replace(/\s\s+/g, "") ||
      "No Info available";
    const repolanguage =
      $(element)
        .find(".mt-2")
        .find("span")
        .find("span")
        .last()
        .text()
        .replace(/\s\s+/g, "")
        .trim() || "No Info available";
    const repostars =
      $(element)
        .find(".mt-2")
        .find("a")
        .first()
        .text()
        .replace(/\s\s+/g, "")
        .trim() || "No Info available";
    const repoforks =
      $(element)
        .find(".mt-2")
        .find("a")
        .first()
        .next()
        .text()
        .replace(/\s\s+/g, "")
        .trim() || "No Info available";
    trendingrepos[index] = {
      repotitle,
      aboutrepo,
      repolanguage,
      repostars,
      repoforks,
    };
  });
  res.render("index", {
    trendingrepos,
  });
};

const search = async (req, res) => {
  let searchterm, url;
  let page;
  if (!req.query.page) {
    page = 1;
  }
  if (req.query.page && req.query.username) {
    page = req.query.page;
    searchterm = req.query.username;
    url =
      "https://github.com/search?p=" +
      req.query.page +
      "&q=" +
      searchterm +
      "&type=Users";
  } else if (req.body.username) {
    searchterm = req.body.username;
    url = "https://github.com/search?q=" + searchterm + "&type=users";
  } else {
    res.redirect("/index");
  }

  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  const searchresult = [];
  $(".Box-row").each((index, element) => {
    const userimage = $(element)
      .find("div")
      .first()
      .find("a")
      .find("img")
      .attr("src");
    const name =
      $(element).find("div").first().next().find("a.mr-1").first().text() ||
      "No Info available";
    const username = $(element)
      .find("div")
      .first()
      .next()
      .find("a.color-fg-muted")
      .text();
    const userlocation =
      $(element).find("div:last").text().replace(/\s\s+/g, "").trim() ||
      "No Info available";
    searchresult[index] = { userimage, name, username, userlocation };
  });
  res.render("search", {
    searchresult,
    searchterm,
    page,
  });
};

const fetchuserinfo = async (req, res) => {
  let username = req.query.username;
  let url = "https://github.com/" + username;
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  let userinfo = {};

  const uname = $(".vcard-username").text().replace(/\s\s+/g, "").trim();
  const userimage = $("div.clearfix").find("a").first().attr("href");
  const followers =
    $(".user-profile-bio").next().find("a").first().find("span").text() ||
    "No Info available";
  const following =
    $(".user-profile-bio")
      .next()
      .find("a")
      .next()
      .find("span")
      .first()
      .text() || "No Info available";
  const stars =
    $(".user-profile-bio").next().find("a").next().find("span").last().text() ||
    "No Info available";
  const contributions =
    $(".js-yearly-contributions")
      .find("h2")
      .first()
      .text()
      .replace(/\s\s+/g, " ") || "No Info available";

  userinfo = { uname, followers, following, stars, contributions, userimage };

  res.send(userinfo);
};


const bmcsensor = async (req,res) => {

  console.log('hi')
  const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
  
  instance.get('https://intelbmc.bizgaze.com/cgi/login.cgi');
  
  // At request level
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  

var data = qs.stringify({
  'name': 'root',
  'pwd': 'Bizgaze@123',
  'encodedpwd': 'Qml6Z2F6ZUAxMjM=' 
});
var config = {
  method: 'post',
  url: 'https://intelbmc.bizgaze.com/cgi/login.cgi',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
  },
  data : data,
  httpsAgent:agent
};

axios(config)
.then(function (response) {
  let setcookieheader = response.headers['set-cookie'][1];
  console.log(setcookieheader);
  let splitheader = setcookieheader.split(';')
  let hostsid = splitheader[0].split('=')[1]
  console.log(hostsid)

  
  var data = '<?xml version="1.0"?>\r\n<IPMI>\r\n    <REQUEST>GENERATE</REQUEST></IPMI>';
  
  var config = {
    method: 'put',
    url: 'https://intelbmc.bizgaze.com/cgi/csrf_tokens.cgi',
    headers: { 
      'Content-Type': 'application/xml', 
      'Cookie': '__Host-SID='+hostsid
    },
    data : data,
    httpsAgent:agent
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    let result = JSON.stringify(response.data)
    let token = result.substring(
      result.indexOf("<TOKEN>") + 7, 
      result.lastIndexOf("</TOKEN>")
  );
  console.log(token)

var data = '<?xml version="1.0"?>\r\n<IPMI>\r\n    <LANG>English</LANG>\r\n    <TOKEN>'+token+'</TOKEN>\r\n    <PRIV>04</PRIV>\r\n</IPMI>';

var config = {
  method: 'post',
  url: 'https://intelbmc.bizgaze.com/cgi/getsensorinfo.cgi',
  headers: { 
    'Content-Type': 'application/xml', 
    'Cookie': '__Host-PAM_AUTH=1; __Host-SID='+hostsid
  },
  data : data,
  httpsAgent:agent
};

axios(config)
.then(function (response) {
  // console.log(JSON.stringify(response.data));
  res.send(response.data)
})
.catch(function (error) {
  console.log(error);
});

  })
  .catch(function (error) {

    console.log(error);
  });
  
})
.catch(function (error) {
  console.log(error);
});

}

module.exports = {
  // api,
  trending,
  search,
  fetchuserinfo,
  bmcsensor
};
