# SALES – Social Advancement for Livelihood and Educational Support

A modern, responsive web application for SALES, an organization dedicated to empowering marginalized communities, especially children and persons with disabilities, through inclusive health, education, and livelihood services.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [SEO & Best Practices](#seo--best-practices)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project is a React-based website for SALES, a non-profit organization. The site provides information about SALES' mission, programs, donation options, and blog posts. It is designed for accessibility, SEO, and ease of use, and is statically hosted (e.g., on Vercel).

## Features
- **Responsive Design:** Mobile-friendly and accessible UI using Bootstrap 5.
- **Dynamic Routing:** Uses React Router for navigation between main pages and blog posts.
- **Donation Form:** Secure, validated donation form with multi-currency support and email notifications via EmailJS.
- **Blog Section:** Informative blog posts about SALES' work and impact.
- **SEO Optimized:** Meta tags, sitemap, robots.txt, and semantic HTML for better search engine visibility.
- **Image Assets:** Optimized images for fast loading and social sharing.
- **Accessibility:** Uses semantic HTML and alt text for images.

## SEO & Best Practices
- Meta tags for title, description, Open Graph, and Twitter Card are set in `public/index.html`.
- Sitemap (`public/sitemap.xml`) and robots.txt (`public/robots.txt`) included for search engine crawling.
- Each route/page can have unique meta tags using `react-helmet` (recommended for further improvement).
- All images use descriptive `alt` attributes.
- Mobile-friendly and fast-loading (Bootstrap, code splitting).
- Structured data (JSON-LD) can be added for rich results.

## Project Structure
```
public/
  favicon.ico           # Site favicon
  index.html            # Main HTML template (meta tags, SEO)
  logo192.png, logo512.png  # App icons
  manifest.json         # PWA manifest
  robots.txt, sitemap.xml   # SEO files
src/
  App.js                # Main app component
  index.js              # Entry point, routing setup
  assets/               # Images and static assets
  components/           # Reusable UI components (Navbar, Footer, Feature, etc.)
  containers/           # Main sections/pages (Header, Blog, Features, Possibility, etc.)
    blog/               # Blog list
    blogpost/           # Blog post details
    features/           # Features section
    footer/             # Footer section
    header/             # Header/hero section
    possibility/        # Donation form and info
    whatGPT3/           # About SALES section
```

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `build` folder. Optimizes for best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm test`
Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deployment
- The app is ready for static hosting (e.g., Vercel, Netlify).
- To deploy, run `npm run build` and upload the contents of the `build` folder to your static host.
- Update your domain/subdomain settings as needed.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
