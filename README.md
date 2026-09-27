# Harry Potter Character & Spell Finder

> **Status: Archived (September 2026).** An early learning project from August 2025, built while I was learning React. It's no longer maintained, but the live demo still runs at **https://hp-api-app.onrender.com**.

A React single-page app for browsing characters and spells from the Harry Potter universe, using data from the free, public [HP-API](https://hp-api.onrender.com/).

![Harry Potter Character & Spell Finder](https://raw.githubusercontent.com/jrwiegsDev/portfolio-site/main/public/hp-api-app.png)

## Features

- **Four views:** All Characters, Students, Staff, and a Book of Spells, each on its own route (React Router).
- **Search and filter:** Live search by name, plus Gryffindor / Slytherin / Hufflepuff / Ravenclaw house filters.
- **Character details:** Click any character card to open a modal with more information, with a placeholder image when the API has none.
- **Magic wand cursor:** A canvas-based particle trail that follows the mouse.

## Technologies Used

- **React 19** and **Vite**
- **React Router** for client-side routing
- **react-modal** for the character detail view
- **HTML Canvas** for the cursor effect
- **HP-API** (REST) for character and spell data

## Running locally

```bash
git clone https://github.com/jrwiegsDev/hp-api-app.git
cd hp-api-app
npm install
npm run dev
```

## API Acknowledgement

Character and spell data comes from the open-source [HP-API](https://hp-api.onrender.com/).
