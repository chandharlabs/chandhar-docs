let images = [];
let currentIndex = -1;
let isFullscreen = false;

// Global click handler (MkDocs dynamic safe)
document.addEventListener("click", function (e) {
  const img = e.target;
  if (!img.matches('img[alt="Demo"]')) return;

  const alreadyOpen = img.classList.contains("demo-fullscreen");
  closeFullscreen(false);

  if (!alreadyOpen) {
    openFullscreen(img);
  }
});

// Keyboard controls
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeFullscreen(true);
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});

// Browser back button closes fullscreen
window.addEventListener("popstate", function () {
  if (isFullscreen) {
    closeFullscreen(false);
  }
});

// Initial load
document.addEventListener("DOMContentLoaded", function () {
  images = Array.from(document.querySelectorAll('img[alt="Demo"]'));
});

function openFullscreen(img) {
  images = Array.from(document.querySelectorAll('img[alt="Demo"]'));
  currentIndex = images.indexOf(img);
  isFullscreen = true;

  img.classList.add("demo-fullscreen");
  document.body.classList.add("demo-fullscreen-open");

  // Push history so Back button closes fullscreen
  history.pushState({ demoFullscreen: true }, "");

  addControls();
  showCaption(img);
}

function closeFullscreen(triggerBack) {
  if (!isFullscreen) return;

  document.querySelectorAll("img.demo-fullscreen").forEach(i => {
    i.classList.remove("demo-fullscreen");
  });
  document.body.classList.remove("demo-fullscreen-open");
  document.querySelectorAll(".demo-close-btn, .demo-nav-btn, .demo-caption").forEach(el => el.remove());

  isFullscreen = false;
  currentIndex = -1;

  if (triggerBack) {
    history.back();
  }
}

function showNext() {
  if (currentIndex === -1) return;
  currentIndex = (currentIndex + 1) % images.length;
  switchImage();
}

function showPrev() {
  if (currentIndex === -1) return;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  switchImage();
}

function switchImage() {
  document.querySelectorAll("img.demo-fullscreen").forEach(i => {
    i.classList.remove("demo-fullscreen");
  });

  const img = images[currentIndex];
  img.classList.add("demo-fullscreen");
  showCaption(img);
}

function addControls() {
  // Close button
  const closeBtn = document.createElement("div");
  closeBtn.className = "demo-close-btn";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => closeFullscreen(true));
  document.body.appendChild(closeBtn);

  // Prev button
  const prevBtn = document.createElement("div");
  prevBtn.className = "demo-nav-btn demo-prev";
  prevBtn.innerHTML = "&#10094;";
  prevBtn.addEventListener("click", showPrev);
  document.body.appendChild(prevBtn);

  // Next button
  const nextBtn = document.createElement("div");
  nextBtn.className = "demo-nav-btn demo-next";
  nextBtn.innerHTML = "&#10095;";
  nextBtn.addEventListener("click", showNext);
  document.body.appendChild(nextBtn);
}

function showCaption(img) {
  // Remove old caption
  const oldCaption = document.querySelector(".demo-caption");
  if (oldCaption) oldCaption.remove();

  // Read caption from data attribute
  const captionText = img.getAttribute("data-caption");
  if (!captionText) return; // Only show for images that have text

  const caption = document.createElement("div");
  caption.className = "demo-caption";
  caption.innerText = captionText;
  document.body.appendChild(caption);
}

