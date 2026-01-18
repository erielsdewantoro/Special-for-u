/* =========================================
   LOGIC FILE - HBD LDR EDITION (PREMIUM)
   ========================================= */

/* --- 1. CONFIGURATION --- */
const startDate = new Date("2026-01-02T00:00:00");
const typeText = "Garyn/Xia/Bocil/Siapapun Namamu...";

// COORDINATES (Bekasi - Mojokerto)
const myCoords = { lat: -6.2383, lon: 106.9756 };
const herCoords = { lat: -7.4726, lon: 112.4381 };

/* --- 2. AUDIO SYSTEM --- */
const vnAudio = document.getElementById("vn-audio");
const bgMusic = document.getElementById("bg-music");
const musicFab = document.getElementById("music-fab");
const albumArt = document.getElementById("album-art");
let isMusicPlaying = false;

// FUNGSI VN (VOICE NOTE)
function toggleVoiceNote(btn) {
  const waveform = document.querySelector(".waveform-visual");
  const playIcon = btn;

  if (vnAudio.paused) {
    if (isMusicPlaying) {
      bgMusic.pause();
      musicFab.innerHTML = "🎵";
      albumArt.classList.remove("rotating");
      isMusicPlaying = false;
    }
    vnAudio.play();
    playIcon.innerHTML = "⏸";
    waveform.classList.add("playing-vn");
  } else {
    vnAudio.pause();
    playIcon.innerHTML = "▶";
    waveform.classList.remove("playing-vn");

    bgMusic.play();
    musicFab.innerHTML = "⏸";
    albumArt.classList.add("rotating");
    isMusicPlaying = true;
  }
}

vnAudio.onended = function () {
  const btn = document.querySelector(".play-icon-vn");
  const waveform = document.querySelector(".waveform-visual");
  btn.innerHTML = "▶";
  waveform.classList.remove("playing-vn");

  bgMusic.play();
  musicFab.innerHTML = "⏸";
  albumArt.classList.add("rotating");
  isMusicPlaying = true;
};

// FUNGSI MUSIK BACKGROUND
function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicFab.innerHTML = "🎵";
    albumArt.classList.remove("rotating");
  } else {
    if (!vnAudio.paused) {
      vnAudio.pause();
      document.querySelector(".play-icon-vn").innerHTML = "▶";
      document.querySelector(".waveform-visual").classList.remove("playing-vn");
    }
    bgMusic.play();
    musicFab.innerHTML = "⏸";
    albumArt.classList.add("rotating");
  }
  isMusicPlaying = !isMusicPlaying;
}

/* --- 3. LANDING & START EXPERIENCE --- */
function startExperience() {
  // Play Music pas klik "Mulai" biar browser ngijinin
  bgMusic
    .play()
    .then(() => {
      isMusicPlaying = true;
      musicFab.innerHTML = "⏸";
      albumArt.classList.add("rotating");
    })
    .catch((e) => console.log("Audio prevent:", e));

  // Hilangkan Overlay
  const overlay = document.getElementById("landing-overlay");
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 800);

  // Mulai ngetik Header
  typeHeader();
}

/* --- 4. LDR DISTANCE CALCULATION --- */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(0);
}

const distance = calculateDistance(
  myCoords.lat,
  myCoords.lon,
  herCoords.lat,
  herCoords.lon
);
document.getElementById("distance-km").innerText = distance + " KM";
const distVal = document.getElementById("dist-val");
if (distVal) distVal.innerText = distance;

/* --- 5. HEARTBEAT VIBRATION --- */
let vibrateInterval;

function startVibrate() {
  const btn = document.getElementById("heart-btn");
  const status = document.getElementById("vibrate-status");
  btn.classList.add("beating");
  status.innerText = "Sending Heartbeat... 💓";
  if ("vibrate" in navigator) {
    navigator.vibrate([100, 100]);
    vibrateInterval = setInterval(() => {
      navigator.vibrate([100, 100]);
    }, 300);
  }
}

function stopVibrate() {
  const btn = document.getElementById("heart-btn");
  const status = document.getElementById("vibrate-status");
  btn.classList.remove("beating");
  status.innerText = "Hold to connect...";
  if ("vibrate" in navigator) {
    clearInterval(vibrateInterval);
    navigator.vibrate(0);
  }
}

/* --- 6. TYPEWRITER LETTER LOGIC --- */
const letterContent = `
Dear Garyn Cangtip,<br><br>
Happy Level Up ke-23! 🎂. Semoga umurmu panjang dan penuh berkah, 
sehat jiwa dan raga, serta dikelilingi hal-hal baik yang kamu doakan dengan tulus.<br><br>
Ingat: <b>"Jalanmu kan sepanjang niatmu"</b>.<br>
Apa pun yang terjadi, kita abadi.<br><br>
<i>Peluk jauh.</i> ❤️
`;

let lIndex = 0;
const speed = 40;
const letterElement = document.getElementById("letter-text");
const btnRead = document.getElementById("btn-read-letter");
const btnGift = document.getElementById("btn-open-gift");

function startTypingLetter() {
  if (btnRead) btnRead.style.display = "none";
  typeLetterProcess();
}

function typeLetterProcess() {
  if (lIndex < letterContent.length) {
    if (letterContent.charAt(lIndex) === "<") {
      let tagEnd = letterContent.indexOf(">", lIndex);
      if (letterElement)
        letterElement.innerHTML += letterContent.slice(lIndex, tagEnd + 1);
      lIndex = tagEnd + 1;
    } else {
      if (letterElement)
        letterElement.innerHTML += letterContent.charAt(lIndex);
      lIndex++;
    }
    setTimeout(typeLetterProcess, speed);
  } else {
    // Typing Selesai, Munculkan Tombol Kado
    if (btnGift) btnGift.style.display = "block";
  }
}

/* --- 7. UTILITIES & GIFT (SWEETALERT) --- */
let hIndex = 0;
function typeHeader() {
  if (hIndex < typeText.length) {
    document.getElementById("typing-text").innerHTML += typeText.charAt(hIndex);
    hIndex++;
    setTimeout(typeHeader, 50);
  }
}

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;
  document.getElementById("days").innerText = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );
  document.getElementById("hours").innerText = Math.floor(
    (diff / (1000 * 60 * 60)) % 24
  );
  document.getElementById("minutes").innerText = Math.floor(
    (diff / (1000 * 60)) % 60
  );
  document.getElementById("seconds").innerText = Math.floor((diff / 1000) % 60);
}

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination" },
  });
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 5 + "s";
  document.getElementById("hearts-container").appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 8000);
}

// OPEN GIFT PREMIUM (SWEETALERT) - REVISI TEKS
function openGift() {
  confetti({
    particleCount: 300,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#ff758c", "#ff7eb3"],
  });

  Swal.fire({
    title: "Happy Birthday! 🎂",
    html: `
      Sekali lagi selamat ulang tahun ya cangtipku!<br><br>
      Terima kasih sudah jadi wanita hebat yang sabar ngejalanin LDR ini. 
      Aku tau ini gak mudah, tapi aku bersyukur partnernya itu kamu. 
      Nikmati hari ini ya, makan yang enak, istirahat yang cukup.<br><br>
      Tunggu aku sukses dan jemput kamu, biar kita gak perlu ngitung jarak lagi.<br><br>
      <b>Kadonya nyusul yaa!</b><br>
      Love, Eriel.
    `,
    imageUrl: "image/fotox.jpg", // Foto dia muncul disini
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: "Birthday Girl",
    confirmButtonText: "Peluk Jauh 🤗",
    confirmButtonColor: "#6c5ce7",
    background: "#fff",
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif")
      left top
      no-repeat
    `,
  }).then((result) => {
    if (result.isConfirmed) {
      if (btnGift) {
        btnGift.innerText = "Peyuk Diterima ❤️";
        btnGift.disabled = true;
        btnGift.style.background = "#b2bec3";
      }
    }
  });
}

// Runners
setInterval(updateTimer, 1000);
updateTimer();
setInterval(createHeart, 400);

// Scroll to top saat load
window.onload = function () {
  window.scrollTo(0, 0);
};
