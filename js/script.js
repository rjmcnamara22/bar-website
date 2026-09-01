document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Gallery ---------- */
  const galleryTrack = document.querySelector(".gallery-track");
  const galleryViewport = document.querySelector(".gallery-viewport");
  const galleryBackBtn = document.getElementById("galleryBackBtn");
  const galleryNextBtn = document.getElementById("galleryNextBtn");
  const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
  const thumbnailStrip = document.querySelector(".thumbnail-strip");

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

    beforeClones.forEach((clone) => galleryTrack.appendChild(clone));
    originalSlides.forEach((slide) => galleryTrack.appendChild(slide));
    afterClones.forEach((clone) => galleryTrack.appendChild(clone));

    gallerySlides = Array.from(document.querySelectorAll(".gallery-slide"));
  };

  const centerGallerySlide = (trackIndex, animate = true) => {
    currentTrackIndex = trackIndex;

    const originalIndex = getOriginalIndex(currentTrackIndex);
    const activeSlide = gallerySlides[currentTrackIndex];
    const activeThumbnail = thumbnails[originalIndex];

    gallerySlides.forEach((slide) => slide.classList.remove("active"));
    thumbnails.forEach((thumbnail) => thumbnail.classList.remove("active"));

    activeSlide.classList.add("active");
    activeThumbnail.classList.add("active");

    const viewportCenter = galleryViewport.clientWidth / 2;
    const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
    const translateX = viewportCenter - slideCenter;

    galleryTrack.style.transition = animate ? "transform 0.45s ease" : "none";
    galleryTrack.style.transform = `translateX(${translateX}px)`;

    const thumbnailCenter =
      activeThumbnail.offsetLeft + activeThumbnail.offsetWidth / 2;

    const thumbnailScrollPosition =
      thumbnailCenter - thumbnailStrip.clientWidth / 2;

    thumbnailStrip.scrollTo({
      left: thumbnailScrollPosition,
      behavior: animate ? "smooth" : "auto",
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

  buildInfiniteGallery();
  centerGallerySlide(currentTrackIndex, false);

  window.addEventListener("resize", () => {
    centerGallerySlide(currentTrackIndex, false);
  });

  /* ---------- Smooth-scroll anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  /* ---------- Dismissable popup ---------- */
  const overlay = document.getElementById("popup-overlay");
  const closeBtn = document.getElementById("popup-close");

  const closePopup = () => {
    overlay.classList.add("hidden");
  };

  closeBtn.addEventListener("click", closePopup);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closePopup();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  });
});
