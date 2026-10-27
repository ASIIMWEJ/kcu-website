'use strict';
document.querySelectorAll('.more-btn').forEach(btn => btn.addEventListener('click', () => {
  const grid = document.getElementById(btn.dataset.expand);
  const open = grid.classList.toggle('open');
  btn.textContent = open ? 'Show less â†‘' : (btn.dataset.expand === 'staff-grid' ? 'Show all staff â†“' : 'Show all programmes â†“');
}));
document.querySelectorAll('#course-form, #staff-form').forEach(f => f.addEventListener('input', () => {
  const g = document.getElementById(f.id === 'course-form' ? 'course-grid' : 'staff-grid'); g.classList.add('open');
}));
const courseSearch = document.getElementById('course-search');
const courseLevel = document.getElementById('course-level');
const courseSchool = document.getElementById('course-school');
const courses = Array.from(document.querySelectorAll('.course'));
function filterCourses() {
  const query = courseSearch.value.trim().toLocaleLowerCase();
  let count = 0;
  courses.forEach(card => {
    const matches = (!query || card.textContent.toLocaleLowerCase().includes(query)) &&
      (courseLevel.value === 'all' || card.dataset.level === courseLevel.value) &&
      (courseSchool.value === 'all' || card.dataset.school === courseSchool.value);
    card.hidden = !matches;
    if (matches) count++;
  });
  document.getElementById('results-count').textContent = `${count} featured programme${count === 1 ? '' : 's'} found`;
  document.getElementById('no-results').hidden = count !== 0;
}
document.getElementById('course-form').addEventListener('submit', event => {
  event.preventDefault();
  filterCourses();
});
// Keyword and study level filters are applied with Search Programme.

courseSchool.addEventListener('change', filterCourses);
filterCourses();

document.getElementById('undergraduate-link').addEventListener('click', event => {
  event.preventDefault(); courseSearch.value = ''; courseLevel.value = 'degree'; courseSchool.value = 'all';
  filterCourses(); document.getElementById('results-count').scrollIntoView({block:'center'});
});
// Home slider
(() => {
  const root = document.querySelector('.slider'); if (!root) return;
  const slides = [...root.querySelectorAll('.slide')], dots = root.querySelector('.s-dots'), pause = root.querySelector('.s-pause');
  let i = 0, timer = null, paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  slides.forEach((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Go to slide ${n + 1}`); b.addEventListener('click', () => { go(n); restart(); }); dots.appendChild(b); });
  let ready = false;
  const tabsBox = root.querySelector('.hero-tabs');
  const labels = ['Learn. Lead. Make a difference!', 'Apply today', 'A global network', 'Campus news'];
  const goTo = n => { if (pinned) window.scrollTo({ top: pin.offsetTop + n * window.innerHeight * STEP + 2, behavior: 'smooth' }); else { go(n); restart(); } };
  const tabs = slides.map((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = labels[n] || `Story ${n + 1}`; b.addEventListener('click', () => goTo(n)); tabsBox.appendChild(b); return b; });
  function go(n, dir) {
    n = (n + slides.length) % slides.length;
    if (ready && n === i) return;
    dir = dir || (n >= i ? 1 : -1);
    const cur = slides[i], nxt = slides[n];
    if (ready) {
      slides.forEach(s => { if (s !== cur && s !== nxt) { s.classList.remove('is-active', 'is-leaving'); s.style.transform = ''; } });
      root.style.setProperty('--dir', dir);
      nxt.classList.remove('is-leaving');
      nxt.style.transition = 'none'; nxt.style.transform = `translateX(${dir * 100}%)`;
      void nxt.offsetWidth;
      nxt.style.transition = ''; nxt.style.transform = '';
      cur.style.transform = `translateX(${-dir * 100}%)`;
      cur.classList.remove('is-active'); cur.classList.add('is-leaving');
      clearTimeout(cur._t); cur._t = setTimeout(() => { cur.classList.remove('is-leaving'); cur.style.transform = ''; }, 450);
    }
    nxt.classList.add('is-active');
    i = n; ready = true;
    tabs.forEach((t, k) => { t.classList.toggle('is-on', k === i); t.setAttribute('aria-selected', String(k === i)); });
    [...dots.children].forEach((d, k) => k === i ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current'));
  }
  function restart() { clearInterval(timer); if (!paused && !pinned) timer = setInterval(() => go(i + 1, 1), 6500); }
  // Scroll-driven mode: the hero stays pinned while scrolling steps through every slide, then the page continues.
  let pinned = false;
  const pin = document.createElement('div'); pin.className = 'slider-pin';
  root.parentNode.insertBefore(pin, root); pin.appendChild(root);
  const STEP = 0.25;
  function layoutPin() {
    pinned = root.offsetHeight <= window.innerHeight && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    pin.classList.toggle('is-pinned', pinned);
    pin.style.height = pinned ? `${root.offsetHeight + (slides.length - 1) * window.innerHeight * STEP}px` : '';
    root.querySelector('.s-pause').hidden = pinned;
    restart(); onPinScroll();
  }
  function onPinScroll() {
    if (!pinned) return;
    const prog = Math.max(0, -pin.getBoundingClientRect().top);
    const n = Math.min(slides.length - 1, Math.floor(prog / (window.innerHeight * STEP) + 0.0001));
    if (n !== i) go(n);
  }
  window.addEventListener('scroll', onPinScroll, { passive: true });
  window.addEventListener('resize', layoutPin);
  layoutPin();
  root.querySelector('.s-prev').addEventListener('click', () => { go(i - 1, -1); restart(); });
  root.querySelector('.s-next').addEventListener('click', () => { go(i + 1, 1); restart(); });
  pause.addEventListener('click', () => { paused = !paused; pause.textContent = paused ? 'â–¶' : 'âšâš'; pause.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow'); restart(); });
  root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { go(i - 1, -1); restart(); } if (e.key === 'ArrowRight') { go(i + 1, 1); restart(); } });
  go(0); restart();
})();

// Scroll progress bar, reveal-on-scroll, animated counters and floating Apply button
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bar = document.createElement('div'); bar.className = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
  const apply = document.createElement('a'); apply.className = 'float-apply'; apply.href = 'https://apply.kcu.ac.ug'; apply.textContent = 'Apply now →';
  if (!/https:\/\/apply\.kcu\.ac\.ug$/.test(location.href)) document.body.appendChild(apply);
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
    apply.classList.toggle('show', scrollY > innerHeight * 0.9);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (reduce || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.section .wrap > *, .quick, .story, .event, .course, .adm-banner .wrap > *');
  targets.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  targets.forEach(el => io.observe(el));
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
    const tick = t => { const p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en') + suf; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));
})();