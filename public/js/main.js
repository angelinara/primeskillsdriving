// Function to reset scroll to top on page refresh
function resetScrollOnRefresh() {
  window.onbeforeunload = () => window.scrollTo(0, 0);
}

resetScrollOnRefresh();
