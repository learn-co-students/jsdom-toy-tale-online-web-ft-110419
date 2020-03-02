let addToy = false;
let toyCollection = document.getElementById('toy-collection');
let addToyForm = document.getElementsByClassName('add-toy-form');

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let newToy = renderToys(obj_toy)
      toyCollection.append(newToy)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const toyForm = document.querySelector(".container");
  const addBtn = document.querySelector("#new-toy-btn");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      
    } else {
      toyForm.style.display = "none";
    }
  });
});

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}
getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })}
  )
  addToyForm.addEventListener('submit', event => {
    event.preventDefault()
    postToy(event.target)})

  function likes(e) {
      e.preventDefault()
      let more = parseInt(e.target.previousElementSibling.innerText) + 1
    
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
          body: JSON.stringify({
            "likes": more
          })
        })
        .then(res => res.json())
        .then((like_obj => {
          e.target.previousElementSibling.innerText = `${more} likes`;
        }))
    }
  function renderToys(toy) {
  toyCollection = document.getElementById('toy-collection');
    let h2 = document.createElement('h2')
    h2.innerText = toy.name
  
    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')
  
    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`
  
    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "like"
    btn.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      likes(e)
    })
    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    children = [h2, img, p, btn]
    appendChildren(divCard,children)
    toyCollection.appendChild(divCard)
  }

  function appendChildren(parent,children){
    children.forEach(child=>{ parent.appendChild(child)})
  }
