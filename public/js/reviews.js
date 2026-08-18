async function loadReviews() {
  try {
    const reviewFiles = [
      "reviews/reviews.json",
      "reviews/reviews-ABHRLXUNxGK6quVlsTH0Z_0zurQHi2ERCKL3GB.json",
      "reviews/reviews-ABHRLXUgZrOzYgQR3VZKiTe4hHDPDDULTgoejQ.json",
      "reviews/reviews-ABHRLXV--srl83a0LRneaiQ6_axEfEjFCnzjoN.json",
      "reviews/reviews-ABHRLXW75b8nKGtPp6I-v6qBrT4bsSX0xQzyob.json",
      "reviews/reviews-ABHRLXWLXpvm9RMsFcu91MeK7hddHPrGjxM8Gv.json",
      "reviews/reviews-ABHRLXXcru25os7ZuTMNIJPzyyZbabBCpnYyiD.json",
      "reviews/reviews-ABHRLXXx0t8ZsqLQ0jeiYbkatkqhcDS-MTSxft.json",
    ];

    const allData = await Promise.all(
      reviewFiles.map((f) => fetch(f).then((r) => r.json())),
    );
    const allReviews = allData.flatMap((data) => data.reviews ?? []);

    const container = document.getElementById("reviews-container");

    const starMap = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

    function generateStars(starRating) {
      const count = starMap[starRating] || 0;
      return "★".repeat(count) + "☆".repeat(5 - count);
    }

    function formatDate(isoString) {
      return new Date(isoString).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    const filtered = allReviews
      .filter((review) => review.comment)
      .sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
      .slice(0, 15);

    const selected = filtered.sort(() => Math.random() - 0.5).slice(0, 6);

    selected.forEach((review) => {
      const card = document.createElement("div");
      card.className = "review-card";

      card.innerHTML = `
        <div class="review-header">
          <span class="reviewer-name">${review.reviewer.displayName}</span>
          <span class="review-date">${formatDate(review.createTime)}</span>
        </div>
        <div class="stars">${generateStars(review.starRating)}</div>
        <p class="review-text">${review.comment}</p>
      `;

      container.appendChild(card);
    });

    // Long reviews are clamped by CSS; give only the ones that actually
    // overflow a toggle, so short reviews don't get a pointless button.
    container.querySelectorAll(".review-card").forEach((card, index) => {
      const text = card.querySelector(".review-text");

      // scrollHeight matches clientHeight under -webkit-line-clamp, so lift
      // the clamp briefly to find out whether the text is actually cut off.
      const clampedHeight = text.clientHeight;
      text.style.webkitLineClamp = "unset";
      const fullHeight = text.scrollHeight;
      text.style.webkitLineClamp = "";
      if (fullHeight <= clampedHeight + 2) return;

      text.id = `review-text-${index}`;

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "review-more";
      toggle.textContent = "Read more";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-controls", text.id);

      toggle.addEventListener("click", () => {
        const expanded = card.classList.toggle("is-expanded");
        toggle.textContent = expanded ? "Show less" : "Read more";
        toggle.setAttribute("aria-expanded", String(expanded));
      });

      card.appendChild(toggle);
    });

    // Cards arrive after the browser has already handled any #hash, so a link
    // to #reviews would otherwise leave the visitor at the top of the page.
    // The fetched header/footer and the lazy image also settle around now and
    // grow the page above the target, so keep re-aligning until it stops
    // moving rather than scrolling once.
    if (location.hash === "#reviews") {
      const target = document.getElementById("reviews");
      let frames = 0;
      let cancelled = false;

      // Hand control back the moment the visitor scrolls themselves.
      const cancel = () => {
        cancelled = true;
      };
      ["wheel", "touchstart", "keydown"].forEach((event) =>
        window.addEventListener(event, cancel, { once: true, passive: true }),
      );

      const settle = () => {
        if (cancelled || !target) return;
        // "instant", not "auto": "auto" defers to the global
        // scroll-behavior: smooth, and each frame would cancel the last.
        target.scrollIntoView({ behavior: "instant", block: "start" });
        // Re-align for a short window rather than stopping at the first hit —
        // the header and image can shift the target either way after we land.
        if (frames++ < 40) requestAnimationFrame(settle);
      };

      settle();
    }
  } catch (error) {
    console.error("Error loading reviews:", error);
  }
}

loadReviews();
