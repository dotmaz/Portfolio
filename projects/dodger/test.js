var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var colorArray = [
    // Colors
];

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/*
window.addEventListener('click', function(){
    particles.push(new Particle(mouse.x, mouse.y, 0, 0, 5, 'white'));
});
*/

function Particle(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

var frame = 0;
var gameOver = false;
var clearDistance = 10;
var collisionDistance = 0;

var particles = [];
var score = 0;

function animate(){
    frame++;
    if(gameOver){
        for(var i = 0; i < particles.length; i++){
            particles[i].dx = 0;
            particles[i].dy = 0;
        }
    }
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    // Update particles and splice out of frame
    for(var i = 0; i < particles.length; i++){
        particles[i].update();
        if(particles[i].y - particles[i].radius > canvas.height + clearDistance){
            particles.splice(i,1);
        }
    }
    drawScore();
    // If the player hasn't lost, keep spawning particles
    if(!gameOver && frame%1 == 0){
        for(var i = 0; i < Math.floor(Math.random()*2)+1; i++){
            particles.push(new Particle(canvas.width/2, 0, Math.random()*11-5, Math.random()*6, 2, 'white'));
        }
        
    }
    // Increment score
    if(!gameOver && frame%3 == 0){
        score++;
    }
    // Gradually increase radius and check for collisions
    for(var i = 0; i < particles.length; i++){
        if(!gameOver){
            particles[i].radius += .05;//.05
        }else{
            particles[i].radius += .1;
        }
        collisionDistance = Math.sqrt(Math.pow(mouse.x-particles[i].x,2) + Math.pow(mouse.y-particles[i].y,2));
        if(collisionDistance < particles[i].radius){
            gameOver = true;
        }
    }
}

function drawScore(){
    c.font = "50px Roboto";
    c.fillStyle = 'white';
    c.strokeStyle = 'black';
    c.lineWidth = 3;
    c.strokeText(score, canvas.width/2 - 30, canvas.height - 12);
    c.fillText(score, canvas.width/2 - 30, canvas.height - 12);
}

animate();