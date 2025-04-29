<script>
  // Register GSAP plugins immediately when the module loads
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

  import { onMount } from 'svelte';
  import { theme } from './lib/stores/themeStore'; // Import the theme store

  import Header from './lib/components/Header.svelte';
  import Hero from './lib/Hero.svelte';
  import HowItWorks from './lib/HowItWorks.svelte';
  import Testimonials from './lib/Testimonials.svelte';
  import Contact from './lib/Contact.svelte';
  import Footer from './lib/Footer.svelte';

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

    return unsubscribe; // Unsubscribe on component destroy
  });

</script>

<main>
  
</main>

<Header />
<Hero />
<HowItWorks />
<Testimonials />
<Contact />
<Footer />

<style>
</style>
