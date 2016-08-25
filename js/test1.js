'use strict';

var width, height, clock, scene, camera, renderer;
var controls;
var loader = new THREE.JSONLoader();
var ambientLight, mesh, action = {}, mixer, fadeAction;



width  = window.innerWidth;
height = window.innerHeight;
clock  = new THREE.Clock();
scene  = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 40, width / height, 1, 100 );
camera.position.set( 0, 1, 20 );
renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0;
document.body.appendChild( renderer.domElement );

ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );


loader.load( 'model/lesson3.json', function( geometry, materials ) {

  materials.forEach( function ( material ) {

    material.skinning = true;

  } );

  mesh = new THREE.SkinnedMesh(
    geometry,
    new THREE.MeshFaceMaterial( materials )
  );

  mixer  = new THREE.AnimationMixer( mesh );
  // action.default  = mixer.clipAction( geometry.animations[ 0 ] );
  // action.jump   = mixer.clipAction( geometry.animations[ 1 ] );
  // action.putLeftHand  = mixer.clipAction( geometry.animations[ 2 ] );
  // action.walk = mixer.clipAction( geometry.animations[ 3 ] );

  action.Default = mixer.clipAction(geometry.animations[0]);
  action.Shake = mixer.clipAction(geometry.animations[1]);

  // action.default.setEffectiveWeight( 1 );
  // action.jump.setEffectiveWeight( 1 );
  // action.putLeftHand.setEffectiveWeight( 1 );
  // action.walk.setEffectiveWeight( 1 );

  action.Default.setEffectiveWeight(1);
  action.Shake.setEffectiveWeight(1);

  // action.jump.setLoop( THREE.LoopOnce, 0 );
  // action.slide.setLoop( THREE.LoopOnce, 0 );
  // action.jump.clampWhenFinished = true;
  // action.slide.clampWhenFinished = true;

  action.Default.play();

  scene.add( mesh );

} );

fadeAction = function() {

  var activeActionName = 'Default';

  return function ( name ) {

    var from = action[ activeActionName ].play();
    var to   = action[ name ].play();

    from.enabled = true;
    to.enabled = true;

    from.crossFadeTo( to, .3 );
    activeActionName = name;

  }

}

;( function update () {

  requestAnimationFrame( update );

  var delta = clock.getDelta();
  var theta = clock.getElapsedTime();

  if ( mixer ) { mixer.update( delta ); }

  renderer.render( scene, camera );
  controls.update();

} )();
