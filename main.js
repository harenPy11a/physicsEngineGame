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
var ball = Bodies.circle(170, 390, 25, 25)
Body.rotate(cannonside1, 2.5);
Body.rotate(cannonside2, 2.5)
Body.rotate(end, 2.5)
Render.lookAt(render, {
    min: { x: ball.position.x - 750 , y: ball.position.y-300},
    max: { x: ball.position.x + 750, y: ball.position.y+300}
});

Composite.add(engine.world, [cannonside1, cannonside2, end, ball])
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
