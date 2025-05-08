<script>
</script>

<!-- Apply fixed positioning and negative z-index for CSS-only reveal effect -->
<footer class="relative w-full bg-gray-150 dark:bg-gray-800" aria-labelledby="footer-heading">
  <h2 id="footer-heading" class="sr-only">Footer</h2>
  <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
    
    <!-- New responsive grid for footer content -->
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

      <!-- Column 1: Branding -->
      <div class="space-y-4">
        <a href="/" class="-m-1.5 p-1.5 flex flex-row items-center gap-x-2">
          <img class="h-8 w-auto dark:invert" src="branding/logo.png" alt="BallaPension Logo">
          <h2 class="text-black dark:text-white font-bold text-xl">BallaPension</h2>
        </a>
        <p class="text-sm leading-6 mt-4 text-gray-600 dark:text-gray-300">Simplifying retirement fund claims for seniors across Greece.</p>
        <!-- Social links will be moved to Column 4 -->
      </div>

      <!-- Column 2: Navigation Links -->
      <div>
        <h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Navigation</h3>
        <ul role="list" class="mt-6 space-y-4">
          <li><a href="#how-it-works" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">How it Works</a></li>
          <li><a href="#testimonials" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Testimonials</a></li>
          <li><a href="#contact" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Contact</a></li>
        </ul>
      </div>

      <!-- Column 3: Legal Links -->
      <div>
        <h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Legal</h3>
        <ul role="list" class="mt-6 space-y-4">
          <li><a href="/" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Privacy Policy</a></li>
          <li><a href="/" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Terms of Service</a></li>
          <li><a href="/" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Accessibility</a></li>
        </ul>
      </div>

      <!-- Column 4: Contact Info & Social Links -->
      <div>
        <h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Get in Touch</h3>
        <ul role="list" class="mt-6 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
          <li><i class="fas fa-map-marker-alt w-5 mr-2 inline-block text-gray-400 dark:text-gray-500"></i> 123 Pension Lane, Athens</li>
          <li><i class="fas fa-phone-alt w-5 mr-2 inline-block text-gray-400 dark:text-gray-500"></i> <a href="tel:+302310265915" class="hover:text-gray-900 dark:hover:text-white">+30 2310 265915</a></li>
          <li><i class="fas fa-envelope w-5 mr-2 inline-block text-gray-400 dark:text-gray-500"></i> <a href="mailto:hello@ballapension.example" class="hover:text-gray-900 dark:hover:text-white">hello@ballapension.example</a></li>
        </ul>
        <div class="mt-6 flex space-x-6">
          <a href="/" class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"><span class="sr-only">Facebook</span><i class="fab fa-facebook-f h-6 w-6" aria-hidden="true"></i></a>
          <a href="/" class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"><span class="sr-only">Twitter</span><i class="fab fa-twitter h-6 w-6" aria-hidden="true"></i></a>
          <a href="/" class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"><span class="sr-only">LinkedIn</span><i class="fab fa-linkedin-in h-6 w-6" aria-hidden="true"></i></a>
        </div>
      </div>

    </div> <!-- End of new responsive grid -->

    <!-- Copyright section -->
    <div class="mt-16 border-t border-gray-900/10 dark:border-white/10 pt-8 sm:mt-20 lg:mt-24">
      <p class="text-xs leading-5 text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} BallaPension. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
    /* 
      Styling is now handled by Tailwind classes directly on the footer element.
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: -1;
    */
</style>
