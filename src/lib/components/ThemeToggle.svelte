<!-- src/lib/components/ThemeToggle.svelte -->
<script>
    import { theme, toggleTheme } from '../stores/themeStore';
    import { Sun, Moon } from 'lucide-svelte'; // Using icons for clarity
    import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
    let currentTheme = 'light'; // Default avoids flash on SSR/initial load

    // Reactive state for scroll effect
    let scrolledDown = false;

    // Scroll handler function
    const handleScroll = () => {
      scrolledDown = window.scrollY > 10; // Check if scrolled more than 10px
    };
  
    // Subscribe only on mount to avoid SSR issues
    onMount(() => {
      // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case the page loads scrolled

      const unsubscribe = theme.subscribe(value => {
        currentTheme = value;
      });
      return unsubscribe; // Cleanup subscription on unmount
    });
  
  </script>
  
  <a
    on:click={toggleTheme}
    aria-label="Toggle dark mode"
    class:text-white={!scrolledDown}
    class="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer"
  >
    <div class="relative h-9 w-9">
      {#if currentTheme === 'light'}
        <div in:fly={{ x: 20, duration: 300 }} out:fade={{ duration: 200 }} class="absolute inset-0">
          <Sun class="w-9 h-9 p-2 rounded-full bg-white text-indigo-600 shadow-sm hover:bg-white/50 transition-colors duration-200" />
        </div>
      {:else}
        <div in:fly={{ x: 20, duration: 300 }} out:fade={{ duration: 200 }} class="absolute inset-0">
          <Moon class="w-9 h-9 p-2 rounded-full bg-indigo-900/50 text-indigo-100 shadow-sm hover:bg-indigo-600 transition-colors duration-200" />
        </div>
      {/if}
    </div>
  </a>