<script>
  import { PhoneIcon } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let currentLang = 'en'; // Default to English

  // Function to read a cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // Function to set a cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    // Set cookie for the root path to ensure it's effective site-wide
    // and for the main domain (removing www. if present to cover both)
    let domain = window.location.hostname.replace(/^www\./i, '');
    // For localhost, domain attribute may not work as expected, but fine for deployed sites.
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; domain=" + domain;
    // Fallback for localhost or cases where domain setting fails
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  onMount(() => {
    // Check the googtrans cookie to set initial button text
    const googtransCookie = getCookie('googtrans');
    if (googtransCookie && googtransCookie.includes('/el')) {
      currentLang = 'el';
    } else {
      currentLang = 'en';
    }
  });

  function switchLanguage() {
    let newLangPrefix;
    if (currentLang === 'en') {
      currentLang = 'el';
      newLangPrefix = '/en/el'; // Translate from English to Greek
    } else {
      currentLang = 'en';
      newLangPrefix = '/auto/en'; // Revert to English (original page language)
    }
    
    setCookie('googtrans', newLangPrefix, 7); // Set cookie for 7 days
    window.location.reload();
  }
</script>

<button 
  on:click={switchLanguage} 
  class="notranslate px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
         bg-white/30 dark:bg-gray-700/40 backdrop-blur-md text-gray-800 dark:text-gray-200
         border border-gray-200/50 dark:border-gray-600/30 shadow-sm
         hover:bg-white/50 dark:hover:bg-gray-600/50 hover:shadow-md hidden md:inline-block"
  aria-label="Switch language"
>
  <span class="flex items-center gap-1.5">
    {#if currentLang === 'en'}      
      Μετάφραση στα Ελληνικά
      <img class="inline-block w-8 relative overflow-hidden rounded-sm" src="images/greece.webp" alt="Greek flag" srcset="">
    {:else}
      Translate to English
      <img class="inline-block w-8 relative overflow-hidden rounded-sm" src="images/english.webp" alt="English flag" srcset="">
    {/if}
  </span>
</button>

<a
  on:click={switchLanguage}
  class="notranslate bottom-18 text-white right-0 rounded-full w-15 h-14 z-50 shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 md:hidden flex items-center justify-center relative overflow-hidden backdrop-blur-sm"
  aria-label="Switch language"
>
  <div 
    class="absolute inset-0 opacity-30" 
    style="background-image: url('images/{currentLang === 'en' ? 'greece' : 'english'}.webp'); background-size: cover; background-position: center;"
  ></div>
  <h2 class="relative z-10 text-xl font-semibold text-white [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)]">
    {currentLang === 'en' ? 'Ελ' : 'En'}
  </h2>
  <span class="sr-only">{currentLang === 'en' ? 'Μετάφραση στα Ελληνικά' : 'Translate to English'}</span>
</a>

<style>
  /* Add any specific styles for the button if Tailwind isn't enough */
</style>
