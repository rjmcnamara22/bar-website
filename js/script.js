const galleryTrack = document.querySelector(".gallery-track");
const galleryViewport = document.querySelector(".gallery-viewport");
const galleryBackBtn = document.getElementById("galleryBackBtn");
const galleryNextBtn = document.getElementById("galleryNextBtn");
const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));

let gallerySlides = Array.from(document.querySelectorAll(".gallery-slide"));
const originalSlideCount = gallerySlides.length;
let currentTrackIndex = originalSlideCount;

const getOriginalIndex = (trackIndex) => {
  return (
    ((trackIndex % originalSlideCount) + originalSlideCount) %
    originalSlideCount
  );
};

const buildInfiniteGallery = () => {
  const originalSlides = Array.from(
    document.querySelectorAll(".gallery-slide"),
  );

  originalSlides.forEach((slide, index) => {
    slide.dataset.originalIndex = index;
  });

  const beforeClones = originalSlides.map((slide, index) => {
    const clone = slide.cloneNode(true);
    clone.dataset.originalIndex = index;
    return clone;
  });

  const afterClones = originalSlides.map((slide, index) => {
    const clone = slide.cloneNode(true);
    clone.dataset.originalIndex = index;
    return clone;
  });

  beforeClones.forEach((clone) => {
    galleryTrack.appendChild(clone);
  });

  originalSlides.forEach((slide) => {
    galleryTrack.appendChild(slide);
  });

  afterClones.forEach((clone) => {
    galleryTrack.appendChild(clone);
  });

  gallerySlides = Array.from(document.querySelectorAll(".gallery-slide"));
};

const centerGallerySlide = (trackIndex, animate = true) => {
  currentTrackIndex = trackIndex;

  const originalIndex = getOriginalIndex(currentTrackIndex);
  const activeSlide = gallerySlides[currentTrackIndex];

  gallerySlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("active");
  });

  activeSlide.classList.add("active");
  thumbnails[originalIndex].classList.add("active");

  const viewportCenter = galleryViewport.clientWidth / 2;
  const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
  const translateX = viewportCenter - slideCenter;

  galleryTrack.style.transition = animate ? "transform 0.45s ease" : "none";
  galleryTrack.style.transform = `translateX(${translateX}px)`;

  thumbnails[originalIndex].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
};

const normalizeGalleryPosition = () => {
  if (currentTrackIndex >= originalSlideCount * 2) {
    currentTrackIndex = originalSlideCount;
    centerGallerySlide(currentTrackIndex, false);
  }

  if (currentTrackIndex < originalSlideCount) {
    currentTrackIndex = originalSlideCount + originalSlideCount - 1;
    centerGallerySlide(currentTrackIndex, false);
  }
};

galleryNextBtn.addEventListener("click", () => {
  centerGallerySlide(currentTrackIndex + 1);
});

galleryBackBtn.addEventListener("click", () => {
  centerGallerySlide(currentTrackIndex - 1);
});

galleryTrack.addEventListener("transitionend", normalizeGalleryPosition);

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    centerGallerySlide(originalSlideCount + index);
  });
});

window.addEventListener("load", () => {
  buildInfiniteGallery();
  centerGallerySlide(currentTrackIndex, false);
});

window.addEventListener("resize", () => {
  centerGallerySlide(currentTrackIndex, false);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
