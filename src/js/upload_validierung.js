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
        emailLabel.style.color = "red"
    }
    else{
        reset()
    }

    //--------------- English --------------------------------
    
    if(firstname.value === " " || firstname.value === "" || !isNaN(parseInt(firstname.value))) {
        firstname.value = "Input is invalid"
        firstname.style.border= "4px solid red"
    }
    else if(lastname.value === " " || lastname.value === ""  || !isNaN(lastname.value)) {
        lastname.value ="Input is invalid"
        lastname.style.border= "4px solid red"
    }
    else  if( mail.value === " " || mail.value === "") {
         mail.value ="Input is invalid"
         mail.style.border= "4px solid red"
    }
    else if(!isMail(mail)){
        mail.placeholder = "pleas enter a valid email"
        mail.style.border= "4px solid red"
        mail.value = "pleas enter a valid email"
    }
    else if(childName.value === " " ||  childName.value === ""  || !isNaN(childName.value)) {
        childName.value ="Input is invalid"
        childName.style.border= "4px solid red"
    }
    else if(age.value <= 0) {
        age.placeholder = "Please enter a valid age"
        age.style.border= "4px solid red"
    }
    else if(img.value === null){
        alert("Please upload a image")
    }
    else if(!isFileImage(img)){
        alert("Please upload a imag in png or jpeg format")
    }
    else if(privacy.checked == false){
        privacy_label.style.color = "red"
    }
    else if(conditions.checked == false){
        conditions_label.style.color = "red"
    }
    else if(mailOffer.checked == false){
        mail_label.style.color = "red"
    }
}


function isMail(email){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   return email.value.match(mailformat);
}

function isFileImage(file) {

    var allowedType =/(\.jpg|\.jpeg|\.png)$/i;
           
    return allowedType.exec(file.value)

}


btn.addEventListener("click", () => {
    validate()
    showPreview()
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
