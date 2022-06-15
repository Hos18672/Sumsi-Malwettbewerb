const subOpen = document.getElementById("submission-open");
const votOpen = document.getElementById("voting-open");

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
            subOpen.innerText =  res.data.data.submission_open
            votOpen.innerText = res.data.data.voting_open
        })
        .catch((error) => {
          console.log(error)
        })

    }).catch(function (error) {
        console.log(error);
    });
}
get()
