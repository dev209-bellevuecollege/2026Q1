# Demo 1: XSS Playground

**Lecture Part:** Part 2 — Cross-Site Scripting (XSS)
**Time:** ~8 minutes
**Files:** `vulnerable.html`, `safe.html`

---

## Pre-Demo Setup

1. Open both files in your browser (just double-click or `open vulnerable.html`)
2. Have both tabs ready to switch between
3. Open DevTools Console in the vulnerable tab

> **Tip:** Use a split-screen setup — vulnerable on left, safe on right — so students can see the contrast in real time.

---

## Part A: The Vulnerable Page (5 minutes)

### Step 1: Normal Search (30 seconds)

1. Open `vulnerable.html`
2. Type **"laptop"** in the search box and click Search
3. Show students: "This works perfectly. Normal text renders fine."

**Say:** *"This is a simple search page. Type a query, it shows your results. Looks harmless, right?"*

### Step 2: Basic XSS — Alert Box (1 minute)

1. Clear the search box
2. Paste this payload:
   ```
   <img src=x onerror="alert('XSS!')">
   ```
3. Click Search
4. **The alert box fires!**

**Say:** *"Whoa. We just typed HTML into a search box and the browser executed it. This is XSS — Cross-Site Scripting. The page used innerHTML to render our input, so the browser treated it as real HTML."*

**Key point:** *"Notice I didn't even use a `<script>` tag. The `onerror` attribute on an `<img>` tag is enough. Attackers have dozens of ways to trigger JavaScript without `<script>`."*

### Step 3: Cookie Theft (1 minute)

1. Paste this payload:
   ```
   <img src=x onerror="alert('Stolen cookies: ' + document.cookie)">
   ```
2. Click Search
3. **Alert shows the actual cookies set on the page**

**Say:** *"In a real attack, instead of alert(), the attacker would use fetch() to send your cookies to their server. One line of code and your session is hijacked."*

### Step 4: Page Defacement (1 minute)

1. Paste this payload:
   ```
   <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:red;color:white;font-size:3rem;display:flex;align-items:center;justify-content:center;z-index:9999">HACKED</div>
   ```
2. Click Search
3. **The entire page turns red with "HACKED" displayed**

**Say:** *"This is page defacement. The attacker injected a full-screen div. Imagine this on a banking website — they could create a fake login form that captures real passwords."*

### Step 5: URL-Based Attack (1 minute)

1. Show students the URL bar — notice the `?q=` parameter
2. Copy the URL with an XSS payload
3. **Say:** *"Now imagine I email this link to someone. They click it, the page loads, and the script runs automatically. They didn't type anything — the attack was in the URL."*
4. This demonstrates **Reflected XSS** — the payload comes from the URL

---

## Part B: The Safe Page (3 minutes)

### Step 1: Same Payloads, Different Result

1. Switch to `safe.html`
2. Paste the same XSS payloads from above
3. **The HTML tags show up as plain text — no alert, no defacement**

**Say:** *"Same user input, completely different result. The safe version uses textContent instead of innerHTML. textContent treats EVERYTHING as plain text — it escapes the HTML characters so they display literally instead of being parsed."*

### Step 2: Compare the Code

Scroll down to the code panels on both pages:

- **Vulnerable:** `el.innerHTML = \`Results for: ${query}\``
- **Safe:** `h3.textContent = \`Showing results for: ${query}\``

**Say:** *"One property name. That's the difference between a secure app and a hackable one. innerHTML parses HTML. textContent does not."*

### Step 3: The DOM Method Approach

**Say:** *"The safe version also uses document.createElement() to build elements. This is the safest approach because you're creating nodes directly — there's no string parsing involved."*

---

## Console Demo (Optional, 2 minutes)

If you have extra time, do this in the DevTools console on any page:

```javascript
// Create a test element
let div = document.createElement('div');
document.body.appendChild(div);

// DANGEROUS: innerHTML
div.innerHTML = '<img src=x onerror="alert(1)">';
// Alert fires!

// SAFE: textContent
div.textContent = '<img src=x onerror="alert(1)">';
// Shows as plain text
```

---

## Key Takeaways to Emphasize

1. **innerHTML is the classic XSS vector** — never use it with user input
2. **Attackers don't need `<script>` tags** — `onerror`, `onload`, `onfocus`, and dozens of other event handlers work
3. **textContent is always safe** for displaying user-supplied text
4. **URL parameters are user input too** — don't trust them
5. **React protects you** — JSX uses textContent-like escaping by default

---

## Transition to Next Section

*"So how do we add another layer of defense? What if someone finds a way to inject a script despite our best efforts? That's where Content Security Policy comes in — a header that tells the browser what scripts are allowed to run."*
