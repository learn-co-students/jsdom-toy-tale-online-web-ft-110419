let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  let promise = fetch("http://localhost:3000/toys").then(response => response.json()).then(function(object){
    object.forEach(function(toy) {
      let div = document.createElement("div")
      div.class = "card"
      div.innerHTML = `<h2>Name: ${toy.name}</h2><p>Likes: <span class="number">${toy.likes}</span></p><img class="toy-avatar" src= ${toy.image}><button class="like-btn">"Like This Toy!"</button>`
      document.body.appendChild(div)
      let button = div.children[3]
      button.addEventListener("click", function(){
        let likes = button.parentNode.children[1]
        let originalnum = Number(likes.children[0].innerHTML)
        console.log(originalnum)
        let num = originalnum + 1
        likes.innerHTML = `Likes: <span class="number">${num}</span>`
        let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
          },
          body: JSON.stringify({
            "likes": num
          })
        }
        fetch(`http://localhost:3000/toys/${toy.id}`, configObj).then(response => response.json()).catch((error) => console.log(error.message))
      })
    })
  })
  

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

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
  }

  fetch("http://localhost:3000/toys", configObj).then(response => response.json()).then(function(object){
    let div = document.createElement("div")
    div.class = "card"
    div.innerHTML = `<h2>Name: ${object.name}</h2><p>Likes: ${object.likes}</p><img class="toy-avatar" src= ${object.image}><button class="like-btn"></button>`
    document.body.appendChild(div)
  })



});
