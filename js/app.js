/**
 * Belde's Notarial & Legal Services Presentation & System Simulation
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
  notesVisible: false
};

// Speaker Notes Data
const speakerNotes = [
  "Slide 1: Welcome everyone, Facilitator Ma. Clarissa Mabitazan, and classmates. Today, Group 2 presents our Business Case: An Integrated Case, Records, and Scheduling System for Belde's Notarial and Legal Services.",
  "Slide 2: Provide an executive summary. Established in 2004 in Umingan, Pangasinan, Belde's Law Office is a solo practitioner firm delivering high-caliber legal aid. We identified key operational bottlenecks in manual records and disjointed communications.",
  "Slide 3: Discuss the firm's profile and founder Atty. Allan P. Belde. Highlight their 6 core practice areas, 20-year commitment to the rule of law, and strict compliance with legal ethics.",
  "Slide 4: Detail the firm's business rules. Emphasize that prioritization is calibrated to court deadlines and reglementary periods, client confidentiality is paramount under fiduciary duty, and Atty. Belde conducts daily end-of-day reviews.",
  "Slide 5: Contrast the current manual processes: paper folders in steel filing cabinets, ad-hoc Messenger updates, and potential latency vs. growing caseloads. Note: zero ethical complaints since 2004.",
  "Slide 6: Unveil our proposed solution: A unified digital online portal and administrative records system that bridges clients, legal secretaries, and Atty. Belde into a synchronized digital workflow.",
  "Slide 7: Break down the two-tier user architecture: Primary users (Atty. Belde and Legal Secretaries for case encoding, calendar control) and Secondary users (Clients for tracking, appointments, billing).",
  "Slide 8: Highlight our security and Data Privacy Act (RA 10173) architecture. Explain why sensitive personal records remain offline at the physical office, while the portal retains only basic contact info and utilizes an OTP callback for financial balance inquiries.",
  "Slide 9: Walk through the 8 core functional modules: Account registration with QR manual, record management, jargon-free case tracking, calendar scheduling, billing with e-receipts, service directory, communications, and drafting support.",
  "Slide 10: Present the 3-lane BPMN diagram. Trace the workflow from client intake, secretarial conflict check, attorney legal assessment, document filing, to final disposition.",
  "Slide 11: Present the multi-dimensional Feasibility Analysis: Economic (drastic paper reduction), Technical (high-uptime web stack), Operational (empowers solo practitioner), and Scheduling.",
  "Slide 12: Review the performance metrics: 99% uptime, under 2-second page loads, 24/7 client visibility, role-based access control, and daily automated backups.",
  "Slide 13: Transition to our Live System Prototype. Invite the evaluator to test the interactive client tracker, appointment booking, OTP-secured billing, and the secretary admin console.",
  "Slide 14: Acknowledge our Group 2 research team members and open the floor for Q&A with Facilitator Mabitazan."
];

// Demo Case Database for Live Simulation
const demoCases = {
  'CIV-2026-084': {
    id: 'CIV-2026-084',
    title: 'Estate of Santos: Judicial Settlement & Partition',
    type: 'Land & Property / Estate Law',
    client: 'Eduardo M. Santos',
    phone: '+63 917 555 0192',
    dateFiled: 'August 14, 2026',
    status: 'In Court Proceedings',
    statusClass: 'badge-amber',
    nextHearing: 'November 18, 2026 - 9:00 AM (RTC Branch 42, Tayug)',
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
    jargonTerms: [
      { term: 'Partition', def: 'The legal division of real property among co-owners or heirs so each gets their individual share.' },
      { term: 'Reglementary Period', def: 'The strict time limit set by court rules within which an action or response must be submitted.' }
    ]
  },
  'FAM-2026-019': {
    id: 'FAM-2026-019',
    title: 'Petition for Legal Guardianship of Minor V.G.',
    type: 'Family Law',
    client: 'Marilou C. Garcia',
    phone: '+63 928 555 4810',
    dateFiled: 'September 02, 2026',
    status: 'Awaiting Court Assessment',
    statusClass: 'badge-blue',
    nextHearing: 'December 04, 2026 - 1:30 PM (Family Court)',
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
    jargonTerms: [
      { term: 'Letters of Guardianship', def: 'An official court certificate authorizing a person to act on behalf of a minor or ward.' }
    ]
  },
  'NOT-2026-142': {
    id: 'NOT-2026-142',
    title: 'Deed of Absolute Sale & Extrajudicial Settlement',
    type: 'Notarial Services & Documentation',
    client: 'Ricardo V. Mendoza',
    phone: '+63 945 555 3321',
    dateFiled: 'October 28, 2026',
    status: 'Ready for Release & Notarization',
    statusClass: 'badge-emerald',
    nextHearing: 'Office Signing - Nov 06, 2026 (2:00 PM)',
    steps: [
      { name: 'Document Presentation & Identity Verification', date: 'Oct 28, 2026', completed: true },
      { name: 'Competent Evidence of Identity Check', date: 'Oct 28, 2026', completed: true },
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
    jargonTerms: [
      { term: 'Acknowledgment', def: 'A formal declaration before a Notary Public that the instrument is the voluntary act of the signatory.' }
    ]
  }
};

// Web Audio Tactile Click Synthesizer
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
    if (type === 'slide') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.start(now);
      osc.stop(now + 0.025);
    }
  } catch (e) {
    // Audio context not allowed or unsupported
  }
}

// Navigation & Slide Management
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
  // Hide all slides
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

  // Update slide counter
  const counterEl = document.getElementById('slideCounter');
  if (counterEl) {
    counterEl.textContent = `${state.currentSlide + 1} / ${state.totalSlides}`;
  }

  // Update progress bar
  const progressEl = document.getElementById('slideProgressBar');
  if (progressEl) {
    const percentage = ((state.currentSlide + 1) / state.totalSlides) * 100;
    progressEl.style.width = `${percentage}%`;
  }

  // Update speaker note
  const notesText = document.getElementById('speakerNotesText');
  if (notesText && speakerNotes[state.currentSlide]) {
    notesText.textContent = speakerNotes[state.currentSlide];
  }

  // Update selector dropdown
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
    modePresBtn.classList.add('btn-primary');
    modePresBtn.classList.remove('btn-secondary');
    modeSimBtn.classList.add('btn-secondary');
    modeSimBtn.classList.remove('btn-primary');
    updateSlideView();
  } else {
    presView.classList.add('hidden');
    simView.classList.remove('hidden');
    modeSimBtn.classList.add('btn-primary');
    modeSimBtn.classList.remove('btn-secondary');
    modePresBtn.classList.add('btn-secondary');
    modePresBtn.classList.remove('btn-primary');
    renderCaseDetails('CIV-2026-084');
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
  const mins = Math.floor(state.timerSeconds / 60).toString().padStart(2, '0');
  const secs = (state.timerSeconds % 60).toString().padStart(2, '0');
  const timerEl = document.getElementById('presentationTimer');
  if (timerEl) {
    timerEl.textContent = `${mins}:${secs}`;
  }
}

// Fullscreen Control
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

// Speaker Notes Toggle
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

// Simulation Tabs
function setSimulatorTab(tabId) {
  state.activeSimulatorTab = tabId;
  playTactileFeedback('click');

  document.querySelectorAll('.sim-tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.sim-nav-btn').forEach(btn => {
    btn.classList.remove('bg-gold-500/20', 'text-gold-400', 'border-gold-500');
    btn.classList.add('text-slate-400', 'border-transparent');
  });

  const activeContent = document.getElementById(`simTab-${tabId}`);
  const activeBtn = document.getElementById(`tabBtn-${tabId}`);

  if (activeContent) activeContent.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('bg-gold-500/20', 'text-gold-400', 'border-gold-500');
    activeBtn.classList.remove('text-slate-400', 'border-transparent');
  }
}

// Case Tracking Simulation
function renderCaseDetails(caseId) {
  const caseData = demoCases[caseId];
  if (!caseData) return;

  const container = document.getElementById('caseDetailsDisplay');
  if (!container) return;

  let stepsHtml = caseData.steps.map(step => {
    let circleClass = 'bg-slate-700 text-slate-400 border-slate-600';
    let labelClass = 'text-slate-400';
    let checkIcon = '<span class="w-2 h-2 rounded-full bg-slate-500"></span>';

    if (step.completed) {
      circleClass = 'bg-emerald-950 text-emerald-400 border-emerald-600';
      labelClass = 'text-slate-200';
      checkIcon = `<svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>`;
    } else if (step.current) {
      circleClass = 'bg-amber-950 text-amber-400 border-amber-500 animate-pulse';
      labelClass = 'text-amber-300 font-semibold';
      checkIcon = `<span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>`;
    }

    return `
      <div class="flex items-start gap-3 relative pb-5 last:pb-0">
        <div class="w-6 h-6 rounded-full flex items-center justify-center border ${circleClass} shrink-0 mt-0.5 z-10 bg-slate-900">
          ${checkIcon}
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium ${labelClass}">${step.name}</p>
          <span class="text-xs font-mono text-slate-400">${step.date}</span>
        </div>
      </div>
    `;
  }).join('');

  let jargonHtml = caseData.jargonTerms.map(j => `
    <div class="p-3 bg-slate-900/60 rounded border border-slate-800 text-xs">
      <span class="font-semibold text-gold-400 font-mono">${j.term}:</span>
      <span class="text-slate-300 ml-1">${j.def}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="bg-slate-900/90 rounded-lg border border-slate-800 p-6">
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30 font-semibold">${caseData.id}</span>
            <span class="legal-badge ${caseData.statusClass}">${caseData.status}</span>
          </div>
          <h3 class="text-lg font-serif font-bold text-slate-100">${caseData.title}</h3>
          <p class="text-xs text-slate-400 mt-0.5">Practice Area: <strong class="text-slate-300">${caseData.type}</strong></p>
        </div>
        <div class="text-right">
          <p class="text-xs text-slate-400 font-mono">Date Filed</p>
          <p class="text-sm font-semibold text-slate-200">${caseData.dateFiled}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Case Workflow Progress
          </h4>
          <div class="timeline-stem ml-2">
            ${stepsHtml}
          </div>
        </div>

        <div>
          <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Next Reglementary & Court Calendar
          </h4>
          <div class="p-4 bg-slate-950/70 rounded border border-slate-800 mb-4">
            <p class="text-xs text-amber-400 font-mono font-medium">Scheduled Court Appearance:</p>
            <p class="text-sm font-bold text-slate-100 mt-1">${caseData.nextHearing}</p>
            <p class="text-xs text-slate-400 mt-2">Supervising Counsel: Atty. Allan P. Belde</p>
          </div>

          <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Plain-Language Legal Jargon Decoder
          </h4>
          <div class="space-y-2">
            ${jargonHtml}
          </div>
        </div>
      </div>

      <div class="bg-slate-950/80 p-4 rounded border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2">
          <span class="pulse-beacon"></span>
          <span class="text-slate-300">Client Portal Status: Real-Time Synchronized (99% SLA Uptime)</span>
        </div>
        <button onclick="requestBillingBreakdown('${caseData.id}')" class="btn-primary text-xs py-1.5 px-3">
          Request Billing & OTP Verification
        </button>
      </div>
    </div>
  `;
}

// Appointment Booking Simulation
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

  const refCode = `APP-${Math.floor(100000 + Math.random() * 900000)}`;

  resultContainer.innerHTML = `
    <div class="p-6 bg-slate-900 border border-emerald-500/40 rounded-lg">
      <div class="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/50">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h3 class="text-center font-serif text-lg font-bold text-slate-100">Appointment Scheduled Successfully</h3>
      <p class="text-center text-xs text-slate-400 mt-1">Belde's Notarial & Legal Services Centralized Calendar</p>

      <div class="mt-4 p-4 bg-slate-950 rounded border border-slate-800 font-mono text-xs space-y-1.5">
        <div class="flex justify-between"><span class="text-slate-400">Reference:</span><span class="text-gold-400 font-bold">${refCode}</span></div>
        <div class="flex justify-between"><span class="text-slate-400">Client:</span><span class="text-slate-200">${name}</span></div>
        <div class="flex justify-between"><span class="text-slate-400">Service:</span><span class="text-slate-200">${service}</span></div>
        <div class="flex justify-between"><span class="text-slate-400">Date & Slot:</span><span class="text-emerald-400 font-semibold">${date} at ${time}</span></div>
        <div class="flex justify-between"><span class="text-slate-400">Venue:</span><span class="text-slate-300">Cariño St., Poblacion West, Umingan</span></div>
      </div>

      <p class="text-xs text-slate-400 mt-3 text-center">An automated SMS reminder will be dispatched 24 hours prior to your consultation.</p>
      
      <div class="mt-5 flex justify-center">
        <button onclick="document.getElementById('bookingConfirmationModal').classList.add('hidden')" class="btn-secondary text-xs">
          Close Confirmation
        </button>
      </div>
    </div>
  `;
  resultContainer.classList.remove('hidden');
}

// OTP Financial Inquiry Simulation
function requestBillingBreakdown(caseId) {
  playTactileFeedback('click');
  const modal = document.getElementById('otpVerificationModal');
  if (!modal) return;

  const targetCase = demoCases[caseId] || demoCases['CIV-2026-084'];
  document.getElementById('otpCaseTitle').textContent = `${targetCase.id} - ${targetCase.title}`;
  document.getElementById('otpMaskedPhone').textContent = targetCase.phone;
  modal.classList.remove('hidden');

  startOtpCountdown();
}

function startOtpCountdown() {
  clearInterval(state.otpCountdownInterval);
  state.otpTimer = 60;
  state.otpCountdownInterval = setInterval(() => {
    state.otpTimer--;
    const timerEl = document.getElementById('otpCountdown');
    if (timerEl) {
      timerEl.textContent = `${state.otpTimer}s`;
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
  const resultDisplay = document.getElementById('billingResultDisplay');

  if (!input || input.value.trim() !== state.otpCode) {
    alert("Invalid One-Time Password. Please use demo code: " + state.otpCode);
    return;
  }

  playTactileFeedback('success');
  clearInterval(state.otpCountdownInterval);
  modal.classList.add('hidden');

  if (resultDisplay) {
    resultDisplay.innerHTML = `
      <div class="p-6 bg-slate-900 border border-gold-500/40 rounded-lg">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span class="text-xs font-mono uppercase text-emerald-400 font-bold">Identity Verified via Out-of-Band OTP Callback</span>
          </div>
          <span class="text-xs font-mono text-slate-400">Data Privacy Act (RA 10173) Compliant</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="p-3 bg-slate-950 rounded border border-slate-800">
            <p class="text-xs text-slate-400 font-mono">Agreed Professional Fees</p>
            <p class="text-lg font-bold text-slate-100 font-mono">₱ 45,000.00</p>
          </div>
          <div class="p-3 bg-slate-950 rounded border border-slate-800">
            <p class="text-xs text-slate-400 font-mono">Settled to Date</p>
            <p class="text-lg font-bold text-emerald-400 font-mono">₱ 30,000.00</p>
          </div>
          <div class="p-3 bg-slate-950 rounded border border-slate-800">
            <p class="text-xs text-slate-400 font-mono">Remaining Balance Due</p>
            <p class="text-lg font-bold text-amber-400 font-mono">₱ 15,000.00</p>
          </div>
        </div>

        <div class="p-4 bg-slate-950/70 rounded border border-slate-800 text-xs text-slate-300 mb-4 space-y-1">
          <p><strong class="text-slate-200">Legal Ethics & Data Safeguard Notice:</strong> As mandated by Atty. Belde's business rules, an authorized legal secretary representative has logged this financial inquiry. Official E-Receipts (PDF) are generated within 5 seconds.</p>
        </div>

        <div class="flex justify-end gap-3">
          <button onclick="downloadMockReceipt()" class="btn-primary text-xs">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Download Official E-Receipt (PDF)
          </button>
        </div>
      </div>
    `;
    resultDisplay.classList.remove('hidden');
    resultDisplay.scrollIntoView({ behavior: 'smooth' });
  }
}

function downloadMockReceipt() {
  playTactileFeedback('success');
  alert("Official E-Receipt OR-2026-0981 generated and verified under Atty. Allan P. Belde's notarial seal. (Simulated instant PDF download)");
}

// Conflict-of-Interest Checker Simulation
function runConflictCheck() {
  playTactileFeedback('click');
  const prospective = document.getElementById('conflictClientName').value.trim();
  const adverse = document.getElementById('conflictAdverseParty').value.trim();
  const resultBox = document.getElementById('conflictCheckResult');

  if (!prospective || !adverse) {
    alert("Please provide both prospective client and adverse party names for conflict clearance.");
    return;
  }

  // Pre-seeded conflict triggers for demo
  const isConflict = adverse.toLowerCase().includes('santos') || adverse.toLowerCase().includes('belde');

  if (isConflict) {
    resultBox.innerHTML = `
      <div class="p-4 bg-rose-950/40 border border-rose-600/60 rounded-lg text-rose-300 text-xs">
        <div class="flex items-center gap-2 font-bold mb-1 text-sm text-rose-200">
          <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          POTENTIAL CONFLICT OF INTEREST DETECTED
        </div>
        <p>The adverse party "${adverse}" matches an active client or retained party in current firm records (Case: CIV-2026-084). Under legal ethics and Atty. Belde's business rules, immediate disclosure must be rendered to prospective client "${prospective}". Engagement cannot proceed.</p>
      </div>
    `;
  } else {
    resultBox.innerHTML = `
      <div class="p-4 bg-emerald-950/40 border border-emerald-600/60 rounded-lg text-emerald-300 text-xs">
        <div class="flex items-center gap-2 font-bold mb-1 text-sm text-emerald-200">
          <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          ETHICAL CONFLICT CLEARANCE: APPROVED
        </div>
        <p>No active representation conflict exists between "${prospective}" and "${adverse}". Authorized Legal Secretary may proceed with Client Intake and Digital Record creation.</p>
      </div>
    `;
  }
  resultBox.classList.remove('hidden');
}

// BPMN Interactive Animation
function startBpmnAnimation() {
  playTactileFeedback('click');
  const nodes = document.querySelectorAll('.bpmn-step-node');
  let current = 0;

  clearInterval(state.bpmnInterval);
  nodes.forEach(n => n.classList.remove('active-node'));

  state.bpmnInterval = setInterval(() => {
    nodes.forEach(n => n.classList.remove('active-node'));
    if (nodes[current]) {
      nodes[current].classList.add('active-node');
      nodes[current].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      playTactileFeedback('click');
    }
    current++;
    if (current >= nodes.length) {
      current = 0;
    }
  }, 1500);
}

function pauseBpmnAnimation() {
  clearInterval(state.bpmnInterval);
  playTactileFeedback('click');
}

// Requirements Search Filter
function filterRequirements() {
  const query = document.getElementById('reqSearchInput').value.toLowerCase();
  const category = document.getElementById('reqCategoryFilter').value;
  const cards = document.querySelectorAll('.req-card');

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const cardCat = card.getAttribute('data-category');

    const matchesQuery = !query || text.includes(query);
    const matchesCat = category === 'all' || cardCat === category;

    if (matchesQuery && matchesCat) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Keyboard Event Handlers
document.addEventListener('keydown', (e) => {
  // If user is inside an input or textarea, do not trigger slide navigation
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
    return;
  }

  if (state.currentMode === 'presentation') {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullScreen();
    } else if (e.key === 'n' || e.key === 'N') {
      toggleSpeakerNotes();
    } else if (e.key === 'p' || e.key === 'P') {
      toggleTimer();
    }
  }
});

// Initialization on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  updateSlideView();
  updateTimerDisplay();

  // Populate Slide Jump Select
  const selectEl = document.getElementById('slideJumpSelect');
  if (selectEl) {
    const titles = [
      "Title & Academic Credentials",
      "Executive Summary & Project Scope",
      "Firm Profile: Belde's Legal Services",
      "Business Rules & Legal Ethics",
      "Current Workflow & Pain Points",
      "The Proposed Solution: Integrated System",
      "Audience & Two-Tier User Personas",
      "Security & Data Privacy Shield (RA 10173)",
      "8 Core Functional Modules",
      "Interactive 3-Lane BPMN Architecture",
      "Feasibility Matrix Analysis",
      "Performance & Security SLA Verification",
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

  // Set default case view
  renderCaseDetails('CIV-2026-084');
});
