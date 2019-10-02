var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var screen = {
    x: undefined,
    y: undefined
}

var colorArray = [
    '#ff6549',
    '#49a7ff',
    '#9e49ff',
    '#35ce44',
];

window.addEventListener('mousemove', 
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', 
    function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


function Particle(x, y, dx, dy, radius, color,id){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.id = id;
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){
        if(grab){
            if(id == numOfParticles-1){
                this.x = mouse.x;
                this.y = mouse.y;
            }
        }
        if(this.x != particles[numOfParticles-1].x || this.y != particles[numOfParticles-1].y){
            this.dx = (particles[numOfParticles-1].x - this.x)*(vel/100)*(id/stretch);
            this.dy = (particles[numOfParticles-1].y - this.y)*(vel/100)*(id/stretch);
            this.x += this.dx;
            this.y += this.dy;
        }      
        this.draw();
    }
}

var particles = [];
var numOfParticles = 20;
var stretch = 5;
var vel = 5;
var maincolor = 'rgba(255,0,0,'

for(var i = 0; i < numOfParticles; i++){
    var x = canvas.width/2;
    var y = (canvas.height/2);
    var dx = 0;
    var color
    var dy = 0;
    if(i == numOfParticles-1){
        var color = 'black';
    }else{
        var color = maincolor + (i*(1/numOfParticles)) + ')';
    }
    
    var radius = i+1;
    var id = i;
    
    particles.push(new Particle(x, y, dx, dy, radius, color, id));
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i = 0; i < particles.length; i++){
        particles[i].update();
    }
}

animate();

var grab = false;
canvas.onmousedown = function(){grab = true;}
canvas.onmouseup = function(){grab = false;}

