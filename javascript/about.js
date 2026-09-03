/* =========================================================
   BACKUP & RECOVERY SOLUTIONS
   ABOUT PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initHeader();

    initMobileMenu();

    initScrollReveal();

    initCounters();

    initProgressBars();

    initTechnologySlider();

    initTestimonialSlider();

    initFAQ();

    initBackToTop();

    initSmoothLinks();

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

        }, 700);

    });

}



/* =========================================================
   HEADER
========================================================= */

function initHeader() {

    const header =
        document.getElementById("header");

    if (!header) return;

    function updateHeader() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();

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

        const isOpen =
            navbar.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );


        const icon =
            menuToggle.querySelector("i");

        if (isOpen) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        } else {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    });


    navbar
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navbar.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuToggle.querySelector("i");

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }
            );

        });

}



/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );

    if (!elements.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}



/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );

    if (!counters.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .5
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}



function animateCounter(element) {

    const target =
        Number(
            element.dataset.target
        );

    if (!target) return;


    let current = 0;

    const duration = 1800;

    const startTime =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - startTime) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        current =
            Math.floor(
                target * eased
            );


        element.textContent =
            current.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target.toLocaleString();

        }

    }


    requestAnimationFrame(update);

}



/* =========================================================
   PROGRESS BARS
========================================================= */

function initProgressBars() {

    const bars =
        document.querySelectorAll(
            ".progress span"
        );

    if (!bars.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const bar =
                            entry.target;

                        const progress =
                            bar.dataset.progress;

                        setTimeout(() => {

                            bar.style.width =
                                progress + "%";

                        }, 200);

                        observer.unobserve(
                            bar
                        );

                    }

                });

            },
            {
                threshold: .5
            }
        );


    bars.forEach(bar => {

        observer.observe(bar);

    });

}



/* =========================================================
   TECHNOLOGY SLIDER
========================================================= */

function initTechnologySlider() {

    const track =
        document.getElementById(
            "techTrack"
        );

    const next =
        document.getElementById(
            "techNext"
        );

    const prev =
        document.getElementById(
            "techPrev"
        );

    if (!track || !next || !prev) return;


    const slides =
        track.querySelectorAll(
            ".tech-slide"
        );


    let currentIndex = 0;


    function getVisibleSlides() {

        if (window.innerWidth <= 600) {

            return 1;

        }

        if (window.innerWidth <= 1100) {

            return 2;

        }

        return 3;

    }


    function updateSlider() {

        const visible =
            getVisibleSlides();

        const maxIndex =
            Math.max(
                slides.length -
                visible,
                0
            );


        if (currentIndex > maxIndex) {

            currentIndex =
                maxIndex;

        }


        const gap = 22;

        const slideWidth =
            slides[0].offsetWidth +
            gap;


        track.style.transform =
            `translateX(-${
                currentIndex *
                slideWidth
            }px)`;

    }


    next.addEventListener(
        "click",
        () => {

            const visible =
                getVisibleSlides();

            const maxIndex =
                Math.max(
                    slides.length -
                    visible,
                    0
                );


            if (
                currentIndex <
                maxIndex
            ) {

                currentIndex++;

            } else {

                currentIndex = 0;

            }

            updateSlider();

        }
    );


    prev.addEventListener(
        "click",
        () => {

            const visible =
                getVisibleSlides();

            const maxIndex =
                Math.max(
                    slides.length -
                    visible,
                    0
                );


            if (
                currentIndex > 0
            ) {

                currentIndex--;

            } else {

                currentIndex =
                    maxIndex;

            }

            updateSlider();

        }
    );


    window.addEventListener(
        "resize",
        updateSlider
    );


    /* Auto moving */

    let autoSlide =
        setInterval(() => {

            next.click();

        }, 4500);


    const slider =
        document.querySelector(
            ".tech-slider"
        );


    slider.addEventListener(
        "mouseenter",
        () => {

            clearInterval(
                autoSlide
            );

        }
    );


    slider.addEventListener(
        "mouseleave",
        () => {

            autoSlide =
                setInterval(() => {

                    next.click();

                }, 4500);

        }
    );


    setTimeout(
        updateSlider,
        300
    );

}



/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

function initTestimonialSlider() {

    const track =
        document.getElementById(
            "testimonialTrack"
        );

    const dots =
        document.querySelectorAll(
            "#testimonialDots .dot"
        );

    if (!track || !dots.length) return;


    const slides =
        track.querySelectorAll(
            ".testimonial-card"
        );

    let index = 0;


    function showSlide(newIndex) {

        index = newIndex;

        track.style.transform =
            `translateX(-${
                index * 100
            }%)`;


        dots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === index
                );

            }
        );

    }


    dots.forEach(
        (dot, i) => {

            dot.addEventListener(
                "click",
                () => {

                    showSlide(i);

                }
            );

        }
    );


    setInterval(() => {

        index =
            (index + 1) %
            slides.length;

        showSlide(index);

    }, 5000);

}



/* =========================================================
   FAQ ACCORDION
========================================================= */

function initFAQ() {

    const items =
        document.querySelectorAll(
            ".faq-item"
        );

    if (!items.length) return;


    items.forEach(item => {

        const button =
            item.querySelector(
                ".faq-question"
            );


        button.addEventListener(
            "click",
            () => {

                const wasActive =
                    item.classList.contains(
                        "active"
                    );


                items.forEach(
                    other => {

                        other.classList.remove(
                            "active"
                        );

                    }
                );


                if (!wasActive) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    });

}



/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backTop"
        );

    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY >
                500
            ) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }
    );


    button.addEventListener(
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
   SMOOTH INTERNAL LINKS
========================================================= */

function initSmoothLinks() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;


                    event.preventDefault();


                    const headerHeight =
                        document
                            .getElementById(
                                "header"
                            )
                            ?.offsetHeight || 0;


                    const tickerHeight =
                        document.querySelector(
                            ".security-ticker"
                        )
                            ?.offsetHeight || 0;


                    const position =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        tickerHeight -
                        10;


                    window.scrollTo({

                        top: position,

                        behavior: "smooth"

                    });

                }
            );

        });

}



/* =========================================================
   ACTIVE NAV ON SCROLL
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >=
                sectionTop &&
                window.scrollY <
                sectionTop +
                sectionHeight
            ) {

                current =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href ===
                "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);