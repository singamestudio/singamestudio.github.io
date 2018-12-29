// forked from edo_m18's "Three.jsのCSS3DRendererでサイコロ2" http://jsdo.it/edo_m18/fo9k
(function (win, doc) {

    'use strict';

    var world, ground, timeStep = 1 / 60,
        diceRigid, dice,
        camera, scene, renderer, floorObj,
        cubeSize = 5;

    function createDice() {

        var boxInfo = [
                        {
                url: 'images/dice2.png',
                position: [ -cubeSize, 0, 0 ],
                rotation: [ 0, Math.PI / 2, 0 ]
            },
            {
                url: 'images/dice5.png',
                position: [ cubeSize, 0, 0 ],
                rotation: [ 0, -Math.PI / 2, 0 ]
            },
            {
                url: 'images/dice1.png',
                position: [ 0,  cubeSize, 0 ],
                rotation: [ Math.PI / 2, 0, Math.PI ]
            },
            {
                url: 'images/dice6.png',
                position: [ 0, -cubeSize, 0 ],
                rotation: [ - Math.PI / 2, 0, Math.PI ]
            },
            {
                url: 'images/dice3.png',
                position: [ 0, 0,  cubeSize ],
                rotation: [ 0, Math.PI, 0 ]
            },
            {
                url: 'images/dice4.png',
                position: [ 0, 0, -cubeSize ],
                rotation: [ 0, 0, 0 ]
            }
        ];

        //for three.js
        {
            var el, dice,
                info, img, face;

            el = doc.createElement('div');
            el.style.width = cubeSize * 2 + 'px';
            el.style.height = cubeSize * 2 + 'px';
            dice = new THREE.CSS3DObject(el);

            for (var j = 0; j < boxInfo.length; j++) {
                info = boxInfo[j];
                img = document.createElement('img');
                img.width = cubeSize * 2;
                img.src = info.url;
                face = new THREE.CSS3DObject(img);

                face.position.fromArray(info.position);
                face.rotation.fromArray(info.rotation);
                dice.add(face);
            }
        }

        //Create physics.
        {
            var mass  = 1;
            var box = new CANNON.Box(new CANNON.Vec3(cubeSize, cubeSize, cubeSize));
            var body = new CANNON.RigidBody(mass, box);
            
            //body.position.set(x, y, z);
            //body.velocity.set(0, 0, Math.random() * -50 - 30);

            //body.angularVelocity.set(10, 10, 10);
            //body.angularDamping = 0.001;
        }

        return {
            dice: dice,
            rigid: body
        };
    }

    //

    function initCannon() {
        //Cannonの世界を生成
        world = new CANNON.World();

        //重力を設定
        world.gravity.set(0, -90.82, 0);
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 10;
        world.solver.tolerance = 0.001;

        //地面用にPlaneを生成
        var plane = new CANNON.Plane();

        //Planeの剛体を質量0で生成する
        ground= new CANNON.RigidBody(0, plane);

        //X軸に90度（つまり地面）に回転
        ground.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        world.add(ground);
    }

    function initThree() {
        var w = win.innerWidth;
        var h = win.innerHeight;
        camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
        camera.position.set(10, 40, 50);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        scene = new THREE.Scene();
        renderer = new THREE.CSS3DRenderer();
        renderer.setSize(w, h);

        var textureSize = 800;
        var floorEle = doc.createElement('div');
        floorEle.style.width  = textureSize + 'px';
        floorEle.style.height = textureSize + 'px';
        floorEle.style.background = 'url(http://jsrun.it/assets/d/x/0/w/dx0wl.png) left top repeat';
        floorEle.style.backgroundSize = textureSize / 20 + 'px ' + textureSize / 20 + 'px';

        floorObj = new THREE.CSS3DObject(floorEle);
        floorObj.position.fromArray([0, 0, 0]);
        floorObj.rotation.fromArray([Math.PI / 2, 0, 0]);
        scene.add(floorObj);

        scene.add(camera);

        var container = doc.getElementById('d0');
        container.appendChild(renderer.domElement);

        renderer.render(scene, camera);
    }

    function animate() {
        if (stopped) {
            return;
        }
        requestAnimationFrame(animate);
        updatePhysics();
        render();
    }

    var stopped = false;
    function updatePhysics() {
        //物理エンジンの時間を進める
        world.step(timeStep);

        //物理エンジンで計算されたbody(RigidBody)の位置をThree.jsのMeshにコピー
        if (diceRigid) {
            diceRigid.position.copy(dice.position);
            diceRigid.quaternion.copy(dice.quaternion);
            diceRigid.position.copy(camera.position);
            camera.position.y += 50;
            camera.position.x += 50;
            camera.lookAt(diceRigid.position.copy(new THREE.Vector3(0, 0, 0)));
        }

        ground.position.copy(floorObj.position);
        ground.quaternion.copy(floorObj.quaternion);
    }

    function render() {
        renderer.render(scene, camera);
    }

    initCannon();
    initThree();

    //

    //create a dice.
    var ret = createDice();
    dice = ret.dice;
    diceRigid = ret.rigid;

    world.allowSleep = true;
    diceRigid.allowSleep = true;

    diceRigid.sleepSpeedLimit = 0.1;
    diceRigid.sleepTimeLimit = 1;

    function initAnimation() {
        diceRigid.position.set(0, 50, 30);
        diceRigid.velocity.set(
            Math.random() * 20  + 0,
            Math.random() * 100 + 20,
            Math.random() * -50 - 30);
        diceRigid.angularVelocity.set(10, 10, 10);
        diceRigid.angularDamping = 0.001;
    }

    diceRigid.addEventListener('sleepy', function (e) {
        var px = new THREE.Vector4( 1,  0,  0, 0),
            nx = new THREE.Vector4(-1,  0,  0, 0),
            py = new THREE.Vector4( 0,  1,  0, 0),
            ny = new THREE.Vector4( 0, -1,  0, 0),
            pz = new THREE.Vector4( 0,  0,  1, 0),
            nz = new THREE.Vector4( 0,  0, -1, 0),
            UP = 0.99,
            tmp;
        
        function showNum(num) {
            doc.getElementById('num').innerHTML = num;
            
            var gameinfoString = "　　　 入店人数：";
            if (num <= 3) {
                gameinfoString += "1";
            } else if (num <= 5) {
                gameinfoString += "2";
            } else {
                gameinfoString += "3";
            }
            gameinfoString += "人<br>";
            
            gameinfoString += "　イベント 摘発：";
            if (num >= 3) {
                gameinfoString += "発生";
            } else {
                gameinfoString += "発生せず";
            }
            gameinfoString += "<br>";
            
            gameinfoString += "イベント 食中毒："
            if (num >= 5) {
                gameinfoString += "発生";
            } else {
                gameinfoString += "発生せず";
            }
            
            doc.getElementById('gameinfo').innerHTML = gameinfoString;
        }

        if (px.applyMatrix4(dice.matrixWorld).y > UP) {
            showNum(5);
        }
        else if (nx.applyMatrix4(dice.matrixWorld).y > UP) {
            showNum(2);
        }
        else if (py.applyMatrix4(dice.matrixWorld).y > UP) {
            showNum(1);
        }
        else if (ny.applyMatrix4(dice.matrixWorld).y > UP) {
            showNum(6);
        }
        else if (pz.applyMatrix4(dice.matrixWorld).y > UP) {
            showNum(3);
        }
        else if (nz.applyMatrix4(dice.matrixWorld).y > UP) {
            showNum(4);
        }
        
        stopped = true;
    });
    diceRigid.addEventListener('sleep', function (e) {
        //alert('sleep');
    });
    scene.add(dice);
    world.add(diceRigid);

    render();

    //

    doc.addEventListener('click', function (e) {
        stopped = false;
        initAnimation();
        animate();
    }, false);

}(window, document));
