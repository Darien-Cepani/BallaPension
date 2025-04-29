<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  // Refs for animation
  let sectionContainer;
  let videoBackground;
  let headline;
  let paragraph;
  let ctaButton;
  let learnMoreLink;

  onMount(() => {
    // Initial animation setup
    // Set initial state via GSAP (more reliable than just class)
    gsap.set([headline, paragraph, ctaButton, learnMoreLink], { opacity: 0, y: 30, scale: 0.95 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    tl.to(headline, { opacity: 1, y: 0, scale: 1, delay: 0.2 })
      .to(paragraph, { opacity: 1, y: 0, scale: 1 }, '-=0.6') // Start slightly after headline
      .to([ctaButton, learnMoreLink], { opacity: 1, y: 0, scale: 1, stagger: 0.2 }, '-=0.6'); // Animate buttons together

    // Optional: Add cleanup if needed, though GSAP often handles this well for simple tweens
    return () => {
      tl.kill(); // Kill the timeline on component unmount
    };
  });

</script>

<div bind:this={sectionContainer} class="relative isolate overflow-hidden h-screen flex items-center justify-center">
  <!-- Video Background -->
  <video
    bind:this={videoBackground}
    src="/videos/Herobg.mp4"
    autoplay
    loop
    muted
    playsinline
    class="absolute top-0 left-0 w-full h-full object-cover z-0"
  ></video>

  <!-- Overlay -->
  <div class="absolute top-0 left-0 w-full h-full bg-black/40 dark:bg-black/60 z-10"></div>

  <!-- Content -->
  <div class="relative z-20 mx-auto max-w-2xl text-center px-4">
    <h1 bind:this={headline} class="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading opacity-0 [text-shadow:_2px_2px_8px_rgb(0_0_0_/_50%)]">
      Secure Your Retirement with Confidence
    </h1>
    <p bind:this={paragraph} class="mt-6 text-lg leading-8 text-gray-200 dark:text-gray-300 opacity-0 [text-shadow:_1px_1px_4px_rgb(0_0_0_/_40%)]">
      Navigating pension claims can be complex. We provide expert guidance and support to ensure you receive the benefits you deserve, quickly and easily.
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a
        bind:this={ctaButton}
        href="#contact"
        class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-colors duration-200 ease-in-out opacity-0"
        >Get Help Now</a
      >
      <a
        bind:this={learnMoreLink}
        href="#how-it-works"
        class="text-sm font-semibold leading-6 text-white hover:text-gray-300 transition-colors duration-200 ease-in-out opacity-0"
        >Learn more <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-y-1">↓</span></a
      >
    </div>
  </div>

</div>

<style>
  /* Ensure video covers the container */
  video {
    min-width: 100%;
    min-height: 100%;
  }
</style>
