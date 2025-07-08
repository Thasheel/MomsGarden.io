// JavaScript for Mom's Garden 

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Observer for fade-up animations on general elements
    const sectionObservers = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
    });

    // Apply fade-up to appropriate elements in sections (excluding hero and main H1)
    document.querySelectorAll('section:not(#home) h2, section:not(#home) p, section:not(#home) .plant-grid, section:not(#home) .about-content, section:not(#home) .contact-form, section:not(#home) .contact-options, section:not(#home) .gallery-grid, .form-group, .contact-options h3, .map-label').forEach(el => {
        el.classList.add('animate-fade-up'); // Ensure elements have the base animation class
        sectionObservers.observe(el);
    });

    // Hamburger menu toggle for mobile
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('nav ul.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked (for smooth scroll)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Animated text next to logo
    const animatedTextElement = document.getElementById('logo-animated-text');
    const animatedWords = [
        "Fresh Plants",
        "Local Grown",
        "Eco-Friendly",
        "Home Delivery",
        "Gift a Green",
        "Plant Happiness"
    ];
    let currentWordIndex = 0;

    function animateText() {
        if (!animatedTextElement) return;

        animatedTextElement.classList.remove('visible');
        animatedTextElement.classList.add('fade');

        setTimeout(() => {
            animatedTextElement.textContent = animatedWords[currentWordIndex];
            animatedTextElement.classList.remove('fade');
            animatedTextElement.classList.add('visible');
            currentWordIndex = (currentWordIndex + 1) % animatedWords.length;
        }, 350); // Slower fade-out
    }

    // Initial call and set interval for animation
    if (animatedTextElement) {
        animateText(); // Display first word immediately
        setInterval(animateText, 2200); // Slower switch
    }

    // Handle client-side contact form submission with custom popup
    const contactForm = document.querySelector('form.contact-form');
    const formPopup = document.getElementById('form-popup');

    if (contactForm && formPopup) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission (page reload)

            // Show custom popup
            formPopup.classList.add('show');

            // Clear form fields
            contactForm.reset();

            // Hide popup after 1 second
            setTimeout(() => {
                formPopup.classList.remove('show');
            }, 1000); // 1000 milliseconds = 1 second
        });
    }

    // Removed: Smooth scrolling for mobile category pills
    // Old code for mobile category pills removed as per user request.

    document.body.classList.add('page-loaded');
}); 