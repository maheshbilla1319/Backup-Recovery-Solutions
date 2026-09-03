
/* =========================================================
   BACKUP & RECOVERY SOLUTIONS
   LOGIN JAVASCRIPT
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =========================================
           ELEMENTS
        ========================================= */

        const loginForm =
            document.getElementById("loginForm");

        const email =
            document.getElementById("email");

        const password =
            document.getElementById("password");

        const passwordToggle =
            document.getElementById(
                "passwordToggle"
            );

        const remember =
            document.getElementById("remember");

        const loginButton =
            document.getElementById(
                "loginButton"
            );

        const loginMessage =
            document.getElementById(
                "loginMessage"
            );


        /* =========================================
           PARTICLES
        ========================================= */

        const particles =
            document.getElementById(
                "particles"
            );


        if (particles) {

            for (
                let i = 0;
                i < 35;
                i++
            ) {

                const particle =
                    document.createElement("span");


                particle.style.left =
                    Math.random() * 100 + "%";


                particle.style.animationDuration =
                    Math.random() * 10 + 8 + "s";


                particle.style.animationDelay =
                    Math.random() * 8 + "s";


                const size =
                    Math.random() * 3 + 2;


                particle.style.width =
                    size + "px";


                particle.style.height =
                    size + "px";


                particles.appendChild(
                    particle
                );

            }

        }


        /* =========================================
           SHOW / HIDE PASSWORD
        ========================================= */

        passwordToggle.addEventListener(
            "click",
            () => {

                const icon =
                    passwordToggle.querySelector(
                        "i"
                    );


                if (
                    password.type ===
                    "password"
                ) {

                    password.type =
                        "text";


                    icon.classList.remove(
                        "fa-eye"
                    );

                    icon.classList.add(
                        "fa-eye-slash"
                    );


                    passwordToggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                } else {

                    password.type =
                        "password";


                    icon.classList.remove(
                        "fa-eye-slash"
                    );

                    icon.classList.add(
                        "fa-eye"
                    );


                    passwordToggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                }

            }
        );


        /* =========================================
           EMAIL VALIDATION
        ========================================= */

        function validEmail(value) {

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(value);

        }


        /* =========================================
           CLEAR ERRORS
        ========================================= */

        function clearErrors() {

            document.querySelectorAll(
                ".error-message"
            ).forEach(
                element => {
                    element.textContent = "";
                }
            );


            document.querySelectorAll(
                ".input-error"
            ).forEach(
                element => {
                    element.classList.remove(
                        "input-error"
                    );
                }
            );

        }


        /* =========================================
           LOGIN FORM
        ========================================= */

        loginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                clearErrors();


                loginMessage.className =
                    "login-message";


                loginMessage.textContent =
                    "";


                const selectedRole =
                    document.querySelector(
                        'input[name="role"]:checked'
                    );


                let valid = true;


                /* ROLE */

                if (!selectedRole) {

                    document.getElementById(
                        "roleError"
                    ).textContent =
                        "Please select a role.";

                    valid = false;

                }


                /* EMAIL */

                const emailValue =
                    email.value.trim();


                if (!emailValue) {

                    document.getElementById(
                        "emailError"
                    ).textContent =
                        "Email address is required.";

                    email.classList.add(
                        "input-error"
                    );

                    valid = false;

                }

                else if (
                    !validEmail(emailValue)
                ) {

                    document.getElementById(
                        "emailError"
                    ).textContent =
                        "Enter a valid email address.";

                    email.classList.add(
                        "input-error"
                    );

                    valid = false;

                }


                /* PASSWORD */

                const passwordValue =
                    password.value;


                if (!passwordValue) {

                    document.getElementById(
                        "passwordError"
                    ).textContent =
                        "Password is required.";

                    password.classList.add(
                        "input-error"
                    );

                    valid = false;

                }

                else if (
                    passwordValue.length < 6
                ) {

                    document.getElementById(
                        "passwordError"
                    ).textContent =
                        "Password must contain at least 6 characters.";

                    password.classList.add(
                        "input-error"
                    );

                    valid = false;

                }


                if (!valid) {

                    return;

                }


                /* =================================
                   GET ROLE
                ================================= */

                const role =
                    selectedRole.value;


                /* =================================
                   REMEMBER ME
                ================================= */

                if (remember.checked) {

                    localStorage.setItem(
                        "rememberEmail",
                        emailValue
                    );

                    localStorage.setItem(
                        "rememberRole",
                        role
                    );

                } else {

                    localStorage.removeItem(
                        "rememberEmail"
                    );

                    localStorage.removeItem(
                        "rememberRole"
                    );

                }


                /* =================================
                   TEMPORARY LOGIN
                ================================= */

                loginButton.disabled =
                    true;


                loginButton.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Signing In...
                `;


                setTimeout(
                    () => {


                        /*
                         * Demo login.
                         * Replace this section with
                         * your backend authentication.
                         */

                        localStorage.setItem(
                            "userEmail",
                            emailValue
                        );

                        localStorage.setItem(
                            "userRole",
                            role
                        );


                        loginMessage.className =
                            "login-message success";


                        loginMessage.innerHTML = `
                            <i class="fa-solid fa-circle-check"></i>
                            Login successful! Redirecting...
                        `;


                        loginButton.innerHTML = `
                            <i class="fa-solid fa-check"></i>
                            Login Successful
                        `;


                        setTimeout(
                            () => {

                                /*
                                 * Change this to your
                                 * dashboard page.
                                 */

                                if (
                                    role ===
                                    "Admin"
                                ) {

                                    window.location.href =
                                        "admin.html";

                                } else {

                                    window.location.href =
                                        "viewer.html";

                                }

                            },
                            1200
                        );


                    },
                    1000
                );

            }
        );


        /* =========================================
           REMEMBERED EMAIL
        ========================================= */

        const savedEmail =
            localStorage.getItem(
                "rememberEmail"
            );


        const savedRole =
            localStorage.getItem(
                "rememberRole"
            );


        if (savedEmail) {

            email.value =
                savedEmail;

            remember.checked =
                true;

        }


        if (savedRole) {

            const roleInput =
                document.querySelector(
                    `input[name="role"][value="${savedRole}"]`
                );


            if (roleInput) {

                roleInput.checked =
                    true;

            }

        }


        /* =========================================
           FORGOT PASSWORD MODAL
        ========================================= */

        const forgotPassword =
            document.getElementById(
                "forgotPassword"
            );

        const forgotModal =
            document.getElementById(
                "forgotModal"
            );

        const closeModal =
            document.getElementById(
                "closeModal"
            );

        const modalOverlay =
            document.getElementById(
                "modalOverlay"
            );


        function openForgotModal() {

            forgotModal.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";


            setTimeout(
                () => {

                    document.getElementById(
                        "forgotEmail"
                    ).focus();

                },
                100
            );

        }


        function closeForgotModal() {

            forgotModal.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }


        forgotPassword.addEventListener(
            "click",
            openForgotModal
        );


        closeModal.addEventListener(
            "click",
            closeForgotModal
        );


        modalOverlay.addEventListener(
            "click",
            closeForgotModal
        );


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

                    closeForgotModal();

                }

            }
        );


        /* =========================================
           FORGOT PASSWORD FORM
        ========================================= */

        const forgotForm =
            document.getElementById(
                "forgotForm"
            );

        const forgotEmail =
            document.getElementById(
                "forgotEmail"
            );

        const forgotError =
            document.getElementById(
                "forgotError"
            );

        const resetMessage =
            document.getElementById(
                "resetMessage"
            );


        forgotForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const value =
                    forgotEmail.value.trim();


                forgotError.textContent =
                    "";

                resetMessage.style.display =
                    "none";


                if (!value) {

                    forgotError.textContent =
                        "Please enter your email.";

                    return;

                }


                if (!validEmail(value)) {

                    forgotError.textContent =
                        "Enter a valid email address.";

                    return;

                }


                resetMessage.style.display =
                    "block";


                resetMessage.innerHTML = `
                    <i class="fa-solid fa-circle-check"></i>
                    Reset instructions sent to ${value}
                `;


                forgotForm.reset();


                setTimeout(
                    () => {

                        closeForgotModal();

                        resetMessage.style.display =
                            "none";

                    },
                    3000
                );

            }
        );


    }

);

