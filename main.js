// Track active section for side nav + light/dark zone switching
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".side-nav a");
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === "#" + id),
        );
        const zone =
          navLinks[[...sections].findIndex((s) => s.id === id)]?.dataset.zone ||
          "light";
        document.body.setAttribute("data-zone", zone);
      }
    });
  },
  { threshold: 0.5 },
);

sections.forEach((s) => observer.observe(s));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  },
  { threshold: 0.2 },
);

revealEls.forEach((el) => revealObserver.observe(el));


// About: icon slider that follows the hovered skill
const slides = [...document.querySelectorAll(".skill-slide")];
const track = document.querySelector(".skill-track");
const tagBox = document.querySelector("#about .tags");
const DEFAULT_SLIDE = slides.findIndex((s) => s.dataset.skill === "react");

function slideTo(i) {
  track.style.setProperty("--i", i);
  slides.forEach((s, n) => {
    s.dataset.d = Math.min(Math.abs(n - i), 2);
  });
}
slideTo(DEFAULT_SLIDE);

tagBox.querySelectorAll("span[data-skill]").forEach((tag) => {
  const i = slides.findIndex((s) => s.dataset.skill === tag.dataset.skill);
  if (i < 0) return;
  tag.addEventListener("mouseenter", () => slideTo(i));
  tag.addEventListener("focus", () => slideTo(i));
});

// slide back to React when the cursor leaves the tags
tagBox.addEventListener("mouseleave", () => slideTo(DEFAULT_SLIDE));