/* =========================================================
   BACKUP & RECOVERY SOLUTIONS
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initMobileMenu();

    initHeader();

    initSlider();

    initScrollReveal();

    initCounters();

    initActiveNavigation();

    initBackTop();

});


/* =========================================================
   PRELOADER
========================================================= */

function initPreloader() {

    const preloader =
        document.getElementById("preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 500);

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navbar =
        document.getElementById("navbar");

    if (!menuToggle || !navbar) return;


    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("open");

        const icon =
            menuToggle.querySelector("i");

        if (navbar.classList.contains("open")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    document
        .querySelectorAll(".nav-link, .nav-btn")
        .forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("open");

                const icon =
                    menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            });

        });

}


/* =========================================================
   HEADER SCROLL
========================================================= */

function initHeader() {

    const header =
        document.getElementById("header");

    if (!header) return;


    function checkHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        checkHeader
    );

    checkHeader();

}


/* =========================================================
   HERO SLIDER
========================================================= */

function initSlider() {

    const slides =
        document.querySelectorAll(".hero-slide");

    const nextButton =
        document.getElementById("nextSlide");

    const prevButton =
        document.getElementById("prevSlide");

    const dotsContainer =
        document.getElementById("sliderDots");


    if (!slides.length) return;


    let currentSlide = 0;

    let sliderTimer;


    /* Create dots */

    slides.forEach((_, index) => {

        const dot =
            document.createElement("button");

        dot.className =
            "slider-dot";

        dot.setAttribute(
            "aria-label",
            `Go to slide ${index + 1}`
        );

        dot.addEventListener(
            "click",
            () => {

                goToSlide(index);

                restartSlider();

            }
        );

        dotsContainer.appendChild(dot);

    });


    const dots =
        document.querySelectorAll(".slider-dot");


    function goToSlide(index) {

        slides[currentSlide]
            .classList.remove("active");

        dots[currentSlide]
            .classList.remove("active");


        currentSlide = index;


        slides[currentSlide]
            .classList.add("active");

        dots[currentSlide]
            .classList.add("active");

    }


    function nextSlide() {

        const next =
            (currentSlide + 1) % slides.length;

        goToSlide(next);

    }


    function previousSlide() {

        const previous =
            (currentSlide - 1 + slides.length)
            % slides.length;

        goToSlide(previous);

    }


    function startSlider() {

        sliderTimer =
            setInterval(
                nextSlide,
                6000
            );

    }


    function restartSlider() {

        clearInterval(sliderTimer);

        startSlider();

    }


    nextButton.addEventListener(
        "click",
        () => {

            nextSlide();

            restartSlider();

        }
    );


    prevButton.addEventListener(
        "click",
        () => {

            previousSlide();

            restartSlider();

        }
    );


    dots[0].classList.add("active");

    startSlider();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    if (!revealElements.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList.add("show");

                        observer
                            .unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(".counter");

    if (!counters.length) return;


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );


                    let current = 0;

                    const increment =
                        Math.max(
                            1,
                            Math.ceil(target / 80)
                        );


                    const timer =
                        setInterval(() => {

                            current += increment;


                            if (current >= target) {

                                current = target;

                                clearInterval(timer);

                            }


                            counter.textContent =
                                current.toLocaleString();

                        }, 25);


                    counterObserver
                        .unobserve(counter);

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");


    if (!sections.length) return;


    function updateActiveLink() {

        const scrollPosition =
            window.scrollY + 150;


        sections.forEach(section => {

            const top =
                section.offsetTop;

            const bottom =
                top + section.offsetHeight;


            if (
                scrollPosition >= top &&
                scrollPosition < bottom
            ) {

                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute("href")
                        === `#${section.id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackTop() {

    const backTop =
        document.getElementById("backTop");

    if (!backTop) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                backTop.classList.add("show");

            } else {

                backTop.classList.remove("show");

            }

        }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   PARALLAX HERO
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const hero =
            document.querySelector(".hero");

        if (!hero) return;


        const heroBackgrounds =
            document.querySelectorAll(
                ".hero-bg"
            );


        const scrollValue =
            window.scrollY;


        if (scrollValue < hero.offsetHeight) {

            heroBackgrounds.forEach(bg => {

                bg.style.transform =
                    `scale(1.08) translateY(${scrollValue * 0.08}px)`;

            });

        }

    }
);


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(".btn");

        if (!button) return;


        const ripple =
            document.createElement("span");

        ripple.style.position =
            "absolute";

        ripple.style.width =
            "10px";

        ripple.style.height =
            "10px";

        ripple.style.borderRadius =
            "50%";

        ripple.style.background =
            "rgba(255,255,255,.35)";

        ripple.style.pointerEvents =
            "none";

        ripple.style.transform =
            "scale(0)";

        ripple.style.animation =
            "ripple .6s ease-out";


        const rect =
            button.getBoundingClientRect();


        ripple.style.left =
            `${event.clientX - rect.left}px`;

        ripple.style.top =
            `${event.clientY - rect.top}px`;


        button.style.position =
            "relative";

        button.style.overflow =
            "hidden";


        button.appendChild(ripple);


        setTimeout(() => {

            ripple.remove();

        }, 600);

    }
);


/* =========================================================
   RIPPLE STYLE
========================================================= */

const rippleStyle =
    document.createElement("style");

rippleStyle.textContent = `

@keyframes ripple {

    from {

        transform: scale(0);

        opacity: 1;

    }

    to {

        transform: scale(30);

        opacity: 0;

    }

}

`;

document.head.appendChild(rippleStyle);

/* =========================================================
   BACKUP BANNER SLIDER
========================================================= */

const bannerSlides =
    document.querySelectorAll(".banner-slide");

const bannerDots =
    document.querySelectorAll(".banner-dot");

const bannerPrev =
    document.querySelector(".banner-prev");

const bannerNext =
    document.querySelector(".banner-next");

let bannerCurrent = 0;

let bannerTimer;


/* =========================================================
   SHOW BANNER SLIDE
========================================================= */

function showBannerSlide(index) {

    if (!bannerSlides.length) {
        return;
    }

    if (index >= bannerSlides.length) {
        bannerCurrent = 0;
    }

    if (index < 0) {
        bannerCurrent =
            bannerSlides.length - 1;
    }

    bannerSlides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === bannerCurrent
        );

    });


    bannerDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === bannerCurrent
        );

    });

}


/* =========================================================
   NEXT SLIDE
========================================================= */

function nextBannerSlide() {

    bannerCurrent++;

    if (
        bannerCurrent >=
        bannerSlides.length
    ) {

        bannerCurrent = 0;

    }

    showBannerSlide(
        bannerCurrent
    );

}


/* =========================================================
   PREVIOUS SLIDE
========================================================= */

function previousBannerSlide() {

    bannerCurrent--;

    if (bannerCurrent < 0) {

        bannerCurrent =
            bannerSlides.length - 1;

    }

    showBannerSlide(
        bannerCurrent
    );

}


/* =========================================================
   AUTO SLIDER
========================================================= */

function startBannerSlider() {

    clearInterval(
        bannerTimer
    );

    bannerTimer = setInterval(
        nextBannerSlide,
        5000
    );

}


/* =========================================================
   NEXT BUTTON
========================================================= */

if (bannerNext) {

    bannerNext.addEventListener(
        "click",
        () => {

            nextBannerSlide();

            startBannerSlider();

        }
    );

}


/* =========================================================
   PREVIOUS BUTTON
========================================================= */

if (bannerPrev) {

    bannerPrev.addEventListener(
        "click",
        () => {

            previousBannerSlide();

            startBannerSlider();

        }
    );

}


/* =========================================================
   DOT NAVIGATION
========================================================= */

bannerDots.forEach((dot, index) => {

    dot.addEventListener(
        "click",
        () => {

            bannerCurrent = index;

            showBannerSlide(
                bannerCurrent
            );

            startBannerSlider();

        }
    );

});


/* =========================================================
   INITIALIZE
========================================================= */

if (bannerSlides.length) {

    showBannerSlide(0);

    startBannerSlider();

}