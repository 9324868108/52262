document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Scroll animations
    const animateOnScroll = function() {
        const featureBoxes = document.querySelectorAll('.feature-box');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const statItems = document.querySelectorAll('.stat-item');
        const stepItems = document.querySelectorAll('.step-item');
        
        const animateItems = (items, className) => {
            items.forEach((item, index) => {
                const delay = item.dataset.delay ? parseFloat(item.dataset.delay) : index * 0.1;
                const itemTop = item.getBoundingClientRect().top;
                const itemBottom = item.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;
                
                if (itemTop < windowHeight - 100 && itemBottom > 0) {
                    setTimeout(() => {
                        item.classList.add(className);
                    }, delay * 1000);
                }
            });
        };
        
        // Animate feature boxes
        animateItems(featureBoxes, 'animate-in');
        
        // Animate testimonial cards
        animateItems(testimonialCards, 'animate-in');
        
        // Animate stat items
        animateItems(statItems, 'animate-in');
        
        // Animate step items
        animateItems(stepItems, 'animate-in');
    };

    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-box, .testimonial-card, .stat-item, .step-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat-item .stat-number {
            display: inline-block;
            transform: scale(0.5);
            transition: transform 0.5s ease;
        }
        
        .animate-in .stat-number {
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);

    // Run animations on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Add CSS for header scroll effect
    const headerStyle = document.createElement('style');
    headerStyle.textContent = `
        .header {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .header.scrolled {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
    `;
    document.head.appendChild(headerStyle);
});
