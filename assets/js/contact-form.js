// Handles the estimate forms (homepage + contact page).
// Posts to the Vercel serverless function, which sends email via Resend.
//
// >>> After deploying the function, set this to your function URL <<<
//     e.g. "https://toplineinstall.vercel.app/api/contact"
//     or a custom domain like "https://api.toplineinstall.com/api/contact"
(function () {
  var ENDPOINT = "https://YOUR-VERCEL-PROJECT.vercel.app/api/contact";

  function handle(form) {
    var status = form.querySelector("[data-form-status]");
    var btn = form.querySelector("[type=submit]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var payload = {};
      new FormData(form).forEach(function (v, k) { payload[k] = v; });
      if (status) { status.textContent = "Sending..."; status.className = "mt-3 text-sm text-steel"; }
      if (btn) btn.disabled = true;
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
        .then(function (res) {
          if (res && res.ok) {
            form.reset();
            if (status) { status.textContent = "Thanks. Your request was sent. We will get back to you shortly."; status.className = "mt-3 text-sm font-semibold text-brand-ink"; }
          } else {
            if (status) { status.textContent = (res && res.error) || "Something went wrong. Please email quote@toplineinstall.com."; status.className = "mt-3 text-sm font-semibold text-red-600"; }
          }
        })
        .catch(function () {
          if (status) { status.textContent = "Something went wrong. Please email quote@toplineinstall.com."; status.className = "mt-3 text-sm font-semibold text-red-600"; }
        })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  }

  document.querySelectorAll("form.js-contact-form").forEach(handle);
})();
