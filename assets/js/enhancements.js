// Enhanced JavaScript for Dev Pal Portfolio

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.posts article, .value-card, .post');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Enhanced navigation highlighting
    const navLinks = document.querySelectorAll('#nav ul.links li a');
    const sections = document.querySelectorAll('section, article');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id') || section.className;
            }
        });

        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === window.location.pathname.split('/').pop() || 
                (current && link.getAttribute('href').includes(current))) {
                link.parentElement.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Parallax effect for intro section
    const intro = document.querySelector('#intro');
    if (intro) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            intro.style.transform = `translateY(${rate}px)`;
        });
    }

    // Enhanced image loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loaded class when image loads
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Fallback: if image is already loaded, add loaded class
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('error', function() {
                this.classList.add('loaded'); // Show even if there's an error
                console.warn('Image failed to load:', this.src);
            });
        }
    });
    
    // Add js-enabled class to body for CSS targeting
    document.body.classList.add('js-enabled');

    // Typing effect for intro text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typing effect to intro if desired
    const introText = document.querySelector('#intro p');
    if (introText && window.innerWidth > 768) {
        const originalText = introText.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(introText, originalText, 50);
    }

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Enhanced form interactions
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Back to top functionality
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 20px;
        font-weight: bold;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enhanced mobile menu
    const navToggle = document.querySelector('#navPanelToggle');
    const navPanel = document.querySelector('#navPanel');
    const nav = document.querySelector('#nav');
    
    if (navToggle && navPanel && nav) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('is-navPanel-visible');
        });

        // Always copy nav HTML into navPanel on mobile
        function updateNavPanel() {
            if (window.innerWidth <= 980) {
                navPanel.querySelector('nav').innerHTML = nav.innerHTML;
            }
        }
        updateNavPanel();
        window.addEventListener('resize', updateNavPanel);

        // Close mobile menu when clicking on a link
        navPanel.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                document.body.classList.remove('is-navPanel-visible');
            }
        });
    }

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll events
    const debouncedUpdateNav = debounce(updateActiveNav, 10);
    window.addEventListener('scroll', debouncedUpdateNav);

    // Console welcome message
    console.log('%c👋 Welcome to Dev Pal\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cFeel free to explore the code and reach out if you\'d like to connect!', 'color: #764ba2; font-size: 14px;');

}); 