let addToy = false;
function fetchCollection() {
  return fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(json => {
      toyCollection(json)
    })
}

function fetchAddToy(toyData) {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {
        "name": toyData.name.value,
        "image": toyData.image.value,
        "likes": 0
      })
  }

  return fetch("http://localhost:3000/toys", configObj)
    .then(res => res.json())
    .then((json) => {
      console.log(json)
      toyCollection(json)
    })
    .catch(err => {
      const div = document.querySelector(".errors")
      let h3 = document.createElement('h3')
      h3.innerHTML = `${err.message}`
      div.appendChild(h3)
    });

}

function fetchEditToy(updateToy) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": updateToy.likes.value += 1
    })
  };
  return fetch("http://localhost:3000/toys/:id", configObj)
    .then(res => res.json())
    .then((json) => {
      activeBtn(json)
    })
    .catch(err => {
      const div = document.querySelector(".errors")
      let h3 = document.createElement('h3')
      h3.innerHTML = `${err.message}`
      div.appendChild(h3)
    });

}

function toyCollection(json) {
  const colletion = document.querySelector("#toy-collection");

  for (let key in json) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML =
      `<h2>${json[key].name}</h2>
    <img src="${json[key].image} ">
    <p> <span id="numLikes">${json[key].likes}</span> Likes </p>
    <button class="like-btn">Like <3 </button>
  `
    colletion.appendChild(div)
  }
}

function activeBtn(obj) {
  let p = document.querySelector("#numLikes")
  let btn = document.querySelector(".like-btn")
  btn.addEventListener("click", () => {
    obj.likes += 1;
    p.innerText = `${obj.likes}`
  });
  return obj
}


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", (e) => {
        e.preventDefault()
        fetchAddToy(e.target);
      })
    } else {
      toyForm.style.display = "none";
    }
  });
  fetchCollection();

});
