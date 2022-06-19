function modalfunction(){
   console.log("----cliked- 1-----")
    const 
    theModal = document.getElementById('modal'),
    theModalDialog = document.getElementById('modal_dialog'),
    closeButton = document.getElementById('modal_close-modal'),
    slideLeft = document.getElementById('slide-left'),
    slideRight = document.getElementById('slide-right'),
    theModalImg = document.getElementById('big-img')


// const 
//     littleImages = document.querySelectorAll('.card_figure_image'),
//     bigImages = document.querySelectorAll('.big-img')
const littleImages = document.querySelectorAll('.card_figure_image')

let i, itemIndex
/* ------------------------------------------------------------
Functionality
------------------- */
closeButton.onclick = () => {
    theModalImg.style.transform = 'scale(0)'
    theModalImg.style.opacity = '0'
    theModal.style.display = 'none'
}
littleImages.forEach( (item, index) => {

    //console.log("modal clicked")
    item.addEventListener('click', () => {
        i = item.dataset.id
        itemIndex = index
        let itemSrc = item.src

        //console.log(index)
       ////// console.log(i)
        //////console.log(itemSrc)

        theModal.style.display = 'flex'

        theModalImg.src = itemSrc
        setTimeout( () => {
            theModalImg.style.transform = 'scale(1)'
            theModalImg.style.opacity = 1
        }, 001)
        // theModalImg.style.transform = 'scale(1)'
    })
})

slideRight.onclick = () =>{
    let nodeListlength = littleImages.length
    let tranformedItemIndex = itemIndex +1

    // console.log(nodeListlength)
    // console.log(tranformedItemIndex)

    if(nodeListlength == tranformedItemIndex){
        theModal.style.display = 'none'
    }
    else{
       
        theModalImg.style.transform = 'scale(0)'
        theModalImg.style.opacity = '0'
    
        setTimeout( () => {
        itemIndex++
    
        //////console.log('the item index = ', itemIndex)
    
        const newItem = littleImages.item(itemIndex)
       //// console.log(newItem)
    
        const newSrc = newItem.src
       //// console.log(newSrc)
    
        theModalImg.src = newSrc
    
        // setTimeout( () => {
      
        // }, 500)
    
        theModalImg.style.transform = 'scale(1)'
        theModalImg.style.opacity = 1
        }, 800)
    }
}


slideLeft.onclick = () =>{
    if (itemIndex == 0){
        return
    }
    else{
        theModalImg.style.transform = 'scale(0)'
        theModalImg.style.opacity = '0'

        setTimeout( ()=> {
            itemIndex--

            //console.log('the item index = ', itemIndex)
    
            const newItem = littleImages.item(itemIndex)
            //console.log(newItem)
        
            const newSrc = newItem.src
            //console.log(newSrc)
        
            theModalImg.src = newSrc

            theModalImg.style.transform = 'scale(1)'
            theModalImg.style.opacity = 1
        }, 800)
           
    }
   
}





/* -------------------------------------------------------------
Testing AREA
--- */

console.log(littleImages)

littleImages.forEach( (item) => {
  //  console.log(item.dataset.id)
})



}


modalfunction()