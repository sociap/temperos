document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    
    // Create toggle button dynamically
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.cssText = 'display: none; font-size: 1.5rem; cursor: pointer; color: var(--primary);';
    nav.insertBefore(menuToggle, navLinks);

    // Responsive check for toggle visibility
    const checkMobile = () => {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    };

    window.addEventListener('resize', checkMobile);
    checkMobile();

    menuToggle.addEventListener('click', () => {
        const isHidden = navLinks.style.display === 'none';
        navLinks.style.display = isHidden ? 'flex' : 'none';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = 'var(--shadow)';
        menuToggle.innerHTML = isHidden ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        }
    });

    // Reveal animations on scroll
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

    document.querySelectorAll('.feature-card, .spice-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
