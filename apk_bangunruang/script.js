// index
// audio

window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("myAudio");
  const button = document.getElementById("playAudio");

  const savedTime = localStorage.getItem("audioTime");
  if (savedTime) audio.currentTime = parseFloat(savedTime);

  // Play saat tombol diklik
  button.addEventListener("click", () => {
    audio.muted = false;
    audio.play()
      .then(() => {
        button.style.display = "none"; // sembunyikan tombol
      })
      .catch(err => {
        alert("Browser memblokir audio: " + err.message);
      });
  });

  // Simpan posisi lagu
  setInterval(() => {
    if (!audio.paused) {
      localStorage.setItem("audioTime", audio.currentTime);
    }
  }, 1000);
});

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

