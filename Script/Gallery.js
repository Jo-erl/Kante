document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.querySelector(".gallery-grid");
  const loadMoreBtn = document.querySelector(".load-more-btn");
  const imageViewer = document.querySelector(".image-viewer");
  const viewerImage = document.querySelector(".viewer-image");
  const closeViewer = document.querySelector(".close-viewer");
  const prevBtn = imageViewer.querySelector(".nav-button.prev");
  const nextBtn = imageViewer.querySelector(".nav-button.next");
  
  const allImages = [
    "Gallery/1.JPG",
    "Gallery/2.JPG",
    "Gallery/3.JPG",
    "Gallery/4.PNG",
    "Gallery/5.JPG",
    "Gallery/6.PNG",
    "Gallery/7.JPG",
    "Gallery/8.JPG",
    "Gallery/9.JPG",
    "Gallery/10.JPG",
    "Gallery/11.JPG",
    "Gallery/12.JPG",
  ];

  let currentImageIndex = 0;
  let loadedImagesCount = 6; 

  function loadMoreImages() {
    const remainingImages = allImages.slice(
      loadedImagesCount,
      loadedImagesCount + 6
    );
    const fragment = document.createDocumentFragment();

    remainingImages.forEach((imgSrc) => {
      const div = document.createElement("div");
      div.className = "gallery-item";

      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = "Fashion Item";
      img.loading = "lazy";

      div.appendChild(img);
      fragment.appendChild(div);
    });

    galleryGrid.appendChild(fragment);
    loadedImagesCount += remainingImages.length;

    if (loadedImagesCount >= allImages.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  loadMoreBtn.addEventListener("click", loadMoreImages);

  function updateViewerImage() {
    const fadeOut = () => {
      viewerImage.style.opacity = "0";
      setTimeout(() => {
        viewerImage.src = allImages[currentImageIndex];
        fadeIn();
      }, 200);
    };

    const fadeIn = () => {
      setTimeout(() => {
        viewerImage.style.opacity = "1";
      }, 50);
    };

    fadeOut();

    prevBtn.style.display = currentImageIndex === 0 ? "none" : "block";
    nextBtn.style.display =
      currentImageIndex === loadedImagesCount - 1 ? "none" : "block";
  }

  galleryGrid.addEventListener("click", (e) => {
    const clickedItem = e.target.closest(".gallery-item");
    if (clickedItem) {
      const allItems = Array.from(document.querySelectorAll(".gallery-item"));
      currentImageIndex = allItems.indexOf(clickedItem);
      imageViewer.classList.add("active");
      document.body.style.overflow = "hidden";
      viewerImage.style.transition = "opacity 0.2s ease-in-out";
      viewerImage.style.opacity = "1";
      updateViewerImage();
    }
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateViewerImage();
    }
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    if (currentImageIndex < loadedImagesCount - 1) {
      currentImageIndex++;
      updateViewerImage();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (imageViewer.classList.contains("active")) {
      if (e.key === "ArrowLeft" && currentImageIndex > 0) {
        currentImageIndex--;
        updateViewerImage();
      } else if (
        e.key === "ArrowRight" &&
        currentImageIndex < loadedImagesCount - 1
      ) {
        currentImageIndex++;
        updateViewerImage();
      } else if (e.key === "Escape") {
        imageViewer.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });

  closeViewer.addEventListener("click", () => {
    imageViewer.classList.remove("active");
    document.body.style.overflow = "";
  });

  imageViewer.addEventListener("click", (e) => {
    if (e.target === imageViewer) {
      imageViewer.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  viewerImage.style.transition = "opacity 0.2s ease-in-out";
});
