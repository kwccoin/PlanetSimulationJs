let planet;
let universe;
function setup(){
    createCanvas(500,500);
    planet1 = new Planet(300,300,100)
    universe = new Universe()
    universe.add(planet1)
}

function draw(){
  background(0)
  universe.simulate()
  universe.draw()
    
}

function mousePressed(){
    let p = new Planet(mouseX,mouseY,random()*50+50)
    universe.add(p)
}


class Planet{
    constructor(x,y,size){
        this.mass = size
        this.g    = 2
        this.position = new Vector(x,y)
        this.color = [random()*255,random()*255,random()*255]
        this.velocity = new Vector(0,0)
        this.acc      = new Vector(0,0)
    }

    draw(){
        if(this.velocity.x<50 && this.velocity.y<50){
            this.velocity = Vector.add(this.velocity,this.acc)
            
        }
        this.position = Vector.add(this.position,this.velocity)
        
        this.acceleration = new Vector(0,0)

        //walls
        

        fill(this.color);
        ellipse(this.position.x,this.position.y,this.mass,this.mass);
    }

    addForce(forceVector){
        this.acc = Vector.add(forceVector,this.acc)
    }

    print(){
        console.log("x : ",this.x," y : ",this.y)
    }

    
}


class Universe{
    constructor(){
        this.planets = []
    }
    
    add(planet){
        this.planets.push(planet)
    }

    draw(){
        this.planets.forEach(planet=>{
            planet.draw()
        })
    }

    simulate(){
        for (let i = 0; i <this.planets.length ; i++) {
            for (let j = 0; j < this.planets.length; j++) {
                if(j!=i){
                    let p1 = this.planets[i]
                    let p2 = this.planets[j]
                    
                    let dir1 = Vector.subtract(p1.position,p2.position)
                    let distance = dir1.magnitude()
                    dir1 = Vector.normalize(dir1)
                    //f =m1*m2/d^2
                    let force1Magnitude = (p1.mass*p2.mass*0.5)/(distance*distance)
                    let force = Vector.multiply(dir1,force1Magnitude)
                    let once = true
                    if(distance>(p1.mass/2)+(p2.mass/2)){
                        
                        p1.addForce(force)
                        console.log(force1Magnitude)
                    }else{
                            if(once){
                                p1.velocity = new Vector(0,0)
                                p1.acc      = new Vector(0,0)
                                once = false
                            }
                            
                    }
                    
                }
            }
        }
    }

}



class Vector{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    
    static add(v1,v2){
        let res = new Vector(0,0)
        res.x = v1.x+v2.x
        res.y = v1.y+v2.y
        return res
    }

    draw(){
        push()
        translate(width/2,height/2)
        line(0,0,this.x,this.y)
        pop()
    }
    
   

    static multiply(v,n){
        let res = new Vector(0,0)
        res.x = v.x*n
        res.y = v.y*n
        return res
    }
    
    static normalize(v1){
        let mag = Math.sqrt(v1.x*v1.x+v1.y*v1.y)
        let res = Vector.multiply(v1,(1.0/mag))
        return res
    }   

    static subtract(v1,v2){
        let res = new Vector(0,0);
        res.x=v2.x-v1.x
        res.y=v2.y-v1.y
        return res;
    }

    magnitude(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }

}