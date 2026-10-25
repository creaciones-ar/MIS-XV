/* ===== CONFIGURACIÓN (editar solo acá) ===== */
const CONFIG = {
  fecha: "February 21, 2027 21:00:00",
  youtubeId: "rtOvBOTyX00",
  whatsapp: "5491178501814", // 54 + 9 + número
  albumUrl: "https://drive.google.com/drive/folders/PEGAR-LINK-ACA", // carpeta compartida de Drive
  mensajeWa: "Hola! Confirmo mi asistencia a los XV de Jesica 🦋"
};

/* ===== Links, QR ===== */
document.getElementById('album-link').href = CONFIG.albumUrl;
document.getElementById('qr').src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=0&data=' + encodeURIComponent(CONFIG.albumUrl);
document.getElementById('wa-btn').href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensajeWa)}`;

/* ===== Música (YouTube oculto + reproductor propio) ===== */
let yt, ticker, ready = false, wantPlay = false;
const $ = id => document.getElementById(id);
const playBtn = $('btn-play'), bar = $('progress');

const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(tag);

window.onYouTubeIframeAPIReady = () => {
  yt = new YT.Player('yt-player', {
    height: '1', width: '1', videoId: CONFIG.youtubeId,
    playerVars: { playsinline: 1, controls: 0, loop: 1, playlist: CONFIG.youtubeId },
    events: {
      onReady: () => { ready = true; if (wantPlay) yt.playVideo(); },
      onStateChange: e => {
        const playing = e.data === YT.PlayerState.PLAYING;
        playBtn.classList.toggle('playing', playing);
        clearInterval(ticker);
        if (playing) ticker = setInterval(() => {
          bar.value = (yt.getCurrentTime() / yt.getDuration()) * 100 || 0;
        }, 500);
      }
    }
  });
};
const isPlaying = () => ready && yt.getPlayerState() === 1;
playBtn.onclick = () => ready && (isPlaying() ? yt.pauseVideo() : yt.playVideo());
bar.oninput = () => ready && yt.seekTo(yt.getDuration() * bar.value / 100, true);
$('btn-prev').onclick = $('btn-next').onclick = () => ready && (yt.seekTo(0, true), yt.playVideo());
$('btn-repeat').onclick = e => e.currentTarget.classList.toggle('on');
$('btn-shuffle').onclick = e => e.currentTarget.classList.toggle('on');
$('yt-player').style.cssText = 'position:fixed;left:-9999px;width:1px;height:1px';

/* ===== Abrir sobre ===== */
$('open-btn').addEventListener('click', function () {
  this.classList.add('open');
  wantPlay = true; if (ready) yt.playVideo();
  setTimeout(() => {
    $('welcome-screen').style.opacity = '0';
    setTimeout(() => {
      $('welcome-screen').classList.add('hidden');
      $('main-content').classList.remove('hidden');
      window.scrollTo(0, 0);
    }, 600);
  }, 600);
});

/* ===== Cuenta regresiva ===== */
const eventDate = new Date(CONFIG.fecha).getTime();
const pad = n => String(n).padStart(2, '0');
const timer = setInterval(() => {
  const d = eventDate - Date.now();
  if (d < 0) { clearInterval(timer); $('countdown').textContent = '¡Llegó el gran día!'; return; }
  $('days').textContent = pad(Math.floor(d / 864e5));
  $('hours').textContent = pad(Math.floor(d % 864e5 / 36e5));
  $('minutes').textContent = pad(Math.floor(d % 36e5 / 6e4));
  $('seconds').textContent = pad(Math.floor(d % 6e4 / 1e3));
}, 1000);

/* ===== Modal regalos ===== */
$('copy-alias').onclick = async e => {
  try { await navigator.clipboard.writeText($('alias').textContent); e.target.textContent = '¡Copiado!'; } catch { }
};

/* ===== Fotos: si una no carga, prueba otras extensiones (.jpeg, .JPG, .png...) ===== */
document.querySelectorAll('img[src^="foto"]').forEach(img => {
  const base = img.getAttribute('src').replace(/\.\w+$/, '');
  const exts = ['jpeg', 'JPG', 'JPEG', 'png', 'PNG', 'webp'];
  let i = 0;
  const retry = () => { if (i < exts.length) img.src = base + '.' + exts[i++]; };
  img.addEventListener('error', retry);
  if (img.complete && img.naturalWidth === 0) retry();
});
