"use strict";

// http://www.knockknock.jp/archives/562

window.addEventListener('DOMContentLoaded', (function(){
  var width, height;
  var scene, camera, renderer;
  var controls;
  var skinnedMesh;
  var action, mixer;
  // var fadeAction;

  init();
  animate();

  function init() {
    // width = 600;
    // height = 400;
    width = window.innerWidth;
    height = window.innerHeight;
    // シーン
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.00035);
    // カメラ
    camera = new THREE.PerspectiveCamera(40, width/height, 1, 10000);
    // camera.position.z = 1000;
    // camera.position.y = 200;
    camera.position.set(0, 1,100);
    // 光源
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(200, 200, 200);
    scene.add(directionalLight);
    // 環境光
    var ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);
    // 地面
    var ground = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000, 1, 1), new THREE.MeshLambertMaterial({color: 0x333333}));
    ground.position.y = -200;
    ground.rotation.x = Math.PI / -2;
    scene.add(ground);
    // レンダラー
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    //  マウスで回転、拡縮
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0;
    // DOM要素追加
    document.body.appendChild(renderer.domElement);
    // モデル (アニメーションなし)
    // var loader = new THREE.JSONLoader();
    // loader.load('model/lesson3.json', function (geometry, materials) {
    //   var material = new THREE.MeshFaceMaterial(materials);
    //   var model = new THREE.Mesh(geometry, material);
    //   model.scale.set(10, 10, 10);
    //   scene.add(model);
    // });

    // モデル (アニメーションあり)
    var loader = new THREE.JSONLoader();
    loader.load('model/lesson3.json', function (geometry, materials) {
      materials.forEach( function( material ) {
        material.skinning = true;
      } );

      skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
      skinnedMesh.scale.set(10, 10, 10);

      action = {};
      mixer = new THREE.AnimationMixer(skinnedMesh);
      action.Default = mixer.clipAction(geometry.animations[0]);
      action.Shake = mixer.clipAction(geometry.animations[1]);

      action.Default.setEffectiveWeight(1);
      action.Shake.setEffectiveWeight(1);

      action.Default.play();
      // action.Shake.play();

      scene.add(skinnedMesh);

    });

    // 立方体
    // var geometry = new THREE.CubeGeometry(30, 30, 30);
    // var material = new THREE.MeshPhongMaterial({color: 0xff0000});
    // // var material = new THREE.MeshLambertMaterial({color: 'rgb(210. 255, 255)'});
    // var mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);
  }

  function animate() {
    requestAnimationFrame( animate );
    var clock = new THREE.Clock();
    var delta = clock.getDelta();
    if ( mixer ) {
      mixer.update(delta);
    }
    renderer.render( scene, camera );
    controls.update();
  }

}), false);