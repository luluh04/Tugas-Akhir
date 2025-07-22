// index
// audio
function playAudio() {
  const audio = document.getElementById("myAudio");
  const button = document.getElementById("audioBtn");

  if (!audio || !button) return; // cek jika elemen tidak ditemukan

  if (audio.paused) {
    audio.play();
    button.src = "assets/Speaker.png"; // Gambar ikon ketika play
  } else {
    audio.pause();
    button.src = "assets/No Audio.png"; // Gambar ikon ketika mute
  }
}
// end audio

// kubus 3d
function createKubus(containerId) {
  const container = document.getElementById(containerId);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    transparent: true,
    opacity: 0.6
  });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  container.addEventListener("mousemove", (event) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);

    const tooltip = document.getElementById("tooltip");
    if (intersects.length > 0) {
      const faceIndex = intersects[0].faceIndex;
      const sideNames = [
        "Sisi Depan", "Sisi Depan",
        "Sisi Belakang", "Sisi Belakang",
        "Sisi Atas", "Sisi Atas",
        "Sisi Bawah", "Sisi Bawah",
        "Sisi Kanan", "Sisi Kanan",
        "Sisi Kiri", "Sisi Kiri"
      ];
      const sideName = sideNames[faceIndex] || "Sisi";
      tooltip.innerText = sideName;
      tooltip.style.display = "block";
      tooltip.style.left = `${event.clientX + 10}px`;
      tooltip.style.top = `${event.clientY + 10}px`;
    } else {
      tooltip.style.display = "none";
    }
  });

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}

function showInfo(text) {
  alert(text);
}

createKubus("kubus-container");
// end kubus 3d

// animasi karakter
  const teks = "Halo! Ini adalah aplikasi alat peraga interaktif untuk pembelajaran bangun ruang 3D. Yuk, pelajari bentuk-bentuknya!";
  const elemen = document.getElementById("teksKomentar");
  let i = 0;

  function ketik() {
    if (i < teks.length) {
      elemen.innerHTML += teks.charAt(i);
      i++;
      setTimeout(ketik, 40); // kecepatan ketik
    }
  }

  window.onload = () => {
    ketik();
  };

// end index

// mulai simulator

// kubus
const container = document.getElementById("container-kubus");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Material 6 sisi berbeda
const materials = [
  new THREE.MeshBasicMaterial({ color: "red" }),
  new THREE.MeshBasicMaterial({ color: "yellow" }),
  new THREE.MeshBasicMaterial({ color: "blue" }),
  new THREE.MeshBasicMaterial({ color: "green" }),
  new THREE.MeshBasicMaterial({ color: "purple" }),
  new THREE.MeshBasicMaterial({ color: "orange" })
];

const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

camera.position.z = 3;

// Tooltip
const tooltipSisi = document.getElementById("tooltip-sisi");
const tooltipRusuk = document.getElementById("tooltip-rusuk");
const tooltipTitik = document.getElementById("tooltip-titik");

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);

  if (intersects.length > 0) {
    // Tampilkan semua tooltip
    tooltipSisi.style.display = 'block';
    tooltipRusuk.style.display = 'block';
    tooltipTitik.style.display = 'block';

    const x = event.clientX;
    const y = event.clientY;

    tooltipSisi.style.left = x + 15 + 'px';
    tooltipSisi.style.top = y + 15 + 'px';
    tooltipSisi.innerHTML = `
      <div class="tooltip-title">🟧 Sisi Kubus</div>
      <ul><li>Jumlah sisi: 6</li><li>Semua berbentuk persegi</li></ul>
    `;

    tooltipRusuk.style.left = x + 240 + 'px';
    tooltipRusuk.style.top = y + 30 + 'px';
    tooltipRusuk.innerHTML = `
      <div class="tooltip-title">📏 Rusuk</div>
      <ul><li>Jumlah rusuk: 12</li><li>Rusuk sama panjang</li></ul>
    `;

    tooltipTitik.style.left = x + 120 + 'px';
    tooltipTitik.style.top = y + 100 + 'px';
    tooltipTitik.innerHTML = `
      <div class="tooltip-title">🔴 Titik Sudut</div>
      <ul><li>Jumlah titik sudut: 8</li><li>Setiap sudut 90°</li></ul>
    `;
  } else {
    tooltipSisi.style.display = 'none';
    tooltipRusuk.style.display = 'none';
    tooltipTitik.style.display = 'none';
  }
}

window.addEventListener("mousemove", onMouseMove);

// Resize
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

