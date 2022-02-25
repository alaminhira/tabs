'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const header = document.querySelector('.header');
const section1 = document.getElementById('section--1');
const allSections = document.querySelectorAll('.section');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = [...document.querySelectorAll('.operations__content')];
const imgTargets = document.querySelectorAll('img[data-src]');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
};

const closeModal = function () {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
};

document.addEventListener('keydown', function (e) {
  e.key === 'Escape' && closeModal();
});

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);

// ///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log('Current scroll (X/Y): ', window.pageXOffset, window.pageYOffset);

  // console.log('Height/Width of vierport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  // window.scrollTo({
  //     left: 0,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: "smooth"
  // });
  // console.log(s1coords.top, window.pageYOffset);

  section1.scrollIntoView({
    behavior: 'smooth'
  });
});

//////////////////////////////////////////
// Page navigation

// 1. Add event listener to a common parent element
// 2. determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
});

//////////////////////////////////////////
// Tab component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

//////////////////////////////////////////
// Manu fade animation
const handleHover = function(e){
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "arguments" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////
// // Sticky navigation
// const section1Top = section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function(e){
//   if (this.scrollY > section1Top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
//   console.log(this.scrollY, section1Top);
// });

// Sticky navigation: Intersection observer api
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries){
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

//////////////////////////////////////////
// Reveal sections
const revealSection = function(entries, observer) {
  const [entry] = entries;
  
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//////////////////////////////////////////
// Lazy loading images
const loadImg = function(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
    this.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////////
// Slider
let curSlide = 0;
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

slider.style.transform = 'scale(.3) translateX(-300px)'
slider.style.overflow = 'visible';

slides.forEach((s, i) => {
  // 0%, 100%, 200%, 300%
  s.style.transform = `translateX(${100 * i}%)`;
});

// Next slide
btnRight.addEventListener('click', function() {
  
});





















//////////////////////////////////////////

// // Selecting Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// // const allSections = document.querySelectorAll('.section');
// // console.log(document.getElementById('section-1'));

// // const btns = document.getElementsByTagName('button');
// // console.log(document.getElementsByClassName('btn'));

// // Creating and Inserting Elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookies to improve functionality and analytics. <button class="btn btn--close-cookie">Got it!';

// header.prepend(message); 
// header.append(message.cloneNode(true)); 

// header.before(message);
// header.after(message);

// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   // header.remove(message);
//   message.remove();
//   // message.parentElement.removeChild(message);
//   // message.parentNode.removeChild(message);
// });

// Styles
// message.style.backgroundColor = '#000';
// message.style.width = '120%';

// console.log(message.style.color);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).backgroundColor);

// message.style.height = parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// document.documentElement.style.setProperty('--color-secondary', 'red');

// // Attrubutes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.id);
// console.log(logo.className);


// // Non Standard
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.getAttribute('src'));
// console.log(logo.dataset.versionNumber);


// // Classes
// logo.classList.add('c',  'd');
// logo.classList.remove('c', 'd');
// logo.classList.toggle('a');
// logo.classList.contains('c');

// Don't use
// logo.className = 'hira';

// const section1 = document.getElementById('section--1');
// // const s = document.querySelector('#section--3 .section__description')
// const btnScrollTo = document.querySelector('.btn--scroll-to');

// btnScrollTo.addEventListener('click', function(e) {
//     const s1coords = section1.getBoundingClientRect();
//     // console.log(s1coords);

//     // console.log('Current scroll (X/Y): ', window.pageXOffset, window.pageYOffset);

//     // console.log('Height/Width of vierport', document.documentElement.clientHeight, document.documentElement.clientWidth);

//     // Scrolling
//     // window.scrollTo({
//     //     left: 0,
//     //     top: s1coords.top + window.pageYOffset,
//     //     behavior: "smooth"
//     // });
//     // console.log(s1coords.top, window.pageYOffset);

//     section1.scrollIntoView({ behavior: 'smooth' });
// });

// const h1 = document.querySelector('h1');

// const alertH1 = function() {
//     alert('This is H1');
// }

// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);

// h1.onmouseenter = alertH1;

// rgba(255, 265, 32);
// const randomInt = (min = 0, max = 255) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgba(${randomInt()}, ${randomInt()}, ${randomInt()})`;

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//     this.style.backgroundColor = randomColor();
//     console.log('link', e.target, e.currentTarget);

//     // stopPropagation
//     // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//     this.style.backgroundColor = randomColor();
//     console.log('container', e.target, e.currentTarget);
//     console.log(this == e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function(e) {
//     this.style.backgroundColor = randomColor();
//     console.log('nav', e.target, e.currentTarget);
// });

// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstChildNode);
// console.log(h1.lastChild);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going updards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(el => {
//     el !== h1 && (el.style.transform = 'scale(.2)');
// })