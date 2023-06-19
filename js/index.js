//import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { OutlineEffect } from '../../utils/shaders/OutlineEffect.js';
import Car from './Car.js'
import RC from './RC.js'

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer, effect, scene, camera;

function writeIn(text, x, y, z) {
    // Create a loader for loading the default font
    const fontLoader = new THREE.FontLoader();

    // Load the default font
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        // Create a text geometry using the loaded font
        const textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: 1.5,
            height: 1,
            curveSegments: 12,
            bevelEnabled: false
        });

        // Create a material for the text
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

        // Create a mesh using the text geometry and material
        const textMesh = new THREE.Mesh(textGeometry, material);
        textMesh.position.set(x, y, z);
        // Add the text mesh to the scene
        scene.add(textMesh);
    });
}




//function init() {
camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1550);

camera.position.z = 50;
camera.position.y = 20;
camera.position.x = 4;

scene = new THREE.Scene();
scene.background = new THREE.Color(0x0);

// Geometry
let planeGeometry = new THREE.PlaneGeometry(50, 50);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);



///////////Light/////////////
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 30);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight2.position.set(-10, 30, -20);
scene.add(pointLight2);

const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)
const lightHelper2 = new THREE.PointLightHelper(pointLight2)
scene.add(lightHelper2)

const width = 1000;
const height = 100;
const intensity = 2;
const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
rectLight.position.set(0, 10, 0);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);
/////////////////////////

// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);
effect = new OutlineEffect(renderer);

// Orbit Controls
var controls = new OrbitControls(camera, renderer.domElement);

var container = document.getElementById('ThreeJS');
container.appendChild(renderer.domElement);
requestAnimationFrame(render);


// Materials






// Draw car
const carShape = new THREE.BoxGeometry(2, 2, 3);
const carMaterial = new THREE.MeshStandardMaterial({ transparent: true, opacity: 1, metalness: 0.6, roughness: 0, color: 0xff0000, });;
const car = new THREE.Mesh(carShape, carMaterial);
car.position.set(0, 1, 0);
scene.add(car);


/// CAR STUFF



//Creation of the objects of the game
let rc = new RC();
let pandaCar = new Car(-100, 0, 90, "panda", "red");

pandaCar.engine();




//Mapping of the RadioController object to the other objects
function map(x) {
    rc.mapAccelerate(x, '#rc-up');
    rc.mapDecelerate(x, '#rc-down');
    rc.mapTurnLeft(x, '#rc-left');
    rc.mapTurnRight(x, '#rc-right');
}
map(pandaCar);



function render() {
    effect.render(scene, camera);
    requestAnimationFrame(render);
}



let main = document.querySelector('main');


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

let geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
let material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
let mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['pres1'], 0, 0);
scene.add(mesh);

writeIn('Bienvenue', elementsSpread['pres1'], 0, -4);



geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['pres2'], 0, 0);
scene.add(mesh);

writeIn('A propos de moi', elementsSpread['pres2'], 0, -7);

geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['pres3'], 0, 0);
scene.add(mesh);


geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['stackTech'], 0, 0);
scene.add(mesh);

writeIn('Stack technique', elementsSpread['stackTech'], 0, -3);

geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['projet1'], 0, 0);
scene.add(mesh);

writeIn('Projet : Events_On_Time', elementsSpread['projet1'], 0, -5);

geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['projet2'], 0, 0);
scene.add(mesh);

geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['projet3'], 0, 0);
scene.add(mesh);

geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['expPro1'], 0, 0);
scene.add(mesh);

geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['expPro2'], 0, 0);
scene.add(mesh);

geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['expPro3'], 0, 0);
scene.add(mesh);

geometry = new THREE.BoxGeometry(0.2, 0.01, 100);
material = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0, color: 0xffffff, });;
mesh = new THREE.Mesh(geometry, material);
mesh.position.set(elementsSpread['contact'], 0, 0);
scene.add(mesh);

function animate() {
    pandaCar.refresh();
    camera.position.x = pandaCar.positionX / 10 + 5;
    let section = 'none';

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

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();