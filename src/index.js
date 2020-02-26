let addToy = false;

// received code
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const createToy = document.querySelector(".submit");

  createToy.addEventListener("click", postToy);
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  getToy();
});


function getToy(){
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toysArr => toysArr.forEach(addToCollection))
};

function addToCollection(toy){
  let toys = document.querySelector("#toy-collection");
  toys.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} likes</p>
    <button class="like-btn" id="${toy.id}">Like <3</button>
  </div>`;
  const likeToyButton = document.getElementsByClassName("like-btn");
  let likeButton = document.querySelector(".like-btn")
  likeButton.addEventListener('click', (e) => {
    // console.log(e.target.dataset);
    addLike(e);
    
  });

  //this is a problem -- make it null
  // likeToyButton.addEventListener('click', (e) => {
  //   console.log(e.target.dataset);
  //   addLike(e)
  // });
}

// document.querySelector("#toy-collection").addEventListener('click', (e) => {
//   if (e.target.className == "like-btn") {
//     addLike(e)
//     // e.preventDefault();
//   }

function postToy(e){
  e.preventDefault()

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": document.getElementsByClassName("input-text")[0].value,
      "image": document.getElementsByClassName("input-text")[1].value,
      "likes": 0,
    }),
  };

  fetch("http://localhost:3000/toys", configObj)
    .then( res => res.json())
    .then( newToy => addToCollection())
};


function addLike(e){
  e.preventDefault();
  // debugger
  // console.log(e.target);
  let likeCount = parseInt(e.target.previousElementSibling.innerText) + 1;

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likeCount,
    }),
  };

  fetch(`http://localhost:3000/toys/${e.target.id}`, configObj)
  .then(res => res.json())
  .then((likeNumber => {e.target.previousElementSibling.innterText = `${likeCount} likes`;}))
};



