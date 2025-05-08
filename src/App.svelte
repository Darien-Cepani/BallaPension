<script>
  // Register GSAP plugins immediately when the module loads
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

  import { onMount } from 'svelte';
  import { theme } from './lib/stores/themeStore'; // Import the theme store

  import Header from './lib/components/Header.svelte';
  import Hero from './lib/Hero.svelte';
  import WhyChooseUs from './lib/WhyChooseUs.svelte'; // Import the new component
  import HowItWorks from './lib/HowItWorks.svelte';
  import Testimonials from './lib/Testimonials.svelte';
  import Contact from './lib/Contact.svelte';
  import FAQ from './lib/FAQ.svelte';
  import Footer from './lib/Footer.svelte';
  import LanguageSwitcher from './lib/LanguageSwitcher.svelte';
  import { PhoneIcon } from 'lucide-svelte';

  const phoneNumber = '+30 2310 265915';
  const telLink = `tel:${phoneNumber.replace(/\(|\)|\s|-/g, '')}`;
  
  // Apply the theme class to the root element
  onMount(() => {
    const unsubscribe = theme.subscribe(value => {
      console.log("App.svelte theme subscription:", value);
      if (value === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    // Initialize Google Translate Widget - access via window using bracket notation
    // The function is defined in index.html and loaded globally.
    // This is necessary for the custom button approach to work.
    if (typeof window['googleTranslateElementInit'] === 'function') {
      window['googleTranslateElementInit']();
    } else {
      console.warn('Google Translate init function not ready onMount. It might load after this component.');
    }

    return unsubscribe; // Unsubscribe on component destroy
  });

</script>

<!-- Main content area. Background color is essential. -->
<!-- Padding bottom (pb-72) creates space for the fixed footer to be revealed. -->
<main class="relative bg-white dark:bg-slate-900">
  <Header />
  <Hero />
  <WhyChooseUs />
  <HowItWorks />
  <FAQ />
  <Testimonials />
  <Contact />
<Footer />

  <!-- Floating Action Button for Call - Mobile Only -->
  <a
  href={telLink}
  class="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 md:hidden flex items-center justify-center"
  aria-label="Call us"
  >
  <PhoneIcon size={24} />
  <span class="sr-only">Call Us</span>
  </a>

  <div class="fixed bottom-6 right-6 z-40">
    <LanguageSwitcher />
  </div>
</main>


<style>
  /* Ensure html and body have full height if not already set by Tailwind preflight or global styles */
  /* This is generally handled by Tailwind, but good to keep in mind for scrolling mechanics */
  /* For this effect, the background on the main wrapper is the most critical part */
</style>
