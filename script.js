// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = this.getInitialTheme();
        this.init();
    }

    getInitialTheme() {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        // Default to light
        return 'light';
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateThemeIcon();
        
        // Update body class for additional styling if needed
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.handleScroll();
        this.hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }

    toggleMobileMenu() {
        this.navMenu?.classList.toggle('active');
        this.hamburger?.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.hamburger?.classList.remove('active');
    }
}

// Course Filter Management
class CourseFilterManager {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.categoryBtns = document.querySelectorAll('.category-btn');
        this.courseCards = document.querySelectorAll('.course-card');
        this.blogCards = document.querySelectorAll('.blog-card');
        this.searchInput = document.getElementById('course-search');
        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterCourses(e));
        });

        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterBlog(e));
        });

        this.searchInput?.addEventListener('input', (e) => this.searchCourses(e.target.value));
    }

    filterCourses(e) {
        const filter = e.target.getAttribute('data-filter');
        
        // Update active button
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filter courses
        this.courseCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterBlog(e) {
        const filter = e.target.getAttribute('data-category');
        
        // Update active button
        this.categoryBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filter blog posts
        this.blogCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchCourses(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        this.courseCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const category = card.querySelector('.course-category')?.textContent.toLowerCase() || '';
            
            if (title.includes(term) || description.includes(term) || category.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// FAQ Management
class FAQManager {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question?.addEventListener('click', () => this.toggleFAQ(item));
        });
    }

    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        this.faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Form Management
class FormManager {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.newsletterForms = document.querySelectorAll('.newsletter-form');
        this.init();
    }

    init() {
        this.contactForm?.addEventListener('submit', (e) => this.handleContactForm(e));
        this.newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleNewsletterForm(e));
        });
    }

    handleContactForm(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate form submission
        this.showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.contactForm.reset();
    }

    handleNewsletterForm(e) {
        e.preventDefault();
        
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (this.validateEmail(email)) {
            this.showMessage('Successfully subscribed to our newsletter!', 'success');
            emailInput.value = '';
        } else {
            this.showMessage('Please enter a valid email address.', 'error');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4ade80' : '#ef4444'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease forwards;
        `;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}

// Animation Management
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(`
            .feature-card,
            .course-card,
            .testimonial-card,
            .blog-card,
            .instructor-card,
            .value-card,
            .diff-item
        `);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    setupScrollAnimations() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat h3, .impact-stat h3');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const suffix = element.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    }
}

// Load More Functionality
class LoadMoreManager {
    constructor() {
        this.loadMoreBtn = document.getElementById('load-more');
        this.loadMoreArticlesBtn = document.getElementById('load-more-articles');
        this.init();
    }

    init() {
        this.loadMoreBtn?.addEventListener('click', () => this.loadMoreCourses());
        this.loadMoreArticlesBtn?.addEventListener('click', () => this.loadMoreArticles());
    }

    loadMoreCourses() {
        // Simulate loading more courses
        this.loadMoreBtn.textContent = 'Loading...';
        this.loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            this.loadMoreBtn.textContent = 'Load More Courses';
            this.loadMoreBtn.disabled = false;
            this.showMessage('More courses loaded!', 'success');
        }, 1000);
    }

    loadMoreArticles() {
        // Simulate loading more articles
        this.loadMoreArticlesBtn.textContent = 'Loading...';
        this.loadMoreArticlesBtn.disabled = true;
        
        setTimeout(() => {
            this.loadMoreArticlesBtn.textContent = 'Load More Articles';
            this.loadMoreArticlesBtn.disabled = false;
            this.showMessage('More articles loaded!', 'success');
        }, 1000);
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4ade80' : '#ef4444'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease forwards;
        `;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}

// Course Enrollment
class EnrollmentManager {
    constructor() {
        this.enrollButtons = document.querySelectorAll('.btn-primary');
        this.init();
    }

    init() {
        this.enrollButtons.forEach(btn => {
            if (btn.textContent.includes('Enroll')) {
                btn.addEventListener('click', (e) => this.handleEnrollment(e));
            }
        });
    }

    handleEnrollment(e) {
        e.preventDefault();
        const courseTitle = e.target.closest('.course-card')?.querySelector('h3')?.textContent || 'this course';
        
        // Create modal or redirect to enrollment page
        this.showEnrollmentModal(courseTitle);
    }

    showEnrollmentModal(courseTitle) {
        const modal = document.createElement('div');
        modal.className = 'enrollment-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease forwards;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--bg-color);
            padding: 2rem;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            color: var(--text-color);
            animation: slideInUp 0.3s ease forwards;
        `;

        modalContent.innerHTML = `
            <h3>Enroll in ${courseTitle}</h3>
            <p>Ready to start your learning journey? This course includes:</p>
            <ul style="text-align: left; margin: 1rem 0;">
                <li>✓ Lifetime access to course materials</li>
                <li>✓ Certificate of completion</li>
                <li>✓ 1-on-1 mentor support</li>
                <li>✓ Access to private community</li>
                <li>✓ 30-day money-back guarantee</li>
            </ul>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button class="btn btn-primary" onclick="this.closest('.enrollment-modal').remove()">Enroll Now</button>
                <button class="btn btn-outline" onclick="this.closest('.enrollment-modal').remove()">Cancel</button>
            </div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Smooth Scrolling
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    [data-color-scheme="dark"] .navbar.scrolled {
        background: rgba(15, 23, 42, 0.95) !important;
    }

    .nav-menu.active {
        left: 0 !important;
    }

    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new CourseFilterManager();
    new FAQManager();
    new FormManager();
    new AnimationManager();
    new LoadMoreManager();
    new EnrollmentManager();
    new SmoothScrollManager();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page is visible, resume animations if needed
        document.querySelectorAll('.paused').forEach(el => {
            el.classList.remove('paused');
        });
    } else {
        // Page is hidden, pause animations to save resources
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.classList.add('paused');
        });
    }
});

// Performance optimization
window.addEventListener('load', () => {
    // Remove loading states
    document.querySelectorAll('.loading').forEach(el => {
        el.classList.remove('loading');
    });
    
    // Preload critical images
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Optionally send error to analytics service
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        NavigationManager,
        CourseFilterManager,
        FAQManager,
        FormManager,
        AnimationManager,
        LoadMoreManager,
        EnrollmentManager,
        SmoothScrollManager
    };
}