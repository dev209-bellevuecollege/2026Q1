# Demo 3: CORS Explorer

**Lecture Part:** Part 4 — CORS Deep Dive
**Time:** ~5 minutes
**Files:** `cors-explorer.html`

---

## Pre-Demo Setup

1. Open `cors-explorer.html` in Chrome
2. Open DevTools **Console** tab (CORS errors appear here)
3. Also have the **Network** tab ready (to show preflight OPTIONS requests)

> **Important:** This demo makes real network requests. You need an internet connection.

---

## The Demo (5 minutes)

### Step 1: Show the Current Origin (30 seconds)

Point to the "Your Current Origin" box at the top.

**Say:** *"This is our origin — the protocol, domain, and port of this page. Any request to a DIFFERENT origin is a cross-origin request and subject to CORS."*

If opened as a file:// URL: *"We're running from file://, which is a special case. For API testing, let's see which servers allow us."*

### Step 2: Successful Request — GitHub API (1 minute)

1. Click **Fetch** on the "GitHub API" card
2. **Result: SUCCESS** — The response data appears
3. Look at the Network Log at the bottom: it shows the response and `Access-Control-Allow-Origin: *`

**Say:** *"GitHub's API allows ANY origin to read its responses. See that header: Access-Control-Allow-Origin: *. The asterisk means 'everyone is welcome.' This is common for public APIs."*

### Step 3: CORS Error — Google.com (1 minute)

1. Click **Fetch** on the "Google.com" card
2. **Result: CORS ERROR!** — Red error box appears
3. Switch to DevTools Console — show the actual CORS error message

**Say:** *"Google's server didn't send an Access-Control-Allow-Origin header. So even though our browser sent the request and Google responded, the browser REFUSED to let our JavaScript read the response."*

**Key point:** *"The request DID go through. Google's server DID send a response. But the browser is protecting us — or rather, protecting Google's users. Without this, any website could read your Google search results, your Gmail, anything."*

### Step 4: Show the Network Tab (1 minute)

1. Open the Network tab in DevTools
2. Click the Google.com fetch button again
3. Show that the request appears in the network log with a `(blocked:mixed-content)` or CORS error marker
4. Click the request to show it was actually sent

**Say:** *"See? The request is here. The server responded. But look — no Access-Control-Allow-Origin header in the response. That's why the browser blocked our code from reading it."*

### Step 5: Try Another Public API (30 seconds)

1. Click **Fetch** on "JSONPlaceholder" or "Wikipedia"
2. Both succeed with CORS allowed

**Say:** *"Public APIs that are designed to be called from frontend code will set CORS headers. APIs that aren't designed for that won't."*

### Step 6: Custom URL (Optional, 1 minute)

Let students suggest a URL to try. Good ones to test:
- `https://httpbin.org/get` — Works (CORS allowed)
- `https://www.amazon.com` — Fails (no CORS headers)
- `https://pokeapi.co/api/v2/pokemon/pikachu` — Works

---

## Key Points to Emphasize

1. **CORS is enforced by the BROWSER, not the server** — the request goes through, the browser blocks the response
2. **Public APIs set `Access-Control-Allow-Origin: *`** — they're designed for cross-origin access
3. **Most websites don't allow CORS** — and for good reason (security)
4. **You fix CORS on the server** — the client can't bypass it (without a proxy)
5. **The error message tells you exactly what's wrong** — read it carefully

---

## Common Student Questions

**Q: "Why can I visit google.com in my browser but not fetch() it?"**
A: Typing a URL in the address bar is a navigation, not a cross-origin request. The Same-Origin Policy only restricts JavaScript from READING cross-origin responses. Your browser can always navigate to any URL.

**Q: "Can I just add a Chrome extension to fix CORS?"**
A: Extensions that disable CORS only work on YOUR machine. Your users won't have them. Fix it on the server.

**Q: "What about during development with React?"**
A: Use a dev proxy. In Vite, add a `proxy` config so `/api` routes get forwarded to your backend. The proxy runs on the same origin as your dev server, so no CORS.

---

## Transition

*"So CORS controls cross-origin data access. But there's another type of data exposure that's even more basic — secrets that you accidentally put INTO your frontend code. Let's talk about that."*
