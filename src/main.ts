import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import GUI from "lil-gui";

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  particlesGeometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  controls: OrbitControls,
  clock: THREE.Clock;

const count = 10000;

window.addEventListener("load", init);

function init() {
  // UIデバッグ
  const gui = new GUI();

  //サイズ
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

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
   */
  const textureLoader = new THREE.TextureLoader();
  const particlesTexture = textureLoader.load(
    "../src/textures/particles/8.png"
  );

  /**
   * パーティクル作成
   */
  particlesGeometry = new THREE.BufferGeometry();

  const positionArray = new Float32Array(count * 3);
  const colorArray = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 10;
    colorArray[i] = Math.random();
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  );
  particlesGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colorArray, 3)
  );

  const pointMaterial = new THREE.PointsMaterial({
    size: 0.15,
    transparent: true,
    alphaMap: particlesTexture,
    // alphaTest: 0.001,
    // depthTest: false,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(particlesGeometry, pointMaterial);
  scene.add(particles);

  // マウス操作
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  clock = new THREE.Clock();

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

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const positionX = particlesGeometry.attributes.position.array[i3];
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + positionX
    );
  }

  particlesGeometry.attributes.position.needsUpdate = true;

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
