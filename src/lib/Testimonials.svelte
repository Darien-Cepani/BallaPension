<script>
  // Sample Testimonial Data - Reworked for Google Review style

  const base = import.meta.env.BASE_URL

  const testimonials = [
    {
      id: 1,
      name: 'Alex P.',
      quote: 'Fantastic service! They helped me navigate the complex pension process with ease and got me a great result.',
      image: `${base}images/avatar1.jpg`, // Placeholder, can be a generic avatar if real ones aren't available
      stars: 5,
      date: '3 weeks ago',
    },
    {
      id: 2,
      name: 'Maria K.',
      quote: 'Highly recommended. Professional, efficient, and always kept me informed. Made a stressful situation much easier.',
      image: `${base}images/avatar2.jpg`,
      stars: 5, 
      date: '1 month ago',
    },
    {
      id: 3,
      name: 'John S.',
      quote: 'I was unsure about my pension rights, but BallaPension clarified everything and fought for my claim successfully.',
      image: `${base}images/avatar3.jpg`,
      stars: 4,
      date: '2 months ago',
    },
    {
      id: 4,
      name: 'Elena G.',
      quote: 'Excellent communication and expertise. Very happy with the outcome. Thank you BallaPension!',
      image: `${base}images/avatar4.jpg`,
      stars: 5,
      date: '1 week ago',
    },
    {
      id: 5,
      name: 'Nikos V.',
      quote: 'A truly professional team that delivered on their promises. Made the whole process straightforward.',
      image: `${base}images/avatar5.jpg`,
      stars: 5,
      date: '3 days ago',
    },
    {
      id: 6,
      name: 'Sophia L.',
      quote: 'They took the weight off my shoulders and handled everything perfectly. Five stars from me!',
      image: `${base}images/avatar6.jpg`,
      stars: 5,
      date: '2 weeks ago',
    },
  ];
</script>

<div id="testimonials" class="relative isolate overflow-hidden bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
      <h2 class="text-xl font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
        Testimonials
      </h2>
      <h2 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Valued Feedback from Our Clients
      </h2>
      <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
        Discover what our clients are saying. Real experiences, real results.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each testimonials as testimonial, i (testimonial.id)}
        <div class="break-inside-avoid bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <div class="flex items-center mb-4">
            <img class="h-12 w-12 rounded-full object-cover mr-4" src={testimonial.image} alt="{testimonial.name}" />
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
              <div class="flex items-center">
                {#each Array(5) as _, starIndex}
                  <svg aria-hidden="true" class="h-5 w-5 {starIndex < testimonial.stars ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.28 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
                <p class="ml-2 text-sm text-gray-500 dark:text-gray-400">{testimonial.stars} out of 5</p>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{testimonial.date}</p>
            </div>
          </div>
          <blockquote class="text-gray-700 dark:text-gray-300">
            <p>"{testimonial.quote}"</p>
          </blockquote>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-4">via BallaPension Platform</p> 
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  /* CSS is now fully handled by Tailwind utility classes in the HTML. */
</style>
