import PortfolioComponent from '/scripts/components/PortfolioComponent.js';
import slicingPortfolioData from '/scripts/data/slicing-portfolio.json' assert { type: 'json' };
import reactPortfolioData from '/scripts/data/react-portfolio.json' assert { type: 'json' };

/* Theme Handling */

const isPrefersDarkScheme = window.matchMedia('(prefer-color-scheme: dark)');
const browserTheme = isPrefersDarkScheme ? 'dark' : 'light';

let currentTheme = localStorage.getItem('home_theme') || browserTheme;
document.body.dataset.theme = currentTheme;

const metaTheme = document.querySelector('meta[name="theme-color"]');
metaTheme.setAttribute('content', (currentTheme === 'light') ? '#fff' : '#333');

const themeToggleButton = document.querySelector('#theme-toggle');
themeToggleButton.addEventListener('click', () => {
  switch (currentTheme) {
    case 'light':
      currentTheme = 'dark';
      document.body.dataset.theme = currentTheme;
      metaTheme.setAttribute('content', '#333');
      localStorage.setItem('home_theme', currentTheme);
      break;
    case 'dark':
      currentTheme = 'light';
      document.body.dataset.theme = currentTheme;
      metaTheme.setAttribute('content', '#fff');
      localStorage.setItem('home_theme', currentTheme);
  }
});

/* Copyright Year */

const copyrightText = document.querySelector('#copyright');
copyrightText.innerHTML += ' ' + new Date().getFullYear();

/* Portfolio Component */

new PortfolioComponent({
  title: 'Slicing',
  container: document.querySelector('#slicing-portfolio'),
  data: slicingPortfolioData,
});

new PortfolioComponent({
  title: 'React',
  container: document.querySelector('#react-portfolio'),
  data: reactPortfolioData,
});
