let
  camera, // 相机
  scene, // 场景
  renderer, // 渲染器
  // geometry, // 几何体
  // material, // 材质
  // mesh, // 模型
  touchX, //
  touchY, //
  axisHelper,
  target = new THREE.Vector3(), // 三维向量（Vector3）
  lon = 90, //
  lat = 0, //
  phi = 0, //
  theta = 0; //

init();
animate();

function init() {
  // 透视投影相机PerspectiveCamera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  scene = new THREE.Scene();

  var sides = [{
    position: [-512, 0, 0],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    position: [512, 0, 0],
    rotation: [0, -Math.PI / 2, 0]
  },
  {
    position: [0, 512, 0],                              
    rotation: [Math.PI / 2, 0, Math.PI]
  },
  {
    position: [0, -512, 0],
    rotation: [-Math.PI / 2, 0, Math.PI]
  },
  {
    position: [0, 0, 512],
    rotation: [0, Math.PI, 0]
  },
  {
    position: [0, 0, -512],
    rotation: [0, 0, 0]
  }];

  // right，left，top，bottom，front，back
  for (var i = 0; i < sides.length; i++) {
    var side = sides[i];

    var element = document.getElementById("surface_" + i);
    element.width = 1026; // 多余的2像素用于闭合正方体

    var object = new THREE.CSS3DObject(element);
    object.position.fromArray(side.position);
    object.rotation.fromArray(side.rotation);
    scene.add(object);
  }

  // CSS3DRenderer 用于通过CSS3的transform属性，将层级的3D变换应用到DOM元素上。如果你希望不借助基于canvas的渲染来在你的网站上应用3D变换，那么这一渲染器十分有趣。 同时，它也可以将DOM元素与WebGL的内容相结合。
  // CSS3DRenderer 仅仅关注普通的 DOM 元素，这些元素被包含到了特殊的对象中（CSS3DObject或者CSS3DSprite），然后被加入到场景图中。
  // 区别于 WebGLRenderer
  renderer = new THREE.CSS3DRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('wheel', onDocumentMouseWheel, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
  window.addEventListener('resize', onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);
  // lon +=  0.1;
  lat = Math.max(-85, Math.min(85, lat)); // 限定在 -85 ~ 85 之间
  // 将度转化为弧度
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);

  console.log('phi theta ', phi, theta)

  // 三维向量
  target.x = Math.sin(phi) * Math.cos(theta);
  target.y = Math.cos(phi);
  target.z = Math.sin(phi) * Math.sin(theta);

  // console.log(target.x, target.y, target.z)
  camera.lookAt(target);

  /**
   * 通过传入的scene和camera
   * 获取其中object在创建时候传入的element信息
   * 以及后面定义的包括位置，角度等信息
   * 根据场景中的obj创建dom元素
   * 插入render本身自己创建的场景div中
   * 达到渲染场景的效果
   */
  renderer.render(scene, camera);
}

function onWindowResize() {
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行 updateProjectionMatrix 方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 鼠标按下，监听鼠标移动和抬起事件
function onDocumentMouseDown(event) {
  event.preventDefault();
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
}

function onDocumentMouseMove(event) {
  // x，y方向上相对移动的距离
  var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
  var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
  lon -= movementX * 0.1;
  lat += movementY * 0.1;
}

function onDocumentMouseUp(event) {
  // 注销事件
  document.removeEventListener('mousemove', onDocumentMouseMove);
  document.removeEventListener('mouseup', onDocumentMouseUp);
}

function onDocumentMouseWheel(event) {
  camera.fov += event.deltaY * 0.05;
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix 方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
}

function onDocumentTouchStart(event) {
  event.preventDefault();
  var touch = event.touches[0];
  touchX = touch.screenX;
  touchY = touch.screenY;
}

function onDocumentTouchMove(event) {
  event.preventDefault();
  var touch = event.touches[0];
  lon -= (touch.screenX - touchX) * 0.1;
  lat += (touch.screenY - touchY) * 0.1;
  touchX = touch.screenX;
  touchY = touch.screenY;
}