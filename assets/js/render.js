/* Progressive enhancement for content already present in the HTML. */
(function () {
  "use strict";

  var newsList = document.getElementById("news-list");
  var newsMore = document.getElementById("news-more");
  if (newsList && newsMore) {
    var items = Array.from(newsList.children);
    var visible = Number(newsList.dataset.visible) || 5;
    if (items.length > visible) {
      function setExpanded(expanded) {
        items.forEach(function (item, index) { item.hidden = !expanded && index >= visible; });
        newsMore.setAttribute("aria-expanded", String(expanded));
        newsMore.textContent = expanded ? "Show less" : "Show all news";
      }
      setExpanded(false);
      newsMore.hidden = false;
      newsMore.addEventListener("click", function () {
        setExpanded(newsMore.getAttribute("aria-expanded") !== "true");
      });
    }
  }

  // A missing optional teaser should never leave an empty placeholder.
  document.querySelectorAll(".pub-thumb img").forEach(function (img) {
    function hideBrokenImage() { img.parentElement.hidden = true; }
    img.addEventListener("error", hideBrokenImage);
    if (img.complete && !img.naturalWidth) hideBrokenImage();
  });

  /* ---------- Nav highlighting ---------- */
  var navLinks = {};
  document.querySelectorAll(".menu a").forEach(function (a) {
    navLinks[a.getAttribute("href").slice(1)] = a;
  });

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          var link = navLinks[e.target.id];
          if (!link || !e.isIntersecting) return;
          Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("active"); navLinks[k].removeAttribute("aria-current"); });
          link.classList.add("active");
          link.setAttribute("aria-current", "location");
        });
      },
      { rootMargin: "-70px 0px -70% 0px" }
    );
    document.querySelectorAll("section[id], header[id]").forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll progress + back to top ---------- */
  var bar = document.getElementById("scroll-progress");
  var toTop = document.getElementById("to-top");

  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (bar) bar.style.width = pct + "%";
    if (toTop) toTop.classList.toggle("show", window.scrollY > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
