document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------------------------
    // Mobile Navigation Menu Toggle
    // ----------------------------------------------------------------------
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            navMenu.classList.toggle("active");
        });
    }


    function showAlert(message, onConfirm) {
        const overlay = document.getElementById("modal-overlay");
        document.getElementById("modal-message").textContent = message;
        document.getElementById("modal-input").style.display = "none";
        document.getElementById("modal-cancel").style.display = "none";
        overlay.classList.add("active");

        const confirmBtn = document.getElementById("modal-confirm");
        confirmBtn.onclick = () => {
            overlay.classList.remove("active");
            if (onConfirm) onConfirm();
        };
    }

    function showPrompt(message, onSubmit) {
        const overlay = document.getElementById("modal-overlay");
        const input = document.getElementById("modal-input");
        document.getElementById("modal-message").textContent = message;
        input.style.display = "block";
        input.value = "";
        document.getElementById("modal-cancel").style.display = "inline-flex";
        overlay.classList.add("active");
        input.focus();

        document.getElementById("modal-cancel").onclick = () => overlay.classList.remove("active");
        document.getElementById("modal-confirm").onclick = () => {
            overlay.classList.remove("active");
            if (input.value) onSubmit(input.value);
        };
    }

    // ----------------------------------------------------------------------
    // Cart Icon Click Event (Landing Page Redirect Notice)
    // ----------------------------------------------------------------------
    const cartIcon = document.getElementById("cart-icon");

    if (cartIcon) {
        // Cart icon
        cartIcon.addEventListener("click", (e) => {
            e.preventDefault();
            showAlert("To view your cart or proceed to checkout, please log in to the main shop page.", () => {
                window.location.href = "main-shop.html";
            });
        });
    }

    // ----------------------------------------------------------------------
    // Search Icon Click Event
    // ----------------------------------------------------------------------
    const searchIcon = document.getElementById("search-icon");

    if (searchIcon) {
        // Search icon
        searchIcon.addEventListener("click", (e) => {
            e.preventDefault();
            showPrompt("Enter item name to search:", (searchTerm) => {
                window.location.href = `main-shop.html?search=${encodeURIComponent(searchTerm)}`;
            });
        });
    }

    // ----------------------------------------------------------------------
    // Smooth Scroll for Internal Navigation Links (with sticky header offset)
    // ----------------------------------------------------------------------
    const header = document.querySelector("header");
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

                    window.scrollTo({ top: targetPosition, behavior: "smooth" });

                    if (navMenu && navMenu.classList.contains("active")) {
                        navMenu.classList.remove("active");
                        menuToggle.setAttribute("aria-expanded", "false");
                    }
                }
            }
        });
    });

    // ----------------------------------------------------------------------
    // Contact Form (no backend wired up yet — friendly confirmation only)
    // ----------------------------------------------------------------------
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        // Contact form
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showAlert("Thanks for reaching out — we'll get back to you within one business day.");
            contactForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // Newsletter Signup (no backend wired up yet — friendly confirmation only)
    // ----------------------------------------------------------------------
    const newsletterForm = document.querySelector(".newsletter-form");

    if (newsletterForm) {
        // Newsletter
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showAlert("You're on the list — look out for a 10% off code in your inbox.");
            newsletterForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // Modal to handle main-shop.html redirection
    // ----------------------------------------------------------------------
    const mainShopLinks = document.querySelectorAll('a[href="main-shop.html"]');

    mainShopLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            showAlert("You are going to be redirected to the main shop page.", () => {
                window.location.href = "main-shop.html";
            });
        });
    });
});
