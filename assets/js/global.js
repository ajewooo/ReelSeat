document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("site-footer");
  if (footerContainer) {
    fetch("footer.html")
      .then((response) => response.text())
      .then((data) => {
        footerContainer.innerHTML = data;
      });
  }
});