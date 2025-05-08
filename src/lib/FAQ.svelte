<script>
  import { slide } from 'svelte/transition';
  import { ChevronDown } from 'lucide-svelte'; // Using a common icon library
  import { onMount } from 'svelte'; // Added onMount
  import { gsap } from 'gsap'; // Added gsap import

  let sectionRef; // For binding to the section element
  let mouseX = 0;
  let mouseY = 0;

  // Placeholder FAQ data - you can replace this with your actual content
  let faqs = [
    {
      id: 1,
      question: 'What is the first step to start my pension process?',
      answer: 'The first step is to contact us for an initial consultation. We will discuss your situation, gather preliminary information, and explain how we can assist you with our services.',
      isOpen: false
    },
    {
      id: 2,
      question: 'How long does the pension application process typically take?',
      answer: 'The duration can vary significantly based on the complexity of your case, the completeness of your documentation, and EFKA processing times. We strive to expedite the process through meticulous preparation and proactive follow-up.',
      isOpen: false
    },
    {
      id: 3,
      question: 'What documents do I need to provide?',
      answer: 'We will provide you with a detailed list of required documents after our initial assessment. Generally, this includes identification, proof of work history, insurance records, and other relevant personal documents. Don\'t worry if you are missing some; we can help reconstruct your history.',
      isOpen: false
    },
    {
      id: 4,
      question: 'Can you help if I have worked in multiple countries?',
      answer: 'Yes, we have experience handling cases with international employment history and can help navigate the complexities of coordinating pensions from different countries, where applicable.',
      isOpen: false
    },
    {
      id: 5,
      question: 'Can you help if I have worked in multiple countries?',
      answer: 'Yes, we have experience handling cases with international employment history and can help navigate the complexities of coordinating pensions from different countries, where applicable.',
      isOpen: false
    }
  ];

  function toggleFAQ(id) {
    faqs = faqs.map(faq => 
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
    );
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
    // Set initial background position
    if (sectionRef) {
      gsap.set(sectionRef, { '--bg-x': '50%', '--bg-y': '50%' });
    }
  });
</script>

<section 
  bind:this={sectionRef}
  on:mousemove={handleMouseMove}
  aria-label="Frequently Asked Questions with interactive background"
  class="relative py-12 md:py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden" 
  style="--bg-x: 50%; --bg-y: 50%;"
>
  <!-- Interactive Background Effect -->
  <div 
    class="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-in-out opacity-40 dark:opacity-30"
    style="background: radial-gradient(circle at var(--bg-x) var(--bg-y), rgba(79, 70, 229, 0.25) 0%, rgba(79, 70, 229, 0) 50%);"
  ></div>

  <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl z-10">
    <div class="text-center mb-10 md:mb-16">
      <h2 class="text-xl font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
        Frequently Asked Questions
      </h2>
      <h2 class="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Frequently Asked Questions
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Find quick answers to common questions about our pension services.
      </p>
    </div>

    <div class="space-y-6">
      {#each faqs as faq (faq.id)}
        <div class="bg-white/60 dark:bg-gray-700/50 backdrop-blur-md shadow-lg rounded-xl border border-gray-200 dark:border-gray-600/80 overflow-hidden">
          <button 
            on:click={() => toggleFAQ(faq.id)} 
            class="w-full flex justify-between items-center text-left p-5 sm:p-6 focus:outline-none group"
            aria-expanded={faq.isOpen}
            aria-controls="faq-answer-{faq.id}"
          >
            <h3 class="text-md sm:text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
              {faq.question}
            </h3>
            <ChevronDown class={`w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform duration-300 transform ${faq.isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {#if faq.isOpen}
            <div transition:slide={{ duration: 300 }} id="faq-answer-{faq.id}" class="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-gray-200 dark:border-gray-600">
              <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-3 sm:mt-4">
                {faq.answer}
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
