import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import "./style.css";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 1, 1, 1 );
scene.add( directionalLight );

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const hemispherelight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
// scene.add(hemispherelight);




camera.position.x = 108;
camera.position.y = 20;
camera.position.z = 90;

const axesHelper = new THREE.AxesHelper(64);
scene.add(axesHelper);

let earth, moon;

function init(){
    // geometry
    const earth_geometry = new THREE.SphereGeometry(16, 64, 32);
    const moon_geometry = new THREE.SphereGeometry(4, 64, 32);

    // textures
    const earthTexture = new THREE.TextureLoader().load('./earth.jpg');
    const earth_material = new THREE.MeshStandardMaterial({ map: earthTexture });

    const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
    const moon_material = new THREE.MeshStandardMaterial({ map: moonTexture });

    // mesh
    earth = new THREE.Mesh(earth_geometry, earth_material);
    moon = new THREE.Mesh(moon_geometry, moon_material);

    // Create Earth label
    const earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv.innerHTML = 'Earth<br>5.97237e24 kg';
    earthDiv.style.color = 'white';
    const earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.set(40, 0, 0); 
    earth.add(earthLabel);

    // Create Moon label
    const moonDiv = document.createElement('div');
    moonDiv.className = 'label';
    moonDiv.innerHTML = 'Moon<br>7.342e22 kg';
    moonDiv.style.color = 'white';
    const moonLabel = new CSS2DObject(moonDiv);
    moonLabel.position.set(15, 0, 0); 
    moon.add(moonLabel);

    
    earth.position.set(0, 0, 0);
    moon.position.set(64, 0, 0);

    scene.add(earth);
    scene.add(moon);
}

const zero = document.timeline.currentTime;

function animate() {
    const time = (document.timeline.currentTime - zero) / 1000;

    const x = Math.sin(time);
    const y = Math.cos(time);

    moon.position.set(64 * x, 0, 64 * y);

    orbit.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera); // Render the 2D labels
}

init();
animate();
