# Week 5 Live Demo Guide: Introduction to React

**Total Demo Time: ~25-30 minutes**

This guide walks through creating a React project from scratch, demonstrating all major concepts from the lecture.

---

## Pre-Demo Setup (Before Class)

1. Make sure Node.js is installed: `node --version` (should be 18+)
2. Have VS Code open
3. Have a terminal ready
4. Clear any previous demo folders

---

## Part 1: Project Setup (5 minutes)

### Step 1.1: Create the Project

```bash
# Navigate to where you want to create the project
cd ~/Desktop

# Create a new React project with Vite
npm create vite@latest react-demo -- --template react

# Navigate into the project
cd react-demo

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Talking Points:**
- "Vite is our build tool - it handles all the complexity"
- "npm install downloads React and all dependencies to node_modules"
- "npm run dev starts our development server with hot reloading"

### Step 1.2: Open in Browser

- Open http://localhost:5173 in browser
- Show the default Vite + React page
- Open VS Code: `code .`

### Step 1.3: Tour the Project Structure

Show these files in VS Code:

```
react-demo/
├── index.html          <- The single HTML file (show the #root div)
├── package.json        <- Project config and scripts
├── src/
│   ├── main.jsx        <- Entry point (creates React root)
│   ├── App.jsx         <- Main component
│   └── App.css         <- Styles
```

**Show index.html:**
- Point out the empty `<div id="root"></div>`
- Point out the script tag loading main.jsx

**Show main.jsx:**
- Explain createRoot and render
- Explain StrictMode

---

## Part 2: JSX Basics (5 minutes)

### Step 2.1: Clean Up App.jsx

Replace the contents of `src/App.jsx` with:

```jsx
function App() {
  return (
    <div>
      <h1>Hello React!</h1>
      <p>Welcome to my first React app</p>
    </div>
  );
}

export default App;
```

**Save and show the browser update instantly (HMR)**

**Talking Points:**
- "This looks like HTML but it's actually JSX"
- "Notice we use className instead of class"
- "The function returns JSX - this is a component!"

### Step 2.2: Add JavaScript Expressions

Update `src/App.jsx`:

```jsx
function App() {
  const name = "INFO 340";
  const year = 2026;
  const students = 25;

  return (
    <div>
      <h1>Welcome to {name}!</h1>
      <p>Year: {year}</p>
      <p>We have {students} students enrolled</p>
      <p>Next year we'll have {students + 5} students!</p>
    </div>
  );
}

export default App;
```

**Talking Points:**
- "Curly braces let us embed JavaScript expressions"
- "Variables, math, function calls - anything that returns a value"
- "This is the power of JSX - mixing logic with markup"

---

## Part 3: Creating Components (7 minutes)

### Step 3.1: Create a Components Folder

```bash
mkdir src/components
```

### Step 3.2: Create a Header Component

Create `src/components/Header.jsx`:

```jsx
function Header() {
  return (
    <header style={{ backgroundColor: '#2563eb', color: 'white', padding: '1rem' }}>
      <h1>My React App</h1>
      <nav>
        <a href="#" style={{ color: 'white', marginRight: '1rem' }}>Home</a>
        <a href="#" style={{ color: 'white', marginRight: '1rem' }}>About</a>
        <a href="#" style={{ color: 'white' }}>Contact</a>
      </nav>
    </header>
  );
}

export default Header;
```

**Talking Points:**
- "Component names MUST start with a capital letter"
- "One component per file is best practice"
- "We export it so other files can import it"

### Step 3.3: Create a Footer Component

Create `src/components/Footer.jsx`:

```jsx
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '1rem', textAlign: 'center' }}>
      <p>&copy; {year} INFO 340. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
```

### Step 3.4: Use Components in App

Update `src/App.jsx`:

```jsx
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />

      <main style={{ padding: '2rem' }}>
        <h2>Welcome to React!</h2>
        <p>This is the main content area.</p>
      </main>

      <Footer />
    </div>
  );
}

export default App;
```

**Talking Points:**
- "We import components at the top"
- "Components are used like custom HTML tags: `<Header />`"
- "This is composition - building complex UIs from simple pieces"

---

## Part 4: Props (7 minutes)

### Step 4.1: Create a Card Component with Props

Create `src/components/Card.jsx`:

```jsx
function Card({ title, description, image }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1rem',
      maxWidth: '300px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img
        src={image}
        alt={title}
        style={{ width: '100%', borderRadius: '4px' }}
      />
      <h3 style={{ marginTop: '1rem' }}>{title}</h3>
      <p style={{ color: '#6b7280' }}>{description}</p>
    </div>
  );
}

export default Card;
```

**Talking Points:**
- "Props are passed from parent to child"
- "We destructure props in the function parameter: `{ title, description, image }`"
- "Props make components reusable with different data"

### Step 4.2: Use Card with Different Props

Update `src/App.jsx`:

```jsx
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';

function App() {
  return (
    <div>
      <Header />

      <main style={{ padding: '2rem' }}>
        <h2>Our Team</h2>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Card
            title="Alice Johnson"
            description="Frontend Developer specializing in React"
            image="https://picsum.photos/seed/alice/300/200"
          />

          <Card
            title="Bob Smith"
            description="Backend Developer who loves Node.js"
            image="https://picsum.photos/seed/bob/300/200"
          />

          <Card
            title="Carol White"
            description="Full Stack Developer and team lead"
            image="https://picsum.photos/seed/carol/300/200"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
```

**Talking Points:**
- "Same Card component, different data via props"
- "Strings use quotes, everything else uses curly braces"
- "This is the power of reusable components!"

---

## Part 5: Rendering Lists with map() (5 minutes)

### Step 5.1: Create Data Array

Update `src/App.jsx`:

```jsx
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';

function App() {
  // Our data array - this could come from an API!
  const teamMembers = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer specializing in React",
      image: "https://picsum.photos/seed/alice/300/200"
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Backend Developer who loves Node.js",
      image: "https://picsum.photos/seed/bob/300/200"
    },
    {
      id: 3,
      name: "Carol White",
      role: "Full Stack Developer and team lead",
      image: "https://picsum.photos/seed/carol/300/200"
    },
    {
      id: 4,
      name: "David Lee",
      role: "UX Designer with a passion for accessibility",
      image: "https://picsum.photos/seed/david/300/200"
    }
  ];

  return (
    <div>
      <Header />

      <main style={{ padding: '2rem' }}>
        <h2>Our Team ({teamMembers.length} members)</h2>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              title={member.name}
              description={member.role}
              image={member.image}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
```

**Talking Points:**
- "map() transforms each item in the array into a Card component"
- "The key prop helps React track which items changed - ALWAYS use unique IDs"
- "This pattern is used everywhere - todo lists, product grids, user tables"
- "Add a new item to the array and watch it appear automatically!"

### Step 5.2: Show the Key Warning (Optional)

Temporarily remove the `key={member.id}` line and show the console warning in DevTools.

---

## Part 6: Quick Build Demo (2 minutes)

### Step 6.1: Create Production Build

```bash
# Stop the dev server (Ctrl+C)

# Create production build
npm run build

# Show the dist folder
ls dist
ls dist/assets
```

**Talking Points:**
- "npm run build creates optimized files for production"
- "All our JSX is now regular JavaScript"
- "Files are minified and bundled - ready to deploy!"

### Step 6.2: Preview Production Build

```bash
npm run preview
```

Open http://localhost:4173 to show the production build.

---

## Wrap-Up Talking Points

1. **React = Components**: We built our UI from reusable pieces
2. **JSX = JavaScript + HTML**: Write markup in JavaScript with `{expressions}`
3. **Props = Data Flow**: Pass data from parent to child components
4. **map() = Lists**: Transform arrays into component lists with unique keys
5. **Vite = Development**: Handles all the build complexity for us

---

## Quick Reference: Common Mistakes to Avoid

| Mistake | Correct |
|---------|---------|
| `<card />` | `<Card />` (capital letter) |
| `class="box"` | `className="box"` |
| `<img>` | `<img />` (self-closing) |
| `onclick` | `onClick` (camelCase) |
| `Card()` | `<Card />` (JSX syntax) |
| No key in map | `key={item.id}` |

---

## If Time Permits: Bonus Demos

### Conditional Rendering

```jsx
function Card({ title, description, image, featured }) {
  return (
    <div style={{
      border: featured ? '2px solid gold' : '1px solid #e5e7eb',
      // ... rest of styles
    }}>
      {featured && <span style={{ color: 'gold' }}>⭐ Featured</span>}
      {/* ... rest of content */}
    </div>
  );
}
```

### Props with Default Values

```jsx
function Card({ title, description, image = "https://picsum.photos/300/200" }) {
  // image has a default if not provided
}
```
