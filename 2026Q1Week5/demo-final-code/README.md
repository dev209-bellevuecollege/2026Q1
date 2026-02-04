# React Demo - Final Code

This is the completed code from the Week 5 live demo.

## How to Use This Code

If you're starting fresh, create a new Vite project first:

```bash
npm create vite@latest react-demo -- --template react
cd react-demo
npm install
```

Then copy these files into your project:

1. Replace `src/App.jsx` with the one from this folder
2. Replace `src/main.jsx` with the one from this folder
3. Replace `src/index.css` with the one from this folder
4. Copy the entire `src/components/` folder

Then run:

```bash
npm run dev
```

## Files Included

```
src/
├── main.jsx           # React entry point
├── App.jsx            # Main component with team data
├── index.css          # Global styles
└── components/
    ├── Header.jsx     # Header component
    ├── Footer.jsx     # Footer component
    └── Card.jsx       # Reusable Card component with props
```

## Concepts Demonstrated

- **Project Setup**: Vite + React
- **JSX Syntax**: HTML-like code in JavaScript
- **Components**: Function components returning JSX
- **Props**: Passing data to components
- **Lists**: Using map() with key prop
- **Composition**: Building UI from smaller pieces
