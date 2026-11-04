/**
 * Belde's Notarial & Legal Services Presentation & System Simulation
 * Obsidian & Antique Champagne Gold Legal System
 * Authors: Group 2 (Living in the IT Era - Saint Louis University)
 * Facilitator: Ma. Clarissa B. Mabitazan
 */

// Application State
const state = {
  currentMode: 'presentation', // 'presentation' | 'simulation'
  currentSlide: 0,
  totalSlides: 14,
  timerSeconds: 0,
  timerRunning: false,
  timerInterval: null,
  soundEnabled: true,
  audioCtx: null,
  activeSimulatorTab: 'client-portal',
  activeBpmnMode: 'proposed',
  bpmnStep: 0,
  bpmnInterval: null,
  otpCode: '849201',
  otpTimer: 60,
  otpCountdownInterval: null,
  otpVerified: false,
  otpVerifiedCases: {}, // Tracks verified cases individually for RA 10173 compliance
  toastTimeout: null,
  notesVisible: false,
  
  // Portal & User Authentication State
  isClientLoggedIn: false, // false = Public Front Page; true = Logged-in User Area
  activeClientCase: 'CIV-2026-084',
  clientActiveSubTab: 'case-tracking' // 'case-tracking' | 'billing-breakdown' | 'client-database'
};

// Speaker Notes Data
const speakerNotes = [
  "Slide 1: Welcome Facilitator Ma. Clarissa Mabitazan, Saint Louis University faculty, and classmates. Group 2 presents our Business Case: An Integrated Case, Records, and Scheduling System for Belde's Notarial and Legal Services.",
  "Slide 2: Executive Summary. Established in July 2004 in Umingan, Pangasinan, Atty. Allan P. Belde operates a solo legal practice delivering community counsel. We address manual recordkeeping friction and scattered client communication.",
  "Slide 3: Law Office Profile. Founder Atty. Allan P. Belde has maintained strict fidelity to the rule of law for over two decades across six distinct legal practice areas.",
  "Slide 4: Business Rules & Legal Ethics. Prioritization is calibrated to court prescriptive periods and reglementary deadlines; client confidentiality continues perpetually under fiduciary duty; and Atty. Belde conducts daily end-of-day reviews.",
  "Slide 5: As-Is Operational Analysis. Physical paper folders in steel filing cabinets and ad-hoc Messenger threads create administrative latency despite maintaining zero ethical complaints in 20+ years.",
  "Slide 6: Proposed Architecture. A dual-tier integrated platform combining an accessible Client Self-Service Portal with a centralized Law Office Administrative Records Console.",
  "Slide 7: Stakeholder Matrix. Primary users (Atty. Belde and Legal Secretaries for intake, calendar, and records) and Secondary users (Clients for tracking, appointments, and billing breakdown requests).",
  "Slide 8: Data Privacy Act (RA 10173) Compliance. The cloud portal stores strictly minimal contact credentials. All sensitive affidavits remain physically on-premise, and financial balance inquiries require an out-of-band phone callback.",
  "Slide 9: Eight Core Functional Modules. Structured specification covering intake, records, tracking, calendar, billing, directory, communication, and drafting support.",
  "Slide 10: BPMN 3-Lane Workflow. Formal process flow across Client, Legal Secretary, and Attorney Allan Belde swimlanes.",
  "Slide 11: Multi-Dimensional Feasibility. Quantitative and qualitative evaluation across Economic, Technical, Operational, and Scheduling dimensions.",
  "Slide 12: Non-Functional Benchmarks. Verifying 99.0% SLA uptime, under 2-second page load times, 5-second e-receipt PDF dispatch, and role-based access control.",
  "Slide 13: Live Interactive Prototype. Direct invitation to test the embedded functional simulator or view the group Weblium model.",
  "Slide 14: Group 2 Presentation Roster. Acknowledging all student researchers and opening the floor for Facilitator Mabitazan's academic defense evaluation."
];

// Demo Case & Client Database
const demoCases = {
  'CIV-2026-084': {
    id: 'CIV-2026-084',
    title: 'Estate of Santos: Judicial Settlement & Partition',
    type: 'Land & Property / Estate Law',
    client: 'Eduardo M. Santos',
    phone: '+63 917 555 0192',
    email: 'eduardo.santos@gmail.com',
    residence: 'Braganza St., Poblacion West, Umingan, Pangasinan',
    emergencyContact: 'Lourdes Santos (Daughter) - +63 917 555 4421',
    court: 'RTC Branch 42, Tayug, Pangasinan',
    dateFiled: 'August 14, 2026',
    status: 'In Court Proceedings',
    statusClass: 'badge-amber',
    nextHearing: 'November 18, 2026 - 9:00 AM (RTC Branch 42, Tayug)',
    attyNotes: 'Pre-trial brief submitted. Newspaper publication proof confirmed. Awaiting formal presentation of co-heirs.',
    steps: [
      { name: 'Client Intake & Conflict Clearance', date: 'Aug 14, 2026', completed: true },
      { name: 'Verification of Title & Tax Declarations', date: 'Aug 22, 2026', completed: true },
      { name: 'Petition Drafting & Atty. Belde Review', date: 'Sep 05, 2026', completed: true },
      { name: 'Formal Court Filing & Publication', date: 'Sep 29, 2026', completed: true },
      { name: 'Initial Hearing & Presentation of Heirs', date: 'Nov 18, 2026', current: true },
      { name: 'Final Decree of Partition', date: 'Pending', pending: true }
    ],
    financials: {
      totalFees: '₱ 45,000.00',
      paidAmount: '₱ 30,000.00',
      balanceDue: '₱ 15,000.00',
      receiptNo: 'OR-2026-0981'
    },
    billingItems: [
      { item: 'Initial Retainer & Acceptance Fee', amount: '₱ 20,000.00', status: 'Settled (OR-2026-0810)' },
      { item: 'Pleading Drafting & Title Verification', amount: '₱ 10,000.00', status: 'Settled (OR-2026-0981)' },
      { item: 'RTC Appearance & Witness Presentation', amount: '₱ 15,000.00', status: 'Due on Nov 18, 2026' }
    ],
    documents: [
      { title: 'Deed of Extrajudicial Settlement of Estate', type: 'Notarial Instrument', date: 'Aug 14, 2026', ref: 'Doc. No. 142, Page 29, Book IV', vault: 'Physical Steel Safe 01 (Cariño St.)' },
      { title: 'Original Owner Duplicate Certificate (TCT No. T-48192)', type: 'Land Registration Title', date: 'Aug 22, 2026', ref: 'Registry of Deeds Tayug', vault: 'Secure Fireproof Vault Box B' },
      { title: 'Formal Verified Petition for Judicial Partition', type: 'Court Pleading', date: 'Sep 29, 2026', ref: 'Civil Case No. T-3810', vault: 'Active Litigation Archive A-1' },
      { title: 'Affidavit of Publication (Pangasinan Star)', type: 'Evidentiary Proof', date: 'Oct 12, 2026', ref: '3-Week Publication Proof', vault: 'Active Litigation Archive A-1' }
    ],
    jargonTerms: [
      { term: 'Partition', def: 'The legal division of real property among co-owners or heirs so each receives their determined individual share.' },
      { term: 'Reglementary Period', def: 'The strict statutory time limit set by procedural rules within which an action or response must be submitted.' }
    ]
  },
  'FAM-2026-019': {
    id: 'FAM-2026-019',
    title: 'Petition for Legal Guardianship of Minor V.G.',
    type: 'Family Law',
    client: 'Marilou C. Garcia',
    phone: '+63 928 555 4810',
    email: 'marilou.garcia@gmail.com',
    residence: 'San Manuel, Pangasinan',
    emergencyContact: 'Roberto Garcia (Uncle) - +63 928 555 9931',
    court: 'Family Court (RTC Branch 42, Tayug)',
    dateFiled: 'September 02, 2026',
    status: 'Awaiting Court Assessment',
    statusClass: 'badge-gold',
    nextHearing: 'December 04, 2026 - 1:30 PM (Family Court)',
    attyNotes: 'Social worker home investigation completed. Preparing formal motion for Letters of Guardianship.',
    steps: [
      { name: 'Inquiry & Conflict Check', date: 'Sep 02, 2026', completed: true },
      { name: 'Documentary Substantiation Gathering', date: 'Sep 12, 2026', completed: true },
      { name: 'Petition Drafted & Approved by Atty. Belde', date: 'Sep 28, 2026', completed: true },
      { name: 'Court Social Worker Home Study', date: 'Oct 24, 2026', completed: true },
      { name: 'Formal Jurisdictional Hearing', date: 'Dec 04, 2026', current: true },
      { name: 'Letters of Guardianship Issuance', date: 'Pending', pending: true }
    ],
    financials: {
      totalFees: '₱ 35,000.00',
      paidAmount: '₱ 35,000.00',
      balanceDue: '₱ 0.00',
      receiptNo: 'OR-2026-1044'
    },
    billingItems: [
      { item: 'Guardianship Petition Drafting & Acceptance', amount: '₱ 20,000.00', status: 'Settled (OR-2026-1002)' },
      { item: 'Court Social Worker Assessment Filing', amount: '₱ 15,000.00', status: 'Settled (OR-2026-1044)' }
    ],
    documents: [
      { title: 'Petition for Appointment of Legal Guardian', type: 'Special Proceeding Pleading', date: 'Sep 02, 2026', ref: 'Spec. Proc. No. F-102', vault: 'Family Archive Cabinet C' },
      { title: 'Certified True Copy of Minor Birth Certificate (PSA)', type: 'Vital Record', date: 'Sep 12, 2026', ref: 'PSA Registry No. 2012-00481', vault: 'Family Archive Cabinet C' },
      { title: 'Court Social Worker Home Study Report', type: 'Court Social Investigation', date: 'Oct 24, 2026', ref: 'CSW Investigation No. 84', vault: 'Family Archive Cabinet C' }
    ],
    jargonTerms: [
      { term: 'Letters of Guardianship', def: 'An official court certificate authorizing a designated individual to act as the legal guardian of a minor or ward.' }
    ]
  },
  'NOT-2026-142': {
    id: 'NOT-2026-142',
    title: 'Deed of Absolute Sale & Extrajudicial Settlement',
    type: 'Notarial Services & Documentation',
    client: 'Ricardo V. Mendoza',
    phone: '+63 945 555 3321',
    email: 'ricardo.mendoza@gmail.com',
    residence: 'Poblacion West, Umingan, Pangasinan',
    emergencyContact: 'Teresa Mendoza (Spouse) - +63 945 555 1109',
    court: 'Belde Law Office Notarial Chamber',
    dateFiled: 'October 28, 2026',
    status: 'Ready for Release & Notarization',
    statusClass: 'badge-emerald',
    nextHearing: 'Office Appearance - Nov 06, 2026 (2:00 PM)',
    attyNotes: 'Parties scheduled for in-person appearance, oath, and thumbmark entry into 2026 Notarial Register.',
    steps: [
      { name: 'Document Presentation & Identity Verification', date: 'Oct 28, 2026', completed: true },
      { name: 'Competent Evidence of Identity Examination', date: 'Oct 28, 2026', completed: true },
      { name: 'Legal Review & Acknowledgment Drafting', date: 'Oct 30, 2026', completed: true },
      { name: 'Personal Appearance & Notarial Register Entry', date: 'Nov 06, 2026', current: true },
      { name: 'Document Stamped, Sealed & Delivered', date: 'Pending', pending: true }
    ],
    financials: {
      totalFees: '₱ 3,500.00',
      paidAmount: '₱ 3,500.00',
      balanceDue: '₱ 0.00',
      receiptNo: 'OR-2026-1219'
    },
    billingItems: [
      { item: 'Document Drafting, Acknowledgment & Notarial Seal', amount: '₱ 3,500.00', status: 'Settled (OR-2026-1219)' }
    ],
    documents: [
      { title: 'Deed of Absolute Sale of Real Property', type: 'Notarial Instrument', date: 'Oct 28, 2026', ref: 'Doc. No. 89, Page 18, Book V', vault: '2026 Notarial Register Series' },
      { title: 'Government Competent Evidence of Identity (PhilID Copies)', type: 'Identity Verification', date: 'Oct 28, 2026', ref: 'PSA PhilID Records', vault: 'Notarial Register Archive' }
    ],
    jargonTerms: [
      { term: 'Acknowledgment', def: 'A formal legal act whereby the individual executing an instrument appears before a notary public and declares that the instrument is their free and voluntary act.' }
    ]
  }
};

// Subtle Web Audio Feedback
function playTactileFeedback(type = 'click') {
  if (!state.soundEnabled) return;
  try {
    if (!state.audioCtx) {
      state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
    const osc = state.audioCtx.createOscillator();
    const gain = state.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(state.audioCtx.destination);

    const now = state.audioCtx.currentTime;
    if (type === 'click') {
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'slide') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.06);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.07);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    }
  } catch (e) {
    // Audio unsupported
  }
}

// Slide Navigation
function goToSlide(index) {
  if (index < 0 || index >= state.totalSlides) return;
  state.currentSlide = index;
  updateSlideView();
  playTactileFeedback('slide');
}

function nextSlide() {
  if (state.currentSlide < state.totalSlides - 1) {
    goToSlide(state.currentSlide + 1);
  }
}

function prevSlide() {
  if (state.currentSlide > 0) {
    goToSlide(state.currentSlide - 1);
  }
}

function updateSlideView() {
  const slides = document.querySelectorAll('.presentation-slide');
  slides.forEach((slide, idx) => {
    if (idx === state.currentSlide) {
      slide.classList.remove('hidden');
      slide.classList.add('slide-content');
    } else {
      slide.classList.add('hidden');
      slide.classList.remove('slide-content');
    }
  });

  const counterEl = document.getElementById('slideCounter');
  if (counterEl) {
    counterEl.textContent = `${state.currentSlide + 1} / ${state.totalSlides}`;
  }

  const progressEl = document.getElementById('slideProgressBar');
  if (progressEl) {
    const percentage = ((state.currentSlide + 1) / state.totalSlides) * 100;
    progressEl.style.width = `${percentage}%`;
  }

  const notesText = document.getElementById('speakerNotesText');
  if (notesText && speakerNotes[state.currentSlide]) {
    notesText.textContent = speakerNotes[state.currentSlide];
  }

  const selectEl = document.getElementById('slideJumpSelect');
  if (selectEl) {
    selectEl.value = state.currentSlide;
  }
}

// View Mode Switching
function setMode(mode) {
  state.currentMode = mode;
  playTactileFeedback('click');

  const presView = document.getElementById('presentationView');
  const simView = document.getElementById('simulationView');
  const modePresBtn = document.getElementById('modePresBtn');
  const modeSimBtn = document.getElementById('modeSimBtn');

  if (mode === 'presentation') {
    presView.classList.remove('hidden');
    simView.classList.add('hidden');
    modePresBtn.classList.remove('btn-secondary');
    modePresBtn.classList.add('btn-primary');
    modeSimBtn.classList.remove('btn-primary');
    modeSimBtn.classList.add('btn-secondary');
  } else {
    presView.classList.add('hidden');
    simView.classList.remove('hidden');
    modeSimBtn.classList.remove('btn-secondary');
    modeSimBtn.classList.add('btn-primary');
    modePresBtn.classList.remove('btn-primary');
    modePresBtn.classList.add('btn-secondary');
    updatePortalView();
  }
}

// Presentation Timer
function toggleTimer() {
  playTactileFeedback('click');
  const timerBtn = document.getElementById('timerToggleBtn');
  if (state.timerRunning) {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    if (timerBtn) timerBtn.textContent = 'Resume';
  } else {
    state.timerRunning = true;
    if (timerBtn) timerBtn.textContent = 'Pause';
    state.timerInterval = setInterval(() => {
      state.timerSeconds++;
      updateTimerDisplay();
    }, 1000);
  }
}

function resetTimer() {
  playTactileFeedback('click');
  clearInterval(state.timerInterval);
  state.timerRunning = false;
  state.timerSeconds = 0;
  updateTimerDisplay();
  const timerBtn = document.getElementById('timerToggleBtn');
  if (timerBtn) timerBtn.textContent = 'Start';
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('presentationTimer');
  if (!timerEl) return;
  const mins = Math.floor(state.timerSeconds / 60).toString().padStart(2, '0');
  const secs = (state.timerSeconds % 60).toString().padStart(2, '0');
  timerEl.textContent = `${mins}:${secs}`;
}

// Fullscreen Toggle
function toggleFullScreen() {
  playTactileFeedback('click');
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Speaker Notes Drawer
function toggleSpeakerNotes() {
  state.notesVisible = !state.notesVisible;
  playTactileFeedback('click');
  const drawer = document.getElementById('speakerNotesDrawer');
  if (drawer) {
    if (state.notesVisible) {
      drawer.classList.remove('hidden');
    } else {
      drawer.classList.add('hidden');
    }
  }
}

// ============================================================
// PORTAL & AUTHENTICATED USER STATE MANAGEMENT
// ============================================================

function updatePortalView() {
  const frontPage = document.getElementById('portalFrontPage');
  const userDashboard = document.getElementById('portalUserDashboard');
  const portalAuthBadge = document.getElementById('portalAuthBadge');
  const portalLoginBtn = document.getElementById('portalLoginBtn');

  if (!state.isClientLoggedIn) {
    // PUBLIC / FRONT PAGE VIEW
    if (frontPage) frontPage.classList.remove('hidden');
    if (userDashboard) userDashboard.classList.add('hidden');
    if (portalAuthBadge) {
      portalAuthBadge.textContent = 'Public Portal View';
      portalAuthBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-[#15151C] text-[#9B9BA6] border border-[#1A1A22]';
    }
    if (portalLoginBtn) {
      portalLoginBtn.textContent = '🔑 Client Login';
      portalLoginBtn.onclick = openClientLoginModal;
    }
  } else {
    // AUTHENTICATED CLIENT DASHBOARD VIEW
    if (frontPage) frontPage.classList.add('hidden');
    if (userDashboard) userDashboard.classList.remove('hidden');
    const caseData = demoCases[state.activeClientCase] || demoCases['CIV-2026-084'];
    
    // Top Bar Badge
    if (portalAuthBadge) {
      portalAuthBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-[#34D399] inline-block mr-1"></span>Client: ${caseData.client} (${caseData.id})`;
      portalAuthBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30';
    }
    if (portalLoginBtn) {
      portalLoginBtn.textContent = '↪ Sign Out';
      portalLoginBtn.onclick = logoutClient;
    }

    // Client Workspace Banner Header & Avatar Initials
    const nameEl = document.getElementById('clientDashboardName');
    const titleEl = document.getElementById('clientDashboardCaseTitle');
    const avatarEl = document.getElementById('clientDashboardAvatar');
    if (nameEl) nameEl.textContent = caseData.client;
    if (titleEl) titleEl.textContent = `Case Docket: ${caseData.id} • ${caseData.title}`;
    if (avatarEl) {
      const parts = caseData.client.split(' ').filter(Boolean);
      const initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : caseData.client.slice(0, 2).toUpperCase();
      avatarEl.textContent = initials;
    }

    // Update Switcher Active Button Highlighting
    document.querySelectorAll('.client-switcher-btn').forEach(btn => {
      btn.classList.remove('bg-[#C5A059]', 'text-[#070709]', 'font-bold', 'border-[#C5A059]');
      btn.classList.add('btn-secondary');
    });
    const activeSwitcherBtn = document.getElementById(`switcher-${state.activeClientCase}`);
    if (activeSwitcherBtn) {
      activeSwitcherBtn.classList.remove('btn-secondary');
      activeSwitcherBtn.classList.add('bg-[#C5A059]', 'text-[#070709]', 'font-bold', 'border-[#C5A059]');
    }

    // Render active sub-tab content
    setClientSubTab(state.clientActiveSubTab);
  }
}

function loginAsClient(caseId) {
  state.isClientLoggedIn = true;
  state.activeClientCase = caseId || 'CIV-2026-084';
  playTactileFeedback('success');
  closeClientLoginModal();
  closePortalAccessGuideModal();
  updatePortalView();
  showToast("Logged in as " + (demoCases[state.activeClientCase]?.client || 'Client') + " (Docket " + state.activeClientCase + ")", "success", "Client Session Active");
}

function logoutClient() {
  state.isClientLoggedIn = false;
  playTactileFeedback('click');
  updatePortalView();
  showToast("You have been securely signed out of the Client Workspace.", "gold", "Session Closed");
}

function handleBillingTabClick() {
  if (state.otpVerifiedCases[state.activeClientCase]) {
    setClientSubTab('billing-breakdown');
  } else {
    requestBillingBreakdown(state.activeClientCase);
  }
}

function lockBillingLedger(caseId) {
  const targetId = caseId || state.activeClientCase;
  state.otpVerifiedCases[targetId] = false;
  playTactileFeedback('click');
  showToast("Financial ledger for " + targetId + " re-locked under RA 10173 safeguard.", "gold", "Ledger Protected");
  renderBillingBreakdown(targetId);
}

function setClientSubTab(subTab) {
  state.clientActiveSubTab = subTab;
  playTactileFeedback('click');

  // Subtab buttons
  document.querySelectorAll('.client-subtab-btn').forEach(btn => {
    btn.classList.remove('bg-[#C5A059]', 'text-[#070709]', 'font-bold', 'border-[#C5A059]');
    btn.classList.add('bg-[#0E0E12]', 'text-[#9B9BA6]', 'border-[#1A1A22]');
  });
  const activeBtn = document.getElementById(`subTabBtn-${subTab}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-[#0E0E12]', 'text-[#9B9BA6]', 'border-[#1A1A22]');
    activeBtn.classList.add('bg-[#C5A059]', 'text-[#070709]', 'font-bold', 'border-[#C5A059]');
  }

  // Subtab contents
  document.querySelectorAll('.client-subtab-content').forEach(c => c.classList.add('hidden'));
  const activeContent = document.getElementById(`subTabContent-${subTab}`);
  if (activeContent) activeContent.classList.remove('hidden');

  // Render appropriate dynamic content
  if (subTab === 'case-tracking') {
    renderCaseDetails(state.activeClientCase);
  } else if (subTab === 'billing-breakdown') {
    renderBillingBreakdown(state.activeClientCase);
  } else if (subTab === 'client-database') {
    renderClientDatabase(state.activeClientCase);
  }
}

function selectActiveCase(caseId) {
  state.activeClientCase = caseId;
  playTactileFeedback('click');
  updatePortalView();
}

// Modals: Schedule, Login, and Step-by-Step Access Guide
function openAttyScheduleModal() {
  playTactileFeedback('click');
  const modal = document.getElementById('attyScheduleModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAttyScheduleModal() {
  const modal = document.getElementById('attyScheduleModal');
  if (modal) modal.classList.add('hidden');
}

function openPortalAccessGuideModal() {
  playTactileFeedback('click');
  const modal = document.getElementById('portalAccessGuideModal');
  if (modal) modal.classList.remove('hidden');
}

function closePortalAccessGuideModal() {
  const modal = document.getElementById('portalAccessGuideModal');
  if (modal) modal.classList.add('hidden');
}

function openClientLoginModal() {
  playTactileFeedback('click');
  const modal = document.getElementById('clientLoginModal');
  if (modal) modal.classList.remove('hidden');
}

function closeClientLoginModal() {
  const modal = document.getElementById('clientLoginModal');
  if (modal) modal.classList.add('hidden');
}

// Simulator Main Tab Selector (Client Portal vs Secretary Console vs BPMN vs Dossier vs Transcript)
function setSimulatorTab(tabId) {
  state.activeSimulatorTab = tabId;
  playTactileFeedback('click');

  document.querySelectorAll('.sim-tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.sim-nav-btn').forEach(btn => {
    btn.classList.remove('bg-[#C5A059]', 'text-[#070709]', 'border-[#C5A059]', 'font-bold');
    btn.classList.add('bg-[#0E0E12]', 'text-[#9B9BA6]', 'border-[#1A1A22]');
  });

  const activeContent = document.getElementById(`simTab-${tabId}`);
  const activeBtn = document.getElementById(`tabBtn-${tabId}`);

  if (activeContent) activeContent.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.remove('bg-[#0E0E12]', 'text-[#9B9BA6]', 'border-[#1A1A22]');
    activeBtn.classList.add('bg-[#C5A059]', 'text-[#070709]', 'border-[#C5A059]', 'font-bold');
  }

  if (tabId === 'client-portal') {
    updatePortalView();
  }
}

// ============================================================
// DYNAMIC CLIENT RENDERERS (TRACKING, BILLING, DATABASE)
// ============================================================

// 1. Case Tracking Renderer
function renderCaseDetails(caseId) {
  const caseData = demoCases[caseId] || demoCases['CIV-2026-084'];
  const container = document.getElementById('caseDetailsDisplay');
  if (!container) return;

  let stepsHtml = caseData.steps.map(step => {
    let circleClass = 'bg-[#15151C] text-[#5C5C68] border-[#1A1A22]';
    let labelClass = 'text-[#5C5C68]';
    let checkIcon = '<span class="w-1.5 h-1.5 rounded-full bg-[#262633]"></span>';

    if (step.completed) {
      circleClass = 'bg-[#070709] text-[#C5A059] border-[#C5A059]';
      labelClass = 'text-[#F2F2F5] font-medium';
      checkIcon = `<svg class="w-3.5 h-3.5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`;
    } else if (step.current) {
      circleClass = 'bg-[#15151C] text-[#D6BC83] border-[#D6BC83]';
      labelClass = 'text-[#D6BC83] font-semibold';
      checkIcon = `<span class="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>`;
    }

    return `
      <div class="flex items-start gap-3 relative pb-4 last:pb-0">
        <div class="w-6 h-6 rounded-full flex items-center justify-center border ${circleClass} shrink-0 mt-0.5 z-10 bg-[#070709]">
          ${checkIcon}
        </div>
        <div class="flex-1">
          <p class="text-xs sm:text-sm ${labelClass}">${step.name}</p>
          <span class="text-[11px] font-mono text-[#5C5C68]">${step.date}</span>
        </div>
      </div>
    `;
  }).join('');

  let jargonHtml = caseData.jargonTerms.map(j => `
    <div class="p-3 bg-[#070709] rounded border border-[#1A1A22] text-xs">
      <span class="font-bold text-[#C5A059] font-mono">${j.term}:</span>
      <span class="text-[#9B9BA6] ml-1 leading-relaxed">${j.def}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="editorial-card p-6">
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A1A22] pb-4 mb-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-xs font-mono px-2.5 py-0.5 rounded bg-[#15151C] text-[#C5A059] border border-[#262633] font-bold">${caseData.id}</span>
            <span class="legal-badge ${caseData.statusClass}">${caseData.status}</span>
          </div>
          <h3 class="text-lg font-serif font-bold text-[#FAF5EB]">${caseData.title}</h3>
          <p class="text-xs text-[#5C5C68] mt-0.5">Practice Area: <strong class="text-[#9B9BA6]">${caseData.type}</strong></p>
        </div>
        <div class="text-right">
          <p class="text-xs text-[#5C5C68] font-mono">Date Filed</p>
          <p class="text-sm font-bold text-[#F2F2F5]">${caseData.dateFiled}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 class="text-xs font-mono uppercase tracking-wider text-[#9B9BA6] font-semibold mb-3 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Case Milestone Progress
          </h4>
          <div class="timeline-stem ml-2">
            ${stepsHtml}
          </div>
        </div>

        <div>
          <h4 class="text-xs font-mono uppercase tracking-wider text-[#9B9BA6] font-semibold mb-3 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Next Court Appearance & Hearing
          </h4>
          <div class="p-4 bg-[#070709] rounded border border-[#1A1A22] mb-4">
            <p class="text-xs text-[#C5A059] font-mono font-bold">Scheduled Hearing / Appearance:</p>
            <p class="text-sm font-bold text-[#FAF5EB] mt-1">${caseData.nextHearing}</p>
            <p class="text-xs text-[#9B9BA6] mt-2 italic font-sans">Counsel Note: "${caseData.attyNotes}"</p>
          </div>

          <h4 class="text-xs font-mono uppercase tracking-wider text-[#9B9BA6] font-semibold mb-2 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Plain-Language Legal Jargon Decoder
          </h4>
          <div class="space-y-2">
            ${jargonHtml}
          </div>
        </div>
      </div>

      <div class="bg-[#070709] p-4 rounded border border-[#1A1A22] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2">
          <span class="pulse-beacon"></span>
          <span class="text-[#9B9BA6]">Portal Sync: Real-Time Synchronized (99.0% SLA Uptime)</span>
        </div>
        <button onclick="handleBillingTabClick()" class="btn-primary text-xs py-1.5 px-3">
          Inspect Billing Breakdown →
        </button>
      </div>
    </div>
  `;
}

// 2. Billing Breakdown Only Renderer (kapag user na)
function renderBillingBreakdown(caseId) {
  const caseData = demoCases[caseId] || demoCases['CIV-2026-084'];
  const container = document.getElementById('billingBreakdownDisplay');
  if (!container) return;

  const isVerified = Boolean(state.otpVerifiedCases[caseId]);

  if (!isVerified) {
    container.innerHTML = `
      <div class="editorial-card p-8 text-center max-w-2xl mx-auto space-y-4">
        <div class="w-12 h-12 rounded-full bg-[#15151C] border border-[#C5A059]/40 flex items-center justify-center mx-auto text-[#C5A059]">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        </div>
        <span class="folio-number">DATA PRIVACY ACT OF 2012 // REPUBLIC ACT NO. 10173</span>
        <h3 class="font-serif font-bold text-lg text-[#FAF5EB]">Financial Ledger Protected by 2FA Callback</h3>
        <p class="text-xs text-[#9B9BA6] leading-relaxed max-w-lg mx-auto font-sans">
          To strictly preserve attorney-client fiduciary confidentiality, detailed monetary balances and appearance retainer breakdowns for <strong class="text-[#FAF5EB]">${caseData.client} (${caseData.id})</strong> require an authorized out-of-band verification callback before disclosure.
        </p>
        <div class="pt-2">
          <button onclick="requestBillingBreakdown('${caseId}')" class="btn-primary text-xs py-2 px-5">
            🔑 Unlock Financial Ledger with OTP
          </button>
        </div>
        <p class="text-[10px] font-mono text-[#5C5C68]">Simulated Out-of-Band Telephone Verification • Demo 6-Digit Code: 849201</p>
      </div>
    `;
    return;
  }

  const itemsHtml = (caseData.billingItems || []).map(item => `
    <div class="p-3 bg-[#070709] rounded border border-[#1A1A22] flex items-center justify-between text-xs font-mono">
      <div>
        <p class="text-[#FAF5EB] font-bold font-sans">${item.item}</p>
        <span class="text-[11px] text-[#5C5C68]">${item.status}</span>
      </div>
      <div class="text-right">
        <span class="text-sm font-bold text-[#C5A059]">${item.amount}</span>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="editorial-card p-6">
      <div class="flex flex-wrap items-center justify-between border-b border-[#1A1A22] pb-4 mb-5">
        <div>
          <span class="text-xs font-mono px-2 py-0.5 rounded bg-[#15151C] text-[#C5A059] border border-[#262633] font-bold">${caseData.id}</span>
          <h3 class="text-lg font-serif font-bold text-[#FAF5EB] mt-1.5">Official Billing & Retainer Breakdown</h3>
          <p class="text-xs text-[#5C5C68]">Client: <strong class="text-[#9B9BA6]">${caseData.client}</strong> • Reference: ${caseData.financials.receiptNo}</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="lockBillingLedger('${caseId}')" class="btn-secondary text-xs py-1.5 px-3 border-[#C5A059]/30 text-[#C5A059] hover:text-[#FAF5EB]">
            🔒 Lock Ledger
          </button>
          <button onclick="downloadMockReceipt()" class="btn-primary text-xs py-1.5 px-3.5">
            <svg class="w-3.5 h-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            View Official E-Receipt (PDF)
          </button>
        </div>
      </div>

      <!-- Financial Totals Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="p-4 bg-[#070709] rounded border border-[#1A1A22]">
          <p class="text-xs font-mono text-[#5C5C68]">Agreed Professional Fees</p>
          <p class="text-2xl font-mono font-bold text-[#FAF5EB] mt-1">${caseData.financials.totalFees}</p>
          <p class="text-[10px] font-mono text-[#9B9BA6] mt-0.5">Retainer Agreement</p>
        </div>
        <div class="p-4 bg-[#070709] rounded border border-[#1A1A22]">
          <p class="text-xs font-mono text-[#5C5C68]">Settled to Date</p>
          <p class="text-2xl font-mono font-bold text-[#34D399] mt-1">${caseData.financials.paidAmount}</p>
          <p class="text-[10px] font-mono text-[#34D399] mt-0.5">✓ Certified Received</p>
        </div>
        <div class="p-4 bg-[#070709] rounded border border-[#1A1A22]">
          <p class="text-xs font-mono text-[#5C5C68]">Remaining Balance Due</p>
          <p class="text-2xl font-mono font-bold text-[#C5A059] mt-1">${caseData.financials.balanceDue}</p>
          <p class="text-[10px] font-mono text-[#C5A059] mt-0.5">${caseData.financials.balanceDue === '₱ 0.00' ? 'Account Clear' : 'Due upon Stage Completion'}</p>
        </div>
      </div>

      <!-- Itemized Ledger Breakdown -->
      <h4 class="text-xs font-mono uppercase tracking-wider text-[#9B9BA6] font-semibold mb-3">Itemized Retainer & Appearance Ledger</h4>
      <div class="space-y-2 mb-6">
        ${itemsHtml}
      </div>

      <!-- Fiduciary Disclosure Notice -->
      <div class="p-4 bg-[#070709] rounded border border-[#1A1A22] text-xs text-[#9B9BA6] flex items-start gap-3">
        <span class="w-2 h-2 rounded-full bg-[#C5A059] shrink-0 mt-1"></span>
        <div>
          <strong class="text-[#FAF5EB]">Fiduciary Ethical Guarantee:</strong> In strict compliance with Atty. Allan P. Belde's business rules and the Data Privacy Act (RA 10173), financial ledgers are restricted solely to the authenticated client. Official E-Receipts are certified under notarial commission serials and BIR guidelines.
        </div>
      </div>
    </div>
  `;
}

// 3. Client Database Renderer (kapag user na)
function renderClientDatabase(caseId) {
  const caseData = demoCases[caseId] || demoCases['CIV-2026-084'];
  const container = document.getElementById('clientDatabaseDisplay');
  if (!container) return;

  const docsHtml = (caseData.documents || []).map(doc => `
    <div class="editorial-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#15151C] text-[#C5A059] border border-[#262633]">${doc.type}</span>
          <span class="text-[11px] font-mono text-[#5C5C68]">${doc.date}</span>
        </div>
        <h5 class="font-serif font-bold text-sm text-[#FAF5EB]">${doc.title}</h5>
        <p class="text-[11px] text-[#9B9BA6] font-mono mt-0.5">Reference: ${doc.ref}</p>
      </div>
      <div class="text-right shrink-0">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070709] border border-[#1A1A22] text-[10px] font-mono text-[#34D399]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#34D399]"></span>
          ${doc.vault}
        </span>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="editorial-card p-6">
      <div class="flex flex-wrap items-center justify-between border-b border-[#1A1A22] pb-4 mb-5">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-mono px-2.5 py-0.5 rounded bg-[#15151C] text-[#C5A059] border border-[#262633] font-bold">CLIENT DOSSIER</span>
            <span class="legal-badge badge-emerald">RA 10173 PROTECTED</span>
          </div>
          <h3 class="text-lg font-serif font-bold text-[#FAF5EB]">${caseData.client}</h3>
          <p class="text-xs text-[#5C5C68]">Dockets Registered: <strong class="text-[#9B9BA6]">${caseData.id} (${caseData.type})</strong></p>
        </div>
        <div class="text-right text-xs font-mono text-[#5C5C68]">
          <p>Supervising Counsel</p>
          <p class="text-sm font-bold text-[#FAF5EB]">Atty. Allan P. Belde</p>
        </div>
      </div>

      <!-- Verified Contact Credentials Table -->
      <div class="p-4 bg-[#070709] rounded border border-[#1A1A22] mb-6 text-xs font-mono grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <span class="text-[#5C5C68] uppercase text-[10px] font-bold block">Mobile Contact</span>
          <span class="text-[#FAF5EB] font-bold mt-1 block">${caseData.phone}</span>
        </div>
        <div>
          <span class="text-[#5C5C68] uppercase text-[10px] font-bold block">Email Address</span>
          <span class="text-[#FAF5EB] font-bold mt-1 block">${caseData.email}</span>
        </div>
        <div>
          <span class="text-[#5C5C68] uppercase text-[10px] font-bold block">Chambers Jurisdiction</span>
          <span class="text-[#FAF5EB] font-bold mt-1 block">${caseData.court}</span>
        </div>
        <div>
          <span class="text-[#5C5C68] uppercase text-[10px] font-bold block">Emergency Contact</span>
          <span class="text-[#C5A059] font-bold mt-1 block">${caseData.emergencyContact}</span>
        </div>
      </div>

      <!-- On-Premise Case Records Vault Index -->
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h4 class="text-xs font-mono uppercase tracking-wider text-[#9B9BA6] font-semibold">On-Premise Physical Vault Records Registry</h4>
          <p class="text-[11px] text-[#5C5C68]">In compliance with RA 10173, sensitive original titles and affidavits remain in fireproof office safes in Umingan.</p>
        </div>
        <span class="text-[11px] font-mono text-[#C5A059]">${(caseData.documents || []).length} DEPOSITED INSTRUMENTS</span>
      </div>

      <div class="space-y-3 mb-6">
        ${docsHtml}
      </div>

      <div class="p-4 bg-[#070709] rounded border border-[#1A1A22] text-xs text-[#9B9BA6] flex items-center justify-between gap-4">
        <span>Need a certified true copy for court presentation? Consult with legal secretary or schedule an office visit.</span>
        <button onclick="openAttyScheduleModal()" class="btn-secondary text-xs py-1.5 px-3 shrink-0">
          Book Office Appearance
        </button>
      </div>
    </div>
  `;
}

// Appointment Booking Submission
function submitAppointmentBooking(e) {
  e.preventDefault();
  playTactileFeedback('success');

  const name = document.getElementById('bookName').value;
  const phone = document.getElementById('bookPhone').value;
  const service = document.getElementById('bookService').value;
  const date = document.getElementById('bookDate').value;
  const time = document.getElementById('bookTime').value;

  const resultContainer = document.getElementById('bookingConfirmationModal');
  if (!resultContainer) return;

  resultContainer.innerHTML = `
    <div class="editorial-card-gold p-6 text-xs text-[#9B9BA6]">
      <div class="flex items-center gap-2 mb-3">
        <span class="w-3 h-3 rounded-full bg-[#34D399]"></span>
        <h4 class="font-serif font-bold text-base text-[#FAF5EB]">Consultation Slot Confirmed</h4>
      </div>
      <p class="mb-3">Atty. Allan P. Belde's calendar has recorded your consultation request:</p>
      <div class="p-3.5 bg-[#070709] rounded border border-[#1A1A22] font-mono space-y-1 mb-4 text-[#F2F2F5]">
        <p>Client: <strong class="text-[#FAF5EB]">${name}</strong> (${phone})</p>
        <p>Practice Area: <strong class="text-[#C5A059]">${service}</strong></p>
        <p>Schedule: <strong class="text-[#34D399]">${date} at ${time}</strong></p>
        <p>Chambers: Cariño St., Poblacion West, Umingan, Pangasinan</p>
      </div>
      <p class="text-[11px] text-[#5C5C68]">Automated SMS notification dispatched. Legal secretary will perform conflict-of-interest verification prior to consultation.</p>
      <div class="mt-4 flex justify-end">
        <button onclick="document.getElementById('bookingConfirmationModal').classList.add('hidden')" class="btn-secondary text-xs py-1 px-3">
          Dismiss
        </button>
      </div>
    </div>
  `;
  resultContainer.classList.remove('hidden');
  resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// OTP Financial Verification
function requestBillingBreakdown(caseId) {
  playTactileFeedback('click');
  const modal = document.getElementById('otpVerificationModal');
  if (!modal) return;

  const targetCase = demoCases[caseId] || demoCases[state.activeClientCase] || demoCases['CIV-2026-084'];
  const titleEl = document.getElementById('otpCaseTitle');
  const phoneEl = document.getElementById('otpMaskedPhone');
  const inputEl = document.getElementById('otpInput');

  if (titleEl) titleEl.textContent = `${targetCase.id} - ${targetCase.title}`;
  if (phoneEl) phoneEl.textContent = targetCase.phone;
  if (inputEl) inputEl.value = '';

  modal.classList.remove('hidden');
  startOtpCountdown();
}

function startOtpCountdown() {
  clearInterval(state.otpCountdownInterval);
  state.otpTimer = 60;
  const timerEl = document.getElementById('otpCountdown');
  if (timerEl) timerEl.textContent = '60s';

  state.otpCountdownInterval = setInterval(() => {
    state.otpTimer--;
    const el = document.getElementById('otpCountdown');
    if (el) {
      el.textContent = `${state.otpTimer}s`;
    }
    if (state.otpTimer <= 0) {
      clearInterval(state.otpCountdownInterval);
    }
  }, 1000);
}

function fillDemoOtp() {
  playTactileFeedback('click');
  const input = document.getElementById('otpInput');
  if (input) {
    input.value = state.otpCode;
  }
}

function verifyOtp() {
  const input = document.getElementById('otpInput');
  const modal = document.getElementById('otpVerificationModal');

  if (!input || input.value.trim() !== state.otpCode) {
    showToast("Invalid One-Time Password. For evaluation, use demo code: " + state.otpCode, "error", "Verification Denied");
    playTactileFeedback('click');
    return;
  }

  playTactileFeedback('success');
  clearInterval(state.otpCountdownInterval);
  if (modal) modal.classList.add('hidden');

  const currentCase = state.activeClientCase;
  state.otpVerifiedCases[currentCase] = true;

  showToast("RA 10173 2FA Callback Verified: Financial ledger unlocked for " + (demoCases[currentCase]?.client || 'Client'), "success", "Financial Access Authorized");
  setClientSubTab('billing-breakdown');
}

function downloadMockReceipt() {
  playTactileFeedback('success');
  const modal = document.getElementById('receiptModal');
  if (!modal) return;

  const caseData = demoCases[state.activeClientCase] || demoCases['CIV-2026-084'];

  // Dynamically populate official receipt fields
  const noEl = document.getElementById('receiptNoDisplay');
  const dateEl = document.getElementById('receiptDateDisplay');
  const clientEl = document.getElementById('receiptClientDisplay');
  const caseEl = document.getElementById('receiptCaseDisplay');
  const payForEl = document.getElementById('receiptPaymentForDisplay');
  const amountEl = document.getElementById('receiptAmountDisplay');
  const balanceEl = document.getElementById('receiptBalanceDisplay');

  if (noEl) noEl.textContent = caseData.financials.receiptNo;
  if (dateEl) {
    const today = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const formattedDate = `${months[today.getMonth()]} ${String(today.getDate()).padStart(2, '0')}, ${today.getFullYear()}`;
    dateEl.textContent = formattedDate;
  }
  if (clientEl) clientEl.textContent = caseData.client;
  if (caseEl) caseEl.textContent = `${caseData.id} (${caseData.title})`;
  if (payForEl) {
    if (caseData.id === 'CIV-2026-084') {
      payForEl.textContent = 'Judicial Partition & Pleading Appearance Fee';
    } else if (caseData.id === 'FAM-2026-019') {
      payForEl.textContent = 'Guardianship Petition Drafting & Social Assessment Filing';
    } else {
      payForEl.textContent = 'Deed of Absolute Sale, Acknowledgment & Notarial Seal';
    }
  }
  if (amountEl) amountEl.textContent = caseData.financials.paidAmount;
  if (balanceEl) balanceEl.textContent = caseData.financials.balanceDue;

  modal.classList.remove('hidden');
  showToast(`Official Electronic Receipt ${caseData.financials.receiptNo} rendered under Atty. Belde's seal.`, "gold", "E-Receipt Generated");
}

// Legal Secretary End-of-Day Dispatch Simulation
function dispatchDailyAuditToAtty() {
  playTactileFeedback('success');
  showToast("End-of-day summary (4 intakes, 3 conflict clearances, 2 court filings, 18 notarial entries) compiled and securely transmitted to Atty. Allan P. Belde.", "success", "Executive Dispatch Confirmed");
}

// Conflict-of-Interest Checker Simulation
function runConflictCheck() {
  playTactileFeedback('click');
  const prospective = document.getElementById('conflictClientName').value.trim();
  const adverse = document.getElementById('conflictAdverseParty').value.trim();
  const resultBox = document.getElementById('conflictCheckResult');

  if (!prospective || !adverse) {
    showToast("Please provide both prospective client and adverse party names for conflict clearance.", "error", "Missing Information");
    return;
  }

  const isConflict = adverse.toLowerCase().includes('santos') || adverse.toLowerCase().includes('belde');

  if (isConflict) {
    resultBox.innerHTML = `
      <div class="p-4 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.25)] rounded text-xs text-[#F87171]">
        <div class="flex items-center gap-2 font-bold mb-1 text-sm text-[#F87171]">
          <svg class="w-4 h-4 text-[#F87171]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          POTENTIAL CONFLICT OF INTEREST DETECTED
        </div>
        <p class="leading-relaxed">The adverse party "${adverse}" matches an active client or retained party in current firm records (Case: CIV-2026-084). Under legal ethics and Atty. Belde's business rules, immediate disclosure must be rendered to prospective client "${prospective}". Engagement cannot proceed.</p>
      </div>
    `;
    showToast(`Conflict flagged: Adverse party "${adverse}" matches an active retainer!`, "error", "Ethical Conflict Detected");
  } else {
    resultBox.innerHTML = `
      <div class="p-4 bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.25)] rounded text-xs text-[#34D399]">
        <div class="flex items-center gap-2 font-bold mb-1 text-sm text-[#34D399]">
          <svg class="w-4 h-4 text-[#34D399]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          ETHICAL CONFLICT CLEARANCE: APPROVED
        </div>
        <p class="leading-relaxed">No active representation conflict exists between "${prospective}" and "${adverse}". Authorized Legal Secretary may proceed with Client Intake and Digital Record creation.</p>
      </div>
    `;
    showToast(`Conflict clearance approved for ${prospective}.`, "success", "Clearance Approved");
  }
  resultBox.classList.remove('hidden');
}

// BPMN Step Simulator (Scoped to Active View Container to Prevent Phantom Delays)
function startBpmnAnimation() {
  playTactileFeedback('click');
  pauseBpmnAnimation();

  // Scope query to the currently active view container
  let container;
  if (state.currentMode === 'presentation') {
    container = document.querySelector('.presentation-slide:not(.hidden)');
  } else {
    container = document.getElementById('simTab-bpmn-visualizer');
  }

  const nodes = container ? container.querySelectorAll('.bpmn-step-node') : document.querySelectorAll('.bpmn-step-node');
  if (!nodes.length) return;

  state.bpmnStep = 0;
  // Immediately highlight step 0 without waiting for first interval
  nodes.forEach(n => n.classList.remove('bpmn-active'));
  nodes[0].classList.add('bpmn-active');

  state.bpmnInterval = setInterval(() => {
    state.bpmnStep = (state.bpmnStep + 1) % nodes.length;
    nodes.forEach(n => n.classList.remove('bpmn-active'));
    if (nodes[state.bpmnStep]) {
      nodes[state.bpmnStep].classList.add('bpmn-active');
      playTactileFeedback('click');
    }
  }, 1200);
}

function pauseBpmnAnimation() {
  clearInterval(state.bpmnInterval);
  document.querySelectorAll('.bpmn-step-node').forEach(n => n.classList.remove('bpmn-active'));
}

// Floating Toast Notification System
function showToast(message, type = 'gold', title = 'System Notification') {
  const toast = document.getElementById('systemToast');
  const titleEl = document.getElementById('systemToastTitle');
  const msgEl = document.getElementById('systemToastMessage');
  const iconEl = document.getElementById('systemToastIcon');
  if (!toast || !msgEl) return;

  if (titleEl) titleEl.textContent = title;
  msgEl.textContent = message;

  if (type === 'success') {
    iconEl.innerHTML = `<svg class="w-5 h-5 text-[#34D399]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else if (type === 'error') {
    iconEl.innerHTML = `<svg class="w-5 h-5 text-[#F87171]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
  } else {
    iconEl.innerHTML = `<svg class="w-5 h-5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }

  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(state.toastTimeout);
  state.toastTimeout = setTimeout(() => {
    hideToast();
  }, 4200);
}

function hideToast() {
  const toast = document.getElementById('systemToast');
  if (toast) {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }
}

// Requirements Dossier Filter
function filterRequirements() {
  const query = document.getElementById('reqSearchInput').value.toLowerCase();
  const category = document.getElementById('reqCategoryFilter').value;
  const cards = document.querySelectorAll('.req-card');

  cards.forEach(card => {
    const cardText = card.textContent.toLowerCase();
    const cardCat = card.getAttribute('data-category');
    const matchesQuery = cardText.includes(query);
    const matchesCat = (category === 'all' || cardCat === category);

    if (matchesQuery && matchesCat) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    return;
  }

  if (state.currentMode === 'presentation') {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key.toLowerCase() === 'f') {
      toggleFullScreen();
    } else if (e.key.toLowerCase() === 'n') {
      toggleSpeakerNotes();
    }
  }
});

// Ambient Bokeh Gold Dust Canvas
function initAmbientBackground() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const isMobile = width < 768;
  const particleCount = isMobile ? 32 : 65;
  const particles = [];

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class GoldDust {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = -Math.random() * 0.35 - 0.08;
      this.radius = Math.random() * 1.6 + 0.6;
      this.baseAlpha = Math.random() * 0.35 + 0.12;
      this.alpha = this.baseAlpha;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.015 + 0.008;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulsePhase += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.1;

      if (this.y < -10) this.reset();
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(197, 160, 89, ${Math.max(0.04, this.alpha)})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new GoldDust());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  updateSlideView();
  updateTimerDisplay();
  initAmbientBackground();

  const selectEl = document.getElementById('slideJumpSelect');
  if (selectEl) {
    const titles = [
      "Title & Academic Credentials",
      "Executive Summary & Project Scope",
      "Firm Profile: Belde's Legal Services",
      "Business Rules & Legal Ethics",
      "Current Workflow & Operational Gaps",
      "The Proposed Integrated Architecture",
      "Stakeholder Personas & Role Privileges",
      "Data Privacy Shield (RA 10173)",
      "Eight Core Functional Modules",
      "Interactive 3-Lane BPMN Architecture",
      "Multi-Dimensional Feasibility",
      "Performance SLAs & Security Controls",
      "Interactive Prototype Walkthrough",
      "SLU Group 2 Research Team & Q&A"
    ];
    titles.forEach((t, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${i + 1}. ${t}`;
      selectEl.appendChild(opt);
    });
    selectEl.addEventListener('change', (e) => {
      goToSlide(parseInt(e.target.value, 10));
    });
  }

  // Initial Case render
  renderCaseDetails('CIV-2026-084');
});
