// Handles the estimate forms (homepage + contact page).
// Posts to Web3Forms: no backend, no project, works on static GitHub Pages.
// The access_key is a PUBLIC-SAFE key (set it in the hidden "access_key" input on
// each form). Get one free at https://web3forms.com (enter your inbox email).
(function () {
  var ENDPOINT = "https://api.web3forms.com/submit";

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
        .then(function (r) { return r.json().catch(function () { return { success: r.ok }; }); })
        .then(function (res) {
          if (res && res.success) {
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
