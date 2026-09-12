/* Dark-mode toggle. The initial class is set inline in <head> to avoid a flash. */
(function () {
  "use strict";
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  btn.addEventListener("click", function () {
    var dark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  });

  /* Follow the OS setting as long as the visitor has not chosen one. */
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (localStorage.getItem("theme")) return;
    document.documentElement.classList.toggle("dark", e.matches);
  });
})();
