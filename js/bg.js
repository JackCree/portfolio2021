function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

const canvas = document.querySelector('#starshower')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
//addEventListener('mousemove', (event) => {
  //mouse.x = event.clientX
  //mouse.y = event.clientY
//})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Star {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
      x: (Math.random()- 0.5) * 18,
      y: 3
    }
    this.gravity = 1
    this.friction = 0.8
  }

  draw() {
    //Draw a circle
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
      //glow effect
    c.shadowColor = '#E3EAEF'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()
    //When a ball is hitting the floor, 1- change the velocity
    //                                  2- add gravity by multiply with a friction constant
    //                                  3- Generates the particles explosion with shatter
    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
      this.velocity.y = -this.velocity.y * this.friction
      this.shatter()
    } else {
      this.velocity.y += this.gravity
    }
    //when a ball is hitting the border of the screen
    if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
      this.velocity.x = - this.velocity.x * this.friction
      this.shatter()
    }
    this.y += this.velocity.y
    this.x += this.velocity.x * this.friction

  }
  //1 - create ministars 
  //2 Dcrease the size of the stars
  shatter() {
    this.radius -=3

    for (let i = 0; i< 8; i++) {
      miniStars.push(new miniStar(this.x, this.y, 2))
    }
  }
}

//class Ministars 
class miniStar{
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity = {
      x: randomIntFromRange(-5, 5),
      y: randomIntFromRange(-15, 15)
    }
    this.gravity = 0.1
    this.friction = 0.8
    //time to live of particles : number of frames
    this.ttl = 100
    this.opacity = 1
  }

  draw() {
    //Draw a circle
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(227,2345,239,${this.opacity})`
    //glow effect
    c.shadowColor = '#E3EAEF'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()
    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
      this.velocity.y = -this.velocity.y * this.friction
    } else {
      this.velocity.y += this.gravity
    }
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.ttl -= 1
    this.opacity -= 1 / this.ttl
  }
}
//Class Mountain 
function createMountainRange(mountainAmount, height, color) {
  for (let i = 0; i < mountainAmount; i++) {
    const mountainWidth = canvas.width / mountainAmount
    c.beginPath()
    c.moveTo(i * mountainWidth, canvas.height)
    c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height)
    c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height)
    c.lineTo(i * mountainWidth -325, canvas.height)
    c.fillStyle = color
    c.fill()
    c.closePath()
  }
}


// Implementation : 1.create the stars on the screen
//                  2.Create a function to generate randomnly 8 mini stars
//                  3.Add the mountains in the background 
//                  4.Add the stars in the background
//                  5. Spawning strs
let stars
let miniStars
let backgroundStars
//spawning stars
let ticker = 0
let randomSpawnRate = 75

const groundHeight = 100

const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height,)
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')

function init() {
  stars = []
  miniStars = []
  backgroundStars = []

  //for (let i = 0; i < 1; i++) {
  //  stars.push( new Star(canvas.width / 2, 30, 30, '#E3EAEF'))
  //}

  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = Math.random() * 3
    backgroundStars.push( new Star(x,y, radius, 'white'))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = backgroundGradient
  c.fillRect(0, 0, canvas.width, canvas.height)


  //Draw the stars in the background
  backgroundStars.forEach(backgroundStar => {
    backgroundStar.draw()
  })

  //Draw the mountains
  createMountainRange(1, canvas.height - 50, '#384551')
  createMountainRange(2, canvas.height - 100, '#2B3843')
  createMountainRange(3, canvas.height - 250, '#26333E')

  //Draw the ground
  c.fillStyle = '#18202B'
  c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight)

  //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  //Draw the stars: 1- Generate the stars on the screen
  //                2- Delete the stars when the size is negative
  //                3- Delete the miniStarrs when the number of frames reaches 0
  stars.forEach((star, index) => {
    star.update()
    if (star.radius == 0) {
      stars.splice(index, 1)
    }
  })

  miniStars.forEach((miniStar, index) => {
    miniStar.update()
    if (miniStar.ttl == 0) {
      miniStars.splice(index, 1)
    }
  })

  ticker++

  if (ticker % randomSpawnRate == 0) {
    const radius = 15
    const x = Math.max(radius, Math.random() * canvas.width - radius)
    stars.push(new Star(x, -100, radius, 'white'))
    randomSpawnRate = randomIntFromRange(75, 300)
  }
}

init()
animate()
