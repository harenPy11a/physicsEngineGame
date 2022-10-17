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
        width: 1500,
        height: 600
    }
})

//start render
Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine)

//create cannon
var cannon = Bodies.rectangle(90, 410, 300, 100, {isStatic:true})
Body.rotate(cannon, 2.5);

//create ball being launched
var ball = Bodies.circle(cannon.position.x + 150, 0, 40)
Composite.add(engine.world, [cannon, ball]);
engine.gravity.y = 0.2
setTimeout(() => {
    fireCannon();
}, 2000);

//code for changing camera view
// Render.lookAt(render, {
//     min: { x: ____, y: _________},
//     max: { x: ______, y: __________}
// });

function fireCannon(){
    engine.gravity.y = 1;
    console.log("fired")
    Body.applyForce(ball, ball.position, {x: 0.5, y:-0.5})
    followCamera(ball);
}

function followCamera(b, num){
    var start = new Date();
    var interval = setInterval(() => {
        Render.lookAt(render, {
            min: { x: b.position.x , y: b.position.y -300},
            max: { x: b.position.x + 750, y: b.position.y+300}
        });

        //clear interval and re-call function whenever you want to follow a different object.

    }, 1)
    
    
}