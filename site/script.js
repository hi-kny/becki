// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
toggle.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
navList.addEventListener('click', e => {
  if (e.target.closest('a')) {
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Service links pre-select the matching project type in the form
document.querySelectorAll('[data-type]').forEach(link => {
  link.addEventListener('click', () => {
    const radio = document.querySelector(`input[name="type"][value="${link.dataset.type}"]`);
    if (radio) radio.checked = true;
  });
});

// Gallery lightbox
const lightbox = document.querySelector('.lightbox');
const lbImg = lightbox.querySelector('img');
document.querySelectorAll('.g').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.showModal();
  });
});
lightbox.addEventListener('click', () => lightbox.close());

// Gentle fade-in as sections scroll into view
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('main section:not(.hero) > *').forEach(el => {
  el.classList.add('reveal');
  io.observe(el);
});

document.getElementById('year').textContent = new Date().getFullYear();

// Inquiry form → Google Sheet (via the Apps Script web app in /apps-script)
const form = document.getElementById('inquiry-form');
const statusEl = form.querySelector('.form-status');
const thanks = document.querySelector('.form-thanks');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const endpoint = form.dataset.endpoint;
  const button = form.querySelector('button[type="submit"]');
  statusEl.className = 'form-status';
  if (!endpoint || endpoint.startsWith('PASTE_')) {
    statusEl.textContent = 'The form isn’t connected yet. Please email instead.';
    statusEl.classList.add('error');
    return;
  }
  button.disabled = true;
  statusEl.textContent = 'Sending…';
  try {
    const res = await fetch(endpoint, { method: 'POST', body: new FormData(form) });
    const data = await res.json();
    if (data.result !== 'ok') throw new Error(data.error || 'Something went wrong.');
    form.hidden = true;
    thanks.hidden = false;
    thanks.focus();
  } catch (err) {
    statusEl.textContent = 'Sorry, that didn’t go through. Please try again or email me directly.';
    statusEl.classList.add('error');
    button.disabled = false;
  }
});
