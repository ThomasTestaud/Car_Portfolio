//import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { OutlineEffect } from '../../utils/shaders/OutlineEffect.js';
import Car from './Car.js'
import RC from './RC.js'
import DrawKit from './DrawKit.js'


let div = document.getElementById('ThreeJS');
let WIDTH = div.offsetWidth;
let HEIGHT = div.offsetHeight;

var renderer, effect, scene, camera;

camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 1550);

camera.position.z = 50;
camera.position.y = 40;
camera.position.x = 4;
//camera.rotation.x = -0.7;

scene = new THREE.Scene();
//scene.background = new THREE.Color(0xffffff);

///////////Light/////////////
const pointLight = new THREE.PointLight(0xffffff, 0.9);
pointLight.position.set(0, 60, -10);
pointLight.shadow.mapSize.width = 500;
pointLight.shadow.mapSize.height = 500;
scene.add(pointLight);
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper);

// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x000000, 0);
effect = new OutlineEffect(renderer);

renderer.shadowMap.enabled = true; // Enable shadow mapping
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // S

// Orbit Controls
var container = document.getElementById('ThreeJS');
container.appendChild(renderer.domElement);




/////// CAR JS IMPORT AND INITIALIZATION ///////
//Creation of the objects of the game
let rc = new RC();
let pandaCar = new Car(10, 0, 90, "panda", "red");
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
    for (let i = 0; i < 450; i++) {
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
        pandaCar.positionX = section.dataset.x * 10 + 10;
        //pandaCar.speed = 0.5;

    })
    drawKit.writeIn(section.dataset.name, section.dataset.x / 1 + 1, 0.5, 22);
    // LINE
    let geometry = new THREE.BoxGeometry(0.3, 0.03, 50);
    let material = new THREE.MeshToonMaterial({ color: 0xffffff, });
    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(section.dataset.x, 0, 0);
    scene.add(mesh);
});


let classes = ["small-center", "top-right", "focus-center", "center", "right", "medium-bottom"];

function removeAllClasses() {
    classes.forEach((classe) => {
        container.classList.remove(classe);
        //console.log(classe);
    });
}






// Changes of camera on mousemove
let rotationOffset = 0;
let rotationOffsetZ = 0;
document.addEventListener("mousemove", function(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    
    rotationOffset = (mouseX - (windowWidth/2)) /windowWidth;
    rotationOffsetZ = (mouseY - (windowHeight/2)) /windowHeight;

});









function animate() {
    /*
        WIDTH = container.innerWidth;
        HEIGHT = container.innerHeight;
    */

    pandaCar.refresh();

    hideAll();
    for (let i = 0; i < sections.length - 1; i++) {
        const section = sections[i];
        if (car.position.x > section.dataset.x && car.position.x < sections[i + 1].dataset.x) {
            removeAllClasses();
            section.classList.remove('none');
            //container.classList.remove('top-right');
            container.classList.add(section.dataset.class);
        } else if (car.position.x > sections[sections.length - 1].dataset.x) {
            removeAllClasses();
            sections[sections.length - 1].classList.remove('none');
        }
    }



    car.position.x = pandaCar.positionX / 10;
    car.position.z = pandaCar.positionY / 10;
    car.rotation.y = THREE.MathUtils.degToRad(pandaCar.direction) * -1;



    camera.position.y = 50 + rotationOffsetZ*10;
    camera.position.x = pandaCar.positionX / 10 + 30 + rotationOffset*10;
    camera.position.z = 0 / 10 + 70 ;

    camera.rotation.y = rotationOffset/10;
    camera.rotation.x = -0.7 - rotationOffsetZ/10;



    pointLight.position.x = pandaCar.positionX / 10 + 8;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);


}

animate();

