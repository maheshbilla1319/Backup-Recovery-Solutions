/* =========================================================
   BACKUP & RECOVERY SOLUTIONS
   CONTACT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader =
        document.getElementById("preloader");


    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 700);

    });



    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header =
        document.getElementById("header");


    function headerScroll() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        headerScroll
    );


    headerScroll();



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navbar =
        document.getElementById("navbar");


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


    document.querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("open");

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

            });

        });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
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



    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    let counterStarted = false;


    function animateCounters() {

        if (counterStarted) return;


        const statsSection =
            document.querySelector(
                ".contact-stats"
            );


        if (!statsSection) return;


        const rect =
            statsSection.getBoundingClientRect();


        if (
            rect.top <
            window.innerHeight * .85
        ) {

            counterStarted = true;


            counters.forEach(counter => {

                const target =
                    Number(
                        counter.dataset.target
                    );

                let current = 0;

                const duration = 1800;

                const increment =
                    target / (duration / 16);


                function updateCounter() {

                    current += increment;


                    if (current >= target) {

                        counter.textContent =
                            target.toLocaleString();

                        return;

                    }


                    counter.textContent =
                        Math.floor(
                            current
                        ).toLocaleString();


                    requestAnimationFrame(
                        updateCounter
                    );

                }


                updateCounter();

            });

        }

    }


    window.addEventListener(
        "scroll",
        animateCounters
    );


    animateCounters();



    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        question.addEventListener(
            "click",
            () => {


                faqItems.forEach(otherItem => {

                    if (
                        otherItem !== item
                    ) {

                        otherItem.classList.remove(
                            "active"
                        );

                    }

                });


                item.classList.toggle(
                    "active"
                );

            }
        );

    });



    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                formMessage.textContent =
                    "Please complete all required fields.";

                formMessage.style.color =
                    "#dc2626";

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                formMessage.style.color =
                    "#dc2626";

                return;

            }


            formMessage.textContent =
                "✓ Message ready to be sent securely. Our team will contact you soon.";

            formMessage.style.color =
                "#16a34a";


            contactForm.reset();


            setTimeout(() => {

                formMessage.textContent = "";

            }, 6000);

        }
    );



    /* =====================================================
       INPUT FOCUS ANIMATION
    ===================================================== */

    const inputs =
        document.querySelectorAll(
            ".input-box input, .input-box textarea, .input-box select"
        );


    inputs.forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                input
                    .closest(".input-box")
                    .classList.add("focused");

            }
        );


        input.addEventListener(
            "blur",
            () => {

                input
                    .closest(".input-box")
                    .classList.remove("focused");

            }
        );

    });



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById(
            "backTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );

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



    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const targetId =
                    anchor.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#" ||
                    targetId === ""
                ) return;


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });



    /* =====================================================
       PARALLAX HERO
    ===================================================== */

    const heroBackground =
        document.querySelector(
            ".hero-background"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (!heroBackground) return;


            const scrollValue =
                window.scrollY;


            if (scrollValue < 800) {

                heroBackground.style.transform =
                    `scale(1.03) translateY(${scrollValue * 0.12}px)`;

            }

        }
    );



    /* =====================================================
       MOUSE GLOW EFFECT
    ===================================================== */

    const hero =
        document.querySelector(
            ".contact-hero"
        );


    hero.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                    window.innerWidth) *
                100;


            const y =
                (event.clientY /
                    window.innerHeight) *
                100;


            hero.style.setProperty(
                "--mouse-x",
                `${x}%`
            );


            hero.style.setProperty(
                "--mouse-y",
                `${y}%`
            );

        }
    );



    /* =====================================================
       SERVICE SELECT EFFECT
    ===================================================== */

    const service =
        document.getElementById(
            "service"
        );


    service.addEventListener(
        "change",
        () => {

            if (service.value !== "") {

                service.closest(
                    ".input-box"
                ).style.borderColor =
                    "#2563eb";

            }

        }
    );


});



document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const serviceInput = document.getElementById("service");
    const messageInput = document.getElementById("message");

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let isValid = true;

        // Clear previous errors
        document.querySelectorAll(".error-message").forEach(error => {
            error.remove();
        });

        document.querySelectorAll(".input-box").forEach(box => {
            box.classList.remove("input-error");
        });

        formMessage.textContent = "";
        formMessage.className = "form-message";


        // =========================
        // NAME VALIDATION
        // =========================

        const name = nameInput.value.trim();

        if (name === "") {

            showError(nameInput, "Please enter your full name.");
            isValid = false;

        } else if (name.length < 3) {

            showError(nameInput, "Name must be at least 3 characters.");
            isValid = false;

        } else if (!/^[A-Za-z\s]+$/.test(name)) {

            showError(nameInput, "Name can contain only letters.");
            isValid = false;
        }


        // =========================
        // EMAIL VALIDATION
        // =========================

        const email = emailInput.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {

            showError(emailInput, "Please enter your email address.");
            isValid = false;

        } else if (!emailPattern.test(email)) {

            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }


        // =========================
        // PHONE VALIDATION
        // =========================

        const phone = phoneInput.value.trim();

        if (phone !== "") {

            const phonePattern =
                /^[+]?[0-9\s()-]{10,15}$/;

            if (!phonePattern.test(phone)) {

                showError(
                    phoneInput,
                    "Please enter a valid phone number."
                );

                isValid = false;
            }
        }


        // =========================
        // SERVICE VALIDATION
        // =========================

        if (serviceInput.value === "") {

            showError(
                serviceInput,
                "Please select a service."
            );

            isValid = false;
        }


        // =========================
        // MESSAGE VALIDATION
        // =========================

        const message = messageInput.value.trim();

        if (message === "") {

            showError(
                messageInput,
                "Please enter your message."
            );

            isValid = false;

        } else if (message.length < 10) {

            showError(
                messageInput,
                "Message must be at least 10 characters."
            );

            isValid = false;
        }


        // =========================
        // PRIVACY CHECKBOX
        // =========================

        const privacyCheckbox =
            document.querySelector(".privacy-check input");

        if (!privacyCheckbox.checked) {

            showError(
                privacyCheckbox,
                "Please accept the privacy policy."
            );

            isValid = false;
        }


        // =========================
        // INVALID FORM
        // =========================

        if (!isValid) {

            formMessage.textContent =
                "Please correct the errors and try again.";

            formMessage.classList.add("error");

            return;
        }


        // =========================
        // SUCCESS
        // =========================

        formMessage.textContent =
            "Message submitted successfully! Redirecting...";

        formMessage.classList.add("success");


        // Disable button
        const submitButton =
            contactForm.querySelector(".submit-btn");

        submitButton.disabled = true;

        submitButton.innerHTML =
            'Submitting... <i class="fa-solid fa-spinner fa-spin"></i>';


        // =========================
        // REDIRECT TO 404.HTML
        // =========================

        setTimeout(() => {

            window.location.href = "404.html";

        }, 1500);

    });


    // =========================
    // ERROR FUNCTION
    // =========================

    function showError(input, message) {

        const formGroup = input.closest(".form-group");

        if (formGroup) {

            const inputBox =
                formGroup.querySelector(".input-box");

            if (inputBox) {
                inputBox.classList.add("input-error");
            }

            const error = document.createElement("small");

            error.className = "error-message";
            error.textContent = message;

            formGroup.appendChild(error);

        } else {

            const privacy =
                input.closest(".privacy-check");

            if (privacy) {

                const error =
                    document.createElement("small");

                error.className = "error-message";
                error.textContent = message;

                privacy.appendChild(error);
            }
        }
    }


    // =========================
    // REMOVE ERROR WHILE TYPING
    // =========================

    [
        nameInput,
        emailInput,
        phoneInput,
        serviceInput,
        messageInput
    ].forEach(input => {

        input.addEventListener("input", () => {

            const formGroup =
                input.closest(".form-group");

            if (formGroup) {

                const inputBox =
                    formGroup.querySelector(".input-box");

                if (inputBox) {
                    inputBox.classList.remove("input-error");
                }

                const error =
                    formGroup.querySelector(".error-message");

                if (error) {
                    error.remove();
                }
            }
        });
    });

});