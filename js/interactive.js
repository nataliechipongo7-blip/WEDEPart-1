document.addEventListener("DOMContentLoaded", function () {
    
    // 1. ACCORDION CODE (For menu.html Extra Options)
    // ==========================================
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(function (header) {
        header.addEventListener("click", function () {
            const currentItem = this.closest(".accordion-item");
            const currentContent = currentItem ? currentItem.querySelector(".accordion-content") : null;

            document.querySelectorAll(".accordion-item .accordion-content").forEach(function (content) {
                if (content && content !== currentContent) {
                    content.style.maxHeight = null;
                }
            });

            if (currentContent) {
                if (currentContent.style.maxHeight) {
                    currentContent.style.maxHeight = null;
                } else {
                    currentContent.style.maxHeight = currentContent.scrollHeight + "px";
                }
            }
        });
    });

    
    // 2. LIGHTBOX POPUP CODE (For index.html Gallery)
    // ==========================================
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    const galleryImages = document.querySelectorAll(".image-gallery img");

    if (lightbox && lightboxImg && galleryImages.length) {
        galleryImages.forEach(function (image) {
            image.addEventListener("click", function () {
                lightboxImg.src = this.src;
                lightbox.style.display = "flex";
            });
        });
         //When the user clicks the X button,hide the window again//
        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                lightbox.style.display = "none";
            });
        }
         // Also close it if they click anywhere on the dark background//
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }
    // Close lightbox on Escape key for better UX
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    });

    // ==========================================
    // 3. DYNAMIC TESTIMONIAL CAROUSEL & RATING SYSTEM
    // ==========================================
    const reviews = document.querySelectorAll(".review-card");
    const prevBtn = document.getElementById("prev-review");
    const nextBtn = document.getElementById("next-review");
    let currentReviewIndex = 0;

    function showReview(index) {
        // Remove active class from the current review card to hide it
        reviews[currentReviewIndex].classList.remove("active");
        
        // Update index position safely
        currentReviewIndex = index;
        
        // Handle wrapping loops around the array length
        if (currentReviewIndex >= reviews.length) {
            currentReviewIndex = 0;
        } else if (currentReviewIndex < 0) {
            currentReviewIndex = reviews.length - 1;
        }
        
        // Add active class to the newly targeted review card to display it
        reviews[currentReviewIndex].classList.add("active");
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            showReview(currentReviewIndex + 1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            showReview(currentReviewIndex - 1);
        });
    }

    // Star Rating Variables
    const stars = document.querySelectorAll(".star");
    const ratingInput = document.getElementById("selected-rating");
    const submitReviewBtn = document.getElementById("submit-review-btn");
    const reviewContainer = document.querySelector(".review-container");

    // Loop through each star to handle hover, touch, and clicks
    stars.forEach(function(star) {
        // Desktop hover preview (mouse only)
        star.addEventListener("mouseover", function() {
            var hoverValue = this.getAttribute("data-value");
            
            // Light up stars up to the hovered one, but don't remove selected class
            stars.forEach(function(s) {
                if (parseInt(s.getAttribute("data-value")) <= parseInt(hoverValue)) {
                    s.classList.add("hover");
                } else {
                    // Only remove hover if the star doesn't have selected class
                    if (!s.classList.contains("selected")) {
                        s.classList.remove("hover");
                    }
                }
            });
        });

        // Desktop mouse leave - restore selected state
        star.addEventListener("mouseout", function() {
            // Remove hover but keep selected class
            stars.forEach(function(s) {
                s.classList.remove("hover");
            });
        });

        // When a star is clicked, set the rating
        star.addEventListener("click", function() {
            var selectedValue = this.getAttribute("data-value");
            ratingInput.value = selectedValue;

            // Mark clicked stars as selected
            stars.forEach(function(s) {
                if (parseInt(s.getAttribute("data-value")) <= parseInt(selectedValue)) {
                    s.classList.add("selected");
                } else {
                    s.classList.remove("selected");
                }
            });
        });

        // Touch support for mobile devices - tap to set rating
        star.addEventListener("touchend", function(e) {
            e.preventDefault();
            var selectedValue = this.getAttribute("data-value");
            ratingInput.value = selectedValue;

            // Mark clicked stars as selected
            stars.forEach(function(s) {
                if (parseInt(s.getAttribute("data-value")) <= parseInt(selectedValue)) {
                    s.classList.add("selected");
                } else {
                    s.classList.remove("selected");
                }
            });
        });
    });

    // Touch sliding preview - show preview as finger moves across stars
    const starRating = document.querySelector(".star-rating");
    if (starRating) {
        starRating.addEventListener("touchmove", function(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (element && element.classList.contains("star")) {
                var hoverValue = element.getAttribute("data-value");
                
                // Show preview as finger slides
                stars.forEach(function(s) {
                    if (parseInt(s.getAttribute("data-value")) <= parseInt(hoverValue)) {
                        s.classList.add("touch-preview");
                    } else {
                        s.classList.remove("touch-preview");
                    }
                });
            }
        });

        // Remove preview when touch ends
        starRating.addEventListener("touchend", function() {
            stars.forEach(function(s) {
                s.classList.remove("touch-preview");
            });
        });
    }
});