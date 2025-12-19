 let scene, camera, renderer, fotos = [];
let camRadius = 100; // distancia de la cámara (zoom)
const camHeight = 20; // altura fija desde arriba

init();
animate();


function init() {
  // ------------------------------
  // Escena y cámara
  // ------------------------------
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(camRadius, camHeight, camRadius);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // ------------------------------
  // Fondo de estrellas (galaxia espiral realista)
  // ------------------------------
  const starGeometry = new THREE.BufferGeometry();
  const starVertices = [];
  const starColors = [];
  const starCount = 4000;
  const arms = 4;
  const armSeparation = (2 * Math.PI) / arms;

  for (let i = 0; i < starCount; i++) {
    const arm = i % arms;
    const radius = Math.pow(Math.random(), 1.5) * 80;
    let angle = radius * 0.25 + arm * armSeparation;
    angle += (Math.random() - 0.5) * 0.3;
    const spread = 5;
    const x = Math.cos(angle) * radius + (Math.random() - 0.5) * spread;
    const y = (Math.random() - 0.5) * 6 * (1 - radius / 100);
    const z = Math.sin(angle) * radius + (Math.random() - 0.5) * spread;

    starVertices.push(x, y, z);

    const color = new THREE.Color();
    const t = radius / 100;
    color.setHSL(0.1 + 0.6 * t, 1, 0.7 + Math.random() * 0.1);
    starColors.push(color.r, color.g, color.b);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
  starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

  const starTexture = crearTexturaEstrella();
  const starMaterial = new THREE.PointsMaterial({
    size: 0.6,
    map: starTexture,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // ------------------------------
  // Fotos flotantes
  // ------------------------------
  const imagenes = [
    "fotos/foto1.png","fotos/foto2.png","fotos/foto3.png",
    "fotos/foto4.png","fotos/foto5.png","fotos/foto6.png",
    "fotos/foto7.png","fotos/foto8.png","fotos/foto9.png",
    "fotos/foto (10).jpeg","fotos/foto (11).jpeg","fotos/foto (12).jpeg",
    "fotos/foto (13).jpeg","fotos/foto (14).jpeg","fotos/foto (15).jpeg",
    "fotos/foto (16).jpeg","fotos/foto (17).jpeg","fotos/foto (18).jpeg",
    "fotos/foto (19).jpeg","fotos/foto (20).jpeg","fotos/foto (21).jpeg",
    "fotos/foto (22).jpeg","fotos/foto (23).jpeg","fotos/foto (24).jpeg",
    "fotos/foto (25).jpeg","fotos/foto (26).jpeg","fotos/foto (27).jpeg",
    "fotos/foto (28).jpeg","fotos/foto (29).jpeg","fotos/foto (30).jpeg",
    "fotos/foto (31).jpeg","fotos/foto (32).jpeg","fotos/foto (33).jpeg",
    "fotos/foto (34).jpeg","fotos/foto (35).jpeg","fotos/foto (36).jpeg",
    "fotos/foto (37).jpeg","fotos/foto (38).jpeg","fotos/foto (39).jpeg",
    "fotos/foto (40).jpeg","fotos/foto (41).jpeg","fotos/foto (42).jpeg",
    "fotos/foto (43).jpeg","fotos/foto (44).jpeg","fotos/foto (45).jpeg",
    "fotos/foto (46).jpeg","fotos/foto (47).jpeg","fotos/foto (48).jpeg",
    "fotos/foto (49).jpeg","fotos/foto (50).jpeg","fotos/foto (51).jpeg",
    "fotos/foto (52).jpeg","fotos/foto (53).jpeg","fotos/foto (54).jpeg",
    "fotos/foto (55).jpeg","fotos/foto (56).jpeg","fotos/foto (57).jpeg",
    "fotos/foto (58).jpeg","fotos/foto (59).jpeg","fotos/foto (60).jpeg",
    "fotos/foto (61).jpeg","fotos/foto (62).jpeg","fotos/foto (63).jpeg",
    "fotos/foto (64).jpeg","fotos/foto (65).jpeg","fotos/foto (66).jpeg",
    "fotos/foto (67).jpeg","fotos/foto (68).jpeg","fotos/foto (69).jpeg",
    "fotos/foto (70).jpeg","fotos/foto (71).jpeg","fotos/foto (72).jpeg",
    "fotos/foto (73).jpeg","fotos/foto (74).jpeg","fotos/foto (75).jpeg",
    "fotos/foto (76).jpeg","fotos/foto (77).jpeg","fotos/foto (78).jpeg",
    "fotos/foto (79).jpeg","fotos/foto (80).jpeg","fotos/foto (81).jpeg",
    "fotos/foto (82).jpeg","fotos/foto (83).jpeg","fotos/foto (84).jpeg",
    "fotos/foto (85).jpeg","fotos/foto (86).jpeg","fotos/foto (87).jpeg",
    "fotos/foto (88).jpeg","fotos/foto (89).jpeg","fotos/foto (90).jpeg",
    "fotos/foto (91).jpeg","fotos/foto (92).jpeg","fotos/foto (93).jpeg",
    "fotos/foto (94).jpeg","fotos/foto (95).jpeg","fotos/foto (96).jpeg",
    "fotos/foto (97).jpeg","fotos/foto (98).jpeg","fotos/foto (99).jpeg",
    "fotos/foto (100).jpeg","fotos/foto (101).jpeg","fotos/foto (102).jpeg",
    "fotos/foto (103).jpeg","fotos/foto (104).jpeg","fotos/foto (105).jpeg",
    "fotos/foto (106).jpeg","fotos/foto (107).jpeg","fotos/foto (108).jpeg",
    "fotos/foto (109).jpeg","fotos/foto (110).jpeg","fotos/foto (111).jpeg",
    "fotos/foto (112).jpeg","fotos/foto (113).jpeg","fotos/foto (114).jpeg",
    "fotos/foto (115).jpeg","fotos/foto (116).jpeg","fotos/foto (117).jpeg",
    "fotos/foto (118).jpeg","fotos/foto (119).jpeg","fotos/foto (120).jpeg",
    "fotos/foto (121).jpeg","fotos/foto (122).jpeg","fotos/foto (123).jpeg",
    "fotos/foto (124).jpeg","fotos/foto (125).jpeg","fotos/foto (126).jpeg",
    "fotos/foto (127).jpeg","fotos/foto (128).jpeg","fotos/foto (129).jpeg",
    "fotos/foto (130).jpeg","fotos/foto (131).jpeg","fotos/foto (132).jpeg",
    "fotos/foto (133).jpeg","fotos/foto (134).jpeg","fotos/foto (135).jpeg",
    "fotos/foto (136).jpeg","fotos/foto (137).jpeg","fotos/foto (138).jpeg",
    "fotos/foto (139).jpeg","fotos/foto (140).jpeg","fotos/foto (141).jpeg",
    "fotos/foto (142).jpeg","fotos/foto (143).jpeg","fotos/foto (144).jpeg",
    "fotos/foto (145).jpeg","fotos/foto (146).jpeg","fotos/foto (147).jpeg",
    "fotos/foto (148).jpeg","fotos/foto (149).jpeg","fotos/foto (150).jpeg",
    "fotos/foto (151).jpeg","fotos/foto (152).jpeg","fotos/foto (153).jpeg",
    "fotos/foto (154).jpeg","fotos/foto (155).jpeg","fotos/foto (156).jpeg",
    "fotos/foto (157).jpeg","fotos/foto (158).jpeg","fotos/foto (159).jpeg",
    "fotos/foto (160).jpeg","fotos/foto (161).jpeg","fotos/foto (162).jpeg",
    "fotos/foto (163).jpeg","fotos/foto (164).jpeg","fotos/foto (165).jpeg",
    "fotos/foto (166).jpeg","fotos/foto (167).jpeg","fotos/foto (168).jpeg",
    "fotos/foto (169).jpeg","fotos/foto (170).jpeg","fotos/foto (171).jpeg",
    "fotos/foto (172).jpeg","fotos/foto (173).jpeg","fotos/foto (174).jpeg",
    "fotos/foto (175).jpeg","fotos/foto (176).jpeg","fotos/foto (177).jpeg",
    "fotos/foto (178).jpeg","fotos/foto (179).jpeg","fotos/foto (180).jpeg",
    "fotos/foto (181).jpeg","fotos/foto (182).jpeg","fotos/foto (183).jpeg",
    "fotos/foto (184).jpeg","fotos/foto (185).jpeg","fotos/foto (186).jpeg",
    "fotos/foto (187).jpeg","fotos/foto (188).jpeg","fotos/foto (189).jpeg",
    "fotos/foto (190).jpeg","fotos/foto (191).jpeg","fotos/foto (192).jpeg",
    "fotos/foto (193).jpeg","fotos/foto (194).jpeg","fotos/foto (195).jpeg",
    "fotos/foto (196).jpeg","fotos/foto (197).jpeg","fotos/foto (198).jpeg",
    "fotos/foto (199).jpeg","fotos/foto (200).jpeg","fotos/foto (201).jpeg",
    "fotos/foto (202).jpeg","fotos/foto (203).jpeg","fotos/foto (204).jpeg",
    "fotos/foto (205).jpeg","fotos/foto (206).jpeg","fotos/foto (207).jpeg",
    "fotos/foto (208).jpeg","fotos/foto (209).jpeg","fotos/foto (210).jpeg",
    "fotos/foto (211).jpeg","fotos/foto (212).jpeg","fotos/foto (213).jpeg",
    "fotos/foto (214).jpeg","fotos/foto (215).jpeg","fotos/foto (216).jpeg",
    "fotos/foto (217).jpeg","fotos/foto (218).jpeg","fotos/foto (219).jpeg",
    "fotos/foto (220).jpeg","fotos/foto (221).jpeg","fotos/foto (222).jpeg",
    "fotos/foto (223).jpeg","fotos/foto (224).jpeg","fotos/foto (225).jpeg",
    "fotos/foto (226).jpeg","fotos/foto (227).jpeg","fotos/foto (228).jpeg",
    "fotos/foto (229).jpeg","fotos/foto (230).jpeg","fotos/foto (231).jpeg",
    "fotos/foto (232).jpeg","fotos/foto (233).jpeg","fotos/foto (234).jpeg",
    "fotos/foto (235).jpeg","fotos/foto (236).jpeg",

  ];

  imagenes.forEach((src, index) => {
    crearTexturaCircular(src, textura => {
      const material = new THREE.SpriteMaterial({ map: textura, transparent: true });
      const sprite = new THREE.Sprite(material);

      const radius = 10 + Math.random() * 25;
      const angle = index * 0.7;
      sprite.position.set(
        radius * Math.cos(angle),
        (Math.random() - 0.5) * 5,
        radius * Math.sin(angle)
      );

      const size = 0.5 + Math.random() * 1;
      sprite.scale.set(size, size, 1);

      scene.add(sprite);
      fotos.push({ sprite, src });
    });
  });

  // ------------------------------
  // Eventos
  // ------------------------------
  document.addEventListener('click', detectarClick);
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('wheel', onMouseWheel);
}


// ------------------------------
// Textura circular de fotos
// ------------------------------
function crearTexturaCircular(src, callback) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 0, 0, size, size);

    const textura = new THREE.Texture(canvas);
    textura.needsUpdate = true;
    callback(textura);
  };
}

// ------------------------------
// Textura circular de estrellas
// ------------------------------
function crearTexturaEstrella() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'white');
  gradient.addColorStop(0.2, 'white');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ------------------------------
// Click en fotos
// ------------------------------
function detectarClick(event) {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersecciones = raycaster.intersectObjects(fotos.map(f => f.sprite));
  if (intersecciones.length > 0) {
    const objeto = intersecciones[0].object;
    const foto = fotos.find(f => f.sprite === objeto);
    mostrarFoto(foto.src);
  }
}

function mostrarFoto(src) {
  const overlay = document.getElementById("overlay");
  const img = document.getElementById("overlay-img");
  img.src = src;
  overlay.style.display = "flex";
}

function cerrarFoto() {
  document.getElementById("overlay").style.display = "none";
}

// ------------------------------
// Zoom con la rueda
// ------------------------------
function onMouseWheel(event) {
  camRadius += event.deltaY * 0.02;
  camRadius = Math.max(0, Math.min(100, camRadius)); // límites
   camHeight = 35 + (100 - camRadius) * 0.2;
}


// ------------------------------
// Animación principal
// ------------------------------
function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.00005; // tiempo base para animaciones

  // Rotación lenta y vaivén de la galaxia
  scene.rotation.y = Math.sin(time) * 0.4;

  // "Respiración" de la cámara (zoom suave)
  const breathing = Math.sin(time * 0.8) * 3;
  const smoothRadius = camRadius + breathing;

  // Movimiento sutil de las fotos
  fotos.forEach((f, i) => {
    f.sprite.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
    f.sprite.rotation.z += 0.002;
  });

  // Posición de la cámara según zoom y altura
  camera.position.x = Math.cos(time) * smoothRadius;
  camera.position.z = Math.sin(time) * smoothRadius;
  camera.position.y = camHeight;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


// ----------------------
// 🎵 CONTROL DE AUDIO
// ----------------------

const audioEl = document.getElementById('bg-audio');
audioEl.volume = 0.80; // volumen (0 = silencio, 1 = máximo)

let musicaIniciada = false;

// Intento automático de reproducir (Chrome suele bloquearlo)
audioEl.play().then(() => {
  musicaIniciada = true;
  const ov = document.getElementById('play-overlay');
  if (ov) ov.style.display = 'none';
}).catch(() => {
  // Si falla → pedir interacción del usuario
  const ov = document.getElementById('play-overlay');
  if (ov) ov.style.display = 'flex';
});

// Botón para iniciar música manualmente
const playBtn = document.getElementById('play-btn');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    audioEl.play().then(() => {
      musicaIniciada = true;
      document.getElementById('play-overlay').style.display = 'none';
    }).catch(err => {
      console.error('Error al reproducir audio:', err);
    });
  });
}










