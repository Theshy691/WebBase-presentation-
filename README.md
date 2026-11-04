# An Integrated Case, Records, and Scheduling System
### For Belde's Notarial and Legal Services

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-24292e.svg?logo=github&logoColor=white)]()
[![Course](https://img.shields.io/badge/Course-Living%20in%20the%20IT%20Era-blue.svg)]()
[![Institution](https://img.shields.io/badge/University-Saint%20Louis%20University-gold.svg)]()
[![Standard](https://img.shields.io/badge/Compliance-RA%2010173%20(Data%20Privacy)-emerald.svg)]()

A comprehensive business case presentation website and live interactive system simulation engineered for **Belde's Notarial and Legal Services** (Umingan, Pangasinan). Presented in partial fulfillment of the academic requirements for **Living in the IT Era** at **Saint Louis University**, Baguio City.

---

## 🏛️ Academic Credentials & Presentation Team

- **Institution:** Saint Louis University (Baguio City)
- **School:** School of Teacher Education and Liberal Arts (STELA)
- **Department:** Department of Political and Social Sciences
- **Course:** Living in the IT Era (MWF, 5:30 – 6:30 PM, Room P503)
- **Course Facilitator:** Ma. Clarissa B. Mabitazan

### Group 2 Authors & Researchers:
1. **BELDE, Aaron Kyle D.** — Research Lead
2. **BITAGA, Laarnie Francine S.** — Systems Analyst
3. **PAGLINGAYEN, Rhianne Czeska P.** — Business Process Lead
4. **PARAS, Jermy Anne B.** — Requirements Analyst
5. **ROMERO, Reyanne Niña E.** — Security & Compliance Specialist
6. **SANTIAGO, Cassandra R.** — UI/UX Specialist
7. **TO, Julianna Luz C.** — QA & Technical Documentation Lead

---

## ⚖️ Executive Summary & Subject Profile

**Belde's Notarial and Legal Services**, established in **July 2004** by **Atty. Allan P. Belde**, is a solo-practitioner law office located along Cariño St., Poblacion West, Umingan, Pangasinan. With a foundational mission to uphold the rule of law and represent clients with fidelity and zeal, the firm handles six core practice areas:
1. **Litigation & Dispute Resolution** (Civil, Criminal, Administrative)
2. **Family Law** (Annulment, Adoption, Child Support, Guardianship)
3. **Land & Property Law** (Title Registration, Real Estate, Estate Settlement, Probate)
4. **Notarial Services & Legal Documentation**
5. **Estate Planning & Settlement of Estates**
6. **Pro Bono & Free Community Legal Aid**

### The Core Problem:
Established procedures relying on paper folders inside steel filing cabinets, ad-hoc client updates over email and Facebook Messenger, and manual scheduling create operational friction. As legal workloads grow, coping with rapidly advancing technology while strictly maintaining fiduciary confidentiality and reglementary deadlines requires an integrated, secure digital system.

---

## 🚀 Dual-Mode Platform Architecture

This project is built as a unified web application supporting two distinct modes:

### 1. Presentation Deck Mode (14 Editorial Slides)
Built for live academic and professional defense on projectors or screens:
- **Slide 1:** Title, Academic Credentials & Course Context
- **Slide 2:** Executive Summary & The Solo Practitioner Bottleneck
- **Slide 3:** Firm Profile & Heritage (Atty. Allan P. Belde, Umingan, Pangasinan)
- **Slide 4:** Business Rules & Legal Ethics (Reglementary Deadlines, Zero Backlog Policy)
- **Slide 5:** As-Is Analysis & Identified Operational Gaps (Steel Cabinets vs Modern Demands)
- **Slide 6:** Proposed Integrated Architecture (Client Portal + Staff Console)
- **Slide 7:** Two-Tier Stakeholder Personas & Role-Based Privileges
- **Slide 8:** Data Privacy Act of 2012 (RA 10173) Architecture & OTP Callback Safeguard
- **Slide 9:** Eight Core Functional Modules Specification
- **Slide 10:** Interactive 3-Lane BPMN Workflow (Client ↔ Secretary ↔ Atty. Belde)
- **Slide 11:** Multi-Dimensional Feasibility Analysis (Economic, Technical, Operational, Scheduling)
- **Slide 12:** Performance SLAs (99% Uptime, <2s Load Time, 5s E-Receipt Generation)
- **Slide 13:** Interactive Prototype Launchpad
- **Slide 14:** Group 2 Research Team Roster & Defense Q&A Panel

#### Presentation Keyboard Shortcuts:
| Key | Action |
|---|---|
| `→` or `Space` | Advance to Next Slide |
| `←` or `Backspace` | Return to Previous Slide |
| `F` | Toggle Fullscreen Mode |
| `N` | Toggle Speaker Notes Drawer |
| `P` | Start / Pause Presentation Timer |

---

### 2. Live Interactive System Simulator
A functional simulation allowing professors, evaluators, and stakeholders to test the proposed system in real time:

- **Live Client Case Tracker:** Look up sample cases (`CIV-2026-084: Estate of Santos`, `FAM-2026-019: Guardianship`, `NOT-2026-142: Deed of Sale`), view synchronized progress timelines, next court hearings, and an interactive **Plain-Language Legal Jargon Decoder**.
- **Centralized Appointment Booking Engine:** Schedule consultations with slot availability checks, venue directions, and instant booking reference cards.
- **OTP-Secured Financial Balance & Billing Module:** Experience the out-of-band two-factor verification safeguard where financial ledgers are unlocked only after entering a 6-digit OTP simulating an authorized phone callback.
- **Legal Secretary Operations Console:** Execute live **Conflict-of-Interest Checks** before client onboarding and generate end-of-day executive rosters for Atty. Belde's review.
- **Interactive BPMN Animated Flow:** Step through the sequence of events across Client, Legal Secretary, and Attorney swimlanes.
- **Searchable Requirements Dossier:** Instant filtering of functional, security, and feasibility criteria.
- **Verbatim Primary Research Transcript:** Complete 23-point interview transcript with Atty. Allan P. Belde.

---

## 🔒 Security & Data Privacy (RA 10173)

The architecture strictly adheres to the **Data Privacy Act of 2012 (Republic Act No. 10173)** and legal ethics:
- **Minimal Cloud Footprint:** The portal only stores basic contact credentials (name, email, phone number, designated contact person).
- **Physical Document Vault:** Sensitive case affidavits, contracts, and birth records remain physically archived at the law office, eliminating external cyber breach risks.
- **Out-of-Band Financial Verification:** Balance inquiries trigger an OTP and a direct telephone call from an authorized legal secretary before disclosing monetary balances.
- **Role-Based Access Control (RBAC):** Clients access only their specific matters; administrative staff have audit-logged access.

---

## 💻 Tech Stack & Design Standards

- **Frontend:** Semantic HTML5, Tailwind CSS, Vanilla ECMAScript 6+
- **Typography:** *Cinzel* (authoritative legal serif) + *Plus Jakarta Sans* (precision interface) + *JetBrains Mono* (case numbers & metadata)
- **Design System:** Built following the **Impeccable** craft specification:
  - Zero unicode emojis used as icons; precision authored vector SVGs only
  - No artificial text gradients or vanity metrics
  - High-contrast accessibility complying with WCAG AA standards (≥4.5:1)
  - Responsive down to 320px viewports
  - Web Audio API synthesized tactile feedback

---

## 🚀 Running Locally

No build tools or heavy runtimes are required. Simply open `index.html` in any modern web browser:

```bash
# Clone the repository
git clone https://github.com/Theshy691/WebBase-presentation-.git

# Navigate to directory
cd WebBase-presentation-

# Open directly or serve using Python
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.
