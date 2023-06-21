//import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { OutlineEffect } from '../../utils/shaders/OutlineEffect.js';
import Car from './Car.js'
import RC from './RC.js'
import DrawKit from './DrawKit.js'
/*
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
*/
var WIDTH = 700;
var HEIGHT = 700;

var renderer, effect, scene, camera;

camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 1550);

camera.position.z = 50;
camera.position.y = 40;
camera.position.x = 4;

scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

///////////Light/////////////
const pointLight = new THREE.PointLight(0xffffff, 0.9);
pointLight.position.set(0, 50, -10);
//pointLight.castShadow = true; // Enable casting shadows
pointLight.shadow.mapSize.width = 500;
pointLight.shadow.mapSize.height = 500;
//pointLight.shadow.bias = -0.001;
scene.add(pointLight);
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper);
/////////////////////////
/*
const pointLight2 = new THREE.PointLight(0xffffff, 2);
pointLight2.position.set(0, 60, 30);*/
//scene.fog = new THREE.FogExp2(0xffffff, 0.01);



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
let xx = 0;
for (let i = 0; i < 3; i++) {
    drawKit.drawPineTree(xx + 0, -5);
    drawKit.drawPineTree(xx + 5, 7);
    drawKit.drawPineTree(xx + 15, 10);
    drawKit.drawPineTree(xx + 20, -6);
    drawKit.drawPineTree(xx + 22, -10);

    drawKit.drawPineTree(xx + 30, -5);
    drawKit.drawPineTree(xx + 35, 7);
    drawKit.drawPineTree(xx + 45, 10);
    drawKit.drawPineTree(xx + 50, -6);
    drawKit.drawPineTree(xx + 62, -10);

    drawKit.drawPineTree(xx + 70, -5);
    drawKit.drawPineTree(xx + 85, 13);
    drawKit.drawPineTree(xx + 85, 19);
    drawKit.drawPineTree(xx + 90, -6);
    drawKit.drawPineTree(xx + 102, -10);
    xx += 100
}







/// Queries
let pres1 = document.querySelector('#présentation-1');
let pres2 = document.querySelector('#présentation-2');

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
    stackTech.classList.add('none');
    projet1.classList.add('none');
    projet2.classList.add('none');
    projet3.classList.add('none');
    expPro1.classList.add('none');
    expPro2.classList.add('none');
    expPro3.classList.add('none');
    contact.classList.add('none');
}








// Draw lines and text on sections
// Add eventListeners on nav
let sections = document.querySelectorAll('section');
sections.forEach((section) => {
    let btn = document.querySelector('#' + section.dataset.btnid);
    btn.addEventListener('click', function () {
        pandaCar.positionX = section.dataset.x * 10;
        pandaCar.speed = 0.5;

    })
    drawKit.writeIn(section.dataset.name, section.dataset.x / 1 + 1, 0.5, 24);
    // LINE
    let geometry = new THREE.BoxGeometry(0.3, 0.03, 50);
    let material = new THREE.MeshToonMaterial({ color: 0xffffff, });
    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(section.dataset.x, 0, 0);
    scene.add(mesh);
});


let classes = ["small-center", "top-right", "focus-center", "center"];





function animate() {
    pandaCar.refresh();

    hideAll();
    for (let i = 0; i < sections.length - 1; i++) {
        const section = sections[i];
        if (car.position.x > section.dataset.x && car.position.x < sections[i + 1].dataset.x) {
            classes.forEach((classe) => {
                container.classList.remove(classe);
                //console.log(classe);
            });
            //container.classList.remove('top-right');
            container.classList.add(section.dataset.class);
        } else if (car.position.x > sections[sections.length - 1].dataset.x) {
            sections[sections.length - 1].classList.remove('none');
        }
    }



    car.position.x = pandaCar.positionX / 10;
    car.position.z = pandaCar.positionY / 10;
    car.rotation.y = THREE.MathUtils.degToRad(pandaCar.direction) * -1;



    camera.position.y = 50;


    camera.position.x = pandaCar.positionX / 10 + 30;
    camera.position.z = pandaCar.positionY / 10 + 70;


    pointLight.position.x = pandaCar.positionX / 10 + 8;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();