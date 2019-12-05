

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color( 0x000000 );
scene.fog = new THREE.Fog( 0x000000, 250, 1400 );

// CAMERA
camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
var cameraTarget = new THREE.Vector3( 0, 1, 0 );
camera.position.set( 0, 2, 10 );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

// SCENE
scene = new THREE.Scene();
scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
scene.fog = new THREE.Fog( scene.background, 1, 5000 );
scene.fog = new THREE.Fog( 'white', -10, 70);

// Lights
var hemiLight = new THREE.HemisphereLight(  0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 20, 0 );
scene.add( hemiLight );

dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
dirLight.castShadow = true;
scene.add( dirLight );

dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
scene.add( dirLightHeper );


var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var boxMaterial = new THREE.MeshStandardMaterial({
  color: 'red',
  metalness: 0,
});
var cube = new THREE.Mesh( boxGeometry, boxMaterial );
cube.castShadow = true;
cube.receiveShadow = true;
cube.position.y = 1
cube.scale = 2;
scene.add( cube );

var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
var groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
groundMat.color.setHSL( 0.095, 1, 0.75 );
var ground = new THREE.Mesh( groundGeo, groundMat );
ground.position.y = 0;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;
ground.castShadow = true;
scene.add( ground );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;

var animate = function () {
  controls.update();
  
  
  
  requestAnimationFrame( animate );
  cube.rotation.y += 0.01;
  renderer.render(
    scene,
    camera,
    camera.lookAt( cameraTarget )
    );
  };

animate();