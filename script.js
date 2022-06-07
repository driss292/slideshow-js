const slider = document.querySelector(".slideshow-container");

let holding = false;
let firstClickX;
let alreadyLeftScrolled;
let velocity;
let rafID;

slider.addEventListener("mousedown", (e) => {
  holding = true;

  firstClickX = e.pageX - slider.offsetLeft;

  alreadyLeftScrolled = slider.scrollLeft;
});

slider.addEventListener("mousemove", (e) => {
  if (!holding) {
    return;
  }

  const x = e.pageX - slider.offsetLeft;
  const scrolled = (x - firstClickX) * 2;
  const prevScrollLeft = slider.scrollLeft;

  slider.scrollLeft = alreadyLeftScrolled - scrolled;

  velocity = slider.scrollLeft - prevScrollLeft;
  //   console.log(velocity);

  //   console.log(alreadyLeftScrolled - scrolled);
  stopTransition();
});

slider.addEventListener("mouseup", () => {
  holding = false;
  startTransition();
});
slider.addEventListener("mouseleave", () => {
  holding = false;
});

slider.addEventListener("touchstart", (e) => {
  holding = true;

  firstClickX = e.targetTouches[0].pageX - slider.offsetLeft;

  alreadyLeftScrolled = slider.scrollLeft;
});
slider.addEventListener("touchend", () => {
  holding = false;
  startTransition();
});

slider.addEventListener("touchmove", (e) => {
  if (!holding) {
    return;
  }

  const x = e.targetTouches[0].pageX - slider.offsetLeft;
  const scrolled = (x - firstClickX) * 2;
  const prevScrollLeft = slider.scrollLeft;

  slider.scrollLeft = alreadyLeftScrolled - scrolled;

  velocity = slider.scrollLeft - prevScrollLeft;
  //   console.log(velocity);

  //   console.log(alreadyLeftScrolled - scrolled);
  stopTransition();
});

function startTransition() {
  stopTransition();

  rafID = requestAnimationFrame(decreasingTransition);
}

function stopTransition() {
  cancelAnimationFrame(rafID);
}

function decreasingTransition() {
  slider.scrollLeft += velocity;
  velocity *= 0.95;
  if (Math.abs(velocity) > 0.5) {
    rafID = requestAnimationFrame(decreasingTransition);
  }
}
