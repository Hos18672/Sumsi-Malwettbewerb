const showPlace = document.getElementById('container-for-all')

const baseURL = 'https://sumsi.dev.webundsoehne.com'

let token


function fetchTheToken(){

    axios({
        method: 'post',
        baseURL: baseURL,
        url: '/api/v1/login',
        data: {
            email: "admin@csaw.at",
            password: "pw4sumsiadmin"
          }
      
      })
      .then( response => {
        console.log('the resoponse of post - ', response.data)
        console.log(response.data.token)

        token = response.data.token
      })
      .catch( err => console.log(err) )
  
}

function showToken(){
  console.log('the token is ', token)
}



function getTheImages(){

  axios({
    method: 'post',
    baseURL: baseURL,
    url: '/api/v1/login',
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
        method: 'get',
        baseURL: baseURL,
        url: '/api/v1/submissions',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
      .then( response => {
        // console.log('the response ', response)
        // console.log('the data of response - ', response.data)
        
        let x = response.data.data
        

        x.forEach( item =>{
          // console.log('the item of x ', item)
      
          console.log(item.image)
          
        } )

        let correctUser = x.filter( item => item.image != null)

        console.log(correctUser)
       
        correctUser.forEach( item =>{
          console.log(item.image.public_location)

          let src = baseURL + item.image.public_location

          showPlace.innerHTML += 
          `<img src="${src}" alt="ein gemaltes Bild" class="image">`
        } )
      
      })
  })
  .catch( err => console.log(err) )

}

let theMailOfTheVoter 


function getTheGallery(){

  /**
   * the admin login =>
   * gives a token
   */
  axios({
    method: 'post',
    baseURL: baseURL,
    url: '/api/v1/login',
    data: {
        email: "admin@csaw.at",
        password: "pw4sumsiadmin"
      }
  
  })
  /**
   * token wird in 
   * variable gespeichert
   */
  .then( response => {
    // console.log('the resoponse of post - ', response.data)
    // console.log(response.data.token)

    token = response.data.token
  })
  /**
   * die submissions am server
   * werden gefetcht
   */
  .then ( () => {
    axios({
        method: 'get',
        baseURL: baseURL,
        url: '/api/v1/submissions',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
      .then( response => {
        // console.log('the response ', response)
        // console.log('the data of response - ', response.data)
        
        let x = response.data.data

        console.log('the response data.data', x)
        

        // x.forEach( item =>{
        //   console.log('the item of x ', item)
      
        //   // console.log(item.image)
  
        // } )

        

        let correctUsers = x.filter( item => item.image != null)

        console.log('the correct users', correctUsers)
       
        correctUsers.forEach( item =>{
          // console.log(item.image.public_location)

          const {
            id: theUserIdForVote, 
            votings: theVotings, 
            image: theImage, 
            child_firstname: childName,
            child_age: childAge   } = item

          console.log('the user id for vote is => ', theUserIdForVote)
          console.log('the votings that the user had get are => ', theVotings)
          console.log('the image for the vote is => ', theImage)
          console.log('the child name is => ', childName)
          console.log('the child age is => ', childAge)

          const {public_location: theImageSrc} = theImage

          console.log('the src of the image is => ', theImageSrc)

          let src = baseURL + theImageSrc

          console.log(src)

          let voteCount = theVotings.length

          showPlace.innerHTML += 
          `<figure>
          <img src="${src}" alt="ein gemaltes Bild" class="image">
          <p>${childName}, ${childAge}</p>
          <img src="../pics/star-empty.webp" class="vote-icon" data-image-userId="${theUserIdForVote}"
          <p>${voteCount}</p>
          </figure>`

        } ) //for each

        // this 2 const are for testing 
        // const submission = '075e4e5d-9d92-4ed1-86d5-95be560419ec'
        // const votePath = `api/v1/submissions/${submission}/votings`

        const theVoteButtons = document.querySelectorAll('.vote-icon')

        theVoteButtons.forEach( item => {

          item.addEventListener('click', ()=> {
            console.log(item)
            console.log(item.dataset)
            console.log(item.dataset.imageUserid)

            if(!theMailOfTheVoter){
              const xyz = window.prompt('Bitte geben sie Ihre Email Adresse ein', 'max@muster.at')
              console.log(xyz)
             

              let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

              if(xyz.match(mailformat))
                {
                theMailOfTheVoter = xyz
                }
              else
                {
                console.log('no valid email')
                alert('Sie müssen eine gültige Email Adresse eingeben')
                return
                }
              

              // theMailOfTheVoter = xyz
            }

            let submissionUserid = item.dataset.imageUserid
            let votePath = `api/v1/submissions/${submissionUserid}/votings`

            //the vote when clicked
            axios({
              method: 'post',
              baseURL: baseURL,
              url: votePath,
              headers: {
                'Authorization': `Bearer ${token}` 
              },
              data: {
                email : theMailOfTheVoter
              }
            })
            .then( res => {
              console.log(res)
              // alert(res.data.message)

              switch (res.data.message){
                case "api.messages.store.success":
                  alert('Vote war erfolgreich!')
                  break

                case "Only 1 vote per image allowed.":
                  alert('Es ist nur 1 Vote pro Bild erlaubt')
                  break

                case "Only 5 votes per user allowed." :
                  alert('Es dürfen nur 5 Bilder bewertet werden')
                  break
              }


            })// response vom click listener


          }) //item eventlistener
        }) // vote buttons for each
        
        
      })  // then response

  })//get submissions

  .catch( err => console.log(err) )

} // function get the gallery



// const USER = {
//   forename: 'string',
//   surename: 'string',
//   email: 'string',
//   childName: 'string',
//   childAge: Number,
//   image: URL,
//   privacypolicy: Boolean,
//   participation: Boolean,
//   mailNotification: Boolean 
// }

// const NEW_USER = Object.create(USER)

// NEW_USER.forEach = "Max"
// NEW_USER.surename = "Musterman"
// NEW_USER.email = "test_email@google.de"
// NEW_USER.childAge = 8
// NEW_USER.image = 'xxx'
// NEW_USER.privacypolicy = true
// NEW_USER.participation = true
// NEW_USER.mailNotification = false

// console.log(NEW_USER)

const body = new FormData();
body.append('image', document.querySelector('input[name="image"]').files[0]);


function pushTheDatas(){

  axios({
    method: 'post',
    baseURL: baseURL,
    url: '/api/v1/login',
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
        data: {
          legalguardian_firstname: 'Max',
          legalguardian_lastname: 'Muster',
          email: 'mm@xx.tt',
          child_firstname: 'Moritz',
          child_age: '8',
          image: 'optimus-artwork-3.webp',
          approval_privacypolicy: true,
          approval_participation: true,
          approval_mailnotification: true
          
        }    
      })
      .then( response => {
       console.log(response)
      })
  })
  .catch( err => console.log(err) )

}

