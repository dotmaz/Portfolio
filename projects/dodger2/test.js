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
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

var frame = 1;
var particles = [];
particles.push(new Particle(20, 20, 0, 0, 10, 'black'));
particles.push(new Particle(canvas.width-20, canvas.height-20, 0, 0, 10, 'black'));

var startGame = false;

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    
    for(var i = 0; i < particles.length; i++){
        particles[i].update();
    }
    
    if(!startGame){
        var distFromStart = Math.sqrt(Math.pow(mouse.x-particles[0].x,2)+Math.pow(mouse.y-particles[0].y,2));
        if(distFromStart <= particles[0].radius){
            start();
            particles[0].color = 'black';
            particles[1].color = 'black';
        }
        c.font = '25px Roboto'
        c.fillStyle = 'black';
        c.fillText("Start", 40, 30);
        c.fillText("Finish", canvas.width-110, canvas.height-10);
    }
    
    if(startGame){
        for(var i = 2; i < particles.length; i++){
            var distFromParticle = Math.sqrt(Math.pow(mouse.x-particles[i].x,2)+Math.pow(mouse.y-particles[i].y,2));
            if(distFromParticle < particles[i].radius){
                gameOver();
            }
        }
        var distFromEnd = Math.sqrt(Math.pow(mouse.x-particles[1].x,2)+Math.pow(mouse.y-particles[1].y,2));
        if(distFromEnd <= particles[1].radius){
            gameOver();
            particles[0].color = 'green';
            particles[1].color = 'green';
        }
    }
    
    frame++;
}

animate();

function start(){
    startGame = true;
    for(var i = 0; i < 100; i++){
        var radius = 8;
        var ranX = Math.random()*(canvas.width-radius*2) + radius;
        var ranY = Math.random()*(canvas.height-radius*2) + radius;
        var ranXv = Math.random()*11 - 5;
        var ranYv = Math.random()*11 - 5;
        particles.push(new Particle(ranX, ranY, ranXv, ranYv, radius, 'blue'));
    }
}

function gameOver(){
    startGame = false;
    for(var i = particles.length; i > 1; i--){
        particles.splice(i, 1);
    }
}