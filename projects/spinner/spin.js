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

var spin = false;

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


function Particle(x, y, dx, dy, radius, radian, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.radian = radian;
    this.color = colorArray[Math.floor(Math.random()*4)];
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        
        if(spin){
            var xval = mouse.x + mouseRadius*Math.cos(this.radian);
            var yval = mouse.y + mouseRadius*Math.sin(this.radian);
            if(this.x != xval || this.y != yval){
                this.x += (xval - this.x)*0.15;
                this.y += (yval - this.y)*0.15;
            }
            this.dx = this.dx*1.02;
            this.dy = this.dy*1.02;
            
            this.radian += 0.1;
        }else{
            this.dx = this.dx*.992;
            this.dy = this.dy*.992;
            this.x += this.dx;
            this.y += this.dy;
        }
        
        this.draw();
    }
}

var particles = [];
var vel = 20;
var numOfParticles = 50;
var radius = 10;
var mouseRadius = 80;

for(var i = 0; i < numOfParticles; i++){
    var radian = ((Math.PI*2)/numOfParticles)*(i+1);
    var x = Math.random()*(window.innerWidth - radius*2) + radius;
    var y = Math.random()*(window.innerHeight - radius*2) + radius;
    var dx = (Math.random() - 0.5)*vel;
    var dy = (Math.random() - 0.5)*vel;
    
    particles.push(new Particle(x, y, dx, dy, radius, radian));
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i = 0; i < particles.length; i++){
        particles[i].update();
    }
}

animate();

canvas.onmousedown = function(){spin = true;}
canvas.onmouseup = function(){spin = false;}

