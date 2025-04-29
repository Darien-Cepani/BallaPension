<script>
  import { onMount, onDestroy } from 'svelte';
  import L from 'leaflet'; 
  import 'leaflet/dist/leaflet.css';

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

</script>

<section id="contact" class="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
  <div class="container mx-auto px-4">
    <!-- Title Block -->
    <div bind:this={titleBlock} class="text-center mb-12">
      <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600 dark:text-indigo-400">
        Contact
      </h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white font-heading sm:text-4xl">
        Get in Touch
      </p>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Ready to discuss your pension needs? Contact us via phone or email, or find our location below.
      </p>
    </div>

    <!-- Contact Content: Map and CTAs -->
    <div bind:this={contactContent} class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
      
      <!-- Map Container -->
      <div id="map" class="w-full h-80 md:h-96 rounded-lg shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700 z-0">
        <!-- Leaflet map will render here -->
      </div>

      <!-- Contact Info & CTAs -->
      <div class="text-center md:text-left">
        <h3 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Contact Now!</h3>

        <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <a 
            href="tel:+301234567890" 
            class="cta-button bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm transition duration-150 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
            Speak on the phone
          </a>
          <a 
            href="mailto:info@ballapension.com"
            class="cta-button bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm transition duration-150 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            Send an email
          </a>
        </div>

        <p class="text-gray-700 dark:text-gray-300 mt-8 mb-2">
          Find us at our office:
        </p>
        <p class="text-lg font-medium text-gray-800 dark:text-white cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200" on:click={() => {
          const address = encodeURIComponent("123 Main Street, Athens, Greece 10557");
          const iOSUrl = `maps://maps.apple.com/?q=${address}`;
          const androidUrl = `https://maps.google.com/?q=${address}`;
          
          // Detect platform and open appropriate maps app
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            window.location.href = iOSUrl;
          } else {
            window.location.href = androidUrl;
          }
        }}>
          123 Main Street, Athens, Greece 10557
        </p>
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
