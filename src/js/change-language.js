const languageElement = document.querySelectorAll('.change-language')
const germanLanguage = document.querySelectorAll('.german')
const englishLanguage = document.querySelectorAll('.english')

let isGermanTrue = true

console.log(germanLanguage)
console.log(englishLanguage)

// languageElement.addEventListener("click", changeTheLanguage())

languageElement.forEach( (item) => {
    item.addEventListener('click', changeTheLanguage)
    
})


function changeTheLanguage() {
    

    if(isGermanTrue){
        germanLanguage.forEach ( (item) => {
            item.style.display = 'none'
        })
    
        englishLanguage.forEach ( (item) => {
            item.style.display = 'block'
        })

        isGermanTrue = false
    }
    else {
        germanLanguage.forEach ( (item) => {
            item.style.display = 'block'
        })
    
        englishLanguage.forEach ( (item) => {
            item.style.display = 'none'
        })

        isGermanTrue = true
    }

  
}
