// prompt to specify location on contact page
function showOtherLocation() {
  const select = document.getElementById("location");
  const otherBox = document.getElementById("otherLocationBox");
  const otherInput = document.getElementById("otherLocation");

  if (select.value === "Other") {
    otherBox.style.display = "block";
    otherInput.required = true;
  } else {
    otherBox.style.display = "none";
    otherInput.required = false;
    otherInput.value = "";
  }
}

// Christmas promo banner (lives in header.html, which is fetched after this runs)
(function () {
  const PROMO_ENDS = new Date(2026, 11, 31); // hidden from 31 Dec 2026, local time
  const DISMISSED_STORAGE_NAME = "promo-christmas-2026-dismissed";
  const root = document.documentElement;

  if (new Date() >= PROMO_ENDS) {
    root.classList.add("promo-hidden");
    return;
  }
  try {
    if (sessionStorage.getItem(DISMISSED_STORAGE_NAME))
      root.classList.add("promo-hidden");
  } catch (e) {}

  document.addEventListener("click", (event) => {
    const code = event.target.closest(".promo-code");
    if (code) {
      const original = code.dataset.code;
      const done = () => {
        code.textContent = "Copied!";
        setTimeout(() => (code.textContent = original), 1500);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(original).then(done, () => {});
      }
      return;
    }
    if (event.target.closest(".promo-close")) {
      root.classList.add("promo-hidden");
      try {
        sessionStorage.setItem(DISMISSED_STORAGE_NAME, "1");
      } catch (e) {}
    }
  });
})();
