const name = document.getElementsByClassName("username")[0];
                            name.onclick = function () {
                                const usermenu = document.getElementsByClassName("user-menu-list")[0];
                                if (usermenu.style.height == "auto") {
                                    usermenu.style.height = "0"
                                } else {
                                    usermenu.style.height = "auto"
                                }
                            }

                            const theme = document.getElementsByClassName("switch")[0].getAttribute("data-theme");
                            const checkbox = document.getElementsByName("darktheme")[0]
                            if (theme == "true") {
                                checkbox.checked = "true";
                            }
                            else {
                                checkbox.checked = null;

                            }

                            let pages = document.querySelector(".pagenationContainer").getAttribute("data-page");
                            let index = document.querySelectorAll(".pageIndexLink");

                            index.forEach((e) => {
                                if (e.innerText == pages) {
                                    e.classList.add("page-active");
                                }
                            })

function themepost(){
    if(checkbox.checked == "true"){
        var data  = {theme : "true"}
    }
    else{
        var data = {theme : "false"}
    }
                                fetch("/themepost", {
          
        method: "POST",
          
        body: JSON.stringify(data),
          
        headers: {
            "Content-type": "application/json"
        }
    })

    const body = document.getElementsByTagName('body')[0]
    body.classList.toggle("darktheme")

}
