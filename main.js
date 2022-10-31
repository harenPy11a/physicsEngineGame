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
var Mouse = Matter.mouse;
var Engine = Matter.Engine,
        Events = Matter.Events,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Bodies = Matter.Bodies,
        Vector = Matter.Vector;
//create engine
var engine = Engine.create()
engine.world.density = 1;
var render = Render.create({
    element:document.body,
    engine:engine,
    options:{
        hasBounds : true,
        wireframes: false,
        width: innerWidth,
        height: innerHeight
    }
})
var obstacles = [];
var scaleFactor;

//start render
Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine)
var first = true;
var second = false;
var third  = false;

///////////////////////////////////////////////////////////////////////////////////

// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});


// keep the mouse in sync with rendering
render.mouse = mouse;


// keep track of current bounds scale (view zoom)
var boundsScaleTarget = 1,
boundsScale = {
x: 1,
y: 1
};

// use a render event to control our view
Events.on(render, 'beforeRender', function() {
var mouse = mouseConstraint.mouse,
translate;

// mouse wheel controls zoom
scaleFactor = mouse.wheelDelta * -0.2;
if (scaleFactor !== 0) {
if ((scaleFactor < 0 && boundsScale.x >= 0.6) || (scaleFactor > 0 && boundsScale.x <= 1.4)) {
    boundsScaleTarget += scaleFactor;
}
}

// if scale has changed
if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
// smoothly tween scale factor
scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
boundsScale.x += scaleFactor;
boundsScale.y += scaleFactor;

// scale the render bounds


if (first==true){
    render.bounds.max.x = ball.position.x + ((render.options.width/2) * boundsScale.x);
    render.bounds.max.y = ball.position.y + ((render.options.height/2) * boundsScale.x);

    render.bounds.min.x = ball.position.x - (render.options.width/2) * boundsScale.x;
    render.bounds.min.y = ball.position.y - (render.options.height/2) * boundsScale.x;
    console.log("first");
}else if (second==true){
    render.bounds.max.x = block.position.x + ((render.options.width/2) * boundsScale.x);
    render.bounds.max.y = block.position.y + ((render.options.height/2) * boundsScale.x);

    render.bounds.min.x = block.position.x - (render.options.width/2) * boundsScale.x;
    render.bounds.min.y = block.position.y - (render.options.height/2) * boundsScale.x;
    console.log("second");
}else if(third==true){
    render.bounds.max.x = theBird.position.x + ((render.options.width/2) * boundsScale.x);
    render.bounds.max.y = theBird.position.y + ((render.options.height/2) * boundsScale.x);

    render.bounds.min.x = theBird.position.x - (render.options.width/2) * boundsScale.x;
    render.bounds.min.y = theBird.position.y - (render.options.height/2) * boundsScale.x;
    console.log("third")
}
// translate so zoom is from centre of view
translate = {
    x: render.options.width * scaleFactor * -0.5,
    y: render.options.height * scaleFactor * -0.5
};

Bounds.translate(render.bounds, translate);


// update mouse
Mouse.setScale(mouse, boundsScale);
Mouse.setOffset(mouse, render.bounds.min);
}

});

///////////////////////////////////////////////////////////////////////////////////


//mini game objects
var theBird;


var rectPara = Bodies.rectangle(200, -2000, 250, 30)
var rectSide1 = Bodies.rectangle(115, -1950, 45, 65, {isStatic:true})
var rectSide2 = Bodies.rectangle(285, -1950, 45, 65, {isStatic:true})

var parachute = Body.create({
    parts:[rectPara, rectSide1, rectSide2]
})

Body.setMass(parachute, 10);
var egg = Bodies.circle(200, -1700, 30);
Body.setMass(egg,10)

//create cannon
var cannonside1 = Bodies.rectangle(90, 410, 300, 20, {isStatic:true,render:{fillStyle: "#679bf5"}})
var cannonside2 = Bodies.rectangle(120, 480, 300, 20, {isStatic:true,render:{fillStyle: "#679bf5"}})
var end = Bodies.rectangle(10, 520, 45, 45, {isStatic:true,render:{fillStyle: "#679bf5"}})
var ball = Bodies.polygon(170, 390, 25, 25, {restitution: 0.9, friction: 0, mass: 10,render:{fillStyle: "#fa5757"}})
Body.rotate(cannonside1, 2.5);
Body.rotate(cannonside2, 2.5)
Body.rotate(end, 2.5)
Render.lookAt(render, {
    min: { x: ball.position.x - 750 , y: ball.position.y-300},
    max: { x: ball.position.x + 750, y: ball.position.y+300}
});  

// create funnel
var funnel1 = Bodies.rectangle(1075+20, 780, 80, 20, {isStatic:true, angle: -1.3,render:{fillStyle: "#be57fa"}});
var funnel2 = Bodies.rectangle(925, 780, 80, 20, {isStatic:true,angle:1.3,render:{fillStyle: "#be57fa"}});
var funnel3 = Bodies.rectangle(1070+15, 840, 80, 20, {isStatic:true, angle:-1.2,render:{fillStyle: "#be57fa"}});
var funnel4 = Bodies.rectangle(930, 840, 80, 20, {isStatic:true, angle:1.2,render:{fillStyle: "#be57fa"}});
var funnel5 = Bodies.rectangle(1065+10, 890, 80, 20, {isStatic:true, angle:-1.1,render:{fillStyle: "#be57fa"}});
var funnel6 = Bodies.rectangle(935, 890, 80, 20, {isStatic:true, angle:1.1,render:{fillStyle: "#be57fa"}});
var funnel7 = Bodies.rectangle(1060+5, 940, 80, 20, {isStatic:true, angle:-1.0,render:{fillStyle: "#be57fa"}});
var funnel8 = Bodies.rectangle(940, 940, 80, 20, {isStatic:true, angle:1.0,render:{fillStyle: "#be57fa"}});
var funnels = []

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
            var peg =  new Bodies.polygon(x,y,500,15, {isStatic:true,render:{fillStyle: "#57fa96"}})
            // var peg = new Peg(x, y, 5)
            pegs.push(peg);
            
        }
        else {
            if(j != 0){
                var y = spacing + i * spacing + 1200
                var peg =  new Bodies.polygon(x,y,500,15, {isStatic:true,render:{fillStyle: "#57fa96"}})
                pegs.push(peg);

            }
        }

    }
}
//creates the boundaries for plinkos
var boundary1 = Bodies.rectangle(175, 2050, 1450, 20, {isStatic:true, angle: Math.PI/2,render:{fillStyle: "#57fa96"}});
var boundary2 = Bodies.rectangle(1700, 2050, 1450, 20, {isStatic:true, angle: Math.PI/2,render:{fillStyle: "#57fa96"}});

//bouncy walls
var wall1 = Bodies.rectangle(1050, 130, 50, 150, {isStatic:true, angle:-2.5, restitution:1.3,render:{fillStyle: "#57f4fa"}})
var wall2 = Bodies.rectangle(780, 250, 50, 150, {isStatic:true, angle:2.5, restitution:1.3,render:{fillStyle: "#57f4fa"}})
var wall3 = Bodies.rectangle(1080, 350, 50, 150, {isStatic:true, angle:-2.5, restitution:1.3,render:{fillStyle: "#57f4fa"}})
var wall4 = Bodies.rectangle(780, 430, 50, 150, {isStatic:true, angle:2.4, restitution:1.3,render:{fillStyle: "#57f4fa"}})

//create the ramps
var platform = Bodies.rectangle(1420, 2880, 580, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -.45, render:{fillStyle: "#f589c1"}})
var platform2 = Bodies.rectangle(1000, 3050, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -.3, render:{fillStyle: "#f589c1"}})
var platform3 = Bodies.rectangle(700, 3140, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -.3, render:{fillStyle: "#f589c1"}})
var platform4 = Bodies.rectangle(120, 3070, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -2.2, render:{fillStyle: "#f589c1"}})
var platform5 = Bodies.rectangle(320, 3300, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: .7, render:{fillStyle: "#f589c1"}})
var platform6 = Bodies.rectangle(580, 3435, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: .2, render:{fillStyle: "#f589c1"}})
var platform7 = Bodies.rectangle(1070, 3500, 700, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: .1, render:{fillStyle: "#f589c1"}})


//add reverse gravity tunnel;
var base = Bodies.rectangle(2000, 3950, 900, 20, {isStatic:true, friction: 0, angle: .2, render:{fillStyle: "#6557fa"}})
var tunnelLeft = Bodies.rectangle(2300, 2410, 15, 3070, {isStatic:true, render:{fillStyle: "#6557fa"}})
var tunnelRight = Bodies.rectangle(2400, 2420, 15, 3200, {isStatic:true, render:{fillStyle: "#6557fa"}})
// seasaw
var baseOfSeasaw = Bodies.rectangle(2450, 450, 500, 15, {isStatic:true, friction: 0,render:{fillStyle: "#f5eb67"}})
var seaSaw = Bodies.rectangle(2450, 550, 400, 15, {isStatic:false, friction: 0,render:{fillStyle: "#f5eb67"}})
var block = Bodies.polygon(2665, 590, 25, 25, {isStatic:true, mass:.5, friction: 0, restitution: 0.8,render:{fillStyle: "#fa5757"}})
//after seasaw
var revRamp = Bodies.rectangle(3150, 250, 1150, 20, {isStatic:true, friction: 0, angle: -.4,render:{fillStyle: "#f5eb67"}})

//create pendulum
var pendulum = Bodies.polygon(3750, 0, 45, 45,{frictionAir: 0.001, restitution: 0.8, mass:1,render:{fillStyle: "#8af567"}})
var pendulum2 = Bodies.polygon(3840, 0, 45, 45,{frictionAir: 0.001, restitution: 0.8, mass:1,render:{fillStyle: "#8af567"}})
var pendulum3 = Bodies.polygon(3930, 0, 45, 45,{frictionAir: 0.001, restitution: 0.8, mass:1,render:{fillStyle: "#8af567"}})


var btnOptions = {
    render: {
        sprite:{
            texture: "images/button.png",
            xScale : 0.042,
            yScale: 0.042
        }
    },
    isStatic: true
}


var rectBtnBase = Bodies.rectangle(4040, 10, 10, 70, {isStatic:true})

var btn = Bodies.rectangle(4010, 0, 30, 30, btnOptions)

//////////////////////////////////////////
var rectPara = Bodies.rectangle(4300, -200, 250, 30)
var rectSide1 = Bodies.rectangle(4215, -150, 45, 65, {isStatic:true})
var rectSide2 = Bodies.rectangle(4385, -150, 45, 65, {isStatic:true})

var parachute = Body.create({
    parts:[rectPara, rectSide1, rectSide2],
})
Body.setMass(parachute, 10);

var circle1 = Bodies.circle(4300, 100, 30);
Body.setMass(circle1,10)

var const1 = Constraint.create({
    bodyA: rectSide1,
    bodyB: circle1,
    length: 300,
    stiffness: 0.5
});
var const2 = Constraint.create({
    bodyA: rectSide2,
    bodyB: circle1,
    length: 300,
    stiffness: 0.5
})

var btnOptionsNumeroDos = {
    render: {
        sprite:{
            texture: "images/button.png",
            xScale : 0.126, 
            yScale: 0.126
        }
    },
    isStatic: true
}
var floor = Bodies.rectangle(54100, 7000, 100000, 60, {isStatic:true,render:{fillStyle: "#f5b767"}})
var upperside = Bodies.rectangle(50600, 5700, 90000, 60, {isStatic:true,render:{fillStyle: "#f5b767"}})
var endTotal = Bodies.rectangle(95600, 6400, 60, 1300, {isStatic:true,render:{fillStyle: "#f5b767"}})
var endBtn = Bodies.rectangle(95540, 6700, 90, 90, btnOptionsNumeroDos)
//////////////////////////////////

Composite.add(engine.world, [cannonside1, cannonside2, end, ball, wall1, wall2, wall3, wall4,
    funnel1, funnel2,funnel3,funnel4,funnel5,funnel6,funnel7,funnel8,boundary1,boundary2,
    platform, platform2, platform3,platform4, platform5, platform6, platform7, base, tunnelLeft, tunnelRight, baseOfSeasaw, seaSaw, block,
    revRamp, pendulum, pendulum2, pendulum3, rectBtnBase,btn,floor, upperside,endTotal,endBtn,
    Constraint.create({ bodyA: seaSaw, pointB: { x: 2450, y: 550}}),
    Constraint.create({
        pointA: { x: 3750, y: 200},
        bodyB: pendulum,
        stiffness: 0.9,
        render: {
            strokeStyle: "#4a485b"
        }
    }),
    Constraint.create({
        pointA: { x: 3840, y: 200},
        bodyB: pendulum2,
        stiffness: 0.9,
        render: {
            strokeStyle: "#4a485b"
        }
    }),
    Constraint.create({
        pointA: { x: 3930, y: 200},
        bodyB: pendulum3,
        stiffness: 0.9,
        render: {
            strokeStyle: "#4a485b"
        }
    })

])
    for(var i =0;i<pegs.length;i++){
        Composite.add(engine.world,[pegs[i]])
    }

//create reverse gravity tunnel
setTimeout(() => {
    fireCannon();
}, 3600);


var particles = [];
function fireCannon(){
    Body.applyForce(ball, ball.position, {x: 0.75, y:-0.75})
    followCamera(ball)
}
//add a way to zoom in and out with scrolll wheeeeell


function followCamera(b){
    var start = new Date();
    var interval = setInterval(() => {
        render.bounds.max.x = b.position.x + ((render.options.width/2) * boundsScale.x);
        render.bounds.max.y = b.position.y + ((render.options.height/2) * boundsScale.x);

        render.bounds.min.x = b.position.x - (render.options.width/2) * boundsScale.x;
        render.bounds.min.y = b.position.y - (render.options.height/2) * boundsScale.x;
        if(Collision.collides(b, tunnelRight)){
            engine.gravity.y = -1;
            engine.gravity.x = 0;
            Body.setMass(b, 20)
            // block.isStatic = false;
        }
        if(Collision.collides(b,platform7)){
            // engine.gravity.x = 0.65;
            Body.applyForce(ball, ball.position, {x: 0.005, y:0})
            
        }

        if(Collision.collides(b,seaSaw)){
            block.isStatic = false;
            Composite.remove(engine.world,[ball])
            // Body.applyForce(block, block.position, {x: 0.01, y:0})
            clearInterval(interval)
            followCamera(block)
        }
        if(Collision.collides(b, revRamp)){
            b.friction = 0;
            b.mass = 10
        }
        if(Collision.collides(pendulum3, btn)){
            engine.gravity.y = 1;
            Composite.add(engine.world, [parachute, const1, const2, circle1])
            clearInterval(interval)
            runParachute(circle1);
        }
        //clear interval and re-call function whenever you want to follow a different object.

    }, 1)  
}




var sOptions = {
    render: {
        sprite:{
            texture: "images/bird.png",
            xScale: 0.1,
            yScale: 0.1
        }
    }
}


function runParachute(b){
    var interval = setInterval(() => {
        Render.lookAt(render, {
            min: { x: b.position.x-1000 , y: b.position.y-1000},
            max: { x: b.position.x + 1000, y: b.position.y+1000}
        });

        if(parachute.velocity.y>0){
            var r2 = parachute.velocity.y * parachute.velocity.y;
            var k = 0.5* (engine.world.density * (250/95) * 0.82)
            // Fdrag = -kv^2
            // plug in k value, and velocity of object squared, as air resistance depends greatly on object velocity
            Body.applyForce(parachute, parachute.position, {x: 0, y: -(k * r2*0.000001)})
        }

        if(block.velocity.y>0){
            var r2 = block.velocity.y * block.velocity.y;
            var k = 0.5* (engine.world.density * (1) * 0.82)
            // Fdrag = -kv^2
            // plug in k value, and velocity of object squared, as air resistance depends greatly on object velocity
            Body.applyForce(block, block.position, {x: 0, y: -(k * r2*0.000001)})
        }
        
        if(Collision.collides(b, floor)){
            var obProps = {
                isStatic:true,
                render: {
                    sprite:{
                        texture: "images/grenade.png",
                        xScale: 0.2,
                        yScale: 0.2
                    }
                }
            }
            theBird = Bodies.rectangle(4300, 6900, 100, 125, sOptions)
            var start = 8000
            for(var i = 0; i < 39; i++){
                var max = 6950
                var min = 5750 //5550 in real
                var x = ((Math.random() * (max - min + 1)) + min);
                obstacles.push(Bodies.rectangle(start, x, 140, 140, obProps))
                start+=2000
            }
            Composite.add(engine.world, theBird)
            Composite.add(engine.world, obstacles)
            Composite.remove(engine.world, [parachute, const1, const2,circle1])
            clearInterval(interval)
            startGame(theBird);
        }
        //clear interval and re-call function whenever you want to follow a different object.
    }, 1)  
}

function startGame(theBir){
    engine.gravity.x = 1;
    engine.gravity.y = 0;

    var interval = setInterval(() => {
        Render.lookAt(render, {
            min: { x: theBir.position.x - 1200, y: theBir.position.y - 1200},
            max: { x: theBir.position.x + 1200, y: theBir.position.y + 1200}
        });
        
        for(var i = 0; i < 39; i++){
            if(Collision.collides(theBir, obstacles[i])){
                Composite.remove(engine.world, theBir)
                //add explosion
                engine.gravity.y = 1;
                engine.gravity.x = 0;
                explode(theBir);
                theBir = null;
                setTimeout(() => {
                    clearInterval(interval)
                    restartSim()
                }, 2000);
                
            }
        }
        // || Collision.collides(theBir, side1) || Collision.collides(theBir, side2) tp if statement condition
        if(Collision.collides(theBir, floor) || Collision.collides(theBir, upperside) || Collision.collides(endTotal, theBir)){
            Composite.remove(engine.world, theBir)
            engine.gravity.y = 1;
            engine.gravity.x = 0;
            explode(theBir);
            theBir = null;
            //add explosion
            setTimeout(() => {
                clearInterval(interval)
                restartSim()
            }, 2000);
        }
        if(Collision.collides(theBir, endBtn)){
            console.log("HEEEEEEEEEEEE")
            clearInterval(interval)
            engine.gravity.x = 0;
            engine.gravity.y = 1;
            Composite.remove(engine.world, theBir)
            // MAKE EGG WHITE.
            var newEgggg = Bodies.circle(95500, 6700, 40, {render:{fillStyle:"#f7f7e9"}})
            Composite.add(engine.world, newEgggg);
        }



        
        if(Collision.collides(theBir, endBtn)){
            Composite.remove(engine.world, theBir)
            clearInterval(interval)
        }
    }, 1)
}
//explosion
var particles = [];
var exOptions = {
    render: {
        sprite:{
            texture: "images/BaldEagleFeathers.png",
            xScale: .045,
            yScale: .045,
        }
    }
}

function explode(b){
    particles.splice(0, particles.length-1);
    for ( var i = 0; i< 50; i++){
        particles.push(Bodies.rectangle(b.position.x, b.position.y, 20, 20, {mass:10}))
    }
    particles.forEach(element => {
        Composite.add(engine.world,[element])
        Body.applyForce(element, element.position, {x: randomIntFromInterval(-1, 1), y: randomIntFromInterval(-1, 1)})
    });
    
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.random() * (max - min + 1) + min
}
// Sammy 
document.onkeydown = checkKey;
function checkKey(e, temp){
    if(e.keyCode == '87'){
        Body.applyForce(theBird, theBird.position, {x: 0, y: -0.4});
    }
    if(e.keyCode == '83'){
        Body.applyForce(theBird, theBird.position, {x: 0, y: 0.4});
    }
}

function restartSim(){
    obstacles.length = 0;
    Composite.clear(engine.world)
    alert("You Have Died Click Ok To Restart");
    engine.gravity.x = 0;
    engine.gravity.y = 1;

    rectPara = Bodies.rectangle(200, -2000, 250, 30)
rectSide1 = Bodies.rectangle(115, -1950, 45, 65, {isStatic:true})
rectSide2 = Bodies.rectangle(285, -1950, 45, 65, {isStatic:true})

parachute = Body.create({
    parts:[rectPara, rectSide1, rectSide2]
})

Body.setMass(parachute, 10);
egg = Bodies.circle(200, -1700, 30);
Body.setMass(egg,10)

//create cannon
cannonside1 = Bodies.rectangle(90, 410, 300, 20, {isStatic:true,render:{fillStyle: "#679bf5"}})
cannonside2 = Bodies.rectangle(120, 480, 300, 20, {isStatic:true,render:{fillStyle: "#679bf5"}})
end = Bodies.rectangle(10, 520, 45, 45, {isStatic:true,render:{fillStyle: "#679bf5"}})
ball = Bodies.polygon(170, 390, 25, 25, {restitution: 0.9, friction: 0, mass: 10,render:{fillStyle: "#fa5757"}})
Body.rotate(cannonside1, 2.5);
Body.rotate(cannonside2, 2.5)
Body.rotate(end, 2.5)
Render.lookAt(render, {
    min: { x: ball.position.x - 750 , y: ball.position.y-300},
    max: { x: ball.position.x + 750, y: ball.position.y+300}
});  

// create funnel
funnel1 = Bodies.rectangle(1075+20, 780, 80, 20, {isStatic:true, angle: -1.3,render:{fillStyle: "#be57fa"}});
funnel2 = Bodies.rectangle(925, 780, 80, 20, {isStatic:true,angle:1.3,render:{fillStyle: "#be57fa"}});
funnel3 = Bodies.rectangle(1070+15, 840, 80, 20, {isStatic:true, angle:-1.2,render:{fillStyle: "#be57fa"}});
funnel4 = Bodies.rectangle(930, 840, 80, 20, {isStatic:true, angle:1.2,render:{fillStyle: "#be57fa"}});
funnel5 = Bodies.rectangle(1065+10, 890, 80, 20, {isStatic:true, angle:-1.1,render:{fillStyle: "#be57fa"}});
funnel6 = Bodies.rectangle(935, 890, 80, 20, {isStatic:true, angle:1.1,render:{fillStyle: "#be57fa"}});
funnel7 = Bodies.rectangle(1060+5, 940, 80, 20, {isStatic:true, angle:-1.0,render:{fillStyle: "#be57fa"}});
funnel8 = Bodies.rectangle(940, 940, 80, 20, {isStatic:true, angle:1.0,render:{fillStyle: "#be57fa"}});
funnels = []

//create pegs for plinkos
cols = 10;
rows = 10;
spacing = 150;
pegs = []
for(var i = 0; i < rows; i++){
    for(var j = 0; j < cols; j++){
        var x =   j * spacing + 175;
        if(i % 2 == 1){
            x += spacing/2 
            var y = spacing + i * spacing + 1200
            var peg =  new Bodies.polygon(x,y,500,15, {isStatic:true,render:{fillStyle: "#57fa96"}})
            // var peg = new Peg(x, y, 5)
            pegs.push(peg);
            
        }
        else {
            if(j != 0){
                var y = spacing + i * spacing + 1200
                var peg =  new Bodies.polygon(x,y,500,15, {isStatic:true,render:{fillStyle: "#57fa96"}})
                pegs.push(peg);

            }
        }

    }
}
//creates the boundaries for plinkos
boundary1 = Bodies.rectangle(175, 2050, 1450, 20, {isStatic:true, angle: Math.PI/2,render:{fillStyle: "#57fa96"}});
boundary2 = Bodies.rectangle(1700, 2050, 1450, 20, {isStatic:true, angle: Math.PI/2,render:{fillStyle: "#57fa96"}});




//bouncy walls
wall1 = Bodies.rectangle(1050, 130, 50, 150, {isStatic:true, angle:-2.5, restitution:1.3,render:{fillStyle: "#57f4fa"}})
wall2 = Bodies.rectangle(780, 250, 50, 150, {isStatic:true, angle:2.5, restitution:1.3,render:{fillStyle: "#57f4fa"}})
wall3 = Bodies.rectangle(1080, 350, 50, 150, {isStatic:true, angle:-2.5, restitution:1.3,render:{fillStyle: "#57f4fa"}})
wall4 = Bodies.rectangle(780, 430, 50, 150, {isStatic:true, angle:2.4, restitution:1.3,render:{fillStyle: "#57f4fa"}})

//create the ramps
platform = Bodies.rectangle(1420, 2880, 580, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -.45, render:{fillStyle: "#f589c1"}})
platform2 = Bodies.rectangle(1000, 3050, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -.3, render:{fillStyle: "#f589c1"}})
platform3 = Bodies.rectangle(700, 3140, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -.3, render:{fillStyle: "#f589c1"}})
platform4 = Bodies.rectangle(120, 3070, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: -2.2, render:{fillStyle: "#f589c1"}})
platform5 = Bodies.rectangle(320, 3300, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: .7, render:{fillStyle: "#f589c1"}})
platform6 = Bodies.rectangle(580, 3435, 300, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: .2, render:{fillStyle: "#f589c1"}})
platform7 = Bodies.rectangle(1070, 3500, 700, 20, {isStatic:true, friction: 0, restitution: 0.8, angle: .1, render:{fillStyle: "#f589c1"}})

//add reverse gravity tunnel;
base = Bodies.rectangle(2000, 3950, 900, 20, {isStatic:true, friction: 0, angle: .2, render:{fillStyle: "#6557fa"}})
tunnelLeft = Bodies.rectangle(2300, 2410, 15, 3070, {isStatic:true, render:{fillStyle: "#6557fa"}})
tunnelRight = Bodies.rectangle(2400, 2420, 15, 3200, {isStatic:true, render:{fillStyle: "#6557fa"}})
// seasaw
baseOfSeasaw = Bodies.rectangle(2450, 450, 500, 15, {isStatic:true, friction: 0,render:{fillStyle: "#f5eb67"}})
seaSaw = Bodies.rectangle(2450, 550, 400, 15, {isStatic:false, friction: 0,render:{fillStyle: "#f5eb67"}})
block = Bodies.polygon(2665, 590, 25, 25, {isStatic:true, mass:.5, friction: 0, restitution: 0.8,render:{fillStyle: "#fa5757"}})
//after seasaw
revRamp = Bodies.rectangle(3150, 250, 1150, 20, {isStatic:true, friction: 0, angle: -.4,render:{fillStyle: "#f5eb67"}})

//create pendulum
pendulum = Bodies.polygon(3750, 0, 45, 45,{frictionAir: 0.001, restitution: 0.8, mass:1,render:{fillStyle: "#8af567"}})
pendulum2 = Bodies.polygon(3840, 0, 45, 45,{frictionAir: 0.001, restitution: 0.8, mass:1,render:{fillStyle: "#8af567"}})
pendulum3 = Bodies.polygon(3930, 0, 45, 45,{frictionAir: 0.001, restitution: 0.8, mass:1,render:{fillStyle: "#8af567"}})


rectBtnBase = Bodies.rectangle(4040, 10, 10, 70, {isStatic:true})

btn = Bodies.rectangle(4010, 0, 30, 30, btnOptions)

//////////////////////////////////////////
rectPara = Bodies.rectangle(4300, -200, 250, 30)
rectSide1 = Bodies.rectangle(4215, -150, 45, 65, {isStatic:true})
rectSide2 = Bodies.rectangle(4385, -150, 45, 65, {isStatic:true})

parachute = Body.create({
    parts:[rectPara, rectSide1, rectSide2],
})
Body.setMass(parachute, 10);

circle1 = Bodies.circle(4300, 100, 30);
Body.setMass(circle1,10)

const1 = Constraint.create({
    bodyA: rectSide1,
    bodyB: circle1,
    length: 300,
    stiffness: 0.5
});
const2 = Constraint.create({
    bodyA: rectSide2,
    bodyB: circle1,
    length: 300,
    stiffness: 0.5
})

floor = Bodies.rectangle(54100, 7000, 100000, 60, {isStatic:true,render:{fillStyle: "#f5b767"}})
upperside = Bodies.rectangle(50600, 5700, 90000, 60, {isStatic:true,render:{fillStyle: "#f5b767"}})
endTotal = Bodies.rectangle(95600, 6400, 60, 1300, {isStatic:true,render:{fillStyle: "#f5b767"}})
endBtn = Bodies.rectangle(95540, 6700, 90, 90, btnOptionsNumeroDos)
//////////////////////////////////

Composite.add(engine.world, [cannonside1, cannonside2, end, ball, wall1, wall2, wall3, wall4,
    funnel1, funnel2,funnel3,funnel4,funnel5,funnel6,funnel7,funnel8,boundary1,boundary2,
    platform, platform2, platform3,platform4, platform5, platform6, platform7, base, tunnelLeft, tunnelRight, baseOfSeasaw, seaSaw, block,
    revRamp, pendulum, pendulum2, pendulum3, rectBtnBase,btn,floor, upperside,endTotal,endBtn,
    Constraint.create({ bodyA: seaSaw, pointB: { x: 2450, y: 550}}),
    Constraint.create({
        pointA: { x: 3750, y: 200},
        bodyB: pendulum,
        stiffness: 0.9,
        render: {
            strokeStyle: "#4a485b"
        }
    }),
    Constraint.create({
        pointA: { x: 3840, y: 200},
        bodyB: pendulum2,
        stiffness: 0.9,
        render: {
            strokeStyle: "#4a485b"
        }
    }),
    Constraint.create({
        pointA: { x: 3930, y: 200},
        bodyB: pendulum3,
        stiffness: 0.9,
        render: {
            strokeStyle: "#4a485b"
        }
    })

])
    for(var i =0;i<pegs.length;i++){
        Composite.add(engine.world,[pegs[i]])
    }

//create reverse gravity tunnel
setTimeout(() => {
    fireCannon();
}, 3600);

    
}


//hnel.l.o

