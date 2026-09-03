
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       PRELOADER
    ========================================================= */

    const preloader = document.getElementById("preloader");

    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.classList.add("hide");
            }, 700);
        });
    }


    /* =========================================================
       HEADER SCROLL
    ========================================================= */

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


    /* =========================================================
       MOBILE MENU
    ========================================================= */

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


    /* =========================================================
       SCROLL REVEAL
    ========================================================= */

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


    /* =========================================================
       COUNTERS
    ========================================================= */

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


    /* =========================================================
       FAQ ACCORDION
    ========================================================= */

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


    /* =========================================================
       FAQ RESIZE
    ========================================================= */

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


    /* =========================================================
       CONTACT FORM ELEMENTS
    ========================================================= */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");

    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    const phoneInput =
        document.getElementById("phone");

    const serviceInput =
        document.getElementById("service");

    const messageInput =
        document.getElementById("message");

    const privacyCheckbox =
        document.getElementById("privacy");


    /* =========================================================
       CLEAR ALL ERRORS
    ========================================================= */

    function clearAllErrors() {

        document
            .querySelectorAll(
                ".error-message"
            )
            .forEach(error => {
                error.remove();
            });


        document
            .querySelectorAll(".input-error")
            .forEach(element => {
                element.classList.remove(
                    "input-error"
                );
            });


        document
            .querySelectorAll(
                "[aria-invalid='true']"
            )
            .forEach(element => {
                element.removeAttribute(
                    "aria-invalid"
                );
            });
    }


    /* =========================================================
       SHOW FIELD ERROR
    ========================================================= */

    function showError(input, message) {

        if (!input) return;

        const formGroup =
            input.closest(".form-group");

        if (!formGroup) return;


        /* Remove old error */

        const oldError =
            formGroup.querySelector(
                ".error-message"
            );

        if (oldError) {
            oldError.remove();
        }


        /* Add red border */

        const inputBox =
            formGroup.querySelector(".input-box");

        if (inputBox) {

            inputBox.classList.add(
                "input-error"
            );
        }


        /* Accessibility */

        input.setAttribute(
            "aria-invalid",
            "true"
        );


        /* Create error */

        const error =
            document.createElement("small");

        error.className =
            "error-message";

        error.textContent =
            message;


        formGroup.appendChild(error);
    }


    /* =========================================================
       CLEAR FIELD ERROR
    ========================================================= */

    function clearFieldError(input) {

        if (!input) return;

        const formGroup =
            input.closest(".form-group");

        if (!formGroup) return;


        const inputBox =
            formGroup.querySelector(".input-box");

        if (inputBox) {

            inputBox.classList.remove(
                "input-error"
            );
        }


        input.removeAttribute(
            "aria-invalid"
        );


        formGroup
            .querySelectorAll(
                ".error-message"
            )
            .forEach(error => {
                error.remove();
            });
    }


    /* =========================================================
       PRIVACY ERROR
    ========================================================= */

    function showPrivacyError(message) {

        if (!privacyCheckbox) return;

        const privacy =
            privacyCheckbox.closest(
                ".privacy-check"
            );

        if (!privacy) return;


        const oldError =
            privacy.querySelector(
                ".privacy-error"
            );

        if (oldError) {
            oldError.remove();
        }


        const error =
            document.createElement("small");

        error.className =
            "error-message privacy-error";

        error.textContent =
            message;


        privacy.appendChild(error);
    }


    /* =========================================================
       VALIDATE NAME
    ========================================================= */

    function validateName() {

        if (!nameInput) return false;

        const name =
            nameInput.value.trim();


        if (name === "") {

            showError(
                nameInput,
                "Please enter your full name."
            );

            return false;
        }


        if (name.length < 2) {

            showError(
                nameInput,
                "Name must be at least 2 characters."
            );

            return false;
        }


        if (!/^[A-Za-z\s.'-]+$/.test(name)) {

            showError(
                nameInput,
                "Please enter a valid name."
            );

            return false;
        }


        clearFieldError(nameInput);

        return true;
    }


    /* =========================================================
       VALIDATE EMAIL
    ========================================================= */

    function validateEmail() {

        if (!emailInput) return false;

        const email =
            emailInput.value.trim();


        if (email === "") {

            showError(
                emailInput,
                "Please enter your email address."
            );

            return false;
        }


        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


        if (!emailPattern.test(email)) {

            showError(
                emailInput,
                "Please enter a valid email address."
            );

            return false;
        }


        clearFieldError(emailInput);

        return true;
    }


    /* =========================================================
       VALIDATE INDIAN PHONE
    ========================================================= */

    function validatePhone() {

        if (!phoneInput) return false;

        const phone =
            phoneInput.value.trim();


        if (phone === "") {

            showError(
                phoneInput,
                "Please enter your phone number."
            );

            return false;
        }


        /*
            Accepted:

            9876543210
            +919876543210
            +91 9876543210
            +91-9876543210
        */

        const phonePattern =
            /^(?:\+91[\s-]?)?[6-9][0-9]{9}$/;


        if (!phonePattern.test(phone)) {

            showError(
                phoneInput,
                "Please enter a valid Indian mobile number."
            );

            return false;
        }


        clearFieldError(phoneInput);

        return true;
    }


    /* =========================================================
       VALIDATE SERVICE
    ========================================================= */

    function validateService() {

        if (!serviceInput) return false;

        const service =
            serviceInput.value.trim();


        if (service === "") {

            showError(
                serviceInput,
                "Please select a service."
            );

            return false;
        }


        clearFieldError(serviceInput);

        return true;
    }


    /* =========================================================
       VALIDATE MESSAGE
    ========================================================= */

    function validateMessage() {

        if (!messageInput) return false;

        const message =
            messageInput.value.trim();


        if (message === "") {

            showError(
                messageInput,
                "Please enter your message."
            );

            return false;
        }


        if (message.length < 10) {

            showError(
                messageInput,
                "Message must be at least 10 characters."
            );

            return false;
        }


        clearFieldError(messageInput);

        return true;
    }


    /* =========================================================
       VALIDATE PRIVACY
    ========================================================= */

    function validatePrivacy() {

        if (!privacyCheckbox) return false;

        const privacy =
            privacyCheckbox.closest(
                ".privacy-check"
            );


        if (privacy) {

            const oldError =
                privacy.querySelector(
                    ".privacy-error"
                );

            if (oldError) {
                oldError.remove();
            }
        }


        if (!privacyCheckbox.checked) {

            showPrivacyError(
                "Please accept the privacy policy to continue."
            );

            return false;
        }


        return true;
    }


    /* =========================================================
       FORM SUBMIT
    ========================================================= */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* Clear previous errors */

                clearAllErrors();


                if (formMessage) {

                    formMessage.textContent = "";

                    formMessage.className =
                        "form-message";
                }


                /* Run validation */

                const isNameValid =
                    validateName();

                const isEmailValid =
                    validateEmail();

                const isPhoneValid =
                    validatePhone();

                const isServiceValid =
                    validateService();

                const isMessageValid =
                    validateMessage();

                const isPrivacyValid =
                    validatePrivacy();


                /* Final result */

                const isFormValid =
                    isNameValid &&
                    isEmailValid &&
                    isPhoneValid &&
                    isServiceValid &&
                    isMessageValid &&
                    isPrivacyValid;


                /* =================================================
                   INVALID
                ================================================= */

                if (!isFormValid) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please correct the highlighted fields.";

                        formMessage.classList.add(
                            "error"
                        );
                    }


                    /* Find first invalid field */

                    const firstError =
                        contactForm.querySelector(
                            ".input-error"
                        );


                    if (firstError) {

                        const firstInput =
                            firstError.querySelector(
                                "input, textarea, select"
                            );


                        if (firstInput) {

                            firstInput.focus({
                                preventScroll: true
                            });
                        }


                        firstError.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });


                    } else {

                        const privacyError =
                            contactForm.querySelector(
                                ".privacy-error"
                            );


                        if (privacyError) {

                            privacyError.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });
                        }
                    }


                    return;
                }


                /* =================================================
                   VALID
                ================================================= */

                if (formMessage) {

                    formMessage.textContent =
                        "Form submitted successfully. Redirecting...";

                    formMessage.classList.add(
                        "success"
                    );
                }


                /* Disable button */

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
                        '<span>Redirecting...</span>' +
                        '<i class="fa-solid fa-spinner fa-spin"></i>';
                }


                /* Redirect */

                setTimeout(() => {

                    window.location.href =
                        "404.html";

                }, 700);

            }
        );
    }


    /* =========================================================
       LIVE VALIDATION
    ========================================================= */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            () => {

                if (
                    nameInput.value.trim() !== ""
                ) {

                    clearFieldError(
                        nameInput
                    );
                }

            }
        );
    }


    if (emailInput) {

        emailInput.addEventListener(
            "input",
            () => {

                if (
                    emailInput.value.trim() !== ""
                ) {

                    clearFieldError(
                        emailInput
                    );
                }

            }
        );
    }


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                if (
                    phoneInput.value.trim() !== ""
                ) {

                    clearFieldError(
                        phoneInput
                    );
                }

            }
        );
    }


    if (serviceInput) {

        serviceInput.addEventListener(
            "change",
            () => {

                if (
                    serviceInput.value.trim() !== ""
                ) {

                    clearFieldError(
                        serviceInput
                    );
                }

            }
        );
    }


    if (messageInput) {

        messageInput.addEventListener(
            "input",
            () => {

                if (
                    messageInput.value.trim() !== ""
                ) {

                    clearFieldError(
                        messageInput
                    );
                }

            }
        );
    }


    /* =========================================================
       PRIVACY LIVE VALIDATION
    ========================================================= */

    if (privacyCheckbox) {

        privacyCheckbox.addEventListener(
            "change",
            () => {

                const privacy =
                    privacyCheckbox.closest(
                        ".privacy-check"
                    );

                if (!privacy) return;


                const error =
                    privacy.querySelector(
                        ".privacy-error"
                    );


                if (
                    privacyCheckbox.checked &&
                    error
                ) {

                    error.remove();
                }

            }
        );
    }


    /* =========================================================
       INPUT FOCUS
    ========================================================= */

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


    /* =========================================================
       BACK TO TOP
    ========================================================= */

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


    /* =========================================================
       SMOOTH INTERNAL LINKS
    ========================================================= */

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


    /* =========================================================
       PARALLAX HERO
    ========================================================= */

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


    /* =========================================================
       MOUSE GLOW
    ========================================================= */

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


    /* =========================================================
       SERVICE SELECT EFFECT
    ========================================================= */

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

