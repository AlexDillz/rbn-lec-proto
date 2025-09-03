// Применяем сохранённую тему сразу после загрузки
function applySavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark');
  else document.body.classList.remove('dark');
}

// Обновляем текст на кнопке
function updateToggleLabel(btn) {
  if (!btn) return;
  const dark = document.body.classList.contains('dark');
  btn.textContent = dark ? '☀️ Light mode' : '🌙 Dark mode';
}

// Вешаем обработчик на кнопку
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  updateToggleLabel(btn);
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    updateToggleLabel(btn);
  });
}

// Cинхронизация между вкладками
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    applySavedTheme();
    updateToggleLabel(document.getElementById('theme-toggle'));
  }
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();
  initThemeToggle();
});

