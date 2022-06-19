const theHeaderLinks = document.querySelectorAll('.header li')
const theNavi = document.querySelector('.header_nav')
const theCheckbox = document.getElementById('hamburger-check')

// let xy = theNavi.style
// console.log(xy)
// console.log(theNavi)


console.log(theHeaderLinks)

theHeaderLinks.forEach( link => {
    link.addEventListener('click', (item) =>{
    //     let xy = theNavi.style.position

    //     if(theNavi.style.position == 'fixed'){
    //         alert('hamburger is active')
    //     }
    //    alert(xy)

    // theNavi.classList.add("get-out-of-view")

    theCheckbox.checked = false
    document.removeEventListener( 'click', this.Function)

    })
})