/* The initial theme is set in <head>; storage is optional. */
(function () {
  "use strict";
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  var chosen = false;
  try { chosen = !!localStorage.getItem("theme"); } catch (e) {}

  function syncButton() {
    btn.setAttribute("aria-pressed", String(document.documentElement.classList.contains("dark")));
  }
  syncButton();
  btn.hidden = false;
  btn.addEventListener("click", function () {
    var dark = document.documentElement.classList.toggle("dark");
    chosen = true;
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
    syncButton();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (chosen) return;
    document.documentElement.classList.toggle("dark", e.matches);
    syncButton();
  });
})();
