// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Hero Slideshow
    const slides = document.querySelectorAll('.hero-slideshow img');
    let currentSlide = 0;

    function nextSlide() {
        // Remove active class and fade out current slide
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].style.opacity = '0';
        
        // Move to next slide (loop back to 0 if at the end)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to next slide after a short delay
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
        }, 1000);
    }

    // Set first slide as active
    if (slides.length > 0) {
        slides[0].classList.add('active');
        // Start slideshow if there are slides
        setInterval(nextSlide, 10000);
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle hamburger to X animation
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // Language switcher
    const languageButtons = document.querySelectorAll('.language-switcher button');
    
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('janaAcademyLanguage') || 'en';
    setLanguage(savedLanguage);
    
    // Set active button based on saved language
    languageButtons.forEach(button => {
        if (button.getAttribute('data-lang') === savedLanguage) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update active button
            languageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Set language
            setLanguage(lang);
            
            // Save preference
            localStorage.setItem('janaAcademyLanguage', lang);
        });
    });
    
    function setLanguage(lang) {
        // Set the document language
        document.documentElement.lang = lang;
        
        // Toggle visibility of language-specific elements
        const enElements = document.querySelectorAll('[data-lang-en]');
        const arElements = document.querySelectorAll('[data-lang-ar]');
        
        if (lang === 'en') {
            enElements.forEach(el => el.style.display = 'block');
            arElements.forEach(el => el.style.display = 'none');
            document.body.style.direction = 'ltr';
            document.body.style.textAlign = 'left';
        } else if (lang === 'ar') {
            enElements.forEach(el => el.style.display = 'none');
            arElements.forEach(el => el.style.display = 'block');
            document.body.style.direction = 'rtl';
            document.body.style.textAlign = 'right';
        }
        
        // Handle bilingual elements (elements that have both languages)
        const bilingualElements = document.querySelectorAll('[data-bilingual]');
        bilingualElements.forEach(el => {
            const enContent = el.querySelector('[data-lang-en]');
            const arContent = el.querySelector('[data-lang-ar]');
            
            if (enContent && arContent) {
                if (lang === 'en') {
                    enContent.style.display = 'block';
                    arContent.style.display = 'none';
                } else if (lang === 'ar') {
                    enContent.style.display = 'none';
                    arContent.style.display = 'block';
                }
            }
        });
    }

    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const lang = document.documentElement.lang;
            const buttonLang = this.hasAttribute('data-lang-en') ? 'en' : 'ar';

            // Only process if button matches current language
            if ((lang === 'en' && buttonLang === 'en') || (lang === 'ar' && buttonLang === 'ar')) {
                // Remove active class from all buttons of the same language
                filterButtons.forEach(btn => {
                    if ((btn.hasAttribute('data-lang-en') && lang === 'en') || 
                        (btn.hasAttribute('data-lang-ar') && lang === 'ar')) {
                        btn.classList.remove('active');
                    }
                });

                // Add active class to clicked button
                this.classList.add('active');

                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
}); 