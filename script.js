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
    image: "/assets/images/project-1.png",
    video:
      "/assets/videos/project-1.mp4",
    link:
      "https://youtu.be/n1VVPK23PWw?si=xHu1tHKtSbB1ePGM",
  },
  {
    title: "Project: AETHER_RPG",
    ariaLabel: "Open Project AETHER_RPG",
    description:
      "Complex inventory management system for an open-world RPG. Focused on drag-and-drop interactions and controller support.",
    tags: ["UX Research", "Unreal Engine 5"],
    category: "UX / SYSTEM",
    image: "/assets/images/project-2.png",
    video:
      "/assets/videos/project-2.mp4",
    link: "https://youtu.be/CHX4JLrajCU?si=UvrWpB0q_RFC5JTO",
  },
  {
    title: "Project: FRAG_STATS",
    ariaLabel: "Open Project FRAG_STATS",
    description:
      "Esports analytics dashboard for team managers. Visualizing complex kill/death ratios and heatmaps in real-time.",
    tags: ["React", "D3.js", "Tailwind"],
    category: "WEB / DATA",
    image: "/assets/images/project-3.png",
    video:
      "/assets/videos/project-3.mp4",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
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

const extractYouTubeId = (url = "") => {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return (parsed.pathname.replace(/^\/+/, "") || "").replace(
        /[^A-Za-z0-9_-]/g,
        "",
      );
    }

    const vParam = parsed.searchParams.get("v");
    if (vParam) {
      return vParam.replace(/[^A-Za-z0-9_-]/g, "");
    }

    const segments = parsed.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "";
    return lastSegment.replace(/[^A-Za-z0-9_-]/g, "");
  } catch (error) {
    return "";
  }
};

const getYouTubePoster = (videoId = "") =>
  videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";

const loadYouTubeAPI = (() => {
  let apiPromise;

  return () => {
    if (window.YT && window.YT.Player) {
      return Promise.resolve(window.YT);
    }

    if (!apiPromise) {
      apiPromise = new Promise((resolve) => {
        const previousHandler = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (typeof previousHandler === "function") {
            previousHandler();
          }
          resolve(window.YT);
        };

        const existingScript = document.querySelector(
          'script[src="https://www.youtube.com/iframe_api"]',
        );

        if (!existingScript) {
          const scriptTag = document.createElement("script");
          scriptTag.src = "https://www.youtube.com/iframe_api";
          scriptTag.async = true;
          document.head.appendChild(scriptTag);
        }
      });
    }

    return apiPromise;
  };
})();

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
    imageFilters = "group-hover:grayscale-0",
    videoPoster = image,
    poster: customPoster = "",
    video = "",
    link = "#",
    ariaLabel: aria = title,
    cardClasses = "",
    bodyClasses = "",
    icon = "",
    iconClasses =
    "material-symbols-outlined text-4xl text-white/40 mb-2 block group-hover:text-primary",
  } = project;
  const youtubeId = extractYouTubeId(video);
  const mediaType = youtubeId ? "youtube" : "html5";
  const posterSource =
    customPoster ||
    videoPoster ||
    image ||
    (youtubeId ? getYouTubePoster(youtubeId) : "");
  const normalizedLink = link || video || "#";
  const posterAttribute = posterSource
    ? `poster="${escapeAttr(posterSource)}"`
    : "";
  const imageMarkup = posterSource
    ? `<img
        alt="${escapeAttr(imageAlt)}"
        class="project-card__image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageFilters}"
        src="${escapeAttr(posterSource)}"
        loading="lazy"
        decoding="async"
      />`
    : "";

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
      data-project-link="${escapeAttr(normalizedLink)}"
      data-project-media="${mediaType}"
      data-project-video="${escapeAttr(mediaType === "youtube" ? "" : video)}"
      data-project-youtube-id="${escapeAttr(youtubeId)}"
      role="link"
      tabindex="0"
      aria-label="${escapeAttr(aria)}"
    >
      <div class="relative aspect-video overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        ${mediaType === "youtube"
      ? `<div class="project-card__youtube absolute inset-0" data-project-youtube-frame data-video-id="${escapeAttr(
        youtubeId,
      )}"></div>`
      : `<video
          class="project-card__video absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          data-project-video-element
          muted
          loop
          playsinline
          preload="metadata"
          ${posterAttribute}
          aria-hidden="true"
        ></video>`
    }
        ${imageMarkup}
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

  if (!interactiveProjectCards.length) {
    return;
  }

  const videoLoaders = new WeakMap();
  const youTubePlayers = new WeakMap();
  const youTubePlayerPromises = new WeakMap();
  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const loader = videoLoaders.get(entry.target);
            if (typeof loader === "function") {
              loader();
            }
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px 200px 0px" })
      : null;

  interactiveProjectCards.forEach((card) => {
    const videoEl = card.querySelector("[data-project-video-element]");
    const videoSrc = card.getAttribute("data-project-video");
    const projectLink = card.getAttribute("data-project-link");
    const mediaType = card.getAttribute("data-project-media") || "html5";
    const videoId = card.getAttribute("data-project-youtube-id");
    const youtubeFrameEl = card.querySelector("[data-project-youtube-frame]");

    const ensureYouTubePlayer = () => {
      if (mediaType !== "youtube" || !videoId || !youtubeFrameEl) {
        return Promise.resolve(null);
      }

      if (youTubePlayers.has(card)) {
        return Promise.resolve(youTubePlayers.get(card));
      }

      if (youTubePlayerPromises.has(card)) {
        return youTubePlayerPromises.get(card);
      }

      const playerPromise = loadYouTubeAPI().then(
        () =>
          new Promise((resolve) => {
            const player = new window.YT.Player(youtubeFrameEl, {
              videoId,
              playerVars: {
                autoplay: 0,
                controls: 0,
                rel: 0,
                mute: 1,
                playsinline: 1,
                modestbranding: 1,
                loop: 1,
                playlist: videoId,
              },
              events: {
                onReady: (event) => {
                  event.target.mute();
                  resolve(player);
                },
              },
            });
          }),
      );

      youTubePlayerPromises.set(card, playerPromise);
      playerPromise.then((player) => {
        if (player) {
          youTubePlayers.set(card, player);
        }
      });

      return playerPromise;
    };

    const ensureVideoSource = () => {
      if (mediaType === "youtube") {
        return ensureYouTubePlayer();
      }

      if (videoEl && videoSrc && !videoEl.getAttribute("src")) {
        videoEl.setAttribute("src", videoSrc);
        videoEl.load();
        videoEl.pause();
      }

      return Promise.resolve(videoEl);
    };

    videoLoaders.set(card, ensureVideoSource);
    if (observer && (videoSrc || mediaType === "youtube")) {
      observer.observe(card);
    } else {
      ensureVideoSource();
    }

    const handleEnter = () => {
      card.classList.add("is-hovered");
      if (mediaType === "youtube") {
        ensureVideoSource().then((player) => {
          if (player && typeof player.playVideo === "function") {
            try {
              player.playVideo();
            } catch (error) {
              /* noop */
            }
          }
        });
      } else if (videoEl) {
        ensureVideoSource().then(() => {
          videoEl.play().catch(() => { });
        });
      }
    };

    const handleLeave = () => {
      card.classList.remove("is-hovered");
      if (mediaType === "youtube") {
        const player = youTubePlayers.get(card);
        if (player && typeof player.pauseVideo === "function") {
          player.pauseVideo();
        }
      } else if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);
    card.addEventListener("focusin", handleEnter);
    card.addEventListener("focusout", handleLeave);

    card.addEventListener("click", () => {
      if (projectLink && projectLink !== "#") {
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
      start: "top 95%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    x: fromX,
    duration: i * 0.2,
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