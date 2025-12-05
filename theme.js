/* 
Привет, ковёрный взломщик 👋  
Если ты читаешь это - значит, нашёл путь быстрее всех.

Напиши Парфенюку Виктору в личные сообщения фразу:
"Код открыт — а сердце ещё нет"

За это ты получишь бонус 😎
*/

// ===== Работа с темой (светлая / тёмная) =====

function currentTheme() {
  const s = localStorage.getItem('theme');
  if (s === 'dark' || s === 'light') return s;

  return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? 'dark'
    : 'light';
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
      const t = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(t);
      localStorage.setItem('theme', t);
      updateToggleLabel(btn);
    });
  }
}

// синхронизация темы между вкладками
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    applyTheme(currentTheme());
    updateToggleLabel(document.getElementById('theme-toggle'));
  }
});

// ===== Полноэкранное открытие фотографий =====

function initImageFullscreen() {
  document.addEventListener('click', (event) => {
    const img = event.target.closest('img');
    if (!img) return;

    // если клик по уже открытой полноэкранной картинке — просто закрываем
    if (img.classList.contains('fullscreen-img')) {
      img.remove();
      document.body.classList.remove('no-scroll');
      return;
    }

    // оставляем только нормальные картинки (фото людей и картинки в лекции)
    const isPersonPhoto = img.classList.contains('person-photo');
    const isLectureImage = img.closest('.content');

    if (!isPersonPhoto && !isLectureImage) {
      return; // не трогаем остальные <img> (иконки и т.п.)
    }

    // если вдруг по какой-то причине уже есть открытая картинка — уберём её
    const existing = document.querySelector('.fullscreen-img');
    if (existing) {
      existing.remove();
      document.body.classList.remove('no-scroll');
    }

    // создаём оверлей-картинку
    const overlay = img.cloneNode(true);
    overlay.classList.add('fullscreen-img');

    // на всякий случай убираем инлайновые стили с оригинала
    overlay.removeAttribute('style');

    document.body.appendChild(overlay);
    document.body.classList.add('no-scroll');
  });
}

// ===== Инициализация всего вместе =====

function initAll() {
  initTheme();
  initImageFullscreen();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
