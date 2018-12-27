/**
 * さいころを振る演出のためのjs
 * @ref : https://ics.media/tutorial-three/quickstart.html
 */

// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {

	// サイズを指定
	const width = 960;
	const height = 540;

	// レンダラーを作成
	const renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector('#myCanvas')
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);

	// シーンを作成
	const scene = new THREE.Scene();

	// カメラを作成
	const camera = new THREE.PerspectiveCamera(45, width / height);
	camera.position.set(0, 0, +1000);

	// 箱を作成
	const geometry = new THREE.BoxGeometry(400, 400, 400);
	// 画像を読み込み
	const loader = new THREE.TextureLoader();
	loader.crossOrigin = 'anonymous';  
	const texture = loader.load('./images/earthmap1k.jpg');
	// マテリアルにテクスチャを設定
	const material = new THREE.MeshToonMaterial({
		map: texture
	});
	const box = new THREE.Mesh(geometry, material);
	scene.add(box);
/*
	const geometry = new THREE.BoxGeometry(400, 400, 400);
	const material = new THREE.MeshNormalMaterial();
	const box = new THREE.Mesh(geometry, material);
	scene.add(box);
	*/

	// 平行光源
	const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
	directionalLight.position.set(1, 1, 1);
	// シーンに追加
	scene.add(directionalLight);

	tick();

	// 毎フレーム時に実行されるループイベントです
	function tick() {
		box.rotation.y += 0.01;
		renderer.render(scene, camera); // レンダリング

		requestAnimationFrame(tick);
	}
}