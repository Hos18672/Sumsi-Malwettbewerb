function getObjectByMail(){

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
          console.log('the response ', response)
          console.log('the data of response - ', response.data)
          
          let x = response.data.data
          
  
          x.forEach( item =>{
            // console.log('the item of x ', item)
        
            console.log(item)
            console.log(item.email)
            
          } )

          const searchedUserObject = x.find( item => item.email === 'kiwi_eis@tutifrutti.at')
          console.log('the searched user object is', searchedUserObject)

          const theUserId = searchedUserObject.id
         
          console.log('the searched id is ', theUserId)
  
        
        })
    })
    .catch( err => console.log(err) )
  
  }


  // const theVoteButtons = document.querySelectorAll('.vote-icon')

  // theVoteButtons.forEach( item => {
  //   item.addEventListener('click', ()=> {
  //     console.log(item)
  //   })
  // })

  const allVotesOfTheUser = []

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
          // console.log('the response ', response)
          // console.log('the data of response - ', response.data)
          
          let x = response.data.data
          
  
          x.forEach( item =>{
            // console.log('the item of x ', item)
        
            // console.log(item)
            // console.log('the votings', item.votings)

            const theVotings = item.votings

            // theVotings.forEach( item => console.log('the item email', item.email))

            const theSearchedVotingsOfAuser = theVotings.find( item => item.email == 'kiwi_eis@tutifrutti.at')
            // console.log('the searched votings', theSearchedVotingsOfAuser)

            if(theSearchedVotingsOfAuser){
              allVotesOfTheUser.push(theSearchedVotingsOfAuser)
            }

    
          } )

          console.log(allVotesOfTheUser)

        
        })
    })
    .catch( err => console.log(err) )
  
  }