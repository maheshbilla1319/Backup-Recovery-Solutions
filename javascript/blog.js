
/* =====================================================
   BACKUP & RECOVERY SOLUTIONS
   BLOG PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       PRELOADER
    ================================================= */

    const preloader =
        document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 600);

    });


/* =================================================
   MOBILE MENU
================================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("open");

        const isOpen =
            navbar.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

        /* Prevent page scrolling when menu is open */
        document.body.classList.toggle(
            "menu-open",
            isOpen
        );
    });


    /* CLOSE MENU WHEN NAV LINK IS CLICKED */

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            document.body.classList.remove(
                "menu-open"
            );
        });

    });

}



    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    const header =
        document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });



    /* =================================================
       REVEAL ANIMATIONS
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

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


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =================================================
       COUNTERS
    ================================================= */

    const counters =
        document.querySelectorAll(".counter");

    let counterStarted = false;


    function startCounters() {

        if (counterStarted) return;

        counterStarted = true;


        counters.forEach(counter => {

            const target =
                Number(counter.dataset.target);

            let current = 0;

            const duration = 1800;

            const startTime =
                performance.now();


            function updateCounter(time) {

                const progress =
                    Math.min(
                        (time - startTime) / duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(1 - progress, 3);


                current =
                    Math.floor(target * eased);


                counter.textContent =
                    current.toLocaleString();


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target.toLocaleString();

                }

            }


            requestAnimationFrame(
                updateCounter
            );

        });

    }


    const statsSection =
        document.querySelector(".blog-stats");


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    if (entries[0].isIntersecting) {

                        startCounters();

                    }

                },
                {
                    threshold: .35
                }
            );

        statsObserver.observe(statsSection);

    }



    /* =================================================
       FAQ ACCORDION
    ================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");


        question.addEventListener("click", () => {


            faqItems.forEach(other => {

                if (other !== item) {

                    other.classList.remove(
                        "active"
                    );

                }

            });


            item.classList.toggle("active");

        });

    });



    /* =================================================
       REVIEW SLIDER
    ================================================= */

    const reviews =
        document.querySelectorAll(".review-card");

    const prevButton =
        document.getElementById("reviewPrev");

    const nextButton =
        document.getElementById("reviewNext");

    const dotsContainer =
        document.getElementById("sliderDots");


    let reviewIndex = 0;


    /* CREATE DOTS */

    reviews.forEach((_, index) => {

        const dot =
            document.createElement("span");

        dot.className =
            "slider-dot";

        if (index === 0) {

            dot.classList.add("active");

        }

        dot.addEventListener("click", () => {

            showReview(index);

        });

        dotsContainer.appendChild(dot);

    });


    const dots =
        dotsContainer.querySelectorAll(
            ".slider-dot"
        );


    function showReview(index) {

        reviews.forEach(review => {

            review.classList.remove("active");

        });


        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        reviews[index].classList.add("active");

        dots[index].classList.add("active");

        reviewIndex = index;

    }


    nextButton.addEventListener("click", () => {

        reviewIndex++;

        if (reviewIndex >= reviews.length) {

            reviewIndex = 0;

        }

        showReview(reviewIndex);

    });


    prevButton.addEventListener("click", () => {

        reviewIndex--;

        if (reviewIndex < 0) {

            reviewIndex =
                reviews.length - 1;

        }

        showReview(reviewIndex);

    });


    /* AUTO SLIDER */

    let reviewTimer =
        setInterval(() => {

            reviewIndex++;

            if (reviewIndex >= reviews.length) {

                reviewIndex = 0;

            }

            showReview(reviewIndex);

        }, 5000);


    document
        .getElementById("reviewSlider")
        .addEventListener("mouseenter", () => {

            clearInterval(reviewTimer);

        });


    document
        .getElementById("reviewSlider")
        .addEventListener("mouseleave", () => {

            reviewTimer =
                setInterval(() => {

                    reviewIndex++;

                    if (
                        reviewIndex >=
                        reviews.length
                    ) {

                        reviewIndex = 0;

                    }

                    showReview(reviewIndex);

                }, 5000);

        });


/* =================================================
   NEWSLETTER FORM
================================================= */

const newsletterForm =
    document.getElementById("newsletterForm");

const emailInput =
    document.getElementById("newsletterEmail");

const newsletterMessage =
    document.getElementById("newsletterMessage");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                emailInput.value.trim();


            /* =========================
               EMAIL VALIDATION
            ========================= */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            /* Empty email */

            if (email === "") {

                newsletterMessage.textContent =
                    "Please enter your email.";

                newsletterMessage.style.color =
                    "#ef4444";

                emailInput.focus();

                return;
            }


            /* Invalid email */

            if (!emailPattern.test(email)) {

                newsletterMessage.textContent =
                    "Please enter a valid email address.";

                newsletterMessage.style.color =
                    "#ef4444";

                emailInput.focus();

                return;
            }


            /* =========================
               VALID EMAIL
            ========================= */

            newsletterMessage.textContent =
                "Opening Gmail...";

            newsletterMessage.style.color =
                "#22c55e";


            const subject =
                "Newsletter Subscription";


            const body =
                "Hello,\n\n" +
                "I would like to subscribe to the newsletter.\n\n" +
                "My email: " + email;


            /* =========================
               GMAIL URL
            ========================= */

            const gmailURL =
                "404.html?" +
                "view=cm&fs=1" +
                "&su=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(body);


            /* =========================
               OPEN GMAIL
            ========================= */

            const gmailWindow =
                window.open(
                    gmailURL,
                    "_blank"
                );


            /* Popup blocked */

            if (!gmailWindow) {

                newsletterMessage.textContent =
                    "Please allow popups to open Gmail.";

                newsletterMessage.style.color =
                    "#ef4444";

                return;
            }


            /*
             * DO NOT REDIRECT HERE.
             *
             * Gmail Send action cannot be detected
             * from this website.
             */

        }
    );

}



    /* =================================================
       BACK TO TOP
    ================================================= */

    const backTop =
        document.getElementById("backTop");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    });


    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });



    /* =================================================
       IMAGE PARALLAX EFFECT
    ================================================= */

    const heroImage =
        document.querySelector(
            ".blog-hero-image"
        );


    window.addEventListener("mousemove", event => {

        if (!heroImage) return;

        if (window.innerWidth < 850) return;


        const x =
            (window.innerWidth / 2 -
                event.clientX) / 80;


        const y =
            (window.innerHeight / 2 -
                event.clientY) / 100;


        heroImage.style.transform =
            `perspective(1000px)
             rotateY(${x}deg)
             rotateX(${y}deg)`;

    });



    /* =================================================
       CARD TILT EFFECT
    ================================================= */

    const cards =
        document.querySelectorAll(
            ".blog-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 850)
                    return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - .5) * 5;


                const rotateX =
                    ((y / rect.height) - .5) * -5;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });



    /* =================================================
       ACTIVE SECTION NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    window.addEventListener("scroll", () => {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        document
            .querySelectorAll(".nav-link")
            .forEach(link => {

                link.classList.remove(
                    "active"
                );

            });


        const activeLink =
            document.querySelector(
                `.nav-link[href="#${current}"]`
            );


        if (activeLink) {

            activeLink.classList.add(
                "active"
            );

        }

    });



    /* =================================================
       SMOOTH INTERNAL LINKS
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );

                    if (
                        targetId === "#" ||
                        !document.querySelector(
                            targetId
                        )
                    ) {
                        return;
                    }


                    event.preventDefault();


                    const target =
                        document.querySelector(
                            targetId
                        );


                    const headerHeight =
                        header.offsetHeight;


                    const targetPosition =
                        target.offsetTop -
                        headerHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });



    /* =================================================
       RANDOM FLOATING PARTICLES
    ================================================= */

    const hero =
        document.querySelector(
            ".blog-hero"
        );


    if (hero) {

        for (let i = 0; i < 18; i++) {

            const particle =
                document.createElement("span");


            particle.style.position =
                "absolute";

            particle.style.width =
                `${Math.random() * 4 + 2}px`;

            particle.style.height =
                particle.style.width;

            particle.style.borderRadius =
                "50%";

            particle.style.background =
                "rgba(103,232,249,.55)";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.pointerEvents =
                "none";

            particle.style.animation =
                `particleFloat
                 ${Math.random() * 6 + 5}s
                 ease-in-out infinite`;

            particle.style.animationDelay =
                `${Math.random() * 4}s`;


            hero.appendChild(particle);

        }

    }


    /* =================================================
       PARTICLE KEYFRAMES
    ================================================= */

    const particleStyle =
        document.createElement("style");


    particleStyle.textContent = `

        @keyframes particleFloat {

            0%, 100% {
                transform:
                    translate3d(0,0,0);
                opacity: .2;
            }

            50% {
                transform:
                    translate3d(
                        ${Math.random() * 60 - 30}px,
                        -40px,
                        0
                    );
                opacity: .8;
            }

        }

    `;


    document.head.appendChild(
        particleStyle
    );


});

