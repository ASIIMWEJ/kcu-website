'use strict';
// Shared header and footer for every page. Edit navigation and footer links here only.
const NAV = [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html',
    intro: ['About KCU', 'A chartered, innovation-driven university in Kampala, guided by the motto “Ignite the Future”.'],
    groups: [['Our university', [['About KCU', 'about.html'], ['Vice Chancellor’s message', 'about.html#vc'], ['Staff directory', 'staff-directory.html'], ['Partnerships', 'about.html#partners']]],
             ['Community', [['Graduation', 'graduation.html'], ['Alumni', 'alumni.html'], ['Careers', 'careers.html']]]],
    feature: ['graduates-welcome-group.webp', '6th Graduation Ceremony', 'graduation.html'] },
  { label: 'Admissions', href: 'apply.kcu.ac.ug',
    intro: ['Admissions', 'January intake is open. Find entry requirements, fees and start your application.'],
    groups: [['Apply', [['Apply online', 'apply.kcu.ac.ug'], ['Admission requirements', 'apply.kcu.ac.ug'], ['Fees structure', 'fees.html']]],
             ['Pathways', [['Undergraduate entry', 'admissions.html'], ['Diploma &amp; HEC', 'apply.kcu.ac.ug'], ['Mature &amp; international', 'apply.kcu.ac.ug']]]],
    feature: ['library-collaboration.webp', 'Apply for the January intake', 'apply.kcu.ac.ug'] },
  { label: 'Academics', href: 'programmes.html',
    intro: ['Academics', 'Degrees, diplomas, certificates and short courses across three schools.'],
    groups: [['Study', [['All programmes', 'programmes.html'], ['Fees structure', 'fees.html'], ['Graduation', 'graduation.html'], ['Academia portal', 'academia.kcu.ac.ug']]],
             ['Schools', [['Medicine, Health &amp; Life Sciences', 'schools.html#health'], ['Law &amp; Management Sciences', 'schools.html#law'], ['Science, Computing &amp; Engineering', 'schools.html#science']]],
             ['Learning', [['K-Class', 'vclass.kcu.ac.ug'], ['Academia portal', 'academia.kcu.ac.ug'], ['Library', 'library.kcu.ac.ug']]]],
    feature: ['lab-chemistry-students.webp', 'Explore our programmes', 'programmes.html'] },
  { label: 'Student life', href: 'student-life.html',
    intro: ['Student life', 'A vibrant community of learners and leaders.'],
    groups: [['Campus', [['Life at KCU', 'student-life.html'], ['Student Guild', 'student-life.html#guild'], ['News &amp; events', 'index.html#events']]],
             ['Support', [['Library', 'library.kcu.ac.ug'], ['Academia portal', 'academia.kcu.ac.ug'], ['K-Class', 'vclass.kcu.ac.ug']]]],
    feature: ['_88A4517.jpg', 'Life beyond the classroom', 'student-life.html'] },
  { label: 'News', href: 'news.html' },
  { label: 'Contact', href: 'index.html#contact' }
];
const UTILITY = [['Academia', 'academia.kcu.ac.ug'], ['K-Class', 'vclass.kcu.ac.ug'], ['Library', 'library.kcu.ac.ug'], ['Alumni', 'alumni.html'], ['Careers', 'careers.html'], ['Fees', 'fees.html']];
const page = location.pathname.split('/').pop() || 'index.html';
const isActive = item => item.href.split('#')[0] === page && !item.href.includes('#') ||
  (item.groups || []).some(g => g[1].some(c => c[1] === page)) ||
  (page === 'programme.html' && item.href === 'programmes.html');

const navHtml = NAV.map(item => {
  const mega = item.groups ? `<div class="mega" role="region" aria-label="${item.label} menu">
    <div class="mega-intro"><h3>${item.intro[0]}</h3><p>${item.intro[1]}</p><a class="text-link" href="https://apply.kcu.ac.ug">Go to ${item.label.toLowerCase()} →</a></div>
    <div class="mega-cols">${item.groups.map(g => `<div><h4>${g[0]}</h4><ul>${g[1].map(c => `<li><a href="${c[1]}">${c[0]}</a></li>`).join('')}</ul></div>`).join('')}</div>
    <a class="mega-feature" href="${item.feature[2]}"><img src="assets/img/${item.feature[0]}" alt="" loading="lazy"><span>${item.feature[1]} →</span></a>
  </div>` : '';
  return `<div class="nav-item${item.groups ? ' has-sub' : ''}"><a href="${item.href}"${isActive(item) ? ' aria-current="page"' : ''}${item.groups ? ' aria-haspopup="true"' : ''}>${item.label}</a>${mega}</div>`;
}).join('');

const headerHtml = `<a class="skip" href="#main">Skip to content</a>
<header class="float-head" id="site-nav">
  <div class="utility"><span class="util-phone">+256 200 911 450</span>${UTILITY.map(u => `<a href="${u[1]}">${u[0]}</a>`).join('')}</div>
  <div class="head-row">
    <a class="brand" href="index.html" aria-label="King Ceasor University home"><img class="crest" src="assets/img/LOGO.png" alt="" width="56" height="56"><span><span class="brand-name">King Ceasor University</span><span class="brand-sub">“Ignite the Future”</span></span></a>
    <nav class="main-nav" aria-label="Main navigation">
      <button class="mobile-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links">☰ Menu</button>
      <div class="nav-links" id="nav-links">${navHtml}<a class="btn gold nav-apply" href="https://apply.kcu.ac.ug">Apply now</a></div>
    </nav>
  </div>
</header>`;

const footerHtml = `<footer class="footer"><div class="wrap">
<div class="footer-contact">
  <a class="footer-brand" href="index.html" aria-label="King Ceasor University home"><img src="assets/img/footer-logo-transparent.png" alt="King Ceasor University"></a>
  <div class="footer-contact-item"><h4>Email</h4><a href="mailto:info@kcu.ac.ug">info@kcu.ac.ug</a></div>
  <div class="footer-contact-item"><h4>Phone</h4><a href="tel:+256200911450">+256 200 911 450</a></div>
  <div class="footer-social"><h4>Social links</h4><div class="socials"><a href="https://www.facebook.com/kcu.ac.ug" rel="noopener">Facebook</a><a href="https://x.com/KingCeasorUni" rel="noopener">X</a><a href="https://ug.linkedin.com/company/king-ceasor-university" rel="noopener">LinkedIn</a><a href="https://www.youtube.com/@kingceasoruniversitytv" rel="noopener">YouTube</a></div></div>
</div>
<div class="footer-grid">
  <div><h4>Our campus</h4><ul><li><a href="about.html">About KCU</a></li><li><a href="alumni.html">Alumni network</a></li><li><a href="library.html">University library</a></li><li><a href="student-life.html">Campus life</a></li></ul></div>
  <div><h4>Useful links</h4><ul><li><a href="schools.html">Schools</a></li><li><a href="programmes.html">Programmes</a></li><li><a href="index.html#events">Campus events</a></li><li><a href="apply.html">How to apply</a></li></ul></div>
  <div class="footer-cta"><h4>Study at KCU</h4><p>Discover a programme, start your application or get in touch with our team.</p><a class="btn gold" href="programmes.html">Explore programmes <span aria-hidden="true">→</span></a><a class="footer-cta-link" href="mailto:info@kcu.ac.ug">Contact the University</a></div>
</div>
<div class="copyright"><span>© ${new Date().getFullYear()} King Ceasor University. All rights reserved.</span><a href="#top">Back to the top ↑</a></div></div></footer>
<button class="back-top" id="back-top" type="button" aria-label="Back to top" hidden>↑</button>`;

document.getElementById('site-header').outerHTML = headerHtml;
document.getElementById('site-footer').outerHTML = footerHtml;

const head = document.getElementById('site-nav');
const toggle = document.getElementById('menu-toggle');
const links = document.getElementById('nav-links');
if (document.getElementById('home')) head.classList.add('is-home');
const onScroll = () => head.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

function closeMenu(returnFocus = false) {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  links.classList.toggle('open', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', e => {
  const sub = a.parentElement.classList.contains('has-sub') && a.parentElement.firstElementChild === a;
  if (sub && window.matchMedia('(max-width: 980px)').matches && !a.parentElement.classList.contains('sub-open')) { e.preventDefault(); links.querySelectorAll('.sub-open').forEach(x => x.classList.remove('sub-open')); a.parentElement.classList.add('sub-open'); return; }
  closeMenu();
}));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && links.classList.contains('open')) closeMenu(true); });
document.addEventListener('click', e => { if (!e.target.closest('#site-nav')) closeMenu(); });
window.matchMedia('(min-width: 981px)').addEventListener('change', () => closeMenu());

const backTop = document.getElementById('back-top');
const updateBackTop = () => { backTop.hidden = window.scrollY < 600; };
window.addEventListener('scroll', updateBackTop, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
updateBackTop();
