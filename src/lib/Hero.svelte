<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  // Refs for animation
  let sectionContainer;
  let videoBackground;
  let headline;
  let paragraph;
  let ctaButton;
  let scrollIndicator;
  let scrollIndicatorText;

  // Store tweens for explicit cleanup
  let mainTimeline;
  let parallaxTween;
  let scrollIndicatorTween;

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  onMount(() => {
    // Initial animation setup
    gsap.set([headline, paragraph, ctaButton, scrollIndicator], { opacity: 0, y: 30, scale: 0.95 });

    mainTimeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    mainTimeline.to(headline, { opacity: 1, y: 0, scale: 1, delay: 0.2 })
      .to(paragraph, { opacity: 1, y: 0, scale: 1 }, '-=0.6')
      .to(ctaButton, { opacity: 1, y: 0, scale: 1, stagger: 0.2 }, '-=0.6')
      .to(scrollIndicator, { opacity: 1, y: 0, scale: 1 }, '-=0.4');

    // Parallax for video background
    if (videoBackground && sectionContainer) {
      parallaxTween = gsap.to(videoBackground, {
        yPercent: 25, // Moves video down by 25% of its height as section scrolls up, creating parallax
        ease: 'none',
        scrollTrigger: {
          trigger: sectionContainer, // The hero section itself
          start: 'top top',       // When the top of the hero hits the top of the viewport
          end: 'bottom top',    // When the bottom of the hero hits the top of the viewport
          scrub: true,          // Smoothly links animation to scroll
        }
      });
    }

    // Scroll indicator bounce animation
    if (scrollIndicator) {
      scrollIndicatorTween = gsap.to(scrollIndicator, {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 0.7
      });
    }

    // Add a slight delay for ScrollTrigger refresh to catch any final layout shifts
    gsap.delayedCall(0.1, () => ScrollTrigger.refresh());

    return () => {
      // Kill all stored tweens. GSAP automatically handles their associated ScrollTriggers.
      if (mainTimeline) mainTimeline.kill();
      if (parallaxTween) parallaxTween.kill();
      if (scrollIndicatorTween) scrollIndicatorTween.kill();
    };
  });

  function handleScrollDown() {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
</script>

<div bind:this={sectionContainer} class="relative isolate h-[calc(100vh-4rem)] flex items-center justify-center">
  <!-- Video Background -->
  <video
    bind:this={videoBackground}
    src="/videos/Herobg.webm"
    autoplay
    loop
    muted
    playsinline
    class="absolute top-0 left-0 w-full h-full object-cover [object-position:26%_0px] z-0 md:object-center"
  ></video>

  <!-- Overlay -->
  <div class="absolute top-0 left-0 w-full h-full bg-black/50 dark:bg-black/70 z-10"></div> <!-- Slightly increased overlay opacity -->

  <!-- Content -->
  <div class="mt-20 sm:mt-0 pl-15 sm:pl-0 pr-15 sm:pr-0 relative z-20 mx-auto max-w-2xl text-center px-4">
    <h1 bind:this={headline} class="text-3xl font-bold tracking-tight text-white sm:text-6xl font-heading opacity-0 [text-shadow:_3px_3px_10px_rgb(0_0_0_/_60%)]">
      <span class="block">Your pension.</span>
      <span class="block">Done right.</span>
      <span class="block">Zero stress.</span>
    </h1>
    <p bind:this={paragraph} class="mt-8 text-lg leading-8 sm:text-xl sm:leading-9 text-gray-100 dark:text-gray-200 opacity-0 [text-shadow:_1px_1px_6px_rgb(0_0_0_/_50%)]">
      We handle everything. You just call us.
    </p>
    <div class="mt-12 lg:mt-12 flex items-center justify-center gap-x-6"> 
      <a
        bind:this={ctaButton}
        href="tel:+302310265915"
        class="rounded-full bg-gradient-to-r from-green-500 to-green-700 px-8 py-2 text-lg font-semibold text-white shadow-lg hover:from-green-600 hover:to-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 transition-all duration-300 ease-in-out opacity-0 transform hover:scale-105 focus:scale-105"
        ><i class="fa-solid fa-phone mr-2"></i>Call us</a
      >
    </div>
  </div>

  <!-- Scroll Down Animation -->
  <div
    bind:this={scrollIndicator}
    on:click={handleScrollDown}
    on:keydown={(e) => e.key === 'Enter' && handleScrollDown()} 
    class="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 cursor-pointer p-2 opacity-0 flex flex-col items-center group" 
    role="button"
    tabindex="0"
    aria-label="Scroll down to next section"
  >
    <svg
      class="w-8 h-8 text-white filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] group-hover:text-green-300 transition-colors duration-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
    <span bind:this={scrollIndicatorText} class="mt-1 text-xs text-white filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] group-hover:text-green-300 transition-colors duration-200">
      Learn more
    </span>
  </div>
</div>

<style>
  /* Ensure video covers the container */
  video {
    min-width: 100%;
    min-height: 100%;
  }

  /* Adding focus styles for accessibility on the scroll indicator */
  [role="button"]:focus-visible {
    outline: 2px solid white; /* White outline for visibility on dark background */
    outline-offset: 3px;
    border-radius: 8px; /* Rounded focus indicator for the whole element */
  }
</style>
