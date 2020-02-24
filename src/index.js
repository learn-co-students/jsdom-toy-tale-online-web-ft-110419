let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      console.log(json)
      // console.log(json[0])
      // console.log(json[0].name)
    createToyCard(json)

    })
});

function createToyCard(json) {
  let div = document.getElementById("toy-collection")
  for (const element of json) {
    console.log(element);
    let card = document.createElement("div")
    card.className = "card"
    div.appendChild(card)

    let header = document.createElement("h2")
    header.innerText = element.name
    card.appendChild(header)

    let image = document.createElement("img")
    image.src = `${element.image}`
    image.className = "toy-avatar"
    card.appendChild(image)

    let footer = document.createElement("p")
    footer.innerText = `${element.likes} likes`
    card.appendChild(footer)

    let button = document.createElement("button")
    button.className = "like-btn"
    button.innerHTML = "Like <3"
    card.appendChild(button)
  }
}






// function getToys{
    
//   let configObj = {
//       // method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//           name: name,
//           image: email
//       })
//     };
  
//     return fetch("http://localhost:3000/users", configObj)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(object) {
//         let body = document.querySelector("body")
//         let element = document.createElement('p')
//         element.innerHTML= object.id 
//         body.appendChild(element)
//       console.log(object);
//     })
//     .catch(function(error) {
//       document.body.innerHTML= 'Unauthorized Access'
//       alert("Unauthorized Access");
//       console.log(error.message);
//     });
// }
