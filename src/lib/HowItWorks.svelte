<script>
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { Check } from 'lucide-svelte';
  import { fade, fly, slide } from 'svelte/transition'; // Import slide transition

  export let accentColors = {
    indigo: {
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-500 dark:border-indigo-400',
      bg: 'bg-indigo-600 dark:bg-indigo-500',
      hoverText: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
      hoverBorder: 'group-hover:border-indigo-500 dark:group-hover:border-indigo-400',
      hoverBg: 'group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500',
      hoverShadow: 'hover:shadow-indigo-500/30 dark:hover:shadow-[0_10px_15px_-3px_rgba(99,102,241,0.2)]'
    },
    green: {
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-500 dark:border-green-400',
      bg: 'bg-green-600 dark:bg-green-500',
      hoverText: 'group-hover:text-green-600 dark:group-hover:text-green-400',
      hoverBorder: 'group-hover:border-green-500 dark:group-hover:border-green-400',
      hoverBg: 'group-hover:bg-green-600 dark:group-hover:bg-green-500',
      hoverShadow: 'hover:shadow-green-500/30 dark:hover:shadow-[0_10px_15px_-3px_rgba(52,211,153,0.2)]'
    },
    purple: {
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500 dark:border-purple-400',
      bg: 'bg-purple-600 dark:bg-purple-500',
      hoverText: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
      hoverBorder: 'group-hover:border-purple-500 dark:group-hover:border-purple-400',
      hoverBg: 'group-hover:bg-purple-600 dark:group-hover:bg-purple-500',
      hoverShadow: 'hover:shadow-purple-500/30 dark:hover:shadow-[0_10px_15px_-3px_rgba(168,85,247,0.2)]'
    }
  };

  let sectionRef;
  let titleBlock;
  let timelineLine;
  let stepElements = [];
  let packageCardElements = [];
  let stepsContainerRef; // New reference for the steps' direct parent

  let activeView = 'packages'; // 'packages' or 'roadmap'

  // GSAP matchMedia instance for conditional animations
  let mm = gsap.matchMedia();

  let steps = [
    { 
      id: 1, 
      title: 'Λύνουμε το puzzle της εργασιακής σας ζωής', // User change preserved
      description: 'Εντοπίζουμε τα χρόνια ασφάλισης σας, ακόμα και αν έχετε χάσει τα ένσημα σας. Από υποβολή ΥΔΑΑΒ μέχρι και την διεκπαιρέωση ενστάσεων, δουλεύουμε για εσάς.', 
      icon: 'fa-solid fa-file-invoice', 
      isExpanded: false 
    },
    { 
      id: 2, 
      title: 'Θεμελιώνουμε το συνταξιοδοτικό σας δικαίωμα', // User change preserved
      description: 'Ελέγχουμε ποιοί νόμοι ισχύουν για εσάς, ποιός είναι ο προτιμότερος νόμος και αν είστε έτοιμοι να υποβάλετε αίτηση.', 
      icon: 'fa-solid fa-user-clock', 
      isExpanded: false 
    },
    { 
      id: 3, 
      title: 'Προυπολογισμός σύνταξης', // User change preserved
      description: 'Υπολογίζουμε με ακρίβεια τι ποσό θα λάβετε από την κύρια σύνταξη, επικουρική, Εφάπαξ, αποζημίωση από τον εργοδότη, έως και ΕΑΣ και φόρο.', 
      icon: 'fa-solid fa-gavel', 
      isExpanded: false 
    },
    { 
      id: 4, 
      title: ' Σχεδιασμός στρατηγικής', // User change preserved
      description: 'Σχεδιάζουμε σενάρια συνταξιοδότησης , υπολογίζοντας τα απαραίτητα βήματα, κόστη & οφέλη, ανάλογα με τις προτεραιότητες και ανάγκες σας.', 
      icon: 'fa-solid fa-calculator', 
      isExpanded: false 
    }, 
    { 
      id: 5, 
      title: 'Ωρίμανση φακέλου', // User change preserved
      description: 'Συγκεντρώνουμε όλα τα απαραίτητα έγγραφα και δικαιολογητικά πριν την ώρα τους  για να βοηθήσουμε τον εισηγητή της υπόθεσης σου, για την γρηγορότερη απονομή σύνταξης', 
      icon: 'fa-solid fa-file-pen', 
      isExpanded: false 
    },
    { 
      id: 6, 
      title: 'Κατάθεση αίτησης σύνταξης', // User change preserved
      description: 'Ετοιμάζουμε και υποβάλλουμε όλα τα έγγραφα στον ΕΦΚΑ', 
      icon: 'fa-solid fa-magnifying-glass-chart', 
      isExpanded: false 
    },
    { 
      id: 7, 
      title: 'Διαχείρηση εκκρεμμοτήτων', // User change preserved
      description: 'Παρακολουθούμε την πορεία της αίτησης σου, επιλύουμε τυχόν προβλήματα και πιέχουμε για έγκαιρη επεξεργασία.', 
      icon: 'fa-solid fa-stamp', 
      isExpanded: false 
    },
    { 
      id: 8, 
      title: 'Έλεγχος απόφασης και ανάλυση αναδρομικών', // User change preserved
      description: 'Διασφαλίζουμε ότι η οριστική απόφαση είναι σωστή, ή κάνουμε ένσταση και κυνηγάμε την υπόθεσή σου μέχρι τέλους. Αναλύουμε τις κρατήσεις σου και τυχόν αναδρομικά και κόστη, ώστε να γνωρίζεις πάντα τι συμβαίνει με την σύνταξη σου.', 
      icon: 'fa-solid fa-stamp', 
      isExpanded: false 
    },
  ];

  const packages = [
    {
      id: 'analysis',
      name: 'Θεμελίωση και ανάλυση',
      subtitle: 'Κάλυψη: Βήματα 1–4',
      description: 'λύνουμε το puzzle της ασφαλιστικής σας ζωής, και σας ενημερώνουμε για το ποσό της σύνταξης σας',
      features: [
        'λύνουμε το puzzle της εργασιακής σας ζωής',
        'Θεμελιώνουμε το συνταξιοδοτικό σας δικαίωμα',
        'Προυπολογισμός ποσού σύνταξης και κόστη',
        'Σχεδιασμός στρατηγικής'
      ],
      cta: 'Θέλω να συγκεντρώσω τα έγγραφά μου',
      accentColor: 'indigo',
    },
    {
      id: 'full_service',
      name: 'Ωρίμανση και αιτηση',
      subtitle: 'Κάλυψη: Βήματα 1–7',
      description: 'ωριμάζουμε τον φάκελο σας πριν την ώρα του,  και κυνηγάμε την περίπτωση σας μέχρι τέλους.',
      features: [
        'Ωρίμανση φακέλου',
        'Κατάθεση αίτησης συνταξιοδότησης',
        'Διαχείρηση εκκρεμμοτήτων',
        'Επιβεβαίωση και έλεγχος οριστικής απόφασης'
      ],
      cta: 'Θέλω τον πλήρειο υπηρεσία',
      accentColor: 'purple',
    }
  ];

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  function toggleStepExpansion(stepId) {
    steps = steps.map(step => 
      step.id === stepId ? { ...step, isExpanded: !step.isExpanded } : step
    );
    // Refresh ScrollTrigger after Svelte has updated the DOM due to state change
    gsap.delayedCall(0.05, () => { // Small delay ensures DOM is updated
      ScrollTrigger.refresh(true);
      console.log('ScrollTrigger refreshed after step expansion toggle.');
    });
  }

  onMount(() => {
    mm.add(
      {
        // Define conditions based on activeView
        isPackagesView: () => activeView === 'packages',
        isRoadmapView: () => activeView === 'roadmap'
      },
      (context) => {
        // context.conditions will have boolean properties: isPackagesView, isRoadmapView
        let { isPackagesView, isRoadmapView } = context.conditions;
        let tweens = []; // Store tweens created in this specific context for cleanup

        // Common title animation - will be managed by this matchMedia context
        if (titleBlock) {
          const tween = gsap.from(titleBlock, {
            opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: titleBlock, start: 'top 90%', markers: true, id: "howTitle" }
          });
          tweens.push(tween);
        }

        if (isPackagesView) {
          packageCardElements.forEach((el, i) => {
            if (el) {
              const tween = gsap.from(el, {
                opacity: 0, y: 40, duration: 0.5, delay: i * 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 90%', markers: true, id: `pkgCard_${i}` }
              });
              tweens.push(tween);
            }
          });
        } else if (isRoadmapView) {
          // Animate the timeline line itself
          if (timelineLine) {
            gsap.set(timelineLine, { scaleY: 0, transformOrigin: 'top center' }); // Set initial state
            const lineTween = gsap.to(timelineLine, { // Animate to final state
              scaleY: 1,
              duration: 0.8, 
              ease: 'power2.out',
              scrollTrigger: { 
                trigger: timelineLine,
                start: 'top 85%', 
                markers: true, 
                id: 'timelineLineAnim_rework',
                invalidateOnRefresh: true
              }
            });
            tweens.push(lineTween);
          }

          // Animate all step items with a stagger
          const validStepElements = stepElements.filter(el => el instanceof HTMLElement);
          if (stepsContainerRef && validStepElements.length > 0) {
            gsap.set(validStepElements, { opacity: 0, y: 30 }); // Set initial state for all steps
            const stepsTween = gsap.to(validStepElements, { // Animate to final state
              opacity: 1, 
              y: 0, 
              duration: 0.6, 
              ease: 'power3.out',
              stagger: 0.2, 
              scrollTrigger: { 
                trigger: stepsContainerRef, 
                start: 'top 80%', 
                markers: true, 
                id: 'stepsGroupAnim_rework',
                invalidateOnRefresh: true
              }
            });
            tweens.push(stepsTween);
          }
        }

        return () => { // GSAP cleanup function for this context
          tweens.forEach(t => t.kill());
        };
      }
    );

    // Initial refresh for ScrollTrigger after a slight delay
    gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
  });

  afterUpdate(() => {
    // When activeView changes, Svelte updates the DOM (#key block).
    // Refresh ScrollTrigger; this will make matchMedia re-evaluate its conditions
    // and run the appropriate setup/cleanup functions.
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true); 
    });
  });

  onDestroy(() => {
    mm.revert(); // Cleans up all animations and ScrollTriggers created by matchMedia contexts
  });

</script>

<section bind:this={sectionRef} class="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div bind:this={titleBlock} class="mx-auto max-w-3xl mb-12 sm:mb-16 text-center">
      <h2 class="text-xl font-semibold leading-8 tracking-tight text-indigo-600 dark:text-indigo-400">Η μέθοδος Μπαλλά</h2>
      <h2 class="mt-2 {activeView === 'packages' ? 'mb-2' : 'mb-10'} text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl font-heading relative h-[1.4em]">
        {#key activeView}
          <span 
            in:fly={{ y: 20, duration: 400, delay: 200 }} 
            out:fly={{ y: -20, duration: 300 }}
            class="absolute inset-0 transition-all duration-500 ease-in-out"
          >
            {activeView === 'packages' ? 'Οι υπηρεσίες μας' : 'Η διαδικασία μας: Η Μέθοδος Μπαλλά'}
          </span>
        {/key}
      </h2>
      <p class=" text-lg leading-7 text-gray-600 dark:text-gray-300">
        Για πάνω από <strong class="text-indigo-600 dark:text-indigo-400">15 χρόνια</strong> βοηθούμε τους ασφαλισμένους να βγούν στη σύνταξη με τον <em>συμφερότερο</em> για αυτούς τρόπο. Εξειδικευόμαστε σε <strong class="text-indigo-600 dark:text-indigo-400">δύο κύριες υπηρεσίες</strong>: 
        <span class="font-medium">Αναλύουμε και σας ενημερώνουμε</span> πλήρως για την ασφαλιστική σας εικόνα ή <span class="font-medium">αναλαμβάνουμε τα πάντα</span> για εσάς, από την αρχή ώς το τέλος.
      </p>
    </div>

    <!-- Toggle Switch -->
<div class="mb-12 sm:mb-16 flex flex-col items-center justify-center">
  <div class="relative flex px-1 py-1 bg-white/30 dark:bg-gray-700/40 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/100 dark:border-gray-600/30">
    <button 
      on:click={() => activeView = 'packages'}
      class="relative z-10 px-4 py-2 sm:px-8 sm:py-2.5 text-sm sm:text-base font-medium rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 {activeView === 'packages' ? 'text-white' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
    >Υπηρεσίες</button>
    <button 
      on:click={() => activeView = 'roadmap'}
      class="relative z-10 px-4 py-2 sm:px-8 sm:py-2.5 text-sm sm:text-base font-medium rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 {activeView === 'roadmap' ? 'text-white' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
    >Τα Σκαλιά</button>
    <span 
      class="absolute inset-y-1 inset-x-4 w-1/2 mb-0.5 rounded-xl bg-indigo-500/90 dark:bg-indigo-600/90 backdrop-blur-sm shadow-md transition-all duration-300 ease-in-out"
      style:left="{activeView === 'packages' ? '3px' : 'calc(50% - 4px)'}"
    ></span>
  </div>
  <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
    Κάντε κλικ για εναλλαγή προβολών</p>
</div>

    <!-- Content Area: Packages or Roadmap -->
    {#key activeView}
      <div 
        class="view-container"
        in:fly={{ y: 15, duration: 400, delay: 250 }}
        out:fly={{ y: -15, duration: 250 }}
      >
        {#if activeView === 'packages'}
          <div class="packages-view">
            <p class="text-center text-md sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 sm:mb-12">
              <span class="font-semibold text-indigo-600 dark:text-indigo-400">Η Μέθοδος Balla</span> – 
              <span class="font-medium">Τρεις υπηρεσίες. Επτά βήματα.</span> Μία αξιόπιστη διαδρομή. 
              Δεν προσφέρουμε τυχαίες συμβουλές. <span class="font-medium">Αναλαμβάνουμε τη διαδικασία 
              σύνταξής σας από την αρχή μέχρι το τέλος.</span>
            </p>
            <div class="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-stretch justify-center flex-wrap">
              {#each packages as pkg, i (pkg.id)}
                <div 
                  bind:this={packageCardElements[i]} 
                  class="group glass-card relative flex flex-col bg-white/40 dark:bg-gray-700/50 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 border border-gray-300 dark:border-gray-600 {accentColors[pkg.accentColor]?.hoverBorder || ''} {accentColors[pkg.accentColor]?.hoverShadow || ''} transition-all duration-300 ease-in-out hover:scale-[1.03] w-full max-w-md flex-1"
                >
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100 {accentColors[pkg.accentColor]?.hoverText || ''} mb-2 transition-colors duration-300">{pkg.name}</h3>
                  <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">{pkg.subtitle}</p>
                  <p class="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{pkg.description}</p>
                  <ul class="space-y-2 mb-8 text-sm text-gray-700 dark:text-gray-300">
                    {#each pkg.features as feature}
                      <li class="flex items-start">
                        <Check class="w-4 h-4 mr-2 mt-0.5 text-gray-500 dark:text-gray-400 {accentColors[pkg.accentColor]?.hoverText || ''} flex-shrink-0 transition-colors duration-300" />
                        <span>{feature}</span>
                      </li>
                    {/each}
                  </ul>
                  <a 
                    href="#contact" 
                    class="mt-auto w-full text-center px-6 py-3 rounded-lg font-semibold text-white bg-gray-700 hover:bg-{accentColors[pkg.accentColor]?.hoverBg} dark:bg-gray-600 dark:hover:bg-{accentColors[pkg.accentColor]?.hoverBg} {accentColors[pkg.accentColor]?.hoverBg || ''} transition-all duration-300 ease-in-out group-hover:text-white"
                  >
                    {pkg.cta}
                  </a>
                  <!-- Shine effect placeholder -->
                  <div class="shine-effect absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl pointer-events-none z-0"></div>
                </div>
              {/each}
            </div>
          </div>
        {:else if activeView === 'roadmap'}
          <div class="roadmap-view">
            <p class="text-center text-md sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 sm:mb-12">
              <span class="font-semibold "><em class="text-indigo-600 dark:text-indigo-400">2</em> υπηρεσίες,
              <em class="text-indigo-600 dark:text-indigo-400">8</em> βήματα, 
              <em class="text-indigo-600 dark:text-indigo-400">1</em> αξιόπιστη διαδρομή.</span><br>
              Μετά από <strong class="text-indigo-600 dark:text-indigo-400">40+ χρόνια εμπειρίας</strong> στον ΕΦΚΑ, 
              η τ. διευθύντρια του ΙΚΑ Αριστοτέλους, <span class="font-medium">Όλγα Μπαλλά</span>, 
              ακολουθεί τον αποδεδειγμένο τρόπο 8 βημάτων που διασφαλίζει ότι στην 
              <em class="text-indigo-600 dark:text-indigo-400">Ballapension.com</em> δεν αφήνουμε <span class="font-medium">τίποτα στην τύχη</span>.
            </p>
            <div class="relative max-w-md mx-auto md:max-w-3xl">
              <div bind:this={timelineLine} class="absolute top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 left-4 md:left-1/2 md:-translate-x-1/2 rounded-full" style="transform-origin: top center;"></div>
              <!-- This is the direct parent for all step items. Bind it. -->
              <div bind:this={stepsContainerRef} class="relative flex flex-col items-start space-y-4 md:space-y-0">
                {#each steps as step, i (step.id)}
                <!-- Step Break -->
                {#if step.id === 1}
                <div class="w-full my-6 md:my-8 py-2 md:py-0 text-center md:relative md:flex md:justify-center">
                    <div class="md:absolute md:left-1/2 md:-translate-x-1/2">
                        <span class="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                          Μέρος 1: Ανάλυση & Πρόβλεψη
                        </span>
                    </div>
                </div>
                <div class="md:h-12"></div> <!-- Spacer for desktop timeline -->
                {/if}
                  <!-- Step Break -->
                  {#if step.id === 5}
                    <div class="w-full my-6 md:my-8 py-2 md:py-0 text-center md:relative md:flex md:justify-center">
                        <div class="md:absolute md:left-1/2 md:-translate-x-1/2">
                            <span class="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                                Μέρος 2: Αίτημα & Παραμέτρωση
                            </span>
                        </div>
                    </div>
                    <div class="md:h-12"></div> <!-- Spacer for desktop timeline -->
                  {/if}
                  
                  <div bind:this={stepElements[i]} class="step-item relative w-full flex items-start md:items-center md:py-6 pl-10 md:pl-0">
                    <!-- Desktop Layout: Alternating Sides -->
                    <div class="hidden md:flex w-1/2 {i % 2 === 0 ? 'pr-8 justify-end text-right' : 'pl-8 justify-start text-left order-2'} items-start">
                      <button 
                        type="button"
                        class="step-content-box p-4 sm:p-6 rounded-xl shadow-xl w-full bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md hover:bg-slate-100/90 dark:hover:bg-slate-700/90 transition-colors duration-200 text-left"
                        on:click={() => toggleStepExpansion(step.id)}
                        on:keydown={(e) => e.key === 'Enter' && toggleStepExpansion(step.id)}
                        aria-label="Expand step {step.id}"
                        aria-expanded={step.isExpanded}
                      >
                        <div class="w-full text-left flex justify-between items-start">
                          <div class="flex flex-col w-full">
                            <h2 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Step {step.id}</h2>
                            <div class="flex items-center">
                              <i class="{step.icon} mr-3 text-white bg-indigo-500 dark:bg-indigo-600 rounded-full p-2 text-lg shadow-md"></i>
                              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                            </div>
                            <div class="flex items-center mt-2">
                              <span class="text-sm text-indigo-500 dark:text-indigo-300 mr-1">{step.isExpanded ? 'Απόκρυψη' : 'Εμφάνιση'}</span>
                              <i class="fa-solid {step.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-indigo-500 dark:text-indigo-300 transition-transform duration-200"></i>
                            </div>
                          </div>
                        </div>
                        {#if step.isExpanded}
                          <div transition:slide={{ duration: 250 }}>
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-3 pl-2 sm:pl-2 border-l-2 border-indigo-300 dark:border-indigo-700">{step.description}</p>
                          </div>
                        {/if}
                      </button>
                    </div>
                    <!-- Timeline Dot (Desktop & Mobile) -->
                    <div class="absolute left-4 top-2 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-500 dark:bg-indigo-400 shadow-md z-10 flex items-center justify-center">
                      <div class="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div class="hidden md:block w-1/2 {i % 2 === 0 ? 'order-2' : ''}"></div> <!-- Spacer for desktop -->
                    
                    <!-- Mobile Layout (Card to the right of the line) -->
                    <div class="block md:hidden w-full">
                      <div class="step-content-box relative p-4 sm:p-5 rounded-xl shadow-lg bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md">
                        <button on:click={() => toggleStepExpansion(step.id)} class="w-full text-left flex justify-between items-center">
                          <div class="flex items-center flex-col">
                            <h2 class="text-base w-full mb-2 text-left sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400">Step {step.id}</h2>
                            <div class="flex items-center flex-row align-center justify-center">
                            <i class="{step.icon} mr-3 text-white bg-indigo-500 dark:bg-indigo-600 rounded-full p-2 text-md sm:text-lg shadow-md"></i>
                            <h3 class="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                          </div>
                          </div>
                          <i class="fa-solid {step.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-2 text-gray-500 dark:text-gray-400 transition-transform duration-200 text-sm sm:text-base"></i>
                        </button>
                        {#if step.isExpanded}
                          <div transition:slide={{ duration: 300 }}>
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-3 pl-8 sm:pl-10">{step.description}</p>
                          </div>
                        {/if}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/key}
  </div>
</section>

<style>
  .glass-card {
    /* Base styles for glassmorphic cards (Tailwind handles most) */
    position: relative; /* For shine pseudo-element if added later */
    overflow: hidden; /* For shine pseudo-element */
  }
  .shine-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 70%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.25) 50%, /* Shine intensity */
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: left 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1; /* Above background, below content */
  }
  .glass-card:hover .shine-effect::before {
    left: 150%;
  }

  /* Ensure step content is above the timeline line if overlap occurs */
  .step-content-box {
    position: relative;
    z-index: 5;
  }
  /* .step-item {
    opacity: 0; 
  } */ /* GSAP will now handle initial opacity via gsap.set() */

  .roadmap-view .step-item:last-child::after {
    display: none; /* Hide connector for the last item */
  }

  /* Ensure backdrop-filter polyfill or browser support */
  @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
    .step-content-box {
      /* backdrop-filter property is applied via Tailwind utilities like backdrop-blur-md */
    }
  }

  /* Dark mode specific timeline adjustments if needed */
  .dark .timeline-line {
    /* Example: if gradient needs dark specific version not covered by Tailwind */
  }
</style>
