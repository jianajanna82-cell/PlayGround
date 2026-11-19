import * as THREE from 'three';

const canvas=document.querySelector('#scene');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.setClearColor(0xc6ddd5);
const scene=new THREE.Scene();scene.fog=new THREE.Fog(0xc6ddd5,24,42);

const aspect=innerWidth/innerHeight, view=15;
let camera3d=new THREE.OrthographicCamera(-view*aspect/2,view*aspect/2,view/2,-view/2,.1,100);
camera3d.position.set(16,18,16);camera3d.lookAt(0,0,0);
scene.add(new THREE.HemisphereLight(0xfff8df,0x7d9d91,2.2));
const sun=new THREE.DirectionalLight(0xfff1c5,2.5);sun.position.set(-10,18,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-14;sun.shadow.camera.right=14;sun.shadow.camera.top=14;sun.shadow.camera.bottom=-14;scene.add(sun);

const mats={floor:new THREE.MeshStandardMaterial({color:0xf3eddc,roughness:.85}),wall:new THREE.MeshStandardMaterial({color:0xf7f1df,roughness:.9}),wood:new THREE.MeshStandardMaterial({color:0xb98a5a,roughness:.75}),darkwood:new THREE.MeshStandardMaterial({color:0x7e6045}),green:new THREE.MeshStandardMaterial({color:0x789c78}),yellow:new THREE.MeshStandardMaterial({color:0xf3bd62}),blue:new THREE.MeshStandardMaterial({color:0x78a9ae}),coral:new THREE.MeshStandardMaterial({color:0xe9957e}),white:new THREE.MeshStandardMaterial({color:0xfffcf4}),metal:new THREE.MeshStandardMaterial({color:0x9eaaa3,roughness:.45})};
function box(w,h,d,mat,x,y,z,cast=true){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=cast;m.receiveShadow=true;scene.add(m);return m}
function cyl(r,h,mat,x,y,z){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,16),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);return m}

// House floor and low dollhouse walls
box(18,.25,14,mats.floor,0,-.12,0);
box(18,3.2,.18,mats.wall,-.0,1.48,-7); box(.18,3.2,14,mats.wall,-9,1.48,0);
// rear wall visual panels
box(5.8,.14,.06,new THREE.MeshStandardMaterial({color:0xdde4d1}),-5.9,1.6,-6.88); box(5.8,.14,.06,new THREE.MeshStandardMaterial({color:0xe7d4c2}),5.9,1.6,-6.88);
// kitchen
box(5.2,.15,3.4,new THREE.MeshStandardMaterial({color:0xd9c79f}),-5.9,.02,-5.1);
box(4.8,.9,.75,mats.white,-5.9,.44,-6.4); box(4.8,.12,1.25,mats.wood,-5.9,.92,-6.05);
[[-7.5,-5.55],[-6.3,-5.55],[-5.1,-5.55],[-3.9,-5.55]].forEach(([x,z])=>{cyl(.25,.08,mats.metal,x,1,z)});
box(.8,1.5,.8,mats.white,-2.7,.75,-5.8);
// fridge
box(1.3,2.7,1.1,mats.blue,-8.05,1.35,-5.7);box(.08,.08,.08,mats.white,-7.35,1.4,-5.7);
// dining table
cyl(1.35,.12,mats.wood,-3.4,.9,-2);cyl(.12,1,mats.darkwood,-3.4,.45,-2);
for(const [x,z] of [[-4.55,-2],[-2.25,-2],[-3.4,-3.05],[-3.4,-.95]]){cyl(.55,.12,mats.yellow,x,.28,z);cyl(.12,.55,mats.darkwood,x,.02,z)}
// couch and living room
box(5,.18,3.4,new THREE.MeshStandardMaterial({color:0xe2d9b8}),4.2,.02,-4.9);
box(3.6,.65,1.15,mats.green,4.1,.65,-5.55);box(1.2,.75,1.2,mats.green,2.25,.7,-5.55);box(1.2,.75,1.2,mats.green,5.95,.7,-5.55);
box(3.6,.75,.35,mats.green,4.1,1.15,-6.05);
box(2.7,.12,1.3,mats.wood,4.1,.42,-3.55);cyl(.08,.4,mats.darkwood,3.05,.2,-3.55);cyl(.08,.4,mats.darkwood,5.15,.2,-3.55);
// TV
box(2.4,1.45,.18,mats.darkwood,7.7,1.05,-5.9);box(2.15,1.15,.08,new THREE.MeshStandardMaterial({color:0x405864}),7.7,1.05,-5.78);
// rug
box(4.6,.04,3,new THREE.MeshStandardMaterial({color:0xd8a66d}),4.1,.04,-2.8,false);
// bedroom
box(5,.18,4.6,new THREE.MeshStandardMaterial({color:0xbfd0ca}),-5.7,.02,3.7);
box(3.2,.55,2.1,mats.wood,-6.1,.45,4.2);box(3.05,.45,1.95,new THREE.MeshStandardMaterial({color:0x98b3ad}),-6.1,.88,4.2);
box(.55,1.1,.55,mats.wood,-8.25,.55,5.25);box(.55,1.1,.55,mats.wood,-4.1,.55,5.25);
// desk / garden corner
box(3.4,.15,1.2,mats.wood,4.7,.7,4.6);box(.1,1.1,.1,mats.darkwood,3.2,.35,4.6);box(.1,1.1,.1,mats.darkwood,6.2,.35,4.6);
for(const [x,z] of [[1.2,5.6],[1.8,5.6],[2.4,5.6]]){cyl(.38,.55,mats.coral,x,.28,z);cyl(.08,.8,mats.green,x,.75,z);cyl(.25,.25,mats.yellow,x,1.18,z)}
// potted plant
cyl(.5,.65,mats.coral,7.4,.32,-.4);cyl(.12,1.3,mats.green,7.4,.95,-.4);box(.35,.35,.35,mats.green,7.15,1.55,-.4);box(.35,.35,.35,mats.green,7.65,1.55,-.4);
// windows
for(const x of [-6.5,-2.5,1.5,6.5]) box(1.8,1.35,.08,new THREE.MeshStandardMaterial({color:0xadd0c9,roughness:.2}),x,1.75,-6.84);

const family=[
 {name:'Dad',role:'Gardening',color:'#e8b66a',skin:'#d79b6b',hair:'#5b4436',pants:'#5d7a85'},
 {name:'Mom',role:'Cooking',color:'#e8957e',skin:'#e1ae82',hair:'#8a5c48',pants:'#7d9b82'},
 {name:'Leo',role:'Learning',color:'#7daaae',skin:'#c98d62',hair:'#4e3a32',pants:'#6f88a7'},
 {name:'Mia',role:'Playing',color:'#8fb49a',skin:'#e8b887',hair:'#a46b4f',pants:'#d58e73'}
];
function makePerson(d,x,z){const g=new THREE.Group();const body=new THREE.Mesh(new THREE.CapsuleGeometry(.42,.75,4,8),new THREE.MeshStandardMaterial({color:d.color}));body.position.y=.95;body.castShadow=true;g.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.38,16,12),new THREE.MeshStandardMaterial({color:d.skin}));head.position.y=1.78;head.castShadow=true;g.add(head);const hair=new THREE.Mesh(new THREE.SphereGeometry(.39,16,8,0,Math.PI*2,0,Math.PI*.52),new THREE.MeshStandardMaterial({color:d.hair}));hair.scale.set(1,1.05,.9);hair.position.y=1.91;hair.castShadow=true;g.add(hair);for(const px of [-.22,.22]){const leg=new THREE.Mesh(new THREE.CapsuleGeometry(.13,.48,3,6),new THREE.MeshStandardMaterial({color:d.pants}));leg.position.set(px,.38,0);leg.castShadow=true;g.add(leg)}g.position.set(x,0,z);scene.add(g);return g}
const people=family.map((d,i)=>makePerson(d,[0,-1.5,5,3][i],[1.5-i*.8][0]||i-1));people[0].position.set(-3,0,-1);people[1].position.set(-5,0,-5);people[2].position.set(3,0,1);people[3].position.set(5,0,3);

const tasks=[
 {name:'Breakfast',icon:'🥞',x:-5,z:-5.2,stat:'Energy',goal:'Make breakfast'},
 {name:'Water plants',icon:'🌿',x:1.8,z:5.6,stat:'Mood',goal:'Water the plants'},
 {name:'Study',icon:'📚',x:4.7,z:4.6,stat:'Knowledge',goal:'Help with homework'},
 {name:'Clean up',icon:'🧸',x:5,z:3,stat:'Mood',goal:'Tidy the living room'}
];
const taskMeshes=[];tasks.forEach((t,i)=>{const ring=new THREE.Mesh(new THREE.RingGeometry(.65,.78,24),new THREE.MeshBasicMaterial({color:[0xf3bd62,0x75b798,0x78a9ae,0xe9957e][i],side:THREE.DoubleSide,transparent:true,opacity:.85}));ring.rotation.x=-Math.PI/2;ring.position.set(t.x,.06,t.z);scene.add(ring);taskMeshes.push(ring)});

let active=0,keys={},completed=new Set(),selectedTask=null,minutes=8*60+30,paused=false;
const goalEls=[];const familyList=document.querySelector('#familyList');
family.forEach((d,i)=>{const b=document.createElement('button');b.className='member'+(i===0?' active':'');b.innerHTML=`<span class="avatar" style="background:${d.color}">●</span><div><strong>${d.name}</strong><small>${d.role}</small></div>`;b.onclick=()=>selectPerson(i);familyList.appendChild(b)});
tasks.forEach((t,i)=>{const d=document.createElement('div');d.className='goal';d.innerHTML=`<span class="goal-check">✓</span><span>${t.goal}</span>`;document.querySelector('#goals').appendChild(d);goalEls.push(d)});
const stats=[['Energy',82,'#79a99a'],['Mood',76,'#ecb55d'],['Knowledge',64,'#819cad']];
const statsEl=document.querySelector('#stats');function renderStats(){statsEl.innerHTML=stats.map(s=>`<div class="stat"><span>${s[0]==='Energy'?'⚡':s[0]==='Mood'?'☀':'✦'}</span><div class="bar"><i style="width:${s[1]}%;background:${s[2]}"></i></div><em>${Math.round(s[1])}%</em></div>`).join('')}
renderStats();
function selectPerson(i){active=i;document.querySelectorAll('.member').forEach((e,j)=>e.classList.toggle('active',i===j));toast(`Playing as ${family[i].name}`)}
function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),1800)}

function updatePrompt(){const p=people[active].position;selectedTask=null;let best=1.6;tasks.forEach((t,i)=>{if(!completed.has(i)){const d=Math.hypot(p.x-t.x,p.z-t.z);if(d<best){best=d;selectedTask=i}}});const prompt=document.querySelector('#prompt');prompt.classList.toggle('show',selectedTask!==null);if(selectedTask!==null)prompt.querySelector('span').textContent=tasks[selectedTask].name}
function interact(){if(selectedTask===null)return;const i=selectedTask;if(completed.has(i)){toast('Already done!');return}completed.add(i);goalEls[i].classList.add('done');document.querySelector('#goalCount').textContent=`${completed.size}/4`;const t=tasks[i];const si=stats.findIndex(s=>s[0]===t.stat);if(si>=0)stats[si][1]=Math.min(100,stats[si][1]+12);taskMeshes[i].material.color.set(0x94bfa7);taskMeshes[i].scale.set(.7,.7,.7);renderStats();toast(`${t.icon} ${t.goal} complete!`);if(completed.size===4)toast('Family goals complete! 🏡')}
document.querySelector('#interactBtn').onclick=interact;document.querySelector('#menuBtn').onclick=()=>document.querySelector('#menuModal').classList.remove('hidden');document.querySelector('#resumeBtn').onclick=()=>document.querySelector('#menuModal').classList.add('hidden');document.querySelector('#resetBtn').onclick=()=>location.reload();document.querySelector('#soundBtn').onclick=e=>e.currentTarget.textContent=e.currentTarget.textContent==='♪'?'×':'♪';
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(e.key.toLowerCase()==='e')interact();if(e.key==='Escape')document.querySelector('#menuModal').classList.toggle('hidden')});addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
document.querySelectorAll('[data-key]').forEach(b=>{const k=b.dataset.key;const down=e=>{e.preventDefault();keys[k]=true};const up=e=>{e.preventDefault();keys[k]=false};b.addEventListener('pointerdown',down);b.addEventListener('pointerup',up);b.addEventListener('pointerleave',up)});
// Click-to-move
let target=null;canvas.addEventListener('pointerdown',e=>{const rect=canvas.getBoundingClientRect(),x=(e.clientX-rect.left)/rect.width*2-1,y=-(e.clientY-rect.top)/rect.height*2+1;const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(x,y),camera3d);const plane=new THREE.Plane(new THREE.Vector3(0,1,0),0);target=new THREE.Vector3();ray.ray.intersectPlane(plane,target)});

function resize(){const w=innerWidth,h=innerHeight,aspect=w/h;renderer.setSize(w,h,false);camera3d.left=-view*aspect/2;camera3d.right=view*aspect/2;camera3d.top=view/2;camera3d.bottom=-view/2;camera3d.updateProjectionMatrix()}addEventListener('resize',resize);resize();
let last=performance.now(),clockAcc=0;
function animate(now){requestAnimationFrame(animate);const dt=Math.min(.033,(now-last)/1000);last=now;if(!paused){const p=people[active],speed=4*dt;let dx=((keys.d||keys.arrowright)?1:0)-((keys.a||keys.arrowleft)?1:0),dz=((keys.s||keys.arrowdown)?1:0)-((keys.w||keys.arrowup)?1:0);if(target){dx=(target.x-p.position.x);dz=(target.z-p.position.z);if(Math.hypot(dx,dz)<.12)target=null;else{dx/=Math.hypot(dx,dz);dz/=Math.hypot(dx,dz)}}if(dx||dz){p.position.x=Math.max(-8.2,Math.min(8.2,p.position.x+dx*speed));p.position.z=Math.max(-6.2,Math.min(6.2,p.position.z+dz*speed));p.rotation.y=Math.atan2(dx,dz);p.children[0].rotation.z=Math.sin(now*.012)*.015}updatePrompt();clockAcc+=dt;if(clockAcc>.8){clockAcc=0;minutes+=2;if(minutes>=24*60)minutes-=24*60;const h=Math.floor(minutes/60)%24,m=minutes%60;document.querySelector('#clock').textContent=`${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`}taskMeshes.forEach((r,i)=>{r.position.y=.07+Math.sin(now*.003+i)*.05;r.rotation.z+=.004})}
renderer.render(scene,camera3d)}requestAnimationFrame(animate);
