const userList = document.getElementById("user_Daten")

const userDataLocal = JSON.parse(localStorage.getItem('User'))



userList.innerHTML =
 `<li> ${userDataLocal.firstname} </li>
  <li> ${userDataLocal.lastname} </li>
  <li> ${userDataLocal.email} </li>
  <li> ${userDataLocal.age} </li>
  <li> ${userDataLocal.childName} </li>
  <img src=${userDataLocal.image}></img>`



console.log(userDataLocal.firstname);
