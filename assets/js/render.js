/* Renders News + Publications from assets/js/site-data.js, plus the small
   interactions: topic filter, scroll reveal, scroll progress, back-to-top. */
(function () {
  "use strict";

  /* ---------- News ---------- */
  var newsList = document.getElementById("news-list");
  var newsMore = document.getElementById("news-more");
  var news = window.NEWS || [];
  var visible = window.NEWS_VISIBLE || 5;

  function renderNews(showAll) {
    newsList.innerHTML = "";
    news.slice(0, showAll ? news.length : visible).forEach(function (n) {
      var li = document.createElement("li");
      li.innerHTML =
        '<span class="news-date">' + n.date + "</span>" +
        '<span class="news-text">' + n.html + "</span>";
      newsList.appendChild(li);
    });
  }
  renderNews(false);

  if (news.length > visible) {
    newsMore.hidden = false;
    newsMore.addEventListener("click", function () {
      var expanded = newsMore.dataset.expanded === "true";
      renderNews(!expanded);
      newsMore.dataset.expanded = String(!expanded);
      newsMore.textContent = expanded ? "Show all news" : "Show less";
    });
  }

  /* ---------- Publications ---------- */
  var pubsList = document.getElementById("pubs-list");
  var filterBar = document.getElementById("pub-filters");
  var pubs = window.PUBS || [];

  /* "**Tongli Su**" -> bolded author name */
  function formatAuthors(s) {
    return s.replace(/\*\*(.+?)\*\*/g, '<span class="me">$1</span>');
  }

  function shortVenue(v) {
    return String(v).split("(")[0].replace(/\s*,\s*$/, "").trim();
  }

  /* A paper with no teaser image still gets a tidy block showing the venue.
     Set `thumbLabel` in site-data.js to control that text. */
  function thumbHTML(p) {
    var label = p.thumbLabel || shortVenue(p.venue);
    if (p.thumb) {
      return '<div class="pub-thumb"><img src="' + p.thumb + '" alt="' + p.title + '" ' +
             'onerror="this.parentNode.innerHTML=\'<span class=&quot;thumb-fallback&quot;>' +
             label + '</span>\'"></div>';
    }
    return '<div class="pub-thumb"><span class="thumb-fallback">' + label + "</span></div>";
  }

  pubs.forEach(function (p) {
    var badges = (p.badges || [])
      .map(function (b, i) {
        return '<span class="badge' + (i > 0 ? " soft" : "") + '">' + b + "</span>";
      })
      .join("");

    var links = (p.links || [])
      .map(function (l) {
        return '<a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + "</a>";
      })
      .join("");

    var primary = (p.links && p.links.length) ? p.links[0].url : null;
    var titleHTML = primary
      ? '<a href="' + primary + '" target="_blank" rel="noopener">' + p.title + "</a>"
      : p.title;

    var el = document.createElement("article");
    el.className = "pub";
    el.dataset.tags = (p.tags || []).join("|");
    el.innerHTML =
      thumbHTML(p) +
      '<div class="pub-body">' +
        '<h3 class="pub-title">' + titleHTML + "</h3>" +
        '<p class="pub-authors">' + formatAuthors(p.authors) + "</p>" +
        '<p class="pub-venue"><span class="venue-name">' + p.venue + "</span>" + badges + "</p>" +
        (p.insight ? '<p class="pub-insight">' + p.insight + "</p>" : "") +
        (links ? '<div class="pub-links">' + links + "</div>" : "") +
      "</div>";
    pubsList.appendChild(el);
  });

  /* Topic filter chips, built from the tags used across all papers. */
  var allTags = [];
  pubs.forEach(function (p) {
    (p.tags || []).forEach(function (t) {
      if (allTags.indexOf(t) === -1) allTags.push(t);
    });
  });

  if (allTags.length && filterBar) {
    ["All"].concat(allTags).forEach(function (t, i) {
      var b = document.createElement("button");
      b.className = "filter-tag" + (i === 0 ? " active" : "");
      b.textContent = t;
      b.addEventListener("click", function () {
        filterBar.querySelectorAll(".filter-tag").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        pubsList.querySelectorAll(".pub").forEach(function (card) {
          var tags = card.dataset.tags ? card.dataset.tags.split("|") : [];
          card.classList.toggle("hidden", t !== "All" && tags.indexOf(t) === -1);
        });
      });
      filterBar.appendChild(b);
    });
  }

  /* ---------- Scroll reveal ---------- */
  if ("IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealer.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.05 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { revealer.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

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
          Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("active"); });
          link.classList.add("active");
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
