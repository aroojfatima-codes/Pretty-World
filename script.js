/**
 * Pretty Little World ✨ - Pink Aesthetic Girl's Lifestyle Theme
 * Vanilla JavaScript Functionality
 *
 * Features:
 * 1. Mobile Navigation & Sticky Header
 * 2. Smooth Scrolling & Active Link Highlighting
 * 3. Daily Inspiration Random Quote Generator & Copy
 * 4. Pinterest Gallery Filters & Interactive Like Counters
 * 5. Fullscreen Lightbox Modal
 * 6. Lifestyle Pillars Deep-Dive Modal
 * 7. Contact Form Real-time Validation & Success Modal
 * 8. Footer Newsletter Subscription
 * 9. Scroll Reveal Animations (IntersectionObserver)
 * 10. Back to Top Smooth Scroll
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. NAVIGATION & HEADER CONTROLS
     ========================================================================== */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const closeActionBtns = document.querySelectorAll('.nav-close-action');

  function syncNavigationForViewport() {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (!isMobile) {
      navMenu.classList.remove('active');
      hamburgerBtn.classList.remove('active');
      navBackdrop.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
      navMenu.setAttribute('aria-hidden', 'false');
      navBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } else if (!navMenu.classList.contains('active')) {
      navMenu.setAttribute('aria-hidden', 'true');
    }
  }

  // Toggle Mobile Menu
  function toggleMobileMenu(open = null) {
    const wasOpen = navMenu.classList.contains('active');
    const isOpen = open !== null ? open : !navMenu.classList.contains('active');
    navMenu.classList.toggle('active', isOpen);
    hamburgerBtn.classList.toggle('active', isOpen);
    navBackdrop.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburgerBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    navMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    navBackdrop.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      navMenu.querySelector('.nav-link')?.focus();
    } else if (wasOpen && navMenu.contains(document.activeElement)) {
      hamburgerBtn.focus();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => toggleMobileMenu());
  }
  if (navMenu && hamburgerBtn && navBackdrop) {
    syncNavigationForViewport();
    window.addEventListener('resize', syncNavigationForViewport);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Close mobile menu when nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  closeActionBtns.forEach(btn => {
    btn.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Sticky Header On Scroll
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ==========================================================================
     2. SMOOTH SCROLLING & ACTIVE SECTION HIGHLIGHTING
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // Smooth scroll with offset for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#!' || !targetId.startsWith('#')) return;

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

  /* ==========================================================================
     3. DAILY INSPIRATION RANDOM QUOTE GENERATOR
     ========================================================================== */
  const quotesCollection = [
    {
      text: "You are allowed to be both a masterpiece and a work in progress simultaneously. Trust your gentle glow.",
      author: "Chérie Whisper",
      category: "Self-Love"
    },
    {
      text: "Confidence is not about walking into a room thinking you are better than everyone; it is walking in with no need to compare.",
      author: "Grace & Poise",
      category: "Confidence"
    },
    {
      text: "Romanticize the little things: morning sunlight, fresh peony petals, warm tea, and your own soft presence.",
      author: "Cozy Journal",
      category: "Mindfulness"
    },
    {
      text: "Your sensitivity is your secret superpower. Never apologize for having a tender heart in a loud world.",
      author: "Gentle Reminders",
      category: "Inner Strength"
    },
    {
      text: "Bloom on your own timeline. A rose never rushes its fragrance, yet it captivates the entire garden.",
      author: "Floral Soul",
      category: "Patience"
    },
    {
      text: "Protect your soft energy. What is meant for you will never require you to sacrifice your inner serenity.",
      author: "Peaceful Mind",
      category: "Boundaries"
    },
    {
      text: "Dream boldly in pastel and ink. The life you are imagining is quietly preparing its doors for you.",
      author: "Vision & Hope",
      category: "Dreams"
    },
    {
      text: "Give yourself credit for how far you've come. You survived days you thought you couldn't, with grace in your smile.",
      author: "Sweet Affirmations",
      category: "Growth"
    },
    {
      text: "When in doubt, choose kindness, wear your favorite lip glaze, and let your authentic light do the talking.",
      author: "Radiant Beauty",
      category: "Happiness"
    },
    {
      text: "You don't have to carry the whole world on your shoulders. Rest, hydrate, and know you are deeply enough.",
      author: "Self-Care Ritual",
      category: "Wellness"
    }
  ];

  let currentQuoteIndex = 0;
  const quoteDisplayArea = document.getElementById('quote-display-area');
  const quoteTextElem = document.getElementById('quote-text');
  const quoteAuthorElem = document.getElementById('quote-author');
  const quoteCategoryElem = document.getElementById('quote-category');
  const newQuoteBtn = document.getElementById('new-quote-btn');
  const quoteBtnIcon = document.getElementById('quote-btn-icon');
  const copyQuoteBtn = document.getElementById('copy-quote-btn');
  const copyBtnText = document.getElementById('copy-btn-text');

  function renderRandomQuote() {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * quotesCollection.length);
    } while (nextIndex === currentQuoteIndex && quotesCollection.length > 1);

    currentQuoteIndex = nextIndex;
    const selected = quotesCollection[currentQuoteIndex];

    // Icon spin animation
    if (quoteBtnIcon) {
      quoteBtnIcon.classList.add('fa-spin');
      setTimeout(() => quoteBtnIcon.classList.remove('fa-spin'), 600);
    }

    // Text fade-out then fade-in
    if (quoteDisplayArea) {
      quoteDisplayArea.classList.add('fade-out');

      setTimeout(() => {
        quoteTextElem.textContent = selected.text;
        quoteAuthorElem.textContent = selected.author;
        quoteCategoryElem.textContent = selected.category;
        quoteDisplayArea.classList.remove('fade-out');
      }, 300);
    }
  }

  if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', renderRandomQuote);
  }

  // Copy Quote to Clipboard
  if (copyQuoteBtn) {
    copyQuoteBtn.addEventListener('click', async () => {
      const quoteString = `"${quoteTextElem.textContent}" — ${quoteAuthorElem.textContent}`;
      try {
        await navigator.clipboard.writeText(quoteString);
        copyBtnText.textContent = "Copied! 💌";
        showToast("Affirmation copied to your clipboard!", "🌸");
        setTimeout(() => {
          copyBtnText.textContent = "Copy Quote";
        }, 2200);
      } catch (err) {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = quoteString;
        tempTextarea.setAttribute('readonly', '');
        tempTextarea.style.position = 'fixed';
        tempTextarea.style.opacity = '0';
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        let copied = false;
        try {
          copied = document.execCommand('copy');
        } catch (copyError) {
          console.error('Clipboard fallback failed.', copyError);
        } finally {
          tempTextarea.remove();
        }
        if (!copied) {
          showToast("Your browser couldn't copy this quote. Please select it and copy it manually.", "♡");
          return;
        }
        copyBtnText.textContent = "Copied! 💌";
        showToast("Affirmation copied to your clipboard!", "🌸");
        setTimeout(() => {
          copyBtnText.textContent = "Copy Quote";
        }, 2200);
      }
    });
  }

  /* ==========================================================================
     4. GALLERY FILTER & INTERACTIVE PIN LIKES
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterBtns.forEach((filterButton) => {
        filterButton.setAttribute('aria-pressed', String(filterButton === this));
      });

      const filterVal = this.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Pin Like Button Functionality
  const likeBtns = document.querySelectorAll('.btn-like-pin');
  likeBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const countSpan = this.querySelector('.like-count');
      const isLiked = this.classList.contains('liked');

      let currentCountStr = countSpan.textContent.trim();
      let isKilo = currentCountStr.includes('k');
      let baseCount = parseFloat(currentCountStr) * (isKilo ? 1000 : 1);

      if (!isLiked) {
        this.classList.add('liked');
        this.setAttribute('aria-pressed', 'true');
        baseCount += 1;
        showToast("Saved to your favorites! 💖", "✨");
      } else {
        this.classList.remove('liked');
        this.setAttribute('aria-pressed', 'false');
        baseCount = Math.max(0, baseCount - 1);
      }

      if (baseCount >= 1000) {
        countSpan.textContent = (baseCount / 1000).toFixed(1) + 'k';
      } else {
        countSpan.textContent = Math.round(baseCount);
      }
    });
  });

  /* ==========================================================================
     5. LIGHTBOX MODAL (GALLERY PREVIEWS)
     ========================================================================== */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const viewPinBtns = document.querySelectorAll('.btn-view-pin');
  let lightboxTrigger = null;

  function openLightbox(imgSrc, caption) {
    if (!lightboxModal) return;
    lightboxTrigger = document.activeElement;
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption || "Aesthetic Pinterest Moment";
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
    if (lightboxTrigger instanceof HTMLElement) lightboxTrigger.focus();
  }

  viewPinBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const fullUrl = this.getAttribute('data-full');
      const caption = this.getAttribute('data-caption');
      openLightbox(fullUrl, caption);
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  /* ==========================================================================
     6. LIFESTYLE PILLARS DEEP-DIVE MODAL
     ========================================================================== */
  const lifestyleModal = document.getElementById('lifestyle-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-content');
  const exploreLifestyleBtns = document.querySelectorAll('.btn-explore-lifestyle');
  let lifestyleTrigger = null;

  const lifestyleDetailsData = {
    beauty: {
      tag: "Beauty & Skincare Ritual",
      title: "The Glass-Skin Floral Glow Routine",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      description: "True radiance starts with gentle hydration, barrier nourishment, and honoring your skin's natural glow without harsh layers.",
      steps: [
        { num: "01", title: "Double Cleansing Ritual", desc: "Melt daily impurities with a soothing camellia oil cleanser, followed by a soft rosewater gel wash." },
        { num: "02", title: "Petal Essence Layering", desc: "Pat 3 lightweight layers of hyaluronic and damask rose essence into damp skin for an instant dewy bounce." },
        { num: "03", title: "Peptide Barrier Cream", desc: "Seal hydration with a ceramide cloud cream to protect against environmental stress and lock in hydration." },
        { num: "04", title: "Rosy Lip Glaze & SPF 50", desc: "Finish with high-protection mineral sunscreen and a nourishing peptide gloss for a natural, effortless shine." }
      ]
    },
    fashion: {
      tag: "Aesthetic Wardrobe",
      title: "The Feminine Soft Silhouette Guide",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      description: "Cultivating an ethereal, timeless wardrobe that feels comfortable, romantic, and uniquely tailored to your personality.",
      steps: [
        { num: "01", title: "Curated Pastel Foundations", desc: "Build your base with blush cardigans, ivory pleated skirts, and breathable linen or silk blouses." },
        { num: "02", title: "The Ribbon & Pearl Philosophy", desc: "Add delicate satin bows in hair twists and subtle freshwater pearls for a timeless, classy aesthetic." },
        { num: "03", title: "Comfortable Elegance", desc: "Pair flowing midi dresses with soft ballet flats or pristine white sneakers for a cute, practical everyday look." },
        { num: "04", title: "Signature Scent Match", desc: "Complete your outfit with a light mist of peony, white tea, and vanilla to match your soft energy." }
      ]
    },
    wellness: {
      tag: "Mindful Living",
      title: "Cozy Self-Care & Nervous System Calm",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      description: "Creating quiet sacred moments throughout the week to unplug from noise, recharge your spirit, and listen to your body.",
      steps: [
        { num: "01", title: "Morning Jasmine or Matcha", desc: "Sip warm tea without looking at a screen for the first 20 minutes of your day to honor your peace." },
        { num: "02", title: "Brain-Dump Journaling", desc: "Pour unorganized thoughts onto pastel stationery with zero judgment. Once written, let them go." },
        { num: "03", title: "Epsom Salt Lavender Soak", desc: "Immerse in warm water with magnesium flakes, soothing soft music, and a flickering coconut wax candle." },
        { num: "04", title: "Digital Sunset at 9 PM", desc: "Switch devices to bedtime mode and wind down with silk pillowcases and gentle breathing exercises." }
      ]
    },
    dreams: {
      tag: "Soft Ambition",
      title: "Aesthetic Vision Mapping & Manifestation",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
      description: "Manifesting your deepest goals doesn't require burnout. It thrives on clear intentions, creative alignment, and joyful consistency.",
      steps: [
        { num: "01", title: "Define the Vibe of Your Future Self", desc: "How does she feel when she wakes up? What is she creating? Capture the emotion behind every milestone." },
        { num: "02", title: "Pinterest Moodboard Creation", desc: "Collect imagery, palettes, and quotes that spark joy and align with your educational, creative, or career goals." },
        { num: "03", title: "Micro-Habit Implementation", desc: "Break overwhelming dreams into 15-minute daily micro-actions that build compounding momentum." },
        { num: "04", title: "Celebrating Every Bloom", desc: "Reward yourself for consistency, not just outcomes. Every small step forward is worthy of pink confetti." }
      ]
    }
  };

  function openLifestyleModal(pillarKey) {
    const data = lifestyleDetailsData[pillarKey];
    if (!data || !modalContent || !lifestyleModal) return;

    modalContent.innerHTML = `
      <div class="modal-lifestyle-header">
        <span class="modal-lifestyle-tag">🎀 ${data.tag}</span>
        <h3 class="modal-lifestyle-title" id="modal-title">${data.title}</h3>
      </div>
      <img src="${data.image}" alt="${data.title}" class="modal-lifestyle-img">
      <p class="modal-lifestyle-description">${data.description}</p>
      <div class="modal-lifestyle-steps">
        ${data.steps.map(s => `
          <div class="modal-step-item">
            <span class="modal-step-num">${s.num}</span>
            <div class="modal-step-text">
              <strong>${s.title}</strong>
              <span>${s.desc}</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="text-align: center; margin-top: 1.5rem;">
        <button class="btn btn-primary btn-sm modal-action-btn" type="button">
          <span>Apply to My Routine</span>
          <i class="fa-solid fa-sparkles"></i>
        </button>
      </div>
    `;

    lifestyleTrigger = document.activeElement;
    lifestyleModal.classList.add('active');
    lifestyleModal.setAttribute('aria-hidden', 'false');
    lifestyleModal.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeLifestyleModal() {
    if (!lifestyleModal) return;
    lifestyleModal.classList.remove('active');
    lifestyleModal.setAttribute('aria-hidden', 'true');
    lifestyleModal.setAttribute('aria-modal', 'false');
    document.body.style.overflow = '';
    if (lifestyleTrigger instanceof HTMLElement) lifestyleTrigger.focus();
  }

  exploreLifestyleBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const pillarKey = this.getAttribute('data-lifestyle');
      openLifestyleModal(pillarKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeLifestyleModal);
  }

  if (modalContent) {
    modalContent.addEventListener('click', (event) => {
      if (event.target.closest('.modal-action-btn')) closeLifestyleModal();
    });
  }

  if (lifestyleModal) {
    lifestyleModal.addEventListener('click', (e) => {
      if (e.target === lifestyleModal) closeLifestyleModal();
    });
  }

  /* ==========================================================================
     7. CONTACT FORM VALIDATION & SUCCESS MODAL
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const messageInput = document.getElementById('user-message');
  const submitBtn = document.getElementById('submit-btn');

  const nameGroup = document.getElementById('name-group');
  const emailGroup = document.getElementById('email-group');
  const messageGroup = document.getElementById('message-group');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const successModal = document.getElementById('success-modal');
  const successCloseBtn = document.getElementById('success-close-btn');
  const successOkBtn = document.getElementById('success-ok-btn');
  const recipientNameSpan = document.getElementById('success-recipient-name');
  let successTrigger = null;

  // Regex for standard email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateName() {
    const val = nameInput.value.trim();
    if (val.length < 2) {
      nameInput.setAttribute('aria-invalid', 'true');
      nameGroup.classList.add('has-error');
      nameGroup.classList.remove('has-success');
      nameError.textContent = "Please enter your pretty name (at least 2 letters).";
      return false;
    }
    nameInput.setAttribute('aria-invalid', 'false');
    nameGroup.classList.remove('has-error');
    nameGroup.classList.add('has-success');
    return true;
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    if (!emailRegex.test(val)) {
      emailInput.setAttribute('aria-invalid', 'true');
      emailGroup.classList.add('has-error');
      emailGroup.classList.remove('has-success');
      emailError.textContent = "Please enter a valid email address (e.g. name@domain.com).";
      return false;
    }
    emailInput.setAttribute('aria-invalid', 'false');
    emailGroup.classList.remove('has-error');
    emailGroup.classList.add('has-success');
    return true;
  }

  function validateMessage() {
    const val = messageInput.value.trim();
    if (val.length < 10) {
      messageInput.setAttribute('aria-invalid', 'true');
      messageGroup.classList.add('has-error');
      messageGroup.classList.remove('has-success');
      messageError.textContent = "Please share a little more sweet detail (at least 10 characters).";
      return false;
    }
    messageInput.setAttribute('aria-invalid', 'false');
    messageGroup.classList.remove('has-error');
    messageGroup.classList.add('has-success');
    return true;
  }

  // Real-time input listeners
  if (nameInput) nameInput.addEventListener('input', validateName);
  if (emailInput) emailInput.addEventListener('input', validateEmail);
  if (messageInput) messageInput.addEventListener('input', validateMessage);

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMsgValid = validateMessage();

      if (isNameValid && isEmailValid && isMsgValid) {
        // Simulation Loading State
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Sending sparkles...</span>
          <i class="fa-solid fa-wand-magic-sparkles fa-spin"></i>
        `;

        setTimeout(() => {
          // Restore button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;

          // Open Success Modal with name
          const enteredName = nameInput.value.trim();
          if (recipientNameSpan) {
            recipientNameSpan.textContent = enteredName || "darling";
          }

          if (successModal) {
            successTrigger = submitBtn;
            successModal.classList.add('active');
            successModal.setAttribute('aria-hidden', 'false');
            successModal.setAttribute('aria-modal', 'true');
            document.body.style.overflow = 'hidden';
            successCloseBtn.focus();
          }

          // Reset Form and State
          contactForm.reset();
          [nameGroup, emailGroup, messageGroup].forEach(g => {
            if (g) g.classList.remove('has-success', 'has-error');
          });

          showToast("Sweet note sent with love! 💌", "🌸");
        }, 800);
      } else {
        const firstInvalidInput = [nameInput, emailInput, messageInput]
          .find((input) => input.getAttribute('aria-invalid') === 'true');
        firstInvalidInput?.focus();
        // Shake button for feedback
        submitBtn.style.animation = 'pulseSoft 0.4s ease';
        setTimeout(() => submitBtn.style.animation = '', 400);
      }
    });
  }

  function closeSuccessModal() {
    if (!successModal) return;
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
    successModal.setAttribute('aria-modal', 'false');
    document.body.style.overflow = '';
    if (successTrigger instanceof HTMLElement) successTrigger.focus();
  }

  if (successCloseBtn) successCloseBtn.addEventListener('click', closeSuccessModal);
  if (successOkBtn) successOkBtn.addEventListener('click', closeSuccessModal);
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) closeSuccessModal();
    });
  }

  /* ==========================================================================
     8. FOOTER NEWSLETTER SUBSCRIPTION
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterMsg = document.getElementById('newsletter-msg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const val = newsletterEmail.value.trim();

      if (emailRegex.test(val)) {
        newsletterMsg.style.color = '#10b981';
        newsletterMsg.textContent = "🎀 Welcome to the Pretty Circle!";
        showToast("Subscribed with sparkles! ✨", "💌");
        newsletterForm.reset();
        setTimeout(() => {
          newsletterMsg.textContent = "";
        }, 4000);
      } else {
        newsletterMsg.style.color = '#e11d48';
        newsletterMsg.textContent = "Please enter a valid email address.";
      }
    });
  }

  /* ==========================================================================
     9. SWEET TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  const sweetToast = document.getElementById('sweet-toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  let toastTimeout;

  function showToast(message, icon = "✨") {
    if (!sweetToast) return;
    clearTimeout(toastTimeout);

    toastMessage.textContent = message;
    toastIcon.textContent = icon;
    sweetToast.classList.add('active');

    toastTimeout = setTimeout(() => {
      sweetToast.classList.remove('active');
    }, 3200);
  }

  /* ==========================================================================
     10. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ==========================================================================
     11. BACK TO TOP FLOATING BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top-btn');

  function handleBackToTopVisibility() {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     12. DYNAMIC YEAR IN FOOTER
     ========================================================================== */
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Global ESC key listener to close any open modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && lightboxModal.classList.contains('active')) closeLightbox();
      if (lifestyleModal && lifestyleModal.classList.contains('active')) {
        closeLifestyleModal();
      }
      if (successModal && successModal.classList.contains('active')) closeSuccessModal();
      if (navMenu && navMenu.classList.contains('active')) {
        toggleMobileMenu(false);
        hamburgerBtn.focus();
      }
    }

    if (e.key === 'Tab') {
      const activeDialog = document.querySelector('.modal.active, .lightbox-modal.active');
      if (!activeDialog) return;

      const focusableElements = [...activeDialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )].filter((element) => element.getClientRects().length > 0);
      if (!focusableElements.length) {
        e.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });

});
