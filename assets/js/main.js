/* WorKnow: small enhancements. Every page works without this file;
   it adds the mobile menu, "upcoming" markers on the timeline, publication
   filters and copy buttons. */
(function () {
  "use strict";
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  /* Mobile menu */
  var nav = $("#nav"), btn = $("#menu-btn");
  if (nav && btn) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }

  /* Today as YYYY-MM-DD in the visitor's time zone. The site is built only when
     content changes, so "upcoming" is worked out in the browser, not at build time. */
  var t = new Date();
  var today = t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
  var isUpcoming = function (el) { return el.dataset.date >= today; };

  /* Home: show only the next N upcoming events */
  $$("[data-upcoming-only]").forEach(function (list) {
    var max = +list.dataset.upcomingOnly, shown = 0;
    $$(".event", list).forEach(function (li) {
      var show = isUpcoming(li) && shown < max;
      li.hidden = !show;
      if (show) shown++;
    });
    var empty = list.parentNode.querySelector("[data-empty]");
    if (empty) empty.hidden = shown > 0;
  });

  /* Events timeline: mark upcoming events and place a "Today" marker */
  var tl = $("#timeline");
  if (tl) {
    var items = $$(".tl-item", tl), firstFuture = null;
    items.forEach(function (li) {
      var bookend = li.classList.contains("tl-bookend");
      if (!bookend && isUpcoming(li)) {
        li.classList.add("is-upcoming");
        var badge = $(".tl-badge", li); if (badge) badge.hidden = false;
      }
      if (!firstFuture && li.dataset.date >= today) firstFuture = li;
    });
    if (firstFuture) {
      var marker = document.createElement("li");
      marker.className = "tl-today";
      marker.innerHTML = "<span>Today</span>";
      var prev = firstFuture.previousElementSibling;
      tl.insertBefore(marker, prev && prev.classList.contains("tl-year") ? prev : firstFuture);
    }
  }

  /* Publications page: filter by type */
  var pubFilter = $("#pub-filter");
  if (pubFilter) {
    pubFilter.addEventListener("click", function (e) {
      var b = e.target.closest(".tab"); if (!b) return;
      var type = b.dataset.type;
      $$("#pub-list .pub").forEach(function (li) { li.hidden = type !== "All" && li.dataset.type !== type; });
      $$(".tab", pubFilter).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
    });
  }

  /* Copy buttons */
  var toast = $("#toast"), timer;
  var say = function (msg) {
    if (!toast) return;
    toast.textContent = msg; toast.hidden = false;
    clearTimeout(timer); timer = setTimeout(function () { toast.hidden = true; }, 2200);
  };
  var copy = function (text) {
    text = text.replace(/\s+/g, " ").trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { say("Copied to clipboard"); },
        function () { say("Couldn’t copy. Select the text and copy it manually."); });
    } else {
      say("Couldn’t copy. Select the text and copy it manually.");
    }
  };
  document.addEventListener("click", function (e) {
    var c = e.target.closest("[data-copy-cite]");
    if (c) copy($(".cite-text", c.closest(".pub")).textContent);
  });
  var ack = $("#copy-ack");
  if (ack) ack.addEventListener("click", function () { copy($("#ack-text").textContent); });
})();
