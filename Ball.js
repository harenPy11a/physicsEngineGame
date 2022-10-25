class Ball {
    constructor(x, y, r, f, b) {
        var options = {
            friction: f,
            restitution: b
        };
        this.body = Bodies.polygon(x, y, r, r, options);
        this.r = r;
        Composite.add(engine.world, this.body);

        this.show = function () {
            var pos = this.body.position;
            var angle = this.body.angle;
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            rectMode(CENTER);
            strokeWeight(1);
            stroke(255);
            fill(127);
            ellipse(0, 0, this.r * 2);
            pop();
        };
        this.getBall = function (){
            return this.body;
        }
    }
}