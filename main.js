let scene, camera, renderer;

var raycaster = new THREE.Raycaster(); // create once
var mouse = new THREE.Vector2(); // create once

scene = new THREE.Scene({
    background: new THREE.Color('rgb(123,123,123)'),
});
camera = new THREE.PerspectiveCamera(10,window.innerWidth/window.innerHeight,0.1,1000);
renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

const sphere = new THREE.SphereGeometry(15, 20, 20, phiStart=0, phiLenght=Math.PI/2);
const material1 = new THREE.MeshPhongMaterial({
    color:new THREE.Color('hsl(0,100%,50%)'),
    shininess:50,
});
const material2 = new THREE.MeshPhongMaterial({
    color:new THREE.Color('hsl(115,100%,50%)'),
    shininess:50,
});
const material3 = new THREE.MeshPhongMaterial({
    color:new THREE.Color('hsl(235,100%,50%)'),
    shininess:50,
});
const material4 = new THREE.MeshPhongMaterial({
    color:new THREE.Color('hsl(265,100%,50%)'),
    shininess:50,
});

const object1 = new THREE.Mesh(sphere,material1);
const object2 = new THREE.Mesh(sphere,material2);
const object3 = new THREE.Mesh(sphere,material3);
const object4 = new THREE.Mesh(sphere,material4);
const light = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'),.7);
const light2 = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'),.5);

object1.name="red";
object2.name="green";
object3.name="blue";
object4.name="purple";

scene.add(object1, object2, object3, object4);
scene.add(light);
scene.add(light2);

camera.position.z=300;
light.position.set(-100,-50,100);
light2.position.set(100,-50,100);

object1.add(object2,object3,object4);
object1.rotation.x=Math.PI/2;
object2.rotation.y=-Math.PI/2;
object3.rotation.y=Math.PI/2;
object4.rotation.y=Math.PI;

const handleResize = () =>{
    const {innerWidth, innerHeight} = window;
    renderer.setSize(innerWidth,innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};

function onDocumentMouseMove( event ) { 
  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
} 

function onCanvasMouseDown( event ){
    
    if(selected.length > 0){
        if(selected[0].object.name == "purple"){
            window.open('4.html', '_blank').focus();
        }
        else if(selected[0].object.name == "red"){
            window.open('1.html', '_blank').focus();
        }
        else if(selected[0].object.name == "green"){
            window.open('2.html', '_blank').focus();
        }
        else if(selected[0].object.name == "blue"){
            window.open('3.html', '_blank').focus();
        }
    }
}

function render() { 
    renderer.render( scene, camera );
}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
renderer.domElement.addEventListener( 'mousedown', onCanvasMouseDown, false);

const loop = () =>{
    object1.rotation.z+=0.01;
    object1.rotation.x+=0.01;

    raycaster.setFromCamera( mouse, camera );
    selected = raycaster.intersectObjects( scene.children );

    if(selected.length==0){
        object1.material.color.setHSL(0,1,.5);
        object2.material.color.setHSL(.32,1,.5);
        object3.material.color.setHSL(.65,1,.5);
        object4.material.color.setHSL(.74,1,.5);
    }
    else {
        if(selected[0].object.name == "purple"){
            object4.material.color.setHSL(.74,1,.75);
            object1.material.color.setHSL(0,1,.5);
            object2.material.color.setHSL(.32,1,.5);
            object3.material.color.setHSL(.65,1,.5);
        }
        else if(selected[0].object.name == "red"){
            object1.material.color.setHSL(0,1,.75);
            object2.material.color.setHSL(.32,1,.5);
            object3.material.color.setHSL(.65,1,.5);
            object4.material.color.setHSL(.74,1,.5);
        }
        else if(selected[0].object.name == "green"){
            object2.material.color.setHSL(.32,1,.75);
            object1.material.color.setHSL(0,1,.5);
            object3.material.color.setHSL(.65,1,.5);
            object4.material.color.setHSL(.74,1,.5);
        }
        else if(selected[0].object.name == "blue"){
            object3.material.color.setHSL(.65,1,.75);
            object1.material.color.setHSL(0,1,.5);
            object2.material.color.setHSL(.32,1,.5);
            object4.material.color.setHSL(.74,1,.5);
        }
    }

    requestAnimationFrame(loop);
    render();
}
loop();
window.addEventListener('resize',handleResize);