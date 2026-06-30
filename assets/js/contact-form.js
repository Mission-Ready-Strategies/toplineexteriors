// Handles the estimate forms (homepage + contact page).
// Posts to FormSubmit (https://formsubmit.co): no backend, no account, no API key.
// Submissions are emailed straight to the inbox in ENDPOINT below, with the
// visitor's email set as reply-to so you can reply to the lead directly.
//
// ONE-TIME SETUP: the first submission ever sent to a new inbox triggers a
// FormSubmit activation email to that inbox. Click the "Activate Form" link once
// and every submission after that is delivered automatically. (To hide the raw
// address from the page source later, FormSubmit gives you a hashed alias after
// activation: swap quote@toplineinstall.com below for that /ajax/el/XXXX value.)
(function () {
  var ENDPOINT = "https://formsubmit.co/ajax/quote@toplineinstall.com";

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
