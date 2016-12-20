(function() {
  // シーン
  var scene = new THREE.Scene();
  // カメラ
  var width = 600;
  var height = 400;
  var fov = 60;
  var aspect = width / height;
  var near = 1;
  var far = 1000;
  var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 50);
  // OrbitControls
  var controls = new THREE.OrbitControls(camera);
  // レンダラー
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(0xefefef);
  document.getElementById('stage').appendChild(renderer.domElement);
  // ライト
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 0.7, 0.7);
  scene.add(directionalLight);
  // 環境光
  var ambient = new THREE.AmbientLight(0x666666);
  scene.add(ambient);
  // テクスチャ
  var loader = new THREE.TextureLoader();
  var texture = loader.load('img/star.png');
  // 立方体
  var geometry = new THREE.CubeGeometry(30, 30, 30);
  var material = new THREE.MeshPhongMaterial({map: texture, transparent: true});
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  material = new THREE.MeshPhongMaterial({color: 0xff0000});
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // ボタン
  var redbutton = document.getElementById('redbutton');
  var bluebutton = document.getElementById('bluebutton');
  bluebutton.addEventListener('click', function() { changeColor('blue'); }, false);
  redbutton.addEventListener('click', function() { changeColor('red'); }, false);
  // 色変更
  function changeColor(color) {
    material = new THREE.MeshPhongMaterial({color: color});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }
  // キーボード
  function keyDown(e) {
    // R
    if ( e.keyCode === 82 ) {
      changeColor('red');
    }
    // B
    if ( e.keyCode === 66 ) {
      changeColor('blue');
    }
  }
  document.onkeydown = keyDown;
  // レンダー
  render();
  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }

})();
