const uploadContainer = document.getElementById("upload-container");

const menuDE = document.getElementById("upload-hamburger-menu")
const menuEN = document.getElementById("upload-hamburger-menu-en")

const url = "https://sumsi.dev.webundsoehne.com/api/v1/login"
const geturl = new URL("https://sumsi.dev.webundsoehne.com/api/v1/settings");

let body = {
    "email": "admin@csaw.at",
    "password": "pw4sumsiadmin"
}


function get(){
    axios.post(url,body)
      .then(function (response) {
        // get all Settings Booleans from the Server
        axios.get(geturl , { headers: {"Authorization" : `Bearer ${response.data.token}`} })
        .then(res => {
            console.log(res.data.data.submission_open)
          //  subOpen.innerText =  res.data.data.submission_open
            if(res.data.data.submission_open){
                uploadContainer.style.display = 'flex'
                menuDE.style.visibility="visible"
                menuEN.style.visibility="visible"
                return 
            }
            else{
                menuDE.style.position="absolute"
                menuEN.style.position="absolute"
                menuDE.style.right="-500vw"
                menuEN.style.right="-500vw"
                menuDE.style.visibility="hidden"
                menuEN.style.visibility="hidden"
                uploadContainer.style.display = 'none'
            }
        })
        .catch((error) => {
          console.log(error)
        })

    }).catch(function (error) {
        console.log(error);
    });
}
get()
