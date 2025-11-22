(async function () {
  // определение темы (тёмная/светлая)
  function detectTheme() {
    try {
      const s = localStorage.getItem('theme');
      if (s === 'dark' || s === 'light') return s;
    } catch (_) {
      // localStorage может быть недоступен — просто игнорируем
    }

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return 'light';
  }

  const theme = detectTheme();
  const isDark = theme === 'dark';

  // ---------- Палитра под две темы ----------
  const pageBg    = isDark ? '#020617' : '#f3f4f6';
  const cardBg    = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#e5e7eb' : '#111827';
  const muted     = isDark ? '#9ca3af' : '#475569';
  const shadow    = isDark
    ? '0 24px 80px rgba(0,0,0,0.85)'
    : '0 24px 80px rgba(15,23,42,0.18)';
  const btnBg     = isDark ? '#f9fafb' : '#111827';
  const btnText   = isDark ? '#111827' : '#f9fafb';

  // Проверка локального запуска
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

    // лекция ещё ЗАКРЫТА (locked: true) 
    if (L.locked) {
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.maxWidth = 'none';
      document.body.style.width = '100%';
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
          padding:24px;
        ">
          <div style="
            max-width:700px;
            width:100%;
            padding:36px 32px 32px;
            background:${cardBg};
            border-radius:28px;
            box-shadow:${shadow};
          ">
            <h1 style="margin:0 0 18px;font-size:30px;font-weight:700;">
              Эта лекция ещё не открыта :)
            </h1>

            <p style="margin:0 0 10px;font-size:18px;">
              Любопытства тебе не занимать.
            </p>

            <p style="margin:0 0 26px;font-size:18px;">
              Хочешь бонуса и признания? — пиши в личные сообщения Парфенюку Виктору.
            </p>

            <a href="../index.html" style="
              display:inline-flex;
              align-items:center;
              gap:8px;
              margin-top:4px;
              padding:10px 18px;
              border-radius:999px;
              background:${btnBg};
              color:${btnText};
              text-decoration:none;
              font-weight:500;
              font-size:16px;
            ">
              ← Назад к списку
            </a>
          </div>
        </div>
      `;
      return;
    }

    // лекция ОТКРЫТА, но файл запущен ЛОКАЛЬНО 
    if (isLocal) {
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.maxWidth = 'none';
      document.body.style.width = '100%';
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
          padding:24px;
        ">
          <div style="
            width:min(700px, 90%);
            margin:auto;
            padding:36px 32px 32px;
            background:${cardBg};
            border-radius:28px;
            box-shadow:${shadow};
          ">
            <h1 style="margin:0 0 22px;font-size:30px;">
              Ты открыл лекцию локально ⚠️
            </h1>

            <p style="margin:0 0 14px;font-size:17px;color:${muted};line-height:1.5;">
              В таком режиме сайт работает иначе: стили могут поехать, скрипты —
              вести себя странно, а часть функций вообще отключена.
            </p>

            <p style="margin:0 0 14px;font-size:17px;line-height:1.5;">
              Нормальный путь — зайти по QR-коду, который выдаётся на лекции.
            </p>

            <p style="margin:0 0 26px;font-size:16px;color:${muted};">
              Если ты просто ковыряешься в репозитории — привет от всех-всех-всех
              и отдельный привет от кодера 👋
            </p>

            <button onclick="location.href='../index.html'"
              style="
                display:inline-flex;
                align-items:center;
                gap:8px;
                padding:12px 20px;
                border-radius:999px;
                background:${btnBg};
                color:${btnText};
                border:none;
                cursor:pointer;
                font-weight:500;
                font-size:16px;
              "
            >
              ← На главную
            </button>
          </div>
        </div>
      `;
      return;
    }

    // нормальный просмотр через Pages
  } catch (err) {
    console.error('protect-local.js error:', err);
  }
})();
