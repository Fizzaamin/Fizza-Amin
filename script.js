
// ── Cursor glow
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// ── Scroll progress
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = (scrollY / (document.body.scrollHeight - innerHeight)) * 100;
  bar.style.width = pct + '%';
});

// ── Navbar
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 60);
});

// ── Hamburger
const ham = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
ham.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Theme toggle
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
let dark = true;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.className = dark ? 'fas fa-moon' : 'fas fa-sun';
});

// ── Fade-up on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Skill bars
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(f => {
        setTimeout(() => { f.style.width = f.dataset.w + '%' }, 200);
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-group').forEach(g => barObserver.observe(g));

// ── Contact form
function handleSend() {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg = document.getElementById('f-msg').value.trim();
  if(!name || !email || !msg) {
    alert('Please fill in all fields.');
    return;
  }
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
  document.getElementById('f-name').value = '';
  document.getElementById('f-email').value = '';
  document.getElementById('f-msg').value = '';
}

// ── Smooth reveal hero on load
window.addEventListener('load', () => {
  document.querySelectorAll('.fade-up').forEach((el, i) => {
    if(el.getBoundingClientRect().top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), i * 100);
    }
  });
});
