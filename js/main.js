/* Via Sun — simple, readable JavaScript (no frameworks) */

(function () {
  const root = document.documentElement;

  // --- Tiny i18n (EN / 中文) ---
  const I18N = {
    en: {
      nav_home: "Home",
      nav_about: "About Me",
      nav_projects: "Projects",
      lang_en: "EN",
      lang_zh: "中文",
      btn_scroll_resume: "Jump to résumé",
      btn_download_resume: "Download Résumé PDF",
      btn_video_work: "Video work",
      toc_title: "Contents",
      toc_close: "Close",
      back_to_top: "Back to top",
      projects_makeup_btn: "Makeup Design",
      projects_video_btn: "Video Editing",
      section_personal: "Personal statement",
      section_resume: "Résumé",
      section_skills: "Skills",
      section_experience: "Work experience",
      section_education: "Education",
      section_language: "Language",
      section_social: "Social media",
      projects_title: "Projects",
      projects_makeup_heading: "Makeup Design",
      makeup_project_title: "Echoes of Her: A Journey Through Time",
      projects_video_heading: "Video Editing",
      projects_video_title: "Trip to Miami",
      footer_handcoded: "Hand-coded by Via Sun"
    },
    zh: {
      nav_home: "主页",
      nav_about: "关于我",
      nav_projects: "作品",
      lang_en: "EN",
      lang_zh: "中文",
      btn_scroll_resume: "跳到简历",
      btn_download_resume: "下载简历 PDF",
      btn_video_work: "视频作品",
      toc_title: "目录",
      toc_close: "关闭",
      back_to_top: "回到顶部",
      projects_makeup_btn: "妆造设计",
      projects_video_btn: "视频剪辑",
      section_personal: "个人陈述",
      section_resume: "简历",
      section_skills: "技能",
      section_experience: "工作经历",
      section_education: "教育",
      section_language: "语言",
      section_social: "社交媒体",
      projects_title: "作品集",
      projects_makeup_heading: "妆造设计",
      makeup_project_title: "她的回声：穿越时间的旅程",
      projects_video_heading: "视频剪辑",
      projects_video_title: "迈阿密之旅",
      footer_handcoded: "Hand-coded by Via Sun"
    }
  };

  function applyI18n(lang) {
    const dict = I18N[lang] || I18N.en;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
  }

  // --- Language switch (site-wide) ---
  const langButtons = document.querySelectorAll("[data-set-lang]");

  function setLang(lang) {
    root.dataset.lang = lang;
    root.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");

    langButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.dataset.setLang === lang ? "true" : "false");
    });

    applyI18n(lang);
  }

  // Default language
  setLang(root.dataset.lang || "en");

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.setLang));
  });

  // --- Copy-to-clipboard (email/phone) ---
  const copyButtons = document.querySelectorAll("[data-copy]");

  async function copyText(btn) {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      const old = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => {
        btn.textContent = old;
      }, 900);
    } catch (e) {
      window.prompt("Copy this:", text);
    }
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => copyText(btn));
  });

  // --- About page: slide-out table of contents ---
  const tocToggle = document.querySelector("#tocToggle");
  const tocPanel = document.querySelector("#tocPanel");
  const tocClose = document.querySelector("#tocClose");

  function toggleToc(open) {
    if (!tocPanel) return;
    const willOpen = open ?? !tocPanel.classList.contains("is-open");
    tocPanel.classList.toggle("is-open", willOpen);
    if (tocToggle) tocToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
  }

  if (tocToggle && tocPanel) {
    tocToggle.addEventListener("click", () => toggleToc());

    tocPanel.addEventListener("click", (e) => {
      const link = e.target.closest("a[href^='#']");
      if (link) toggleToc(false);
    });
  }
  if (tocClose) tocClose.addEventListener("click", () => toggleToc(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleToc(false);
  });
})();
