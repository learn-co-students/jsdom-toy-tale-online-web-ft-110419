let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {

    addNewToy()

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
    createToyCard(json)
  })
});

// challenge 1 works
function createToyCard(json) {
  let div = document.getElementById("toy-collection")
  for (const element of json) {
    let card = document.createElement("div")
    card.className = "card"
    div.appendChild(card)

    let header = document.createElement("h2")
    header.innerText = `${element.id}. ${element.name}`
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
  like()
}


// Challenge 2 works
function addNewToy() {
  let submit = document.querySelectorAll(".container input")[2]
  submit.addEventListener("click", () => {  
    
    let configObj = {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: document.querySelectorAll(".container input")[0].value,
        image: document.querySelectorAll(".container input")[1].value,
        likes: "0"
      })
    };
    
      fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        console.log(object);
  
      })
      .catch(function(error) {
        document.body.innerHTML= 'Unauthorized Access'
        alert("Unauthorized Access");
        console.log(error.message);
      });
  })
}

// challenge 3 works
function like() {
  let likeButtons = document.querySelectorAll("button.like-btn")
  likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', function() {
      console.log(likeButton)
      let n = likeButton.previousElementSibling.innerText[0]
      likeButton.previousElementSibling.innerText = `${++n} likes`
      let id = likeButton.previousElementSibling.previousElementSibling.previousElementSibling.innerText[0]

      let configObj = {
        method: "PATCH",
        headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: n
        })
      };
      console.log(n)

      fetch(`http://localhost:3000/toys/${id}`, configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        console.log(object);
  
      })
      .catch(function(error) {
        document.body.innerHTML= 'Unauthorized Access'
        alert("Unauthorized Access");
        console.log(error.message);
      });
    })
  })
}