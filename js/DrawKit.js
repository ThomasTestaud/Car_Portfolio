class DrawKit {
    grassColor = 0x24cc0e;
    textColor = 0xffffff;
    carColor = undefined;
    linesColor = undefined;
    constructor(scene) {
        this.scene = scene;
        this.roadAtX = -20;
    }

    writeIn(text, x, y, z) {
        const fontLoader = new THREE.FontLoader();

        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new THREE.TextGeometry(text, {
                font: font,
                size: 1.5,
                height: 0.01,
                curveSegments: 12,
                bevelEnabled: false
            });

            const material = new THREE.MeshToonMaterial({ color: this.textColor });

            const textMesh = new THREE.Mesh(textGeometry, material);
            //textMesh.castShadow = true; // Enable casting shadows
            textMesh.position.set(x, y, z);
            textMesh.rotation.x = -1.58;
            this.scene.add(textMesh); // Access this.scene instead of scene
        });
    }

    drawGrass() {
        const geometry = new THREE.BoxGeometry(330, 0.005, 50);

        // Load the grass texture and normal map
        const textureLoader = new THREE.TextureLoader();
        //const grassNormalMap = textureLoader.load('normal.jpeg');


        // Create the material with the grass texture and normal map
        const material = new THREE.MeshToonMaterial({
            color: this.grassColor,
            receiveShadow: true
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(330 / 2 - 20, 0, 0);
        mesh.receiveShadow = true;
        this.scene.add(mesh);
    }

    drawRoad(roadLength, roadAtZindex) {
        let geometry = new THREE.BoxGeometry(roadLength, 0.015, 5);
        let material = new THREE.MeshToonMaterial({ color: 0x917a28, receiveShadow: true }); // Enable receiving shadows
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.roadAtX + roadLength / 2, 0, roadAtZindex);
        //mesh.castShadow = true; // Enable casting shadows
        mesh.receiveShadow = true; // Enable receiving shadows
        this.scene.add(mesh);
        this.roadAtX += roadLength;
    }


    drawPineTree(x, z) {
        let geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 5);;
        let material = new THREE.MeshToonMaterial({ color: 0x917a28, receiveShadow: true }); // Enable receiving shadows
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, 1.5, z);
        mesh.castShadow = true; // Enable casting shadows
        mesh.receiveShadow = true; // Enable receiving shadows
        this.scene.add(mesh);

        geometry = new THREE.CylinderGeometry(0, 2, 5, 5);;
        material = new THREE.MeshToonMaterial({ color: 0x008909, receiveShadow: true }); // Enable receiving shadows
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, 5, z);
        mesh.castShadow = true; // Enable casting shadows
        mesh.receiveShadow = true; // Enable receiving shadows
        this.scene.add(mesh);
    }
}

export default DrawKit;
