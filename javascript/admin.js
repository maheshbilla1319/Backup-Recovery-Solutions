
/* =====================================================
   BACKUP & RECOVERY SOLUTIONS
   ADMIN DASHBOARD JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTS
    ================================================= */

    const sidebar =
        document.getElementById("sidebar");

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const closeNotifications =
        document.getElementById("closeNotifications");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const searchInput =
        document.getElementById("dashboardSearch");


    /* =================================================
       SIDEBAR TOGGLE
    ================================================= */

    function openSidebar() {

        sidebar.classList.add("open");

        sidebarOverlay.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("show");

        document.body.style.overflow = "";

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            openSidebar
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =================================================
       NAVIGATION
    ================================================= */

    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {

                item.classList.remove("active");

            });

            link.classList.add("active");

            if (window.innerWidth <= 900) {

                closeSidebar();

            }

        });

    });


    /* =================================================
       NOTIFICATION PANEL
    ================================================= */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                notificationPanel.classList.toggle(
                    "show"
                );

            }
        );

    }


    if (closeNotifications) {

        closeNotifications.addEventListener(
            "click",
            () => {

                notificationPanel.classList.remove(
                    "show"
                );

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (
                notificationPanel &&
                !notificationPanel.contains(event.target) &&
                !notificationBtn.contains(event.target)
            ) {

                notificationPanel.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const counters =
        document.querySelectorAll(".counter");


    function animateCounter(counter) {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const duration = 1800;

        const startTime =
            performance.now();


        function update(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const eased =
                1 - Math.pow(1 - progress, 3);


            current =
                Math.floor(target * eased);


            counter.textContent =
                current.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(update);

            }

        }


        requestAnimationFrame(update);

    }


    /* =================================================
       INTERSECTION OBSERVER
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* =================================================
       COUNTER OBSERVER
    ================================================= */

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
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

        counterObserver.observe(counter);

    });


    /* =================================================
       BACKUP LINE CHART
    ================================================= */

    const backupCanvas =
        document.getElementById("backupChart");


    if (backupCanvas) {

        const ctx =
            backupCanvas.getContext("2d");


        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                300
            );


        gradient.addColorStop(
            0,
            "rgba(37,99,235,.25)"
        );


        gradient.addColorStop(
            1,
            "rgba(37,99,235,0)"
        );


        new Chart(
            ctx,
            {

                type: "line",

                data: {

                    labels: [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun"
                    ],

                    datasets: [

                        {

                            label:
                                "Backups",

                            data: [
                                320,
                                450,
                                390,
                                570,
                                490,
                                680,
                                760
                            ],

                            borderColor:
                                "#2563eb",

                            backgroundColor:
                                gradient,

                            borderWidth: 3,

                            fill: true,

                            tension: .45,

                            pointRadius: 4,

                            pointHoverRadius: 7,

                            pointBackgroundColor:
                                "#2563eb"

                        },

                        {

                            label:
                                "Recoveries",

                            data: [
                                180,
                                250,
                                220,
                                310,
                                280,
                                350,
                                390
                            ],

                            borderColor:
                                "#06b6d4",

                            borderWidth: 2,

                            fill: false,

                            tension: .45,

                            pointRadius: 3

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    interaction: {

                        intersect: false,

                        mode: "index"

                    },

                    plugins: {

                        legend: {

                            position: "top",

                            align: "end",

                            labels: {

                                usePointStyle: true,

                                boxWidth: 6,

                                font: {

                                    size: 10

                                }

                            }

                        }

                    },

                    scales: {

                        x: {

                            grid: {

                                display: false

                            },

                            ticks: {

                                color: "#94a3b8",

                                font: {

                                    size: 9

                                }

                            }

                        },

                        y: {

                            beginAtZero: true,

                            border: {

                                display: false

                            },

                            grid: {

                                color:
                                    "#eef2f7"

                            },

                            ticks: {

                                color:
                                    "#94a3b8",

                                font: {

                                    size: 9

                                }

                            }

                        }

                    }

                }

            }
        );

    }


    /* =================================================
       RECOVERY DONUT CHART
    ================================================= */

    const recoveryCanvas =
        document.getElementById("recoveryChart");


    if (recoveryCanvas) {

        new Chart(
            recoveryCanvas,
            {

                type: "doughnut",

                data: {

                    labels: [
                        "Successful",
                        "Failed",
                        "Pending"
                    ],

                    datasets: [

                        {

                            data: [
                                94.8,
                                3.1,
                                2.1
                            ],

                            backgroundColor: [
                                "#10b981",
                                "#ef4444",
                                "#f59e0b"
                            ],

                            borderWidth: 0,

                            hoverOffset: 5

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "76%",

                    plugins: {

                        legend: {

                            display: false

                        }

                    }

                }

            }
        );

    }


    /* =================================================
       TABLE SEARCH
    ================================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const searchValue =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const rows =
                    document.querySelectorAll(
                        "#backupTable tbody tr"
                    );


                rows.forEach(row => {

                    const text =
                        row.textContent
                            .toLowerCase();


                    row.style.display =
                        text.includes(searchValue)
                            ? ""
                            : "none";

                });

            }
        );

    }


    /* =================================================
       LOGOUT
    ================================================= */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {

                    return;

                }


                /*
                    Clear login/session data
                */

                localStorage.removeItem(
                    "userName"
                );

                localStorage.removeItem(
                    "userEmail"
                );

                localStorage.removeItem(
                    "userRole"
                );


                sessionStorage.clear();


                /*
                    Redirect to login
                */

                window.location.href =
                    "login.html";

            }
        );

    }


    /* =================================================
       LOAD ADMIN DATA
    ================================================= */

    const storedName =
        localStorage.getItem("userName");

    const storedRole =
        localStorage.getItem("userRole");


    const adminName =
        document.getElementById("adminName");

    const welcomeName =
        document.getElementById("welcomeName");


    if (storedName) {

        if (adminName) {

            adminName.textContent =
                storedName;

        }


        if (welcomeName) {

            welcomeName.textContent =
                storedName;

        }

    }


    if (storedRole) {

        const roleElement =
            document.querySelector(
                ".admin-profile span"
            );


        if (roleElement) {

            roleElement.textContent =
                storedRole;

        }

    }


    /* =================================================
       PROFILE CLICK
    ================================================= */

    const profileBtn =
        document.getElementById("profileBtn");


    if (profileBtn) {

        profileBtn.addEventListener(
            "click",
            () => {

                alert(
                    "Admin profile settings will open here."
                );

            }
        );

    }


    /* =================================================
       TABLE ACTION BUTTONS
    ================================================= */

    const tableActions =
        document.querySelectorAll(
            ".table-action"
        );


    tableActions.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                alert(
                    "Backup action menu opened."
                );

            }
        );

    });


    /* =================================================
       REPORT SCROLL
    ================================================= */

    window.scrollToReports =
        function () {

            const reports =
                document.getElementById(
                    "reports"
                );


            if (reports) {

                reports.scrollIntoView({
                    behavior: "smooth"
                });

            }

        };


    /* =================================================
       RESIZE SIDEBAR
    ================================================= */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                closeSidebar();

            }

        }
    );


});

