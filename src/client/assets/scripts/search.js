// Get the modal
var modal = document.getElementById("myModal");
var modalcontent = document.getElementsByClassName("modal-content")[0];

console.log(modalcontent)
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const userinfo = async (username) =>{
    const ul = document.getElementsByClassName('userinfoul')[0];
    
   if(ul !== undefined){
       ul.remove()
   }
modal.style.display = "flex";
    const result = await fetch('/fetchuserinfo?username='+username)
    result.text().then((info)=>{
        let userinfo = JSON.parse(info)

let userinfoul = document.createElement('ul')
userinfoul.classList.add('userinfoul')
let infoli = `
<li><img src="${userinfo.userimage}" alt="userimage"> </li>
<li><span>Name :</span> ${userinfo.uname}</li>
<li><span>Followers :</span>  ${userinfo.followers}</li>
<li><span>Following :</span>  ${userinfo.following}</li>
<li><span>contributions :</span>  ${userinfo.contributions}</li>
`

userinfoul.innerHTML = infoli
modalcontent.appendChild(userinfoul)

    })
}