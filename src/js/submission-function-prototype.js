const form = document.querySelector('form');
const privacy = document.getElementById('datenschutz')
const conditions = document.getElementById('teilnahmebedingungen')
const mail = document.getElementById('mail_notification')

// const baseURL = 'https://sumsi.dev.webundsoehne.com'

form.addEventListener('submit', (e)=>{
    const privacy = document.getElementById('datenschutz')
    
    // to prevent reload
    e.preventDefault();

    //creates a multipart/form-data object
    // let data = new FormData(form);
    
    // console.log(data)

    // data.forEach( item => console.log(item))

    // for (const [key, value] of data) {
    //     console.log(`${key}: ${value}\n`)
    //   }

    const USER_DATA = new FormData(form);


    USER_DATA.getAll
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

    USER_DATA.forEach( item => console.log(item))

    for(const [key, value] of USER_DATA){
        console.log(`${key} : ${value}`)
        console.log(typeof value)
    }


    
    // axios({
    //     method: "post",
    //     url: "/",
    //     data: data,
    // })
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         throw err;
    //     });


    // alert('hello')


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
            data: USER_DATA   
          })
          .then( response => {
           console.log(response)
          })
        //   .catch()
      })
      .catch( err => console.log(err) )
    

    
}); //ende event listener submit
 





