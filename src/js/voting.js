
const userDataLocal = JSON.parse(localStorage.getItem('User'))
const baseUrl = new URL("https://sumsi.dev.webundsoehne.com")

const submission = "123e4567-e89b-12d3-a456-426614174001"
const votingUrl = new URL(`https://sumsi.dev.webundsoehne.com/api/v1/submissions/${submission}/votings`)

// --------------- Settings --------------------

const url = "https://sumsi.dev.webundsoehne.com/api/v1/login"
const settingsUrl = new URL("https://sumsi.dev.webundsoehne.com/api/v1/settings")

let body = {
  "email": "Rezahosseiniafg2233@gmail.com"
}

const LocalVotedSubmission = localStorage.getItem("votedSubmission")
let loginBody= {
  email: "admin@csaw.at",
  password: "pw4sumsiadmin"
}

function get(){
    axios.post(url,loginBody)
      .then(function (response) {
        const header = { headers: {"Authorization" : `Bearer ${response.data.token}`} }
        // get all Settings Booleans from the Server
        axios.get(settingsUrl , header)
        .then(res => {
            const voteOpen= res.data.data.voting_open
            console.log(voteOpen);
            if(voteOpen){
              //--------------- voting --------------------
              console.log(LocalVotedSubmission);
              if(LocalVotedSubmission === submission){
                console.log("You have a vote for this submission");
              }else{
                axios.post(votingUrl, body, header)
                .then(function (response){
                    console.log(response)
                    localStorage.setItem("votedSubmission", submission)
                }).catch(function (error){
                    console.log(error);
                })
              }
              //--------------- voting --------------------
            }else{
              console.log("not allowed to vote");
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

// --------------- Settings --------------------


