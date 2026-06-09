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
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // -------------------------------
  // 4. MOBILE MENU TOGGLE
  // -------------------------------
  const mobileToggle  = document.getElementById('aic-mobile-toggle-btn');
  const mobileOverlay = document.getElementById('aic-mobile-overlay');

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });

    mobileOverlay.querySelectorAll('.aic-mobile-nav-link, .aic-mobile-give-btn').forEach(link => {
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
  const navLinks  = document.querySelectorAll('.aic-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
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
    if (statsSection.getBoundingClientRect().top < window.innerHeight - 100) {
      animated = true;
      statItems.forEach(item => {
        const target     = parseInt(item.getAttribute('data-count'));
        const numberSpan = item.querySelector('.aic-stat-number');
        if (!numberSpan) return;
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

      setTimeout(typeEffect, isDeleting ? 100 : 150);
    }

    typeEffect();
  }

  // -------------------------------
  // 8. TESTIMONIALS SLIDER
  // -------------------------------
  const track            = document.querySelector('.aic-testimonial-track');
  const dotsContainer    = document.querySelector('.aic-testimonial-dots');
  const testimonialCards = document.querySelectorAll('.aic-testimonial-card');

  if (track && dotsContainer && testimonialCards.length) {
    let currentIndex = 0;
    const cardCount  = testimonialCards.length;

    for (let i = 0; i < cardCount; i++) {
      const dotEl = document.createElement('div');
      dotEl.classList.add('dot');
      if (i === 0) dotEl.classList.add('active');
      dotEl.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dotEl);
    }

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    setInterval(() => goToSlide((currentIndex + 1) % cardCount), 5000);
  }

  // -------------------------------
  // 9. EVENT COUNTDOWN TIMERS
  // -------------------------------
  document.querySelectorAll('.aic-event-countdown').forEach(countdown => {
    const eventDateStr = countdown.getAttribute('data-event-date');
    if (!eventDateStr) return;
    const eventDate = new Date(eventDateStr);

    function updateCountdown() {
      const diff = eventDate - new Date();
      if (diff <= 0) { countdown.innerHTML = '<span style="color:var(--aic-gold-dark)">Event Ongoing!</span>'; return; }
      const days    = Math.floor(diff / 86400000);
      const hours   = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000)  / 60000);
      const ds = countdown.querySelector('.aic-countdown-days');
      const hs = countdown.querySelector('.aic-countdown-hours');
      const ms = countdown.querySelector('.aic-countdown-minutes');
      if (ds) ds.textContent = String(days).padStart(2, '0');
      if (hs) hs.textContent = String(hours).padStart(2, '0');
      if (ms) ms.textContent = String(minutes).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 60000);
  });

  // -------------------------------
  // 10. BIBLE VERSE OF THE DAY
  // -------------------------------
  const verseText = document.getElementById('aic-verse-text');
  const verseRef  = document.getElementById('aic-verse-reference');

  async function fetchBibleVerse() {
    try {
      const res  = await fetch('https://bible-api.com/john 3:16?translation=kjv');
      const data = await res.json();
      if (verseText && verseRef && data.text) {
        verseText.textContent = data.text;
        verseRef.textContent  = data.reference || 'John 3:16';
      }
    } catch {
      if (verseText) verseText.textContent = 'For God so loved the world that He gave His only begotten Son.';
      if (verseRef)  verseRef.textContent  = 'John 3:16';
    }
  }

  fetchBibleVerse();

  const verseClose  = document.getElementById('aic-verse-close');
  const verseWidget = document.getElementById('aic-bible-verse');
  if (verseClose && verseWidget) {
    verseClose.addEventListener('click', () => verseWidget.style.display = 'none');
  }

  // -------------------------------
  // 11. PRAYER REQUEST MODAL
  // -------------------------------
  const prayerBtn   = document.getElementById('aic-prayer-button');
  const prayerModal = document.getElementById('aic-prayer-modal');
  const modalClose  = document.querySelector('.aic-prayer-modal-close');

  if (prayerBtn && prayerModal) {
    prayerBtn.addEventListener('click', () => prayerModal.classList.add('active'));

    if (modalClose) {
      modalClose.addEventListener('click', () => prayerModal.classList.remove('active'));
    }

    prayerModal.addEventListener('click', (e) => {
      if (e.target === prayerModal) prayerModal.classList.remove('active');
    });
  }

  // -------------------------------
  // 12. BACK TO TOP BUTTON
  // -------------------------------
  const backToTop = document.getElementById('aic-back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => backToTop.classList.toggle('active', window.scrollY > 500));
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // -------------------------------
  // 13. SMOOTH SCROLL FOR ALL ANCHORS
  // -------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.pageYOffset - 80,
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
      const target = document.getElementById('aic-mission-vision-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // -------------------------------
  // 15. AOS INITIALIZATION
  // -------------------------------
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }

  // -------------------------------
  // 16. PARTICLES EFFECT FOR HERO
  // -------------------------------
  const particlesContainer = document.getElementById('aic-hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 4 + 1 + 'px';
      p.style.cssText = `
        position:absolute;
        width:${size};height:${size};
        background-color:rgba(218,165,32,${Math.random() * 0.3});
        border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation:aic-particle-float ${Math.random() * 10 + 5}s linear infinite;
        animation-delay:${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(p);
    }

    const styleTag = document.createElement('style');
    styleTag.textContent = `
      @keyframes aic-particle-float {
        0%   { transform: translateY(0) translateX(0); opacity: 0; }
        20%  { opacity: 1; }
        80%  { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
      }
    `;
    document.head.appendChild(styleTag);
  }

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
      if (prayerModal) prayerModal.classList.remove('active');
    });
  }

  // -------------------------------
  // 19. NEWSLETTER SUBSCRIBE
  // -------------------------------
  const newsletterBtn   = document.querySelector('.aic-footer-newsletter button');
  const newsletterInput = document.querySelector('.aic-footer-newsletter input');
  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
      if (newsletterInput.value.trim()) {
        alert('Thank you for subscribing to our newsletter!');
        newsletterInput.value = '';
      } else {
        alert('Please enter your email address.');
      }
    });
  }

// -------------------------------------------------------
// 20. SERMONS — Fetch 3 latest videos from YouTube RSS
//     Tries multiple CORS proxies in sequence
// -------------------------------------------------------
(function loadYouTubeSermons() {
  const CHANNEL_ID = 'UCVvfiMkgFRf66KPAJjYiXKg';
  const FEED_URL   = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const grid       = document.getElementById('aic-sermons-grid');
  if (!grid) return;

  // Multiple proxies tried in order — if one fails, next is used
  const PROXIES = [
    url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    url => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    url => `https://thingproxy.freeboard.io/fetch/${url}`,
  ];

  // Render skeleton cards while loading
  function showSkeletons() {
    grid.innerHTML = Array(3).fill(`
      <div class="aic-sermon-card-modern aic-sermon-skeleton">
        <div class="aic-sermon-media aic-skeleton-block" style="height:180px;"></div>
        <div class="aic-sermon-details" style="padding:1.2rem;">
          <div class="aic-skeleton-line aic-skeleton-title"></div>
          <div class="aic-skeleton-line aic-skeleton-sub"></div>
          <div class="aic-skeleton-line aic-skeleton-body"></div>
        </div>
      </div>`).join('');
  }

  // Build a sermon card from a parsed XML entry
function buildCard(entry) {
    const title   = entry.querySelector('title')?.textContent?.trim() || 'Untitled';
    const videoId = entry.querySelector('videoId')?.textContent?.trim() || '';
    const videoUrl= `https://www.youtube.com/watch?v=${videoId}`;
    const thumb   = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const pubRaw  = entry.querySelector('published')?.textContent || '';

    // Ordinal suffix helper
    function ordinal(n) {
      const s = ['th','st','nd','rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    let pubDate = '';
    if (pubRaw) {
      const d = new Date(pubRaw);
      const day   = d.getUTCDate();
      const month = d.toLocaleDateString('en-KE', { month: 'short', timeZone: 'UTC' });
      const year  = d.getUTCFullYear();
      pubDate = `${ordinal(day)} ${month} ${year}`;
    }

    const rawDesc = entry.querySelector('description')?.textContent?.trim() || '';
    const desc    = rawDesc.length > 200 ? rawDesc.slice(0, 200) + '…' : rawDesc || 'A message from AIC Kongowea.';

    return `
      <div class="aic-sermon-card-modern" data-aos="fade-up">
        <a href="${videoUrl}" target="_blank" rel="noopener noreferrer"
           class="aic-sermon-thumb-wrap" aria-label="Watch: ${title}">
          <img src="${thumb}" alt="${title}" loading="lazy">
          <div class="aic-sermon-thumb-overlay">
            <i class="fab fa-youtube"></i>
          </div>
          <span class="aic-sermon-pub-date">${pubDate}</span>
        </a>
        <div class="aic-sermon-details">
          <h3>${title}</h3>
          <p class="aic-sermon-scripture">
            <i class="fab fa-youtube" style="color:var(--aic-gold-medium);margin-right:5px;"></i>
            AIC Kongowea
          </p>
          <p>${desc}</p>
          <div class="aic-sermon-actions">
            <a href="${videoUrl}" target="_blank" rel="noopener noreferrer" class="aic-sermon-btn">
              <i class="fab fa-youtube"></i> Watch
            </a>
            <a href="https://www.youtube.com/@aickongowea001" target="_blank"
               rel="noopener noreferrer" class="aic-sermon-btn">
              <i class="fas fa-list"></i> Channel
            </a>
          </div>
        </div>
      </div>`;
  }

  // Show fallback card linking to channel
  function showFallback() {
    grid.innerHTML = `
      <div class="aic-sermon-card-modern" style="grid-column:1/-1;text-align:center;padding:2.5rem 1rem;">
        <div class="aic-sermon-media" style="height:120px;display:flex;align-items:center;justify-content:center;">
          <i class="fab fa-youtube" style="font-size:4rem;color:var(--aic-gold-dark);"></i>
        </div>
        <div class="aic-sermon-details">
          <h3>Watch Our Latest Sermons</h3>
          <p class="aic-sermon-scripture">AIC Kongowea — YouTube Channel</p>
          <p>Visit our YouTube channel to watch the latest messages, worship services, and teachings.</p>
          <div class="aic-sermon-actions" style="justify-content:center;">
            <a href="https://www.youtube.com/@aickongowea001" target="_blank"
               rel="noopener noreferrer" class="aic-sermon-btn">
              <i class="fab fa-youtube"></i> Visit Channel
            </a>
          </div>
        </div>
      </div>`;
  }

  // Try each proxy in sequence until one works
  async function tryProxies(proxies, index = 0) {
    if (index >= proxies.length) {
      showFallback();
      return;
    }

    try {
      const proxyUrl = proxies[index](FEED_URL);
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(6000) });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // allorigins returns JSON wrapper; others return raw XML
      let xmlText;
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json();
        xmlText = json.contents;
      } else {
        xmlText = await res.text();
      }

      const xml     = new DOMParser().parseFromString(xmlText, 'text/xml');
      const entries = Array.from(xml.querySelectorAll('entry')).slice(0, 3);

      if (!entries.length) throw new Error('No entries in feed');

      grid.innerHTML = entries.map(buildCard).join('');
      if (typeof AOS !== 'undefined') AOS.refresh();

    } catch (err) {
      console.warn(`Sermon proxy ${index + 1} failed:`, err.message);
      tryProxies(proxies, index + 1); // try next proxy
    }
  }

  showSkeletons();
  tryProxies(PROXIES);

})();


}); // end DOMContentLoaded