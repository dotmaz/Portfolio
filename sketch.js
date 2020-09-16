var globalOpacity;
var edgeOpacity;
var drawParticles;
var pause;
var isChanging;
var worldScale;
var models = [];
var t;
var previousText;
var reset;
var rotationRatio;
var mirrorOffset;

var xThetaDynamic, yThetaDynamic;
var distanceFromProjection;

var frame = 0;


function reset(){
    drawParticles = true;
    edgeOpacity = 0;
    globalOpacity = 1;
    pause = false;
    isChanging = false;
    worldScale = 40;
    t = 0;
}
function setup(){
    reset();
    rotationRatio = Math.PI*.35;
    previousText = "";
    mirrorOffset = [0,0,0];
    createCanvas(innerWidth, innerHeight);


    xThetaDynamic = 0;
    yThetaDynamic = 0;
    distanceFromProjection = 50;

    var points = [[0,0,1,2,3,4,4,3,3,2.5,1.5,1,1,  0,0,1,2,3,4,4,3,3,2.5,1.5,1,1],
    [0,5,5,3,5,5,0,0,3,2,2,3,0, 0,5,5,3,5,5,0,0,3,2,2,3,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2]];
    var xMax = Math.max(...points[0])/2;
    var yMax = Math.max(...points[1])/2;
    for(var i = 0; i < points[0].length; i++){
        points[0][i] -= xMax;
    }
    for(var i = 0; i < points[1].length; i++){
        points[1][i] -= yMax;
    }

    var particles = [];
    for(var i = 0; i < points[0].length; i++){
        var newPoint = [points[0][i], points[1][i], points[2][i]];
        particles.push(new Particle(i, newPoint));
    }

    var m_model = new Model(particles, function(){
        for(var i = 0; i < this.particlesSize; i++){
            if(i != this.particlesSize/2-1 && i!= this.particlesSize-1){
                drawLine(this.particles[i].pos2d, this.particles[i+1].pos2d);
            }else{
                drawLine(this.particles[i].pos2d, this.particles[i-(this.particlesSize/2-1)].pos2d);

            }

            if(i <= this.particlesSize/2-1){
                drawLine(this.particles[i].pos2d, this.particles[i+(this.particlesSize/2)].pos2d);

            }
        }
    }, -180, -90, 6);

    models.push(m_model);

    var points = [[0,1.5,2.5,4,3,2.5,1.5,1,0,1.5,2.5,4,3,2.5,1.5,1,1.7,2,2.3],
                  [0,5,5,0,0,2,2,0,0,5,5,0,0,2,2,0,3,4,3],
                  [1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1]]
    var xMax = Math.max(...points[0])/2;
    var yMax = Math.max(...points[1])/2;
    for(var i = 0; i < points[0].length; i++){
        points[0][i] -= xMax;
    }
    for(var i = 0; i < points[1].length; i++){
        points[1][i] -= yMax;
    }

    var particles = [];
    for(var i = 0; i < points[0].length; i++){
        var newPoint = [points[0][i], points[1][i], points[2][i]];
        particles.push(new Particle(i, newPoint));
    }

    var a_model = new Model(particles, function(){
        for(var i = 0; i < this.particlesSize-3; i++){
            if(i != (this.particlesSize-3)/2-1 && i!= this.particlesSize-4){
                drawLine(this.particles[i].pos2d, this.particles[i+1].pos2d);
            }else{
                drawLine(this.particles[i].pos2d, this.particles[i-((this.particlesSize-3)/2-1)].pos2d);

            }

            if(i <= (this.particlesSize-3)/2-1){
                drawLine(this.particles[i].pos2d, this.particles[i+((this.particlesSize-3)/2)].pos2d);

            }
        }
        drawLine(this.particles[this.particlesSize-3].pos2d, this.particles[this.particlesSize-2].pos2d);
        drawLine(this.particles[this.particlesSize-2].pos2d, this.particles[this.particlesSize-1].pos2d);
        drawLine(this.particles[this.particlesSize-1].pos2d, this.particles[this.particlesSize-3].pos2d);
    }, 0, -90, 6);

    models.push(a_model);

    var points = [[0,0,3,0,0,4,4,1,4,4,0,0,3,0,0,4,4,1,4,4],
                  [0,1,4,4,5,5,4,1,1,0,0,1,4,4,5,5,4,1,1,0],
                  [1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2]];
//    var points = [[0,0,3,0,0,4,4,1,4,4],
//                  [0,1,4,4,5,5,4,1,1,0],
//                  [1,1,1,1,1,1,1,1,1,1]];
    var xMax = Math.max(...points[0])/2;
    var yMax = Math.max(...points[1])/2;
    for(var i = 0; i < points[0].length; i++){
        points[0][i] -= xMax;
    }
    for(var i = 0; i < points[1].length; i++){
        points[1][i] -= yMax;
    }

    var particles = [];
    for(var i = 0; i < points[0].length; i++){
        var newPoint = [points[0][i], points[1][i], points[2][i]];
        particles.push(new Particle(i, newPoint));
    }

    var z_model = new Model(particles, function(){
        for(var i = 0; i < this.particlesSize; i++){
            if(i != this.particlesSize/2-1 && i!= this.particlesSize-1){
                drawLine(this.particles[i].pos2d, this.particles[i+1].pos2d);
            }else{
                drawLine(this.particles[i].pos2d, this.particles[i-(this.particlesSize/2-1)].pos2d);

            }

            if(i <= this.particlesSize/2-1){
                drawLine(this.particles[i].pos2d, this.particles[i+(this.particlesSize/2)].pos2d);

            }
        }

//        for(var i = 0; i < this.particlesSize; i++){
//            drawLine(this.particles[i].pos2d, this.particles[i].mirrorPos2d);
//        }

    }, 180, -90, 6);

    models.push(z_model);

    var points = [[0,1,1,0,0,1,1,0],
                  [0,0,1,1,0,0,1,1],
                  [1,1,1,1,2,2,2,2]];

    var xMax = Math.max(...points[0])/2;
    var yMax = Math.max(...points[1])/2;
    for(var i = 0; i < points[0].length; i++){
        points[0][i] -= xMax;
    }
    for(var i = 0; i < points[1].length; i++){
        points[1][i] -= yMax;
    }

    var particles = [];
    for(var i = 0; i < points[0].length; i++){
        var newPoint = [points[0][i], points[1][i], points[2][i]];
        particles.push(new Particle(i, newPoint));
    }

    var z_model = new Model(particles, function(){
        noStroke();
        var modulatedEdgeOpacity = edgeOpacity*4;
//        fill("rgba(50,50,200," + modulatedEdgeOpacity.toString() + ")");
//        quad(x(this.particles[0].pos2d), y(this.particles[0].pos2d),
//             x(this.particles[1].pos2d), y(this.particles[1].pos2d),
//             x(this.particles[2].pos2d), y(this.particles[2].pos2d),
//             x(this.particles[3].pos2d), y(this.particles[3].pos2d));
//        fill("rgba(200,50,50," + modulatedEdgeOpacity.toString() + ")");
//        quad(x(this.particles[0].pos2d), y(this.particles[0].pos2d),
//             x(this.particles[1].pos2d), y(this.particles[1].pos2d),
//             x(this.particles[5].pos2d), y(this.particles[5].pos2d),
//             x(this.particles[4].pos2d), y(this.particles[4].pos2d));
//        fill("rgba(50,200,50," + modulatedEdgeO  gbpacity.toString() + ")");
//        quad(x(this.particles[1].pos2d), y(this.particles[1].pos2d),
//             x(this.particles[5].pos2d), y(this.particles[5].pos2d),
//             x(this.particles[6].pos2d), y(this.particles[6].pos2d),
//             x(this.particles[2].pos2d), y(this.particles[2].pos2d));
//        fill("rgba(255,167,30," + modulatedEdgeOpacity.toString() + ")");
//        quad(x(this.particles[4].pos2d), y(this.particles[4].pos2d),
//             x(this.particles[0].pos2d), y(this.particles[0].pos2d),
//             x(this.particles[3].pos2d), y(this.particles[3].pos2d),
//             x(this.particles[7].pos2d), y(this.particles[7].pos2d));
//        fill("rgba(255,100,170," + modulatedEdgeOpacity.toString() + ")");
//        quad(x(this.particles[2].pos2d), y(this.particles[2].pos2d),
//             x(this.particles[3].pos2d), y(this.particles[3].pos2d),
//             x(this.particles[7].pos2d), y(this.particles[7].pos2d),
//             x(this.particles[6].pos2d), y(this.particles[6].pos2d));



        stroke(0, 255*edgeOpacity*globalOpacity);
        fill(0, 150*t*globalOpacity);
    }, 0, -100, 6);

//    models.push(z_model);
}

var plateOpacity = 0;

function draw(){

    frame++;
    background(255);

    if(pause){
        if(globalOpacity >= 0){
            globalOpacity -= .1;
        }
    }else{
        if(globalOpacity != 1){
            globalOpacity = 1;
        }

    }
    if(globalOpacity >= 0){
        fill(0, 150*t*globalOpacity);
        stroke(0, 255*edgeOpacity*globalOpacity);


        for(var i = 0; i < models.length; i++){
            models[i].update();
        }

        if(t < .9999){
            t += (1 - t)/15;
        }
        if(t > .995){
            if(edgeOpacity < .7){
                edgeOpacity += .03;
            }
        }
    }
}

function Model(particles, renderFunction, xOffset, yOffset, dragOffset){
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.dragOffset = dragOffset;
    this.particles = particles;
    this.particlesSize = this.particles.length;
    this.renderFunction = renderFunction;

    this.update = function(){
        for(var i = 0; i < this.particlesSize; i++){
            this.particles[i].update(this.xOffset, this.yOffset, this.dragOffset);
        }
        this.renderFunction();
    }
}


function Particle(id, particle){
    this.id = id;
    this.d;

    this.originalPos3d = [x(particle), -y(particle), z(particle)];
    this.originalPos2d;

    this.pos3dTarget;
    this.pos3d = [0,0,0];
    this.pod2d;

    this.p0 = [random() * innerWidth/2 + innerWidth/4, random()*100];
    this.r1 = random()*6.28;
    this.r2 = random()*6.28;
    this.do = random()*2 + 2;
    this.d = this.do;

    this.initialize = false;

//    this.mirrorPos3dTarget = [0,0,0];
//    this.mirrorPos3d = [0,0,0];
//    this.mirrorOriginalPos3d = [0,0,0];
//    this.mirrorPos2d = [0,0];


    this.draw = function(){
        if(this.d > 0){

        }
        ellipse(x(this.pos2d), y(this.pos2d), 3);

    }

    this.update = function(xOffset, yOffset, dragOffset){
        this.pos2d = [0,0];

        if(t == 0){
            this.d = this.do;
        }

        if(t > .995){
            if(this.d > 0){
                this.d -= .2;
            }
            if(this.d < 0){
                this.d = 0;
            }
        }

        if(1 - t > .0008){
            if(!this.initialize){
                this.initialize = true;
                this.pos3dTarget = transformation("rotateX", transformation("rotateY", this.originalPos3d, -Math.PI*.08), Math.PI*.08);

                this.pos3dTarget[0] *= worldScale;
                this.pos3dTarget[1] *= worldScale;
                this.pos3dTarget[2] += distanceFromProjection;
                this.pos3d[0] = this.pos3dTarget[0];
                this.pos3d[1] = this.pos3dTarget[1];
                this.pos3d[2] = this.pos3dTarget[2];
                this.originalPos2d = [0,0];

                this.originalPos2d[0] = x(this.pos3dTarget) * (distanceFromProjection / z(this.pos3dTarget)) + innerWidth/2 + xOffset;
                this.originalPos2d[1] = y(this.pos3dTarget) * (distanceFromProjection / z(this.pos3dTarget)) + innerHeight/2 + yOffset;
                this.bezierCenter = [(x(this.originalPos2d) + x(this.p0))/2, (y(this.originalPos2d) + y(this.p0))/2];
                this.p1 = [x(this.bezierCenter) + 250*Math.cos(this.r1), y(this.bezierCenter) + 250*Math.sin(this.r1)];
                this.p2 = [x(this.bezierCenter) + 250*Math.cos(this.r2), y(this.bezierCenter) + 250*Math.sin(this.r2)];
            }
            this.pos2d[0] = pow(1-t,3) * x(this.p0) + 3*t*pow(1-t,2) * x(this.p1) + 3*pow(t,2)*pow(1-t,1) * x(this.p2) + pow(t,3) * x(this.originalPos2d);
            this.pos2d[1] = pow(1-t,3) * y(this.p0) + 3*t*pow(1-t,2) * y(this.p1) + 3*pow(t,2)*pow(1-t,1) * y(this.p2) + pow(t,3) * y(this.originalPos2d);
        }else{


            this.pos3dTarget = transformation("rotateX", transformation("rotateY", this.originalPos3d, -xThetaDynamic), yThetaDynamic);

            this.pos3dTarget[0] *= worldScale;
            this.pos3dTarget[1] *= worldScale;
            this.pos3dTarget[2] += distanceFromProjection;

            if(xThetaDynamic != 0 && yThetaDynamic != 0){
                this.pos3d[0] += (x(this.pos3dTarget) - x(this.pos3d))/dragOffset;
                this.pos3d[1] += (y(this.pos3dTarget) - y(this.pos3d))/dragOffset;
                this.pos3d[2] += (z(this.pos3dTarget) - z(this.pos3d))/dragOffset;
            }

            this.pos2d[0] = x(this.pos3d) * (distanceFromProjection / z(this.pos3d)) + innerWidth/2 + xOffset;
            this.pos2d[1] = y(this.pos3d) * (distanceFromProjection / z(this.pos3d)) + innerHeight/2 + yOffset;




//            if(id == 0){
//                this.mirrorOriginalPos3d = this.originalPos3d;
//                this.mirrorOriginalPos3d[2] = 2;
//                this.mirrorPos3dTarget = transformation("rotateX", transformation("rotateY", this.mirrorOriginalPos3d, -xThetaDynamic), yThetaDynamic);
//
//                this.mirrorPos3dTarget[0] *= worldScale;
//                this.mirrorPos3dTarget[1] *= worldScale;
//                this.mirrorPos3dTarget[2] += distanceFromProjection;
//
//
//
//                if(xThetaDynamic != 0 && yThetaDynamic != 0){
//                    this.mirrorPos3d[0] += (x(this.mirrorPos3dTarget) - x(this.mirrorPos3d))/dragOffset;
//                    this.mirrorPos3d[1] += (y(this.mirrorPos3dTarget) - y(this.mirrorPos3d))/dragOffset;
//                    this.mirrorPos3d[2] += (z(this.mirrorPos3dTarget) - z(this.mirrorPos3d))/dragOffset;
//                }
//
//                mirrorOffset = subArray(this.pos3d, this.mirrorPos3d);
//
//            }else{
//                this.mirrorPos3d[0] = this.pos3d[0] - x(mirrorOffset);
//                this.mirrorPos3d[1] = this.pos3d[1] - y(mirrorOffset);
//                this.mirrorPos3d[2] = this.pos3d[2] - z(mirrorOffset);
//            }
//            this.mirrorPos2d[0] = x(this.mirrorPos3d) * (distanceFromProjection / z(this.mirrorPos3d)) + innerWidth/2 + xOffset;
//            this.mirrorPos2d[1] = y(this.mirrorPos3d) * (distanceFromProjection / z(this.mirrorPos3d)) + innerHeight/2 + yOffset;
//            console.log();
        }

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


console.log(subArray([1,2],[1,1]));
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

function addArray(arr1, arr2){
    var result = [];
    for(var i = 0; i < arr1.length; i++){
        result.push(arr1[i]+arr2[i]);
    }
    return result;
}

function subArray(arr1, arr2){
    var result = [];
    for(var i = 0; i < arr1.length; i++){
        result.push(arr1[i]-arr2[i]);
    }
    return result;
}

// Website

function openProjects(){
        pause = true;
        $("#buttonsContainer").animate({
            'opacity': '0'
        }, 150, function(){
            $("#buttonsContainer")[0].style.display = "none";
            $("#projectsContent")[0].style.display = "block";
            $("#projectsContent").animate({
                'opacity': '1'
            }, 300, function(){

            });
        });
}
function closeProjects(){
    $("#projectsContent").animate({
        'opacity': '0'
    }, 300, function(){
        reset();
        $("#projectsContent")[0].style.display = "none";
        $("#buttonsContainer")[0].style.display = "flex";
        $("#buttonsContainer").animate({
            'opacity': '1'
        }, 150, function(){

        });
    });
}

function setDescription(a){
    if(isChanging == false && previousText != a){
        previousText = a;
        isChanging = true;

        $('#projectDescription').animate({
            'opacity': '.3'
        }, 70, function(){
            $('#projectDescription')[0].innerHTML = a;
            $("#projectDescription").animate({
                'opacity': '1'
            }, 70, function(){
                isChanging = false;
            });
        });
    }
}
