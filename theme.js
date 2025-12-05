/* 
Привет, ковёрный взломщик 👋  
Если ты читаешь это - значит, нашёл путь быстрее всех.

Напиши Парфенюку Виктору в личные сообщения фразу:
"Код открыт — а сердце ещё нет"

За это ты получишь бонус 😎
*/

// ================== ТЕМА САЙТА (светлая / тёмная) ==================

function currentTheme() {
  const s = localStorage.getItem('theme');
  if (s === 'dark' || s === 'light') return s;

  if (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function applyTheme(t) {
  document.body.classList.toggle('dark', t === 'dark');
}

function updateToggleLabel(btn) {
  if (!btn) return;
  const isDark = document.body.classList.contains('dark');
  btn.textContent = isDark ? '☀️ Светлая тема' : '🌙 Тёмная тема';
}

function initTheme() {
  applyTheme(currentTheme());

  const btn = document.getElementById('theme-toggle');
  updateToggleLabel(btn);

  if (btn) {
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark');
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
      updateToggleLabel(btn);
    });
  }
}

// запуск при загрузке
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

// синхронизация темы между вкладками
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    applyTheme(currentTheme());
    updateToggleLabel(document.getElementById('theme-toggle'));
  }
});


// ================== ФУЛЛСКРИН ОТКРЫТИЕ ФОТО ==================

// Открываем по клику на fotку лектора или картинку в тексте
document.addEventListener('click', (e) => {
  const existingBackdrop = document.querySelector('.fullscreen-backdrop');

  // Если уже есть фуллскрин — любой клик по нему закрывает
  if (existingBackdrop) {
    // клики внутри оверлея — тоже закрывают
    if (e.target.closest('.fullscreen-backdrop')) {
      existingBackdrop.remove();
      document.body.classList.remove('no-scroll');
      e.stopPropagation();
      e.preventDefault();
    }
    return;
  }

  // Если оверлея нет — ищем, не кликнули ли по картинке
  const img = e.target.closest('img.person-photo, .content img');
  if (!img) return;

  // создаём подложку
  const backdrop = document.createElement('div');
  backdrop.className = 'fullscreen-backdrop';

  // крупная картинка
  const bigImg = document.createElement('img');
  bigImg.className = 'fullscreen-img';
  bigImg.src = img.src;
  bigImg.alt = img.alt || '';

  backdrop.appendChild(bigImg);
  document.body.appendChild(backdrop);
  document.body.classList.add('no-scroll');

  e.stopPropagation();
  e.preventDefault();
});
