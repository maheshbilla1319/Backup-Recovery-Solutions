
/* =========================================================
   BACKUP & RECOVERY SOLUTIONS
   CONTACT PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.classList.add("hide");
            }, 700);
        });
    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    function headerScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", headerScroll);
    headerScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navbar.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });


        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });

        });
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
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

    } else {

        revealElements.forEach(element => {
            element.classList.add("show");
        });
    }


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    let counterStarted = false;

    function animateCounters() {

        if (
            counterStarted ||
            counters.length === 0
        ) {
            return;
        }

        const statsSection =
            document.querySelector(".contact-stats");

        if (!statsSection) return;

        const rect =
            statsSection.getBoundingClientRect();

        if (
            rect.top <
            window.innerHeight * 0.85
        ) {

            counterStarted = true;

            counters.forEach(counter => {

                const target =
                    Number(counter.dataset.target);

                if (isNaN(target)) return;

                const duration = 1800;
                const startTime = performance.now();

                function updateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );

                    const current =
                        target * progress;

                    counter.textContent =
                        Math.floor(current)
                            .toLocaleString();

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
    }

    window.addEventListener(
        "scroll",
        animateCounters
    );

    animateCounters();


    /* =====================================================
       FAQ ACCORDION
       ONE ITEM AT A TIME
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    function openFAQ(item) {

        const answer =
            item.querySelector(".faq-answer");

        const icon =
            item.querySelector(".faq-question i");

        if (!answer) return;

        item.classList.add("active");

        answer.style.maxHeight =
            answer.scrollHeight + "px";

        if (icon) {
            icon.style.transform =
                "rotate(45deg)";
        }
    }


    function closeFAQ(item) {

        const answer =
            item.querySelector(".faq-answer");

        const icon =
            item.querySelector(".faq-question i");

        if (!answer) return;

        item.classList.remove("active");

        answer.style.maxHeight = "0px";

        if (icon) {
            icon.style.transform =
                "rotate(0deg)";
        }
    }


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        if (!question) return;


        if (item.classList.contains("active")) {
            openFAQ(item);
        } else {
            closeFAQ(item);
        }


        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            faqItems.forEach(otherItem => {
                closeFAQ(otherItem);
            });


            if (!isActive) {
                openFAQ(item);
            }

        });

    });


    /* =====================================================
       FAQ HEIGHT UPDATE ON RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {

        const activeItem =
            document.querySelector(
                ".faq-item.active"
            );

        if (!activeItem) return;

        const activeAnswer =
            activeItem.querySelector(
                ".faq-answer"
            );

        if (activeAnswer) {

            activeAnswer.style.maxHeight =
                activeAnswer.scrollHeight + "px";
        }
    });


/* =====================================================
   CONTACT FORM
   VALIDATION + 404 REDIRECT
===================================================== */

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const serviceInput = document.getElementById("service");
const messageInput = document.getElementById("message");

const privacyCheckbox = document.querySelector(".privacy-check input");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Check all required fields
    if (
        nameInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        phoneInput.value.trim() === "" ||
        serviceInput.value.trim() === "" ||
        messageInput.value.trim() === "" ||
        !privacyCheckbox.checked
    ) {

        formMessage.textContent =
            "Please fill in all fields and accept the privacy policy.";

        formMessage.style.color = "red";

        return;
    }

    // All fields are filled → redirect to 404.html
    window.location.href = "404.html";
});

    /* =====================================================
       SHOW FIELD ERROR
    ===================================================== */

    function showError(input, message) {

        if (!input) return;

        const formGroup =
            input.closest(".form-group");

        if (!formGroup) return;

        const inputBox =
            formGroup.querySelector(".input-box");

        if (inputBox) {
            inputBox.classList.add("input-error");
        }

        const error =
            document.createElement("small");

        error.className =
            "error-message";

        error.textContent =
            message;

        formGroup.appendChild(error);
    }


    /* =====================================================
       SHOW PRIVACY ERROR
    ===================================================== */

    function showPrivacyError(message) {

        const privacy =
            document.querySelector(
                ".privacy-check"
            );

        if (!privacy) return;

        const error =
            document.createElement("small");

        error.className =
            "error-message privacy-error";

        error.textContent =
            message;

        privacy.appendChild(error);
    }


    /* =====================================================
       CONTACT FORM SUBMIT
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (e) {

                /*
                   IMPORTANT:
                   Stop normal form submission.
                   We validate first.
                */

                e.preventDefault();


                /* =========================================
                   REMOVE OLD ERRORS
                ========================================= */

                document
                    .querySelectorAll(".error-message")
                    .forEach(error => {
                        error.remove();
                    });


                document
                    .querySelectorAll(".input-error")
                    .forEach(input => {

                        input.classList.remove(
                            "input-error"
                        );
                    });


                if (formMessage) {

                    formMessage.textContent = "";

                    formMessage.className =
                        "form-message";
                }


                let isValid = true;


                /* =========================================
                   NAME VALIDATION
                ========================================= */

                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                if (name === "") {

                    showError(
                        nameInput,
                        "Please enter your full name."
                    );

                    isValid = false;

                } else if (name.length < 3) {

                    showError(
                        nameInput,
                        "Name must be at least 3 characters."
                    );

                    isValid = false;

                } else if (
                    !/^[A-Za-z\s.'-]+$/.test(name)
                ) {

                    showError(
                        nameInput,
                        "Please enter a valid name."
                    );

                    isValid = false;
                }


                /* =========================================
                   EMAIL VALIDATION
                ========================================= */

                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";


                /*
                   Correct email regex
                */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


                if (email === "") {

                    showError(
                        emailInput,
                        "Please enter your email address."
                    );

                    isValid = false;

                } else if (
                    !emailPattern.test(email)
                ) {

                    showError(
                        emailInput,
                        "Please enter a valid email address."
                    );

                    isValid = false;
                }


                /* =========================================
                   PHONE VALIDATION
                   OPTIONAL
                ========================================= */

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";


                if (phone !== "") {

                    const phonePattern =
                        /^[+]?[0-9\s()-]{10,15}$/;


                    if (
                        !phonePattern.test(phone)
                    ) {

                        showError(
                            phoneInput,
                            "Please enter a valid phone number."
                        );

                        isValid = false;
                    }
                }


                /* =========================================
                   SERVICE VALIDATION
                ========================================= */

                const service =
                    serviceInput
                        ? serviceInput.value.trim()
                        : "";


                if (service === "") {

                    showError(
                        serviceInput,
                        "Please select a service."
                    );

                    isValid = false;
                }


                /* =========================================
                   MESSAGE VALIDATION
                ========================================= */

                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


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


                /* =========================================
                   PRIVACY CHECKBOX
                ========================================= */

                if (
                    privacyCheckbox &&
                    !privacyCheckbox.checked
                ) {

                    showPrivacyError(
                        "Please accept the privacy policy."
                    );

                    isValid = false;
                }


                /* =========================================
                   INVALID FORM
                   DO NOT OPEN GMAIL
                   DO NOT REDIRECT
                ========================================= */

                if (!isValid) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please correct the errors and try again.";

                        formMessage.classList.add(
                            "error"
                        );
                    }

                    return;
                }


                /* =========================================
                   VALID FORM
                ========================================= */

                if (formMessage) {

                    formMessage.textContent =
                        "Form validated successfully. Opening Gmail...";

                    formMessage.classList.add(
                        "success"
                    );
                }


                /* =========================================
                   DISABLE SUBMIT BUTTON
                ========================================= */

                const submitButton =
                    contactForm.querySelector(
                        ".submit-btn"
                    );


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.style.opacity =
                        "0.7";

                    submitButton.style.cursor =
                        "not-allowed";

                    submitButton.innerHTML =
                        '<span>Opening Gmail...</span>' +
                        '<i class="fa-solid fa-spinner fa-spin"></i>';
                }


                /* =========================================
                   GMAIL COMPOSE MESSAGE
                ========================================= */

                const subject =
                    "New Contact Form Message";


                const body =
                    "Hello,\n\n" +
                    "I would like to contact you.\n\n" +
                    "Name: " +
                    name +
                    "\n\n" +
                    "Email: " +
                    email +
                    "\n\n" +
                    "Phone: " +
                    (phone || "Not provided") +
                    "\n\n" +
                    "Service: " +
                    service +
                    "\n\n" +
                    "Message:\n" +
                    message;


                /* =========================================
                   GMAIL COMPOSE URL

                   IMPORTANT:
                   No markdown.
                   No [ ] or ( ).
                ========================================= */

                const gmailURL =
                    "https://mail.google.com/mail/?" +
                    "view=cm&fs=1" +
                    "&su=" +
                    encodeURIComponent(subject) +
                    "&body=" +
                    encodeURIComponent(body);


                /* =========================================
                   OPEN GMAIL
                ========================================= */

                const gmailWindow =
                    window.open(
                        gmailURL,
                        "_blank"
                    );


                /* =========================================
                   POPUP BLOCKED
                ========================================= */

                if (!gmailWindow) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please allow popups to open Gmail.";

                        formMessage.className =
                            "form-message error";
                    }


                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.style.opacity =
                            "1";

                        submitButton.style.cursor =
                            "pointer";

                        submitButton.innerHTML =
                            '<span>Submit</span>' +
                            '<i class="fa-solid fa-paper-plane"></i>';
                    }

                    return;
                }


                /* =========================================
                   REDIRECT TO 404.HTML

                   Flow:
                   1. User fills form
                   2. Validation runs
                   3. If valid -> Gmail opens
                   4. Wait 1.5 seconds
                   5. Website redirects to 404.html

                   Invalid form:
                   Gmail will NOT open
                   404.html will NOT open
                ========================================= */

                setTimeout(() => {

                    window.location.href =
                        "404.html";

                }, 1500);

            }
        );
    }


    /* =====================================================
       REMOVE FIELD ERROR WHILE TYPING
    ===================================================== */

    [
        nameInput,
        emailInput,
        phoneInput,
        messageInput
    ].forEach(input => {

        if (!input) return;


        input.addEventListener(
            "input",
            () => {

                const formGroup =
                    input.closest(
                        ".form-group"
                    );

                if (!formGroup) return;


                const inputBox =
                    formGroup.querySelector(
                        ".input-box"
                    );


                if (inputBox) {

                    inputBox.classList.remove(
                        "input-error"
                    );
                }


                const error =
                    formGroup.querySelector(
                        ".error-message"
                    );


                if (error) {
                    error.remove();
                }

            }
        );
    });


    /* =====================================================
       SERVICE ERROR REMOVE
    ===================================================== */

    if (serviceInput) {

        serviceInput.addEventListener(
            "change",
            () => {

                const formGroup =
                    serviceInput.closest(
                        ".form-group"
                    );

                if (!formGroup) return;


                const inputBox =
                    formGroup.querySelector(
                        ".input-box"
                    );


                if (inputBox) {

                    inputBox.classList.remove(
                        "input-error"
                    );
                }


                const error =
                    formGroup.querySelector(
                        ".error-message"
                    );


                if (error) {
                    error.remove();
                }

            }
        );
    }


    /* =====================================================
       PRIVACY ERROR REMOVE
    ===================================================== */

    if (privacyCheckbox) {

        privacyCheckbox.addEventListener(
            "change",
            () => {

                const privacy =
                    document.querySelector(
                        ".privacy-check"
                    );

                if (!privacy) return;


                const error =
                    privacy.querySelector(
                        ".privacy-error"
                    );


                if (error) {
                    error.remove();
                }

            }
        );
    }


    /* =====================================================
       INPUT FOCUS ANIMATION
    ===================================================== */

    const inputs =
        document.querySelectorAll(
            ".input-box input, " +
            ".input-box textarea, " +
            ".input-box select"
        );


    inputs.forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                const box =
                    input.closest(
                        ".input-box"
                    );

                if (box) {

                    box.classList.add(
                        "focused"
                    );
                }
            }
        );


        input.addEventListener(
            "blur",
            () => {

                const box =
                    input.closest(
                        ".input-box"
                    );

                if (box) {

                    box.classList.remove(
                        "focused"
                    );
                }
            }
        );

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById("backTop");


    if (backTop) {

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
    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

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
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    let target = null;


                    try {

                        target =
                            document.querySelector(
                                targetId
                            );

                    } catch (error) {

                        return;
                    }


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


    if (heroBackground) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollValue =
                    window.scrollY;


                if (scrollValue < 800) {

                    heroBackground.style.transform =
                        `scale(1.03) translateY(${scrollValue * 0.12}px)`;
                }
            }
        );
    }


    /* =====================================================
       MOUSE GLOW EFFECT
    ===================================================== */

    const hero =
        document.querySelector(
            ".contact-hero"
        );


    if (hero) {

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
    }


    /* =====================================================
       SERVICE SELECT EFFECT
    ===================================================== */

    const service =
        document.getElementById("service");


    if (service) {

        service.addEventListener(
            "change",
            () => {

                const inputBox =
                    service.closest(
                        ".input-box"
                    );

                if (!inputBox) return;


                if (service.value !== "") {

                    inputBox.style.borderColor =
                        "#2563eb";

                } else {

                    inputBox.style.borderColor =
                        "";
                }

            }
        );
    }

});

