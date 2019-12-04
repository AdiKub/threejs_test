var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
scene.background = new THREE.Color( 0x000000 );
scene.fog = new THREE.Fog( 0x000000, 250, 1400 );
window.onresize = () => renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// CAMERA
camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
var controls = new THREE.OrbitControls( camera, renderer.domElement );
var cameraTarget = new THREE.Vector3( 0, 0, 0 );
camera.position.set( 0, 2, 8 );
controls.update();

// SCENE
scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
scene.fog = new THREE.Fog( 'blue', 0, 20);

var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var boxMaterial = new THREE.MeshStandardMaterial({
  color: 'red',
  metalness: 0,
});

var planeGeometry = new THREE.PlaneGeometry(2, 2, 2);
var planeMaterial = new THREE.MeshStandardMaterial({
  color: 'black',
  metalness: 3,
});

var cube = new THREE.Mesh( boxGeometry, boxMaterial );
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = 1;
cube.scale = 2;
scene.add( cube );
scene.add( plane );
scene.add( new THREE.HemisphereLight( 0xaaaaaa, 0x444444 ) );

var animate = function () {
  requestAnimationFrame( animate );
  controls.update();

  cube.rotation.y += 0.01;
  renderer.render(
    scene,
    camera,
    camera.lookAt( cameraTarget )
  );

};


animate();