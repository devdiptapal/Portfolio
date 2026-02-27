// Enhanced JavaScript for Dev Pal Portfolio

document.addEventListener('DOMContentLoaded', function() {
    const SOCIAL_LINKS = {
        linkedin: {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/devpal/',
            iconClass: 'fa-linkedin-in'
        },
        twitter: {
            label: 'Twitter',
            href: 'https://x.com/devpecks',
            iconClass: 'fa-twitter'
        },
        substack: {
            label: 'Substack',
            href: 'https://dpal.substack.com/'
        },
        medium: {
            label: 'Medium',
            href: 'https://medium.com/@devpal',
            iconClass: 'fa-medium-m'
        },
        github: {
            label: 'GitHub',
            href: 'https://github.com/devdiptapal/',
            iconClass: 'fa-github'
        },
        instagram: {
            label: 'Instagram',
            href: 'https://www.instagram.com/yourpaldev/',
            iconClass: 'fa-instagram'
        },
        strava: {
            label: 'Strava',
            href: 'https://www.strava.com/athletes/52260606',
            iconClass: 'fa-strava'
        }
    };

    function substackSvg(className, width, height, bgFill, lineFill) {
        return `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="${width}" height="${height}"><rect width="448" height="512" rx="80" fill="${bgFill}"/><path d="M112 192v32h224v-32zm0 64v32h224v-32zm0 64v32h224v-32z" fill="${lineFill}"/></svg>`;
    }

    function renderIntroSocialLinks() {
        const container = document.querySelector('#intro-social-links');
        if (!container) return;

        const order = ['linkedin', 'twitter', 'substack', 'medium', 'github', 'instagram', 'strava'];
        container.innerHTML = order.map((key) => {
            const link = SOCIAL_LINKS[key];
            if (key === 'substack') {
                return `<a class="social-link-box social-link-fixed" href="${link.href}" target="_blank" rel="noopener"><span class="substack-link-content">${substackSvg('substack-logo', 22, 22, '#FF6719', '#fff')}${link.label}</span></a>`;
            }
            return `<a class="social-link-box social-link-fixed" href="${link.href}" target="_blank" rel="noopener"><span class="icon brands ${link.iconClass}"></span> ${link.label}</a>`;
        }).join('');
    }

    function renderSocialIcons(targetSelector, order) {
        const container = document.querySelector(targetSelector);
        if (!container) return;

        container.innerHTML = order.map((key) => {
            const link = SOCIAL_LINKS[key];
            if (key === 'substack') {
                return `<li><a href="${link.href}" target="_blank" rel="noopener" title="${link.label}"><span class="icon">${substackSvg('nav-substack-logo', 20, 20, '#fff', '#23272f')}</span></a></li>`;
            }
            return `<li><a href="${link.href}" target="_blank" rel="noopener" title="${link.label}" class="icon brands ${link.iconClass}"><span class="label">${link.label}</span></a></li>`;
        }).join('');
    }

    renderIntroSocialLinks();
    renderSocialIcons('#top-social-icons', ['substack', 'twitter', 'linkedin', 'instagram', 'github', 'medium', 'strava']);
    renderSocialIcons('#footer-social-icons', ['twitter', 'linkedin', 'instagram', 'github']);
    
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
    
    function normalizePath(pathname) {
        if (!pathname) return '/';
        let normalized = pathname;
        if (!normalized.startsWith('/')) normalized = `/${normalized}`;
        if (normalized.length > 1 && normalized.endsWith('/')) normalized = normalized.slice(0, -1);
        if (normalized === '/index.html') return '/';
        return normalized;
    }

    function updateActiveNav() {
        const currentPath = normalizePath(window.location.pathname);
        // Check if we're on the home page
        const isHomePage = currentPath === '/';
        
        if (isHomePage) {
            // On home page, always keep "ME" active
            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                if (normalizePath(link.getAttribute('href')) === '/') {
                    link.parentElement.classList.add('active');
                }
            });
            return;
        }
        
        // For other pages, use scroll-based highlighting
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
            const linkPath = normalizePath(link.getAttribute('href'));
            if (linkPath === currentPath || 
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

    // --- Fix Down Arrow Button Scroll ---
    // Ensure the down arrow scrolls to #expertise
    const downArrow = document.querySelector('.button.round-arrow');
    if (downArrow) {
        downArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#expertise');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // --- Redesign Up Button (Back to Top) ---
    // Remove previous backToTop if it exists
    const oldBackToTop = document.querySelector('.back-to-top');
    if (oldBackToTop) oldBackToTop.remove();

    // Create new up button with orange outline style
    const upButton = document.createElement('button');
    upButton.innerHTML = '<span class="icon solid solo fa-arrow-up"></span>';
    upButton.className = 'back-to-top orange-outline';
    upButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #fff;
        color: #f26b1d;
        border: 2.5px solid #f26b1d;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        font-size: 24px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(242, 107, 29, 0.13);
        transform: scale(0.8);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(upButton);

    // Hover effect for up button
    upButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(242, 107, 29, 0.18)';
        this.style.background = '#fff';
    });
    upButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(242, 107, 29, 0.13)';
        this.style.background = '#fff';
    });

    // Show/hide up button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            upButton.style.opacity = '1';
            upButton.style.visibility = 'visible';
            upButton.style.transform = 'scale(1)';
        } else {
            upButton.style.opacity = '0';
            upButton.style.visibility = 'hidden';
            upButton.style.transform = 'scale(0.8)';
        }
    });

    // Scroll to top on up button click
    upButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

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

    // Page transitions - fade in on load
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.4s ease-in-out';
        document.body.style.opacity = '1';
    });

    // Smooth page transitions for internal links
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="index.html"], a[href^="experience.html"], a[href^="blog.html"], a[href^="values.html"], a[href^="now.html"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only apply transition if it's a different page
            if (href !== window.location.pathname && !href.startsWith('#')) {
                document.body.style.transition = 'opacity 0.2s ease-out';
                document.body.style.opacity = '0.7';
            }
        });
    });

}); 
