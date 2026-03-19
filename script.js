// Prevent browser's default anchor scrolling on page load
if (window.location.hash && window.location.hash !== "#top") {
  // Temporarily override scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  // Scroll to top immediately to prevent browser from jumping to hash
  window.scrollTo(0, 0);
}

const yearNode = document.getElementById("year");
const siteHeader = document.querySelector(".site-header");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

// Cursor trail effect
let mouseX = 0;
let mouseY = 0;
let cursorTrails = [];

if (!prefersReducedMotion.matches) {
  for (let i = 0; i < 5; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, ${0.6 - i * 0.1}), transparent);
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: screen;
      transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    cursorTrails.push({ element: trail, x: 0, y: 0 });
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursorTrails() {
    let prevX = mouseX;
    let prevY = mouseY;

    cursorTrails.forEach((trail, index) => {
      trail.x += (prevX - trail.x) * (0.2 - index * 0.03);
      trail.y += (prevY - trail.y) * (0.2 - index * 0.03);

      trail.element.style.transform = `translate(${trail.x - 4}px, ${trail.y - 4}px)`;

      prevX = trail.x;
      prevY = trail.y;
    });

    requestAnimationFrame(animateCursorTrails);
  }

  animateCursorTrails();
}

// Removed parallax tilt effect on cards to prevent them from moving out of screen

// Interactive background orbs
const orbs = document.querySelectorAll('.bg-orb');
document.addEventListener('mousemove', (e) => {
  if (prefersReducedMotion.matches) return;

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 20;
    const xOffset = (x - 0.5) * speed;
    const yOffset = (y - 0.5) * speed;

    orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  });
});

// Add glow effect to buttons on hover
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', function(e) {
    if (prefersReducedMotion.matches) return;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      width: 10px;
      height: 10px;
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    const rect = btn.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left - 5) + 'px';
    ripple.style.top = (e.clientY - rect.top - 5) + 'px';

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      width: 100px;
      height: 100px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Smooth scroll progress indicator
if (!prefersReducedMotion.matches) {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3));
    z-index: 9999;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.1s ease;
    box-shadow: 0 0 10px var(--accent);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = scrolled / scrollHeight;
    progressBar.style.transform = `scaleX(${progress})`;
  });
}

// Add text shimmer effect
const heroTitle = document.querySelector('.hero-title');
if (heroTitle && !prefersReducedMotion.matches) {
  setInterval(() => {
    heroTitle.style.textShadow = `
      0 0 ${20 + Math.random() * 20}px rgba(139, 92, 246, ${0.3 + Math.random() * 0.3}),
      0 0 ${10 + Math.random() * 10}px rgba(236, 72, 153, ${0.2 + Math.random() * 0.2})
    `;
  }, 2000);
}

// Floating particles effect
if (!prefersReducedMotion.matches) {
  const particleContainer = document.createElement('div');
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  document.body.appendChild(particleContainer);

  function createParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 20 + 15;
    const startX = Math.random() * window.innerWidth;
    const colors = ['139, 92, 246', '236, 72, 153', '6, 182, 212'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(${color}, 0.8), transparent);
      border-radius: 50%;
      bottom: -10px;
      left: ${startX}px;
      animation: floatUp ${duration}s linear;
      opacity: ${Math.random() * 0.5 + 0.3};
      box-shadow: 0 0 ${size * 3}px rgba(${color}, 0.5);
    `;

    particleContainer.appendChild(particle);

    setTimeout(() => particle.remove(), duration * 1000);
  }

  // Create particles periodically
  setInterval(createParticle, 300);

  // Add float up animation
  const particleStyle = document.createElement('style');
  particleStyle.textContent = `
    @keyframes floatUp {
      to {
        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(particleStyle);
}

// Add interactive hover effect for section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
  title.addEventListener('mouseenter', function() {
    if (prefersReducedMotion.matches) return;
    this.style.transform = 'scale(1.02)';
    this.style.transition = 'transform 0.3s ease';
  });

  title.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

const revealNodes = Array.from(document.querySelectorAll("[data-reveal]"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  revealNodes.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
    revealObserver.observe(node);
  });
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

// Add click handler for "George Babik" brand to scroll to top
const brandLink = document.querySelector('.brand');
if (brandLink) {
  brandLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion.matches ? "auto" : "smooth"
    });
    // Update URL without triggering navigation
    if (window.location.hash !== "#top") {
      try {
        history.replaceState(null, "", "#top");
      } catch {}
    }
  });
}

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const getScrollBehavior = () => (prefersReducedMotion.matches ? "auto" : "smooth");
// Visual landing gap below the sticky header when clicking nav links.
const sectionJumpGap = 15;
// Small tolerance for sub-pixel/rounding differences between scroll landing and rect reads.
const activeSectionEpsilon = 3;
// Free-scroll highlighting uses a top focus band (instead of a single probe line) to avoid
// skipping short sections when two sections are visible at the same time.
const activeSectionFocusTopOffset = Math.max(8, sectionJumpGap - 4);
const activeSectionFocusBandHeight = 260;

const getDocumentTop = (node) => window.scrollY + node.getBoundingClientRect().top;

const getSectionTarget = (section) => section.querySelector(".section-head") || section;

const scrollToSection = (hash, behavior = getScrollBehavior()) => {
  if (!hash || !hash.startsWith("#")) {
    return false;
  }

  // Special case: scroll to top when clicking "George Babik" brand
  if (hash === "#top") {
    window.scrollTo({
      top: 0,
      behavior,
    });
    return true;
  }

  const section = document.querySelector(hash);
  if (!section) {
    return false;
  }

  const target = getSectionTarget(section);
  const headerHeight = siteHeader ? siteHeader.getBoundingClientRect().height : 0;
  const top = getDocumentTop(target) - headerHeight - sectionJumpGap;

  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });

  return true;
};

if (navLinks.length && sections.length) {
  const linkByHash = new Map(navLinks.map((link) => [link.getAttribute("href"), link]));
  let navScrollLockTargetId = null;
  let navScrollToken = 0;

  const setActive = (id) => {
    navLinks.forEach((link) => link.classList.remove("is-active"));
    const activeLink = linkByHash.get(`#${id}`);
    if (activeLink) {
      activeLink.classList.add("is-active");
    }
  };

  let ticking = false;

  const updateActiveSection = () => {
    ticking = false;
    if (navScrollLockTargetId) {
      setActive(navScrollLockTargetId);
      return;
    }

    const headerHeight = siteHeader ? siteHeader.getBoundingClientRect().height : 0;
    const focusTop = headerHeight + activeSectionFocusTopOffset;
    const focusBottom = Math.min(window.innerHeight, focusTop + activeSectionFocusBandHeight);
    const firstSection = sections[0];
    const firstSectionTop = firstSection
      ? firstSection.getBoundingClientRect().top
      : null;

    if (window.scrollY <= 16) {
      setActive(null);
      return;
    }

    if (firstSectionTop !== null && firstSectionTop > focusTop + activeSectionEpsilon) {
      setActive(null);
      return;
    }

    const getOverlapPx = (rect, top, bottom) =>
      Math.max(0, Math.min(rect.bottom, bottom) - Math.max(rect.top, top));

    let current = null;
    let bestOverlap = 0;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const overlap = getOverlapPx(
        rect,
        focusTop - activeSectionEpsilon,
        focusBottom + activeSectionEpsilon
      );
      if (overlap > bestOverlap) {
        bestOverlap = overlap;
        current = section.id;
      }
    }

    const lastSection = sections[sections.length - 1];
    const lastRect = lastSection.getBoundingClientRect();
    const lastVisiblePx = getOverlapPx(lastRect, headerHeight, window.innerHeight);
    const maxScrollY = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const remainingScrollY = maxScrollY - window.scrollY;
    const nearPageBottom = remainingScrollY <= 2;

    // Last-section edge case: the page may not be able to scroll far enough for the probe line to
    // enter the final section. Near the bottom, prefer the last section if it is visible.
    if (current !== lastSection.id && nearPageBottom && lastVisiblePx > 24) {
      setActive(lastSection.id);
      return;
    }

    if (!current || bestOverlap <= 0) {
      setActive(null);
      return;
    }

    setActive(current);
  };

  const requestActiveUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    }
  };

  window.addEventListener("scroll", () => {
    requestActiveUpdate();
  }, { passive: true });

  window.addEventListener("resize", requestActiveUpdate);
  window.addEventListener("load", requestActiveUpdate);
  window.addEventListener("pageshow", requestActiveUpdate);

  if (document.fonts && typeof document.fonts.ready?.then === "function") {
    document.fonts.ready.then(requestActiveUpdate).catch(() => {});
  }

  window.setTimeout(requestActiveUpdate, 200);
  window.setTimeout(requestActiveUpdate, 600);

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || !hash.startsWith("#")) {
        return;
      }

      event.preventDefault();
      const targetId = hash.slice(1);
      const correctionDelay = prefersReducedMotion.matches ? 0 : 120;
      const lockDuration = prefersReducedMotion.matches ? 80 : 1100;
      const token = ++navScrollToken;
      navScrollLockTargetId = targetId;
      setActive(targetId);
      scrollToSection(hash);

      // One correction pass keeps the first click accurate when layout shifts after tap.
      window.setTimeout(() => {
        if (token !== navScrollToken) {
          return;
        }
        scrollToSection(hash, "auto");
        setActive(targetId);
      }, correctionDelay);

      window.setTimeout(() => {
        if (token !== navScrollToken) {
          return;
        }
        navScrollLockTargetId = null;
        requestActiveUpdate();
      }, lockDuration + 20);

      if (window.location.hash !== hash) {
        try {
          history.replaceState(null, "", hash);
        } catch {
          // Skip hash update fallback to avoid triggering browser native anchor scroll.
        }
      }
    });
  });

  // Handle initial hash on page load (including opening in new tab)
  const handleInitialHash = () => {
    if (!window.location.hash) {
      requestActiveUpdate();
      return;
    }

    if (window.location.hash === "#top") {
      window.scrollTo({ top: 0, behavior: "auto" });
      setActive(null);
      requestActiveUpdate();
    } else if (linkByHash.has(window.location.hash)) {
      const targetId = window.location.hash.slice(1);
      setActive(targetId);
      scrollToSection(window.location.hash, "auto");

      // Multiple correction passes to handle layout shifts
      setTimeout(() => {
        scrollToSection(window.location.hash, "auto");
        requestActiveUpdate();
      }, 150);

      setTimeout(() => {
        scrollToSection(window.location.hash, "auto");
      }, 400);
    }
  };

  // Wait for page to be fully loaded before handling hash
  if (document.readyState === 'complete') {
    handleInitialHash();
  } else {
    window.addEventListener('load', () => {
      setTimeout(handleInitialHash, 50);
    });
  }

  requestActiveUpdate();
}
