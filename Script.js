```javascript
/* ==========================================
   MONSTER OPEN SEA ODYSSEY
   VERSION 2
========================================== */


/* ==========================================
   LOADING SCREEN
========================================== */

document.body.classList.add("loading");

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        loader.classList.add("hidden");

        document.body.classList.remove("loading");

    }, 2300);

});


/* ==========================================
   NAVIGATION
========================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ==========================================
   MOBILE MENU
========================================== */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ==========================================
   NUMBER COUNTERS
========================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const duration = 1600;

            const startTime = performance.now();


            function updateCounter(currentTime) {

                const progress =
                    Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                const eased =
                    1 - Math.pow(1 - progress, 3);

                current = Math.floor(target * eased);

                counter.textContent = current;

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            }


            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);

        });

    },

    {
        threshold: 0.5
    }

);


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* ==========================================
   PARTICLE SYSTEM
========================================== */

const canvas = document.getElementById("particles");

const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null
};


function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}


resizeCanvas();

window.addEventListener("resize", resizeCanvas);


window.addEventListener("mousemove", event => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});


window.addEventListener("mouseleave", () => {

    mouse.x = null;
    mouse.y = null;

});


class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        this.size =
            Math.random() * 1.8 + 0.3;

        this.speedX =
            (Math.random() - 0.5) * 0.4;

        this.speedY =
            (Math.random() - 0.5) * 0.4;

        this.alpha =
            Math.random() * 0.5 + 0.1;

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;


        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.x > canvas.width) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = canvas.height;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }


        if (mouse.x !== null) {

            const dx = this.x - mouse.x;

            const dy = this.y - mouse.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);


            if (distance < 120) {

                const force =
                    (120 - distance) / 120;

                this.x += dx * force * 0.025;

                this.y += dy * force * 0.025;

            }

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(182,255,0,${this.alpha})`;

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 700
            ? 40
            : 90;


    for (let i = 0; i < amount; i++) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();

window.addEventListener(
    "resize",
    createParticles
);


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(particle => {

        particle.update();

        particle.draw();

    });


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* ==========================================
   MOUSE PARALLAX HERO
========================================== */

const hero = document.querySelector(".hero");
const heroBackground =
    document.querySelector(".hero-background");
const heroContent =
    document.querySelector(".hero-content");


hero.addEventListener("mousemove", event => {

    const rect =
        hero.getBoundingClientRect();

    const x =
        (event.clientX - rect.left) /
        rect.width;

    const y =
        (event.clientY - rect.top) /
        rect.height;


    const moveX =
        (x - 0.5) * 15;

    const moveY =
        (y - 0.5) * 15;


    heroBackground.style.transform =
        `scale(1.08) translate(${moveX}px, ${moveY}px)`;


    heroContent.style.transform =
        `translate(${moveX * -0.15}px, ${moveY * -0.15}px)`;

});


hero.addEventListener("mouseleave", () => {

    heroBackground.style.transform =
        "scale(1.08)";

    heroContent.style.transform =
        "translate(0,0)";

});


/* ==========================================
   3D CARD EFFECT
========================================== */

const cards =
    document.querySelectorAll(".journey-card");


cards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            (y - centerY) / 20;

        const rotateY =
            (centerX - x) / 20;


        card.style.transform =
            `translateY(-10px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0) rotateX(0) rotateY(0)";

    });

});


/* ==========================================
   SMOOTH ANCHOR SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* ==========================================
   ROUTE ANIMATION
========================================== */

const routeMap =
    document.querySelector(".route-map");


const routeProgress =
    document.querySelector(".route-progress");


if (routeMap && routeProgress) {

    window.addEventListener("scroll", () => {

        const rect =
            routeMap.getBoundingClientRect();

        const windowHeight =
            window.innerHeight;


        const visible =
            1 -
            Math.max(
                0,
                Math.min(
                    1,
                    rect.top / windowHeight
                )
            );


        if (visible > 0 && visible < 1.2) {

            routeProgress.style.animationPlayState =
                "running";

        }

    });

}


/* ==========================================
   RANDOM ENERGY FLASH
========================================== */

function energyFlash() {

    const flash =
        document.createElement("div");

    flash.style.position = "fixed";
    flash.style.inset = "0";
    flash.style.pointerEvents = "none";
    flash.style.zIndex = "9998";

    flash.style.background =
        "rgba(182,255,0,0.025)";

    flash.style.opacity = "0";

    document.body.appendChild(flash);


    flash.animate(

        [
            {
                opacity: 0
            },

            {
                opacity: 1
            },

            {
                opacity: 0
            }
        ],

        {
            duration: 350,
            easing: "ease-out"
        }

    );


    setTimeout(() => {

        flash.remove();

    }, 400);

}


setInterval(() => {

    if (Math.random() > 0.55) {

        energyFlash();

    }

}, 7000);


/* ==========================================
   KEYBOARD SHORTCUT
========================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        mobileMenu.classList.remove("active");

    }

});


/* ==========================================
   PAGE READY
========================================== */

console.log(
    "%c MONSTER // OPEN SEA ODYSSEY ",
    "background:#b6ff00;color:#000;font-size:16px;font-weight:bold;padding:8px;"
);

console.log(
    "30 KM • GERMANY → DENMARK"
);
```
