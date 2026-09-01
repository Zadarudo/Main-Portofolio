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
