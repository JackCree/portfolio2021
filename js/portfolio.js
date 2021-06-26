import '../css/style.css'
import * as THREE from './three'
import gsap from 'gsap'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl'
import atmophereFragmentShader from '../shaders/atmosphereFragment.glsl'

const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xff0000, 0 );
scene.background = null;
const camera = new THREE.PerspectiveCamera (
  75,
  innerWidth / innerHeight,
  0.1,
  1000
)

//Sharpen the sphere when zooming onto sphere
const renderer = new THREE.WebGLRenderer(
  {
  antialias: true,
  canvas: document.querySelector('#portfolio canvas'),
  alpha: true
  }
)
const canvasContainer = document.querySelector('#globe')
renderer.setSize(canvasContainer.offsetWidth + 200, canvasContainer.offsetHeight + 200)
//Detaildness of the texture: Sharpen the pixellisation of the img
renderer.setPixelRatio(window.devicePixelRatio)

//Create the sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50), 
  //Create vertex shadders
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    //Add the texture to shadders
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('/img/texture-globe-night.jpg')
      }
    }
 })
)
//Create the atmosphere 
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50), 
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmophereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
 })
)  

atmosphere.scale.set(1.2, 1.2, 1.2)

scene.add(atmosphere)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)

camera.position.z = 10

const mouse = {
  x: undefined,
  y: undefined
}

function animate() {
  //Limit the animatio to 24fps
  setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 40 );
  renderer.render(scene, camera)
  sphere.rotation.y += 0.002
  //gsap.to(group.rotation, {
  //  x: -mouse.y * 0.5,
  //  y: mouse.x * 0.5,
  //  duration: 2
  //})
}
animate()

//Add the roation mouse mvt
addEventListener('mousemove', ()=> {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

//Stars Background
const canvas = document.querySelector('#stars')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse2 = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#F887FF', '#DE004E', '#860029', '#321450', '#29132E']

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// class particles
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //Add glow effect
    c.shadowColor = this.color
    c.shadowBlur = 20 
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation : 1- Population of the canvas with random particles 
let particles
function init() {
  particles = []

  for (let i = 0; i < 1500; i++) {
    const canvasWidth = canvas.width + 1000
    const canvasHeight = canvas.height + 1000

    const x = Math.random() * canvasWidth - canvasWidth / 2
    const y = Math.random() * canvasHeight - canvasHeight / 2
    const radius = Math.random() * 1
    const color = colors[Math.floor(Math.random() * 5)]
    particles.push(new Particle(x, y, radius, color))
  }
}

// Animation Loop : 1 
let radians = 0
let alpha = 1

function animate2() {
  requestAnimationFrame(animate2)
  //Add background
  c.fillStyle = `rgba(10,10,10,${alpha})`
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.save()
  c.translate(canvas.width /2, canvas.height /2)
  c.rotate(radians)
  //Draw the stars
  particles.forEach(particle => {
    particle.update()
  })
  c.restore()
  radians += 0.001
}

init()
animate2()

//ShootingStar
function createStars() {
  const shootingsection = document.querySelector('#shooting_stars')
  const createElement = document.createElement('span')

  var size = Math.floor(Math.random() * 4)

  createElement.style.width = size + 'px'
  createElement.style.height = size + 'px'
  createElement.style.left = innerWidth / 2 + Math.random() * innerWidth / 2 + 'px'
  createElement.style.top = innerHeight / 3 + Math.random() * innerHeight / 2 + 'px'
  createElement.style.borderRadius = "50%"
  createElement.style.animationDelay = Math.random() * 2
  createElement.style.animationDuration = Math.random() * 3
  shootingsection.appendChild(createElement)

  setTimeout(()=> {
  createElement.remove()
  }, 6000)
}
setInterval(createStars, 4000)

//Print the parameters on click
const filters = document.querySelector('.filters button')
const parameters = document.querySelector('.parameters')
const galleryContent = document.querySelector('.galleryContainer')

filters.addEventListener('click', () => {
  parameters.classList.toggle('active')
  filters.classList.toggle('active')
  galleryContent.classList.toggle('moved')
})

// Fetch and render projects section from JSON file
const projects = document.querySelector(".galleryContainer");
const renderProjects = async () => {
  //Data only woks inside these brackets
  try {
    const data = await fetch("../data/portfolio_data.json");
    const references = await data.json();
    let item = "";
    for (let i = 0; i < references.length; i++) {
      //Define the item model
      item +=  `<div class="card-wrap" data-difficulty=${references[i].difficulty} data-duration=${references[i].duration} data-date=${references[i].date} >
                  <div class="card">
                    <div class="card-bg"><img src=${references[i].url} alt=${references[i].alt}/>
                    </div>
                    <div class="card-info">
                      <h3 class="header">${references[i].name}</h3>
                      <p class="contentCard">${references[i].content}</p>
                    </div>
                  </div>
                </div>`
    }
    //Add all the items from the json file
    projects.innerHTML = item;
    //Add a new class as filter for the taxonomu
    for (var i = 0; i <= references.length; i++) {
      $(".card-wrap").each(function(i, object) {
            $(this).attr("id","card-"+ i)
            $(this).addClass(references[i].filters)
      })
    }

    //Blur Effeect & Popup Apparition
    var blur = document.getElementById('blur')
    var popup = document.getElementById('popup')
    var gallery = document.querySelectorAll('.card-wrap')
    var popupImg01 = document.querySelector('#popup .clip.clip1')
    var popupImg02 = document.querySelector('#popup .clip.clip2')
    var popupImg03 = document.querySelector('#popup .clip.clip3')
    var popupImg04 = document.querySelector('#popup .clip.clip4')
    var popupImg05 = document.querySelector('#popup .clip.clip5')
    var popupImg06 = document.querySelector('#popup .clip.clip6')

    function toggle() {
      blur.classList.add('active')
      popup.classList.add('active')
    }
    function close() {
      blur.classList.remove('active')
      popup.classList.remove('active')
    }

    //Card Hover Effects animations:  1- Rotation of the card with the mouse
    //                                2- Translation of the img
    //                                3- Add Blur Effect on click 
    gallery.forEach( card => {
      card.addEventListener("mouseover", (e) => {

        let backgroundImage = card.querySelector(".card .card-bg img")
        let xAxis = (window.innerWidth / 2 - e.pageX) / 50;
       let yAxis = (window.innerHeight / 2 - e.pageY) / 50;

        card.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`
        
        let tX = xAxis / 4
        let tY = yAxis / 4

        backgroundImage.style.transform = `translateX(${tX}px) translateY(${tY}px)`
        backgroundImage.style.transition = 'all 0.5s ease';
      })
      //Add a delay when the mouse leaves the card
      card.addEventListener("mouseleave", (e) => { 
        setTimeout( function(){
          card.style.transform = `rotateY(0deg) rotateX(0deg)`
          card.style.transition = 'all 0.5s ease';

          let backgroundImage = card.querySelector(".card-bg")
          backgroundImage.style.transform = `translateX(-10px) translateY(-10px)`

        }, 1000)
      })
      //apparition of the popup
      card.addEventListener("click", (e) => {
        toggle()
      })
    })

    //Disparition of the popup
    $(document).mouseup(function(e){
        var container = $("#popup");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0){
            close();
        }
    })

    //Convert the nodelist object into an array object
    var arr = Array.prototype.slice.call(gallery)

    //loop through array with forEach function to return the index of clicked element
    arr.forEach((item, index) => {
        item.addEventListener('click', () => {
          let imgSize = 1000
          if (window.innerWidth <= 480) {
            imgSize = 480
          }
          popupImg01.style.background = `url(${references[index].process[0]})`
          popupImg01.style.backgroundSize = "cover"
          popupImg01.style.width = imgSize + "px"
          popupImg02.style.background = `url(${references[index].process[1]})`
          popupImg02.style.backgroundSize = "cover"
          popupImg02.style.width = imgSize + "px"
          popupImg03.style.background = `url(${references[index].process[2]})`
          popupImg03.style.backgroundSize = "cover"
          popupImg03.style.width = imgSize + "px"
          popupImg04.style.background = `url(${references[index].process[3]})`
          popupImg04.style.backgroundSize = "cover"
          popupImg04.style.width = imgSize + "px"
          popupImg05.style.background = `url(${references[index].process[4]})`
          popupImg05.style.backgroundSize = "cover"
          popupImg05.style.width = imgSize + "px"
          popupImg06.style.background = `url(${references[index].process[5]})`
          popupImg06.style.backgroundSize = "cover"
          popupImg06.style.width = imgSize + "px"
        })
    })

  } catch (error) {
    console.log("projects error ===>>>", error);
  }
};

//Load the Json File when the window is laoding
window.addEventListener("load", () => {
  renderProjects();
});

//Filters:  01- Difficulty
var inputLeft = document.getElementById("input-left1");
var inputRight = document.getElementById("input-right1");

var thumbLeft = document.querySelector(".thumb.left");
var thumbRight = document.querySelector(".thumb.right");
var range = document.querySelector(".range");

function setLeftValue(){
  var _this = inputLeft,
    min = parseInt(_this.min),
    max = parseInt(_this.max);
  
  _this.value = Math.min(parseInt(_this.value),parseInt(inputRight.value) - 1);
  
  var percent = ((_this.value - min) / (max-min)) * 100;
  
  thumbLeft.style.left = percent + "%";
  range.style.left = percent + "%";    
}
setLeftValue();
  
function setRightValue(){
  var _this = inputRight,
    min = parseInt(_this.min),
    max = parseInt(_this.max);
  
  _this.value = Math.max(parseInt(_this.value),parseInt(inputLeft.value) + 1);
  
  var percent = ((_this.value - min) / (max-min)) * 100;
  
  thumbRight.style.right = (100 - percent) + "%";
  range.style.right = (100 - percent) + "%";    
}
setRightValue();
inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);

inputLeft.addEventListener("mouseover", function(){
  thumbLeft.classList.add("hover");
});
  inputLeft.addEventListener("mouseout", function(){
  thumbLeft.classList.remove("hover");
});
  inputLeft.addEventListener("mousedown", function(){
  thumbLeft.classList.add("active");
});
  inputLeft.addEventListener("mouseup", function(){
  thumbLeft.classList.remove("active");
});

  inputRight.addEventListener("mouseover", function(){
  thumbRight.classList.add("hover");
});
  inputRight.addEventListener("mouseout", function(){
  thumbRight.classList.remove("hover");
});
  inputRight.addEventListener("mousedown", function(){
  thumbRight.classList.add("active");
});
  inputRight.addEventListener("mouseup", function(){
  thumbRight.classList.remove("active");
});

var inputLeft = document.getElementById("input-left1");
var inputRight = document.getElementById("input-right1");

 function showProducts (minDifficulty, maxDifficulty) {
  $(".card-wrap").hide().filter(function(){
    var difficulty = parseInt($(this).data("difficulty"), 10);
    return difficulty >= minDifficulty && difficulty <= maxDifficulty;
  }).show();
}
  showProducts( inputLeft.value, inputRight.value);
  $('#input-left1').change(function() {
   showProducts( inputLeft.value, inputRight.value);
});
$('#input-right1').change(function() {
   showProducts( inputLeft.value, inputRight.value);
});

//Filters     02- Duration
var inputLeft2 = document.getElementById("input-left2");
var inputRight2 = document.getElementById("input-right2");

var thumbLeft2 = document.querySelector("#durationRange .slide-range .slider .thumb.left");
var thumbRight2 = document.querySelector("#durationRange .slide-range .slider .thumb.right");
var range2 = document.querySelector("#durationRange .slide-range .slider .range");

function setLeftValue2(){
  var _this = inputLeft2,
    min = parseInt(_this.min),
    max = parseInt(_this.max);
  
  _this.value = Math.min(parseInt(_this.value),parseInt(inputRight2.value) - 1);
  
  var percent = ((_this.value - min) / (max-min)) * 100;
  
  thumbLeft2.style.left = percent + "%";
  range2.style.left = percent + "%";    
}
setLeftValue2();
  
function setRightValue2(){
  var _this = inputRight2,
    min = parseInt(_this.min),
    max = parseInt(_this.max);
  
  _this.value = Math.max(parseInt(_this.value),parseInt(inputLeft2.value) + 1);
  
  var percent = ((_this.value - min) / (max-min)) * 100;
  
  thumbRight2.style.right = (100 - percent) + "%";
  range2.style.right = (100 - percent) + "%";    
}
setRightValue2();
inputLeft2.addEventListener("input", setLeftValue2);
inputRight2.addEventListener("input", setRightValue2);

inputLeft2.addEventListener("mouseover", function(){
  thumbLeft2.classList.add("hover");
});
  inputLeft2.addEventListener("mouseout", function(){
  thumbLeft2.classList.remove("hover");
});
  inputLeft2.addEventListener("mousedown", function(){
  thumbLeft2.classList.add("active");
});
  inputLeft2.addEventListener("mouseup", function(){
  thumbLeft2.classList.remove("active");
});

  inputRight2.addEventListener("mouseover", function(){
  thumbRight2.classList.add("hover");
});
  inputRight2.addEventListener("mouseout", function(){
  thumbRight2.classList.remove("hover");
});
  inputRight2.addEventListener("mousedown", function(){
  thumbRight2.classList.add("active");
});
  inputRight2.addEventListener("mouseup", function(){
  thumbRight2.classList.remove("active");
});

var inputLeft2 = document.getElementById("input-left2");
var inputRight2 = document.getElementById("input-right2");

 function showProducts2 (minDuration, maxDuration) {
  $(".card-wrap").hide().filter(function(){
    var duration = parseInt($(this).data("duration"), 10);
    return duration >= minDuration && duration <= maxDuration;
  }).show();
}
  showProducts( inputLeft2.value, inputRight2.value);
  $('#input-left2').change(function() {
   showProducts2( inputLeft2.value, inputRight2.value);
});
$('#input-right2').change(function() {
   showProducts2( inputLeft2.value, inputRight2.value);
});

//Filters     03-  Taxonomy
$(document).ready(function(){  
    $('.list').click(function(){
      const value = $(this).attr('data-filter');
      if (value == 'all'){
        $('.card-wrap').show('1000');
      }
      else {
        $('.card-wrap').not('.'+value).hide('1000');
        $('.card-wrap').filter('.'+value).show('1000');
      }
    })
  //add active class on selected item
  $('.list').click(function(){
    $(this).addClass('active').siblings().removeClass('active');    
    })
  })
//Filter 04: search
function mySearchFunction() {
    var input, filter, ul, li, item, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("galleryContainer");
    li = document.querySelectorAll(".card-wrap");
    for (i = 0; i < li.length; i++) {
      item = li[i];
      txtValue = item.textContent || item.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
$(document).ready(function(){ 
  document.querySelector(".search input").addEventListener("keyup", mySearchFunction)
})
//Filter 05: Date
$( "#dateInput" ).click(function() {
  var gallery = document.querySelectorAll(".card-wrap")
  var points = Array.prototype.slice.call(gallery)
  points.sort(function(a, b){
    return a.dataset.date-b.dataset.date
  })
  $('.galleryContainer').html(points);
  $("#dateInput").disabled = 'disabled';
});
