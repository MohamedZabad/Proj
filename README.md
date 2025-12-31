# Game Browser – Full Stack Web App

This project is a full-stack web application that allows users to browse and explore video games, view details, and manage a wishlist. It was built as a learning project to practice frontend development with React and basic backend integration using Node.js and Express.

## Features
- Browse a list of games with filtering and search
- View detailed information for each game
- Add and remove games from a wishlist
- Client-side routing between pages
- API layer to separate data fetching logic from UI components

## Tech Stack
**Frontend**
- React (Create React App)
- React Router
- JavaScript (ES6+)
- CSS

**Backend**
- Node.js
- Express

## Project Structure
frontend/
├─ src/
│ ├─ components/
│ ├─ pages/
│ ├─ utils/
│ └─ data/
backend/
├─ server.js
├─ package.json

## How It Works
The React frontend handles all UI rendering, routing, and user interactions.  
The backend is a simple Express server that provides API endpoints used by the frontend.  
Data fetching is abstracted into a utility layer to keep components clean and focused on presentation.

## Running Locally
```bash
# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
npm install
npm start
