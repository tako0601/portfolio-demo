document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     Smooth Scroll
  ====================================================== */

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      const header = document.getElementById("site-header");
      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });


  /* =====================================================
     Header Scroll Effect
  ====================================================== */

  const header = document.getElementById("site-header");

  const handleHeaderScroll = () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  handleHeaderScroll();

  window.addEventListener("scroll", handleHeaderScroll);


  /* =====================================================
     FAQ Accordion
  ====================================================== */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {

      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });

    });
  });


  /* =====================================================
     Back To Top
  ====================================================== */

  const backToTop = document.querySelector(
    '.footer-bottom a[href="#home"]'
  );

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  /* =====================================================
     Reveal Animation
  ====================================================== */

  const revealElements = document.querySelectorAll(
    `
      .section-heading,
      .service-card,
      .portfolio-card,
      .advantage-item,
      .process-item,
      .contact-item
    `
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =====================================================
     Active Navigation
  ====================================================== */

  const sections = document.querySelectorAll("main section[id]");

  const navLinks = document.querySelectorAll(
    ".nav-item a[href^='#']"
  );

  const updateActiveNavigation = () => {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }

    });

    navLinks.forEach((link) => {

      link.classList.remove("is-active");

      if (
        link.getAttribute("href") === `#${currentSection}`
      ) {
        link.classList.add("is-active");
      }

    });

  };

  updateActiveNavigation();

  window.addEventListener("scroll", updateActiveNavigation);

});