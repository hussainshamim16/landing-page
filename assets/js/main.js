(() => {
  "use strict";

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Reviews carousel */
  const track = document.getElementById("reviewsTrack");
  const nextBtn = document.getElementById("reviewsNext");
  if (track && nextBtn) {
    nextBtn.addEventListener("click", () => {
      const card = track.querySelector(".review-card");
      const step = card ? card.offsetWidth + 20 : 280;
      const max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= max - 8) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: step, behavior: "smooth" });
      }
    });
  }

  /* FAQ accordion */
  const faqList = document.getElementById("faqList");
  if (faqList) {
    const items = Array.from(faqList.querySelectorAll(".faq-item"));

    const setOpen = (item, open) => {
      const btn = item.querySelector(".faq-q");
      const panel = item.querySelector(".faq-a");
      item.classList.toggle("is-open", open);
      if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (panel) panel.setAttribute("aria-hidden", open ? "false" : "true");
    };

    faqList.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq-q");
      if (!btn || !faqList.contains(btn)) return;
      e.preventDefault();
      const item = btn.closest(".faq-item");
      if (!item) return;
      const wasOpen = item.classList.contains("is-open");
      items.forEach((el) => setOpen(el, false));
      if (!wasOpen) setOpen(item, true);
    });
  }

  /* Estimate form */
  const form = document.getElementById("estimateForm");
  const success = document.getElementById("formSuccess");
  if (form && success) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.setAttribute("hidden", "");
      success.classList.add("is-shown");
    });
  }

  /* Before / After slider */
  const slider = document.getElementById("baSlider");
  const beforeImg = document.getElementById("baBeforeImg");
  const handle = document.getElementById("baHandle");
  if (slider && beforeImg && handle) {
    let active = false;

    const setPos = (clientX) => {
      const rect = slider.getBoundingClientRect();
      if (!rect.width) return;
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(4, Math.min(96, pct));
      beforeImg.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
      handle.style.left = pct + "%";
    };

    slider.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      slider.setPointerCapture?.(e.pointerId);
      active = true;
      setPos(e.clientX);
    });
    slider.addEventListener("pointermove", (e) => {
      if (active) setPos(e.clientX);
    });
    const end = () => {
      active = false;
    };
    slider.addEventListener("pointerup", end);
    slider.addEventListener("pointercancel", end);
    slider.addEventListener("lostpointercapture", end);

    slider.setAttribute("tabindex", "0");
    slider.addEventListener("keydown", (e) => {
      const match = /inset\(0 ([\d.]+)%/.exec(beforeImg.style.clipPath || "");
      let pct = 100 - (match ? parseFloat(match[1]) : 50);
      if (e.key === "ArrowLeft") pct -= 5;
      else if (e.key === "ArrowRight") pct += 5;
      else return;
      e.preventDefault();
      pct = Math.max(4, Math.min(96, pct));
      beforeImg.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
      handle.style.left = pct + "%";
    });
  }

  /* Video */
  const video = document.getElementById("videoPlay");
  const videoEmbed = document.getElementById("videoEmbed");
  if (video && videoEmbed) {
    const activate = () => {
      const src = video.getAttribute("data-video-src");
      const title =
        video.getAttribute("data-video-title") ||
        "Veteran Roofing Systems company overview video";
      if (!src) {
        video.style.outline = "2px solid #dd9618";
        video.style.outlineOffset = "4px";
        setTimeout(() => {
          video.style.outline = "";
        }, 800);
        return;
      }
      const iframe = document.createElement("iframe");
      iframe.src = src.includes("?") ? src + "&autoplay=1" : src + "?autoplay=1";
      iframe.title = title;
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      );
      videoEmbed.innerHTML = "";
      videoEmbed.appendChild(iframe);
      videoEmbed.hidden = false;
      video.hidden = true;
    };
    video.addEventListener("click", activate);
    video.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  }

  /* Mobile CTA */
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth" });
    });
  }
})();
