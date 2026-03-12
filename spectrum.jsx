<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Spectrum Showdown — PGY1 Resident Rumble</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --amber:  #F59E0B;
    --amber-l:#FCD34D;
    --teal:   #14B8A6;
    --red:    #EF4444;
    --bg:     #0B0F1A;
    --card:   #13192B;
    --border: #1E2D47;
  }

  body {
    font-family: Georgia, 'Times New Roman', serif;
    background: var(--bg);
    color: #E8EDF5;
    min-height: 100vh;
  }

  /* ── HEADER ── */
  #header {
    background: linear-gradient(135deg,#0B0F1A 0%,#0D1526 50%,#0B1020 100%);
    border-bottom: 2px solid var(--amber);
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 30px rgba(245,158,11,.15);
  }
  #header.hidden { display: none; }
  .hdr-title { font-size: 1rem; font-weight: 700; color: var(--amber); letter-spacing: .08em; text-transform: uppercase; }
  .hdr-sub   { font-size: .65rem; color: #475569; letter-spacing: .1em; margin-top: 2px; }
  .scoreboard { display: flex; gap: 20px; align-items: center; }
  .score-card {
    text-align: center; padding: 6px 18px;
    border: 1px solid; border-radius: 6px; min-width: 90px;
  }
  .score-card.p1 { border-color: rgba(245,158,11,.4); background: rgba(245,158,11,.07); }
  .score-card.p2 { border-color: rgba(20,184,166,.4);  background: rgba(20,184,166,.07); }
  .score-name { font-size: .62rem; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 1px; }
  .score-card.p1 .score-name { color: var(--amber); }
  .score-card.p2 .score-name { color: var(--teal); }
  .score-val { font-size: 1.5rem; font-weight: 700; }
  .score-card.p1 .score-val { color: var(--amber); }
  .score-card.p2 .score-val { color: var(--teal); }
  .vs-sep { color: #1E2D47; font-size: 1rem; }

  /* ── LAYOUT ── */
  .main { max-width: 820px; margin: 0 auto; padding: 32px 24px 60px; }

  /* ── CARDS ── */
  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 26px 30px;
    margin-bottom: 18px;
  }

  /* ── LABELS / HEADINGS ── */
  .section-label { font-size: .62rem; letter-spacing: .18em; text-transform: uppercase; color: var(--amber); margin-bottom: 6px; }
  .round-label   { font-size: .62rem; letter-spacing: .2em;  text-transform: uppercase; color: var(--amber); margin-bottom: 4px; }
  h1 { font-size: 2.8rem; font-weight: 700; line-height: 1.15; color: #F8FAFC; }
  h1 span { color: var(--amber); }
  h2 { font-size: 1.6rem; font-weight: 700; margin-bottom: 4px; }
  h3 { font-size: 1.05rem; font-weight: 700; color: var(--amber); margin-bottom: 8px; }
  .sub { font-size: .85rem; color: #64748B; margin-top: 2px; }

  /* ── QUESTION ── */
  .question-text { font-size: 1.15rem; line-height: 1.7; color: #E8EDF5; margin-top: 10px; }

  /* ── REVEAL BOXES ── */
  .answer-box  { background:#0D1A2E; border:1px solid var(--teal);    border-radius:8px; padding:16px 20px; margin-top:14px; }
  .pearl-box   { background:#0B1A14; border:1px solid #16A34A;        border-radius:8px; padding:12px 16px; margin-top:10px; }
  .miss-box    { background:#1A0E0E; border:1px solid #7F1D1D;        border-radius:8px; padding:10px 14px; margin-top:10px; }
  .steal-box   { background:#1A0E0E; border:1px solid rgba(245,158,11,.5); border-radius:8px; padding:10px 14px; margin-top:10px; }
  .award-box   { background:#1A0E3A; border:1px solid rgba(124,58,237,.4); border-radius:8px; padding:10px 14px; margin-top:10px; }
  .box-label   { font-size:.6rem; letter-spacing:.18em; text-transform:uppercase; margin-bottom:5px; }
  .answer-box  .box-label { color: var(--teal); }
  .pearl-box   .box-label { color: #4ADE80; }
  .miss-box    .box-label { color: #FCA5A5; }
  .steal-box   .box-label { color: var(--amber); }
  .award-box   .box-label { color: #A78BFA; }
  .box-text    { font-size:.92rem; line-height:1.65; color:#CBD5E1; }
  .pearl-box   .box-text  { color:#A7F3D0; }
  .miss-box    .box-text  { color:#FECACA; }
  .answer-highlight { font-size:1.05rem; font-weight:700; color:var(--teal); margin-bottom:6px; }

  /* ── BUTTONS ── */
  .btn-row { display:flex; gap:10px; flex-wrap:wrap; margin-top:18px; }
  button {
    border:none; border-radius:6px; padding:9px 20px;
    font-size:.85rem; font-weight:600; cursor:pointer;
    letter-spacing:.05em; font-family:Georgia,serif;
    transition: opacity .15s, transform .1s;
  }
  button:hover { opacity:.88; transform: translateY(-1px); }
  button:active { transform: translateY(0); }
  .btn-amber  { background:var(--amber); color:#0B0F1A; }
  .btn-teal   { background:var(--teal);  color:#0B0F1A; }
  .btn-ghost  { background:transparent; color:var(--amber); border:1px solid var(--amber); }
  .btn-green  { background:#166534; color:#D1FAE5; }
  .btn-red    { background:#991B1B; color:#FEE2E2; }
  .btn-gray   { background:transparent; color:#94A3B8; border:1px solid #475569; }
  .btn-p1     { background:rgba(245,158,11,.15); color:var(--amber);  border:1px solid var(--amber); }
  .btn-p2     { background:rgba(20,184,166,.15);  color:var(--teal);   border:1px solid var(--teal); }
  .btn-big    { font-size:1rem; padding:13px 44px; }

  /* ── PILLS / BADGES ── */
  .pts-pill {
    display:inline-block; background:#1E2D47; color:var(--amber-l);
    font-size:.68rem; letter-spacing:.1em; padding:3px 10px;
    border-radius:20px; font-weight:600; margin-left:10px;
  }
  .turn-badge {
    font-size:.68rem; letter-spacing:.12em; text-transform:uppercase;
    padding:4px 14px; border-radius:20px; font-weight:700; border:1px solid;
  }
  .turn-badge.p1 { background:rgba(245,158,11,.15); color:var(--amber); border-color:var(--amber); }
  .turn-badge.p2 { background:rgba(20,184,166,.15);  color:var(--teal);  border-color:var(--teal);  }
  .type-chip {
    display:inline-block; padding:3px 12px; border-radius:20px;
    font-size:.62rem; letter-spacing:.12em; text-transform:uppercase;
    font-weight:700; margin-bottom:10px;
  }
  .chip-org  { background:#1E3A5F; color:#93C5FD; }
  .chip-drug { background:#3D1F5E; color:#C4B5FD; }

  /* ── PROGRESS BAR ── */
  .progress { display:flex; gap:7px; flex-wrap:wrap; margin-top:16px; }
  .prog-dot { width:28px; height:8px; border-radius:4px; transition:background .3s; }

  /* ── META ROW (question number / turn) ── */
  .meta-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
  .meta-num { font-size:.72rem; color:#64748B; }

  /* ── OPTIONS LIST (R3) ── */
  .options-list { list-style:none; margin:14px 0; }
  .options-list li {
    background:#0D1526; border:1px solid var(--border); border-radius:6px;
    padding:9px 15px; margin-bottom:7px; font-size:.93rem; color:#CBD5E1; line-height:1.5;
  }

  /* ── INTRO ── */
  .intro-center { text-align:center; padding-top:28px; padding-bottom:20px; }
  .intro-eyebrow { font-size:.72rem; letter-spacing:.25em; text-transform:uppercase; color:var(--amber); margin-bottom:14px; }
  .intro-tagline { font-size:1rem; color:#64748B; letter-spacing:.1em; margin-bottom:28px; }
  .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px; }
  .stat-card { background:var(--card); border:1px solid var(--border); border-radius:10px; padding:14px 18px; }
  .stat-label { font-size:.58rem; letter-spacing:.18em; text-transform:uppercase; color:#64748B; margin-bottom:3px; }
  .stat-val   { font-size:.95rem; font-weight:600; color:#E8EDF5; }
  .rule-item  { display:flex; gap:10px; margin-bottom:10px; }
  .rule-num   { color:var(--amber); font-weight:700; min-width:18px; }
  .rule-text  { font-size:.93rem; line-height:1.6; color:#CBD5E1; }
  .point-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .point-item { background:#0D1526; border-radius:6px; padding:9px 13px; }
  .point-round{ font-size:.72rem; color:var(--teal); font-weight:600; margin-bottom:2px; }
  .point-desc { font-size:.82rem; color:#94A3B8; }

  /* ── LIGHTNING NOTICE ── */
  .lightning-notice {
    background:var(--card); border:1px solid rgba(124,58,237,.35); border-radius:8px;
    padding:11px 18px; margin-bottom:14px; font-size:.78rem; color:#A78BFA; line-height:1.7;
  }

  /* ── WAGER ── */
  .wager-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
  .wager-label { font-size:.78rem; letter-spacing:.1em; text-transform:uppercase; margin-bottom:5px; }
  .wager-label.p1 { color:var(--amber); }
  .wager-label.p2 { color:var(--teal);  }
  input[type=number] {
    background:#0D1526; border:2px solid var(--border); border-radius:6px;
    padding:9px 14px; font-size:1.1rem; color:#E8EDF5; width:110px;
    font-family:Georgia,serif; outline:none;
  }
  input[type=number]:focus { border-color: var(--amber); }
  .wager-locked { font-size:.82rem; color:#64748B; margin-top:6px; }

  /* ── RESULTS ── */
  .results-header { text-align:center; margin-bottom:28px; padding-top:8px; }
  .results-eyebrow { font-size:.68rem; letter-spacing:.2em; text-transform:uppercase; color:#64748B; margin-bottom:10px; }
  .winner-name { font-size:2.2rem; font-weight:700; color:var(--amber); margin-bottom:4px; }
  .winner-sub  { font-size:.9rem; color:#64748B; }
  .final-score-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:24px; }
  .final-score-card { text-align:center; border-radius:10px; padding:20px; border:1px solid var(--border); background:var(--card); }
  .final-score-card.winner { border-color:rgba(245,158,11,.6); background:#1A1400; }
  .final-champion { font-size:.62rem; color:var(--amber); letter-spacing:.15em; text-transform:uppercase; margin-bottom:6px; }
  .final-p-label  { font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; margin-bottom:3px; }
  .final-score-card.p1 .final-p-label { color:var(--amber); }
  .final-score-card.p2 .final-p-label { color:var(--teal); }
  .final-score-num { font-size:3rem; font-weight:700; }
  .final-score-card.p1 .final-score-num { color:var(--amber); }
  .final-score-card.p2 .final-score-num { color:var(--teal); }
  .final-score-pts { font-size:.72rem; color:#64748B; }
  .rule-row { display:flex; gap:12px; margin-bottom:11px; padding-bottom:11px; border-bottom:1px solid var(--border); }
  .rule-row:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }
  .rule-index { color:var(--amber); font-weight:700; min-width:28px; font-size:.95rem; }
  .rule-body  { font-size:.93rem; line-height:1.6; color:#CBD5E1; }
  .pearl-star-row { display:flex; gap:12px; align-items:flex-start; margin-bottom:11px; }
  .pearl-star { color:var(--amber); font-size:1.1rem; min-width:20px; }
  .pearl-star-text { font-size:.97rem; line-height:1.6; color:#FCD34D; }
  .footer-note { text-align:center; margin-top:20px; padding-bottom:10px; font-size:.72rem; color:#475569; line-height:1.9; }

  /* ── ROUND NAV ── */
  #round-nav { display:flex; justify-content:center; gap:8px; padding-bottom:36px; flex-wrap:wrap; }
  #round-nav.hidden { display:none; }
  .nav-pill {
    font-size:.63rem; letter-spacing:.1em; text-transform:uppercase; padding:4px 12px;
    border-radius:20px; border:1px solid var(--border); color:#475569; background:transparent;
    font-family:Georgia,serif; cursor:default;
  }
  .nav-pill.active { background:rgba(245,158,11,.15); color:var(--amber); border-color:rgba(245,158,11,.5); }

  /* ── WAGER AWARD GRID ── */
  .wager-award-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .wager-award-card { background:#0D1526; border:1px solid var(--border); border-radius:8px; padding:12px 14px; }
  .wager-award-name { font-size:.73rem; font-weight:600; margin-bottom:7px; }
  .wager-award-card.p1 .wager-award-name { color:var(--amber); }
  .wager-award-card.p2 .wager-award-name { color:var(--teal); }
</style>
</head>
<body>

<!-- STICKY HEADER -->
<div id="header" class="hidden">
  <div>
    <div class="hdr-title">Spectrum Showdown</div>
    <div class="hdr-sub" id="hdr-round-label"></div>
  </div>
  <div class="scoreboard">
    <div class="score-card p1">
      <div class="score-name">Player 1</div>
      <div class="score-val" id="score-p1">0</div>
    </div>
    <div class="vs-sep">vs</div>
    <div class="score-card p2">
      <div class="score-name">Player 2</div>
      <div class="score-val" id="score-p2">0</div>
    </div>
  </div>
</div>

<!-- SCREEN CONTAINER -->
<div id="app"></div>

<!-- ROUND NAV -->
<div id="round-nav" class="hidden">
  <div class="nav-pill" data-round="r1">Round 1</div>
  <div class="nav-pill" data-round="r2">Round 2</div>
  <div class="nav-pill" data-round="r3">Round 3</div>
  <div class="nav-pill" data-round="final">Final</div>
</div>

<script>
// ═══════════════════════════════════════════
// GAME DATA
// ═══════════════════════════════════════════

const ROUND1 = [
  { q:"Which penicillins have anti-Pseudomonal activity?", a:"Piperacillin-tazobactam (pip-tazo). Extended-spectrum penicillins ONLY.", pearl:"No other penicillins cover Pseudomonas. Ampicillin, amoxicillin, and nafcillin have zero anti-pseudomonal activity.", miss:"Residents assume all beta-lactams cover Pseudomonas — they don't. Only pip-tazo among the penicillins.", pts:1 },
  { q:"What is the most important clinical difference between cefazolin and ceftriaxone for a known MSSA skin/soft tissue infection?", a:"Cefazolin is PREFERRED for MSSA infections (better intrinsic MSSA activity, inoculum effect not a concern). Ceftriaxone has broader gram-negative coverage but is inferior for MSSA.", pearl:"Cefazolin is the go-to for MSSA bacteremia and surgical prophylaxis. Ceftriaxone is your workhorse for CAP and gram-negative coverage.", miss:"Residents assume newer = better. Cefazolin actually outperforms ceftriaxone specifically for MSSA due to inoculum effect concerns with ceftriaxone.", pts:1 },
  { q:"Which drug classes cover atypical organisms (Mycoplasma, Legionella, Chlamydophila)? Name two classes.", a:"Macrolides (azithromycin, clarithromycin), fluoroquinolones (levofloxacin, moxifloxacin), and doxycycline.", pearl:"Beta-lactams have ZERO activity against atypicals — these organisms lack a cell wall. This is why CAP regimens always include atypical coverage.", miss:"Residents forget Legionella is an atypical. It stains gram-negative but behaves entirely differently.", pts:1 },
  { q:"Name two antibiotics that reliably cover Enterococcus faecalis.", a:"Ampicillin (drug of choice), penicillin, vancomycin, linezolid, daptomycin. Pip-tazo has some activity.", pearl:"Cephalosporins do NOT cover Enterococcus — classic gap. A patient on ceftriaxone who grows Enterococcus in blood cultures needs an immediate regimen change.", miss:"Residents assume 'broad-spectrum' means Enterococcus coverage. Cephalosporins and fluoroquinolones are NOT reliable.", pts:1 },
  { q:"Name three antibiotics with reliable MRSA activity.", a:"Vancomycin, linezolid, daptomycin, ceftaroline, TMP-SMX (skin/soft tissue only, not bacteremia), clindamycin (if susceptible + D-zone negative).", pearl:"Daptomycin CANNOT be used for pneumonia — it is inactivated by pulmonary surfactant. Always think about site of infection first.", miss:"Residents list clindamycin without noting it requires susceptibility testing and D-zone interpretation.", pts:1 },
  { q:"Listeria monocytogenes is intrinsically resistant to which common drug class? What IS the drug of choice?", a:"Intrinsic resistance to cephalosporins. Drug of choice: Ampicillin (+/- gentamicin for synergy). TMP-SMX for PCN-allergic patients.", pearl:"A meningitis patient on ceftriaxone alone is NOT covered for Listeria. Add ampicillin empirically for patients >50 years old, immunocompromised, or neonates.", miss:"Residents forget Listeria coverage in empiric meningitis regimens for high-risk patients — a potentially fatal omission.", pts:1 },
  { q:"Does ceftriaxone adequately cover anaerobes? What about ampicillin-sulbactam?", a:"Ceftriaxone: POOR anaerobic coverage. Ampicillin-sulbactam: GOOD anaerobic coverage (the sulbactam component is key).", pearl:"For aspiration pneumonia or intra-abdominal infections needing anaerobic coverage, ceftriaxone alone is insufficient. Add metronidazole or choose pip-tazo, carbapenems, or amp-sulbactam.", miss:"Residents switch from ceftriaxone + metronidazole to ceftriaxone monotherapy, inadvertently dropping their anaerobic coverage.", pts:1 },
  { q:"Which fluoroquinolone has better gram-positive (Strep pneumoniae) activity — ciprofloxacin or levofloxacin?", a:"Levofloxacin (and moxifloxacin) — the 'respiratory fluoroquinolones.' Ciprofloxacin has poor gram-positive coverage.", pearl:"Ciprofloxacin should NEVER be used as monotherapy for CAP — it lacks reliable pneumococcal coverage. Use levofloxacin or moxifloxacin for respiratory infections.", miss:"Residents think ciprofloxacin is the 'strongest' FQ because of its Pseudomonas coverage, but its gram-positive coverage is actually inferior to levofloxacin.", pts:1 },
  { q:"As cephalosporins advance from 1st to 4th generation, what happens to gram-negative vs. gram-positive coverage?", a:"Gram-negative coverage INCREASES with each generation. Gram-positive coverage DECREASES (cefepime [4th gen] retains some gram-positive activity and adds Pseudomonal coverage).", pearl:"1st gen (cefazolin) = gram-positive powerhouse. 3rd gen (ceftriaxone, ceftazidime) = gram-negative workhorses. 4th gen (cefepime) = broad including Pseudomonas.", miss:"Residents assume higher generation = universally better. The gram-positive tradeoff — especially for Staph — is frequently forgotten.", pts:1 },
  { q:"True or False: Vancomycin covers gram-negative organisms.", a:"FALSE. Vancomycin is gram-positive ONLY. Covers MRSA, MSSA, Streptococcus, Enterococcus (not VRE), and C. diff (oral only).", pearl:"Vancomycin cannot penetrate the outer membrane of gram-negative bacteria. Patients with gram-negative bacteremia on vancomycin alone have NO gram-negative coverage.", miss:"Residents think 'vanc + pip-tazo = total coverage' without realizing pip-tazo is carrying ALL the gram-negative burden in that pairing.", pts:1 },
];

const ROUND2 = [
  { type:"org→drug", q:"MRSA bacteremia — name the first-line treatment and ONE acceptable alternative.", a:"First-line: Vancomycin. Alternative: Daptomycin (bactericidal, acceptable for MRSA bacteremia).", pearl:"Linezolid is NOT preferred for bacteremia — it is bacteriostatic. Daptomycin is bactericidal and the go-to alternative to vancomycin for MRSA bacteremia.", pts:1 },
  { type:"drug→org", q:"DRUG → ORGANISMS: What key organisms does metronidazole cover? What does it NOT cover?", a:"Covers: Anaerobes (Bacteroides fragilis, Clostridium spp., C. diff), and certain protozoa. Does NOT cover: Aerobes — zero aerobic coverage.", pearl:"Metronidazole = anaerobe-specific. It is almost always used in combination (e.g., ceftriaxone + metronidazole) because it provides zero aerobic coverage.", pts:1 },
  { type:"org→drug", q:"Pseudomonas aeruginosa — name at least 3 antibiotic classes or specific agents that cover it.", a:"Pip-tazo, cefepime, ceftazidime, meropenem, imipenem, ciprofloxacin, aztreonam, aminoglycosides (tobramycin, amikacin, gentamicin).", pearl:"Ertapenem does NOT cover Pseudomonas — this is one of the highest-yield carbapenem distinctions. When you need Pseudomonal coverage, reach for meropenem or imipenem.", pts:2 },
  { type:"org→drug", q:"Enterococcus faecalis grows in a blood culture. Sensitivities show ampicillin-susceptible. What should you use — and what should you NOT use?", a:"USE: Ampicillin (de-escalate from vancomycin). DO NOT USE: Cephalosporins (no coverage), fluoroquinolones (unreliable), vancomycin if ampicillin can be used.", pearl:"Ampicillin is superior to vancomycin for susceptible Enterococcus. De-escalating from vancomycin to ampicillin when sensitivities permit is a core stewardship principle.", pts:2 },
  { type:"drug→org", q:"DRUG → GAPS: Name 4 organisms that ceftriaxone does NOT reliably cover.", a:"MRSA, Pseudomonas aeruginosa, Enterococcus spp., Listeria monocytogenes, anaerobes.", pearl:"Ceftriaxone has a deceptively narrow spectrum despite being called 'broad-spectrum.' Know its gaps by heart — this is tested on every ID consult.", pts:2 },
  { type:"org→drug", q:"ESBL-producing E. coli in a blood culture. What is the drug of choice for definitive therapy?", a:"Carbapenems (meropenem or ertapenem). Pip-tazo is generally NOT recommended for serious ESBL infections due to inoculum effect. Oral step-down options for UTI only: nitrofurantoin or fosfomycin.", pearl:"The inoculum effect: pip-tazo may appear susceptible in vitro but fail clinically for ESBL bacteremia. Carbapenems are the safer choice for serious infections.", pts:3 },
  { type:"org→drug", q:"Severe Legionella pneumonia in an ICU patient. What is your preferred antibiotic?", a:"Levofloxacin (preferred in severe/ICU). Azithromycin is drug of choice for mild-moderate. Doxycycline is an alternative.", pearl:"Legionella requires intracellular penetration — beta-lactams are completely ineffective. Fluoroquinolones are preferred for severe disease due to superior intracellular penetration and bactericidal activity.", pts:3 },
  { type:"drug→org", q:"DRUG → SPECTRUM: Aztreonam — describe its spectrum in one sentence. When is it most clinically useful?", a:"Aztreonam = gram-negative ONLY (including Pseudomonas). Zero gram-positive or anaerobic activity. Most useful: serious gram-negative infections in patients with severe penicillin allergy (minimal cross-reactivity).", pearl:"Aztreonam does NOT cross-react with most penicillins or cephalosporins (except ceftazidime shares a side chain). It is your gram-negative rescue agent in true beta-lactam allergy — but always pair with vancomycin if gram-positive coverage is needed.", pts:3 },
];

const ROUND3 = [
  { scenario:"A 58-year-old male is admitted to the general medicine floor (not ICU) with 3 days of productive cough, fever to 38.9°C, and RLL consolidation on CXR. No recent antibiotics, no healthcare exposure, no drug allergies.", options:["A) Ceftriaxone alone","B) Ceftriaxone + azithromycin","C) Pip-tazo + vancomycin","D) Levofloxacin monotherapy"], answer:"B or D", justify:"Non-severe CAP requires coverage for both typical (S. pneumoniae) and atypical organisms (Mycoplasma, Legionella, Chlamydophila). Beta-lactam + macrolide OR respiratory fluoroquinolone monotherapy are both IDSA/ATS guideline-recommended.", mistake:"Ordering ceftriaxone alone (misses atypicals) or escalating unnecessarily to pip-tazo + vancomycin for a non-ICU, community-acquired presentation.", pts:2 },
  { scenario:"A 45-year-old female is post-laparoscopic appendectomy and develops fever and abdominal pain on day 2. CT shows a small pelvic abscess. She is hemodynamically stable, WBC 14.5.", options:["A) Ceftriaxone alone","B) Ceftriaxone + metronidazole","C) Vancomycin + pip-tazo","D) Meropenem monotherapy"], answer:"B", justify:"Intra-abdominal infections require aerobic gram-negative AND anaerobic coverage. Ceftriaxone covers gram-negatives; metronidazole fills the anaerobic gap. Carbapenems and pip-tazo should be reserved for severe or resistant infections.", mistake:"Jumping to meropenem or pip-tazo for a mild-moderate community-acquired intra-abdominal infection — this is inappropriate escalation and a stewardship failure.", pts:2 },
  { scenario:"Blood cultures from a 67-year-old male with a central line grow gram-positive cocci in clusters. Susceptibilities are pending. He is febrile but hemodynamically stable.", options:["A) Start cefazolin empirically","B) Start vancomycin empirically","C) Start pip-tazo empirically","D) Wait for final susceptibilities before treating"], answer:"B", justify:"Gram-positive cocci in clusters = Staphylococcus until proven otherwise. Vancomycin covers both MRSA and MSSA empirically. Once susceptibilities confirm MSSA, de-escalate to nafcillin or cefazolin — beta-lactams are SUPERIOR for MSSA bacteremia.", mistake:"Staying on vancomycin after MSSA is confirmed. Vancomycin is inferior to beta-lactams for MSSA bacteremia, with higher treatment failure and mortality rates.", pts:2 },
  { scenario:"A 32-year-old healthy female with recurrent UTIs has dysuria and frequency. Culture grows E. coli susceptible to TMP-SMX, nitrofurantoin, and ciprofloxacin. No allergies.", options:["A) Ciprofloxacin 500mg BID x7 days","B) TMP-SMX DS BID x3 days","C) Nitrofurantoin 100mg BID x5 days","D) Either B or C"], answer:"D (B or C preferred; A is acceptable but not first-line)", justify:"IDSA guidelines recommend TMP-SMX x3 days or nitrofurantoin x5 days as first-line for uncomplicated UTIs. Fluoroquinolones should be reserved due to collateral damage, resistance pressure, and adverse effect profile.", mistake:"Defaulting to ciprofloxacin for uncomplicated UTIs — this is a stewardship red flag. Fluoroquinolone-sparing is a core antimicrobial stewardship principle.", pts:2 },
];

const FINAL_QS = [
  { q:"What is the single most critical coverage difference between ertapenem and meropenem?", a:"Ertapenem does NOT cover Pseudomonas aeruginosa or Acinetobacter. Meropenem (and imipenem) DO cover Pseudomonas. Ertapenem's once-daily dosing is attractive, but it is NOT appropriate when Pseudomonas is a concern.", pearl:"Prescribing ertapenem for a Pseudomonal infection is a critical error. This distinction is tested on every ID rotation — know it cold." },
  { q:"Conceptually, what does avibactam add to ceftazidime in ceftazidime-avibactam (Avycaz)? What organism does it still NOT cover?", a:"Avibactam is a beta-lactamase inhibitor that restores ceftazidime's activity against resistant gram-negatives including KPC-producing Klebsiella and OXA-48 carbapenemases. It does NOT cover MBL/NDM-producing organisms (metallo-beta-lactamases).", pearl:"Ceftazidime-avibactam is a critical CRE agent for KPC producers, but it fails against NDM. This distinction is increasingly clinically relevant as NDM organisms spread." },
  { q:"Clinical pearl: When do you choose linezolid over daptomycin for MRSA, and when is daptomycin preferred?", a:"Linezolid preferred: Pneumonia (excellent lung penetration), CNS infections, oral step-down (100% bioavailability), VRE infections. Daptomycin preferred: Bacteremia, endocarditis, skin/soft tissue (bactericidal needed). NEVER use daptomycin for pneumonia — inactivated by pulmonary surfactant.", pearl:"The daptomycin + pulmonary surfactant inactivation is the highest-yield clinical pearl in antimicrobial stewardship. If you prescribe daptomycin for pneumonia, expect an ID consult correction." },
];

const RULES_10 = [
  "Cephalosporins do NOT cover Enterococcus or Listeria — ever, in any generation.",
  "Vancomycin is gram-positive ONLY — zero gram-negative activity.",
  "Ertapenem does NOT cover Pseudomonas — use meropenem or imipenem when Pseudomonas is suspected.",
  "Daptomycin CANNOT be used for pneumonia — it is inactivated by pulmonary surfactant.",
  "Atypicals (Mycoplasma, Legionella, Chlamydophila) require macrolides, FQs, or doxycycline — beta-lactams are completely ineffective.",
  "MSSA bacteremia: always de-escalate from vancomycin to nafcillin or cefazolin when susceptibilities confirm MSSA.",
  "Ciprofloxacin has poor gram-positive coverage — never use as CAP monotherapy.",
  "Pip-tazo should NOT be used for serious ESBL infections — inoculum effect compromises efficacy.",
  "ESBL organisms: carbapenems are the drug of choice for serious/invasive infections.",
  "Aztreonam = gram-negative ONLY (including Pseudomonas) — zero gram-positive or anaerobic coverage.",
];

const PEARLS_5 = [
  "No cephalosporins for Enterococcus or Listeria — this gap will follow you forever.",
  "Daptomycin + lungs = never. Surfactant inactivation. Period.",
  "Ertapenem ≠ Pseudomonas coverage. Once-daily convenience does NOT equal broad coverage.",
  "Atypicals need intracellular penetration — beta-lactams always fail here.",
  "MSSA bacteremia → de-escalate to a beta-lactam every single time. Vancomycin is inferior.",
];

// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════

const state = {
  screen: "intro",
  scores: { p1: 0, p2: 0 },
  currentPlayer: 1,
  r1: { qi: 0, shown: false, canSteal: false },
  r2: { qi: 0, shown: false, canSteal: false },
  r3: { qi: 0, shown: false },
  final: { phase: "wager", qi: 0, shown: false, wagerP1: "", wagerP2: "" },
};

// ═══════════════════════════════════════════
// RENDER ENGINE
// ═══════════════════════════════════════════

function render() {
  updateHeader();
  updateNav();
  const app = document.getElementById("app");
  app.innerHTML = "";

  switch(state.screen) {
    case "intro":  app.appendChild(renderIntro()); break;
    case "r1":     app.appendChild(renderR1());    break;
    case "r2":     app.appendChild(renderR2());    break;
    case "r3":     app.appendChild(renderR3());    break;
    case "final":  app.appendChild(renderFinal()); break;
    case "results":app.appendChild(renderResults());break;
  }
}

function updateHeader() {
  const hdr = document.getElementById("header");
  const labels = { intro:"Intro", r1:"Round 1", r2:"Round 2", r3:"Round 3", final:"Final Round", results:"Results" };
  if (state.screen === "intro") { hdr.classList.add("hidden"); return; }
  hdr.classList.remove("hidden");
  document.getElementById("hdr-round-label").textContent = labels[state.screen] || "";
  document.getElementById("score-p1").textContent = state.scores.p1;
  document.getElementById("score-p2").textContent = state.scores.p2;
}

function updateNav() {
  const nav = document.getElementById("round-nav");
  if (state.screen === "intro" || state.screen === "results") { nav.classList.add("hidden"); return; }
  nav.classList.remove("hidden");
  nav.querySelectorAll(".nav-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.round === state.screen);
  });
}

// ═══════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function btn(label, classes, handler) {
  const b = document.createElement("button");
  b.className = "btn " + classes;
  b.textContent = label;
  b.addEventListener("click", handler);
  return b;
}

function progressDots(total, current, container) {
  const prog = el("div","progress");
  for (let i = 0; i < total; i++) {
    const d = el("div","prog-dot");
    d.style.background = i < current ? "#16A34A" : i === current ? "#F59E0B" : "#1E2D47";
    prog.appendChild(d);
  }
  container.appendChild(prog);
}

function revealBoxes(item, container, hasOrgChip) {
  const ans = el("div","answer-box");
  ans.appendChild(el("div","box-label","Correct Answer"));
  ans.appendChild(el("div","box-text", item.a));
  container.appendChild(ans);

  const pearl = el("div","pearl-box");
  pearl.appendChild(el("div","box-label","Teaching Pearl"));
  pearl.appendChild(el("div","box-text", item.pearl));
  container.appendChild(pearl);

  if (item.miss) {
    const miss = el("div","miss-box");
    miss.appendChild(el("div","box-label","Why Residents Miss This"));
    miss.appendChild(el("div","box-text", item.miss));
    container.appendChild(miss);
  }
}

// ═══════════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════════

function renderIntro() {
  const main = el("div","main");

  // Hero
  const hero = el("div","intro-center");
  hero.appendChild(el("div","intro-eyebrow","PGY1 Pharmacy Resident Showdown"));
  const h1 = el("h1","", "SPECTRUM<br><span>SHOWDOWN</span>");
  hero.appendChild(h1);
  hero.appendChild(el("div","intro-tagline","THE ANTIMICROBIAL STEWARDSHIP RUMBLE"));
  main.appendChild(hero);

  // Stats grid
  const grid = el("div","grid-2");
  [["Estimated Time","30–40 minutes"],["Players","2 Residents"],["Rounds","4 Rounds + Final Gamble"],["Materials","Whiteboard · Score Tracker · Optional Buzzers"]].forEach(([l,v]) => {
    const c = el("div","stat-card");
    c.appendChild(el("div","stat-label",l));
    c.appendChild(el("div","stat-val",v));
    grid.appendChild(c);
  });
  main.appendChild(grid);

  // Rules
  const rCard = el("div","card");
  rCard.appendChild(el("h3","","Rules of the Game"));
  ["Players alternate turns. If the active player misses or is incorrect, the other player may STEAL for half points.","The moderator reveals the answer after each question — teaching pearls are mandatory.","Lightning round (Round 3): simultaneous answer — first to buzz in wins.","Final Gamble: each player secretly wagers points before hearing the questions.","Point values escalate by round and difficulty."].forEach((r,i) => {
    const row = el("div","rule-item");
    row.appendChild(el("span","rule-num",`${i+1}.`));
    row.appendChild(el("span","rule-text",r));
    rCard.appendChild(row);
  });
  main.appendChild(rCard);

  // Points
  const pCard = el("div","card");
  pCard.style.borderColor = "rgba(20,184,166,.3)";
  pCard.appendChild(el("h3","","Point Structure"));
  const pgrid = el("div","point-grid");
  [["Round 1 — Rapid Fire","1 pt each · Steal: 0.5 pts"],["Round 2 — Bug vs Drug","1–3 pts · Steal: half"],["Round 3 — Clinical Cases","2 pts each · Simultaneous"],["Final Gamble","Wager up to all your points"]].forEach(([r,d]) => {
    const c = el("div","point-item");
    c.appendChild(el("div","point-round",r));
    c.appendChild(el("div","point-desc",d));
    pgrid.appendChild(c);
  });
  pCard.appendChild(pgrid);
  main.appendChild(pCard);

  // Start button
  const center = el("div","");
  center.style.cssText = "text-align:center;margin-top:22px;";
  const startBtn = btn("Begin Round 1 →","btn-amber btn-big",() => { state.screen="r1"; render(); });
  center.appendChild(startBtn);
  main.appendChild(center);
  return main;
}

// ── ROUND 1 ──
function renderR1() {
  const { qi, shown, canSteal } = state.r1;
  const q = ROUND1[qi];
  const cp = state.currentPlayer;
  const main = el("div","main");

  // Header
  main.appendChild(el("div","round-label","Round 1 of 4"));
  main.appendChild(el("h2","","Rapid Fire Recognition"));
  main.appendChild(el("div","sub","Short-answer · 1 point each · Steal: 0.5 points"));

  const metaRow = el("div","meta-row");
  metaRow.appendChild(el("div","meta-num",`Question ${qi+1} of ${ROUND1.length}`));
  const badge = el("span","turn-badge p"+(cp === 1 ? "1":"2"),`Player ${cp}'s Turn`);
  metaRow.appendChild(badge);
  main.appendChild(metaRow);

  const card = el("div","card");
  const sectionRow = el("div","");
  sectionRow.appendChild(el("span","section-label","Question"));
  sectionRow.appendChild(el("span","pts-pill",`${q.pts} pt`));
  card.appendChild(sectionRow);
  card.appendChild(el("div","question-text",q.q));

  if (!shown) {
    const row = el("div","btn-row");
    row.appendChild(btn("Reveal Answer","btn-amber",() => { state.r1.shown=true; render(); }));
    card.appendChild(row);
  } else {
    revealBoxes(q, card);

    if (!canSteal) {
      const row = el("div","btn-row");
      row.appendChild(btn(`✓ Player ${cp} Got It (+${q.pts} pts)`,"btn-green",() => {
        state.scores["p"+cp] += q.pts;
        advanceR1();
      }));
      row.appendChild(btn(`✗ Player ${cp} Missed — Steal?`,"btn-red",() => { state.r1.canSteal=true; render(); }));
      card.appendChild(row);
    } else {
      const other = cp===1?2:1;
      const stealBox = el("div","steal-box");
      stealBox.appendChild(el("div","box-label",`Steal Opportunity — Player ${other}`));
      const row = el("div","btn-row");
      row.appendChild(btn("✓ Steal Correct (+0.5 pts)","btn-green",() => {
        state.scores["p"+other] += 0.5;
        advanceR1();
      }));
      row.appendChild(btn("✗ Steal Missed — Next Question","btn-red", advanceR1));
      stealBox.appendChild(row);
      card.appendChild(stealBox);
    }
  }
  main.appendChild(card);
  progressDots(ROUND1.length, qi, main);
  return main;
}

function advanceR1() {
  const isLast = state.r1.qi === ROUND1.length - 1;
  state.r1.shown = false; state.r1.canSteal = false;
  if (isLast) { state.screen="r2"; state.currentPlayer=1; }
  else { state.r1.qi++; state.currentPlayer = state.currentPlayer===1?2:1; }
  render();
}

// ── ROUND 2 ──
function renderR2() {
  const { qi, shown, canSteal } = state.r2;
  const q = ROUND2[qi];
  const cp = state.currentPlayer;
  const main = el("div","main");

  main.appendChild(el("div","round-label","Round 2 of 4"));
  main.appendChild(el("h2","","Bug vs Drug Faceoff"));
  main.appendChild(el("div","sub","Organism → Drug or Drug → Organism · Points escalate by difficulty"));

  const metaRow = el("div","meta-row");
  metaRow.appendChild(el("div","meta-num",`Question ${qi+1} of ${ROUND2.length}`));
  metaRow.appendChild(el("span","turn-badge p"+(cp===1?"1":"2"),`Player ${cp}'s Turn`));
  main.appendChild(metaRow);

  const card = el("div","card");
  const chipClass = q.type === "org→drug" ? "type-chip chip-org" : "type-chip chip-drug";
  const chipRow = el("div","");
  chipRow.appendChild(el("span",chipClass, q.type));
  chipRow.appendChild(el("span","pts-pill",`${q.pts} ${q.pts===1?"pt":"pts"}`));
  card.appendChild(chipRow);
  card.appendChild(el("div","question-text",q.q));

  if (!shown) {
    const row = el("div","btn-row");
    row.appendChild(btn("Reveal Answer","btn-amber",() => { state.r2.shown=true; render(); }));
    card.appendChild(row);
  } else {
    revealBoxes(q, card);
    if (!canSteal) {
      const row = el("div","btn-row");
      row.appendChild(btn(`✓ Player ${cp} Got It (+${q.pts} pts)`,"btn-green",() => {
        state.scores["p"+cp] += q.pts; advanceR2();
      }));
      row.appendChild(btn("✗ Missed — Steal?","btn-red",() => { state.r2.canSteal=true; render(); }));
      card.appendChild(row);
    } else {
      const other = cp===1?2:1;
      const half = Math.floor(q.pts/2);
      const stealBox = el("div","steal-box");
      stealBox.appendChild(el("div","box-label",`Steal — Player ${other} (+${half} pts)`));
      const row = el("div","btn-row");
      row.appendChild(btn("✓ Steal Correct","btn-green",() => {
        state.scores["p"+other] += half; advanceR2();
      }));
      row.appendChild(btn("✗ No Steal — Next","btn-red",advanceR2));
      stealBox.appendChild(row);
      card.appendChild(stealBox);
    }
  }
  main.appendChild(card);
  progressDots(ROUND2.length, qi, main);
  return main;
}

function advanceR2() {
  const isLast = state.r2.qi === ROUND2.length - 1;
  state.r2.shown=false; state.r2.canSteal=false;
  if (isLast) { state.screen="r3"; }
  else { state.r2.qi++; state.currentPlayer=state.currentPlayer===1?2:1; }
  render();
}

// ── ROUND 3 ──
function renderR3() {
  const { qi, shown } = state.r3;
  const q = ROUND3[qi];
  const main = el("div","main");

  main.appendChild(el("div","round-label","Round 3 of 4"));
  main.appendChild(el("h2","","Clinical Case Lightning"));
  main.appendChild(el("div","sub","Simultaneous · First correct answer wins · 2 points each"));

  main.appendChild(el("div","lightning-notice","⚡ Lightning Rules: Both players write or say their answer simultaneously. First correct answer earns full points. No steals in this round."));

  const metaRow = el("div","meta-row");
  metaRow.appendChild(el("div","meta-num",`Case ${qi+1} of ${ROUND3.length}`));
  metaRow.appendChild(el("span","pts-pill",`${q.pts} pts`));
  main.appendChild(metaRow);

  const card = el("div","card");
  card.appendChild(el("div","section-label","Clinical Scenario"));
  card.appendChild(el("div","question-text",q.scenario));

  const ul = el("ul","options-list");
  q.options.forEach(o => ul.appendChild(el("li","",o)));
  card.appendChild(ul);

  if (!shown) {
    const row = el("div","btn-row");
    row.appendChild(btn("Reveal Answer","btn-amber",() => { state.r3.shown=true; render(); }));
    card.appendChild(row);
  } else {
    const ansBox = el("div","answer-box");
    ansBox.appendChild(el("div","box-label","Correct Answer"));
    ansBox.appendChild(el("div","answer-highlight",q.answer));
    ansBox.appendChild(el("div","box-text",q.justify));
    card.appendChild(ansBox);

    const missBox = el("div","miss-box");
    missBox.appendChild(el("div","box-label","Common Mistake"));
    missBox.appendChild(el("div","box-text",q.mistake));
    card.appendChild(missBox);

    const awardBox = el("div","award-box");
    awardBox.appendChild(el("div","box-label","Award Points"));
    const row = el("div","btn-row");
    row.appendChild(btn(`Player 1 Won (+${q.pts})`, "btn-p1", () => { state.scores.p1 += q.pts; advanceR3(); }));
    row.appendChild(btn(`Player 2 Won (+${q.pts})`, "btn-p2", () => { state.scores.p2 += q.pts; advanceR3(); }));
    row.appendChild(btn("Tie / Skip","btn-gray", advanceR3));
    awardBox.appendChild(row);
    card.appendChild(awardBox);
  }
  main.appendChild(card);
  progressDots(ROUND3.length, qi, main);
  return main;
}

function advanceR3() {
  const isLast = state.r3.qi === ROUND3.length - 1;
  state.r3.shown = false;
  if (isLast) { state.screen="final"; }
  else { state.r3.qi++; }
  render();
}

// ── FINAL ROUND ──
function renderFinal() {
  if (state.final.phase === "wager") return renderWager();
  return renderFinalQ();
}

function renderWager() {
  const main = el("div","main");
  main.appendChild(el("div","round-label","Final Round"));
  main.appendChild(el("h2","","The Broad Spectrum Gamble"));
  main.appendChild(el("div","sub","3 advanced high-yield questions · Wager up to your total score"));

  const card = el("div","card");
  card.style.borderColor = "rgba(245,158,11,.4)";
  card.appendChild(el("p","box-text","Each player secretly writes their wager — up to their current point total. If correct, you gain the wagered amount. If incorrect, you lose it. Enter your wagers below, then begin."));
  card.style.paddingBottom = "26px";

  const wgrid = el("div","wager-grid");
  wgrid.style.marginTop = "18px";

  ["p1","p2"].forEach((p,i) => {
    const col = el("div","");
    const lbl = el("div","wager-label p"+(i+1),`Player ${i+1} Wager (max ${state.scores[p]} pts)`);
    col.appendChild(lbl);
    const inp = document.createElement("input");
    inp.type = "number"; inp.min = 0; inp.max = state.scores[p];
    inp.placeholder = "0";
    inp.value = state.final["wager"+(i===0?"P1":"P2")];
    inp.style.borderColor = i===0?"rgba(245,158,11,.5)":"rgba(20,184,166,.5)";
    inp.addEventListener("input", () => {
      state.final["wager"+(i===0?"P1":"P2")] = inp.value;
    });
    col.appendChild(inp);
    wgrid.appendChild(col);
  });
  card.appendChild(wgrid);

  const row = el("div","btn-row");
  row.style.marginTop = "22px";
  row.appendChild(btn("Lock In Wagers & Begin →","btn-amber",() => {
    state.final.phase = "questions";
    render();
  }));
  card.appendChild(row);
  main.appendChild(card);
  return main;
}

function renderFinalQ() {
  const { qi, shown } = state.final;
  const q = FINAL_QS[qi];
  const main = el("div","main");

  main.appendChild(el("div","round-label",`Final Round — Question ${qi+1} of ${FINAL_QS.length}`));
  main.appendChild(el("h2","","The Broad Spectrum Gamble"));
  const wagerNote = el("div","sub");
  wagerNote.textContent = `Wagers locked: Player 1 wagered ${state.final.wagerP1||0} pts · Player 2 wagered ${state.final.wagerP2||0} pts`;
  main.appendChild(wagerNote);

  const card = el("div","card");
  card.appendChild(el("div","section-label","Final Round Question"));
  const qt = el("div","question-text",q.q);
  qt.style.fontSize = "1.2rem";
  card.appendChild(qt);

  if (!shown) {
    const row = el("div","btn-row");
    row.appendChild(btn("Reveal Answer","btn-amber",() => { state.final.shown=true; render(); }));
    card.appendChild(row);
  } else {
    const ansBox = el("div","answer-box");
    ansBox.appendChild(el("div","box-label","Correct Answer"));
    ansBox.appendChild(el("div","box-text",q.a));
    card.appendChild(ansBox);

    const pearlBox = el("div","pearl-box");
    pearlBox.appendChild(el("div","box-label","Teaching Pearl"));
    pearlBox.appendChild(el("div","box-text",q.pearl));
    card.appendChild(pearlBox);

    const awardBox = el("div","award-box");
    awardBox.appendChild(el("div","box-label","Award / Deduct Wagers"));
    const agrid = el("div","wager-award-grid");
    ["p1","p2"].forEach((p,i) => {
      const wager = parseInt(state.final["wager"+(i===0?"P1":"P2")]||0);
      const c = el("div","wager-award-card p"+(i+1));
      c.appendChild(el("div","wager-award-name",`Player ${i+1} · Wager: ${wager} pts`));
      const row2 = el("div","btn-row");
      row2.style.marginTop="8px"; row2.style.flexWrap="nowrap";
      row2.appendChild(btn("+ Correct","btn-green",() => {
        state.scores[p] += wager; render();
      }));
      row2.appendChild(btn("− Wrong","btn-red",() => {
        state.scores[p] = Math.max(0, state.scores[p] - wager); render();
      }));
      c.appendChild(row2);
      agrid.appendChild(c);
    });
    awardBox.appendChild(agrid);
    card.appendChild(awardBox);

    const isLast = qi === FINAL_QS.length - 1;
    const nextRow = el("div","btn-row");
    nextRow.appendChild(btn(isLast ? "View Final Results →" : "Next Question →","btn-amber",() => {
      if (isLast) { state.screen="results"; }
      else { state.final.qi++; state.final.shown=false; }
      render();
    }));
    card.appendChild(nextRow);
  }
  main.appendChild(card);
  progressDots(FINAL_QS.length, qi, main);
  return main;
}

// ── RESULTS ──
function renderResults() {
  const { p1, p2 } = state.scores;
  const tie = p1 === p2;
  const winner = tie ? null : p1 > p2 ? "Player 1" : "Player 2";
  const main = el("div","main");

  const rh = el("div","results-header");
  rh.appendChild(el("div","results-eyebrow","Game Over"));
  if (tie) {
    const t = el("h2","","It's a Tie!"); t.style.color="#14B8A6"; t.style.fontSize="2rem";
    rh.appendChild(t);
  } else {
    const wn = el("div","winner-name",`${winner} Wins!`);
    rh.appendChild(wn);
    rh.appendChild(el("div","winner-sub","Antimicrobial Stewardship Champion"));
  }
  main.appendChild(rh);

  // Score cards
  const sg = el("div","final-score-grid");
  ["p1","p2"].forEach((p,i) => {
    const isW = !tie && ((p==="p1" && p1>p2)||(p==="p2" && p2>p1));
    const c = el("div","final-score-card p"+(i+1)+(isW?" winner":""));
    if (isW) c.appendChild(el("div","final-champion","Champion"));
    c.appendChild(el("div","final-p-label",`Player ${i+1}`));
    c.appendChild(el("div","final-score-num",state.scores[p]));
    c.appendChild(el("div","final-score-pts","points"));
    sg.appendChild(c);
  });
  main.appendChild(sg);

  // 10 Rules
  const rulesCard = el("div","card");
  rulesCard.appendChild(el("h3","","10 High-Yield Spectrum Rules Every PGY1 Should Know"));
  RULES_10.forEach((rule,i) => {
    const row = el("div","rule-row");
    row.appendChild(el("span","rule-index",String(i+1).padStart(2,"0")));
    row.appendChild(el("span","rule-body",rule));
    rulesCard.appendChild(row);
  });
  main.appendChild(rulesCard);

  // 5 Pearls
  const pearlsCard = el("div","card");
  pearlsCard.style.cssText += "border-color:rgba(245,158,11,.4);background:#0E0B00;";
  const ph = el("h3","","If You Remember Nothing Else — 5 Pearls");
  ph.style.color = "#FCD34D";
  pearlsCard.appendChild(ph);
  PEARLS_5.forEach(p => {
    const row = el("div","pearl-star-row");
    row.appendChild(el("span","pearl-star","★"));
    row.appendChild(el("span","pearl-star-text",p));
    pearlsCard.appendChild(row);
  });
  main.appendChild(pearlsCard);

  main.appendChild(el("div","footer-note","Spectrum Showdown · PGY1 Pharmacy Resident Rumble<br>Antimicrobial Stewardship / Infectious Diseases Rotation"));
  return main;
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════

render();
</script>
</body>
</html>
