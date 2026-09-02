/* =========================================================
   404 PAGE JAVASCRIPT
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =========================================
           PREVIOUS PAGE BUTTON
        ========================================== */

        const previousPage =
            document.getElementById(
                "previousPage"
            );


        if (previousPage) {

            previousPage.addEventListener(
                "click",
                function () {


                    /*
                     * Check browser history.
                     */

                    if (
                        document.referrer &&
                        window.history.length > 1
                    ) {

                        window.history.back();

                    } else {

                        /*
                         * If there is no previous
                         * page, go to home.
                         */

                        window.location.href =
                            "index.html";

                    }

                }
            );

        }


        /* =========================================
           404 NUMBER ANIMATION
        ========================================== */

        const numbers =
            document.querySelectorAll(
                ".error-number > span"
            );


        numbers.forEach(
            function (number, index) {

                number.style.opacity = "0";

                number.style.transform =
                    "translateY(25px)";


                setTimeout(
                    function () {

                        number.style.transition =
                            "all .7s ease";

                        number.style.opacity =
                            "1";

                        number.style.transform =
                            "translateY(0)";

                    },
                    index * 180
                );

            }
        );


        /* =========================================
           SERVER ICON HOVER
        ========================================== */

        const serverIcon =
            document.querySelector(
                ".server-icon"
            );


        if (serverIcon) {

            serverIcon.addEventListener(
                "mouseenter",
                function () {

                    serverIcon.style.transform =
                        "scale(1.08) rotate(-4deg)";

                }
            );


            serverIcon.addEventListener(
                "mouseleave",
                function () {

                    serverIcon.style.transform =
                        "";

                }
            );

        }


        /* =========================================
           BUTTON RIPPLE EFFECT
        ========================================== */

        const buttons =
            document.querySelectorAll(
                ".btn"
            );


        buttons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        const ripple =
                            document.createElement(
                                "span"
                            );


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
                            "scale(1)";


                        ripple.style.opacity =
                            "1";


                        ripple.style.transition =
                            "all .6s ease";


                        const rect =
                            button.getBoundingClientRect();


                        ripple.style.left =
                            ${event.clientX - rect.left - 5}px;


                        ripple.style.top =
                            ${event.clientY - rect.top - 5}px;


                        button.style.position =
                            "relative";


                        button.style.overflow =
                            "hidden";


                        button.appendChild(
                            ripple
                        );


                        requestAnimationFrame(
                            function () {

                                ripple.style.transform =
                                    "scale(30)";

                                ripple.style.opacity =
                                    "0";

                            }
                        );


                        setTimeout(
                            function () {

                                ripple.remove();

                            },
                            650
                        );

                    }
                );

            }
        );


        /* =========================================
           CONSOLE MESSAGE
        ========================================== */

        console.log(
            "404 Page loaded successfully."
        );


    }
);