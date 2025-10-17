// menu.js
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const headerRight = document.querySelector(".header-right");

  // Khi click vào hamburger => mở hoặc đóng menu
  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation(); // Ngăn sự kiện lan ra ngoài
    headerRight.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });

  // Khi click ra ngoài menu => tự động đóng lại
  document.addEventListener("click", function (event) {
    if (
      !menuToggle.contains(event.target) &&
      !headerRight.contains(event.target)
    ) {
      headerRight.classList.remove("active");
      menuToggle.classList.remove("open");
    }
  });

  // Khi chọn một mục trong menu => đóng menu luôn
  const menuLinks = document.querySelectorAll(".header-right a");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      headerRight.classList.remove("active");
      menuToggle.classList.remove("open");
    });
  });

  // ẨN hamburger khi cuộn xuống, HIỆN khi cuộn lên
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Kéo xuống → ẩn hamburger
      menuToggle.style.opacity = "0";
      menuToggle.style.pointerEvents = "none";
    } else {
      // Kéo lên → hiện lại
      menuToggle.style.opacity = "1";
      menuToggle.style.pointerEvents = "auto";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});

// Basic i18n switch + simple accessibility behaviors
(function(){
  const defaultLang = "ja";
  let current = localStorage.getItem("lang") || defaultLang;

  function translateTo(lang){
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[defaultLang];
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      if(dict[key]) el.textContent = dict[key];
    });
    // title special
    if(dict["title"]) document.title = dict["title"];
    localStorage.setItem("lang", lang);
    current = lang;
  }

  // wire buttons
  document.querySelectorAll(".lang-btn").forEach(btn=>{
    btn.addEventListener("click", ()=> {
      translateTo(btn.getAttribute("data-lang"));
    });
  });

  // initial translate
  translateTo(current);

  // Smooth scroll cho link nội trang
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", function(e){
      const target = document.querySelector(this.getAttribute("href"));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
      }
    });
  });
})();
