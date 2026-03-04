# Week 9 Live Demo Guide: Web Security for Frontend Developers

**Total Demo Time: ~25-30 minutes across the lecture**

This guide covers all five interactive demos for the web security lecture. Each demo has its own folder with runnable HTML files and a detailed WALKTHROUGH.md. Demos are designed to be shown during the corresponding lecture section.

---

## Pre-Lecture Setup Checklist

- [ ] Open all 5 demo HTML files in separate Chrome tabs
- [ ] Open DevTools in each tab (you'll need Console, Sources, Application, and Network tabs at various points)
- [ ] Have a stable internet connection (Demo 3 makes live API calls)
- [ ] Run `npm install && npm start` in `demos/demo3b-cors-server/` (Demo 3b needs the server running)
- [ ] Clear browser storage: DevTools → Application → Clear site data
- [ ] Optional: Have a React project ready for the .env bonus demo (Demo 4)
- [ ] Test that all demos load correctly before class

---

## Demo Schedule

| Demo | Lecture Part | Time | Files |
|------|------------|------|-------|
| [Demo 1: XSS Playground](#demo-1-xss-playground) | Part 2 — XSS | 8 min | `demos/demo1-xss-playground/` |
| [Demo 2: CSP in Action](#demo-2-csp-in-action) | Part 3 — CSP | 5 min | `demos/demo2-csp/` |
| [Demo 3: CORS Explorer](#demo-3-cors-explorer) | Part 4 — CORS | 5 min | `demos/demo3-cors-explorer/` |
| [Demo 3b: CORS Server](#demo-3b-cors-client--server) | Part 4 — CORS | 7 min | `demos/demo3b-cors-server/` |
| [Demo 4: Secrets Finder](#demo-4-secrets-finder) | Part 5 — Secrets | 5 min | `demos/demo4-secrets-exposed/` |
| [Demo 5: Token Storage](#demo-5-token-storage) | Part 6 — Auth | 5 min | `demos/demo5-auth-token-storage/` |

---

## Demo 1: XSS Playground

**Files:** `demos/demo1-xss-playground/vulnerable.html`, `safe.html`
**Detailed guide:** `demos/demo1-xss-playground/WALKTHROUGH.md`

### Quick Version (3 minutes)

1. Open `vulnerable.html`
2. Search for `laptop` — works normally
3. Search for `<img src=x onerror="alert('XSS!')">` — **alert fires!**
4. Search for `<img src=x onerror="alert(document.cookie)">` — **cookies stolen!**
5. Switch to `safe.html` — same payload shows as plain text
6. **Lesson:** innerHTML = dangerous, textContent = safe

### XSS Payloads to Copy-Paste

```
<img src=x onerror="alert('XSS!')">
```

```
<img src=x onerror="alert('Stolen: ' + document.cookie)">
```

```
<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:red;color:white;font-size:3rem;display:flex;align-items:center;justify-content:center;z-index:9999">HACKED</div>
```

---

## Demo 2: CSP in Action

**Files:** `demos/demo2-csp/no-csp.html`, `with-csp.html`
**Detailed guide:** `demos/demo2-csp/WALKTHROUGH.md`

### Quick Version (3 minutes)

1. Open `no-csp.html` — both auto-tests show EXECUTED, click all 4 buttons to show everything runs
2. Open `with-csp.html` — inline script **BLOCKED**, nonced script **ALLOWED**
3. Click the **same 4 buttons** — all **BLOCKED** (6 cards match between pages: same tests, different results)
4. Open DevTools Console on the CSP page — show the red violation errors
5. **Lesson:** CSP is a browser-enforced allowlist for scripts

### Key CSP Policy Shown

```
default-src 'self'; script-src 'self' 'nonce-demo123'; style-src 'self' 'unsafe-inline'
```

---

## Demo 3: CORS Explorer

**Files:** `demos/demo3-cors-explorer/cors-explorer.html`
**Detailed guide:** `demos/demo3-cors-explorer/WALKTHROUGH.md`

### Quick Version (3 minutes)

1. Open `cors-explorer.html`
2. Click **Fetch** on GitHub API — **SUCCESS** (they allow CORS with `*`)
3. Click **Fetch** on Google.com — **CORS ERROR!**
4. Open DevTools Console to show the actual error
5. **Lesson:** CORS is enforced by the browser; fix it on the server

### Important Note

This demo requires an internet connection for the live API calls.

---

## Demo 3b: CORS Client + Server

**Files:** `demos/demo3b-cors-server/server.js`, `client.html`
**Detailed guide:** `demos/demo3b-cors-server/WALKTHROUGH.md`

### Setup (before lecture)

```bash
cd demos/demo3b-cors-server
npm install
npm start
```

Open http://localhost:3000 in Chrome. Keep the terminal visible.

### Quick Version (5 minutes)

1. Point to origin box — client on :3000, API on :3001, different ports = different origins
2. Click **Fetch** on card 1 (No CORS Headers) — **CORS ERROR!** (red)
3. Click **Fetch** on card 2 (With CORS Header) — **SUCCESS** (green)
4. Scroll to server code display — show the one-line difference: `res.set('Access-Control-Allow-Origin', ...)`
5. Click **Fetch** on card 3 (Same-Origin Proxy) — **SUCCESS** (green)
6. Switch to terminal — all 3 requests are logged (proves browser blocks response, not request)
7. Scroll to Proxy Pros & Cons panel
8. **Lesson:** Fix CORS with headers (when you control the API) or proxy (when you don't)

### Important Note

This demo requires Node.js and `npm install` before class. Unlike the other demos, it cannot be opened as a standalone HTML file.

---

## Demo 4: Secrets Finder

**Files:** `demos/demo4-secrets-exposed/secrets-finder.html`
**Detailed guide:** `demos/demo4-secrets-exposed/WALKTHROUGH.md`

### Quick Version — Instructor Demo (3 minutes)

1. Open `secrets-finder.html`
2. Right-click → View Page Source
3. Ctrl+F search for "secret" → find Stripe key and MongoDB URL
4. Search for "ghp_" → find GitHub token in HTML comment
5. Search for "aws" → find AWS secret in data attribute
6. **Lesson:** All frontend code is public — anyone can View Source

### Quick Version — Student Activity (5-10 minutes)

1. Students open the file on their machines
2. Race to find all 4 secrets
3. Enter them in the answer box
4. First to find all 4 wins
5. Debrief: discuss WHERE each secret was hidden

### The 4 Secrets

| # | Secret | Location |
|---|--------|----------|
| 1 | `sk_test_FAKE_demo_key_do_not_use_1234` | JavaScript variable |
| 2 | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` | HTML data attribute |
| 3 | `mongodb+srv://admin:P@ssw0rd123@cluster0.abc.mongodb.net` | JavaScript variable |
| 4 | `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx1234` | HTML comment |

---

## Demo 5: Token Storage

**Files:** `demos/demo5-auth-token-storage/token-storage.html`
**Detailed guide:** `demos/demo5-auth-token-storage/WALKTHROUGH.md`

### Quick Version (3 minutes)

1. Open `token-storage.html`
2. Click **Set Token** on all three storage types
3. Click **Set "HttpOnly"** — shows it can't be done from JS (that's the point!)
4. Click **Run XSS Attack Simulation**
5. Watch the log: localStorage **STOLEN**, sessionStorage **STOLEN**, HttpOnly **SAFE**
6. **Lesson:** HttpOnly cookies protect tokens from XSS

### Open DevTools Application Tab

Show students:
- **Local Storage** → token visible in plain text
- **Session Storage** → token visible in plain text
- **Cookies** → regular cookie visible, HttpOnly cookies would show a checkmark in the HttpOnly column (requires server to set)

---

## Bonus Demos (If Time Permits)

### Inspect Real CSP Headers

1. Go to github.com
2. DevTools → Network → Click main document
3. Find `Content-Security-Policy` in Response Headers
4. It's massive — shows how seriously large companies take CSP

### npm Audit

```bash
# In any React project
ls node_modules | wc -l    # Usually 800+
npm audit                   # Check for known vulnerabilities
```

### .env Exposure in Vite Build

```bash
# Setup
npm create vite@latest env-demo -- --template react
cd env-demo && npm install
echo "VITE_API_KEY=super_secret_key_12345" > .env

# Build and search
npm run build
grep -r "super_secret_key_12345" dist/
# The key appears in the built JS file!
```

---

## Troubleshooting

### "Demo files won't open"
The HTML files are standalone — just double-click to open in Chrome. No server needed.

### "CORS demo shows different errors"
CORS error messages vary by browser. Chrome gives the most detailed messages. Use Chrome for this demo.

### "CSP demo scripts all run"
Make sure you're on `with-csp.html`, not `no-csp.html`. Check that the `<meta>` CSP tag is present.

### "Secrets challenge — students find them too fast"
Good! That's the point. Emphasize how EASY it was: *"That took you 30 seconds. Now imagine what a motivated attacker can do."*
