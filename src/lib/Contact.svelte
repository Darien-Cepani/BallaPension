<script>
  import { onMount, onDestroy } from 'svelte';
  import L from 'leaflet'; 
  import 'leaflet/dist/leaflet.css';
  import { Phone, Mail, MapPin } from 'lucide-svelte'; // Import icons

  let mapInstance = null;
  let currentTileLayer = null;
  let observer = null;
  let titleBlock;
  let contactContent;
  let coordinates = [37.9838, 23.7275];

  // Stadia Maps URLs (replace {r} with @2x for retina if needed, but usually handled by Leaflet)
  const lightTiles = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png';
  const darkTiles = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png';
  // Stadia Maps Attribution Requirements
  const attribution = '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';

  // Function to set the correct tile layer based on the current theme
  function setMapTheme(map) {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const newTilesUrl = isDarkMode ? darkTiles : lightTiles;

    // Avoid replacing the layer if the URL is already correct
    // Use _url which is an internal property, but common in Leaflet examples
    if (currentTileLayer && currentTileLayer._url === newTilesUrl) {
        return;
    }

    // Remove the old layer if it exists
    if (currentTileLayer) {
      map.removeLayer(currentTileLayer);
    }

    // Add the new layer
    currentTileLayer = L.tileLayer(newTilesUrl, {
      attribution: attribution,
      maxZoom: 20, // Stadia Maps max zoom is higher
      minZoom: 12
    }).addTo(map);
  }

  onMount(async () => {
    // Check if running in browser
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Dynamically import Leaflet Marker and Icon client-side
    const { Marker, Icon } = await import('leaflet');

    // --- Setup Default Icon --- (Ensure these paths are correct in your /static or /public folder)
    const defaultIcon = new Icon({
      iconUrl: 'images/map-marker.png',
      iconRetinaUrl: 'images/map-marker.png',
      iconSize: [30, 41],
      iconAnchor: [15, 41],
      popupAnchor: [1, -40],
    });
    Marker.prototype.options.icon = defaultIcon;

    // --- Initialize Map --- Map
    const mapElement = document.getElementById('map');
    if (mapElement && !('_leaflet_id' in mapElement)) {
      mapInstance = L.map('map').setView(coordinates, 16); // Athens coordinates

      // Set initial theme based on current class
      setMapTheme(mapInstance);

      // Add marker
      L.marker(coordinates).addTo(mapInstance)
        .bindPopup('BallaPension Location.')
        .openPopup();

      // --- Observe Theme Changes on <html> tag ---
      observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            // Check if mapInstance exists before trying to set theme
            if (mapInstance) {
                setMapTheme(mapInstance);
            }
            break; // No need to check other mutations
          }
        }
      });

      observer.observe(document.documentElement, { attributes: true });
    }
  });

  onDestroy(() => {
    // --- Clean Up --- Clean
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (mapInstance) {
      mapInstance.remove(); // Properly dispose of the map instance
      mapInstance = null;
    }
  });

  const phoneNumber = '+30 2310 265915';
  const telLink = `tel:${phoneNumber.replace(/\(|\)|\s|-/g, '')}`;

  function openAddressInMap() {
    const address = '123 Main Street, Athens, Greece 10557';
    const encodedAddress = encodeURIComponent(address);
    // Standard Google Maps link as a robust fallback
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    // For iOS, try to open in Apple Maps
    const iOSUrl = `maps://maps.apple.com/?q=${encodedAddress}`;
    // For Android, use geo URI
    const androidUrl = `geo:0,0?q=${encodedAddress}`;

    const userAgent = navigator.userAgent || navigator.vendor;
    let mapOpened = false;

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      // Attempt to open Apple Maps
      window.location.href = iOSUrl;
      mapOpened = true; // Assume it might open, though detection is hard
    } else if (/android/i.test(userAgent)) {
      // Attempt to open in Android maps app
      window.location.href = androidUrl;
      mapOpened = true;
    }

    // Fallback to Google Maps web if no specific app was triggered or if preferred
    // A timeout can give native apps a chance to open
    setTimeout(() => {
        // This check is imperfect; ideally, you'd know if the native app actually opened.
        // For simplicity, if we tried a native URL, we might not want to immediately redirect.
        // However, a direct fallback to Google Maps web is often user-friendly.
        if (!mapOpened) { // Or always offer Google Maps as an option
            window.open(googleMapsUrl, '_blank');
        }
    }, 500); // 500ms delay, adjust as needed
  }

</script>

<section id="contact" class="py-16 md:py-24 bg-slate-100 dark:bg-gray-900">
  <div class="container mx-auto px-4">
    <!-- Title Block -->
    <div bind:this={titleBlock} class="text-center mb-12 md:mb-16">
      <h2 class="text-xl font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
        Contact Us
      </h2>
      <h2 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Get in Touch
      </h2>
      <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Ready to discuss your pension needs? We're here to help. Contact us via phone, email, or visit our office.
      </p>
    </div>

    <!-- Contact Content: Info Card and Map -->
    <div bind:this={contactContent} class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
      
      <!-- Contact Info Card -->
      <div class="bg-white dark:bg-slate-800/70 p-6 sm:p-8 rounded-xl shadow-xl flex flex-col ring-1 ring-slate-900/5 dark:ring-white/10">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center md:text-left">
          Contact Details
        </h3>
        
        <div class="space-y-6 flex-grow">
          <!-- Phone Item -->
          <div class="flex items-center">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 dark:bg-slate-700 flex items-center justify-center mr-4 ring-1 ring-indigo-200 dark:ring-slate-600">
              <Phone class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Call Us</p>
              <a href="tel:+302310265915" class="text-lg font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                +30 2310 265915
              </a>
            </div>
          </div>

          <!-- Email Item -->
          <div class="flex items-center">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 dark:bg-slate-700 flex items-center justify-center mr-4 ring-1 ring-indigo-200 dark:ring-slate-600">
              <Mail class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Email Us</p>
              <a href="mailto:info@ballapension.gr" class="text-lg font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                info@ballapension.gr
              </a>
            </div>
          </div>
          
          <!-- Address Item -->
          <div class="flex items-start">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 dark:bg-slate-700 flex items-center justify-center mr-4 mt-1 ring-1 ring-indigo-200 dark:ring-slate-600">
              <MapPin class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Our Office</p>
              <a 
                on:click={openAddressInMap}
                class="text-lg cursor-pointer text-left font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 rounded-sm">
                123 Main Street, Athens, Greece 10557
            </a>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700/50">
          <p class="text-center text-sm text-gray-600 dark:text-gray-400">
            We aim to respond to all inquiries within 24 business hours.
          </p>
        </div>
      </div>

      <!-- Map Container -->
      <div id="map" class="w-full h-96 md:h-full min-h-[410px] rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-slate-700/50 z-0">
        <!-- Leaflet map will render here -->
      </div>
    </div>
  </div>
</section>

<style>
  #map {
    height: 400px; /* Or min-height: 320px; if preferred */
    width: 100%;
    border-radius: 0.5rem; /* Tailwind's rounded-lg */
    z-index: 0; /* Keep map layer behind UI elements if needed */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Subtle shadow */
    /* Add subtle border in light mode */
    border: 1px solid transparent !important; /* Tailwind's gray-200 */
    background-color: transparent !important; /* Light gray background for light mode */
  }

  /* Specific styles for dark mode */
   .dark #map {
      border-color: transparent !important; /* Tailwind's gray-700 */
      background-color: transparent !important; /* Dark gray background for dark mode */
   }

   /* Style popups to better match theme */
   :global(.leaflet-popup-content-wrapper) {
     border-radius: 0.375rem; /* Tailwind's rounded-md */
     /* Default (light mode) */
     background-color: #ffffff; /* bg-white */
     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
   }
   .dark :global(.leaflet-popup-content-wrapper) {
       background-color: #1f2937; /* dark:bg-gray-800 */
   }

   :global(.leaflet-popup-content) {
       /* Default (light mode) */
       color: #1f2937; /* text-gray-800 */
   }
   .dark :global(.leaflet-popup-content) {
       color: #e5e7eb; /* dark:text-gray-200 */
   }

   :global(.leaflet-popup-close-button) {
       /* Default (light mode) */
       color: #4b5563; /* text-gray-600 */
   }
   :global(.leaflet-popup-close-button:hover) {
       color: #111827; /* hover:text-gray-900 */
   }
   .dark :global(.leaflet-popup-close-button) {
       color: #9ca3af; /* dark:text-gray-400 */
   }
   .dark :global(.leaflet-popup-close-button:hover) {
       color: #ffffff; /* dark:hover:text-white */
   }

   /* Adjust attribution text color & make smaller */
    :global(.leaflet-control-attribution) {
        /* Default (light mode) */
        display: none;
        color: #4b5563; /* Slightly darker gray-600 for light */
        font-size: 0.65rem; /* Smaller font size (tweak as needed) */
        line-height: 0.9rem;
        background-color: transparent !important; /* Semi-transparent white bg */
        padding: 0 5px;
        border-radius: 3px;
    }
    .dark :global(.leaflet-control-attribution) {
        color: #9ca3af; /* gray-400 for dark */
        background-color: rgba(31, 41, 55, 0.1); /* Semi-transparent dark bg (gray-800) */
    }

    :global(.leaflet-control-attribution a) {
        /* Default (light mode) */
        color: transparent; /* blue-500 */
    }
    .dark :global(.leaflet-control-attribution a) {
        color: transparent; /* blue-400 */
    }

    /* Style Zoom Controls */
    :global(.leaflet-control-zoom a) {
        /* Default (light mode) */
        background-color: rgba(255, 255, 255, 0.8);
        color: #4b5563;
        border: none;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        margin-bottom: 1px;
        transition: all 0.2s ease;
    }
    .dark :global(.leaflet-control-zoom a) {
        background-color: rgba(31, 41, 55, 0.8);
        color: #e5e7eb;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    :global(.leaflet-control-zoom a:first-child) {
        border-top-left-radius: 0.375rem;
        border-top-right-radius: 0.375rem;
    }
    :global(.leaflet-control-zoom a:last-child) {
        border-bottom-left-radius: 0.375rem;
        border-bottom-right-radius: 0.375rem;
    }
    :global(.leaflet-control-zoom a:hover) {
        background-color: #ffffff;
        color: #4f46e5;
        transform: translateY(-1px);
    }
    .dark :global(.leaflet-control-zoom a:hover) {
        background-color: #374151;
        color: #a5b4fc;
    }
</style>
