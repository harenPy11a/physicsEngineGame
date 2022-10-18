function Peg(x,y,r){
    var options = {
        isStatic:true,
        restitution: 1,
        friction:0
    }
    this.body = Bodies.circle(x,y,r, options)
    this.r = r;
    World.add(world, this.body)
    this.color = 255
}

Peg.prototype.show = function(){
    fill( this.color );
    stroke(255);
    var pos = this.body.position;
    push()
    translate(pos.x, pos.y)
    ellipse(0,0,this.r * 2)
    pop()
}
