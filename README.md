# The Source Longevity Website

A modern, professional static website for The Source Longevity, a regenerative medicine practice. Built with vanilla HTML, CSS, and JavaScript for easy deployment to GitHub Pages.

## Features

- **Fully Responsive** - Mobile-first design with breakpoints at 768px and 1024px
- **Modern Design** - Clean, professional aesthetic with smooth animations
- **Accessible** - Semantic HTML5, ARIA labels, and WCAG AA compliant colors
- **No Dependencies** - Pure HTML, CSS, and JavaScript (no frameworks required)
- **GitHub Pages Ready** - Static files only, relative links throughout

## Pages

1. **index.html** - Homepage with hero, services overview, testimonials, and CTAs
2. **services.html** - Detailed service offerings with benefits and images
3. **about.html** - Founder story, team members, and company mission
4. **contact.html** - Contact form, business hours, FAQ accordion
5. **membership.html** - Pricing tiers, benefits comparison, membership FAQ

## Project Structure

```
the-source-longevity/
├── index.html
├── services.html
├── about.html
├── contact.html
├── membership.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── images/
    └── (placeholder - using external Unsplash URLs)
```

## Brand Colors

```css
:root {
  --source-deep: #0B2615;      /* Primary Dark */
  --vitality-green: #1A4D2E;   /* Primary Brand */
  --renewal: #2D6B45;          /* Accent */
  --sage-calm: #7D8B6A;        /* Muted */
  --pure-light: #E8E4D9;       /* Light backgrounds */
  --carbon: #1A1A1A;           /* Primary text */
  --slate: #4A4A4A;            /* Secondary text */
}
```

## Typography

- **Headings**: Cormorant Garamond (Google Fonts)
- **Body**: Inter (Google Fonts)

## Deployment to GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Under "Source", select "Deploy from a branch"
4. Select "main" branch and "/ (root)" folder
5. Click Save
6. Your site will be available at `https://[username].github.io/[repo-name]/`

## Local Development

Simply open `index.html` in a web browser. No build process or server required.

For live reload during development, you can use any simple HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

## JavaScript Features

- **Mobile Navigation** - Hamburger menu with slide-out drawer
- **Smooth Scrolling** - Anchor links scroll smoothly
- **Testimonial Slider** - Auto-rotating with touch swipe support
- **FAQ Accordion** - Expandable/collapsible FAQ items
- **Form Validation** - Client-side validation with error messages
- **Scroll Animations** - Fade-in effects on scroll
- **Sticky Header** - Header background changes on scroll

## Production Notes

### Forms
Contact forms use `action="#"` for demo purposes. For production, integrate with:
- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [Basin](https://usebasin.com/)

### Images
Currently using Unsplash placeholder images. For production:
1. Replace with actual clinic/team photos
2. Optimize images for web (WebP format recommended)
3. Host images locally in the `/images` folder

### Map
The contact page has a map placeholder. For production:
1. Get a Google Maps API key
2. Replace the placeholder div with an embedded Google Map
3. Or use a static map image

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

This project is proprietary. All rights reserved.
