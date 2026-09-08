document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations (reveal elements)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Active Navigation Link Highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) { // 200px offset for early triggering
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Custom Cursor Logic
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add a slight delay to the outline for a smooth trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
            });
        });
    }

    // Scroll Progress Bar Update
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // Typewriter Text Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ["Java Developer", "Computer Science Student", "Full Stack Developer", "Software Engineering Enthusiast"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 90;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1800; // Pause at word completion
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; // Pause before typing next word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    // 3D Tilt & Reflection Glare Effect for Profile Image
    const profileCard = document.getElementById('profile-card');
    const heroVisual = document.querySelector('.hero-visual');

    if (profileCard && heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Tilt maximum angle
            const tiltX = (y / (rect.height / 2)) * -14;
            const tiltY = (x / (rect.width / 2)) * 14;
            
            profileCard.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`;
            
            // Move glare light position dynamically
            const glare = profileCard.querySelector('.profile-glare');
            if (glare) {
                const percentX = ((e.clientX - rect.left) / rect.width) * 100;
                const percentY = ((e.clientY - rect.top) / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`;
            }
        });

        heroVisual.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            const glare = profileCard.querySelector('.profile-glare');
            if (glare) {
                glare.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 70%)`;
            }
        });
    }

    // ==========================================================================
    // Dark / Light Theme Switcher
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('portfolio-theme', 'light');
            }
        });
    }

    // ==========================================================================
    // Vivid Glowing Orbs & Interactive Cyber Constellation Canvas
    // ==========================================================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let mouseX = width / 2;
        let mouseY = height / 2;
        let isMouseMoving = false;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMouseMoving = true;
        });

        const numParticles = Math.min(Math.floor(window.innerWidth / 20), 55);
        const particles = [];

        // Color palettes for Dark & Light modes
        const darkColors = [
            { r: 99, g: 102, b: 241 },   // Indigo
            { r: 168, g: 85, b: 247 },   // Purple
            { r: 236, g: 72, b: 153 },   // Pink
            { r: 6, g: 182, b: 212 }     // Cyan
        ];

        const lightColors = [
            { r: 79, g: 70, b: 229 },    // Deep Royal Indigo
            { r: 147, g: 51, b: 234 },   // Vibrant Violet
            { r: 219, g: 39, b: 119 },   // Deep Rose
            { r: 14, g: 165, b: 233 }    // Sky Blue
        ];

        for (let i = 0; i < numParticles; i++) {
            const palette = darkColors;
            const colorObj = palette[i % palette.length];
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3.5 + 2.5,
                glowRadius: Math.random() * 25 + 15,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                alpha: Math.random() * 0.45 + 0.35,
                colorIndex: i % darkColors.length
            });
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const colors = isLight ? lightColors : darkColors;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // Bounce at edges smoothly
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Gentle mouse attraction
                if (isMouseMoving) {
                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    const distToMouse = Math.hypot(dx, dy);
                    if (distToMouse < 180) {
                        p.x += (dx / distToMouse) * 0.6;
                        p.y += (dy / distToMouse) * 0.6;
                    }
                }

                const c = colors[p.colorIndex];

                // 1. Draw glowing radial aura
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowRadius);
                const glowAlpha = isLight ? (p.alpha * 0.35) : (p.alpha * 0.45);
                grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${glowAlpha})`);
                grad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.glowRadius, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // 2. Draw solid particle core
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${isLight ? 0.95 : 0.9})`;
                ctx.fill();

                // 3. Connect nearby particles with laser beams
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const lineAlpha = (1 - dist / 150) * (isLight ? 0.35 : 0.3);
                        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${lineAlpha})`;
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();
    }

    // ==========================================================================
    // Contact Form Submission Handler
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !subject || !message) return;

            // Construct direct Gmail Web compose URL
            const mailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=63817revanth@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
            
            // Open Gmail compose tab
            window.open(gmailComposeUrl, '_blank');

            // Show feedback badge
            if (formStatus) {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '✨ Message prepared in Gmail compose tab!';
                contactForm.reset();
                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.innerHTML = '';
                }, 5000);
            }
        });
    }
});
