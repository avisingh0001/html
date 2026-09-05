document.addEventListener("DOMContentLoaded", () => {
  const sections = Array.from(document.querySelectorAll(".section"));
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const backToTop = document.querySelector(".back-to-top");
  const avatarImg = document.querySelector(".avatar-frame img");

  /* Reveal sections as they enter the viewport */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((section) => revealObserver.observe(section));

  /* Highlight the nav link for the section currently in view */
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = navLinks.find((a) => a.getAttribute("href") === `#${id}`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => navObserver.observe(section));

  /* Show/hide back-to-top button */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 480) {
      backToTop.classList.add("is-shown");
    } else {
      backToTop.classList.remove("is-shown");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* Graceful fallback if the profile photo file isn't present */
  if (avatarImg) {
    avatarImg.addEventListener("error", () => {
      const frame = avatarImg.parentElement;
      const initials = document.createElement("div");
      initials.className = "avatar-fallback";
      initials.textContent = "ARS";
      avatarImg.replaceWith(initials);
    });
  }
});
