var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 22;
canvas.height = window.innerHeight - 22;

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
    '#4A002A',
    '#890428',
    '#d6d6d6',
    '#BB0A4C',
    '#0D9BFF',
    '#0CC8E8',
    '#00FFDF',
    '#0CE88E',
    '#0DFF57',
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

function Line(x, y, length){
    this.x = x;
    this.y = y;
    this.length = length;
    
    this.draw = function(){
        c.beginPath;
        c.moveTo(this.x,this.y);
        c.lineWidth = 15;
        c.lineTo((this.length/(Math.sqrt(Math.pow(mouse.x-this.x,2) + Math.pow(mouse.y-this.y,2))))*(mouse.x-this.x)+this.x,(this.length/(Math.sqrt(Math.pow(mouse.x-this.x,2) + Math.pow(mouse.y-this.y,2))))*(mouse.y-this.y)+this.y);
        c.strokeStyle = 'white';
        c.stroke();
    }
    
    this.update = function(){
        this.draw();
    }
}


function Circle(x, y, dx, dy, radius, time, isExp, isBomb){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.time = time;
    this.isExp = isExp;
    this.isBomb = isBomb;
    
    if(this.isExp == 1){
        this.color = colorArray[Math.floor(Math.random()*9)];
    }else{
        this.color = 'white';
        //this.color = '#4e4ba0';
    }
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){
        if(this.time == 30 && this.isExp == 0){
            if(this.isBomb == 1){
                for(var i = 0; i < 500; i++){
                    circles.push(new Circle(this.x, this.y, (Math.random()-0.5)*80, (Math.random()-0.9)*80 , Math.floor(Math.random()*4+1), 0, 1, 0));
                }  
            }else{
                for(var i = 0; i < 10; i++){
                    circles.push(new Circle(this.x, this.y, (Math.random()-0.5)*30, (Math.random()-0.9)*30 , Math.floor(Math.random()*4+1), 0, 1, 0));
                }
            }
            this.radius = 0;
        }
        
        if(this.x + this.radius >= canvas.width + 11 || this.x - this.radius <= 11){
            this.dx = -this.dx;
        }
        
        this.dy += 1;

        this.y += this.dy;
        this.x += this.dx;

        this.draw();
        this.time++;
    }
}

var circles = [];
var radius = 5;
var x = (canvas.width/2);
var y = (canvas.height*6/7);
var line = new Line(x,y,60);

var count = 0;
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    circles.push(new Circle(x, y, 0, 0, 0, 0, 1, 0));
    for(var i = 0; i < circles.length; i++){
        circles[i].update();
        if(circles[i].y - circles[i].radius > canvas.height + 15){circles.splice(i,1);}
    }
    line.update();
    
    // Joint
    c.beginPath();
    c.arc(x, y, 12, 0, Math.PI*2,false);
    c.fillStyle = 'white';
    c.fill();
    
    count++;
    
}

/*
canvas.onclick = shoot;
function shoot(event){
    var yvel = (mouse.y - y)/13;
    circles.push(new Circle(x, y, ((mouse.x-x)/(mouse.y - y))*yvel, yvel , radius, 0, 0, 0));
}
*/

function spawnCircle(isBomb){
    this.isBomb = isBomb;
    var yvel = -30;
    if(mouse.y +15< y){
        circles.push(new Circle(x, y, ((mouse.x-x)/(mouse.y - y))*yvel, yvel , radius, 0, 0, this.isBomb));
    }
}

var isFire = false;

canvas.onmousedown = fire;
canvas.onmouseup = hold;

function fire(event){
    console.log('down');
    isFire = true;
    spawnCircle();
    setTimeout(function() {
        if(isFire == true){
            spawnCircle(0);
            fire(event);
        }
    }, 100);
}

function hold(event){
    console.log('up');
    isFire = false;
}

window.addEventListener("keydown", checkKeyDown, false);
window.addEventListener("keyup", checkKeyUp, false);
var space = 0;
function checkKeyDown(key){
    if(key.keyCode == "32"){
        if(space == 0){spawnCircle(1);}
        space = 1;
    }
}

function checkKeyUp(key){
    if(key.keyCode == "32"){
        space = 0;
    }
}



animate();