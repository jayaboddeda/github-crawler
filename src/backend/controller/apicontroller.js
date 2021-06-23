const fetch = require('node-fetch');


const api = async(req,res,next)=>{
    let page = req.query.page
    let per_page = req.query.size
    if(!page){
        page = 1
    }
    if(!per_page){
       per_page = 12
    }

   let  url = "https://api.github.com/orgs/octokit/repos?page=" + page + "&per_page=" + per_page;
    const data = await fetch(url)
    .then(res => res.json())
    .then(json => json);
    const c = await fetch('https://api.github.com/orgs/octokit/repos')
    .then(res => res.json())
    .then(json => json)

const count =c.length;

console.log(data)

    res.render('index',{
        data,
        count,
        page
    })

}


module.exports = {
    api
}