document.addEventListener("DOMContentLoaded", function () {
  let startCount = 504; // Initial count
  const countEl = document.getElementById("count");
  const section = document.getElementById("counter-section");
  const storedCount = localStorage.getItem("clientCount");
  const lastUpdate = localStorage.getItem("lastUpdate");

  if (storedCount && lastUpdate) {
    let daysPassed = Math.floor(
      (Date.now() - parseInt(lastUpdate)) / (1000 * 60 * 60 * 24)
    );
    startCount = parseInt(storedCount) + daysPassed * 2;
    localStorage.setItem("clientCount", startCount);
    localStorage.setItem("lastUpdate", Date.now());
  } else {
    localStorage.setItem("clientCount", startCount);
    localStorage.setItem("lastUpdate", Date.now());
  }

  let animationPlayed = false;
  function animateCount(target) {
    let current = 0;
    let increment = Math.ceil(target / 50);  
    let interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(interval);
        current = target;
      }
      countEl.textContent = current;
    }, 30);
  }

  function onScroll() {
    let rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (!animationPlayed) {
        animateCount(startCount);
        animationPlayed = true;
      }
    } else {
      animationPlayed = false;
    }
  }

  window.addEventListener("scroll", onScroll);
  countEl.textContent = startCount;
});
