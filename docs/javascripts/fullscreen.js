document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('img[alt="Demo"]');

  images.forEach(img => {
    img.addEventListener("click", function () {
      const isOpen = this.classList.contains("demo-fullscreen");

      // Close any open fullscreen image
      document.querySelectorAll("img.demo-fullscreen").forEach(i => {
        i.classList.remove("demo-fullscreen");
      });
      document.body.classList.remove("demo-fullscreen-open");

      // Toggle this one
      if (!isOpen) {
        this.classList.add("demo-fullscreen");
        document.body.classList.add("demo-fullscreen-open");
      }
    });
  });

  // Close on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll("img.demo-fullscreen").forEach(i => {
        i.classList.remove("demo-fullscreen");
      });
      document.body.classList.remove("demo-fullscreen-open");
    }
  });
});

