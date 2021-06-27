const bcrypt = require("bcryptjs")
const user = require("../models/signupmodel")


const signup = async(req,res)=>{
    const finduser = await user.find({email : req.body.email}) 
   
    if(finduser.length > 0){
        req.flash("error","User exists")
        res.redirect("/signup")
    }
    else{
        const newuser = await user.create({
            name : req.body.name.toLowerCase(),
            email : req.body.email.toLowerCase(),
            password : req.body.password,
            theme : "false"
        })
        req.session.user = newuser
        req.flash("success","Signup successful")
        res.redirect("/index")
    }
}

const login = async (req,res) => {
if(req.body.email && req.body.password){
    const finduser = await user.findOne({email : req.body.email})
    if(finduser){
        const match = await bcrypt.compare(req.body.password,finduser.password)
        if(match){
            req.session.user = finduser
            req.flash("success","login successful")
            res.redirect("/index")
        }
        else{
            req.flash("error","Invalid credentials")
            res.redirect("/")
        }
    }
    else{
        req.flash("error","Invalid credentials")
        res.redirect("/")
    }
}
}

const logout = (req, res) => {
	req.session.destroy();
  res.redirect("/");
}

const checksession = (req,res,next) => {
     if(!req.session.user){
        res.redirect("/")
    }
    else{
        next()
    }
}

const redirecthome = (req,res,next) =>{
    if(req.session.user){
        res.redirect("/index")
    }else{
        next()
    }
}

const themepost = async(req,res)=> {
const finduser = await user.findOne({email:req.session.user.email})
console.log(finduser + "ppp")
if(finduser){
    if(finduser.theme == "false"){
        finduser.theme = "true";
        req.session.user.theme = "true";
    }
    else{
        finduser.theme = "false"
        req.session.user.theme = "false";
    }
    await finduser.save()
    res.redirect("/index")
}
else{
    req.flash('error',"something went wrong")
    res.redirect("/index")
}
}


module.exports = {
    signup,
    login,
    logout,
    checksession,
    redirecthome,
    themepost
}