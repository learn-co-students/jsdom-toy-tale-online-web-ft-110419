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
  document.querySelector(".submit").addEventListener("click", () => {
    event.preventDefault();
    let name = document.querySelectorAll(".input-text")[0].value;
    let image = document.querySelectorAll(".input-text")[1].value;
    if (name && image !== "") {
      submitToy(name, image);
    }
  })
  getToys();
});

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => renderToys(json));
}

function renderToys(json) {
  json.forEach(toy => {
    displayToy(toy);
  })
}

function displayToy(toy) {
  let toyCollection = document.getElementById("toy-collection");

  let div = document.createElement('div');
  div.setAttribute('class', 'card');

  let h = document.createElement('H2');
  h.innerText = toy.name;
  div.appendChild(h);

  let img = document.createElement('img');
  img.src = toy.image;
  img.setAttribute('class', 'toy-avatar');
  div.appendChild(img);

  let p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;
  div.appendChild(p);

  let button = document.createElement('BUTTON');
  button.innerText = "Like <3"
  button.setAttribute('class', 'like-btn');
  div.appendChild(button);
  addLike(button, p, toy.id);

  toyCollection.appendChild(div);
}

function submitToy(name, image) {
  const data = { name: name, image: image, likes: 0};

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(function(response) {
    return response.json();
  })
  .then((data) => {
    displayToy(data);
    location.reload();
  })
}

function addLike(button, p, id) {
  button.addEventListener("click", function () {
    p.innerText = `${++p.innerText.split(" ")[0]} Likes`;

    fetch("http://localhost:3000/toys/" + id, {
    method: 'PATCH',
    body: JSON.stringify({
      likes: parseInt(p.innerText.split(" ")[0])
    }),
    headers: {
    'Content-type': 'application/json',
    Accept: "application/json"
    }
    })
    .then(response => response.json())
    .then(json => console.log(json))
  })
}