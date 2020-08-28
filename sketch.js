let earth;
let venus;
let universe;
function setup(){
    createCanvas(500,500);
    earth = new Planet(250,250,120)
    venus = new Planet(100,100,50)
    universe = new Universe()
    
}

function draw(){
    background(0)
    universe.simulate()
    universe.draw()

    
}


function mousePressed(){
    let p = new Planet(mouseX,mouseY,random()*100+50)
    
    universe.add(p)
}


