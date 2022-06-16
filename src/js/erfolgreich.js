const userList = document.getElementById("user_Daten")
const bild = document.getElementById("upload_bild")
const userDataLocal = JSON.parse(localStorage.getItem('User'))
const url = "https://sumsi.dev.webundsoehne.com/api/v1/login"
const geturl = new URL("https://sumsi.dev.webundsoehne.com/api/v1/submissions");
const baseUrl = new URL("https://sumsi.dev.webundsoehne.com");
const test_list = document.getElementById("test-list");


userList.innerHTML =
 `<li> ${userDataLocal.firstname} </li>
  <li> ${userDataLocal.lastname} </li>
  <li> ${userDataLocal.email} </li>
  <li> ${userDataLocal.age} </li>
  <li> ${userDataLocal.childName} </li>`

let body = {
  "email": "admin@csaw.at",
  "password": "pw4sumsiadmin"
}
function get(){
  axios.post(url,body)
    .then(function (response) {
      // get all images from the Server
      axios.get(geturl , {
           headers: {"Authorization" : `Bearer ${response.data.token}`} })
      .then(res => {
          console.log(res.data.data)
          list = res.data.data
          // create list of images in the html 
          list.forEach((item) => {
            if(item.email == userDataLocal.image){
                if(item.image !== null){
                  bild.src = baseUrl + item.image.public_location
                  console.log(item.image.location);
                }
              }
          })
      })
      .catch((error) => {
        console.log(error)
      })

  }).catch(function (error) {
      console.log(error);
  });
}
get()


