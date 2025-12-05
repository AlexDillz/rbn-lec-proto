/* 
Привет, ковёрный взломщик 👋  
Если ты читаешь это - значит, нашёл путь быстрее всех.

Напиши Парфенюку Виктору в личные сообщения фразу:
"Код открыт — а сердце ещё нет"

За это ты получишь бонус 😎
*/

// ===== ТЕМА (светлая / тёмная) =====

function currentTheme() {
  try {
    const s = localStorage.getItem('theme');
    if (s === 'dark' || s === 'light') return s;
  } catch (_) {
    // localStorage может быть недоступен
  }
  return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? 'dark'
    : 'light';
}

function applyTheme(t) {
  document.body.classList.toggle('dark', t === 'dark');
}

function updateToggleLabel(btn) {
  if (!btn) return;
  btn.textContent = document.body.classList.contains('dark')
    ? '☀️ Светлая тема'
    : '🌙 Тёмная тема';
}

function initTheme() {
  applyTheme(currentTheme());

  const btn = document.getElementById('theme-toggle');
  updateToggleLabel(btn);

  if (btn) {
    btn.addEventListener('click', () => {
      const t = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(t);
      try {
        localStorage.setItem('theme', t);
      } catch (_) {}
      updateToggleLabel(btn);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

// синхронизация между вкладками
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    applyTheme(currentTheme());
    updateToggleLabel(document.getElementById('theme-toggle'));
  }
});


// ===== ЛАЙТБОКС ДЛЯ КАРТИНОК (ОДИН, БЕЗ ДУБЛЕЙ) =====

let lightboxInited = false;

function initImageLightbox() {
  if (lightboxInited) return;
  lightboxInited = true;

  // создаём фон один раз
  const backdrop = document.createElement('div');
  backdrop.className = 'lightbox-backdrop';
  backdrop.innerHTML = '<img class="lightbox-image" alt="">';
  const imgEl = backdrop.querySelector('.lightbox-image');

  function closeLightbox() {
    backdrop.classList.remove('is-visible');
    document.body.classList.remove('no-scroll');
    // чуть позже убираем src, чтобы не мигал
    setTimeout(() => {
      imgEl.removeAttribute('src');
    }, 180);
  }

  backdrop.addEventListener('click', () => {
    closeLightbox();
  });

  imgEl.addEventListener('click', (e) => {
    // не закрываем по клику строго по картинке
    e.stopPropagation();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (backdrop.classList.contains('is-visible')) {
        closeLightbox();
      }
    }
  });

  document.body.appendChild(backdrop);

  // навешиваем поведение на все картинки лекций и портреты
  const imgs = document.querySelectorAll('.content img, .person-photo');
  imgs.forEach((img) => {
    // добавим css-класс для курсора/hover
    img.classList.add('img-zoom');

    img.addEventListener('click', (e) => {
      e.preventDefault();

      const src = img.currentSrc || img.src;
      if (!src) return;

      imgEl.src = src;
      imgEl.alt = img.alt || '';

      document.body.classList.add('no-scroll');
      backdrop.classList.add('is-visible');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImageLightbox);
} else {
  initImageLightbox();
}
