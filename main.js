//create alias
var Engine = Matter.Engine
var Render = Matter.Render
var Runner = Matter.Runner
var Bodies = Matter.Bodies
var Body = Matter.Body
var Composite = Matter.Composite
var Bounds = Matter.Bounds
var Collision = Matter.Collision
var events = Matter.events
//create engine
var engine = Engine.create()
var render = Render.create({
    element:document.body,
    engine:engine,
    options:{
        hasBounds : true,
        width: innerWidth,
        height: innerHeight
    }
})

//start render
Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine)

//create cannon
var cannonside1 = Bodies.rectangle(90, 410, 300, 20, {isStatic:true})
var cannonside2 = Bodies.rectangle(120, 480, 300, 20, {isStatic:true})
var end = Bodies.rectangle(10, 520, 45, 45, {isStatic:true})
var ball = Bodies.polygon(170, 390, 25, 25, {restitution: 0.8})
Body.rotate(cannonside1, 2.5);
Body.rotate(cannonside2, 2.5)
Body.rotate(end, 2.5)
Render.lookAt(render, {
    min: { x: ball.position.x - 750 , y: ball.position.y-300},
    max: { x: ball.position.x + 750, y: ball.position.y+300}
});
// create funnel
var funnel1 = Bodies.rectangle(1075, 790, 80, 20, {isStatic:true});
var funnel2 = Bodies.rectangle(925, 790, 80, 20, {isStatic:true});
var funnel3 = Bodies.rectangle(1070, 840, 80, 20, {isStatic:true});
var funnel4 = Bodies.rectangle(930, 840, 80, 20, {isStatic:true});
var funnel5 = Bodies.rectangle(1065, 890, 80, 20, {isStatic:true});
var funnel6 = Bodies.rectangle(935, 890, 80, 20, {isStatic:true});
var funnel7 = Bodies.rectangle(1060, 940, 80, 20, {isStatic:true});
var funnel8 = Bodies.rectangle(940, 940, 80, 20, {isStatic:true});

Body.rotate(funnel1,-1.3);
Body.rotate(funnel2,1.3);
Body.rotate(funnel3,-1.2);
Body.rotate(funnel4,1.2);
Body.rotate(funnel5,-1.1);
Body.rotate(funnel6,1.1);
Body.rotate(funnel7,-1.0);
Body.rotate(funnel8,1.0);
//create pegs for plinkos
var cols = 10;
var rows = 10;
var spacing = 150;
var pegs = []
for(var i = 0; i < rows; i++){
    for(var j = 0; j < cols; j++){
        var x =   j * spacing + 175;
        if(i % 2 == 1){
            x += spacing/2 
            var y = spacing + i * spacing + 1200
            var peg =  new Bodies.polygon(x,y,500,15, {isStatic:true})
            // var peg = new Peg(x, y, 5)
            pegs.push(peg);
            
        }
        else {
            if(j != 0){
                var y = spacing + i * spacing + 1200
                var peg =  new Bodies.polygon(x,y,500,15, {isStatic:true})
                pegs.push(peg);

            }
        }

    }
}
//creates the boundaries for plinkos
var boundary1 = Bodies.rectangle(175, 2050, 1450, 20, {isStatic:true});
var boundary2 = Bodies.rectangle(1700, 2050, 1450, 20, {isStatic:true});

Body.rotate(boundary1,Math.PI/2)
Body.rotate(boundary2,Math.PI/2)

//bouncy walls
var wall1 = Bodies.rectangle(1050, 130, 50, 150, {isStatic:true})
var wall2 = Bodies.rectangle(750, 260, 50, 150, {isStatic:true})
var wall3 = Bodies.rectangle(1050, 330, 50, 150, {isStatic:true})
var wall4 = Bodies.rectangle(750, 430, 50, 150, {isStatic:true})
Body.rotate(wall1,-2.5)
Body.rotate(wall2,2.5)
Body.rotate(wall3,-2.5)
Body.rotate(wall4,2.5)
//create the ramps
var platform = Bodies.rectangle(1420, 2880, 580, 20, {isStatic:true, friction: -10})
var platform2 = Bodies.rectangle(1000, 3050, 300, 20, {isStatic:true, friction: -10})
var platform3 = Bodies.rectangle(700, 3140, 300, 20, {isStatic:true, friction: -10})
var platform4 = Bodies.rectangle(120, 3070, 300, 20, {isStatic:true, friction: -10})
var platform5 = Bodies.rectangle(320, 3300, 300, 20, {isStatic:true, friction: -10})
var platform6 = Bodies.rectangle(580, 3435, 300, 20, {isStatic:true, friction: -10})
var platform7 = Bodies.rectangle(1070, 3500, 700, 20, {isStatic:true, friction: 0})
Body.rotate(platform,-.5)
Body.rotate(platform2, -0.2)
Body.rotate(platform3, -.3)
Body.rotate(platform4,-2.2)
Body.rotate(platform5,.7)
Body.rotate(platform6,.2)
Body.rotate(platform7,.1)

//add reverse gravity tunnel;
var base = Bodies.rectangle(2000, 4000, 750, 20, {isStatic:true, friction:10})
var tunnelLeft = Bodies.rectangle(2300, 3180, 15, 1500, {isStatic:true})
var tunnelRight = Bodies.rectangle(2400, 3170, 15, 1700, {isStatic:true})

Composite.add(engine.world, [cannonside1, cannonside2, end, ball, wall1, wall2, wall3, wall4,
funnel1, funnel2,funnel3,funnel4,funnel5,funnel6,funnel7,funnel8,boundary1,boundary2,
platform, platform2, platform3,platform4, platform5, platform6, platform7, base, tunnelLeft, tunnelRight])
for(var i =0;i<pegs.length;i++)(
    Composite.add(engine.world,[pegs[i]])
)
//create reverse gravity tunnel
setTimeout(() => {
    fireCannon();
}, 3000);

//code for changing camera view
// Render.lookAt(render, {
//     min: { x: ____, y: _________},
//     max: { x: ______, y: __________}
// });
function setup(){

}
function fireCannon(){
    console.log("fired")
    Body.applyForce(ball, ball.position, {x: 0.15, y:-0.15})
    followCamera(ball)
}
//add a way to zoom in and out with scrolll wheeeeell





function followCamera(b){
    var start = new Date();
    var interval = setInterval(() => {
        Render.lookAt(render, {
            min: { x: b.position.x-750 , y: b.position.y-300},
            max: { x: b.position.x + 750, y: b.position.y+300}
        });
        if(Collision.collides(b, tunnelRight)){
            engine.gravity.y = -1;
            engine.gravity.x = 0;
        }
        if(Collision.collides(b,platform)){
            engine.gravity.x = 0.25;
        }
        if(Collision.collides(b,platform2)){
            engine.gravity.x = -0.25;
        }
        if(Collision.collides(b,platform3)){
            engine.gravity.x = -0.25;
        }
        if(Collision.collides(b,platform4)){
            engine.gravity.x = 0.25;
        }
        if(Collision.collides(b,platform5)){
            engine.gravity.x = 0.25;
        }
        if(Collision.collides(b,platform6)){
            engine.gravity.x = 0.25;
        }
        if(Collision.collides(b,platform7)){
            engine.gravity.x = 0.65;
        }
        //clear interval and re-call function whenever you want to follow a different object.

    }, 1)  
}
