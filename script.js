const header = document.querySelector('.site-header');
const links = [...document.querySelectorAll('.nav-links a')];
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function updateNavigation() {
  header.classList.toggle('scrolled', window.scrollY > 80);
  const marker = window.scrollY + 130;
  sections.forEach(section => {
    const current = marker >= section.offsetTop && marker < section.offsetTop + section.offsetHeight;
    const link = links.find(item => item.getAttribute('href') === `#${section.id}`);
    if (link) link.classList.toggle('active', current);
  });
}
window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

toggle.addEventListener('click', () => {
  const opened = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', opened);
  toggle.setAttribute('aria-label', opened ? 'Close navigation menu' : 'Open navigation menu');
});
links.forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const form = document.querySelector('.contact-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const message = form.querySelector('.form-message');
  if (!form.checkValidity()) { form.reportValidity(); return; }
  message.textContent = 'Thanks — your message is on its way. We’ll be in touch soon.';
  form.reset();
});

const testimonials = [
  ['“Nexora brought a level of thoughtfulness and creative energy that completely changed how we see our brand. They don’t just make things look good — they make them matter.”', 'Maya Chen', 'Chief Marketing Officer, Northstar'],
  ['“Their team made a complex launch feel surprisingly clear and exciting. The result exceeded every expectation we had.”', 'Arjun Mehta', 'Founder, Ciela'],
  ['“They were true partners from day one: generous with ideas, exacting in craft, and focused on outcomes.”', 'Sofia Hayes', 'Product Director, Kanso']
];
let testimonialIndex = 0;
function changeTestimonial(direction) {
  testimonialIndex = (testimonialIndex + direction + testimonials.length) % testimonials.length;
  const [quote, name, role] = testimonials[testimonialIndex];
  document.querySelector('blockquote > p').textContent = quote;
  document.querySelector('blockquote footer b').textContent = name;
  document.querySelector('blockquote footer span').textContent = role;
  document.querySelectorAll('.slider-dots i').forEach((dot, i) => dot.classList.toggle('selected', i === testimonialIndex));
}
document.querySelector('.prev').addEventListener('click', () => changeTestimonial(-1));
document.querySelector('.next').addEventListener('click', () => changeTestimonial(1));
