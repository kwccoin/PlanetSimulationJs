class Planet{
    constructor(x,y,size){
        this.position = new Vector(x,y)
        this.mass = size
        this.color = [random()*255,random()*255,random()*255]
        this.velocity = new Vector(0,0)
        this.acceleration = new Vector(0,0)
       
        
    }

    draw(){
        this.update()
        fill(this.color)
        ellipse(this.position.x,this.position.y,this.mass,this.mass)
        
    }

    update(){
        if(this.velocity.x<5 && this.velocity.y<5)
            this.velocity = Vector.add(this.velocity,this.acceleration)
        this.position = Vector.add(this.position,this.velocity)
        this.acceleration = new Vector(0,0)
    }

    addForce(force){
        //F= m*a
        //a = F/m
        console.log(force)
        let acc = Vector.multiply(force,1.0/this.mass)
        this.acceleration = Vector.add(this.acceleration,acc)

    }

}