(async function () {
  // определение темы
  function detectTheme() {
    try {
      const s = localStorage.getItem('theme');
      if (s === 'dark' || s === 'light') return s;
    } catch (_) {}

    if (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  const theme = detectTheme();
  const isDark = theme === 'dark';

  // --- Палитра ---
  const pageBg    = isDark ? '#020617' : '#f3f4f6';
  const cardBg    = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#e5e7eb' : '#111827';
  const muted     = isDark ? '#9ca3af' : '#475569';
  const shadow    = isDark
    ? '0 24px 80px rgba(0,0,0,0.85)'
    : '0 24px 80px rgba(15,23,42,0.18)';

  const btnBg     = isDark ? '#f9fafb' : '#111827';
  const btnText   = isDark ? '#111827' : '#f9fafb';


  // проверка локального запуска 
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

    // лекция ЗАКРЫТА (locked: true)
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

          <button id="theme-toggle" style="
            position:fixed;
            top:16px; right:16px;
            padding:8px 14px;
            border-radius:999px;
            border:1px solid #475569;
            background:${isDark ? '#1e293b' : '#fff'};
            color:${textColor};
            cursor:pointer;
          ">${isDark ? '☀️ Light' : '🌙 Dark'}</button>

          <div style="
            max-width:640px;
            width:100%;
            margin:20px;
            padding:34px 30px 28px;
            background:${cardBg};
            border-radius:24px;
            box-shadow:${shadow};
          ">

            <!-- Заголовок с замком -->
            <div style="
              display:flex;
              align-items:center;
              justify-content:center;
              gap:14px;
              margin-bottom:8px;
            ">
              <span style="font-size:42px;">🔒</span>
              <h1 style="
                margin:0;
                font-size:32px;
                font-weight:700;
              ">Эта лекция ещё закрыта</h1>
            </div>

            <p style="margin:14px 0 14px;color:${muted};font-size:20px;">
              Ты явно любопытный человечек
            </p>

            <p style="margin:10px 0 20px;color:${muted};font-size:20px;">
              Но сейчас ещё не время
            </p>

            <p style="margin:0 0 14px;font-size:22px;font-weight:600;">
              Если хочешь признания — напиши Парфенюку Виктору:
            </p>

            <!-- Цитата -->
            <div style="
              background:${isDark ? '#1e293b' : '#f1f5f9'};
              padding:18px 24px;
              border-radius:16px;
              margin-top:20px;
              font-size:20px;
              text-align:center;
              line-height:1.45;
              font-family:Menlo,Consolas,monospace;
            ">
              «Я нашёл неопубликованную лекцию»
            </div>

            <a href="../index.html" style="
              display:inline-flex;
              align-items:center;
              gap:8px;
              margin-top:28px;
              padding:10px 20px;
              border-radius:999px;
              background:${btnBg};
              color:${btnText};
              text-decoration:none;
              font-size:16px;
              font-weight:500;
            ">
              ← На главную
            </a>
          </div>
        </div>

        <script>
          document.getElementById('theme-toggle').onclick = () => {
            const t = document.body.classList.toggle('dark');
            localStorage.setItem('theme', t ? 'dark' : 'light');
            location.reload();
          }
        </script>
      `;

      return;
    }

    // лекция открыта, но запуск локально
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

          <button id="theme-toggle" style="
            position:fixed;
            top:16px; right:16px;
            padding:8px 14px;
            border-radius:999px;
            border:1px solid #475569;
            background:${isDark ? '#1e293b' : '#fff'};
            color:${textColor};
            cursor:pointer;
          ">${isDark ? '☀️ Light' : '🌙 Dark'}</button>

          <div style="
            max-width:720px;
            width:100%;
            padding:36px 32px 30px;
            margin:20px;
            background:${cardBg};
            border-radius:28px;
            box-shadow:${shadow};
          ">
            <h1 style="margin:0 0 18px;font-size:30px;">
              Ты открыл лекцию локально ⚠️
            </h1>

            <p style="margin:0 0 12px;color:${muted};font-size:17px;">
              В таком режиме сайт работает иначе: стили могут поехать,
              скрипты — вести себя странно, а часть функций вообще отключена.
            </p>

            <p style="margin:0 0 12px;font-size:17px;">
              Нормальный путь — зайти по QR-коду, который выдаётся на лекции.
            </p>

            <p style="margin:0 0 24px;color:${muted};font-size:16px;">
              Если ты просто ковыряешься в репозитории — привет от всех-всех-всех
              и отдельный привет от кодера 👋
            </p>

            <a href="../index.html" style="
              display:inline-flex;
              align-items:center;
              gap:8px;
              padding:11px 22px;
              border-radius:999px;
              background:${btnBg};
              color:${btnText};
              text-decoration:none;
              font-size:16px;
              font-weight:500;
            ">
              ← На главную
            </a>
          </div>
        </div>

        <script>
          document.getElementById('theme-toggle').onclick = () => {
            const t = document.body.classList.toggle('dark');
            localStorage.setItem('theme', t ? 'dark' : 'light');
            location.reload();
          }
        </script>
      `;

      return;
    }
  } catch (err) {
    console.error('protect-local.js error:', err);
  }
})();
