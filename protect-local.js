(async function () {
  //  определяем тему так же, как в theme.js 
  function detectTheme() {
    try {
      const s = localStorage.getItem('theme');
      if (s === 'dark' || s === 'light') return s;
    } catch (_) {
      /* localStorage может быть недоступен, тогда просто игнорируем */
    }
    if (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  const theme = detectTheme();
  const isDark = theme === 'dark';

  // палитра под две темы
  const pageBg    = isDark ? '#020617' : '#f3f4f6';
  const cardBg    = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#e5e7eb' : '#111827';
  const muted     = isDark ? '#9ca3af' : '#4b5563';
  const shadow    = isDark
    ? '0 24px 80px rgba(0,0,0,0.85)'
    : '0 24px 80px rgba(15,23,42,0.18)';
  const btnBg     = isDark ? '#f9fafb' : '#111827';
  const btnText   = isDark ? '#111827' : '#f9fafb';

  const isLocal =
    location.protocol === 'file:' || location.hostname === 'localhost';

  const tag = document.querySelector('script[data-lecture-id]');
  if (!tag) return;

  const lectureId = tag.getAttribute('data-lecture-id');

  try {
    const r = await fetch('../lectures.json');
    const data = await r.json();
    const L = data.lectures.find((x) => x.id === lectureId);
    if (!L) return;

    // лекция залочена (locked: true)
    if (L.locked) {
      document.body.style.margin = '0';
      document.body.style.background = pageBg;
      document.body.style.color = textColor;
      document.body.innerHTML = `
        <div style="
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:${pageBg};
          color:${textColor};
          font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
        ">
          <div style="
            max-width:640px;
            width:100%;
            margin:24px;
            padding:28px 26px 24px;
            background:${cardBg};
            border-radius:24px;
            box-shadow:${shadow};
          ">
            <h1 style="margin:0 0 12px;font-size:26px;">
              Эта лекция ещё закрыта 🔒
            </h1>
            <p style="margin:0 0 10px;color:${muted};">
              Тут должен быть контент, но его пока рано показывать.
            </p>
            <p style="margin:0 0 20px;color:${muted};">
              На самой лекции всё будет по плану, а сюда мы вернёмся, когда придёт время.
            </p>

            <p style="margin:0 0 6px;color:${muted};font-size:14px;">
              Если ты ковыряешь репозиторий и читаешь это — отдельный привет от Виктора 👋
            </p>

            <a href="../index.html" style="
              display:inline-flex;
              align-items:center;
              gap:8px;
              margin-top:18px;
              padding:10px 18px;
              border-radius:999px;
              background:${btnBg};
              color:${btnText};
              text-decoration:none;
              font-weight:500;
            ">
              ← Назад к списку
            </a>
          </div>
        </div>
      `;
      return;
    }

    // лекция открыта, но файл запущен локально 
    if (isLocal) {
      document.body.style.margin = '0';
      document.body.style.background = pageBg;
      document.body.style.color = textColor;
      document.body.innerHTML = `
        <div style="
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:${pageBg};
          color:${textColor};
          font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
        ">
          <div style="
            max-width:720px;
            width:100%;
            margin:24px;
            padding:32px 28px 26px;
            background:${cardBg};
            border-radius:28px;
            box-shadow:${shadow};
          ">
            <h1 style="margin:0 0 18px;font-size:28px;">
              Ты открыл лекцию локально ⚠️
            </h1>

            <p style="margin:0 0 10px;color:${muted};font-size:16px;">
              В таком режиме сайт работает не так, как по QR:
              стили могут поехать, скрипты — странно себя вести,
              а некоторые фишки вообще отключены.
            </p>

            <p style="margin:0 0 10px;color:${textColor};font-size:16px;">
              Нормальный вариант — зайти по QR-коду, который выдаётся на лекции.
            </p>

            <p style="margin:0 0 22px;color:${muted};font-size:15px;">
              Если ты просто ковыряешься в репозитории и читаешь это —
              привет от всех-всех-всех и отдельный привет от кодера 👋
            </p>

            <a href="../index.html" style="
              display:inline-flex;
              align-items:center;
              gap:8px;
              padding:11px 20px;
              border-radius:999px;
              background:${btnBg};
              color:${btnText};
              text-decoration:none;
              font-weight:500;
              font-size:15px;
            ">
              ← На главную
            </a>
          </div>
        </div>
      `;
      return;
    }

    // нормальный просмотр через Pages — все норм 
  } catch (err) {
    console.error('protect-local.js error:', err);
  }
})();
