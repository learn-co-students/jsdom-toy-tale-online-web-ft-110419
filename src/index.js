let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  form.addEventListener('submit', addNewToy);
  fetchToys();
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json();
  })
  .then(function (json) {
    renderToys(json);
  });
};

function addNewToy() {
  const form = document.querySelector(".add-toy-form");
  const objBody = {
    name: form[0].value,
    image: form[1].value,
    likes: 0
  };
  obj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(objBody)
  };
  fetch("http://localhost:3000/toys", obj)
}

function renderToys(json) {
  json.forEach(toy => {
    const div = document.createElement('div');
    div.className = "card";
    const h2 = document.createElement('h2')
    h2.innerText = toy.name;
    const img = document.createElement('img');
    img.className = "toy-avatar";
    img.src = toy.image;
    const p = document.createElement('p');
    p.innerText = `${toy.likes} Likes`;
    const input = document.createElement('input');
    input.type = "hidden";
    input.value = toy.id;
    const btn = document.createElement("button");
    btn.className = "like-btn";
    btn.innerText = "Like <3"
    btn.addEventListener('click', addLike);
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(input);
    div.appendChild(btn);
    document.getElementById('toy-collection').appendChild(div);
  });
};

function addLike() {
  valueSplit = this.parentNode.childNodes[2].innerText.split(" ");
  newValue = parseInt(valueSplit[0], 10) + 1
  this.parentNode.childNodes[2].innerText = `${newValue} Likes`
  const url = `http://localhost:3000/toys/${this.parentNode.childNodes[3].value}`
  const obj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: newValue
    })
  };
  fetch(url, obj);
}
