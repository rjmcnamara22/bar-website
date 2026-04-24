let scrollContainer = document.querySelector(".gallery");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");

const getScrollAmount = () => scrollContainer.clientWidth;

scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
  scrollContainer.style.scrollBehavior = "auto";
});

nextBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft += getScrollAmount();
});

backBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft -= getScrollAmount();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
