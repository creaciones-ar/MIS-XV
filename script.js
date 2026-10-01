document.getElementById('open-btn').addEventListener('click', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('background-music');

    // Reproducir música
    music.play().catch(error => {
        console.log("Audio bloqueado por el navegador:", error);
    });

    // Ocultar pantalla de bienvenida y mostrar el contenido principal
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }, 600);
});

// Cuenta regresiva
const eventDate = new Date("December 20, 2026 21:00:00").getTime();

const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown").innerHTML = "¡Llegó el gran día!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}, 1000);


// Lógica para abrir y cerrar el modal de regalos
const btnGift = document.querySelector('.btn-gift');
const giftModal = document.getElementById('gift-modal');
const closeModal = document.getElementById('close-modal');

if (btnGift && giftModal && closeModal) {
    btnGift.addEventListener('click', () => {
        giftModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        giftModal.classList.add('hidden');
    });

    // Cerrar también si hacen clic fuera de la caja del modal
    giftModal.addEventListener('click', (e) => {
        if (e.target === giftModal) {
            giftModal.classList.add('hidden');
        }
    });
}
