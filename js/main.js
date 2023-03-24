document.querySelectorAll('.decision').forEach(button => button.addEventListener('click', scoreGuess))
document.querySelectorAll('.decision').forEach(button => button.addEventListener('click', getImage))
document.querySelector('.resetScore').addEventListener('click', resetScore)

let options = ['real', 'fake']
let option;

getImage()

const rightCount = document.querySelector('.rightCount')
const wrongCount = document.querySelector('.wrongCount')
rightCount.innerText = localStorage.getItem('rightCount') || 0
wrongCount.innerText = localStorage.getItem('wrongCount') || 0
// loads in old statistics via localStorage

function randomizeOption(){
  option = options[
    Math.floor(Math.random() * options.length)
  ]
}

function getImage(){
  const urls = {
    real: 'https://www.randomuser.me/api/?inc=picture',
    fake: 'https://fakeface.rest/face/json',
  }
  randomizeOption()
  const url = urls[option]
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let picUrl
        if(option === 'real'){
          picUrl = data.results[0].picture.large
        }else{
          console.log(data)
          picUrl = data.image_url
        }
        // set variable for image
        const img = document.querySelector('#question')
        img.src = picUrl
        // set image to the random photo
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
function scoreGuess(event){
  const rightCount = document.querySelector('.rightCount')
  const wrongCount = document.querySelector('.wrongCount')
  const guess = event.target.getAttribute('value')
  if(guess === option){
    rightCount.innerText = Number(rightCount.innerText) + 1
    localStorage.setItem('rightCount', rightCount.innerText)
  }else{
    wrongCount.innerText = Number(wrongCount.innerText) + 1
    localStorage.setItem('wrongCount', wrongCount.innerText)
  }
}

function resetScore(){
  localStorage.removeItem('rightCount')
  localStorage.removeItem('wrongCount')
  rightCount.innerText = 0
  wrongCount.innerText = 0
}

