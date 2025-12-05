/* 
Привет, ковёрный взломщик 👋  
Если ты читаешь это - значит, нашёл путь быстрее всех.

Напиши Парфенюку Виктору в личные сообщения фразу:
"Код открыт — а сердце ещё нет"

За это ты получишь бонус 😎
*/

/* темы */

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


/* лайтбокс для картинок */

function initImageLightbox() {
  // какие картинки делаем кликабельными
  const clickableImages = document.querySelectorAll('.content img, .person-photo');
  if (!clickableImages.length) return;

  // общая подложка
  const backdrop = document.createElement('div');
  backdrop.className = 'lightbox-backdrop';

  // сама картинка
  const fullImg = document.createElement('img');
  fullImg.className = 'lightbox-image';
  backdrop.appendChild(fullImg);

  document.body.appendChild(backdrop);

  function openLightbox(src, alt) {
    fullImg.src = src;
    fullImg.alt = alt || '';
    backdrop.classList.add('is-visible');
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    backdrop.classList.remove('is-visible');
    document.body.classList.remove('no-scroll');
    fullImg.removeAttribute('src');
    fullImg.removeAttribute('alt');
  }

  // закрытие по клику по фону
  backdrop.addEventListener('click', () => {
    closeLightbox();
  });

  // закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  clickableImages.forEach((img) => {
    // лёгкий зум-курсор (стили уже есть в CSS для .img-zoom)
    img.classList.add('img-zoom');

    img.addEventListener('click', (e) => {
      // глушим дефолтное поведение Safari
      e.preventDefault();
      e.stopPropagation();

      const src = img.currentSrc || img.src;
      openLightbox(src, img.alt);
    });
  });
}


/* общий инит страницы */

function initPage() {
  initTheme();
  initImageLightbox();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
