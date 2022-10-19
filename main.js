//create alias
var Engine = Matter.Engine
var Render = Matter.Render
var Runner = Matter.Runner
var Bodies = Matter.Bodies
var Body = Matter.Body
var Composite = Matter.Composite
var Bounds = Matter.Bounds

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
var cannonside1 = Bodies.rectangle(90, 410, 265, 20, {isStatic:true})
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
var funnel1 = Bodies.rectangle(1050, 800, 80, 20, {isStatic:true});
var funnel2 = Bodies.rectangle(950, 800, 80, 20, {isStatic:true});
Body.rotate(funnel1,-1.2);
Body.rotate(funnel2,1.2);
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
// var platform = Bodies.rectangle(1000, 1400, 300, 20, {isStatic:true})
// var platform2 = Bodies.rectangle(700, 1500, 300, 20, {isStatic:true})
// var platform3 = Bodies.rectangle(400, 1500, 300, 20, {isStatic:true})
// var platform4 = Bodies.rectangle(200, 1550, 300, 20, {isStatic:true})
// Body.rotate(platform,2.5)
// Body.rotate(platform4,-2)
// , platform, platform2, platform3, platform4
Composite.add(engine.world, [cannonside1, cannonside2, end, ball, wall1, wall2, wall3, wall4,
funnel1, funnel2])
//create ball being launched

setTimeout(() => {
    fireCannon();
}, 3000);

//code for changing camera view
// Render.lookAt(render, {
//     min: { x: ____, y: _________},
//     max: { x: ______, y: __________}
// });

function fireCannon(){
    console.log("fired")
    Body.applyForce(ball, ball.position, {x: 0.15, y:-0.15})
    followCamera(ball)
}

function followCamera(b){
    var start = new Date();
    var interval = setInterval(() => {
        Render.lookAt(render, {
            min: { x: b.position.x-750 , y: b.position.y-300},
            max: { x: b.position.x + 750, y: b.position.y+300}
        });

        //clear interval and re-call function whenever you want to follow a different object.

    }, 1)
    
    
}
