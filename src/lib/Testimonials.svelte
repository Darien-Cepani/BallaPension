<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { theme } from './stores/themeStore'; // Assuming theme store path

  let sectionContainer;
  let titleBlock;
  let testimonialElements = []; // Use array for multiple elements

  // Sample Testimonial Data
  const testimonials = [
    {
      id: 1,
      name: 'Client A',
      quote: 'Fantastic service! They helped me navigate the complex pension process with ease and got me a great result.',
      image: '/images/avatar1.jpg', // Placeholder path
      role: 'Client',
      location: 'Greece',
    },
    {
      id: 2,
      name: 'Client B',
      quote: 'Highly recommended. Professional, efficient, and always kept me informed. Made a stressful situation much easier.',
      image: '/images/avatar2.jpg', // Placeholder path
      role: 'Client',
      location: 'Greece',
    },
    {
      id: 3,
      name: 'Client C',
      quote: 'I was unsure about my pension rights, but BallaPension clarified everything and fought for my claim successfully.',
      image: '/images/avatar3.jpg', // Placeholder path
      role: 'Client',
      location: 'Greece',
    },
    {
      id: 4,
      name: 'Client D',
      quote: 'Excellent communication and expertise. Very happy with the outcome.',
      image: '/images/avatar4.jpg', // Placeholder path
      role: 'Client',
      location: 'Greece',
    },
    {
      id: 5,
      name: 'Client E',
      quote: 'Professional team that delivered on their promises. Thank you!',
      image: '/images/avatar5.jpg', // Placeholder path
      role: 'Client',
      location: 'Greece',
    },
    {
      id: 6,
      name: 'Client F',
      quote: 'They took the weight off my shoulders and handled everything perfectly.',
      image: '/images/avatar6.jpg', // Placeholder path
      role: 'Client',
      location: 'Greece',
    },
  ];

  // Theme-based blob colors
  let blobColor1, blobColor2, blobColor3;
  $: {
    if ($theme === 'dark') {
      blobColor1 = 'rgba(79, 70, 229, 0.2)'; // Indigo dark
      blobColor2 = 'rgba(37, 99, 235, 0.15)'; // Blue dark
      blobColor3 = 'rgba(139, 92, 246, 0.1)'; // Violet dark
    } else {
      blobColor1 = 'rgba(165, 180, 252, 0.6)'; // Indigo light
      blobColor2 = 'rgba(147, 197, 253, 0.5)'; // Blue light
      blobColor3 = 'rgba(196, 181, 253, 0.45)'; // Violet light
    }
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

    // Set initial state for testimonials
    gsap.set(testimonialElements, { opacity: 0, y: 30 });
    // Animate testimonials TO visible state with stagger
    gsap.to(testimonialElements, {
      scrollTrigger: {
        trigger: sectionContainer,
        start: 'top 60%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.2,
    });
  });
</script>

<div id="testimonials" bind:this={sectionContainer} class="relative isolate overflow-hidden bg-gray-50 dark:bg-gray-950 py-24 sm:py-32">
  <!-- Animated Blob Background -->
  <div aria-hidden="true" class="absolute inset-0 -z-10">
    <div
      style="background-color: {blobColor1};"
      class="blob blob1 w-[40rem] h-[40rem] md:w-[60rem] md:h-[60rem]"
    ></div>
    <div
      style="background-color: {blobColor2};"
      class="blob blob2 w-[30rem] h-[30rem] md:w-[50rem] md:h-[50rem]"
    ></div>
    <div
      style="background-color: {blobColor3};"
      class="blob blob3 w-[50rem] h-[50rem] md:w-[70rem] md:h-[70rem]"
    ></div>
  </div>

  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <!-- Section Header -->
    <div bind:this={titleBlock} class="mx-auto max-w-xl text-center mb-16 sm:mb-20">
      <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600 dark:text-indigo-400">
        Testimonials
      </h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white font-heading sm:text-4xl">
        What Our Clients Say
      </p>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Hear from our satisfied clients who have successfully navigated their pension claims with our expert guidance and support.
      </p>
    </div>

    <!-- Randomized Testimonial Layout (Masonry-like) -->
    <div class="columns-1 gap-8 md:columns-2 lg:columns-3">
      {#each testimonials as testimonial, i (testimonial.id)}
        <div bind:this={testimonialElements[i]} class="testimonial-card mb-8 break-inside-avoid rounded-xl bg-white/60 dark:bg-gray-800/60 p-6 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
          <div class="flex items-center gap-x-4 mb-4">
            <img class="h-12 w-12 rounded-full bg-gray-50 dark:bg-gray-700 object-cover" src={testimonial.image} alt="{testimonial.name}" />
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
              <!-- Optional: Add role or location -->
              <div class="text-gray-600 dark:text-gray-400">{testimonial.role}/{testimonial.location}</div>
            </div>
          </div>
          <blockquote class="text-gray-700 dark:text-gray-300 italic">
            <p>"{testimonial.quote}"</p>
          </blockquote>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  /* Blob Animation */
  @keyframes moveBlob {
    0% { transform: translate(0, 0) scale(1); }
    20% { transform: translate(calc(30px * var(--random-factor, 1)), calc(-50px * var(--random-factor, 1))) scale(1.1); }
    40% { transform: translate(calc(-60px * var(--random-factor, 1)), calc(20px * var(--random-factor, 1))) scale(0.9); }
    60% { transform: translate(calc(40px * var(--random-factor, 1)), calc(70px * var(--random-factor, 1))) scale(1.2); }
    80% { transform: translate(calc(-20px * var(--random-factor, 1)), calc(-30px * var(--random-factor, 1))) scale(0.95); }
    100% { transform: translate(0, 0) scale(1); }
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px); /* Adjust blur intensity */
    opacity: 0.8; /* Adjust opacity */
    will-change: transform;
    /* Colors are set via inline style */
  }

  .blob1 {
    top: -10%;
    left: -15%;
    animation: moveBlob 15s infinite alternate ease-in-out;
  }
  .blob2 {
    bottom: -5%;
    right: -10%;
    animation: moveBlob 10s infinite alternate-reverse ease-in-out;
  }
  .blob3 {
    bottom: 20%;
    left: 10%;
    animation: moveBlob 5s infinite alternate ease-in-out;
  }

  /* Testimonial Card Idle Animation */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  .testimonial-card {
    animation: float 6s ease-in-out infinite;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover */
    position: relative; /* Needed for pseudo-element positioning */
    overflow: hidden; /* Contain the shine pseudo-element */
  }

  /* Stagger animation delay for cards */
  .testimonial-card:nth-child(3n+1) {
    animation-delay: 0s;
  }
  .testimonial-card:nth-child(3n+2) {
    animation-delay: -2s; /* Start partway through */
  }
  .testimonial-card:nth-child(3n+3) {
    animation-delay: -4s; /* Start further through */
  }

  /* Card hover effect */
  .testimonial-card:hover {
    cursor: pointer;
    z-index: 10; /* Ensure hovered card appears above others */
    animation-play-state: paused; /* Pause float animation on hover */
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    transition: all 350ms ease-in-out;
  }

  /* Shine Effect */
  .testimonial-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -75%; /* Start off-screen */
    width: 50%;
    height: 100%;
    background: linear-gradient(
      110deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.2) 50%, /* Light mode shine */
      rgba(255, 255, 255, 0) 60%
    );
    transform: skewX(-25deg);
    z-index: 1; /* Above card bg, below content */
  }

  /* svelte-ignore css-unused-selector */
  .dark .testimonial-card::before {
    background: linear-gradient(
      110deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%, /* Dark mode shine (more subtle) */
      rgba(255, 255, 255, 0) 60%
    );
  }

  .testimonial-card:hover::before {
    animation: shineAnimation 0.65s ease-in-out 1 forwards;
  }

  /* Keyframes for the shine animation */
  @keyframes shineAnimation {
    from {
      left: -75%;
    }
    to {
      left: 125%;
    }
  }

</style>
