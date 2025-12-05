/* 
Привет, ковёрный взломщик 👋  
Если ты читаешь это - значит, нашёл путь быстрее всех.

Напиши Парфенюку Виктору в личные сообщения фразу:
"Код открыт — а сердце ещё нет"

За это ты получишь бонус 😎
*/

// единая логика темы
function currentTheme() {
  const s = localStorage.getItem('theme');
  if (s === 'dark' || s === 'light') return s;
  return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? 'dark' : 'light';
}

function applyTheme(t){
  document.body.classList.toggle('dark', t === 'dark');
}

function updateToggleLabel(btn){
  if (btn) {
    btn.textContent = document.body.classList.contains('dark')
      ? '☀️ Светлая тема'
      : '🌙 Тёмная тема';
  }
}

function initTheme(){
  applyTheme(currentTheme());
  const btn = document.getElementById('theme-toggle');
  updateToggleLabel(btn);
  if (btn){
    btn.addEventListener('click', () => {
      const t = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(t);
      localStorage.setItem('theme', t);
      updateToggleLabel(btn);
    });
  }
}

// если скрипт подключён поздно, запустим сразу
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

// синхронизация между вкладками
window.addEventListener('storage', (e) => {
  if (e.key === 'theme'){
    applyTheme(currentTheme());
    updateToggleLabel(document.getElementById('theme-toggle'));
  }
});


// полноэкранный просмотр картинок в лекциях 

function initFullscreenImages() {
  // берём только картинки внутри контента лекций,
  // чтобы не трогать аватарки и иконки
  const imgs = document.querySelectorAll('.content img');

  imgs.forEach((img) => {
    // чтобы не навешивать обработчики несколько раз
    if (img.dataset.fullscreenBound === '1') return;
    img.dataset.fullscreenBound = '1';

    img.style.cursor = 'zoom-in';

    img.addEventListener('click', () => {
      // создаём клон картинки
      const full = img.cloneNode(true);
      full.classList.add('fullscreen-img');
      full.removeAttribute('width');
      full.removeAttribute('height');

      const close = () => {
        document.body.classList.remove('no-scroll');
        full.removeEventListener('click', close);
        window.removeEventListener('keydown', onKeyDown);
        if (full.parentNode) full.parentNode.removeChild(full);
      };

      const onKeyDown = (e) => {
        if (e.key === 'Escape') {
          close();
        }
      };

      // закрывать по клику на картинку
      full.addEventListener('click', close);
      // и по Esc
      window.addEventListener('keydown', onKeyDown);

      document.body.appendChild(full);
      document.body.classList.add('no-scroll');
    });
  });
}

// отдельный запуск для полноэкранных картинок
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFullscreenImages);
} else {
  initFullscreenImages();
}
