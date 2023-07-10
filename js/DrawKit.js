class DrawKit {
    grassColor = 0x24cc0e;
    textColor = 0xffffff;
    carColor = undefined;
    linesColor = undefined;

    constructor(scene) {
        this.scene = scene;
        this.roadAtX = -70;
        this.commonGeometry = [];
    }

    writeIn(text, x, y, z) {
        const fontLoader = new THREE.FontLoader();

        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            let textGeometry = new THREE.TextGeometry(text, {
                font: font,
                size: 1.5,
                height: 0.01,
                curveSegments: 12,
                bevelEnabled: false
            });
            
            /*
            textGeometry.translate(x, y, z);
            textGeometry.rotateX(-1.58);
            textGeometry = this.createHexColorAttribute(textGeometry, this.textColor);
            this.commonGeometry.push(textGeometry);
            */

            const material = new THREE.MeshToonMaterial({ color: this.textColor });
            const textMesh = new THREE.Mesh(textGeometry, material);
            textMesh.castShadow = true; // Enable casting shadows
            textMesh.position.set(x, y, z);
            textMesh.rotation.x = -1.58;
            this.scene.add(textMesh); // Access this.scene instead of scene
        });
    }

    drawGrass() {
        let geometry = new THREE.BoxGeometry(800, 0.5, 50);

        geometry.translate(400 / 2 - 0, -0.25, 0);
        geometry = this.createHexColorAttribute(geometry, this.grassColor);
        this.commonGeometry.push(geometry);
        
        /*
        const material = new THREE.MeshToonMaterial({
            color: this.grassColor,
            receiveShadow: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(400 / 2 - 0, -0.25, 0);
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        */
    }

    drawRoad(roadLength, roadAtZindex) {
        let geometry = new THREE.BoxGeometry(roadLength, 0.02, 5);
        //let material = new THREE.MeshToonMaterial({ color: 0x917a28, receiveShadow: true }); // Enable receiving shadows
        //let mesh = new THREE.Mesh(geometry, material);
        //mesh.position.set(this.roadAtX + roadLength / 2, 0, roadAtZindex);


        geometry.translate(this.roadAtX + roadLength / 2, 0.01, roadAtZindex);
        geometry = this.createHexColorAttribute(geometry, 0x917a28);
        this.commonGeometry.push(geometry);


        //mesh.receiveShadow = true; // Enable receiving shadows
        //this.scene.add(mesh);

        this.roadAtX += roadLength;
    }


    drawPineTree(x, z) {
        let geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 5);
        geometry.translate(x, 1.5, z);
        geometry = this.createHexColorAttribute(geometry, 0x917a28);
        this.commonGeometry.push(geometry);
        /*
        let material = new THREE.MeshToonMaterial({ color: 0x917a28, receiveShadow: true }); // Enable receiving shadows
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, 1.5, z);
        mesh.castShadow = true; // Enable casting shadows
        mesh.receiveShadow = true; // Enable receiving shadows
        this.scene.add(mesh);
        */

        geometry = new THREE.CylinderGeometry(0, 2, 5, 5);
        geometry.translate(x, 5, z);
        geometry = this.createHexColorAttribute(geometry, 0x008909);
        this.commonGeometry.push(geometry);
        /*
        material = new THREE.MeshToonMaterial({ color: 0x008909, receiveShadow: true }); // Enable receiving shadows
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, 5, z);
        mesh.castShadow = true; // Enable casting shadows
        mesh.receiveShadow = true; // Enable receiving shadows
        this.scene.add(mesh);
        */
    }


    mergeGeometries()
    {
        let mergedGeometries = this.mergeBufferGeometries(this.commonGeometry);
        mergedGeometries.computeVertexNormals();
        return mergedGeometries;
    }


    createHexColorAttribute(geometry, color)
    {
        let red = (color & 0xFF0000) >> 16;
        let green = (color & 0x00FF00) >> 8;
        let blue = (color & 0x0000FF);

        // division by 255 to get a number between 0 and 1
        red *= 0.00392156;
        green *= 0.00392156;
        blue *= 0.00392156;

        const colors = [];
        for(let j = 0; j < geometry.attributes.position.count; j++)
        {
            colors.push(red, green, blue);
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.computeVertexNormals();
        if(geometry.index !== null)
            return geometry.toNonIndexed();
        else
            return geometry;
    }

    mergeBufferGeometries( geometries, useGroups = false ) {

        const isIndexed = geometries[ 0 ].index !== null;
    
        const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
        const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );
    
        const attributes = {};
        const morphAttributes = {};
    
        const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;
    
        const mergedGeometry = new THREE.BufferGeometry();
    
        let offset = 0;
    
        for ( let i = 0; i < geometries.length; ++ i ) {
    
            const geometry = geometries[ i ];
            let attributesCount = 0;
    
            // ensure that all geometries are indexed, or none
    
            if ( isIndexed !== ( geometry.index !== null ) ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
                return null;
    
            }
    
            // gather attributes, exit early if they're different
    
            for ( const name in geometry.attributes ) {
    
                if ( ! attributesUsed.has( name ) ) {
    
                    console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
                    return null;
    
                }
    
                if ( attributes[ name ] === undefined ) attributes[ name ] = [];
    
                attributes[ name ].push( geometry.attributes[ name ] );
    
                attributesCount ++;
    
            }
    
            // ensure geometries have the same number of attributes
    
            if ( attributesCount !== attributesUsed.size ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
                return null;
    
            }
    
            // gather morph attributes, exit early if they're different
    
            if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
                return null;
    
            }
    
            for ( const name in geometry.morphAttributes ) {
    
                if ( ! morphAttributesUsed.has( name ) ) {
    
                    console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
                    return null;
    
                }
    
                if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];
    
                morphAttributes[ name ].push( geometry.morphAttributes[ name ] );
    
            }
    
            // gather .userData
    
            mergedGeometry.userData.mergedUserData = mergedGeometry.userData.mergedUserData || [];
            mergedGeometry.userData.mergedUserData.push( geometry.userData );
    
            if ( useGroups ) {
    
                let count;
    
                if ( isIndexed ) {
    
                    count = geometry.index.count;
    
                } else if ( geometry.attributes.position !== undefined ) {
    
                    count = geometry.attributes.position.count;
    
                } else {
    
                    console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
                    return null;
    
                }
    
                mergedGeometry.addGroup( offset, count, i );
    
                offset += count;
    
            }
    
        }
    
        // merge indices
    
        if ( isIndexed ) {
    
            let indexOffset = 0;
            const mergedIndex = [];
    
            for ( let i = 0; i < geometries.length; ++ i ) {
    
                const index = geometries[ i ].index;
    
                for ( let j = 0; j < index.count; ++ j ) {
    
                    mergedIndex.push( index.getX( j ) + indexOffset );
    
                }
    
                indexOffset += geometries[ i ].attributes.position.count;
    
            }
    
            mergedGeometry.setIndex( mergedIndex );
    
        }
    
        // merge attributes
    
        for ( const name in attributes ) {
    
            const mergedAttribute = this.mergeBufferAttributes( attributes[ name ] );
    
            if ( ! mergedAttribute ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' attribute.' );
                return null;
    
            }
    
            mergedGeometry.setAttribute( name, mergedAttribute );
    
        }
    
        // merge morph attributes
    
        for ( const name in morphAttributes ) {
    
            const numMorphTargets = morphAttributes[ name ][ 0 ].length;
    
            if ( numMorphTargets === 0 ) break;
    
            mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
            mergedGeometry.morphAttributes[ name ] = [];
    
            for ( let i = 0; i < numMorphTargets; ++ i ) {
    
                const morphAttributesToMerge = [];
    
                for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {
    
                    morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );
    
                }
    
                const mergedMorphAttribute = this.mergeBufferAttributes( morphAttributesToMerge );
    
                if ( ! mergedMorphAttribute ) {
    
                    console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
                    return null;
    
                }
    
                mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );
    
            }
    
        }
    
        return mergedGeometry;
    
    }

    mergeBufferAttributes( attributes ) {

        let TypedArray;
        let itemSize;
        let normalized;
        let arrayLength = 0;
    
        for ( let i = 0; i < attributes.length; ++ i ) {
    
            const attribute = attributes[ i ];
    
            if ( attribute.isInterleavedBufferAttribute ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported.' );
                return null;
    
            }
    
            if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
            if ( TypedArray !== attribute.array.constructor ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
                return null;
    
            }
    
            if ( itemSize === undefined ) itemSize = attribute.itemSize;
            if ( itemSize !== attribute.itemSize ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
                return null;
    
            }
    
            if ( normalized === undefined ) normalized = attribute.normalized;
            if ( normalized !== attribute.normalized ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
                return null;
    
            }
    
            arrayLength += attribute.array.length;
    
        }
    
        const array = new TypedArray( arrayLength );
        let offset = 0;
    
        for ( let i = 0; i < attributes.length; ++ i ) {
    
            array.set( attributes[ i ].array, offset );
    
            offset += attributes[ i ].array.length;
    
        }
    
        return new THREE.BufferAttribute( array, itemSize, normalized );
    
    }
}

export default DrawKit;
