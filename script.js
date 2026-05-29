const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

const certsLink = document.querySelector('.certs-link');
const certsDropdown = document.getElementById('certsDropdown');

if (certsLink && certsDropdown) {
  certsLink.addEventListener('click', (e) => {
    e.preventDefault();
    certsDropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!certsDropdown.contains(e.target) && !certsLink.contains(e.target)) {
      certsDropdown.classList.remove('active');
    }
  });
}

const certThumbs = Array.from(document.querySelectorAll('.certs-dropdown img'));
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certPrev = document.getElementById('certPrev');
const certNext = document.getElementById('certNext');
const certClose = document.getElementById('certModalClose');
const certDownload = document.getElementById('certDownload');
let currentCertIndex = -1;

function openCert(index) {
  if (index < 0 || index >= certThumbs.length) return;
  const image = certThumbs[index];
  const href = image.parentElement?.href || image.src;

  certModalImg.src = image.src;
  certDownload.href = href;
  currentCertIndex = index;
  certModal.classList.add('active');
  certModal.setAttribute('aria-hidden', 'false');
}

function closeCert() {
  certModal.classList.remove('active');
  certModal.setAttribute('aria-hidden', 'true');
  certModalImg.src = '';
  currentCertIndex = -1;
}

certThumbs.forEach((img, index) => {
  img.addEventListener('click', (event) => {
    event.preventDefault();
    openCert(index);
  });
});

if (certPrev) {
  certPrev.addEventListener('click', () => {
    if (currentCertIndex > 0) openCert(currentCertIndex - 1);
  });
}

if (certNext) {
  certNext.addEventListener('click', () => {
    if (currentCertIndex < certThumbs.length - 1) openCert(currentCertIndex + 1);
  });
}

if (certClose) {
  certClose.addEventListener('click', closeCert);
}

if (certModal) {
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeCert();
  });
}

document.addEventListener('keydown', (e) => {
  if (currentCertIndex === -1) return;
  if (e.key === 'ArrowRight' && currentCertIndex < certThumbs.length - 1) {
    openCert(currentCertIndex + 1);
  } else if (e.key === 'ArrowLeft' && currentCertIndex > 0) {
    openCert(currentCertIndex - 1);
  } else if (e.key === 'Escape') {
    closeCert();
  }
});