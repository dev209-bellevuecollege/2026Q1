# Demo 4: Secrets Exposed — Find the Hidden API Keys

**Lecture Part:** Part 5 — Secrets & Supply Chain Security
**Time:** ~5 minutes (or as a student activity)
**Files:** `secrets-finder.html`

---

## Pre-Demo Setup

1. Open `secrets-finder.html` in Chrome
2. **Don't** open DevTools yet — let students discover the techniques
3. This can be done as a live instructor demo OR as a quick student activity (have students open the file on their own machines)

---

## Option A: Instructor Demo (5 minutes)

### Step 1: Set the Stage (30 seconds)

**Say:** *"This is a weather dashboard app. Looks normal, right? But the developer made some classic mistakes — they left 4 secrets in the frontend code. Let's find them."*

### Step 2: View Source (1 minute)

1. Right-click → **View Page Source** (or Ctrl+U / Cmd+U)
2. Press Ctrl+F / Cmd+F to search
3. Search for **"secret"**

**Finds:**
- `STRIPE_SECRET_KEY` in a script tag — *"There it is! A Stripe secret key right in the JavaScript. Anyone viewing this page can see it."*
- `data-aws-secret` attribute on a hidden div — *"Secret in an HTML attribute! The div is hidden with display:none, but the HTML is still there."*

4. Search for **"password"** or **"mongodb"**

**Finds:**
- `DATABASE_URL` with credentials — *"A database connection string with a username AND password. In frontend code. Anyone can connect to this database."*

5. Search for **"TODO"** or **"ghp_"**

**Finds:**
- HTML comment with GitHub token — *"HTML comments ship to the browser too! This developer left a note to 'move this to .env before deploying' — and then deployed anyway."*

### Step 3: Enter the Secrets (1 minute)

Copy-paste each secret into the answer box to show the scoreboard updating.

### Step 4: The Lesson (1 minute)

**Say:** *"Every technique I just used — View Source, Ctrl+F, reading JavaScript variables — takes about 30 seconds. This is not advanced hacking. This is what ANYONE can do to ANY website. If a secret is in your frontend code, it is PUBLIC."*

Key points:
- **Hidden divs are NOT hidden** — `display:none` hides from the visual page, not from the source
- **HTML comments ship to production** — they're in the downloaded HTML
- **Minification doesn't help** — Ctrl+F still finds string values
- **data attributes are readable** — DevTools Elements panel shows everything

### Step 5: What Should Have Been Done (1 minute)

**Say:** *"None of these secrets should be in frontend code. The Stripe secret key belongs on the server. The database URL belongs on the server. The GitHub token belongs in a CI/CD environment variable. The public Stripe key (pk_weather_abc123) — THAT one is fine because it's designed to be public."*

---

## Option B: Student Activity (5-10 minutes)

1. Have students open `secrets-finder.html` on their own machines
2. Give them 5 minutes to find all 4 secrets
3. First student to find all 4 wins
4. Debrief: ask each student HOW they found each secret

---

## Bonus: Live Vite/React .env Demo (5 minutes)

If you want to go deeper, do this live:

### Setup (before class)

```bash
npm create vite@latest env-demo -- --template react
cd env-demo
npm install
```

### Create a .env file

```bash
echo "VITE_API_KEY=super_secret_key_12345" > .env
echo "VITE_API_URL=https://api.example.com" >> .env
```

### Add the env var to App.jsx

```jsx
function App() {
  return (
    <div>
      <h1>My App</h1>
      <p>API URL: {import.meta.env.VITE_API_URL}</p>
    </div>
  );
}
export default App;
```

### Build and search the output

```bash
npm run build
grep -r "super_secret_key_12345" dist/
```

**Say:** *"There it is — in the built JavaScript file. The .env file kept it out of git, but the build tool copied the VALUE directly into the bundle. Anyone who downloads this file can find it."*

### Show the solution: backend proxy

Draw this on the whiteboard:
```
React App  →  YOUR Server  →  Third-Party API
(no key)      (has key)       (needs key)
```

**Say:** *"The fix: your React app calls YOUR server at /api/weather. Your server has the real API key and calls the weather API. The key never touches the browser."*

---

## npm Audit Demo (Optional, 2 minutes)

Open any React project and run:

```bash
# How many packages are installed?
ls node_modules | wc -l
# Output: often 800+!

# Check for known vulnerabilities
npm audit
```

**Say:** *"You have over 800 packages in node_modules. Every one of those ran code on your machine during npm install. npm audit checks them against a database of known vulnerabilities."*

---

## Key Takeaways

1. **All frontend code is public** — View Source takes 2 seconds
2. **Minification ≠ security** — strings are still searchable
3. **Hidden elements are NOT hidden** from source code
4. **HTML comments ship to production** — don't leave TODOs with secrets
5. **.env in React/Vite is NOT secret** — values are bundled into JS
6. **Use a backend proxy** for real API secrets
7. **npm audit** your dependencies regularly

---

## Transition

*"We've talked about protecting secrets in your code. Now let's talk about one specific secret that every app needs to protect: the user's authentication token. Where should you store it?"*
