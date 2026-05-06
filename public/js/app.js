document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del Sobre y Audio
    const envelopeScreen = document.getElementById('envelope-screen');
    const openBtn = document.getElementById('open-btn');
    const invitationContent = document.getElementById('invitation-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const musicBtnText = document.getElementById('music-btn-text');

    // Botón flotante para pausar/reproducir
    musicToggleBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggleBtn.classList.add('playing');
            if(musicBtnText) musicBtnText.innerText = 'DETENER';
        } else {
            bgMusic.pause();
            musicToggleBtn.classList.remove('playing');
            if(musicBtnText) musicBtnText.innerText = 'REPRODUCIR';
        }
    });

    openBtn.addEventListener('click', () => {
        // Ocultar sobre animado
        envelopeScreen.classList.add('open');
        
        // Mostrar contenido principal
        invitationContent.classList.remove('hidden');
        
        // Iniciar audio
        bgMusic.play().then(() => {
            musicToggleBtn.classList.add('playing');
            if(musicBtnText) musicBtnText.innerText = 'DETENER';
        }).catch(error => {
            console.log("Audio autoplay was prevented:", error);
            musicToggleBtn.classList.remove('playing');
            if(musicBtnText) musicBtnText.innerText = 'REPRODUCIR';
        });

        // Trigger animations for elements in view
        setTimeout(handleScrollAnimations, 100);
    });

    // 2. Cuenta Regresiva (Viernes 13 de Marzo, 20:00 hrs)
    // Usamos el año actual si ya pasó, usamos el próximo
    const now = new Date();
    let targetYear = now.getFullYear();
    let targetDate = new Date(`${targetYear}-03-13T20:00:00`);
    
    if(now > targetDate) {
        targetDate = new Date(`${targetYear + 1}-03-13T20:00:00`);
    }

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const currentTime = new Date();
        const difference = targetDate - currentTime;

        if (difference > 0) {
            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const m = Math.floor((difference / 1000 / 60) % 60);
            const s = Math.floor((difference / 1000) % 60);

            daysEl.innerText = d < 10 ? '0' + d : d;
            hoursEl.innerText = h < 10 ? '0' + h : h;
            minutesEl.innerText = m < 10 ? '0' + m : m;
            secondsEl.innerText = s < 10 ? '0' + s : s;
        } else {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial

    // 3. Animaciones al hacer scroll (Fade In)
    const sections = document.querySelectorAll('.section');
    
    // Add fade-in class to all sections initially
    sections.forEach(sec => sec.classList.add('fade-in'));

    function handleScrollAnimations() {
        const triggerBottom = window.innerHeight / 5 * 4.5;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScrollAnimations);
});
