# Demo 3b: CORS Client + Server

**Lecture Part:** Part 4 — CORS Deep Dive (after Demo 3)
**Time:** ~7 minutes
**Files:** `server.js`, `client.html`

---

## Pre-Demo Setup

1. Install dependencies:
   ```bash
   cd demos/demo3b-cors-server
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
   You should see:
   ```
   API server running on http://localhost:3001
   Client server running on http://localhost:3000
   ```
3. Open http://localhost:3000 in Chrome
4. Open DevTools **Console** tab
5. Keep the terminal visible — server logs are part of the demo

---

## The Demo (7 minutes)

### Step 1: Show the Architecture (30 seconds)

Point to the origin info box at the top.

**Say:** *"We have TWO servers running. Our web page is served from port 3000, and the API lives on port 3001. Different ports means different origins — so any fetch from our page to the API is a cross-origin request."*

### Step 2: Blocked Request — No CORS Headers (1 minute)

1. Click **Fetch** on card 1 ("No CORS Headers")
2. **Result: CORS ERROR!** — Red error box
3. Show the DevTools Console — point to the CORS violation

**Say:** *"The API server returned perfectly good JSON, but the browser refused to let our JavaScript read it. Why? Because the response didn't include an Access-Control-Allow-Origin header."*

### Step 3: Fixed with CORS Header (1.5 minutes)

1. Click **Fetch** on card 2 ("With CORS Header")
2. **Result: SUCCESS** — Green box with JSON data
3. Scroll down to the "Server Code" section — show the two endpoints side by side

**Say:** *"Same server, same data. The only difference is one line: `res.set('Access-Control-Allow-Origin', 'http://localhost:3000')`. That tells the browser: 'yes, this origin is allowed to read my response.' That's all CORS is — a permission header."*

### Step 4: Fixed with Proxy (1.5 minutes)

1. Click **Fetch** on card 3 ("Same-Origin Proxy")
2. **Result: SUCCESS** — Green box with JSON data
3. Point to the URL: it's `/api/proxy`, a relative URL — same origin

**Say:** *"This time we didn't fetch the API directly. We asked OUR server to fetch it for us. Server-to-server requests don't have CORS — that's a browser-only security feature. The browser just sees a request to localhost:3000, which is the same origin."*

### Step 5: Show the Terminal (1 minute)

Switch to the terminal where `npm start` is running. Show all 3 logged requests.

**Say:** *"Look at the terminal. The API server received ALL THREE requests. Even the one that got the CORS error — the server processed it and sent a response. The browser blocked our code from reading the response, but the request absolutely went through. This is important: CORS doesn't prevent the request, it prevents the response from being read."*

### Step 6: Pros & Cons of Proxy (1 minute)

Scroll to the "Proxy Approach: Pros & Cons" panel at the bottom.

**Say:** *"The proxy pattern is super common — it's what Vite's dev proxy does, and many production apps use it too. The big advantage is it works with ANY API, even ones you don't control. The trade-off is extra latency and your server handling all the traffic. If you control the API, just add the CORS header — it's simpler."*

---

## Key Points to Emphasize

1. **CORS is just an HTTP header** — one line on the server fixes it
2. **The browser blocks the response, not the request** — the terminal proves it
3. **Server-to-server has no CORS** — it's purely a browser security feature
4. **Two valid fixes:** CORS headers (when you control the API) or proxy (when you don't)
5. **Don't use `Access-Control-Allow-Origin: *` with credentials** — be specific about allowed origins

---

## Common Student Questions

**Q: "Why not just use `*` instead of specifying the origin?"**
A: `*` works for public APIs, but if you need to send cookies or auth headers, browsers require the specific origin — `*` won't work with `credentials: 'include'`.

**Q: "Is the proxy approach a hack?"**
A: No — it's a legitimate, widely-used pattern. Vite, Next.js, and nginx all support it. In production, you'd use a reverse proxy like nginx or your backend framework's proxy middleware.

**Q: "Do I need CORS for my own API if it's on the same domain?"**
A: No. Same origin (same protocol + domain + port) means no CORS restrictions at all. This is why deploying your frontend and API on the same domain simplifies things.

---

## Transition

*"So we've seen two ways to fix CORS: adding the header on the server, or proxying through your own server. Both are valid depending on whether you control the API. Now let's look at another security concern — what happens when secrets end up in your frontend code."*
