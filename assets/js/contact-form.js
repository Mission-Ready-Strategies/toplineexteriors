// Handles the estimate forms (homepage + contact page).
// Posts to FormSubmit (https://formsubmit.co): no backend, no account, no API key.
// Submissions are emailed straight to the inbox in ENDPOINT below, with the
// visitor's email set as reply-to so you can reply to the lead directly.
//
// The endpoint uses FormSubmit's hashed alias (activated), which maps to
// quote@toplineinstall.com without exposing that address in the page source.
// To reroute leads, activate the new inbox at formsubmit.co and replace the
// hash below with its alias.
(function () {
  var ENDPOINT = "https://formsubmit.co/ajax/c33fb6e60012d2339c554fc85feff3e7";

  function handle(form) {
    var status = form.querySelector("[data-form-status]");
    var btn = form.querySelector("[type=submit]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var payload = {};
      new FormData(form).forEach(function (v, k) { payload[k] = v; });
      if (status) { status.textContent = "Sending..."; status.className = "mt-3 text-sm text-muted"; }
      if (btn) btn.disabled = true;
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) { return r.json().catch(function () { return { success: r.ok ? "true" : "false" }; }); })
        .then(function (res) {
          // FormSubmit returns success as the string "true" on a delivered submission.
          var ok = res && (res.success === "true" || res.success === true);
          if (ok) {
            form.reset();
            if (status) { status.textContent = "Thanks. Your request was sent. We will get back to you shortly."; status.className = "mt-3 text-sm font-semibold text-brand"; }
          } else {
            if (status) { status.textContent = (res && res.message) || "Something went wrong. Please email quote@toplineinstall.com."; status.className = "mt-3 text-sm font-semibold text-ink"; }
          }
        })
        .catch(function () {
          if (status) { status.textContent = "Something went wrong. Please email quote@toplineinstall.com."; status.className = "mt-3 text-sm font-semibold text-ink"; }
        })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  }

  document.querySelectorAll("form.js-contact-form").forEach(handle);
})();
