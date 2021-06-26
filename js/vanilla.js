VanillaTilt.init(document.querySelector(".card"), 
{
  max: 8,
  speed: 100,
  glare: true,
  "max-glare": 1,
});
function toggleMenu(){
  var menutoggle = document.querySelector('.toggle')
  var menu = document.querySelector('header')
  menutoggle.classList.toggle('active')
  menu.classList.toggle('active')
}

let progress = document.getElementById('progressbar')
let totalHeight = document.body.scrollHeight - window.innerHeight
window.onscroll = function(){
  let progressHeight = (window.pageYOffset / totalHeight) * 100
    progress.style.height = progressHeight + "%"
}
