
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();
world = engine.world;
world.gravity.y = 0;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 400,
        pixelRatio: 1,
        background: '#88c241',
        wireframeBackground: '#222',
        hasBounds: false,
        enabled: true,
        wireframes: false,
        showSleeping: true,
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showVelocity: false,
        showCollisions: false,
        showSeparations: false,
        showAxes: false,
        showPositions: false,
        showAngleIndicator: false,
        showIds: false,
        showShadows: false,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false,
        showMousePosition: false
    }
});

var whiteCat = 0x0001,
    redCat = 0x0002;

// create two boxes and a ground
var whiteBall = Bodies.circle(100, 200, 15, {
    render: {
        fillStyle: 'white'
    },
    collisionFilter: {
        category: whiteCat,
        mask: redCat | whiteCat
    },
    restitution: 0.8
});

for (var i = 0; i < 10; i++){
    
    var additionalX = 0;
    var additionalY = 0;

    if (i > 5){
        additionalX = 90;
    } else if (i > 2){
        additionalX = 60
    } else if (i > 0){
        additionalX = 30;
    }

    if (i == 1){
        additionalY = 20;
    } else if (i == 2){
        additionalY = -20;
    } else if (i == 3){
        additionalY = 40;
    } else if (i == 4){
        additionalY = 0;
    } else if (i == 5){
        additionalY = -40;
    }  else if (i == 6){
        additionalY = 60;
    } else if (i == 7){
        additionalY = 20;
    } else if (i == 8){
        additionalY = -20;
    } else if (i == 9){
        additionalY = -60;
    } 

    var redBall = Bodies.circle(600 + additionalX, 200 + additionalY, 15, {
        collisionFilter: {
            category: redCat,
            mask: redCat | whiteCat
        },
        render: {
            fillStyle: 'red'
        },
        restitution: 0.8
    });

    World.add(world, redBall);
}



var wallTop = Bodies.rectangle(400, -10, 810, 60, { isStatic: true });
var wallBottom = Bodies.rectangle(400, 410, 810, 60, { isStatic: true });
var wallLeft = Bodies.rectangle(-10, -10, 60, 810, { isStatic: true });
var wallRight = Bodies.rectangle(810, -10, 60, 810, { isStatic: true });

// add all of the bodies to the world
Composite.add(world, [whiteBall, wallLeft, wallRight, wallTop, wallBottom]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create({
    delta: 1000 / 60,
    isFixed: false,
    enabled: true
});



// add mouse control and make the mouse revolute
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.6,
        length: 0,
        angularStiffness: 0,
        render: {
            visible: false
        }
    }
});

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

mouseConstraint.collisionFilter.mask = whiteCat;

Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 400 }
});

// run the engine
Runner.run(runner, engine);