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
    
        //
        //  F = ( (m1*m2)/(d*d) ) * f
        // a b c d
        //
        for (let i = 0; i < this.planets.length; i++) {
            for (let j = 0; j < this.planets.length; j++) {
                if(i!=j){
                   let p1 = this.planets[i]
                   let p2 = this.planets[j] 
                   let dirForce = Vector.subtract(p2.position,p1.position)

                   let distance = dirForce.magnitude()
                   
                   dirForce = Vector.normalize(dirForce)
                   
                   let forceMagnitude = (p1.mass*p2.mass*10 )/(distance*distance)
                   
                   let force = Vector.multiply(dirForce,forceMagnitude)

                   if(distance>((p1.mass/2)+(p2.mass/2) )){
                        p1.addForce(force)
                   }else{
                       p1.velocity = new Vector(0,0)
                       p1.acceleration = new Vector(0,0)
                   }

                   
                   
                   

                }
            }
        }
    }

}