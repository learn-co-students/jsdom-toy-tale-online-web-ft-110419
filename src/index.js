let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const form = document.querySelector('.add-toy-form');

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  form.addEventListener('submit', addToyToCollection)


  fetchToys();
});

function addToyToCollection(e) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    })
  })
    .then(response => response.json())
    .then(json => {
      renderCards(json);
    })
    .catch(error => console.log(error.message));
}

function likeToy(e) {
  const id = e.target.parentElement.id;
  const p = document.getElementById(id).querySelector('.likes');
  const newLikesTotal = parseInt(p.innerText) + 1;

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ "likes": newLikesTotal })
  })
    .then(() => {
      p.innerText = newLikesTotal + " Likes";
    })
    .catch(error => console.log(error.message))
}

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => {
      renderCards(json);
    })
    .catch(error => console.log(error.message));
}

function renderCards(data) {
  const collection = document.getElementById('toy-collection');

  if (collection.hasChildNodes()) collection.innerHTML = "";

  for (const toy of data) {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const button = document.createElement('button');

    div.classList.add('card');
    div.id = toy.id;
    h2.innerText = toy.name;
    img.src = toy.image;
    img.classList.add('toy-avatar');
    p.innerText = `${toy.likes ? toy.likes : 0} Likes`;
    p.classList.add('likes');
    button.classList.add('like-btn');
    button.innerText = "Like <3";
    button.addEventListener('click', likeToy);

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
    collection.appendChild(div)
  }

}

