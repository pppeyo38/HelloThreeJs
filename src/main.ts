import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  clock: THREE.Clock,
  controls: OrbitControls,
  renderer: THREE.WebGLRenderer;

window.addEventListener("load", init);

function init() {
  // シーンの追加
  scene = new THREE.Scene();

  // カメラの追加（視野角、アスペクト比、開始距離、終了距離）
  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);

  // レンダラーの追加
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  // ジオメトリの作成
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
  const bufferGeometry = new THREE.BufferGeometry();

  const count = 50;
  const positionArray = new Float32Array(9 * count);
  for (let i = 0; i < count * 9; i++) {
    positionArray[i] = (Math.random() - 0.5) * 2;
  }

  const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
  bufferGeometry.setAttribute("position", positionAttribute);

  //マテリアル
  // const material = new THREE.MeshNormalMaterial({
  //   wireframe: true,
  // });
  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
  });

  // メッシュ化
  const box = new THREE.Mesh(boxGeometry, material);
  const sphere = new THREE.Mesh(sphereGeometry, material);
  const plane = new THREE.Mesh(planeGeometry, material);
  const torus = new THREE.Mesh(torusGeometry, material);
  const buffer = new THREE.Mesh(bufferGeometry, material);

  box.position.x = 1.5;
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.5;
  torus.position.x = -1.5;
  // scene.add(box, sphere, plane, torus);
  scene.add(buffer);

  //ライト
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  //マウス操作
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  console.log(controls);

  clock = new THREE.Clock();

  // レンダリングする
  renderer.render(scene, camera);

  window.addEventListener("resize", onWindowResize);

  animate();
}

// ブラウザのリサイズ対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);

  //オブジェクトの回転
  // sphere.rotation.x = elapsedTime;
  // plane.rotation.x = elapsedTime;
  // octahedron.rotation.x = elapsedTime;
  // torus.rotation.x = elapsedTime;

  // sphere.rotation.y = elapsedTime;
  // plane.rotation.y = elapsedTime;
  // octahedron.rotation.y = elapsedTime;

  // torus.rotation.y = elapsedTime;

  controls.update();

  //レンダリング
  renderer.render(scene, camera);
}
