import * as THREE from 'three'

document.addEventListener('DOMContentLoaded',function(event){
  var dataText = [ "Hello, I'm Quentin Feret, a creative developer"];
  
  function typeWriter(text, i, fnCallback) {

    if (i < (text.length)) {
        document.querySelector("h1").innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';

        setTimeout(function() {
           typeWriter(text, i + 1, fnCallback)
        }, 100);
    }
  }
  
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(0);
        }, 20000);
     }
    if (i < dataText[i].length) {
     typeWriter(dataText[i], 0, function(){
       StartTextAnimation(i + 1);
     });
    }
  }
  StartTextAnimation(0);
});


const btn = document.querySelector('.button');

//Fade Ou Circle on BUtton with Hover
btn.onmousemove = function(event) {
	const x = event.pageX - btn.offsetLeft - 250;
	const y = event.pageY - btn.offsetTop - 275;

	btn.style.setProperty('--x', x + 'px');
	btn.style.setProperty('--y', y + 'px');
}
//Ripples Effects on button with click
//Need to use querySelectorAll to have the object as a nodfe to let use the forEach method
const button = document.querySelectorAll('.button')

button.forEach(btn => {
	btn.addEventListener('click', function(event) {
		let x = event.clientX - 270 ;
		let y = event.clientY - 580 ;

		let ripples = document.createElement('span');
		ripples.style.left = x + 'px';
		ripples.style.top = y + 'px'; 
		this.appendChild(ripples);

		setTimeout(() => {
			ripples.remove()
		}, 1000);
	})
})

//Text Following Mouse
const text = document.querySelector('.mouse-text')
const mouse = {
//  x: innerWidth / 2,
//  y: innerHeight / 2
}
//Mouse Moves Listener
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

//Animated Circle Text Effects
text.innerHTML = text.textContent.replace(/\S/g,"<span>$&</span>")
const element = document.querySelectorAll('.mouse-text span')
for (let i = 0; i<element.length; i++) {
  element[i].style.transform = "rotate("+i*28+"deg)"
}
document.addEventListener('mousemove', (event) => {
  text.style.left = event.pageX + 'px'
  text.style.top = event.pageY + 'px'
})
const header = document.querySelector('#intro header')
const card = document.querySelector("#intro .content .card")
const mousetext = document.querySelector("#intro .mouse-text")
const scrolldown01 = document.getElementById("scrolldown01")
const scrolldown02 = document.getElementById("scrolldown02")

const intro = document.querySelector("#intro")

const title = document.querySelector("#intro .lightspeed-title")

const social01 = document.querySelector("#socialnetwork01")
const social02 = document.querySelector("#socialnetwork02")
const social03 = document.querySelector("#socialnetwork03")
const social04 = document.querySelector("#socialnetwork04")
const social05 = document.querySelector("#socialnetwork05")
const social06 = document.querySelector("#socialnetwork06")
const social07 = document.querySelector("#socialnetwork07")

const socialdescription = document.querySelector(".social-description")

const contactbutton = document.querySelector("#contactme")


title.style.top = innerHeight / 2 - 50 + 'px'
title.style.left = innerWidth / 2 - 200 + 'px'

//Lighspped Experience
//1. Call for Threejs librairies
let camera, scene, renderer
//2. Create an array to store stars
let stars = []
//3 Asd a filter
let planeMesh
//4.Spped of the stars
let speed = 0.09

let activated = false
intro.addEventListener("mousedown", (event) => {
  activated = true
  header.classList.add('translate')
  card.classList.remove('apparition')
  card.classList.add('disparition')
  mousetext.classList.remove('apparition')
  mousetext.classList.add('disparition')
  title.classList.remove('disparition')
  title.classList.add('apparition2')
  scrolldown01.classList.add('disparition')
  scrolldown02.classList.add('disparition')
  social01.classList.add('disparition')
  social02.classList.add('disparition')
  social03.classList.add('disparition')
  social04.classList.add('disparition')
  social05.classList.add('disparition')
  social06.classList.add('disparition')
  social07.classList.add('disparition')
  contactbutton.classList.add('disparition')
})
intro.addEventListener("mouseup", (event) => {
  activated = false
  header.classList.remove('translate')
  card.classList.remove('disparition')
  card.classList.add('apparition')
  mousetext.classList.remove('disparition')
  mousetext.classList.add('apparition')
  title.classList.remove('apparition2')
  title.classList.add('disparition')
  scrolldown01.classList.remove('disparition')
  scrolldown02.classList.remove('disparition')
  social01.classList.remove('disparition')
  social02.classList.remove('disparition')
  social03.classList.remove('disparition')
  social04.classList.remove('disparition')
  social05.classList.remove('disparition')
  social06.classList.remove('disparition')
  social07.classList.remove('disparition')
  contactbutton.classList.remove('disparition')
})

//Mobile tracking
intro.addEventListener("touchstart",(event) => {
  activated = true
  card.classList.remove('apparition')
  card.classList.add('disparition')
  mousetext.classList.remove('apparition')
  mousetext.classList.add('disparition')
  title.classList.remove('disparition')
  title.classList.add('apparition')
  scrolldown01.classList.add('disparition')
  scrolldown02.classList.add('disparition')
  social01.classList.add('disparition')
  social02.classList.add('disparition')
  social03.classList.add('disparition')
  social04.classList.add('disparition')
  social05.classList.add('disparition')
  social06.classList.add('disparition')
  social07.classList.add('disparition')
  contactbutton.classList.add('disparition')
})
intro.addEventListener("touchend",(event) => {
  activated = false
  card.classList.remove('apparition')
  card.classList.add('disparition')
  mousetext.classList.remove('disparition')
  mousetext.classList.add('apparition')
  title.classList.remove('apparition')
  title.classList.add('disparition')
  scrolldown01.classList.remove('disparition')
  scrolldown02.classList.remove('disparition')
  social01.classList.remove('disparition')
  social02.classList.remove('disparition')
  social03.classList.remove('disparition')
  social04.classList.remove('disparition')
  social05.classList.remove('disparition')
  social06.classList.remove('disparition')
  social07.classList.remove('disparition')
  contactbutton.classList.remove('disparition')
})

social01.addEventListener("mouseenter", function(event) {
  socialdescription.classList.add('visible')
  for (var i=1; i <= 5; i++) {
      let div = document.createElement("div")
      div.classList.add("text");
      div.innerText = "My Design projects"
      socialdescription.append(div);   
    }
  social01.classList.add('apparition')
})

social01.addEventListener("mouseleave", function(event) {
  socialdescription.classList.remove('visible')
  socialdescription.innerText = ""
  social01.classList.remove('apparition')

})
social02.addEventListener("mouseenter", function(event) {
  socialdescription.classList.add('visible')
  for (var i=1; i <= 5; i++) {
      let div = document.createElement("div")
      div.classList.add("text");
      div.innerText = "My artworks"
      socialdescription.append(div);   
    }
  social02.classList.add('apparition')
})
social02.addEventListener("mouseleave", function(event) {
  socialdescription.classList.remove('visible')
  socialdescription.innerText = ""
  social02.classList.remove('apparition')
})
social03.addEventListener("mouseenter", function(event) {
  socialdescription.classList.add('visible')
  for (var i=1; i <= 5; i++) {
      let div = document.createElement("div")
      div.classList.add("text");
      div.innerText = "My dev projects"
      socialdescription.append(div);   
    }
  social03.classList.add('apparition')
})
social03.addEventListener("mouseleave", function(event) {
  socialdescription.classList.remove('visible')
  socialdescription.innerText = ""
  social03.classList.remove('apparition')
})
social04.addEventListener("mouseenter", function(event) {
  socialdescription.classList.add('visible')
  for (var i=1; i <= 5; i++) {
      let div = document.createElement("div")
      div.classList.add("text");
      div.innerText = "My Blog"
      socialdescription.append(div);   
    }
  social04.classList.add('apparition')
})
social04.addEventListener("mouseleave", function(event) {
  socialdescription.classList.remove('visible')
  socialdescription.innerText = ""
  social04.classList.remove('apparition')
})
social05.addEventListener("mouseenter", function(event) {
  socialdescription.classList.add('visible')
  for (var i=1; i <= 5; i++) {
      let div = document.createElement("div")
      div.classList.add("text");
      div.innerText = "My Code Playground"
      socialdescription.append(div);   
    }
  social05.classList.add('apparition')
})
social05.addEventListener("mouseleave", function(event) {
  socialdescription.classList.remove('visible')
  socialdescription.innerText = ""
  social05.classList.remove('apparition')
})
social06.addEventListener("mouseenter", function(event) {
  socialdescription.classList.add('visible')
  for (var i=1; i <= 5; i++) {
      let div = document.createElement("div")
      div.classList.add("text");
      div.innerText = "My Blog"
      socialdescription.append(div);   
    }
  social06.classList.add('apparition')
})
social06.addEventListener("mouseleave", function(event) {
  socialdescription.classList.remove('visible')
  socialdescription.innerText = ""
  social06.classList.remove('apparition')
})
social07.addEventListener("mouseenter", function(event) {
  social07.classList.add('apparition')
})
social07.addEventListener("mouseleave", function(event) {
  social07.classList.remove('apparition')
})
contactbutton.addEventListener("mouseenter", function(event) {
  contactbutton.classList.add('apparition')
})
contactbutton.addEventListener("mouseleave", function(event) {
  contactbutton.classList.remove('apparition')
})


//Remove exerience on hover of socials icons and button

const colors = ["#FFD31A", "#FF8F1F", "#FF2976", "#F222FE", "#8D1EFF"]
const lightspeed = document.querySelector('#intro .lightspeed');
//Mouse Moves Listener
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  title.style.top = innerHeight / 2 - 50 + 'px'
  title.style.left = innerWidth / 2 - 200 + 'px'
})

/*---------------------
    Implementation
---------------------*/
function init() {
  //Set up the scene
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x000000, 0.015, 72)
  //Set up the camera 
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true, alpha: true })
  renderer.sortObjects = false
  renderer.autoClearColor = false

  //Camera initialization
  camera.position.z = 55

  //Add the background
  renderer.setClearColor("#000", 1);
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  //Add the scene
 lightspeed.appendChild(renderer.domElement)

  //Create stars in random locations within a cube
  //Store the stars in an array to be moved within render
  for (let i =0; i < 3000; i++) {
    let geometry = new THREE.SphereBufferGeometry(0.12 * Math.random(), 10, 10)
    let material = new THREE.MeshBasicMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      envMap: null,
      combine: THREE.AddOperation,
      //shading: THREE.FlatShading 
     }) 
    let star = new THREE.Mesh(geometry, material)

    star.position.x = Math.random() * 100 - 50;
    star.position.y = Math.random() * 100 - 50;
    star.position.z = Math.random() * 50 - 25;   
    star.shadowBlur = 20;
    star.shadowColor = "rgba(255,0,0,1)";

    scene.add(star)
    stars.push(star)
  }

  let planeGeometry = new THREE.PlaneGeometry(1000, 500, 1,1)
  let planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 1 })

  planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
  scene.add(planeMesh)
}

/*-------------------------
       Render
--------------------------*/
function render() {
  //Animation loop
  requestAnimationFrame(render)
  //Add the scene cube plus the camera
  renderer.render(scene, camera)
  
  //Move stars within a cube and 
  //reinitilize the position when the stars go out of the cube
  for (let i = 0; i < stars.length; i++) {
    stars[i].position.z += speed

    if (stars[i].position.z >= 60) {
    stars[i].position.x = Math.random() * 100 - 50
    stars[i].position.y = Math.random() * 100 - 50
    stars[i].position.z = 5
    }
  }
  //When the mouse is pressed, light effect is activated
  if (activated) {
    speed = 0.27
    planeMesh.material.opacity = 0.01
  } else {
    if (planeMesh.material.opacity < 1) {
      planeMesh.material.opacity += 0.01
      speed = 0.09
    }
  }
}

init()
render()
