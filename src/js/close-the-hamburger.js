const theHeaderLinks = document.querySelectorAll('.header li')
const theNavi = document.getElementById('header_nav')

console.log(theHeaderLinks)

theHeaderLinks.forEach( link => {
    link.addEventListener('click', () =>{
       if(theNavi.style.width == '50vw'){
        alert('the widht is changed')
       }
    })
})