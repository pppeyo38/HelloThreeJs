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

  // シーンを作る
  const scene = new THREE.Scene();
  // カメラを作る
  // 引数：画角, アスペクト比, 描画開始距離, 描画終了距離
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  // カメラ初期座標　引数：X座標, Y座標, Z座標
  camera.position.set(0, 0, 1000);

  // 立方体を作る
  // ジオメトリ（形状） 引数：幅, 高さ, 奥行き
  const geometry = new THREE.BoxGeometry(500, 500, 500);
  // マテリアル（素材）
  const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  // メッシュ（表示オブジェクト）
  const box = new THREE.Mesh(geometry, material);

  // シーンに追加
  scene.add(box);
}
