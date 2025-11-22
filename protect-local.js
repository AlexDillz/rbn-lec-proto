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

  // палитра
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


// закрытая лекция (экран)
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
      padding:24px;
      background:${pageBg};
      color:${textColor};
      font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    ">
      <div style="
        width:min(760px, 95%);
        background:${cardBg};
        border-radius:28px;
        padding:40px 36px 32px;
        box-shadow:${shadow};
      ">

        <!-- Заголовок + замок -->
        <div style="
          display:flex;
          align-items:center;
          gap:14px;
          margin-bottom:10px;
        ">
          <span style="font-size:32px;">🔒</span>
          <h1 style="margin:0;font-size:32px;font-weight:700;">
            Эта лекция ещё закрыта
          </h1>
        </div>

        <p style="margin:18px 0;font-size:20px;">
          Ты явно любопытный человечек.
        </p>

        <p style="margin:18px 0;font-size:20px;">
          Но сейчас ещё не время.
        </p>

        <p style="margin:24px 0 32px;font-size:22px;font-weight:600;line-height:1.45;">
          Если хочешь признания — напиши Парфенюку Виктору в личные сообщения.
        </p>

        <a href="../index.html" style="
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:12px 20px;
          border-radius:999px;
          background:${btnBg};
          color:${btnText};
          text-decoration:none;
          font-weight:500;
          font-size:17px;
        ">
          ← Назад
        </a>
      </div>
    </div>
  `;
  return;
}


// открытая лекция (экран локалки запуска)
if (isLocal) {
  document.body.style = `
    margin:0;
    padding:0;
    width:100%;
    height:100vh;
    max-width:none !important;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background:${pageBg};
    color:${textColor};
    font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  `;

  document.body.innerHTML = `
    <div style="
      width:min(760px, 92%);
      background:${cardBg};
      border-radius:28px;
      padding:42px 34px 32px;
      box-shadow:${shadow};
    ">
      <h1 style="margin:0 0 22px;font-size:30px;">
        Ты открыл лекцию локально ⚠️
      </h1>

      <p style="margin:0 0 14px;font-size:17px;color:${muted};line-height:1.55;">
        В таком режиме сайт работает иначе: стили могут поехать, скрипты —
        вести себя странно, а часть функций вообще отключена.
      </p>

      <p style="margin:0 0 14px;font-size:17px;line-height:1.55;">
        Нормальный путь — зайти по QR-коду, который выдаётся на лекции.
      </p>

      <p style="margin:0 0 26px;font-size:16px;color:${muted};line-height:1.55;">
        Если ты просто ковыряешься в репозитории — привет от всех-всех-всех
        и отдельный привет от кодера 👋
      </p>

      <a href="../index.html" style="
        display:inline-flex;
        align-items:center;
        gap:8px;
        padding:12px 20px;
        border-radius:999px;
        background:${btnBg};
        color:${btnText};
        text-decoration:none;
        font-weight:500;
        font-size:17px;
      ">← На главную</a>
    </div>
  `;
  return;
}


  } catch (err) {
    console.error('protect-local.js error:', err);
  }
})();
