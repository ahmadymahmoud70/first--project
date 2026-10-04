// ===========================
// PARTICLES BACKGROUND
// ===========================
function createParticles() {
  const container = document.getElementById('particles');
  const count = 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
    p.style.animationDuration = (Math.random() * 15 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.5;
    container.appendChild(p);
  }
}
createParticles();

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===========================
// SMOOTH ACTIVE NAV HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--accent-light)';
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// ===========================
// ANIMATED COUNTER
// ===========================
function animateCounter(el, target) {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll(
  '.about-card, .product-card, .contact-card, .section-header, .hero-stats'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// Counters observer
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===========================
// BOOKING FORM SUBMISSION
// ===========================
const bookingForm = document.getElementById('bookingForm');
const successMsg  = document.getElementById('successMsg');

// Set minimum date to today
const dateInput = document.getElementById('deliveryDate');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

bookingForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Basic validation
  const required = ['companyName', 'contactName', 'phone', 'saltType', 'quantity', 'deliveryDate', 'governorate'];
  let valid = true;

  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#e74c3c';
      el.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.2)';
      valid = false;
    } else {
      el.style.borderColor = '';
      el.style.boxShadow = '';
    }
  });

  if (!valid) {
    showNotification('⚠️ يرجى ملء جميع الحقول المطلوبة', 'error');
    return;
  }

  // Phone validation
  const phone = document.getElementById('phone').value;
  if (!/^01[0-9]{9}$/.test(phone)) {
    showNotification('⚠️ يرجى إدخال رقم هاتف مصري صحيح', 'error');
    document.getElementById('phone').style.borderColor = '#e74c3c';
    return;
  }

  // Simulate form submission
  const submitBtn = bookingForm.querySelector('.submit-btn');
  submitBtn.textContent = 'جاري الإرسال...';
  submitBtn.disabled = true;

  setTimeout(() => {
    bookingForm.style.display = 'none';
    successMsg.classList.add('show');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    submitBtn.textContent = 'إرسال الطلب';
    submitBtn.disabled = false;
  }, 1500);
});

// Input focus restore border
document.querySelectorAll('.booking-form input, .booking-form select, .booking-form textarea').forEach(el => {
  el.addEventListener('input', () => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
  });
});

// ===========================
// RESET FORM
// ===========================
function resetForm() {
  bookingForm.reset();
  bookingForm.style.display = 'block';
  successMsg.classList.remove('show');
  bookingForm.scrollIntoView({ behavior: 'smooth' });
}

// ===========================
// TOAST NOTIFICATION
// ===========================
function showNotification(message, type = 'info') {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;

  const bgColor = type === 'error' ? '#e74c3c' : type === 'success' ? '#2d9b6e' : '#c9a227';

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(100px)',
    background: bgColor,
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '50px',
    fontFamily: "'Cairo', sans-serif",
    fontWeight: '600',
    fontSize: '0.95rem',
    zIndex: '9999',
    transition: 'transform 0.4s ease',
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
    whiteSpace: 'nowrap'
  });

  document.body.appendChild(toast);

  setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(0)'; }, 100);
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ===========================
// CRYSTAL HOVER INTERACTION
// ===========================
const crystalContainer = document.querySelector('.crystal-container');
if (crystalContainer) {
  document.addEventListener('mousemove', (e) => {
    const rect = crystalContainer.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / window.innerWidth;
    const dy = (e.clientY - cy) / window.innerHeight;
    crystalContainer.style.transform = `rotateX(${dy * 15}deg) rotateY(${dx * 15}deg)`;
  });
}

// ===========================
// SMOOTH SECTION TRANSITIONS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('%c🧂 Ahmed Wahid Aboshanab Salt Trading', 'color:#c9a227;font-size:16px;font-weight:bold;');
console.log('%cWebsite loaded successfully!', 'color:#2d9b6e;font-size:12px;');
