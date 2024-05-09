// ? Частицы
// Функция создания случайного числа между min && max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// FСоздание частиц
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = random(2, 6);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${random(0, window.innerWidth)}px`;
    particle.style.top = '-10px';
    particle.style.opacity = random(0.3, 1);
    document.getElementById('particle-container').appendChild(particle);

    // Анимация движения и смены цвета
    const animation = particle.animate([
        { top: '-10px', backgroundColor: '#FFE017' },
        { top: '100vh', backgroundColor: '#B3FF00' }
    ], {
        duration: random(4000, 12000),
        easing: 'linear',
        iterations: 1
    });

    // Убирает частицы после анимацмя или когда ушли за экран
    animation.onfinish = () => {
        particle.remove();
    };
    animation.oncancel = () => {
        particle.remove();
    };
}

// Переодичность создания частиц
setInterval(createParticle, 100);

// Убирает частицы за экраном
setInterval(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            particle.remove();
        }
    });
}, 500);

const linkHolder = document.querySelector(".linkHolder")
const iconAnimation = document.querySelector(".fa-arrow-right")
linkHolder.addEventListener("mouseover", ()=>{
    iconAnimation.classList.add("fa-bounce");
})
linkHolder.addEventListener("mouseleave", ()=>{
    iconAnimation.classList.remove("fa-bounce");
})