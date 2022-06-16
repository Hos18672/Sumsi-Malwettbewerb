const baseURL = 'https://sumsi.dev.webundsoehne.com'

const theGallery = document.getElementById('container-gallery')

let token
let theMailOfTheVoter = ""
let em =  JSON.parse(localStorage.getItem('User'))

if(em != null){
   theMailOfTheVoter = em.email
}

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

        
        /**
         * alle benutzer die 
         * tatsächlich ein bild haben
         */
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

          // showPlace.innerHTML += 
          // `<figure>
          // <img src="${src}" alt="ein gemaltes Bild" class="image">
          // <p>${childName}, ${childAge}</p>
          // <img src="../pics/star-empty.webp" class="vote-icon" data-image-userId="${theUserIdForVote}"
          // <p>${voteCount}</p>
          // </figure>`

          theGallery.innerHTML +=
          `<div class="card">
          <figure class="card_figure">
              <img src="${src}" alt="ein gemaltes Bild" class="card_figure_image" data-id="1">
              <figcaption class="german">${childName},<br class="hidden-break"> <span class="years">${childAge} Jahre alt</span></figcaption>
              <figcaption class="english" lang="en">${childName},<br class="hidden-break"> <span class="years">${childAge} Years old</span></figcaption>
          </figure>

          <div class="card_rating">
              <img src="../pics/star-empty.webp" alt="rating star" class="vote-icon" data-image-userId="${theUserIdForVote}">
              <span>${voteCount}</span>
          </div>
          </div>`

        } ) //for each

        const theVoteButtons = document.querySelectorAll('.vote-icon')

        theVoteButtons.forEach( item => {


          item.addEventListener('click', ()=> {

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
                  // alert('Vote war erfolgreich!')
                  item.src = '../pics/star-filled.webp'
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



//----------------------------------------------


function getAllVotesOfUser(){

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
      
        let x = response.data.data
        
        x.forEach( item =>{
          // console.log('the item of x ', item)
          // console.log(item)
          console.log('the votings', item.votings)

          const theVotings = item.votings

            theVotings.forEach( item => console.log('the item email', item.email))

            const theVoteButtons = document.querySelectorAll('.vote-icon')
            theVoteButtons.forEach((item) => {
              console.log('the item email-------------')

              if(item.email == 'kiwi_eis@tutifrutti.at'){
                item.src = '../pics/star-filled.webp'
                console.log('the item email-------------')
              }
            })
  
        } )
      
      })
  })
  .catch( err => console.log(err) )

}


getAllVotesOfUser()