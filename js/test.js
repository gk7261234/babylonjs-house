const BABYLON = require("babylonjs");

window.addEventListener('DOMContentLoaded', function () {
  // 获取到canvas的dom对象
  var canvas = document.getElementById('renderCanvas');

  // 实例化3d引擎
  var engine = new BABYLON.Engine(canvas, true);

  // 创建场景并返回场景对象
  var createScene = function () {
      // 创建场景对象
      var scene = new BABYLON.Scene(engine);

      // 创建FreeCamera, 并把相机位置设置到(x:0, y:5, z:-10)
      var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);

      // 将相机朝向设置到原点
      camera.setTarget(BABYLON.Vector3.Zero());

      // 相机事件绑定到canvas对象上面
      camera.attachControl(canvas, false);

      // 创建一个平衡光，将灯光位置设置到0 1 0
      var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

      // 创建一个球题 支持六个配置项 名称, 分割段数, 直径, 放置的场景, updatable, sideOrientation
      // var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
      var sphere = BABYLON.MeshBuilder.CreateBox("myBox", {height: 2, width: 1, depth: 0.1}, scene)

      // 将球上调到原点以上
      sphere.position.y = 1;

      // 创建地面
      var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

      // 返回场景
      return scene;
  };

  // 获取到创建的场景
  var scene = createScene();

  // 循环渲染，性能最大没秒六十帧
  engine.runRenderLoop(function () {
      scene.render();
  });

  // 浏览器大小变动时，触发引擎的重载状态
  window.addEventListener('resize', function () {
      engine.resize();
  });
});