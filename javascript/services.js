
/* =========================================================
   BACKUP & RECOVERY SOLUTIONS
   SERVICES PAGE JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initHeader();

    initMobileMenu();

    initReveal();

    initProgressBars();

    initFAQ();

    initBackTop();

    initSmoothScroll();

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

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

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

    const toggle =
        document.getElementById(
            "menuToggle"
        );

    const navbar =
        document.getElementById(
            "navbar"
        );


    if (!toggle || !navbar) return;


    toggle.addEventListener(
        "click",
        () => {

            const open =
                navbar.classList.toggle(
                    "open"
                );


            toggle.setAttribute(
                "aria-expanded",
                open
            );


            const icon =
                toggle.querySelector(
                    "i"
                );


            if (open) {

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

        }
    );


    navbar
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navbar.classList.remove(
                        "open"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        toggle.querySelector(
                            "i"
                        );


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
   REVEAL ANIMATIONS
========================================================= */

function initReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    if (!elements.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

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

                    }
                );

            },
            {
                threshold: .12
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}



/* =========================================================
   PROGRESS BARS
========================================================= */

function initProgressBars() {

    const bars =
        document.querySelectorAll(
            ".meter-track span"
        );


    if (!bars.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const bar =
                                entry.target;

                            const value =
                                bar.dataset.progress;


                            setTimeout(
                                () => {

                                    bar.style.width =
                                        value + "%";

                                },
                                200
                            );


                            observer.unobserve(
                                bar
                            );

                        }

                    }
                );

            },
            {
                threshold: .5
            }
        );


    bars.forEach(
        bar => {

            observer.observe(
                bar
            );

        }
    );

}



/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

    const items =
        document.querySelectorAll(
            ".faq-item"
        );


    if (!items.length) return;


    items.forEach(
        item => {

            const question =
                item.querySelector(
                    ".faq-question"
                );


            question.addEventListener(
                "click",
                () => {

                    const active =
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


                    if (!active) {

                        item.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );

}



/* =========================================================
   BACK TO TOP
========================================================= */

function initBackTop() {

    const button =
        document.getElementById(
            "backTop"
        );


    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 500
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
   SMOOTH ANCHOR SCROLL
========================================================= */

function initSmoothScroll() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const id =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !id ||
                            id === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                id
                            );


                        if (!target) return;


                        event.preventDefault();


                        const header =
                            document.getElementById(
                                "header"
                            );


                        const ticker =
                            document.querySelector(
                                ".service-ticker"
                            );


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const tickerHeight =
                            ticker
                                ? ticker.offsetHeight
                                : 0;


                        const position =
                            target.getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight -
                            tickerHeight -
                            10;


                        window.scrollTo({

                            top:
                                position,

                            behavior:
                                "smooth"

                        });

                    }
                );

            }
        );

}



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const serviceSections =
    document.querySelectorAll(
        "section[id]"
    );


const serviceNavLinks =
    document.querySelectorAll(
        ".nav-link"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        serviceSections.forEach(
            section => {

                const top =
                    section.offsetTop -
                    190;


                const bottom =
                    top +
                    section.offsetHeight;


                if (
                    window.scrollY >= top &&
                    window.scrollY < bottom
                ) {

                    current =
                        section.id;

                }

            }
        );


        serviceNavLinks.forEach(
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
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);

