
/* =========================================================
   BACKUP & RECOVERY SOLUTIONS
   SIGNUP JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const form =
        document.getElementById("signupForm");

    const fullName =
        document.getElementById("fullName");

    const phone =
        document.getElementById("phone");

    const email =
        document.getElementById("email");

    const company =
        document.getElementById("company");

    const role =
        document.getElementById("role");

    const password =
        document.getElementById("password");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const terms =
        document.getElementById("terms");

    const signupBtn =
        document.getElementById("signupBtn");

    const successModal =
        document.getElementById("successModal");

    const strengthBar =
        document.getElementById("strengthBar");

    const strengthText =
        document.getElementById("strengthText");


    /* =====================================================
       PASSWORD SHOW / HIDE
    ====================================================== */

    const passwordToggles =
        document.querySelectorAll(".password-toggle");


    passwordToggles.forEach(toggle => {

        toggle.addEventListener("click", () => {

            const targetId =
                toggle.dataset.target;

            const input =
                document.getElementById(targetId);

            const icon =
                toggle.querySelector("i");


            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove(
                    "fa-eye"
                );

                icon.classList.add(
                    "fa-eye-slash"
                );

                toggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                input.type = "password";

                icon.classList.remove(
                    "fa-eye-slash"
                );

                icon.classList.add(
                    "fa-eye"
                );

                toggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        });

    });


    /* =====================================================
       PASSWORD STRENGTH
    ====================================================== */

    password.addEventListener(
        "input",
        updatePasswordStrength
    );


    function updatePasswordStrength() {

        const value =
            password.value;

        let score = 0;


        if (value.length >= 8)
            score++;

        if (/[A-Z]/.test(value))
            score++;

        if (/[a-z]/.test(value))
            score++;

        if (/[0-9]/.test(value))
            score++;

        if (/[^A-Za-z0-9]/.test(value))
            score++;


        const widths = [
            "0%",
            "20%",
            "40%",
            "60%",
            "80%",
            "100%"
        ];


        strengthBar.style.width =
            widths[score];


        if (value.length === 0) {

            strengthText.textContent =
                "Password strength";

        } else if (score <= 2) {

            strengthText.textContent =
                "Weak";

        } else if (score === 3) {

            strengthText.textContent =
                "Medium";

        } else if (score === 4) {

            strengthText.textContent =
                "Strong";

        } else {

            strengthText.textContent =
                "Very Strong";

        }

    }


    /* =====================================================
       ERROR FUNCTIONS
    ====================================================== */

    function showError(
        element,
        errorId,
        message
    ) {

        const group =
            element.closest(".input-group");

        const error =
            document.getElementById(errorId);


        if (group) {

            group.classList.add(
                "invalid"
            );

            group.classList.remove(
                "valid"
            );

        }


        if (error) {

            error.textContent =
                message;

        }

    }


    function showValid(
        element,
        errorId
    ) {

        const group =
            element.closest(".input-group");

        const error =
            document.getElementById(errorId);


        if (group) {

            group.classList.remove(
                "invalid"
            );

            group.classList.add(
                "valid"
            );

        }


        if (error) {

            error.textContent =
                "";

        }

    }


    function clearError(
        element,
        errorId
    ) {

        const group =
            element.closest(".input-group");

        const error =
            document.getElementById(errorId);


        if (group) {

            group.classList.remove(
                "invalid"
            );

            group.classList.remove(
                "valid"
            );

        }


        if (error) {

            error.textContent =
                "";

        }

    }


    /* =====================================================
       NAME VALIDATION
    ====================================================== */

    function validateName() {

        const value =
            fullName.value.trim();


        if (!value) {

            showError(
                fullName,
                "nameError",
                "Please enter your full name."
            );

            return false;

        }


        if (value.length < 3) {

            showError(
                fullName,
                "nameError",
                "Name must contain at least 3 characters."
            );

            return false;

        }


        showValid(
            fullName,
            "nameError"
        );

        return true;

    }


    /* =====================================================
       PHONE VALIDATION
    ====================================================== */

    function validatePhone() {

        const value =
            phone.value.trim();


        const phonePattern =
            /^[0-9]{10}$/;


        if (!value) {

            showError(
                phone,
                "phoneError",
                "Please enter your phone number."
            );

            return false;

        }


        if (!phonePattern.test(value)) {

            showError(
                phone,
                "phoneError",
                "Enter a valid 10-digit phone number."
            );

            return false;

        }


        showValid(
            phone,
            "phoneError"
        );

        return true;

    }


    /* =====================================================
       EMAIL VALIDATION
    ====================================================== */

    function validateEmail() {

        const value =
            email.value.trim();


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!value) {

            showError(
                email,
                "emailError",
                "Please enter your email address."
            );

            return false;

        }


        if (!emailPattern.test(value)) {

            showError(
                email,
                "emailError",
                "Please enter a valid email address."
            );

            return false;

        }


        showValid(
            email,
            "emailError"
        );

        return true;

    }


    /* =====================================================
       ROLE VALIDATION
    ====================================================== */

    function validateRole() {

        if (!role.value) {

            showError(
                role,
                "roleError",
                "Please select your role."
            );

            return false;

        }


        showValid(
            role,
            "roleError"
        );

        return true;

    }


    /* =====================================================
       PASSWORD VALIDATION
    ====================================================== */

    function validatePassword() {

        const value =
            password.value;


        if (!value) {

            showError(
                password,
                "passwordError",
                "Please create a password."
            );

            return false;

        }


        if (value.length < 8) {

            showError(
                password,
                "passwordError",
                "Password must contain at least 8 characters."
            );

            return false;

        }


        showValid(
            password,
            "passwordError"
        );

        return true;

    }


    /* =====================================================
       CONFIRM PASSWORD
    ====================================================== */

    function validateConfirmPassword() {

        if (!confirmPassword.value) {

            showError(
                confirmPassword,
                "confirmError",
                "Please confirm your password."
            );

            return false;

        }


        if (
            confirmPassword.value !==
            password.value
        ) {

            showError(
                confirmPassword,
                "confirmError",
                "Passwords do not match."
            );

            return false;

        }


        showValid(
            confirmPassword,
            "confirmError"
        );

        return true;

    }


    /* =====================================================
       TERMS
    ====================================================== */

    function validateTerms() {

        const error =
            document.getElementById(
                "termsError"
            );


        if (!terms.checked) {

            error.textContent =
                "Please accept the terms and conditions.";

            return false;

        }


        error.textContent =
            "";

        return true;

    }


    /* =====================================================
       LIVE VALIDATION
    ====================================================== */

    fullName.addEventListener(
        "blur",
        validateName
    );

    phone.addEventListener(
        "blur",
        validatePhone
    );

    email.addEventListener(
        "blur",
        validateEmail
    );

    role.addEventListener(
        "change",
        validateRole
    );

    password.addEventListener(
        "blur",
        validatePassword
    );

    confirmPassword.addEventListener(
        "blur",
        validateConfirmPassword
    );


    /* =====================================================
       FORM SUBMIT
    ====================================================== */

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nameValid =
                validateName();

            const phoneValid =
                validatePhone();

            const emailValid =
                validateEmail();

            const roleValid =
                validateRole();

            const passwordValid =
                validatePassword();

            const confirmValid =
                validateConfirmPassword();

            const termsValid =
                validateTerms();


            if (
                !nameValid ||
                !phoneValid ||
                !emailValid ||
                !roleValid ||
                !passwordValid ||
                !confirmValid ||
                !termsValid
            ) {

                const firstError =
                    document.querySelector(
                        ".invalid input, .invalid select"
                    );


                if (firstError) {

                    firstError.focus();

                }

                return;

            }


            /* =============================================
               BUTTON LOADING
            ============================================== */

            signupBtn.classList.add(
                "loading"
            );


            const buttonText =
                signupBtn.querySelector(
                    "span:first-child"
                );

            buttonText.textContent =
                "Creating Account...";


            /* =============================================
               ACCOUNT OBJECT
            ============================================== */

            const user = {

                name:
                    fullName.value.trim(),

                phone:
                    phone.value.trim(),

                email:
                    email.value.trim(),

                company:
                    company.value.trim(),

                role:
                    role.value,

                password:
                    password.value,

                createdAt:
                    new Date().toISOString()

            };


            /* =============================================
               SAVE ACCOUNT
            ============================================== */

            localStorage.setItem(
                "backupRecoveryUser",
                JSON.stringify(user)
            );


            /* =============================================
               EXTRA LOGIN VALUES
            ============================================== */

            localStorage.setItem(
                "userName",
                user.name
            );

            localStorage.setItem(
                "userEmail",
                user.email
            );

            localStorage.setItem(
                "userRole",
                user.role
            );


            /* =============================================
               SUCCESS
            ============================================== */

            setTimeout(() => {

                successModal.classList.add(
                    "show"
                );


                setTimeout(() => {

                    window.location.href =
                        "login.html";

                }, 2600);

            }, 1000);

        }
    );


    /* =====================================================
       REMOVE ERRORS WHILE TYPING
    ====================================================== */

    [
        fullName,
        phone,
        email,
        company,
        password,
        confirmPassword
    ].forEach(input => {

        input.addEventListener(
            "input",
            () => {

                const group =
                    input.closest(
                        ".input-group"
                    );

                if (group) {

                    group.classList.remove(
                        "invalid"
                    );

                }

            }
        );

    });


});

