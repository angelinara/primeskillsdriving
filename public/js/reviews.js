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
  } catch (error) {
    console.error("Error loading reviews:", error);
  }
}

loadReviews();
