function login(req,res){
res.render("login")
}

function signup(req,res){
res.render("signup")
}

function index(req,res){
res.render("index")
}

module.exports={
    login,
    signup,
    index
}