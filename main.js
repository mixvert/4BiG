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
    color:new THREE.Color('rgb(255,0,0)'),
    shininess:50,
});
const material2 = new THREE.MeshPhongMaterial({
    color:new THREE.Color('rgb(0,255,0)'),
    shininess:50,
});
const material3 = new THREE.MeshPhongMaterial({
    color:new THREE.Color('rgb(0,0,255)'),
    shininess:50,
});
const material4 = new THREE.MeshPhongMaterial({
    color:new THREE.Color('rgb(255,0,255)'),
    shininess:50,
});

const object1 = new THREE.Mesh(sphere,material1);
const object2 = new THREE.Mesh(sphere,material2);
const object3 = new THREE.Mesh(sphere,material3);
const object4 = new THREE.Mesh(sphere,material4);
const light = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'),.7);
const light2 = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'),.5);

var objects = [object1, object2, object3, object4];
scene.add(object1);
scene.add(object2);
scene.add(object3);
scene.add(object4);
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
    render();
    
    if(selected.length > 0){
        if(selected[0].object.material.color.r == 1 && selected[0].object.material.color.b == 1){
            window.open('4.html', '_blank').focus();
        }
        else if(selected[0].object.material.color.r == 1){
            window.open('1.html', '_blank').focus();
        }
        else if(selected[0].object.material.color.g == 1){
            window.open('2.html', '_blank').focus();
        }
        else if(selected[0].object.material.color.b == 1){
            window.open('3.html', '_blank').focus();
        }
    }
}

function render() {
    raycaster.setFromCamera( mouse, camera );

    selected = raycaster.intersectObjects( scene.children );

    console.log(selected);
    
    renderer.render( scene, camera );
}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
renderer.domElement.addEventListener( 'mousedown', onCanvasMouseDown, false);

const loop = () =>{
    requestAnimationFrame(loop);
    render();
}
loop();
window.addEventListener('resize',handleResize);