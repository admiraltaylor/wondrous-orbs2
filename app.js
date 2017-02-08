/**
 * Created by Taylor on 2/8/2017.
 */

//creting renderer
var renderer = new THREE.WebGLRenderer({
    canvas:document.getElementById('myCanvas'),
    antialias:true});
renderer.setClearColor(0xeeeeee);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//creating camera
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1, 1000);
camera.position.set(0, 0, 30);

//create scene
var scene = new THREE.Scene();

//loading the orb's texture
var orbLoader = new THREE.CubeTextureLoader()
    orbLoader.setPath('envMap/');
var textureCube = orbLoader.load([
    'posx.png','negx.png',
    'posy.png','negy.png',
    'posz.png','negz.png',]);

var floorloader = new THREE.TextureLoader();
var floorText = floorloader.load('floor.png');

//creating the orb
var sphereGeometry = new THREE.SphereGeometry(10, 50, 50 );
var sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.geometry.dynamic=true;

//adding a surface below the sphere
var planeGeometry = new THREE.PlaneGeometry(50,50,50);
var planeMaterial = new THREE.MeshBasicMaterial({color:0xffffff, envMap:floorText});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -15;
plane.rotation.x = Math.PI * -0.5;

//lights
var light = new THREE.PointLight(0xffffff,2.0, 90);
scene.add(light);
var light2 = new THREE.HemisphereLight(0xffffff,2.0);
scene.add(light2);
var light3 = new THREE.PointLight(0xffffff,2.0, 90);
scene.add(light3);
var light4 = new THREE.PointLight(0xffffff,2.0, 90);
scene.add(light4);

light.position.y=50;
light3.position.x=-50;
light3.position.y=-30;
light4.position.x = 50;
light4.position.y = -30;

//setting the camera to look at the action no matter what
camera.lookAt(scene.position);
//adding my meshes to the scene
scene.add(sphere);
scene.add(plane);

//render that sheeeeit
renderer.render(scene, camera);

