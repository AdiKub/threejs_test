

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
var backColor = new THREE.Color('#c5dff4')

// CAMERA
camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
var cameraTarget = new THREE.Vector3( 0, 1, 0 );
camera.position.set( 0, 2, -10 );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

// SCENE
scene = new THREE.Scene();
scene.background = backColor;
scene.fog = new THREE.Fog( backColor, -10, 70);

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


var spherGeometry = new THREE.SphereGeometry( 0.2, 20, 30 );
var boxMaterial = new THREE.MeshStandardMaterial({
  color: 'red',
  metalness: 0,
});

var sphere = new THREE.Mesh( spherGeometry, boxMaterial );
sphere.castShadow = true;
sphere.receiveShadow = true;

scene.add( sphere );

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

let pos = 2;
let switcher = true;

const bound = () => {
  if (switcher) {
    if (pos < 2){switcher = false}
    return pos /= 2
  } else {
    if (pos > 400){switcher = true}
    return pos *= 2
  };
}

var animate = function () {

  controls.update();
  requestAnimationFrame( animate );
  
  
  sphere.position.y = bound()/100;

  renderer.render(
    scene,
    camera,
    camera.lookAt( cameraTarget )
    );
  };

animate();