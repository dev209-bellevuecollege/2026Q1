# Demo 5: Auth Token Storage Comparison

**Lecture Part:** Part 6 — Authentication & Token Security
**Time:** ~5 minutes
**Files:** `token-storage.html`

---

## Pre-Demo Setup

1. Open `token-storage.html` in Chrome
2. Open DevTools → **Application** tab (this shows Storage: localStorage, sessionStorage, Cookies)
3. Clear any previous data: Application → Clear Storage → Clear site data

---

## The Demo (5 minutes)

### Step 1: Store Tokens in All Three Locations (1 minute)

1. Click **Set Token** under localStorage
2. Click **Set Token** under sessionStorage
3. Click **Set Regular** under Cookies
4. Click **Set "HttpOnly"** under Cookies

**Say:** *"I've stored the same JWT token in all three storage mechanisms. Now let's see what an attacker with XSS access can steal."*

**Point out the HttpOnly result:** *"Notice that clicking 'Set HttpOnly' shows a message: 'HttpOnly cookies can ONLY be set by the server.' JavaScript literally cannot create HttpOnly cookies. That's the whole point — they're invisible to JavaScript."*

### Step 2: Show DevTools Application Tab (1 minute)

Switch to DevTools → Application tab:

1. **Local Storage** → Click the origin → Show the auth_token sitting there in plain text
2. **Session Storage** → Same thing — token is visible
3. **Cookies** → Show the regular cookie

**Say:** *"Look at how easy this is to see. localStorage, sessionStorage — the tokens are right there. Any JavaScript on this page can read them."*

### Step 3: Simulate the XSS Attack (2 minutes)

1. Click the red **"Run XSS Attack Simulation"** button
2. Watch the activity log light up red

Walk through the results:

- **localStorage:** `STOLEN` — *"The attacker's script read it instantly."*
- **sessionStorage:** `STOLEN` — *"Same thing. sessionStorage is no safer against XSS."*
- **Regular cookie:** `STOLEN` — *"Regular cookies are readable via document.cookie."*
- **HttpOnly cookies:** `CANNOT be read` — *"Even the XSS attack can't see HttpOnly cookies. The browser blocks JavaScript from accessing them."*

### Step 4: Simulate Data Exfiltration (1 minute)

1. Click **"Simulate Data Exfiltration"**
2. Show the log — it displays the exact `fetch()` call the attacker would make

**Say:** *"This is what the attacker's code looks like. One fetch() call to their server with all your stolen tokens. They can now log in as you from their own computer."*

**Key point:** *"But notice — the HttpOnly cookie is NOT included in the stolen data. Even though the attacker has full XSS access, they cannot exfiltrate that token."*

---

## Key Points to Emphasize

### During the Demo

1. **localStorage is the most popular choice — and the worst for security**
   - *"It's convenient, but any JavaScript on the page can read it."*

2. **sessionStorage is slightly better but still vulnerable**
   - *"It's cleared when the tab closes, so the token doesn't persist. But while the tab is open, it's just as exposed."*

3. **HttpOnly cookies are the gold standard**
   - *"The browser sends them automatically with every request. JavaScript can't read or modify them. Even XSS can't steal them."*

4. **The trade-off: CSRF**
   - *"HttpOnly cookies are sent automatically — that's what makes them convenient. But it also means a malicious site could trigger requests that carry your cookie. That's CSRF. The fix: SameSite=Lax flag."*

### The Comparison Table

Walk through the table at the bottom of the page. Key rows:

| Feature | localStorage | sessionStorage | HttpOnly Cookie |
|---------|-------------|----------------|-----------------|
| XSS can steal | Yes | Yes | **No** |
| Sent automatically | No | No | **Yes** |
| CSRF vulnerable | No | No | Yes (use SameSite) |

**Say:** *"Every storage option has trade-offs. HttpOnly cookies with SameSite=Lax give you the best combination of security against XSS AND CSRF."*

---

## Optional: Cookie Flags Explanation (2 minutes)

Write on the whiteboard or show in the slides:

```
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

- **HttpOnly** → JS can't access (prevents XSS token theft)
- **Secure** → Only sent over HTTPS (prevents network sniffing)
- **SameSite=Lax** → Not sent on cross-site POST requests (prevents CSRF)

**Say:** *"These three flags together are your security trifecta. Use all of them for auth cookies."*

---

## Common Student Questions

**Q: "If I'm using localStorage, is my app insecure?"**
A: It depends on your threat model. For a class project, localStorage is fine. For a production app with real users, use HttpOnly cookies. The key is: if you use localStorage, your XSS defense must be bulletproof.

**Q: "How does React handle this?"**
A: React doesn't manage auth tokens — that's your responsibility. Libraries like NextAuth.js and Auth0 use HttpOnly cookies by default. If you're using a custom solution, you choose the storage.

**Q: "What about JWTs?"**
A: JWTs are a token FORMAT, not a storage mechanism. You still need to decide WHERE to store the JWT. The same rules apply: HttpOnly cookies are safer than localStorage.

---

## Wrap-Up

*"Let's zoom out. Today we covered six topics: OWASP Top 10, XSS, CSP, CORS, secrets in frontend code, and auth token storage. The common thread? Security is not someone else's job. As frontend developers, you are the first line of defense. The code YOU write determines whether users' data is safe."*

*"For your projects: use textContent, set a CSP meta tag, don't put secrets in your frontend code, and if you implement auth, use a library. Security is a mindset, not a checklist."*
