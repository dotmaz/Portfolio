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

var colorArray = [
    '#a6d1ea',
    '#dbdbdb',
    '#ffb923',
    '#cefffb',
];

var secondColorArray = [
    '#4A002A',
    '#890428',
    '#6B4F68',
    '#BB0A4C',
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


function Circle(x, y, dx, dy, radius, isExp){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.isExp = isExp;
    if(this.isExp == 1){
        this.color = secondColorArray[Math.floor(Math.random()*4)];
    }else{
        this.color = colorArray[Math.floor(Math.random()*4)];
    }
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        
        /*
        if(this.y + this.radius > canvas.height){
            this.dy = -this.dy * 0.7;
        }else{
            this.dy += 1;
        }
         vvv OR vvv */
        this.dy += 1;

        this.y += this.dy;
        this.x += this.dx;

        this.draw();
    }
}

var circles = [];
var count = 0;

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    if(count%1 == 0){
        circles.push(new Circle(mouse.x, mouse.y, (Math.random()-0.5)*10, (Math.random()*20)*(-1), Math.floor(Math.random()*6+3), 0));
    }
    for(var i = 0; i < circles.length; i++){
        circles[i].update();
    }
    count++;
}

canvas.onclick = explode;
function explode(event){
    for(var i = 0; i < 80; i++){
        circles.push(new Circle(mouse.x, mouse.y, (Math.random()-0.5)*30, (Math.random()*40)*(-1), Math.floor(Math.random()*6+3), 1));
    }
}

animate();