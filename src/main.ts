import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import GUI from "lil-gui";

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  clock: THREE.Clock;

window.addEventListener("load", init);

//サイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

function init() {
  // UIデバッグ
  const gui = new GUI();

  // シーンの追加
  scene = new THREE.Scene();

  // カメラの追加（視野角、アスペクト比、開始距離、終了距離）
  camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);

  // レンダラーの追加
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  /**
 * テクスチャ設定
 * /


/**
 * パーティクル作成
 */

  // マウス操作
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

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
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
