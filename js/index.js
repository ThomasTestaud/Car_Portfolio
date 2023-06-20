//import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { OutlineEffect } from '../../utils/shaders/OutlineEffect.js';
import Car from './Car.js'
import RC from './RC.js'
import DrawKit from './DrawKit.js'

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer, effect, scene, camera;

camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1550);
camera.position.z = 50;
camera.position.y = 20;
camera.position.x = 4;

scene = new THREE.Scene();
scene.background = new THREE.Color(0x00a1ff);

///////////Light/////////////
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 30, -30);
pointLight.castShadow = true; // Enable casting shadows
pointLight.shadow.mapSize.width = 500;
pointLight.shadow.mapSize.height = 500;
pointLight.shadow.bias = -0.001;
scene.add(pointLight);
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper);
/////////////////////////

// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);
effect = new OutlineEffect(renderer);

renderer.shadowMap.enabled = true; // Enable shadow mapping
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // S

// Orbit Controls
var controls = new OrbitControls(camera, renderer.domElement);
var container = document.getElementById('ThreeJS');
container.appendChild(renderer.domElement);
function render() {
    effect.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);




/////// CAR JS IMPORT AND INITIALIZATION ///////
//Creation of the objects of the game
let rc = new RC();
let pandaCar = new Car(-100, 0, 90, "panda", "red");
// Start car
pandaCar.engine();
//Mapping of the RadioController object to the other objects
function map(x) {
    rc.mapAccelerate(x, '#rc-up');
    rc.mapDecelerate(x, '#rc-down');
    rc.mapTurnLeft(x, '#rc-left');
    rc.mapTurnRight(x, '#rc-right');
}
map(pandaCar);
///////////////////////////////////////////////





/// DRAW ///

const drawKit = new DrawKit(scene);

// Draw car
const carShape = new THREE.BoxGeometry(2, 2, 3);
const carMaterial = new THREE.MeshToonMaterial({ color: 0xff0000, });
carMaterial.shadowBias = -100;
const car = new THREE.Mesh(carShape, carMaterial);
car.position.set(0, 1, 0);
car.castShadow = true; // Enable casting shadows
car.receiveShadow = true; // Enable receiving shadows
scene.add(car);



// Grass
drawKit.drawGrass()

// Road
function generateRandomPath() {
    let x = 0;
    for (let i = 0; i < 350; i++) {
        x += Math.random() - 0.5;
        drawKit.drawRoad(1, x);
    }
}
generateRandomPath();










/// Queries
let pres1 = document.querySelector('#présentation-1');
let pres2 = document.querySelector('#présentation-2');
let pres3 = document.querySelector('#présentation-3');

let stackTech = document.querySelector('#stack-technique');

let projet1 = document.querySelector('#projet-1');
let projet2 = document.querySelector('#projet-2');
let projet3 = document.querySelector('#projet-3');

let expPro1 = document.querySelector('#experience-pro-1');
let expPro2 = document.querySelector('#experience-pro-2');
let expPro3 = document.querySelector('#experience-pro-3');

let contact = document.querySelector('#contact');

function hideAll() {
    pres1.classList.add('none');
    pres2.classList.add('none');
    pres3.classList.add('none');
    stackTech.classList.add('none');
    projet1.classList.add('none');
    projet2.classList.add('none');
    projet3.classList.add('none');
    expPro1.classList.add('none');
    expPro2.classList.add('none');
    expPro3.classList.add('none');
    contact.classList.add('none');
}

const elementsSpread = {
    'pres1': 0,
    'pres2': 20,
    'pres3': 40,
    'stackTech': 60,
    'projet1': 100,
    'projet2': 140,
    'projet3': 180,
    'expPro1': 220,
    'expPro2': 260,
    'expPro3': 280,
    'contact': 300,
};

/* LINE
let geometry = new THREE.BoxGeometry(0.2, 0.01, 55);
let material = new THREE.MeshToonMaterial({ color: 0xffffff, });
let mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['pres1'], 0, 0);
scene.add(mesh);
*/

drawKit.writeIn('Bienvenue', elementsSpread['pres1'], 0.5, -4);



drawKit.writeIn('A propos de moi', elementsSpread['pres2'], 0.5, -7);

drawKit.writeIn('Stack technique', elementsSpread['stackTech'], 0.5, -3);

drawKit.writeIn('Projet : Events_On_Time', elementsSpread['projet1'], 0.5, 5);


function animate() {
    pandaCar.refresh();

    hideAll();
    if (car.position.x > elementsSpread['pres1'] && car.position.x < elementsSpread['pres2']) {
        pres1.classList.remove('none');

    } else if (car.position.x >= elementsSpread['pres2'] && car.position.x < elementsSpread['pres3']) {
        pres2.classList.remove('none');

    } else if (car.position.x >= elementsSpread['pres3'] && car.position.x < elementsSpread['stackTech']) {
        pres3.classList.remove('none');

    } else if (car.position.x >= elementsSpread['stackTech'] && car.position.x < elementsSpread['projet1']) {
        stackTech.classList.remove('none');

    } else if (car.position.x >= elementsSpread['projet1'] && car.position.x < elementsSpread['projet2']) {
        projet1.classList.remove('none');

    } else if (car.position.x >= elementsSpread['projet2'] && car.position.x < elementsSpread['projet3']) {
        projet2.classList.remove('none');

    } else if (car.position.x >= elementsSpread['projet3'] && car.position.x < elementsSpread['expPro1']) {
        projet3.classList.remove('none');

    } else if (car.position.x >= elementsSpread['expPro1'] && car.position.x < elementsSpread['expPro2']) {
        expPro1.classList.remove('none');

    } else if (car.position.x >= elementsSpread['expPro2'] && car.position.x < elementsSpread['expPro3']) {
        expPro2.classList.remove('none');

    } else if (car.position.x >= elementsSpread['expPro3'] && car.position.x < elementsSpread['contact']) {
        expPro3.classList.remove('none');

    } else if (car.position.x >= elementsSpread['contact']) {
        contact.classList.remove('none');
    }


    car.position.x = pandaCar.positionX / 10;
    car.position.z = pandaCar.positionY / 10;
    car.rotation.y = THREE.MathUtils.degToRad(pandaCar.direction) * -1;

    camera.position.x = pandaCar.positionX / 10 + 5;
    camera.position.z = pandaCar.positionY / 10 + 40;

    pointLight.position.x = pandaCar.positionX / 10 + 8;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();