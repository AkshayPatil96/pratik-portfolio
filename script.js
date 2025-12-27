// Initialize GSAP animations and interactive behaviors for the portfolio
gsap.registerPlugin(ScrollTrigger);

// Typewriter effect for hero role label
const typewriterEl = document.querySelector("[data-typewriter]");
if (typewriterEl) {
  const outputEl =
    typewriterEl.querySelector("[data-typewriter-output]") || typewriterEl;
  const storedText = typewriterEl.getAttribute("data-typewriter-text");
  const textContent = storedText
    ? storedText.trim()
    : outputEl.textContent.trim();
  const typingSpeed = 110;
  const pauseDuration = 1800;
  let index = 0;

  const type = () => {
    if (index <= textContent.length) {
      outputEl.textContent = textContent.slice(0, index);
      index += 1;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(() => {
        outputEl.textContent = "";
        index = 0;
        type();
      }, pauseDuration);
    }
  };

  typewriterEl.setAttribute("aria-label", textContent);
  outputEl.textContent = "";
  type();
}

// Selected missions data source
const projectsData = [
  {
    title: "Project: NEON_DRIFT",
    ariaLabel: "Open Project NEON_DRIFT",
    description:
      "A high-octane racing game HUD redesign focusing on readability at 200mph. Implemented using Unity UI Toolkit.",
    tags: ["Figma", "Unity", "After Effects"],
    category: "UI / MOTION",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRHiivYwobvAMNhi6nPFsbDzH85MPmz9bVzWRyTpTlBoSVKi2ew_j2MZuAzDXqFnHIJjSq7CTl0K5VbNHYj6FcfyfYuzhTC8PHqjmV2sZ-efKwUkOfGehNPx6r5cFe8VnKtAGY1ud1qqT_3ez-15RYosz0rYKUtpdTHVaSAP0dxNFdYcXLjL6h8NJmOtZkwkm32N4whICyXjGJ-k89txUciZ7dVCT6lVdva34CxeSuTRUv7iVEdWe2jxmo1J23NfJ38Xig0wQqq8zJ",
    imageAlt: "Futuristic sci-fi HUD interface design",
    videoPoster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRHiivYwobvAMNhi6nPFsbDzH85MPmz9bVzWRyTpTlBoSVKi2ew_j2MZuAzDXqFnHIJjSq7CTl0K5VbNHYj6FcfyfYuzhTC8PHqjmV2sZ-efKwUkOfGehNPx6r5cFe8VnKtAGY1ud1qqT_3ez-15RYosz0rYKUtpdTHVaSAP0dxNFdYcXLjL6h8NJmOtZkwkm32N4whICyXjGJ-k89txUciZ7dVCT6lVdva34CxeSuTRUv7iVEdWe2jxmo1J23NfJ38Xig0wQqq8zJ",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/tunnel-sm.mp4",
    link: "https://www.youtube.com/watch?v=Z5NoQg8LdDk",
  },
  {
    title: "Project: AETHER_RPG",
    ariaLabel: "Open Project AETHER_RPG",
    description:
      "Complex inventory management system for an open-world RPG. Focused on drag-and-drop interactions and controller support.",
    tags: ["UX Research", "Unreal Engine 5"],
    category: "UX / SYSTEM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA58IAnp5PZvZwOqZHZw7LlhgX3yBU0PpBYB5GMKoXd-nz-L-Jb0p0YSJucH83ksXWeEdAKgEludaJ4FdIQWGluMTdErD8TUfgQw_qotg-zLI8ZKU9LUz8b35fvwjY0uKrCUKI7PxJUJ0LUsKY0Kh1nepbza91ZAwLn3-KfQ3KKC638gz87v5JgNz0upDUUd45tRPd8ncdFVBpcMuNz78WlUq_-3iK7YxJSMwEgKgggXp1aNv7QOMaLs-2PWVrvSzrSxaXTkrn7Ucid",
    imageAlt: "Role playing game inventory system interface",
    videoPoster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA58IAnp5PZvZwOqZHZw7LlhgX3yBU0PpBYB5GMKoXd-nz-L-Jb0p0YSJucH83ksXWeEdAKgEludaJ4FdIQWGluMTdErD8TUfgQw_qotg-zLI8ZKU9LUz8b35fvwjY0uKrCUKI7PxJUJ0LUsKY0Kh1nepbza91ZAwLn3-KfQ3KKC638gz87v5JgNz0upDUUd45tRPd8ncdFVBpcMuNz78WlUq_-3iK7YxJSMwEgKgggXp1aNv7QOMaLs-2PWVrvSzrSxaXTkrn7Ucid",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    link: "https://www.youtube.com/watch?v=2Ngs3YF6X4g",
  },
  {
    title: "Project: FRAG_STATS",
    ariaLabel: "Open Project FRAG_STATS",
    description:
      "Esports analytics dashboard for team managers. Visualizing complex kill/death ratios and heatmaps in real-time.",
    tags: ["React", "D3.js", "Tailwind"],
    category: "WEB / DATA",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZiZTyNhJbGwpMlv10hAkR24hpI_VFo7ZEaV_oZ41LZ9qXO5tnO4rAHXDuqTo-Ue3CYxbev4P_-JjYJ5HRzC7GJt2zbH7JlU9kS02kk0qBut2a04zSt0GwFx33kZ4UWgkppjF-7FUJJIrCdY62Nuvqo8lLd7EkjAjKoG2nmIgWOUHRVsEbqdII6LNxuyxCxc2E4AfEfIyuGNifCe-LScAFQPH8rHggXUdf6jZxcp3vC4eyCNYUmNed7yaFS1cLkEq6JkQaZDOrbREV",
    imageAlt: "Data visualization dashboard for esports",
    videoPoster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZiZTyNhJbGwpMlv10hAkR24hpI_VFo7ZEaV_oZ41LZ9qXO5tnO4rAHXDuqTo-Ue3CYxbev4P_-JjYJ5HRzC7GJt2zbH7JlU9kS02kk0qBut2a04zSt0GwFx33kZ4UWgkppjF-7FUJJIrCdY62Nuvqo8lLd7EkjAjKoG2nmIgWOUHRVsEbqdII6LNxuyxCxc2E4AfEfIyuGNifCe-LScAFQPH8rHggXUdf6jZxcp3vC4eyCNYUmNed7yaFS1cLkEq6JkQaZDOrbREV",
    video: "https://www.w3schools.com/html/movie.mp4",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
  {
    title: "Top Secret",
    titleClasses:
      "text-xl font-bold text-white mb-1",
    ariaLabel: "Open Project TOP_SECRET",
    description: "Upcoming AAA Title<br/>NDA Restricted",
    descriptionClasses: "text-slate-500 text-sm",
    tags: [],
    category: "CLASSIFIED",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Encrypted development workspace",
    imageFilters: "",
    videoPoster:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    link: "https://www.youtube.com/watch?v=wXhTHyIgQ_U",
    bodyClasses: "text-center",
    icon: "lock",
    cardClasses: "border-dashed border-2 border-white/10",
  },
];

const toolsData = [
  {
    name: "Blender",
    icon: "https://dummyimage.com/64x64/0da6f2/0b1015&text=B",
  },
  {
    name: "Unity",
    icon: "https://dummyimage.com/64x64/0da6f2/0b1015&text=U",
  },
  {
    name: "Unreal",
    icon: "https://dummyimage.com/64x64/0da6f2/0b1015&text=UE",
  },
  {
    name: "C#",
    icon: "https://dummyimage.com/64x64/0da6f2/0b1015&text=C%23",
  },
  {
    name: "Jira",
    icon: "https://dummyimage.com/64x64/0da6f2/0b1015&text=J",
  },
  {
    name: "Git",
    icon: "https://dummyimage.com/64x64/0da6f2/0b1015&text=G",
  },
];

const escapeAttr = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const createToolItemMarkup = (tool = {}) => {
  const {
    name = "Tool",
    icon = "https://dummyimage.com/64x64/0da6f2/0b1015&text=?",
  } = tool;
  const safeName = escapeAttr(name);

  return `
    <span class="tools-marquee__item">
      <span class="tools-marquee__icon" aria-hidden="true">
        <img src="${escapeAttr(
          icon,
        )}" alt="" loading="lazy" decoding="async" />
      </span>
      <span>${safeName}</span>
    </span>
  `;
};

const createProjectCardMarkup = (project = {}) => {
  const {
    title = "Untitled Project",
    titleClasses =
      "text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors",
    description = "",
    descriptionClasses = "text-slate-400 text-sm mb-4 line-clamp-2",
    tags = [],
    category = "",
    image = "",
    imageAlt = title,
    imageFilters = "grayscale group-hover:grayscale-0",
    videoPoster = image,
    video = "",
    link = "#",
    ariaLabel: aria = title,
    cardClasses = "",
    bodyClasses = "",
    icon = "",
    iconClasses =
      "material-symbols-outlined text-4xl text-white/40 mb-2 block group-hover:text-primary",
  } = project;

  const badgeMarkup = category
    ? `<div class="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-primary border border-primary/30">${category}</div>`
    : "";

  const iconMarkup = icon
    ? `<span class="${iconClasses}">${icon}</span>`
    : "";

  const tagsMarkup =
    tags.length > 0
      ? `<div class="flex flex-wrap gap-2">${tags
          .map(
            (tag) =>
              `<span class="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300 uppercase tracking-wider">${tag}</span>`,
          )
          .join("")}</div>`
      : "";

  return `
    <article
      class="project-card group relative rounded-xl overflow-hidden glass-panel hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 neon-glow gsap-hidden ${cardClasses}"
      data-project-link="${escapeAttr(link)}"
      data-project-video="${escapeAttr(video)}"
      role="link"
      tabindex="0"
      aria-label="${escapeAttr(aria)}"
    >
      <div class="relative aspect-video overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <video
          class="project-card__video absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          data-project-video-element
          muted
          loop
          playsinline
          preload="none"
          poster="${escapeAttr(videoPoster || image)}"
          aria-hidden="true"
        ></video>
        <img
          alt="${escapeAttr(imageAlt)}"
          class="project-card__image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageFilters}"
          src="${escapeAttr(image)}"
        />
        ${badgeMarkup}
      </div>
      <div class="p-6 relative z-20 ${bodyClasses}">
        ${iconMarkup}
        <h3 class="${titleClasses}">${title}</h3>
        <p class="${descriptionClasses}">${description}</p>
        ${tagsMarkup}
      </div>
    </article>
  `;
};

const renderToolsMarquee = () => {
  const marqueeTrack = document.querySelector("[data-tools-track]");
  if (!marqueeTrack || !Array.isArray(toolsData) || !toolsData.length) {
    return;
  }

  const itemsMarkup = toolsData
    .map((tool) => createToolItemMarkup(tool))
    .join("");

  marqueeTrack.innerHTML = itemsMarkup + itemsMarkup;
};

const projectsGrid = document.getElementById("projects-grid");
if (projectsGrid && Array.isArray(projectsData)) {
  projectsGrid.innerHTML = projectsData
    .map((project) => createProjectCardMarkup(project))
    .join("");
}

renderToolsMarquee();

// Interactive media states for project cards
const setupProjectMediaCards = () => {
  const interactiveProjectCards = document.querySelectorAll(
    ".project-card[data-project-link]",
  );

  interactiveProjectCards.forEach((card) => {
    const videoEl = card.querySelector("[data-project-video-element]");
    const videoSrc = card.getAttribute("data-project-video");
    const projectLink = card.getAttribute("data-project-link");

    const ensureVideoSource = () => {
      if (videoEl && videoSrc && !videoEl.getAttribute("src")) {
        videoEl.setAttribute("src", videoSrc);
        videoEl.load();
      }
    };

    const handleEnter = () => {
      card.classList.add("is-hovered");
      if (videoEl) {
        ensureVideoSource();
        videoEl.play().catch(() => {});
      }
    };

    const handleLeave = () => {
      card.classList.remove("is-hovered");
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);
    card.addEventListener("focusin", handleEnter);
    card.addEventListener("focusout", handleLeave);

    card.addEventListener("click", () => {
      if (projectLink) {
        window.open(projectLink, "_blank", "noopener");
      }
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });
};

setupProjectMediaCards();

// GSAP Animations - Hero Section
const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

heroTl
  .from(".hero-badge", { opacity: 0, y: -20, duration: 0.6 })
  .from(
    ".hero-title",
    { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)" },
    "-=0.3",
  )
  .from(".hero-desc", { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
  .from(".hero-buttons", { opacity: 0, y: 30, duration: 0.8 }, "-=0.5");

// Scroll-triggered animations for project cards
gsap.utils.toArray(".project-card").forEach((card, i) => {
  const fromX = i % 2 === 0 ? -180 : 180;
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    x: fromX,
    duration: 0.1 + i * 0.2,
    delay: i * 0.15,
    ease: "power2.out",
  });
});

// Stats cards animation
gsap.utils.toArray(".stats-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    x: i % 2 === 0 ? -50 : 50,
    duration: 0.8,
    ease: "power2.out",
  });
});

// Skill bars animation
const skillBars = document.querySelectorAll(".skill-bar");
skillBars.forEach((bar, index) => {
  const progress = bar.querySelector(".skill-progress");
  const percentages = [95, 90, 85];

  gsap.to(progress, {
    scrollTrigger: {
      trigger: bar,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    width: percentages[index] + "%",
    duration: 1.5,
    ease: "power2.out",
  });
});

// Section headers animation
gsap.utils.toArray(".section-header").forEach((header) => {
  gsap.from(header, {
    scrollTrigger: {
      trigger: header,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    x: -30,
    duration: 0.8,
    ease: "power2.out",
  });
});

// Smooth scroll for explore button
const exploreBtn = document.querySelector(".explore-btn");
if (exploreBtn) {
  exploreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  });
}