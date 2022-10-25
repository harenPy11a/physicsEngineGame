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
var Constraint = Matter.Constraint;
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
var ball = Bodies.polygon(170, 390, 25, 25, {restitution: 0.9, friction: 0, mass: 10})
Body.rotate(cannonside1, 2.5);
Body.rotate(cannonside2, 2.5)
Body.rotate(end, 2.5)
Render.lookAt(render, {
    min: { x: ball.position.x - 750 , y: ball.position.y-300},
    max: { x: ball.position.x + 750, y: ball.position.y+300}
});  
// create funnel
var funnel1 = Bodies.rectangle(1075, 780, 80, 20, {isStatic:true, angle: -1.3});
var funnel2 = Bodies.rectangle(925, 780, 80, 20, {isStatic:true, angle:1.3});
var funnel3 = Bodies.rectangle(1070, 840, 80, 20, {isStatic:true, angle:-1.2});
var funnel4 = Bodies.rectangle(930, 840, 80, 20, {isStatic:true, angle:1.2});
var funnel5 = Bodies.rectangle(1065, 890, 80, 20, {isStatic:true, angle:-1.1});
var funnel6 = Bodies.rectangle(935, 890, 80, 20, {isStatic:true, angle:1.1});
var funnel7 = Bodies.rectangle(1060, 940, 80, 20, {isStatic:true, angle:-1.0});
var funnel8 = Bodies.rectangle(940, 940, 80, 20, {isStatic:true, angle:1.0});

// Body.rotate(funnel1,);
// Body.rotate(funnel2,);
// Body.rotate(funnel3,);
// Body.rotate(funnel4,);
// Body.rotate(funnel5,);
// Body.rotate(funnel6,);
// Body.rotate(funnel7,);
// Body.rotate(funnel8,);
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
var boundary1 = Bodies.rectangle(175, 2050, 1450, 20, {isStatic:true, angle: Math.PI/2});
var boundary2 = Bodies.rectangle(1700, 2050, 1450, 20, {isStatic:true, angle: Math.PI/2});

// Body.rotate(boundary1,)
// Body.rotate(boundary2,)


//bouncy walls
var wall1 = Bodies.rectangle(1050, 130, 50, 150, {isStatic:true, angle:-2.5, restitution:1.3})
var wall2 = Bodies.rectangle(780, 250, 50, 150, {isStatic:true, angle:2.5, restitution:1.3})
var wall3 = Bodies.rectangle(1080, 350, 50, 150, {isStatic:true, angle:-2.5, restitution:1.3})
var wall4 = Bodies.rectangle(780, 430, 50, 150, {isStatic:true, angle:2.5, restitution:1.3})
// Body.rotate(wall1,)
// Body.rotate(wall2,2.5)
// Body.rotate(wall3,-2.5)
// Body.rotate(wall4,2.5) 
//create the ramps
var platform = Bodies.rectangle(1420, 2880, 580, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -.45})
var platform2 = Bodies.rectangle(1000, 3050, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -.3})
var platform3 = Bodies.rectangle(700, 3140, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -.3})
var platform4 = Bodies.rectangle(120, 3070, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -2.2})
var platform5 = Bodies.rectangle(320, 3300, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: .7})
var platform6 = Bodies.rectangle(580, 3435, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: .2})
var platform7 = Bodies.rectangle(1070, 3500, 700, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: .1})

// Body.rotate(platform,-.45)
// Body.rotate(platform2, -0.2)
// Body.rotate(platform3, -.3)
// Body.rotate(platform4,-2.2)
// Body.rotate(platform5,.7)
// Body.rotate(platform6,.2)
// Body.rotate(platform7,.1)

//add reverse gravity tunnel;
var base = Bodies.rectangle(2000, 3950, 800, 20, {isStatic:true, friction: 0, angle: .2})
var tunnelLeft = Bodies.rectangle(2300, 2410, 15, 3070, {isStatic:true})
var tunnelRight = Bodies.rectangle(2400, 2420, 15, 3200, {isStatic:true})
// seasaw
var baseOfSeasaw = Bodies.rectangle(2450, 450, 500, 15, {isStatic:true, friction: 0})
var seaSaw = Bodies.rectangle(2450, 550, 400, 15, {isStatic:false})
var block = Bodies.polygon(2670, 620, 50, 50, {isStatic:true, mass:1, friction: 0, restitution: 0.8 })
//after seasaw
var revRamp = Bodies.rectangle(3000, 250, 700, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -.5})

Composite.add(engine.world, [cannonside1, cannonside2, end, ball, wall1, wall2, wall3, wall4,
    funnel1, funnel2,funnel3,funnel4,funnel5,funnel6,funnel7,funnel8,boundary1,boundary2,
    platform, platform2, platform3,platform4, platform5, platform6, platform7, base, tunnelLeft, tunnelRight, baseOfSeasaw, seaSaw, block,
    revRamp, 
    Constraint.create({ bodyA: seaSaw, pointB: { x: 2450, y: 550 }}) 

])
    for(var i =0;i<pegs.length;i++){
        Composite.add(engine.world,[pegs[i]])
    }
//create reverse gravity tunnel
function setup(){

}
setTimeout(() => {
    fireCannon();
}, 3600);

//code for changing camera view
// Render.lookAt(render, {
//     min: { x: ____, y: _________},
//     max: { x: ______, y: __________}
// });

function fireCannon(){
    console.log("fired")
    Body.applyForce(ball, ball.position, {x: 0.75, y:-0.75})
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
            block.isStatic = false;
        }
        if(Collision.collides(b,platform7)){
            // engine.gravity.x = 0.65;
            Body.applyForce(ball, ball.position, {x: 0.0009, y:0})
            
        }
        if(Collision.collides(b,seaSaw)){
            Composite.remove(engine.world,[ball])
            followCamera(block)
            
        }
        if(Collision.collides(block, revRamp)){
            revRamp.mass = 1;
        }
        //clear interval and re-call function whenever you want to follow a different object.

    }, 1)  
}


