const themeButton = document.querySelector('#theme-toggle');
const themeRoot = document.documentElement;

function applyTheme(theme) {
  const dark = theme === 'dark';
  themeRoot.dataset.theme = dark ? 'dark' : 'light';
  if (themeButton) {
    const icon = themeButton.querySelector('.theme-icon');
    const label = themeButton.querySelector('.theme-label');
    if (icon) icon.textContent = dark ? '☀' : '☾';
    if (label) label.textContent = dark ? 'Light mode' : 'Dark mode';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = dark ? '#111a27' : '#f7fbff';
  try {
    localStorage.setItem('swachh_sevak_theme', dark ? 'dark' : 'light');
  } catch {
    // The current page still changes theme when browser storage is unavailable.
  }
}

let initialTheme = 'light';
try {
  if (localStorage.getItem('swachh_sevak_theme') === 'dark') initialTheme = 'dark';
} catch {
  // Start in light mode when browser storage is unavailable.
}

applyTheme(initialTheme);
themeButton?.addEventListener('click', () => {
  applyTheme(themeRoot.dataset.theme === 'dark' ? 'light' : 'dark');
});
