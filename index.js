var cnvs = document.querySelector("canvas");
cnvs.width = window.innerWidth;
cnvs.height = 700;

var c = cnvs.getContext('2d');

///////////////////////////////////CIRCULAR MOTION/////////////////////////////////////
window.addEventListener("resize", function(){
    cnvs.width = window.innerWidth;
    // cnvs.height = window.innerHeight;
    //dinamically generating circles all over when resising
    init();
})
var mouse = {
    x: cnvs.width/2,
    y: cnvs.height/2
}
window.addEventListener("mousemove",function(event){
    mouse.x = event.x;
    mouse.y=event.y;
})

function getDistance(x1,y1,x2,y2){
    return Math.pow((Math.pow(x1-x2,2)+Math.pow(y1-y2,2)),0.5);
}

//constructor for creating particles
function Particle(x,y,r,color){
    this.x=x;
    this.y=y;
    this.r=r;
    this.radians =Math.random()*2*Math.PI;
    //radious of the particle's circular path
    this.outerRad = Math.random()*200+100;
    //velocity of circular motion
    this.v=Math.random()*0.01+0.01;
    this.color=color;
    //centre of the circular path
    // this.lastMouse = {x:x,y:y};

    //func for drawing the circle using the given properties
    this.draw = function(prevPoint){
        c.beginPath();
        c.strokeStyle=this.color;
        //thickness of the line
        c.lineWidth = this.r;
        //drawing a thick line from prev point to updated point
        c.moveTo(prevPoint.x,prevPoint.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        c.closePath();
    }

    this.update = function(){
        //storing the current point for passing it to draw
        var prevPoint = {x:this.x,y:this.y};
        //chnaging the path angle
        this.radians+=this.v;
        //upadting new point
        this.x =x+ Math.cos(this.radians)*this.outerRad;
        this.y =y+ Math.sin(this.radians)*this.outerRad;
        //drawing the line
        this.draw(prevPoint);
    }
}

var partArr=[];
function init(){
    partArr=[];
    for(var i=0;i<200;i++){
        //random thickness of the line
        var r=Math.random()*3+2;
        //center of rotation
        var x= cnvs.width/2;
        var y= cnvs.height/2;
        // x=0;
        // y=0;
        var randColor = "#"+Math.floor(Math.random()*16777215).toString(16);
        partArr.push(new Particle(x,y,r,randColor));
    }
}

function animate(){
    requestAnimationFrame(animate);
    //for trailing effect 
    c.fillStyle='rgb(26, 55, 77, 0.05)';
    c.fillRect(0,0,cnvs.width,cnvs.height);
    //updating all line's position
    for(var i=0;i<partArr.length;i++){
        partArr[i].update(partArr);
    }
}
//initializing for the 1st time
init();
//animating
animate();



