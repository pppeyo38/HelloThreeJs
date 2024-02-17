window.addEventListener("DOMContentLoaded", init);

function init() {
  // ========================
  // レンダラー設定
  // ========================
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  });
  // レンダラーサイズ設定
  const width = 960;
  const height = 540;
  renderer.setSize(width, height);
  // デバイスピクセル比
  renderer.setPixelRatio(`window`.devicePixelRatio);
}
