var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//c.fillStyle = 'rgba(255,0,0,0.3)';
//c.fillRect(20,20,50,50);
//c.fillStyle = 'rgba(0,255,0,0.3)';
//c.fillRect(120,120,50,50);
//c.fillStyle = 'rgba(0,0,255,0.3)';
//c.fillRect(220,220,50,50);
//console.log(canvas);

// Line
//c.beginPath;
//c.moveTo(30,200);
//c.lineTo(200,110);
//c.lineTo(220,130);
//c.strokeStyle = 'black';
//c.stroke();

// Arcs
//c.beginPath();
//c.arc(120,20,10,0,Math.PI*2,false);
//c.strokeStyle = 'blue';
//c.stroke();

//for(var i = 0; i < 50; i++){
//    var x = Math.random() * window.innerWidth;
//    var y = Math.random() * window.innerHeight;
//    c.beginPath();
//    c.arc(x, y, 30,0,Math.PI*2,false);
//    var col = Math.floor(Math.random()*3);
//    console.log(col);
//    if(col == 0){c.strokeStyle = 'blue';}
//    if(col == 1){c.strokeStyle = 'red';}
//    if(col == 2){c.strokeStyle = 'green';}
//    c.stroke();
//}

var mouse = {
    x: undefined,
    y: undefined
}

var screen = {
    x: undefined,
    y: undefined
}

var maxRadius = 30;
var dist = 50;
var vel = 0.4; 
var incvel = 5;
var decvel = 1;

var colorArray = [
    '#a6d1ea',
    '#dbdbdb',
    '#ffb923',
    '#cefffb',
];

window.addEventListener('mousemove', 
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener('resize', 
    function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius, sradius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.sradius = sradius
    this.color = colorArray[Math.floor(Math.random()*4)];
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        
        // Interactivity
        
        if((mouse.x - this.x < dist && mouse.x - this.x > -dist) && 
           (mouse.y - this.y < dist && mouse.y - this.y > -dist)){
            if(radius < maxRadius){
                radius += incvel;
            }
        }else if(radius >= sradius){
            radius -= decvel; 
        }
        
        this.draw();
    }
}

var circleArray = [];

for(var i = 0; i < 800; i++){
    var radius = Math.floor((Math.random()*5)+1);
    var sradius = radius;
    var x = Math.random()*(window.innerWidth - radius*2) + radius;
    var y = Math.random()*(window.innerHeight - radius*2) + radius;
    var dx = (Math.random() - 0.5)*vel;
    var dy = (Math.random() - 0.5)*vel;
    
    circleArray.push(new Circle(x, y, dx, dy, radius, sradius));
}


var count=0;
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

animate();