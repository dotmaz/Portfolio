var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('keydown', function(key){
    if(key.keyCode == 38){
        val1++;
    }
    if(key.keyCode == 40){
        val1--;
    }
    if(key.keyCode == 37){
        val2--;
    }
    if(key.keyCode == 39){
        val2++;
    }
    if(key.keyCode == 32){
        reset();
    }
});

function Particle(x, y, dx, dy, radius, color, radian, magnitude){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.radian = radian;
    this.magnitude = magnitude;
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){
        this.x = canvas.width/2 + this.magnitude*Math.cos(this.radian);
        this.y = canvas.height/2 + this.magnitude*Math.sin(this.radian);
        this.magnitude += val1*Math.cos(this.radian*val2);
        this.radian += .02;
        this.draw();
    }
}


var val1 = 0;
var val2 = 0;
var frame = 1;
var particles = [];
var numOfParticles = 200;

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    
    for(var i = 0; i < particles.length; i++){
        particles[i].update();
    }
    
    c.font = '30px Roboto';
    c.fillText(val1 + " | " + val2, 20, 40);
    c.font = '20px Roboto';
    c.fillText("Left/right to modulate pivot count", 20, 80);
    c.fillText("Up/down to modulate intensity", 20, 110);
    c.fillText("Space to reset", 20, 140);
    
    frame++;
}

function generateParticles(){
    for(var i = 0; i < numOfParticles; i++){
        particles.push(new Particle(0, 0, 0, 0, 4, 'black', i*(Math.PI*2/numOfParticles), 100));
    }
}

function reset(){
    val1 = 0;
    val2 = 0;
    particles = [];
    generateParticles();
}

generateParticles();
animate();