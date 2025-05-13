<script>
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let sectionRef;
  let contentRef;
  let mouseX = 0;
  let mouseY = 0;

  // Store tweens for cleanup
  let textRevealTween;
  let cardsRevealTween;

  // Simplified card data
  let cardData = [
    {
      id: 1,
      icon: 'fa-solid fa-shield-halved',
      title: 'Πλήρης Έλεγχος Υπόθεσης',
      description: 'Αναλαμβάνουμε πλήρως τον έλεγχο της υπόθεσής σας, από την αρχή μέχρι το τέλος.'
    },
    {
      id: 2,
      icon: 'fa-solid fa-person-chalkboard',
      title: 'Καθοδήγηση Βήμα-Βήμα',
      description: 'Σας καθοδηγούμε με σαφήνεια σε κάθε στάδιο της διαδικασίας.'
    },
    {
      id: 3,
      icon: 'fa-solid fa-magnifying-glass-chart',
      title: 'Επίλυση Αποφάσεων & Σφαλμάτων',
      description: 'Παρακολουθούμε ενεργά τις αποφάσεις και διορθώνουμε τυχόν σφάλματα.'
    }
  ];

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  function handleMouseMove(event) {
    if (!sectionRef) return;
    const rect = sectionRef.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    gsap.to(sectionRef, {
      duration: 0.6,
      ease: 'power2.out',
      '--bg-x': (mouseX / rect.width) * 100 + '%',
      '--bg-y': (mouseY / rect.height) * 100 + '%',
    });
  }

  onMount(() => {
    if (contentRef) {
      const textElements = Array.from(contentRef.children).filter(el => el.matches('h2, p.text-lg'));
      const cardElements = contentRef.querySelectorAll('.glass-card');

      // Explicitly set initial hidden state
      gsap.set(textElements, { opacity: 0, y: 50 });
      gsap.set(cardElements, { opacity: 0, y: 50 });

      textRevealTween = gsap.fromTo(textElements, 
        { opacity: 0, y: 50 }, // FROM
        { // TO
          opacity: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef,
            start: 'top 80%',
            invalidateOnRefresh: true 
          }
        }
      );
      
      cardsRevealTween = gsap.fromTo(cardElements, 
        { opacity: 0, y: 1 }, // FROM
        { // TO
          opacity: 1, 
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef, 
            start: 'top 70%', 
            invalidateOnRefresh: true 
          }
        }
      );
    }
    gsap.set(sectionRef, { '--bg-x': '50%', '--bg-y': '50%' });
    gsap.delayedCall(0.1, () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  });

  afterUpdate(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
  });

  onDestroy(() => {
    if (textRevealTween) {
      textRevealTween.kill();
    }
    if (cardsRevealTween) {
      cardsRevealTween.kill();
    }
  });

</script>

<section
  bind:this={sectionRef}
  on:mousemove={handleMouseMove}
  aria-label="Why Choose Us Section"
  class="relative rounded-t-4xl -mt-9 py-16 sm:py-24 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300"
  style="--bg-x: 50%; --bg-y: 50%;" 
>
  <!-- Enhanced Interactive Background Effect -->
  <div 
    class="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-in-out opacity-50 dark:opacity-40"
    style="background: radial-gradient(circle at var(--bg-x) var(--bg-y), rgba(79, 70, 229, 0.35) 0%, rgba(79, 70, 229, 0) 55%);"
  ></div>

  <div bind:this={contentRef} class="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
    <h2 class="text-xl pb-2 text-center font-semibold leading-8 tracking-tight text-indigo-600 dark:text-indigo-400">Γιατί να μας επιλέξετε;</h2>
    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
      Η σύνταξη σας, χωρίς άγχος
    </h2>
    <p class="text-lg sm:text-xl text-left max-w-3xl mx-auto mb-10 sm:mb-16 text-gray-700 dark:text-gray-300">
      Εδώ και <span class="font-semibold text-indigo-600 dark:text-indigo-400">15+ χρόνια</span>, 
      επικεντρωνόμαστε σε ένα μόνο πράγμα: 
      <span class="font-medium text-gray-900 dark:text-white">Τις συντάξεις ΕΦΚΑ</span>.
      
      Μεταξύ των μελών της ομάδας μας, μοιραζόμαστε 
      <span class="font-semibold text-indigo-600 dark:text-indigo-400">50+ χρόνια</span> 
      που συναναστρεφόμαστε με το οικοσύστημα του ΕΦΚΑ.
      
      <span class="font-semibold text-indigo-600 dark:text-indigo-400">6000+ χαρούμενους πελάτες</span> μετά, 
      είμαστε εδώ για να πάρουμε το άγχος από πάνω σου αναφορικά με την 
      <span class="font-medium text-gray-900 dark:text-white">πιό σημαντική απόφαση της υπόλοιπης ζωής σου</span>.
    </p>
    
    <div class="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
      {#each cardData as card (card.id)}
        <div 
          class="glass-card overflow-hidden bg-white/30 dark:bg-gray-700/40 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20 dark:border-gray-600/30 flex flex-col items-center text-center h-full relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl dark:hover:shadow-[0_10px_15px_-3px_rgba(129,140,248,0.2),0_4px_6px_-4px_rgba(129,140,248,0.25)] focus-visible:scale-105 focus-visible:shadow-2xl dark:focus-visible:shadow-[0_10px_15px_-3px_rgba(129,140,248,0.2),0_4px_6px_-4px_rgba(129,140,248,0.25)] active:scale-100 active:shadow-xl"
          tabindex="0" 
          aria-label={card.title}
        >
          <div class="bg-indigo-500 dark:bg-indigo-600 text-white rounded-full py-3 px-6 mb-4 text-2xl z-10"> 
            <i class={card.icon}></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2 z-10">{card.title}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 z-10">{card.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    position: relative;
  }
  .glass-card {
    display: flex; 
    /* Ensure child content is above the shine pseudo-element by default if needed,
       but direct z-10 on children is more explicit */
  }

  .glass-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%; /* Start further left to ensure it's off-screen */
    width: 75%; /* Width of the shine element */
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.25) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg); /* Angle of the shine */
    transition: left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smoother transition */
    z-index: 5; /* Ensure shine is above card background but below content */
  }

  .glass-card:hover::before,
  .glass-card:focus-visible::before {
    left: 150%; /* Move shine across and off-screen to the right */
  }

</style>
