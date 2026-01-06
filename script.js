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
    title: "Ancient Temple",
    ariaLabel: "Ancient Temple",
    image: "/assets/images/project-1.png",
    video:
      "/assets/videos/project-1.mp4",
    link:
      "https://youtu.be/n1VVPK23PWw?si=xHu1tHKtSbB1ePGM",
  },
  {
    title: "Medieval Village- Ashes of Fallen game Environment",
    ariaLabel: "Medieval Village- Ashes of Fallen game Environment",
    image: "/assets/images/project-2.png",
    video:
      "/assets/videos/project-2.mp4",
    link: "https://youtu.be/CHX4JLrajCU?si=UvrWpB0q_RFC5JTO",
  },
  {
    title: "Christmas SnowFall - A Snowy Environment",
    ariaLabel: "Christmas SnowFall - A Snowy Environment",
    image: "/assets/images/project-3.png",
    video:
      "/assets/videos/project-3.mp4",
    link: "https://youtu.be/ckP_g9qeVlc?si=DpVL-rTDK5jVI1sW",
  },
];

const toolsData = [
  { name: "Unreal Engine 5" },
  { name: "AutodeskMaya" },
  { name: "Adobe Substance Painter" },
  { name: "Premiere Pro" }, 
  { name: "Blender" },
  { name: "Adobe Photoshop" },
  { name: "Adobe Illustrator" },
  { name: "Speed Tree" },
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
  } = tool;
  const safeName = escapeAttr(name);

  return `
    <li class="before:content-['▹'] before:text-yellow-500 before:text-xl flex items-center gap-1">
      ${safeName}
    </li>
  `;
};

const createProjectCardMarkup = (project = {}) => {
  const {
    title = "Untitled Project",
    titleClasses = "text-lg font-semibold text-white",
    image = "",
    imageAlt = title,
    videoPoster = image,
    poster: customPoster = "",
    video = "",
    link = "#",
    ariaLabel: aria = title,
    cardClasses = "",
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
        class="project-card__image w-full h-full object-cover"
        src="${escapeAttr(posterSource)}"
        loading="lazy"
        decoding="async"
      />`
    : "";

  return `
    <article
      class="project-card group relative bg-transparent rounded-2xl gsap-hidden ${cardClasses}"
      data-project-link="${escapeAttr(normalizedLink)}"
      data-project-media="${mediaType}"
      data-project-video="${escapeAttr(mediaType === "youtube" ? "" : video)}"
      data-project-youtube-id="${escapeAttr(youtubeId)}"
      role="link"
      tabindex="0"
      aria-label="${escapeAttr(aria)}"
    >
      <div class="project-card__frame neon-glow relative aspect-video overflow-hidden">
        ${mediaType === "youtube"
      ? `<div class="project-card__youtube" data-project-youtube-frame data-video-id="${escapeAttr(
        youtubeId,
      )}"></div>`
      : `<video
          class="project-card__video"
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
        <div class="project-card__title-panel">
          <h3 class="project-card__title ${titleClasses}">${title}</h3>
        </div>
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

  marqueeTrack.innerHTML = itemsMarkup;
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

  const canTiltCards =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    const tiltTarget = card.querySelector(".project-card__frame");

    if (!tiltTarget) {
      return;
    }

    let tiltFrameId = null;

    const resetTilt = () => {
      if (tiltFrameId) {
        cancelAnimationFrame(tiltFrameId);
        tiltFrameId = null;
      }
      tiltTarget.style.setProperty("--tilt-x", "0deg");
      tiltTarget.style.setProperty("--tilt-y", "0deg");
    };

    const handleTiltMove = (event) => {
      if (!canTiltCards) {
        return;
      }

      const clientX =
        event.clientX ?? event.touches?.[0]?.clientX ?? event.changedTouches?.[0]?.clientX;
      const clientY =
        event.clientY ?? event.touches?.[0]?.clientY ?? event.changedTouches?.[0]?.clientY;

      if (typeof clientX !== "number" || typeof clientY !== "number") {
        return;
      }

      if (tiltFrameId) {
        cancelAnimationFrame(tiltFrameId);
      }

      tiltFrameId = requestAnimationFrame(() => {
        const rect = tiltTarget.getBoundingClientRect();
        if (!rect.width || !rect.height) {
          return;
        }

        const percentX = (clientX - rect.left) / rect.width;
        const percentY = (clientY - rect.top) / rect.height;
        const clampedX = Math.min(Math.max(percentX, 0), 1);
        const clampedY = Math.min(Math.max(percentY, 0), 1);
        const maxTilt = 14;
        const tiltX = (0.5 - clampedY) * (maxTilt * 2);
        const tiltY = (clampedX - 0.5) * (maxTilt * 2);

        tiltTarget.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        tiltTarget.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      });
    };

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
      resetTilt();
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);
    card.addEventListener("focusin", handleEnter);
    card.addEventListener("focusout", handleLeave);

    if (canTiltCards) {
      card.addEventListener("mousemove", handleTiltMove);
    }

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