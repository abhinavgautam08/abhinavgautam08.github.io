# Portfolio Website

This is the source code for my personal portfolio website, designed to showcase my projects, skills, and certifications. It is built using vanilla HTML, CSS, and JavaScript, focusing on performance, responsiveness, and clean aesthetics.

## Web Structure

The website follows a Single Page Application (SPA)-like structure using hash-based routing. This ensures smooth navigation without page reloads.

### Files Overview

- **`index.html`**: The main structure of the website. It contains specific sections for Home, Projects, Skills, Certificates, Contact, and Sponsor. The content for dynamic sections is loaded via JavaScript.
- **`style.css`**: Contains all the styling for the website, including responsive design rules, dark/light theme variables, and animations.
- **`script.js`**: Handles all the logic, including:
    - **Navigation**: Smooth scrolling and active link highlighting.
    - **Theme Toggle**: Switch between Dark and Light modes (saved in LocalStorage).
    - **Dynamic Content**: Fetches and renders Projects, Skills, and Certificates from an external API (Cloudflare Worker).
    - **Avatar Interaction**: Double-click to cycle through avatars.
    - **Mobile Menu**: Toggle functionality for smaller screens.

### Key Features

- **Responsive Design**: Fully adaptable layout for Desktop, Tablet, and Mobile.
- **Theme System**: Built-in Dark and Light mode support with persistent preference.
- **Dynamic Data**: Content is fetched dynamically, making it easy to update without changing the HTML.
- **Contact Form**: Integrated with a backend service for receiving messages.
- **Performance**: Minimal dependencies, ensuring fast load times.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/abhinavgautam08/Portfolio.git
   ```
2. Open `index.html` in your browser.

## Hosting

This website is designed to be hosted on GitHub Pages or any static site hosting provider.
