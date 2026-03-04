# Demo 2: Content Security Policy (CSP)

**Lecture Part:** Part 3 — Content Security Policy
**Time:** ~5 minutes
**Files:** `no-csp.html`, `with-csp.html`

---

## Pre-Demo Setup

1. Open both files in separate browser tabs
2. Open DevTools Console in both tabs (CSP violations show up here)
3. **Important:** These files must be opened via a local server or file:// — they work standalone

---

## Part A: No CSP — Everything Runs (2 minutes)

### Step 1: Open the Page

1. Open `no-csp.html`
2. Point out the red "NO CSP" banner

**Say:** *"This page has NO Content Security Policy. Let's see what that means."*

### Step 2: Observe the Auto-Tests

Two things run automatically on page load:

1. **Inline Script (no nonce):** Shows "EXECUTED" — *"An inline script tag ran as soon as the page loaded. No questions asked."*
2. **Nonced Script:** Shows "EXECUTED" — *"This script has a nonce attribute, but without CSP there's nothing to check it. It runs just like any other script."*

### Step 3: Click Each Test Button

1. **Test Inline Handler** — *"onclick attributes work. These are inline event handlers."*
2. **Test eval()** — *"eval() works. This is one of the most dangerous JavaScript features — it executes arbitrary strings as code."*
3. **Test Dynamic Script** — *"We created a script element with JavaScript and appended it to the page. It ran."*
4. **Simulate XSS Injection** — *"We injected code via innerHTML and it executed. This is exactly what an XSS attack does."*

**Say:** *"All six cards show EXECUTED. Without CSP, the browser will run ANY JavaScript on the page. It doesn't care where it came from. Now let's add a policy."*

---

## Part B: With CSP — Scripts Blocked (3 minutes)

### Step 1: Open the Page

1. Switch to the `with-csp.html` tab
2. Point out the green "CSP ENABLED" banner
3. Show the CSP policy displayed on the page:
   ```
   default-src 'self'; script-src 'self' 'nonce-demo123'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;
   ```

**Say:** *"This page has a Content Security Policy. The key part is script-src 'self' 'nonce-demo123'. This means only scripts from the same origin OR scripts with the nonce 'demo123' can run."*

### Step 2: Observe the Auto-Tests

Two things happen automatically on page load — compare with the no-csp page:

1. **Inline Script (no nonce):** Shows "BLOCKED by CSP" — *"On the no-csp page this ran. Here, CSP blocked it because it doesn't have a nonce."*
2. **Nonced Script:** Shows "ALLOWED — nonced script ran" — *"This script has the nonce attribute matching our policy. It's the only one CSP lets through."*

**Say:** *"Same two scripts, different outcomes. The only difference is the nonce attribute. Now let's click the same buttons we clicked on the no-csp page."*

### Step 3: Click Each Test Button (Side-by-Side with No CSP)

Click the same buttons you clicked on the no-csp page. Compare the results:

1. **Test Inline Handler** — *"On the no-csp page, the onclick handler ran. Here, CSP BLOCKS the onclick="" attribute. But notice the button still gives us feedback — that's because we also attached an addEventListener from our nonced script. CSP blocks inline handlers, not event listeners registered from trusted code."*

2. **Test eval()** — *"eval() is blocked. CSP doesn't allow it unless you explicitly add 'unsafe-eval' to your policy — which you should almost never do."*

3. **Test Dynamic Script** — *"We created a script element and appended it to the page, just like on the no-csp page. But CSP blocks it because the dynamically-created script has no nonce."*

4. **Simulate XSS Injection** — *"We injected code via innerHTML, simulating an XSS attack. CSP blocks it — the injected code has no nonce, so it can't run."*

**Say:** *"Same six cards, same four buttons, completely different results. On the no-csp page, all six showed EXECUTED. Here, five are BLOCKED and only the nonced script is ALLOWED. That's the power of a Content Security Policy."*

### Step 4: Show the DevTools Console

1. Open DevTools Console
2. **Show the CSP violation errors** — red error messages for each blocked attempt
3. Point out the error format: `Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self' 'nonce-demo123'"`

**Say:** *"These errors are incredibly helpful. They tell you exactly what was blocked and what CSP directive blocked it. When deploying CSP, you'll use these to fine-tune your policy."*

### Step 5: Explain the Nonce

**Say:** *"Notice that our legitimate script has `nonce='demo123'`. In production, this would be a random value generated on EACH page load by your server. An attacker can't guess the nonce, so they can't make their injected scripts pass the policy."*

---

## Side-by-Side Comparison Summary

| Test | No CSP Result | With CSP Result |
|------|--------------|-----------------|
| Inline script (no nonce) | EXECUTED | BLOCKED |
| Nonced script | EXECUTED | ALLOWED |
| Inline onclick handler | EXECUTED | BLOCKED |
| eval() | EXECUTED | BLOCKED |
| Dynamic script injection | EXECUTED | BLOCKED |
| XSS via innerHTML | EXECUTED | BLOCKED |

---

## Key Points to Emphasize

1. **CSP is a safety net** — It doesn't prevent the XSS injection, it prevents the injected code from executing
2. **Nonces are the gold standard** — They let YOUR scripts run while blocking everything else
3. **Inline handlers are blocked too** — `onclick=""` attributes are treated as inline scripts by CSP
4. **addEventListener still works** — Code registered from a trusted (nonced) script is fine
5. **DevTools Console shows violations** — Use this when testing your CSP
6. **Start with Report-Only** — Use `Content-Security-Policy-Report-Only` to test before enforcing
7. **Meta tag works for demos** — In production, set the header on your server

---

## Inspecting Real-World CSP (Optional, 2 minutes)

If time permits, show a real CSP in the wild:

1. Go to **github.com** in Chrome
2. Open DevTools → Network tab
3. Click the main document request
4. Scroll to Response Headers
5. Find the `Content-Security-Policy` header — it's massive!
6. Point out the `script-src` directive with multiple nonces and domains

**Say:** *"GitHub takes CSP very seriously. Look at how specific their policy is — every allowed source is explicitly listed. This is what mature security looks like."*

---

## Transition

*"CSP controls what YOUR page loads. But what about when your page needs to fetch data from OTHER servers? That's controlled by CORS — the Same-Origin Policy and Cross-Origin Resource Sharing."*
