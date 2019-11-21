var isChanging;
var worldScale;
var models = [];
var previousText;
var reset;
var rotationRatio;
var mirrorOffset;
var curSlider;
var curModel = 0;
var potentialModels = ["Perlin Noise", "Function"];

var xThetaDynamic, yThetaDynamic;
var distanceFromProjection;

var xVelocity, yVelocity;

var frame = 0;

var scaleRatio = .25;
var heightRatio = .25;
var squareSize = 12;


var param1 = -.02;
var param2 = 1;

function setup(){
    $('#sizeCount')[0].innerHTML = squareSize;
    $('#currentModel')[0].innerHTML = potentialModels[curModel];
    if(curModel == 1){
        param1 = -.06;
        param2 = .1;
    }else{
        param1 = -.02;
        param2 = 1;
    }
    worldScale = 30;
    rotationRatio = Math.PI/2;
    createCanvas(innerWidth, innerHeight);
    curSlider = "";

    xThetaDynamic = 0;
    yThetaDynamic = 0;
    distanceFromProjection = 50;
    
    
    scaleRatio = param2 * (parseInt($('#scaleSlider').css('left')) - 10) / 150;
    heightRatio = (parseInt($('#heightSlider').css('left')) - 10) / 150;
    xVelocity = param1 * (parseInt($('#xVelocitySlider').css('left')) - 10) / 150 ;
    yVelocity = param1 * (parseInt($('#yVelocitySlider').css('left')) - 10) / 150 ;

    
    var particles = [];
    for(var i = 0; i < squareSize; i++){
        particles[i] = [];
        for(var j = 0; j < squareSize; j++){
            particles[i].push(new Particle(0, [i-squareSize/2, 0, j-squareSize/2]));
        }
    }
    
    var model = new Model(particles, function(){
        colorMode("HSL");
        for(var i = squareSize-1; i > 0; i--){
            for(var j = squareSize-1; j > 0 ; j--){
//                fill(255*(i+j)/14, 255);
//                fill(y(this.particles[i][j].pos2d)/3, 255);
                fill(y(this.particles[i][j].pos2d)/2.2, 100, 70);
                quad(x(this.particles[i][j].pos2d),y(this.particles[i][j].pos2d),
                    x(this.particles[i-1][j].pos2d),y(this.particles[i-1][j].pos2d),
                    x(this.particles[i-1][j-1].pos2d),y(this.particles[i-1][j-1].pos2d),
                x(this.particles[i][j-1].pos2d),y(this.particles[i][j-1].pos2d));
            }
        }
        colorMode("RGB");
    }, 0, 0, 3);
    
    models.push(model);
}

function draw(){
    console.log(scaleRatio, heightRatio);
    frame++;
    background(255);
    
    fill(200, 255);
    stroke(0, 100);

    if(move === true) {
        if(mouseX < 45){
            slider = $('#' + curSlider).css('left', 10);
        }else if(mouseX > 195){
            slider = $('#' + curSlider).css('left', 160);
        }else{
            slider = $('#' + curSlider).css('left', mouseX - 35);
        }
        
        if(curSlider == 'scaleSlider'){
            scaleRatio = param2 * (parseInt($('#' + curSlider).css('left')) - 10) / 150;
        }else if(curSlider == 'heightSlider'){
            heightRatio = (parseInt($('#' + curSlider).css('left')) - 10) / 150;
        }else if(curSlider == 'xVelocitySlider'){
            xVelocity = param1 * (parseInt($('#' + curSlider).css('left')) - 10) / 150 ;
        }else if(curSlider == 'yVelocitySlider'){
            yVelocity = param1 * (parseInt($('#' + curSlider).css('left')) - 10) / 150 ;
        }
        
    }
    
        
    for(var i = 0; i < models.length; i++){
        models[i].update();
    }
        
}

function mouseReleased(){
    move = false;
}

function Model(particles, renderFunction, xOffset, yOffset, dragOffset){
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.dragOffset = dragOffset;
    this.particles = particles;
    this.renderFunction = renderFunction;
    
    this.update = function(){
        for(var i = 0; i < squareSize; i++){
            for(var j = 0; j < squareSize; j++){
                this.particles[i][j].update(this.xOffset, this.yOffset, this.dragOffset);
            }
        }
        this.renderFunction();
    }
}
var slider;
var move = false;
var curMouseX = 0;
var prevMouseX = 0;
function moveSlider(param){
    curSlider = param;
    move = true;
    
}

function Particle(id, particle){
    this.id = id;
    
    this.originalPos3d = [x(particle), -y(particle), z(particle)];
    this.originalPos2d;

    this.pos3dTarget;
    this.pos3d = [0,0,0];
    this.pod2d;
    
    this.p0 = [random() * innerWidth/2 + innerWidth/4, random()*100];
    this.r1 = random()*6.28;
    this.r2 = random()*6.28;
    this.d = 3;
    this.scale0a = 40;
    this.scale0b = 3;
    this.scale1a = 10;
    this.scale1b = 18;
    this.scale;
    
    this.initialize = false;
  
    this.draw = function(){
//        ellipse(x(this.pos2d), y(this.pos2d), 3);
        
    }
    
    this.update = function(xOffset, yOffset, dragOffset){
        this.pos2d = [0,0];
//        this.scale = this.scale0 * scaleRatio + 18;
        if(curModel == 0){
            this.scale = this.scale0a * scaleRatio + this.scale0b;
            this.originalPos3d[1] = noise(x(this.originalPos3d)/this.scale + xVelocity*frame, z(this.originalPos3d)/this.scale + yVelocity*frame) * (-16 * heightRatio) + 5;
        }else{
            this.scale = this.scale1a * scaleRatio + this.scale1b;
            this.originalPos3d[1] = heightRatio * 2 * Math.sin(x(this.originalPos3d)*this.scale + xVelocity*frame) + heightRatio * 3 * Math.sin(z(this.originalPos3d)*this.scale + yVelocity*frame) + 3;
        }
        

        this.pos3dTarget = transformation("rotateX", transformation("rotateY", this.originalPos3d, -Math.PI/3), Math.PI*.14);

        this.pos3dTarget[0] *= worldScale;
        this.pos3dTarget[1] *= worldScale;
        this.pos3dTarget[2] += distanceFromProjection;

        this.pos3d[0] += (x(this.pos3dTarget) - x(this.pos3d))/dragOffset;
        this.pos3d[1] += (y(this.pos3dTarget) - y(this.pos3d))/dragOffset;
        this.pos3d[2] += (z(this.pos3dTarget) - z(this.pos3d))/dragOffset;

        this.pos2d[0] = x(this.pos3d) * (distanceFromProjection / z(this.pos3d)) + innerWidth/2 + xOffset;
        this.pos2d[1] = y(this.pos3d) * (distanceFromProjection / z(this.pos3d)) + innerHeight/2 + yOffset;
        
        this.draw();
    }
}


function x(point){
    return point[0];
}

function y(point){
    return point[1];
}

function z(point){
    return point[2];
}


function transformation(type, points, theta){
    /*//--------- 
    
     = [[0,0,0],
        [0,0,0],
        [0,0,0]];
    
    *///----------
    var matrix;
    
    if(type == "sheerX"){
        matrix = [[1,Math.tan(theta),0],
                  [0,1,0],
                  [0,0,1]];
    }else if(type == "rotateX"){
        matrix = [[1,0,0],
                  [0,Math.cos(theta),-Math.sin(theta)],
                  [0,Math.cos(theta),Math.cos(theta)]];
    }else if(type == "rotateY"){
        matrix = [[Math.cos(theta),0,Math.sin(theta)],
                  [0,1,0],
                  [-Math.sin(theta),0,Math.cos(theta)]];
    }else if(type == "twist"){
        matrix = [[Math.cos(theta*points[1]),0,Math.sin(theta*points[1])],
                  [0,1,0],
                  [-Math.sin(theta*points[1]),0,Math.cos(theta*points[1])]];
    }
    var newPoints = [];
    for(var i = 0; i < 3; i++){
        newPoints.push(points[0]*matrix[i][0] + points[1] * matrix[i][1] + points[2] * matrix[i][2]);
    }
    return newPoints;
}


function mouseMoved(){
    var xRatio = mouseX / innerWidth;
    var yRatio = mouseY / innerHeight;
    xThetaDynamic = xRatio*rotationRatio - rotationRatio/2;
    yThetaDynamic = yRatio*rotationRatio - rotationRatio/2;
}

function drawLine(point1, point2){
    line(x(point1), y(point1), x(point2), y(point2));
}

function decrementSize(){
    if(squareSize > 2){
        squareSize--;
        models = [];
        setup();
    }
}
function incrementSize(){
    if(squareSize < 40){
        squareSize++;
        if(squareSize == 15){
            
        }
        models = [];
        setup();
    }
}

function previousModel(){
    if(curModel > 0){
        models = [];
        curModel--;
        setup();
    }
}

function nextModel(){
    if(curModel < 1){
        models = [];
        curModel++;
        setup();
    }
}