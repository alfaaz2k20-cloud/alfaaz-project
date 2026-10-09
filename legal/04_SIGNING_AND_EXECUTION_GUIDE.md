# ALFAAZ COLLECTIVE
## VOLUNTEER AGREEMENT SIGNING & EXECUTION GUIDE
### Operational Protocol for Curators & Administrative Desk

> This guide provides step-by-step instructions for preparing, issuing, and securely executing the **Interim Volunteer Agreement, Code of Conduct, and Privacy Consent Package** with candidates who have cleared the **Alfaaz Talent Assessment (V2.1)** and curatorial interview.

---

### 1. OVERVIEW OF THE COMPLIANCE PACKAGE

The package consists of three integrated legal instruments:
1. **01 — Interim Volunteer Participation Agreement:** Core binding engagement contract under Section 10 of the Indian Contract Act, 1872 & Section 10A of the Information Technology Act, 2000. Features strict non-employment disclaimers, artist IP safeguarding (Sections 17 & 57 of Copyright Act, 1957), ex-gratia reimbursement clauses, and Srinagar jurisdiction.
2. **02 — Volunteer Code of Conduct & Heritage Venue Etiquette (Schedule B):** Specific protocols for historic venues in Srinagar (Mahatta Art Gallery, The Bund, Nigeen Club, The Swan), white-glove art handling, walnut-frame two-hand rule, POSH zero-tolerance anti-harassment, and media protocol.
3. **03 — Privacy, Data Protection & Candidate Assessment Confidentiality Consent (Schedule C):** Enforces strict secrecy over the proprietary V2.1 assessment battery, questions, rubrics, and candidate dossiers (`research.html`), while securing DPDP Act 2023 compliant consent for volunteer data processing.

---

### 2. EXECUTION OPTIONS (ELECTRONIC VS. OFFLINE)

Under Section 10A of the **Information Technology Act, 2000**, electronic contracts and signatures have the exact same legal validity in Indian courts as physical wet-ink paper contracts.

Alfaaz can execute this package via two zero-cost or low-cost methods:

---

### OPTION A: DIGITAL EXECUTION VIA PANDADOC (RECOMMENDED — FREE TIER)

PandaDoc offers a **Free eSign Plan** that allows sending unlimited documents for legally binding e-signatures without cost.

#### Step-by-Step Workflow:
1. **Create Free Account:**
   - Go to [pandadoc.com](https://www.pandadoc.com/) and register with `alfaazcollective@gmail.com`.
2. **Upload Document:**
   - In your dashboard, click **New Document** > **Upload**.
   - Upload the consolidated PDF (or export `frontend/public/legal/volunteer-package.html` to PDF using your browser's Print to PDF).
3. **Configure Signers:**
   - Add Recipient 1: **Volunteer** (`{{Volunteer_Email}}`, Name: `{{Volunteer_Full_Name}}`).
   - Add Recipient 2: **Lead Curator** (`alfaazcollective@gmail.com`).
   - Enable **Signing Order**: Volunteer signs first, followed by Lead Curator countersignature.
4. **Drag & Drop Signature Fields:**
   - On the Volunteer Signature block:
     - Drag a **Signature** field and assign to Volunteer.
     - Drag **Date**, **Full Name**, and **Text Field** (for Aadhaar / ID number).
     - Place **Initials** field on the bottom margin of each page.
   - On the Curator Signature block:
     - Drag a **Signature** field and assign to Lead Curator.
     - Drag **Date** field.
5. **Send via Email / Share Link:**
   - Click **Send Document**.
   - The volunteer receives a secure email link. They can open it on their mobile phone or laptop, review all clauses, and draw or type their signature. No account creation is required for the volunteer.
6. **Automatic Archival:**
   - Once both parties sign, PandaDoc automatically seals the document with an SHA-256 cryptographic hash and generates an **Audit Trail Certificate** (recording signer IP address, timestamp, and device).
   - A copy of the completed PDF is automatically emailed to both the volunteer and Alfaaz Collective.

---

### OPTION B: DIGITAL EXECUTION VIA ZOHO SIGN (BEST FOR INDIA / AADHAAR eSIGN)

Zoho Sign is hosted on Indian data centers and is fully certified under the IT Act, 2000. It offers both standard electronic signatures and Aadhaar OTP eSign (via C-DAC / NSDL).

#### Step-by-Step Workflow:
1. **Account Setup:**
   - Visit [zoho.com/sign](https://www.zoho.com/sign/) and sign up.
2. **Send for Signature:**
   - Click **Send for Signatures**.
   - Upload `volunteer-package.pdf`.
   - Set Signer 1: Volunteer (Email & Mobile). Set Signer 2: Alfaaz Lead Curator.
3. **Authentication Type:**
   - For standard free/low-cost eSign: Select **Email OTP** or **SMS OTP**.
   - For Aadhaar eSign (if highest legal evidentiary standard is desired): Select **Aadhaar eSign** (deducts ~₹15-₹20 per transaction from Zoho wallet). The volunteer verifies using their Aadhaar-linked mobile OTP.
4. **Place Fields & Dispatch:**
   - Place Signature, Date, and ID fields. Click **Send Now**.

---

### OPTION C: IN-PERSON / OFFLINE WET-INK SIGNING (PHYSICAL GALLERY DESK)

If a volunteer prefers to sign in person at Mahatta Art Gallery, Nigeen Club, or the Alfaaz Curatorial Desk:

1. **Printing:**
   - Open `frontend/public/legal/volunteer-package.html` in Chrome or Edge.
   - Press `Ctrl + P` (or `Cmd + P`).
   - Destination: **Save as PDF** or print directly on 80+ GSM bright white A4 bond paper.
   - Ensure the layout is set to **Portrait**, margins **Default**, and "Background graphics" **Checked**.
2. **Signing Protocol:**
   - The volunteer must write their details in blue or black permanent ballpoint pen.
   - The volunteer and Lead Curator must sign their **initials** at the bottom-right corner of every single page.
   - Both parties must execute their **full signatures** on the final execution block with date and place (Srinagar).
3. **Physical & Digital Archiving:**
   - Scan the signed physical document using Adobe Scan or CamScanner at 300 DPI color.
   - Save the scanned PDF according to the naming protocol below.
   - Store the original hard copy in the physical **Alfaaz Legal & Volunteer Binder** at the Secretariat.

---

### 3. RECORD KEEPING & FILE NAMING CONVENTION

To ensure seamless organization and audit readiness for upcoming NGO registration and tax filings, follow this standardized naming system:

```text
records/
└── volunteers/
    └── 2026/
        ├── VOL-2026-001_Aadil_Bhat_Signed.pdf
        ├── VOL-2026-002_Zehra_Mir_Signed.pdf
        └── VOL-2026-003_Faizan_Shah_Signed.pdf
```

Each volunteer record file should contain:
1. The countersigned Volunteer Agreement + Code of Conduct + Privacy Consent.
2. The PandaDoc / Zoho Sign Audit Certificate (or scanned physical copy).
3. A self-attested photocopy of the volunteer’s government photo ID (Aadhaar / Voter ID / Passport) with Aadhaar numbers masked (first 8 digits hidden, showing only last 4 digits pursuant to UIDAI guidelines).

---

### 4. POST-SIGNING ONBOARDING CHECKLIST

Once the agreement is executed:
- [ ] Send the volunteer a warm welcome message / email confirming their active enrollment.
- [ ] Add the volunteer to the official **Alfaaz Inner Circle / Volunteer WhatsApp Desk**.
- [ ] Issue their digital Alfaaz Volunteer Identification Card / Badge.
- [ ] Schedule their 30-minute orientation on gallery etiquette and white-glove art handling before their first exhibition shift.
- [ ] Archive the executed agreement in the secure records repository.
