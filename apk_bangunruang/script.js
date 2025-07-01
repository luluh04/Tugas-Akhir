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
// end index

