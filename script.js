// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simplified navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking outside
overlay.addEventListener('click', toggleMenu);

// Close menu when clicking navigation links
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Loading screen handler
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }, 1000);
});

// Scroll reveal
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Mouse movement handler
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    // Update CSS variables for mouse position
    document.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        hero.style.setProperty('--mouse-x', `${x}px`);
        hero.style.setProperty('--mouse-y', `${y}px`);
        
        // Move custom cursor
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
    });

    // Remove the complex scroll handler and replace with simple one
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // Add mouse tracking only for about section
    const aboutSection = document.getElementById('about');
    aboutSection.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    aboutSection.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    // Add click handler for external links
    document.querySelectorAll('.external-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank');
        });
    });

    // Typing animation
    const typedTextSpan = document.querySelector(".typed-text");
    const texts = ["Final Year IT Student", "Java Developer", "Machine Learning Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 1000); // Reduced from 2000 to 1000 (pause at end of text)
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        const typingSpeed = isDeleting ? 50 : 100; // Reduced from 100/200 to 50/100
        setTimeout(type, typingSpeed);
    }

    // Start the typing animation
    type();
});

// Add this after your existing code
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        const overlay = document.querySelector('.overlay');
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        if (overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});
