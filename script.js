// =====================================================
// AIC KONGOWEA - COMPLETE INTERACTIVE SCRIPT
// Animations | Counters | Mobile Menu | Sliders | More
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // -------------------------------
  // 1. PRELOADER
  // -------------------------------
  const preloader = document.getElementById('aic-preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1500);
  }
  
  // -------------------------------
  // 2. CURSOR TRAILER (Custom Cursor)
  // -------------------------------
  const trailer = document.getElementById('aic-cursor-trailer');
  const dot = document.getElementById('aic-cursor-dot');
  
  if (trailer && dot) {
    document.addEventListener('mousemove', (e) => {
      trailer.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    document.querySelectorAll('a, button, .aic-ministry-card-flip, .aic-sermon-card-modern, .aic-event-card-modern').forEach(el => {
      el.addEventListener('mouseenter', () => {
        trailer.style.width = '60px';
        trailer.style.height = '60px';
        trailer.style.borderColor = 'var(--aic-gold-light)';
        trailer.style.backgroundColor = 'rgba(218, 165, 32, 0.1)';
        dot.style.width = '10px';
        dot.style.height = '10px';
      });
      el.addEventListener('mouseleave', () => {
        trailer.style.width = '40px';
        trailer.style.height = '40px';
        trailer.style.borderColor = 'var(--aic-gold-medium)';
        trailer.style.backgroundColor = 'transparent';
        dot.style.width = '6px';
        dot.style.height = '6px';
      });
    });
  }
  
  // -------------------------------
  // 3. HEADER SCROLL EFFECT
  // -------------------------------
  const header = document.getElementById('aic-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // -------------------------------
  // 4. MOBILE MENU TOGGLE
  // -------------------------------
  const mobileToggle = document.getElementById('aic-mobile-toggle-btn');
  const mobileOverlay = document.getElementById('aic-mobile-overlay');
  
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });
    
    const mobileLinks = mobileOverlay.querySelectorAll('.aic-mobile-nav-link, .aic-mobile-give-btn');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // -------------------------------
  // 5. ACTIVE NAVIGATION HIGHLIGHT
  // -------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.aic-nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('aic-nav-link-active');
      const href = link.getAttribute('href');
      if (href && href.substring(1) === current) {
        link.classList.add('aic-nav-link-active');
      }
    });
  });
  
  // -------------------------------
  // 6. STATISTICS COUNTER ANIMATION
  // -------------------------------
  const statItems = document.querySelectorAll('.aic-stat-item');
  let animated = false;
  
  function animateNumbers() {
    if (animated) return;
    const statsSection = document.getElementById('aic-hero-stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      animated = true;
      statItems.forEach(item => {
        const target = parseInt(item.getAttribute('data-count'));
        const numberSpan = item.querySelector('.aic-stat-number');
        if (numberSpan) {
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              numberSpan.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              numberSpan.textContent = Math.floor(current).toLocaleString();
            }
          }, 25);
        }
      });
    }
  }
  
  window.addEventListener('scroll', animateNumbers);
  animateNumbers();
  
  // -------------------------------
  // 7. TYPED TEXT ANIMATION FOR HERO
  // -------------------------------
  const typedElement = document.getElementById('aic-typed-text');
  if (typedElement) {
    const words = ['Faith', 'Hope', 'Love', 'Grace', 'Peace'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
      
      const speed = isDeleting ? 100 : 150;
      setTimeout(typeEffect, speed);
    }
    
    typeEffect();
  }
  
  // -------------------------------
  // 8. TESTIMONIALS SLIDER
  // -------------------------------
  const track = document.querySelector('.aic-testimonial-track');
  const dotsContainer = document.querySelector('.aic-testimonial-dots');
  const testimonialCards = document.querySelectorAll('.aic-testimonial-card');
  
  if (track && dotsContainer && testimonialCards.length) {
    let currentIndex = 0;
    const cardCount = testimonialCards.length;
    
    // Create dots
    for (let i = 0; i < cardCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    
    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % cardCount;
      goToSlide(currentIndex);
    }
    
    setInterval(nextSlide, 5000);
  }
  
  // -------------------------------
  // 9. EVENT COUNTDOWN TIMERS
  // -------------------------------
  const countdowns = document.querySelectorAll('.aic-event-countdown');
  
  countdowns.forEach(countdown => {
    const eventDateStr = countdown.getAttribute('data-event-date');
    if (eventDateStr) {
      const eventDate = new Date(eventDateStr);
      
      function updateCountdown() {
        const now = new Date();
        const diff = eventDate - now;
        
        if (diff <= 0) {
          countdown.innerHTML = 'Event Started!';
          return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (86400000)) / (3600000));
        const minutes = Math.floor((diff % (3600000)) / (60000));
        
        const daysSpan = countdown.querySelector('.aic-countdown-days');
        const hoursSpan = countdown.querySelector('.aic-countdown-hours');
        const minutesSpan = countdown.querySelector('.aic-countdown-minutes');
        
        if (daysSpan) daysSpan.textContent = days.toString().padStart(2, '0');
        if (hoursSpan) hoursSpan.textContent = hours.toString().padStart(2, '0');
        if (minutesSpan) minutesSpan.textContent = minutes.toString().padStart(2, '0');
      }
      
      updateCountdown();
      setInterval(updateCountdown, 60000);
    }
  });
  
  // -------------------------------
  // 10. BIBLE VERSE OF THE DAY (FETCH from API)
  // -------------------------------
  const verseText = document.getElementById('aic-verse-text');
  const verseRef = document.getElementById('aic-verse-reference');
  
  async function fetchBibleVerse() {
    try {
      const response = await fetch('https://bible-api.com/john 3:16?translation=kjv');
      const data = await response.json();
      if (verseText && verseRef && data.text) {
        verseText.textContent = data.text;
        verseRef.textContent = data.reference || 'John 3:16';
      }
    } catch (error) {
      if (verseText) verseText.textContent = 'For God so loved the world that He gave His only begotten Son.';
      if (verseRef) verseRef.textContent = 'John 3:16';
    }
  }
  
  fetchBibleVerse();
  
  // Close verse widget
  const verseClose = document.getElementById('aic-verse-close');
  const verseWidget = document.getElementById('aic-bible-verse');
  if (verseClose && verseWidget) {
    verseClose.addEventListener('click', () => {
      verseWidget.style.display = 'none';
    });
  }
  
  // -------------------------------
  // 11. PRAYER REQUEST MODAL
  // -------------------------------
  const prayerBtn = document.getElementById('aic-prayer-button');
  const prayerModal = document.getElementById('aic-prayer-modal');
  const modalClose = document.querySelector('.aic-prayer-modal-close');
  
  if (prayerBtn && prayerModal) {
    prayerBtn.addEventListener('click', () => {
      prayerModal.classList.add('active');
    });
    
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        prayerModal.classList.remove('active');
      });
    }
    
    prayerModal.addEventListener('click', (e) => {
      if (e.target === prayerModal) {
        prayerModal.classList.remove('active');
      }
    });
  }
  
  // -------------------------------
  // 12. BACK TO TOP BUTTON
  // -------------------------------
  const backToTop = document.getElementById('aic-back-to-top');
  
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // -------------------------------
  // 13. SMOOTH SCROLL FOR ALL ANCHORS
  // -------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // -------------------------------
  // 14. SCROLL INDICATOR CLICK
  // -------------------------------
  const scrollIndicator = document.getElementById('aic-scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.getElementById('aic-mission-vision-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // -------------------------------
  // 15. AOS INITIALIZATION
  // -------------------------------
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }
  
  // -------------------------------
  // 16. PARTICLES EFFECT FOR HERO
  // -------------------------------
  const particlesContainer = document.getElementById('aic-hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 4 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = `rgba(218, 165, 32, ${Math.random() * 0.3})`;
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `aic-particle-float ${Math.random() * 10 + 5}s linear infinite`;
      particle.style.animationDelay = Math.random() * 5 + 's';
      particlesContainer.appendChild(particle);
    }
  }
  
  // Add keyframes for particles dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes aic-particle-float {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  // -------------------------------
  // 17. CONTACT FORM SUBMIT
  // -------------------------------
  const contactForm = document.getElementById('aic-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // -------------------------------
  // 18. PRAYER FORM SUBMIT
  // -------------------------------
  const prayerForm = document.getElementById('aic-prayer-form');
  if (prayerForm) {
    prayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your prayer request has been submitted. We are praying with you!');
      prayerForm.reset();
      prayerModal.classList.remove('active');
    });
  }
  
  // -------------------------------
  // 19. NEWSLETTER SUBSCRIBE
  // -------------------------------
  const newsletterBtn = document.querySelector('.aic-footer-newsletter button');
  const newsletterInput = document.querySelector('.aic-footer-newsletter input');
  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
      if (newsletterInput.value) {
        alert('Thank you for subscribing to our newsletter!');
        newsletterInput.value = '';
      } else {
        alert('Please enter your email address.');
      }
    });
  }
  
  console.log('AIC Kongowea website loaded successfully!');
});