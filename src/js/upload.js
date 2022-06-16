
//------------------ Upload ----------------------------------------------
const form = document.getElementById('upload_form');
const vorname = document.getElementById('vorname');
const nachname = document.getElementById("nachname")
const email = document.getElementById("email")
const kindname = document.getElementById("kindname")
const alter = document.getElementById("alter")
const btn = document.getElementById("upload_button")


const inputFile = document.getElementById("input-file")

const datenschutz = document.getElementById("datenschutz")
const datenschutzLabel = document.getElementById("datenschutz-label") 

const teilnahmebedingungen = document.getElementById("teilnahmebedingungen")
const teilnahmebedingungenLabel = document.getElementById("teilnahmebedingungen-label")

const emailOffer = document.getElementById("email-offer")
const emailLabel = document.getElementById("email-label") 


const section_bild = document.getElementById("upload-section_upload_image")

//---------------- English --------------------------------------
const firstname = document.getElementById('firstname');
const lastname = document.getElementById("lastname")
const mail = document.getElementById("mail")
const childName = document.getElementById("childName")
const age = document.getElementById("age")

const privacy = document.getElementById("privacy")
const privacy_label = document.getElementById("privacy-label") 

const conditions = document.getElementById("conditions")
const conditions_label = document.getElementById("conditions-label")

const mailOffer = document.getElementById("mail-offer")
const mail_label = document.getElementById("mail-offer-label") 

//--------------------------------------------------------
const img = document.getElementById("input-file")

const baseURL = 'https://sumsi.dev.webundsoehne.com'

////////////////////////////////////////////////////////////////
let user = {}

btn.addEventListener('click', (e)=>{
    validate()
    const privacy = document.getElementById('datenschutz')
    const conditions = document.getElementById('teilnahmebedingungen')
    const mail = document.getElementById('email-offer')
    const USER_DATA = new FormData(form);
    USER_DATA.getAll
    
    user = {
         firstname: vorname.value,
         lastname: nachname.value,
         email: email.value,
         age: alter.value,
         childName : kindname.value,
         uploaded: true,
         image: img.value
    }

    window.localStorage.setItem("User", JSON.stringify(user));

    console.log(USER_DATA)
    // console.log(privacy.checked)

    if(privacy.checked === true){
        USER_DATA.set('approval_privacypolicy', '1')
    }
    if(conditions.checked === true){
        USER_DATA.set('approval_participation', '1')
    }
    if(mail.checked === true){
        USER_DATA.set('approval_mailnotification', '1')
    }
    USER_DATA.append('image', document.querySelector('input[name="image"]').files[0]);
    USER_DATA.forEach( item => console.log(item))

    for(const [key, value] of USER_DATA){
        console.log(`${key} : ${value}`)
        console.log(typeof value)
    }

    axios({
        method: 'post',
        baseURL: baseURL,
        url: '/api/v1/login',
        headers: {
            'Content-Type': 'multipart/form-data'
          },
        data: {
            email: "admin@csaw.at",
            password: "pw4sumsiadmin"
          } 
      })
      .then( response => {
        // console.log('the resoponse of post - ', response.data)
        // console.log(response.data.token)
        token = response.data.token
      })
      .then ( () => {
        axios({
            method: 'post',
            baseURL: baseURL,
            url: '/api/v1/submissions',
            headers: {
              'Authorization': `Bearer ${token}` ,
              "Content-Type": "multipart/form-data",
              "Accept": "application/json",
            },
            data: USER_DATA   
          })
          .then( response => {
           console.log(response)
          }).catch( err => {
            email.value = "The email is given"
            email.style.border= "4px solid red"
           // console.log(err) 
            console.log(err.response.data)
        })

          console.log(USER_DATA)
      })
      .catch( err => {
        console.log(err.response.data)
    })

}); //ende event listener submit

///--------------------- Validirung --------------------

function validate() {
    if(vorname.value === " " || vorname.value === "" || !isNaN(parseInt(vorname.value))) {
        vorname.value = "Eingabe ist nicht zulässig"
        vorname.style.border= "4px solid red"
    }

    else if(nachname.value === " " || nachname.value === ""  || !isNaN(nachname.value)) {
        nachname.value = "Eingabe ist nicht zulässig"
        nachname.style.border= "4px solid red"
    }
    else  if(email.value === " " || email.value === "") {
        email.value ="Eingabe ist nicht zulässig"
        email.style.border= "4px solid red"
    }
    else if(!isMail(email)){
        email.placeholder = "pleas enter a valid email"
        email.style.border= "4px solid red"
        email.value = "pleas enter a valid email"
    }
    else if(kindname.value === " " ||  kindname.value === ""  || !isNaN(kindname.value)) {
        kindname.value = "Eingabe ist nicht zulässig"
        kindname.style.border= "4px solid red"
    }
    else if(alter.value <= 0) {
        alter.placeholder = "Please enter a valid age"
        alter.style.border= "4px solid red"
    }
    else if(img.value === null){
        alert("Please upload a image")
    }
    else if(!isFileImage(img)){
        alert("Please upload a imag in png or jpeg format")
    }
    else if(datenschutz.checked == false){
        datenschutzLabel.style.color = "red"
    }
    else if(teilnahmebedingungen.checked == false){
        teilnahmebedingungenLabel.style.color = "red"
    }
    else if(emailOffer.checked == false){
        //emailLabel.style.color = "red"
    }
    else{
        reset()
        window.location.href= 'erfolgreich.html'
    }
}


function isMail(email){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   return email.value.match(mailformat)
}

function isFileImage(file) {
    var allowedType =/(\.jpg|\.jpeg|\.png)$/i
    return allowedType.exec(file.value)
}

btn.addEventListener("click", () => {
    validate()
})

const imgFile = document.getElementById("upload-img-file")
inputFile.onchange = evt => {
    const [file] = inputFile.files
    if (file) {
      blah.src = URL.createObjectURL(file)
      blah.style.width=  "100%"
      blah.style.height=  "100%"
      blah.style.objectFit= "cover"
      blah.style.display= "Block"
      blah.style.zIndex= "-2"
      blah.style.position = "absolute"
      imgFile.style.width=  "100%"
      imgFile.style.height=  "100%"
      imgFile.style.zIndex = "2"
      imgFile.style.position = "relative"
      blah.style.borderRadius= "10px"
    }
}

function reset(){
    vorname.style.border= "1px solid black"
    nachname.style.border= "1px solid black"
    email.style.border= "1px solid black"
    kindname.style.border= "1px solid black"
    alter.style.border= "1px solid black"
    datenschutzLabel.style.color = "black"
    teilnahmebedingungenLabel.style.color = "black"
   // emailLabel.style.color = "black"
}

///--------------------- End Validirung --------------------
let lang = 1
console.log(lang)
function changeLanguageUpload(){
  if(lang > 0 ){
    vorname.placeholder = "Firstname"
    nachname.placeholder = "Lastname"
    kindname.placeholder = "ChildName"
    alter.placeholder = "Age"
    datenschutzLabel.innerText = "I consent to the processing of data in accordance with the privacy policy."
    teilnahmebedingungenLabel.innerText ="I have read and agree to your terms and conditions."
    emailLabel.innerText =  "I would like to be notified about your offers via email."
    lang--
  }else{
    vorname.placeholder = "Vorname"
    nachname.placeholder = "Nachname"
    kindname.placeholder = "KindName"
    alter.placeholder = "Alter"
    datenschutzLabel.innerText = "Ich willige in die Datenverarbeitung gemäß der   Datenschutzerklärung ein."
     teilnahmebedingungenLabel.innerText ="Ich habe Ihre Teilnahmebedingungen gelesen und stimme zu. "
     emailLabel.innerText =  "Ich möchte über Email über Ihre Angebote benachrichtigt   werden."
    lang++
  }
 // console.log(lang)

}