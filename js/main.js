/**
 * The Source Longevity - Main JavaScript
 * ======================================
 */

(function() {
  'use strict';

  // ----------------------------------------
  // DOM Elements
  // ----------------------------------------
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

  // ----------------------------------------
  // Utility Functions
  // ----------------------------------------

  /**
   * Debounce function to limit function calls
   */
  function debounce(func, wait = 10) {
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

  /**
   * Check if element is in viewport
   */
  function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
      rect.bottom >= 0
    );
  }

  // ----------------------------------------
  // Header Scroll Effect
  // ----------------------------------------
  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ----------------------------------------
  // Mobile Navigation
  // ----------------------------------------
  function toggleMobileNav() {
    if (!menuToggle || !mobileNav || !mobileNavOverlay) return;

    const isOpen = mobileNav.classList.contains('active');

    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function openMobileNav() {
    menuToggle.classList.add('active');
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  // ----------------------------------------
  // Smooth Scroll
  // ----------------------------------------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#" or empty
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          // Close mobile nav if open
          closeMobileNav();

          // Calculate offset for fixed header
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          history.pushState(null, null, href);
        }
      });
    });
  }

  // ----------------------------------------
  // Testimonials Slider
  // ----------------------------------------
  function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    const track = slider.querySelector('.testimonials-track');
    const slides = slider.querySelectorAll('.testimonial');
    const dots = slider.querySelectorAll('.testimonials-dot');

    if (!track || slides.length === 0) return;

    let currentSlide = 0;
    let autoplayInterval;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoplay();
        goToSlide(index);
        startAutoplay();
      });
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoplay();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
      }
    }

    // Initialize
    goToSlide(0);
    startAutoplay();
  }

  // ----------------------------------------
  // FAQ Accordion
  // ----------------------------------------
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');

      if (!question) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items (optional - remove for multi-open behavior)
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active', !isActive);
      });

      // Keyboard accessibility
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  // ----------------------------------------
  // Form Validation
  // ----------------------------------------
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
          const group = field.closest('.form-group');
          const errorElement = group ? group.querySelector('.form-error') : null;

          // Clear previous errors
          if (group) group.classList.remove('error');

          // Check if empty
          if (!field.value.trim()) {
            isValid = false;
            if (group) group.classList.add('error');
            if (errorElement) errorElement.textContent = 'This field is required';
            return;
          }

          // Email validation
          if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
              isValid = false;
              if (group) group.classList.add('error');
              if (errorElement) errorElement.textContent = 'Please enter a valid email address';
            }
          }

          // Phone validation (basic)
          if (field.type === 'tel') {
            const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
            if (field.value && !phoneRegex.test(field.value)) {
              isValid = false;
              if (group) group.classList.add('error');
              if (errorElement) errorElement.textContent = 'Please enter a valid phone number';
            }
          }
        });

        if (isValid) {
          // For demo purposes, show success message
          showFormSuccess(form);
        }
      });

      // Real-time validation on blur
      const fields = form.querySelectorAll('input, textarea, select');
      fields.forEach(field => {
        field.addEventListener('blur', function() {
          validateField(this);
        });

        // Clear error on input
        field.addEventListener('input', function() {
          const group = this.closest('.form-group');
          if (group) group.classList.remove('error');
        });
      });
    });
  }

  function validateField(field) {
    const group = field.closest('.form-group');
    const errorElement = group ? group.querySelector('.form-error') : null;

    if (!field.required && !field.value) return true;

    if (group) group.classList.remove('error');

    if (field.required && !field.value.trim()) {
      if (group) group.classList.add('error');
      if (errorElement) errorElement.textContent = 'This field is required';
      return false;
    }

    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        if (group) group.classList.add('error');
        if (errorElement) errorElement.textContent = 'Please enter a valid email address';
        return false;
      }
    }

    return true;
  }

  function showFormSuccess(form) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <h3>Thank You!</h3>
      <p>Your message has been received. We'll be in touch soon.</p>
    `;
    successMessage.style.cssText = `
      text-align: center;
      padding: 40px 20px;
      color: #1A4D2E;
    `;
    successMessage.querySelector('svg').style.cssText = `
      color: #1A4D2E;
      margin-bottom: 16px;
    `;
    successMessage.querySelector('h3').style.cssText = `
      font-size: 1.5rem;
      margin-bottom: 8px;
    `;

    // Replace form with success message
    form.style.display = 'none';
    form.parentNode.insertBefore(successMessage, form.nextSibling);
  }

  // ----------------------------------------
  // Scroll Animations
  // ----------------------------------------
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in');

    if (animatedElements.length === 0) return;

    function checkAnimations() {
      animatedElements.forEach(element => {
        if (isInViewport(element, 100)) {
          element.classList.add('visible');
        }
      });
    }

    // Initial check
    checkAnimations();

    // Check on scroll
    window.addEventListener('scroll', debounce(checkAnimations, 50));
  }

  // ----------------------------------------
  // Lazy Loading Images
  // ----------------------------------------
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });

      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // ----------------------------------------
  // Newsletter Form
  // ----------------------------------------
  function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button');

        if (!emailInput || !emailInput.value) return;

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          emailInput.style.borderColor = '#c53030';
          return;
        }

        // Show success state
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Subscribed!';
        submitButton.disabled = true;
        emailInput.value = '';
        emailInput.style.borderColor = '';

        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 3000);
      });
    });
  }

  // ----------------------------------------
  // Active Navigation Link
  // ----------------------------------------
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ----------------------------------------
  // Initialize Everything
  // ----------------------------------------
  function init() {
    // Header scroll effect
    handleHeaderScroll();
    window.addEventListener('scroll', debounce(handleHeaderScroll, 10));

    // Mobile navigation
    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMobileNav);
    }
    if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener('click', closeMobileNav);
    }
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
        closeMobileNav();
      }
    });

    // Initialize features
    initSmoothScroll();
    initTestimonialsSlider();
    initFAQAccordion();
    initFormValidation();
    initScrollAnimations();
    initLazyLoading();
    initNewsletterForm();
    setActiveNavLink();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
