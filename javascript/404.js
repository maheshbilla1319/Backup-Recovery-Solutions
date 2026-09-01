
/* =========================================================
   BACKUP & RECOVERY SOLUTIONS
   404 PAGE JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PARTICLES
    ===================================================== */

    const particlesContainer =
        document.getElementById("particles");


    if (particlesContainer) {

        const particleCount = 45;


        for (let i = 0; i < particleCount; i++) {

            const particle =
                document.createElement("span");

            particle.classList.add("particle");


            const size =
                Math.random() * 4 + 2;


            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;


            particle.style.left =
                `${Math.random() * 100}%`;


            particle.style.animationDuration =
                `${Math.random() * 10 + 8}s`;


            particle.style.animationDelay =
                `${Math.random() * 8}s`;


            particlesContainer.appendChild(
                particle
            );

        }

    }



    /* =====================================================
       RECOVERY PROGRESS
    ===================================================== */

    const progressBar =
        document.getElementById("progressBar");

    const progressText =
        document.getElementById("progressText");

    const recoverBtn =
        document.getElementById("recoverBtn");


    let recoveryRunning = false;


    function startRecovery() {

        if (recoveryRunning) {
            return;
        }


        recoveryRunning = true;


        document.body.classList.add(
            "recovery-running"
        );


        recoverBtn.disabled = true;


        recoverBtn.innerHTML = `
            <i class="fa-solid fa-rotate"></i>
            Recovering...
        `;


        let progress = 0;


        const recoveryInterval =
            setInterval(() => {


                progress += Math.random() * 4;


                if (progress >= 100) {

                    progress = 100;

                    clearInterval(
                        recoveryInterval
                    );


                    recoveryComplete();

                }


                progressBar.style.width =
                    `${progress}%`;


                progressText.textContent =
                    `${Math.floor(progress)}%`;


            }, 100);

    }



    /* =====================================================
       RECOVERY COMPLETE
    ===================================================== */

    function recoveryComplete() {

        recoverBtn.disabled = false;

        recoverBtn.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Recovery Complete
        `;


        progressText.textContent =
            "100%";


        progressBar.style.width =
            "100%";


        recoverBtn.style.pointerEvents =
            "none";


        setTimeout(() => {

            recoverBtn.style.pointerEvents =
                "auto";

            recoverBtn.disabled = false;

            recoverBtn.innerHTML = `
                <i class="fa-solid fa-rotate"></i>
                Start Recovery
            `;


            recoveryRunning = false;

            document.body.classList.remove(
                "recovery-running"
            );

        }, 3000);

    }



    if (recoverBtn) {

        recoverBtn.addEventListener(
            "click",
            startRecovery
        );

    }



    /* =====================================================
       MOUSE PARALLAX EFFECT
    ===================================================== */

    const visual =
        document.querySelector(".error-visual");


    if (visual) {

        visual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    visual.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const moveX =
                    (x - rect.width / 2) / 30;


                const moveY =
                    (y - rect.height / 2) / 30;


                visual.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            }
        );


        visual.addEventListener(
            "mouseleave",
            () => {

                visual.style.transform =
                    "translate(0, 0)";

            }
        );

    }



    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            function (event) {

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
                    "rgba(255,255,255,.4)";


                ripple.style.transform =
                    "scale(0)";


                ripple.style.animation =
                    "rippleEffect .6s linear";


                ripple.style.left =
                    `${event.offsetX}px`;


                ripple.style.top =
                    `${event.offsetY}px`;


                this.style.position =
                    "relative";


                this.style.overflow =
                    "hidden";


                this.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });



    /* =====================================================
       PAGE LOAD
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


});

