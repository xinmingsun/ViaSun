(() => {
  "use strict";
  const KEY = "via-portfolio-language";
  const root = document.documentElement;
  const toggle = document.querySelector(".language-toggle");
  const label = document.querySelector("[data-language-label]");
  const resume = document.querySelector("[data-resume-download]");
  const links = document.querySelectorAll(".language-aware-link");

  const safe = value => value === "zh" ? "zh" : "en";
  const saved = () => { try { return safe(localStorage.getItem(KEY)); } catch { return "en"; } };
  const store = language => { try { localStorage.setItem(KEY, language); } catch {} };

  function apply(language) {
    language = safe(language);
    root.dataset.language = language;
    root.lang = language === "zh" ? "zh-CN" : "en";
    if (label) label.textContent = language === "zh" ? "EN" : "中文";
    if (toggle) toggle.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换至中文");
    links.forEach(link => {
      const url = language === "zh" ? link.dataset.urlZh : link.dataset.urlEn;
      if (url) link.href = url;
    });
    store(language);
  }

  function downloadResume() {
    const filename = safe(root.dataset.language) === "zh" ? "孙欣茗简历.pdf" : "Via Sun Resume.pdf";
    const a = document.createElement("a");
    a.href = filename;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  document.querySelectorAll("[data-current-year]").forEach(el => el.textContent = new Date().getFullYear());
  apply(saved());
  toggle?.addEventListener("click", () => apply(safe(root.dataset.language) === "en" ? "zh" : "en"));
  resume?.addEventListener("click", downloadResume);
})();
