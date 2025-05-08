import adapter from '@sveltejs/adapter-static';

// This will get the repository name from the GITHUB_REPOSITORY environment variable
// which is automatically set by GitHub Actions.
// Format: 'owner/repository-name'
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null, // or 'index.html' / '200.html' for SPA-like behavior
      precompress: false,
      strict: true
    }),
    paths: {
      // Set the base path if deploying to a subfolder, e.g., user.github.io/my-repo/
      // This ensures all links and asset paths are correct.
      // Only apply this in production builds for GitHub Pages.
      base: process.env.NODE_ENV === 'production' && repoName ? `/${repoName}` : ''
    }
  }
  // ... other configurations
};

export default config;