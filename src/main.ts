import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  pointLight: THREE.PointLight,
  renderer: THREE.WebGLRenderer;

window.addEventListener("load", init);

function init() {
  // シーンの追加
  scene = new THREE.Scene();

  // カメラの追加（視野角、アスペクト比、開始距離、終了距離）
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 500);

  // レンダラーの追加
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // テクスチャの追加
  const earthTexture = new THREE.TextureLoader().load(
    "../src/textures/earth.jpg"
  );

  // ジオメトリを作成
  const ballGeometry = new THREE.SphereGeometry(100, 64, 32);
  // マテリアルを作成
  const ballMaterial = new THREE.MeshPhysicalMaterial({ map: earthTexture });
  // メッシュ化
  const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  scene.add(ballMesh);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 8); // 色、つよさ
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ポイント光源
  pointLight = new THREE.PointLight(0xffffff, 100000);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);
  // ポイント光源がどこにあるのか
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  // scene.add(pointLightHelper);

  // マウス操作
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();

  // レンダリングする
  renderer.render(scene, camera);
}

// ブラウザのリサイズ対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);

  // ポイント光源の巡回
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );

  renderer.render(scene, camera);
}
