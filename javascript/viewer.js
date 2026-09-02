
/* =========================================================
   VIEWER DASHBOARD JAVASCRIPT
   BACKUP & RECOVERY SOLUTIONS
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =========================================
           ELEMENTS
        ========================================= */

        const sidebar =
            document.getElementById("sidebar");

        const menuToggle =
            document.getElementById("menuToggle");

        const logoutBtn =
            document.getElementById("logoutBtn");

        const logoutModal =
            document.getElementById("logoutModal");

        const logoutOverlay =
            document.getElementById("logoutOverlay");

        const cancelLogout =
            document.getElementById("cancelLogout");

        const confirmLogout =
            document.getElementById("confirmLogout");


        /* =========================================
           SIDEBAR TOGGLE
        ========================================= */

        if (menuToggle) {

            menuToggle.addEventListener(
                "click",
                () => {

                    sidebar.classList.toggle(
                        "open"
                    );

                }
            );

        }


        /* =========================================
           CLOSE SIDEBAR AFTER LINK CLICK
        ========================================= */

        const navLinks =
            document.querySelectorAll(
                ".nav-link"
            );


        navLinks.forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        link.classList.add(
                            "active"
                        );


                        if (
                            window.innerWidth <= 850
                        ) {

                            sidebar.classList.remove(
                                "open"
                            );

                        }

                    }
                );

            }
        );


        /* =========================================
           SCROLL ACTIVE NAVIGATION
        ========================================= */

        const sections =
            document.querySelectorAll(
                "section[id], .dashboard-card[id]"
            );


        window.addEventListener(
            "scroll",
            () => {

                let current =
                    "dashboard";


                sections.forEach(
                    section => {

                        const sectionTop =
                            section.offsetTop - 160;


                        if (
                            window.scrollY >=
                            sectionTop
                        ) {

                            current =
                                section.id;

                        }

                    }
                );


                navLinks.forEach(
                    link => {

                        link.classList.remove(
                            "active"
                        );


                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            href ===
                            `#${current}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }
        );


        /* =========================================
           PARTICLES
        ========================================= */

        const particleContainer =
            document.getElementById(
                "particles"
            );


        if (particleContainer) {

            for (
                let i = 0;
                i < 45;
                i++
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );


                const size =
                    Math.random() * 3 + 2;


                particle.style.width =
                    `${size}px`;


                particle.style.height =
                    `${size}px`;


                particle.style.left =
                    `${Math.random() * 100}%`;


                particle.style.animationDuration =
                    `${Math.random() * 12 + 8}s`;


                particle.style.animationDelay =
                    `${Math.random() * 10}s`;


                particleContainer.appendChild(
                    particle
                );

            }

        }


        /* =========================================
           COUNTER ANIMATION
        ========================================= */

        const counters =
            document.querySelectorAll(
                "[data-target]"
            );


        counters.forEach(
            counter => {

                const target =
                    Number(
                        counter.dataset.target
                    );


                let current =
                    0;


                const increment =
                    Math.max(
                        1,
                        Math.ceil(
                            target / 50
                        )
                    );


                const timer =
                    setInterval(
                        () => {

                            current +=
                                increment;


                            if (
                                current >=
                                target
                            ) {

                                current =
                                    target;

                                clearInterval(
                                    timer
                                );

                            }


                            counter.textContent =
                                current;

                        },
                        30
                    );

            }
        );


        /* =========================================
           VIEWER NAME
        ========================================= */

        const viewerName =
            document.getElementById(
                "viewerName"
            );


        const savedEmail =
            localStorage.getItem(
                "userEmail"
            );


        const savedRole =
            localStorage.getItem(
                "userRole"
            );


        if (
            savedEmail &&
            viewerName
        ) {

            const name =
                savedEmail
                    .split("@")[0]
                    .replace(
                        /[._-]/g,
                        " "
                    );


            viewerName.textContent =
                name
                    .split(" ")
                    .map(
                        word =>
                            word.charAt(0)
                                .toUpperCase() +
                            word.slice(1)
                    )
                    .join(" ");

        }


        /* =========================================
           NOTIFICATION
        ========================================= */

        const notificationBtn =
            document.getElementById(
                "notificationBtn"
            );


        if (notificationBtn) {

            notificationBtn.addEventListener(
                "click",
                () => {

                    notificationBtn.classList.add(
                        "notification-clicked"
                    );


                    const dot =
                        document.querySelector(
                            ".notification-dot"
                        );


                    if (dot) {

                        dot.style.display =
                            "none";

                    }


                    setTimeout(
                        () => {

                            alert(
                                "No new critical alerts. Your backup system is healthy."
                            );

                        },
                        100
                    );

                }
            );

        }


        /* =========================================
           LOGOUT MODAL
        ========================================= */

        function openLogoutModal() {

            logoutModal.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        }


        function closeLogoutModal() {

            logoutModal.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                openLogoutModal
            );

        }


        if (cancelLogout) {

            cancelLogout.addEventListener(
                "click",
                closeLogoutModal
            );

        }


        if (logoutOverlay) {

            logoutOverlay.addEventListener(
                "click",
                closeLogoutModal
            );

        }


        /* =========================================
           CONFIRM LOGOUT
        ========================================= */

        if (confirmLogout) {

            confirmLogout.addEventListener(
                "click",
                () => {


                    confirmLogout.disabled =
                        true;


                    confirmLogout.innerHTML = `
                        <i class="fa-solid fa-spinner fa-spin"></i>
                        Logging out...
                    `;


                    setTimeout(
                        () => {


                            /*
                             * Remove current
                             * session information.
                             */

                            localStorage.removeItem(
                                "userEmail"
                            );

                            localStorage.removeItem(
                                "userRole"
                            );


                            /*
                             * Redirect to login.
                             */

                            window.location.href =
                                "login.html";


                        },
                        800
                    );

                }
            );

        }


        /* =========================================
           ESCAPE KEY
        ========================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeLogoutModal();

                }

            }
        );


        /* =========================================
           CARD REVEAL ANIMATION
        ========================================= */

        const cards =
            document.querySelectorAll(
                ".stat-card, .dashboard-card"
            );


        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .12
                }
            );


        cards.forEach(
            card => {

                card.style.opacity =
                    "0";

                card.style.transform =
                    "translateY(25px)";

                card.style.transition =
                    "opacity .6s ease, transform .6s ease";


                observer.observe(card);

            }
        );


        /* =========================================
           VIEW ALL BUTTON
        ========================================= */

        const viewButton =
            document.querySelector(
                ".view-btn"
            );


        if (viewButton) {

            viewButton.addEventListener(
                "click",
                () => {

                    alert(
                        "Viewer access is read-only. Recovery point details are displayed in the dashboard."
                    );

                }
            );

        }


    }
);

