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
        hasBounds : true
    }
})

//start render
Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine)

//create a simple box fallings
var boxA = Bodies.rectangle(100, 100, 100, 100);
Composite.add(engine.world, boxA)
