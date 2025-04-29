<script>
  import { onMount, onDestroy, tick } from 'svelte'; 
  import { slide } from 'svelte/transition'; 
  import gsap from 'gsap';
  import ThemeToggle from '../components/ThemeToggle.svelte';

  // Refs for animation
  let headerElement;
  let logo;
  let navLinks = []; 
  let callButton;
  let getHelpButton;
  let themeToggle;
  let mobileMenuButton;
  let mobileMenuPanel; 

  // Reactive state for scroll effect
  let scrolledDown = false;
  // Reactive state for mobile menu
  let mobileMenuOpen = false;

  // Scroll handler function
  const handleScroll = () => {
    const currentlyScrolled = window.scrollY > 10;
    if (currentlyScrolled !== scrolledDown) {
      scrolledDown = currentlyScrolled;
    }
    // Close mobile menu on scroll
    if (mobileMenuOpen) {
      mobileMenuOpen = false;
    }
  };

  // Click outside handler
  const handleClickOutside = (event) => {
    if (
      mobileMenuOpen &&
      mobileMenuPanel &&
      !mobileMenuPanel.contains(event.target) &&
      mobileMenuButton &&
      !mobileMenuButton.contains(event.target)
    ) {
      mobileMenuOpen = false;
    }
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    mobileMenuOpen = false;
  };

  // Lock body scroll when mobile menu is open
  $: if (typeof document !== 'undefined') {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      tick().then(() => {
          document.body.style.overflow = '';
      });
    }
  }

  onMount(() => {
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true }); 
    window.addEventListener('click', handleClickOutside);
    handleScroll(); // Initial check

    // GSAP Animations
    const elementsToAnimate = [logo, ...navLinks, callButton, getHelpButton, themeToggle, mobileMenuButton];
    gsap.set(elementsToAnimate, { opacity: 0, y: -20 });
    gsap.to(elementsToAnimate, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.3, 
    });

    // CTA Pulse Animation
    gsap.to('.cta-pulse', {
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    console.log('Header mounted, animations initialized.');

    return () => {
      // Kill GSAP animations
      gsap.killTweensOf([logo, ...navLinks, callButton, getHelpButton, themeToggle, mobileMenuButton, '.cta-pulse']);
      console.log('Header unmounted, animations killed.');
      
      // Remove scroll listener
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClickOutside);

      // Ensure body scroll is restored on unmount
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  });

</script>

<header bind:this={headerElement}
  class="fixed top-4 left-4 right-4 z-50 transition-all duration-300 ease-in-out"
>
  <nav 
    class:shadow-lg={scrolledDown}
    class:backdrop-blur-sm={scrolledDown}
    class="mx-auto max-w-5xl rounded-full flex items-center justify-between p-3 px-6 transition-all duration-300 ease-in-out 
           {scrolledDown 
             ? 'border border-gray-200/70 dark:border-gray-700/70 bg-white/80 dark:bg-gray-800/80' 
             : 'border border-transparent bg-transparent'}"
    aria-label="Global"
  >
    <div class="flex lg:flex-1">
      <!-- Logo section -->
      <a bind:this={logo} href="/" class="-m-1.5 p-1.5 flex flex-row items-center gap-x-2 opacity-0">
        <span class="sr-only">BallaPension</span>
        <img class:invert={!scrolledDown} class="h-8 w-auto dark:invert" src="branding/logo.png" alt="BallaPension Logo">
        <h2 class="font-bold text-xl transition-colors duration-300 ease-in-out" 
            class:text-white={!scrolledDown} 
            class:text-black={scrolledDown}
            class:dark:text-white={scrolledDown} >BallaPension</h2>
      </a>
    </div>
    <!-- Desktop Navigation (hidden on small screens) -->
    <div class="hidden md:flex md:gap-x-4 lg:gap-x-4 items-center">
      <a bind:this={navLinks[0]} href="#how-it-works" on:click={closeMobileMenu} class="text-sm font-semibold leading-6 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 py-2 px-4 rounded-full transition-colors duration-200 ease-in-out opacity-0"
         class:text-white={!scrolledDown}
         class:text-gray-900={scrolledDown}
         class:dark:text-white={scrolledDown}>How it Works</a>
      <a bind:this={navLinks[1]} href="#testimonials" on:click={closeMobileMenu} class="text-sm font-semibold leading-6 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 py-2 px-4 rounded-full transition-colors duration-200 ease-in-out opacity-0"
         class:text-white={!scrolledDown}
         class:text-gray-900={scrolledDown}
         class:dark:text-white={scrolledDown}>Testimonials</a>
      <a bind:this={navLinks[2]} href="#contact" on:click={closeMobileMenu} class="text-sm font-semibold leading-6 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 py-2 px-4 rounded-full transition-colors duration-200 ease-in-out opacity-0"
         class:text-white={!scrolledDown}
         class:text-gray-900={scrolledDown}
         class:dark:text-white={scrolledDown}>Contact</a>
    </div>
    <!-- Right-side Actions (Visible on all sizes, adjusted layout for mobile) -->
    <div class="flex lg:flex-1 justify-end items-center gap-x-2 sm:gap-x-4">
      <a bind:this={getHelpButton} href="#contact" on:click={closeMobileMenu} class="hidden md:inline-flex cta-pulse rounded-full bg-indigo-600 px-3 sm:px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-400 transition-colors duration-200 ease-in-out opacity-0">Claim your Pension</a>
      <div bind:this={themeToggle} class="opacity-0">
        <ThemeToggle />
      </div>
      <!-- Mobile menu button container (hidden on medium screens and up) -->
    <div class="flex md:hidden">
      <button 
        bind:this={mobileMenuButton} 
        on:click|stopPropagation={() => mobileMenuOpen = !mobileMenuOpen}
        type="button" 
        class="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200 ease-in-out"
        class:text-white={!scrolledDown}
        class:text-gray-700={scrolledDown}
        class:dark:text-gray-200={scrolledDown}
        aria-label="Open main menu"
        aria-expanded={mobileMenuOpen}
      >
        <span class="sr-only">Open main menu</span>
        <div class="relative h-6 w-6">
          <i class="fas fa-times text-2xl absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out"
             class:opacity-100={mobileMenuOpen}
             class:opacity-0={!mobileMenuOpen}></i>
          <i class="fas fa-bars text-2xl absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out"
             class:opacity-0={mobileMenuOpen}
             class:opacity-100={!mobileMenuOpen}></i>
        </div>
      </button>
    </div>
    </div>
  </nav>

  <!-- Mobile Menu Panel (hidden on medium screens and up) -->
  {#if mobileMenuOpen}
    <div 
      bind:this={mobileMenuPanel}
      transition:slide={{ duration: 300, axis: 'y' }}
      class="md:hidden absolute left-0 right-0 top-full mt-2 z-40 p-4 
             bg-white dark:bg-gray-800 
             shadow-xl backdrop-blur-sm 
             border border-gray-200/50 dark:border-gray-700/50 
             rounded-xl"
      aria-modal="true"
      role="dialog"
    >
      <div class="space-y-2">
        <a href="#how-it-works" on:click={closeMobileMenu} class="block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">How it Works</a>
        <a href="#testimonials" on:click={closeMobileMenu} class="block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Testimonials</a>
        <a href="#contact" on:click={closeMobileMenu} class="block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
        <hr class="border-gray-200 dark:border-gray-700 my-2" />
        <a href="tel:+302310265915" on:click={closeMobileMenu} class="block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-green-700 dark:text-green-500"><i class="fas fa-phone mr-1" aria-hidden="true"></i>Call Us</a>
        <a href="#contact" on:click={closeMobileMenu} class="block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800"><i class="fas fa-envelope mr-1" aria-hidden="true"></i>Get Help Now</a>
      </div>
    </div>
  {/if}
</header>

<style>
/* Add component-specific styles here if needed, but prefer Tailwind */
</style>
