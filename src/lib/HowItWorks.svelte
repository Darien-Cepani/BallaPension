<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { theme } from './stores/themeStore'; // Import theme store

  gsap.registerPlugin(ScrollTrigger);
  let titleBlock;

  const steps = [
    {
      id: 1,
      icon: 'fas fa-phone-alt',
      title: 'Initial Contact',
      description: 'Reach out via phone or our contact form. We\'ll discuss your situation in a free initial consultation.',
      alignment: 'right' 
    },
    {
      id: 2,
      icon: 'fas fa-file-alt',
      title: 'Document Assessment',
      description: 'We gather all necessary documents and information to assess the specifics of your pension claim.',
      alignment: 'left' 
    },
    {
      id: 3,
      icon: 'fas fa-cogs',
      title: 'Claim Processing',
      description: 'Our experts handle the complexities of submitting and processing your claim with the relevant authorities.',
      alignment: 'right'
    },
    {
      id: 4,
      icon: 'fas fa-check-circle',
      title: 'Resolution & Payout',
      description: 'We work towards a successful resolution and ensure you receive the maximum payout you are entitled to.',
      alignment: 'left'
    }
  ];

  let roadmapContainer;
  let timelineLine;
  let stepElements = [];
  let lastScrollY = 0;
  let scrollDirection = 'down'; // Initial direction

  function handleScroll() {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    // Update attribute on container for CSS targeting
    if (roadmapContainer) {
      roadmapContainer.dataset.scrollDirection = scrollDirection;
    }
    lastScrollY = Math.max(0, currentScrollY); // Prevent negative scroll on bounce
  }

  onMount(() => {
    // Set initial state for title block
    gsap.set(titleBlock, { opacity: 0, y: 50 });
    // Animate title block TO visible state
    gsap.to(titleBlock, {
      scrollTrigger: {
        trigger: titleBlock,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    lastScrollY = window.scrollY;
    if (roadmapContainer) {
      roadmapContainer.dataset.scrollDirection = scrollDirection;
    }
    
    // Ensure ScrollTrigger recalculates on resize for responsiveness
    ScrollTrigger.defaults({invalidateOnRefresh: true});

    // Initial animation setup
    gsap.set(timelineLine, { scaleY: 0, transformOrigin: 'top center' });
    stepElements.forEach(step => gsap.set(step, { opacity: 0, y: 30 })); 

    // Timeline animation for the line
    gsap.to(timelineLine, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: roadmapContainer,
        start: 'top center+=150', 
        end: 'bottom center-=150', 
        scrub: true,
      }
    });

    // Animations for each step container
    stepElements.forEach((stepEl, index) => {
      gsap.to(stepEl, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: stepEl,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf([timelineLine, ...stepElements]);
    };
  });

</script>

<svelte:window on:scroll={handleScroll}/>

<!-- Updated main container with dynamic style for grid color -->
<div 
  bind:this={roadmapContainer} 
  id="how-it-works" 
  class="relative isolate overflow-hidden bg-gray-50 dark:bg-gray-900/95 py-24 sm:py-32 animated-grid-bg"
  style="--grid-line-color: {$theme === 'dark' ? 'var(--grid-line-dark)' : 'var(--grid-line-light)'};"
>
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div bind:this={titleBlock} class="mx-auto max-w-xl mb-16 sm:mb-20 text-center">
      <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600 dark:text-indigo-400">The Process</h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white font-heading sm:text-4xl">How it works.</p>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Our process is simple, transparent, and efficient.
      </p>
    </div>

    <!-- Roadmap Timeline -->
    <div class="relative max-w-md mx-auto md:max-w-3xl">
      <!-- The Vertical Line (Centered on desktop, offset slightly left on mobile)--->
      <div 
        bind:this={timelineLine} 
        class="absolute top-0 bottom-0 w-1 md:w-1.5 bg-indigo-200 dark:bg-indigo-800/70 left-4 md:left-1/2 md:-translate-x-1/2"
        style="transform-origin: top center;"
      ></div>

      <!-- Steps Container -->
      <div class="relative flex flex-col items-start space-y-12 md:space-y-0">
        {#each steps as step, i (step.id)}
          <div 
            bind:this={stepElements[i]} 
            class="relative w-full flex items-start md:items-center opacity-0 pl-12 md:pl-0 md:py-8" 
          >

            <!-- Mobile Layout -->
            <div class="block md:hidden w-full">
              <!-- Added step-content-box class -->
              <div class="step-content-box relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </div>

            <!-- Desktop Layout Content Box -->
            <div 
              class="hidden md:block md:w-1/2 {step.alignment === 'left' ? 'md:pr-10' : 'md:pl-10'}" 
              class:md:order-1={step.alignment === 'left'}
              class:md:order-3={step.alignment === 'right'}
             >
              <!-- Added step-content-box class -->
              <div class="step-content-box relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <!-- Desktop Arrow Pointer -->
                <div 
                  class={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-gray-500 dark:border-gray-500 transform rotate-45 
                         ${step.alignment === 'left' ? 'right-0 -translate-x-1/2 border-r border-t' : ''} 
                         ${step.alignment === 'right' ? 'left-0 translate-x-1/2 border-l border-b' : ''}`}
                ></div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </div>

            <!-- Node (Positioned absolute relative to the step container) -->
             <div 
              class={`absolute top-1 md:top-1/2 left-4 md:left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 md:order-2`} 
            >
              <div class="flex items-center justify-center w-8 h-8 md:w-14 md:h-14 rounded-full bg-indigo-500 dark:bg-indigo-600 text-white shadow-lg ring-2 md:ring-4 ring-gray-50 dark:ring-gray-900/95">
                <i class="{step.icon} text-sm md:text-xl"></i>
              </div>
            </div>
            
            <!-- Desktop Spacer Div -->
            <div 
              class="hidden md:block md:w-1/2 {step.alignment === 'left' ? 'md:pl-8' : 'md:pr-8'}" 
              class:md:order-3={step.alignment === 'left'}
              class:md:order-1={step.alignment === 'right'}
            ></div>

          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  /* Animated Grid Background */
  @keyframes moveGridDown {
    from { background-position: 0 0; }
    to { background-position: 0 100px; } /* Adjust distance for speed */
  }

  @keyframes moveGridUp {
    from { background-position: 0 0; }
    to { background-position: 0 -100px; } /* Adjust distance for speed */
  }

  .animated-grid-bg {
    --grid-line-light: rgba(229, 231, 235, 0.8); /* Define light color */
    --grid-line-dark: rgba(55, 65, 81, 0.4);   /* Define dark color (5% opacity) */
    --grid-size: 50px; /* Size of the grid squares */

    background-image: 
      linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px);
    background-size: var(--grid-size) var(--grid-size);
    animation: moveGridDown 4s linear infinite; /* Default animation */
  }

  /* Apply animation based on scroll direction */
  :global(.animated-grid-bg[data-scroll-direction="down"]) {
    animation-name: moveGridDown;
  }

  :global(.animated-grid-bg[data-scroll-direction="up"]) {
    animation-name: moveGridUp;
  }

  /* Hover Shine Effect */
  .step-content-box {
    position: relative;
    overflow: hidden; /* Keep the shine contained */
  }

  .step-content-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%; 
    width: 75%; /* Width of the shine */
    height: 100%;
    background: linear-gradient(
      110deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.2) 50%, 
      rgba(255, 255, 255, 0) 60%
    );
    transform: skewX(-25deg); /* Angle the shine */
    transition: left 0.6s ease-in-out;
    z-index: 1; /* Ensure it's above the content bg but below text */
  }

  .dark .step-content-box::before {
     background: linear-gradient(
      110deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.08) 50%, /* More subtle shine for dark mode */
      rgba(255, 255, 255, 0) 60%
    );
  }

  .step-content-box:hover::before {
    left: 125%; /* Move shine across and off */
  }

</style>
