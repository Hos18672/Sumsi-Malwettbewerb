const languageElement = document.querySelectorAll(".change-language");
const germanLanguage = document.querySelectorAll(".german");
const englishLanguage = document.querySelectorAll(".english");


// // let isGermanTrue = true

// function changeTheLanguage() {
//   console.log("hello");

//   if (isGermanTrue) {
//     germanLanguage.forEach((item) => {
//       item.style.display = "none";
//     });

//     englishLanguage.forEach((item) => {
//       item.style.display = "block";
//     });

//     isGermanTrue = false;
//   } else {
//     germanLanguage.forEach((item) => {
//       item.style.display = "block";
//     });

//     englishLanguage.forEach((item) => {
//       item.style.display = "none";
//     });

//     isGermanTrue = true;
//   }
// }


localStorage.setItem('language', 'german')

languageElement.forEach((item) => {
  item.addEventListener("click", changeTheLanguage);
});


function changeTheLanguage() {
  console.log("hello");
  let languageOfLocalStorage = localStorage.getItem('language')
  // alert(languageOfLocalStorage)

  if (languageOfLocalStorage == 'german') {
    germanLanguage.forEach((item) => {
      item.style.display = "none";
    });

    englishLanguage.forEach((item) => {
      item.style.display = "block";
    });

    localStorage.setItem('language', 'english')
    
  } else {
    germanLanguage.forEach((item) => {
      item.style.display = "block";
    });

    englishLanguage.forEach((item) => {
      item.style.display = "none";
    });

    localStorage.setItem('language', 'german')
    
  }
}
