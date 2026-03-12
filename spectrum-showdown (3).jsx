import { useState } from "react";

// ─────────────────────────────────────────────
// GAME DATA
// ─────────────────────────────────────────────

const ROUND1 = [
  {
    q: "Which penicillins have anti-Pseudomonal activity?",
    a: "Piperacillin-tazobactam (pip-tazo). Extended-spectrum penicillins ONLY.",
    pearl: "No other penicillins cover Pseudomonas. Ampicillin, amoxicillin, and nafcillin have zero anti-pseudomonal activity.",
    miss: "Residents assume all beta-lactams cover Pseudomonas — they don't. Only pip-tazo among the penicillins.",
    pts: 1,
  },
  {
    q: "What is the most important clinical difference between cefazolin and ceftriaxone for a known MSSA skin/soft tissue infection?",
    a: "Cefazolin is PREFERRED for MSSA infections (better intrinsic MSSA activity, inoculum effect not a concern). Ceftriaxone has broader gram-negative coverage but is inferior for MSSA.",
    pearl: "Cefazolin is the go-to for MSSA bacteremia and surgical prophylaxis. Ceftriaxone is your workhorse for CAP and gram-negative coverage.",
    miss: "Residents assume newer = better. Cefazolin actually outperforms ceftriaxone specifically for MSSA due to inoculum effect concerns with ceftriaxone.",
    pts: 1,
  },
  {
    q: "Which drug classes cover atypical organisms (Mycoplasma, Legionella, Chlamydophila)? Name two classes.",
    a: "Macrolides (azithromycin, clarithromycin), fluoroquinolones (levofloxacin, moxifloxacin), and doxycycline.",
    pearl: "Beta-lactams have ZERO activity against atypicals — these organisms lack a cell wall. This is why CAP regimens always include atypical coverage.",
    miss: "Residents forget Legionella is an atypical. It stains gram-negative but behaves entirely differently.",
    pts: 1,
  },
  {
    q: "Name two antibiotics that reliably cover Enterococcus faecalis.",
    a: "Ampicillin (drug of choice), penicillin, vancomycin, linezolid, daptomycin. Pip-tazo has some activity.",
    pearl: "Cephalosporins do NOT cover Enterococcus — classic gap. A patient on ceftriaxone who grows Enterococcus in blood cultures needs an immediate regimen change.",
    miss: "Residents assume 'broad-spectrum' means Enterococcus coverage. Cephalosporins and fluoroquinolones are NOT reliable.",
    pts: 1,
  },
  {
    q: "Name three antibiotics with reliable MRSA activity.",
    a: "Vancomycin, linezolid, daptomycin, ceftaroline, TMP-SMX (skin/soft tissue only, not bacteremia), clindamycin (if susceptible + D-zone negative).",
    pearl: "Daptomycin CANNOT be used for pneumonia — it is inactivated by pulmonary surfactant. Always think about site of infection first.",
    miss: "Residents list clindamycin without noting it requires susceptibility testing and D-zone interpretation.",
    pts: 1,
  },
  {
    q: "Listeria monocytogenes is intrinsically resistant to which common drug class? What IS the drug of choice?",
    a: "Intrinsic resistance to cephalosporins. Drug of choice: Ampicillin (+/- gentamicin for synergy). TMP-SMX for PCN-allergic patients.",
    pearl: "A meningitis patient on ceftriaxone alone is NOT covered for Listeria. Add ampicillin empirically for patients >50 years old, immunocompromised, or neonates.",
    miss: "Residents forget Listeria coverage in empiric meningitis regimens for high-risk patients — a potentially fatal omission.",
    pts: 1,
  },
  {
    q: "Does ceftriaxone adequately cover anaerobes? What about ampicillin-sulbactam?",
    a: "Ceftriaxone: POOR anaerobic coverage. Ampicillin-sulbactam: GOOD anaerobic coverage (the sulbactam component is key).",
    pearl: "For aspiration pneumonia or intra-abdominal infections needing anaerobic coverage, ceftriaxone alone is insufficient. Add metronidazole or choose pip-tazo, carbapenems, or amp-sulbactam.",
    miss: "Residents switch from ceftriaxone + metronidazole to ceftriaxone monotherapy, inadvertently dropping their anaerobic coverage.",
    pts: 1,
  },
  {
    q: "Which fluoroquinolone has better gram-positive (Strep pneumoniae) activity — ciprofloxacin or levofloxacin?",
    a: "Levofloxacin (and moxifloxacin) — the 'respiratory fluoroquinolones.' Ciprofloxacin has poor gram-positive coverage.",
    pearl: "Ciprofloxacin should NEVER be used as monotherapy for CAP — it lacks reliable pneumococcal coverage. Use levofloxacin or moxifloxacin for respiratory infections.",
    miss: "Residents think ciprofloxacin is the 'strongest' FQ because of its Pseudomonas coverage, but its gram-positive coverage is actually inferior to levofloxacin.",
    pts: 1,
  },
  {
    q: "As cephalosporins advance from 1st to 4th generation, what happens to gram-negative vs. gram-positive coverage?",
    a: "Gram-negative coverage INCREASES with each generation. Gram-positive coverage DECREASES (cefepime [4th gen] retains some gram-positive activity and adds Pseudomonal coverage).",
    pearl: "1st gen (cefazolin) = gram-positive powerhouse. 3rd gen (ceftriaxone, ceftazidime) = gram-negative workhorses. 4th gen (cefepime) = broad including Pseudomonas.",
    miss: "Residents assume higher generation = universally better. The gram-positive tradeoff — especially for Staph — is frequently forgotten.",
    pts: 1,
  },
  {
    q: "True or False: Vancomycin covers gram-negative organisms.",
    a: "FALSE. Vancomycin is gram-positive ONLY. Covers MRSA, MSSA, Streptococcus, Enterococcus (not VRE), and C. diff (oral only).",
    pearl: "Vancomycin cannot penetrate the outer membrane of gram-negative bacteria. Patients with gram-negative bacteremia on vancomycin alone have NO gram-negative coverage.",
    miss: "Residents think 'vanc + pip-tazo = total coverage' without realizing pip-tazo is carrying ALL the gram-negative burden in that pairing.",
    pts: 1,
  },
];

const ROUND2 = [
  {
    type: "org→drug",
    q: "MRSA bacteremia — name the first-line treatment and ONE acceptable alternative.",
    a: "First-line: Vancomycin. Alternative: Daptomycin (bactericidal, acceptable for MRSA bacteremia).",
    pearl: "Linezolid is NOT preferred for bacteremia — it is bacteriostatic. Daptomycin is bactericidal and the go-to alternative to vancomycin for MRSA bacteremia.",
    pts: 1,
  },
  {
    type: "drug→org",
    q: "DRUG → ORGANISMS: What key organisms does metronidazole cover? What does it NOT cover?",
    a: "Covers: Anaerobes (Bacteroides fragilis, Clostridium spp., C. diff), and certain protozoa. Does NOT cover: Aerobes — zero aerobic coverage.",
    pearl: "Metronidazole = anaerobe-specific. It is almost always used in combination (e.g., ceftriaxone + metronidazole) because it provides zero aerobic coverage.",
    pts: 1,
  },
  {
    type: "org→drug",
    q: "Pseudomonas aeruginosa — name at least 3 antibiotic classes or specific agents that cover it.",
    a: "Pip-tazo, cefepime, ceftazidime, meropenem, imipenem, ciprofloxacin, aztreonam, aminoglycosides (tobramycin, amikacin, gentamicin).",
    pearl: "Ertapenem does NOT cover Pseudomonas — this is one of the highest-yield carbapenem distinctions. When you need Pseudomonal coverage, reach for meropenem or imipenem.",
    pts: 2,
  },
  {
    type: "org→drug",
    q: "Enterococcus faecalis grows in a blood culture. Sensitivities show ampicillin-susceptible. What should you use — and what should you NOT use?",
    a: "USE: Ampicillin (de-escalate from vancomycin). DO NOT USE: Cephalosporins (no coverage), fluoroquinolones (unreliable), vancomycin if ampicillin can be used.",
    pearl: "Ampicillin is superior to vancomycin for susceptible Enterococcus. De-escalating from vancomycin to ampicillin when sensitivities permit is a core stewardship principle.",
    pts: 2,
  },
  {
    type: "drug→org",
    q: "DRUG → GAPS: Name 4 organisms that ceftriaxone does NOT reliably cover.",
    a: "MRSA, Pseudomonas aeruginosa, Enterococcus spp., Listeria monocytogenes, anaerobes.",
    pearl: "Ceftriaxone has a deceptively narrow spectrum despite being called 'broad-spectrum.' Know its gaps by heart — this is tested on every ID consult.",
    pts: 2,
  },
  {
    type: "org→drug",
    q: "ESBL-producing E. coli in a blood culture. What is the drug of choice for definitive therapy?",
    a: "Carbapenems (meropenem or ertapenem). Pip-tazo is generally NOT recommended for serious ESBL infections due to inoculum effect. Oral step-down options for UTI only: nitrofurantoin or fosfomycin.",
    pearl: "The inoculum effect: pip-tazo may appear susceptible in vitro but fail clinically for ESBL bacteremia. Carbapenems are the safer choice for serious infections.",
    pts: 3,
  },
  {
    type: "org→drug",
    q: "Severe Legionella pneumonia in an ICU patient. What is your preferred antibiotic?",
    a: "Levofloxacin (preferred in severe/ICU). Azithromycin is drug of choice for mild-moderate. Doxycycline is an alternative.",
    pearl: "Legionella requires intracellular penetration — beta-lactams are completely ineffective. Fluoroquinolones are preferred for severe disease due to superior intracellular penetration and bactericidal activity.",
    pts: 3,
  },
  {
    type: "drug→org",
    q: "DRUG → SPECTRUM: Aztreonam — describe its spectrum in one sentence. When is it most clinically useful?",
    a: "Aztreonam = gram-negative ONLY (including Pseudomonas). Zero gram-positive or anaerobic activity. Most useful: serious gram-negative infections in patients with severe penicillin allergy (minimal cross-reactivity).",
    pearl: "Aztreonam does NOT cross-react with most penicillins or cephalosporins (except ceftazidime shares a side chain). It is your gram-negative rescue agent in true beta-lactam allergy — but always pair with vancomycin if gram-positive coverage is needed.",
    pts: 3,
  },
];

const ROUND3 = [
  {
    scenario: "A 58-year-old male is admitted to the general medicine floor (not ICU) with 3 days of productive cough, fever to 38.9°C, and RLL consolidation on CXR. No recent antibiotics, no healthcare exposure, no drug allergies.",
    options: ["A) Ceftriaxone alone", "B) Ceftriaxone + azithromycin", "C) Pip-tazo + vancomycin", "D) Levofloxacin monotherapy"],
    answer: "B or D",
    justify: "Non-severe CAP requires coverage for both typical (S. pneumoniae) and atypical organisms (Mycoplasma, Legionella, Chlamydophila). Beta-lactam + macrolide OR respiratory fluoroquinolone monotherapy are both IDSA/ATS guideline-recommended.",
    mistake: "Ordering ceftriaxone alone (misses atypicals) or escalating unnecessarily to pip-tazo + vancomycin for a non-ICU, community-acquired presentation.",
    pts: 2,
  },
  {
    scenario: "A 45-year-old female is post-laparoscopic appendectomy and develops fever and abdominal pain on day 2. CT shows a small pelvic abscess. She is hemodynamically stable, WBC 14.5.",
    options: ["A) Ceftriaxone alone", "B) Ceftriaxone + metronidazole", "C) Vancomycin + pip-tazo", "D) Meropenem monotherapy"],
    answer: "B",
    justify: "Intra-abdominal infections require aerobic gram-negative AND anaerobic coverage. Ceftriaxone covers gram-negatives; metronidazole fills the anaerobic gap. Carbapenems and pip-tazo should be reserved for severe or resistant infections.",
    mistake: "Jumping to meropenem or pip-tazo for a mild-moderate community-acquired intra-abdominal infection — this is inappropriate escalation and a stewardship failure.",
    pts: 2,
  },
  {
    scenario: "Blood cultures from a 67-year-old male with a central line grow gram-positive cocci in clusters. Susceptibilities are pending. He is febrile but hemodynamically stable.",
    options: ["A) Start cefazolin empirically", "B) Start vancomycin empirically", "C) Start pip-tazo empirically", "D) Wait for final susceptibilities before treating"],
    answer: "B",
    justify: "Gram-positive cocci in clusters = Staphylococcus until proven otherwise. Vancomycin covers both MRSA and MSSA empirically. Once susceptibilities confirm MSSA, de-escalate to nafcillin or cefazolin — beta-lactams are SUPERIOR for MSSA bacteremia.",
    mistake: "Staying on vancomycin after MSSA is confirmed. Vancomycin is inferior to beta-lactams for MSSA bacteremia, with higher treatment failure and mortality rates.",
    pts: 2,
  },
  {
    scenario: "A 32-year-old healthy female with recurrent UTIs has dysuria and frequency. Culture grows E. coli susceptible to TMP-SMX, nitrofurantoin, and ciprofloxacin. No allergies.",
    options: ["A) Ciprofloxacin 500mg BID x7 days", "B) TMP-SMX DS BID x3 days", "C) Nitrofurantoin 100mg BID x5 days", "D) Either B or C"],
    answer: "D (B or C preferred; A is acceptable but not first-line)",
    justify: "IDSA guidelines recommend TMP-SMX x3 days or nitrofurantoin x5 days as first-line for uncomplicated UTIs. Fluoroquinolones should be reserved due to collateral damage, resistance pressure, and adverse effect profile.",
    mistake: "Defaulting to ciprofloxacin for uncomplicated UTIs — this is a stewardship red flag. Fluoroquinolone-sparing is a core antimicrobial stewardship principle.",
    pts: 2,
  },
];

const FINAL_ROUND = [
  {
    q: "What is the single most critical coverage difference between ertapenem and meropenem?",
    a: "Ertapenem does NOT cover Pseudomonas aeruginosa or Acinetobacter. Meropenem (and imipenem) DO cover Pseudomonas. Ertapenem's once-daily dosing is attractive, but it is NOT appropriate when Pseudomonas is a concern.",
    pearl: "Prescribing ertapenem for a Pseudomonal infection is a critical error. This distinction is tested on every ID rotation — know it cold.",
  },
  {
    q: "Conceptually, what does avibactam add to ceftazidime in ceftazidime-avibactam (Avycaz)? What organism does it still NOT cover?",
    a: "Avibactam is a beta-lactamase inhibitor that restores ceftazidime's activity against resistant gram-negatives including KPC-producing Klebsiella and OXA-48 carbapenemases. It does NOT cover MBL/NDM-producing organisms (metallo-beta-lactamases).",
    pearl: "Ceftazidime-avibactam is a critical CRE agent for KPC producers, but it fails against NDM. This distinction is increasingly clinically relevant as NDM organisms spread.",
  },
  {
    q: "Clinical pearl: When do you choose linezolid over daptomycin for MRSA, and when is daptomycin preferred?",
    a: "Linezolid preferred: Pneumonia (excellent lung penetration), CNS infections, oral step-down (100% bioavailability), VRE infections. Daptomycin preferred: Bacteremia, endocarditis, skin/soft tissue (bactericidal needed). NEVER use daptomycin for pneumonia — inactivated by pulmonary surfactant.",
    pearl: "The daptomycin + pulmonary surfactant inactivation is the highest-yield clinical pearl in antimicrobial stewardship. If you prescribe daptomycin for pneumonia, expect an ID consult correction.",
  },
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

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

const AMBER = "#F59E0B";
const AMBER_LIGHT = "#FCD34D";
const TEAL = "#14B8A6";
const RED = "#EF4444";
const BG = "#0B0F1A";
const CARD = "#13192B";
const BORDER = "#1E2D47";

const styles = {
  root: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: BG,
    minHeight: "100vh",
    color: "#E8EDF5",
    padding: "0",
    margin: "0",
  },
  header: {
    background: `linear-gradient(135deg, #0B0F1A 0%, #0D1526 50%, #0B1020 100%)`,
    borderBottom: `2px solid ${AMBER}`,
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: `0 4px 30px rgba(245,158,11,0.15)`,
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: AMBER,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'Georgia', serif",
  },
  scoreBoard: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  scoreCard: {
    textAlign: "center",
    padding: "8px 20px",
    border: `1px solid`,
    borderRadius: "6px",
    minWidth: "100px",
  },
  scoreName: {
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: "2px",
    fontFamily: "'Georgia', serif",
  },
  scoreVal: {
    fontSize: "1.6rem",
    fontWeight: "700",
    fontFamily: "'Georgia', serif",
  },
  main: {
    maxWidth: "820px",
    margin: "0 auto",
    padding: "32px 24px",
  },
  card: {
    background: CARD,
    border: `1px solid ${BORDER}`,
    borderRadius: "12px",
    padding: "28px 32px",
    marginBottom: "20px",
  },
  sectionLabel: {
    fontSize: "0.65rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: AMBER,
    marginBottom: "8px",
    fontFamily: "'Georgia', serif",
  },
  questionNum: {
    fontSize: "0.75rem",
    color: "#6B7A9A",
    marginBottom: "12px",
    letterSpacing: "0.06em",
  },
  questionText: {
    fontSize: "1.2rem",
    lineHeight: "1.65",
    color: "#E8EDF5",
    marginBottom: "0",
    fontFamily: "'Georgia', serif",
  },
  answerBox: {
    background: "#0D1A2E",
    border: `1px solid ${TEAL}`,
    borderRadius: "8px",
    padding: "18px 22px",
    marginTop: "16px",
  },
  answerLabel: {
    fontSize: "0.6rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: TEAL,
    marginBottom: "6px",
  },
  answerText: {
    fontSize: "1rem",
    lineHeight: "1.65",
    color: "#CBD5E1",
    fontFamily: "'Georgia', serif",
  },
  pearlBox: {
    background: "#0B1A14",
    border: `1px solid #16A34A`,
    borderRadius: "8px",
    padding: "14px 18px",
    marginTop: "12px",
  },
  pearlLabel: {
    fontSize: "0.6rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#4ADE80",
    marginBottom: "6px",
  },
  pearlText: {
    fontSize: "0.9rem",
    lineHeight: "1.6",
    color: "#A7F3D0",
    fontFamily: "'Georgia', serif",
  },
  missBox: {
    background: "#1A0E0E",
    border: `1px solid #7F1D1D`,
    borderRadius: "8px",
    padding: "12px 16px",
    marginTop: "10px",
  },
  missLabel: {
    fontSize: "0.6rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#FCA5A5",
    marginBottom: "4px",
  },
  missText: {
    fontSize: "0.85rem",
    lineHeight: "1.5",
    color: "#FECACA",
    fontFamily: "'Georgia', serif",
  },
  btn: {
    border: "none",
    borderRadius: "6px",
    padding: "10px 22px",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.06em",
    fontFamily: "'Georgia', serif",
    transition: "all 0.15s",
  },
  btnAmber: {
    background: AMBER,
    color: "#0B0F1A",
  },
  btnTeal: {
    background: TEAL,
    color: "#0B0F1A",
  },
  btnGhost: {
    background: "transparent",
    color: AMBER,
    border: `1px solid ${AMBER}`,
  },
  btnRed: {
    background: "#991B1B",
    color: "#FEE2E2",
  },
  btnGreen: {
    background: "#166534",
    color: "#D1FAE5",
  },
  btnRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  pts: {
    display: "inline-block",
    background: "#1E2D47",
    color: AMBER_LIGHT,
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    padding: "3px 10px",
    borderRadius: "20px",
    fontWeight: "600",
    marginLeft: "10px",
    fontFamily: "'Georgia', serif",
  },
  optionList: {
    listStyle: "none",
    padding: 0,
    margin: "16px 0",
  },
  optionItem: {
    background: "#0D1526",
    border: `1px solid ${BORDER}`,
    borderRadius: "6px",
    padding: "10px 16px",
    marginBottom: "8px",
    fontSize: "0.95rem",
    color: "#CBD5E1",
    fontFamily: "'Georgia', serif",
    lineHeight: "1.5",
  },
  turnBadge: {
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "4px 14px",
    borderRadius: "20px",
    fontWeight: "700",
  },
  divider: {
    borderColor: BORDER,
    margin: "24px 0",
  },
  h2: {
    fontSize: "1.6rem",
    fontWeight: "700",
    fontFamily: "'Georgia', serif",
    marginBottom: "6px",
    lineHeight: "1.3",
  },
  h3: {
    fontSize: "1.1rem",
    fontWeight: "700",
    fontFamily: "'Georgia', serif",
    marginBottom: "6px",
    color: AMBER,
  },
  ruleNum: {
    color: AMBER,
    fontWeight: "700",
    marginRight: "10px",
    fontFamily: "'Georgia', serif",
    fontSize: "1rem",
  },
  ruleText: {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    fontFamily: "'Georgia', serif",
    color: "#CBD5E1",
  },
  wagerInput: {
    background: "#0D1526",
    border: `2px solid ${BORDER}`,
    borderRadius: "6px",
    padding: "10px 16px",
    fontSize: "1.1rem",
    color: "#E8EDF5",
    width: "100px",
    fontFamily: "'Georgia', serif",
    outline: "none",
  },
  typeChip: {
    display: "inline-block",
    padding: "3px 12px",
    borderRadius: "20px",
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: "10px",
  },
};

// ─────────────────────────────────────────────
// SCREENS
// ─────────────────────────────────────────────

function IntroScreen({ onStart }) {
  return (
    <div style={styles.main}>
      <div style={{ textAlign: "center", paddingTop: "32px", paddingBottom: "24px" }}>
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: AMBER, marginBottom: "16px" }}>
          PGY1 Pharmacy Resident Showdown
        </div>
        <h1 style={{ fontSize: "2.8rem", fontWeight: "700", fontFamily: "'Georgia', serif", lineHeight: "1.15", color: "#F8FAFC", marginBottom: "12px" }}>
          SPECTRUM<br />
          <span style={{ color: AMBER }}>SHOWDOWN</span>
        </h1>
        <div style={{ fontSize: "1rem", color: "#64748B", letterSpacing: "0.1em", marginBottom: "32px" }}>
          THE ANTIMICROBIAL STEWARDSHIP RUMBLE
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        {[
          { label: "Estimated Time", val: "30–40 minutes" },
          { label: "Players", val: "2 Residents" },
          { label: "Rounds", val: "4 Rounds + Final Gamble" },
          { label: "Materials", val: "Whiteboard · Score Tracker · Optional Buzzers" },
        ].map((item) => (
          <div key={item.label} style={{ ...styles.card, padding: "16px 20px" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#64748B", marginBottom: "4px" }}>
              {item.label}
            </div>
            <div style={{ fontSize: "1rem", fontWeight: "600", color: "#E8EDF5", fontFamily: "'Georgia', serif" }}>{item.val}</div>
          </div>
        ))}
      </div>

      <div style={{ ...styles.card, borderColor: AMBER + "44" }}>
        <div style={styles.h3}>Rules of the Game</div>
        {[
          "Players alternate turns. If the active player misses or is incorrect, the other player may STEAL for half points.",
          "The moderator reveals the answer after each question — teaching pearls are mandatory.",
          "Lightning round (Round 3): simultaneous answer — first to buzz in wins.",
          "Final Gamble: each player secretly wagers points before hearing the questions.",
          "Point values escalate by round and difficulty.",
        ].map((rule, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <span style={{ color: AMBER, fontWeight: "700", fontFamily: "'Georgia', serif", minWidth: "20px" }}>{i + 1}.</span>
            <span style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#CBD5E1", fontFamily: "'Georgia', serif" }}>{rule}</span>
          </div>
        ))}
      </div>

      <div style={{ ...styles.card, borderColor: TEAL + "44" }}>
        <div style={styles.h3}>Point Structure</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { r: "Round 1 — Rapid Fire", p: "1 pt each · Steal: 0.5 pts" },
            { r: "Round 2 — Bug vs Drug", p: "1–3 pts · Steal: half" },
            { r: "Round 3 — Clinical Cases", p: "2 pts each · Simultaneous" },
            { r: "Final Gamble", p: "Wager up to all your points" },
          ].map((row) => (
            <div key={row.r} style={{ background: "#0D1526", borderRadius: "6px", padding: "10px 14px" }}>
              <div style={{ fontSize: "0.75rem", color: TEAL, fontWeight: "600", fontFamily: "'Georgia', serif", marginBottom: "2px" }}>{row.r}</div>
              <div style={{ fontSize: "0.85rem", color: "#94A3B8", fontFamily: "'Georgia', serif" }}>{row.p}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <button style={{ ...styles.btn, ...styles.btnAmber, fontSize: "1rem", padding: "14px 48px" }} onClick={onStart}>
          Begin Round 1 →
        </button>
      </div>
    </div>
  );
}

function Round1({ scores, setScores, currentPlayer, setCurrentPlayer, onNext }) {
  const [qi, setQi] = useState(0);
  const [shown, setShown] = useState(false);
  const [canSteal, setCanSteal] = useState(false);

  const q = ROUND1[qi];
  const isLast = qi === ROUND1.length - 1;

  function awardPts(player, isSteal) {
    const pts = isSteal ? 0.5 : q.pts;
    setScores((s) => ({ ...s, [player]: s[player] + pts }));
    advance();
  }

  function miss() {
    setCanSteal(true);
  }

  function advance() {
    setShown(false);
    setCanSteal(false);
    if (isLast) {
      onNext();
    } else {
      setQi((q) => q + 1);
      setCurrentPlayer((p) => (p === 1 ? 2 : 1));
    }
  }

  const activeColor = currentPlayer === 1 ? AMBER : TEAL;

  return (
    <div style={styles.main}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: AMBER, marginBottom: "4px" }}>
          Round 1 of 4
        </div>
        <h2 style={styles.h2}>Rapid Fire Recognition</h2>
        <div style={{ fontSize: "0.85rem", color: "#64748B", fontFamily: "'Georgia', serif" }}>
          Short-answer · 1 point each · Steal: 0.5 points
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
          Question {qi + 1} of {ROUND1.length}
        </div>
        <span
          style={{
            ...styles.turnBadge,
            background: activeColor + "22",
            color: activeColor,
            border: `1px solid ${activeColor}`,
          }}
        >
          Player {currentPlayer}'s Turn
        </span>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionLabel}>Question</div>
        <div style={{ ...styles.pts }}>{q.pts} pt</div>
        <div style={{ ...styles.questionText, marginTop: "12px" }}>{q.q}</div>

        {!shown && (
          <div style={styles.btnRow}>
            <button style={{ ...styles.btn, ...styles.btnAmber }} onClick={() => setShown(true)}>
              Reveal Answer
            </button>
          </div>
        )}

        {shown && (
          <>
            <div style={styles.answerBox}>
              <div style={styles.answerLabel}>Correct Answer</div>
              <div style={styles.answerText}>{q.a}</div>
            </div>
            <div style={styles.pearlBox}>
              <div style={styles.pearlLabel}>Teaching Pearl</div>
              <div style={styles.pearlText}>{q.pearl}</div>
            </div>
            <div style={styles.missBox}>
              <div style={styles.missLabel}>Why Residents Miss This</div>
              <div style={styles.missText}>{q.miss}</div>
            </div>

            {!canSteal ? (
              <div style={styles.btnRow}>
                <button style={{ ...styles.btn, ...styles.btnGreen }} onClick={() => awardPts(`p${currentPlayer}`, false)}>
                  ✓ Player {currentPlayer} Got It (+{q.pts} pts)
                </button>
                <button style={{ ...styles.btn, ...styles.btnRed }} onClick={miss}>
                  ✗ Player {currentPlayer} Missed — Steal?
                </button>
              </div>
            ) : (
              <div style={{ ...styles.missBox, borderColor: AMBER + "88" }}>
                <div style={{ fontSize: "0.7rem", color: AMBER, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Steal Opportunity — Player {currentPlayer === 1 ? 2 : 1}
                </div>
                <div style={styles.btnRow}>
                  <button
                    style={{ ...styles.btn, ...styles.btnGreen }}
                    onClick={() => awardPts(`p${currentPlayer === 1 ? 2 : 1}`, true)}
                  >
                    ✓ Steal Correct (+0.5 pts)
                  </button>
                  <button style={{ ...styles.btn, ...styles.btnRed }} onClick={advance}>
                    ✗ Steal Missed — Next Question
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {ROUND1.map((_, i) => (
          <div
            key={i}
            style={{
              width: "28px",
              height: "8px",
              borderRadius: "4px",
              background: i < qi ? "#16A34A" : i === qi ? AMBER : "#1E2D47",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Round2({ scores, setScores, currentPlayer, setCurrentPlayer, onNext }) {
  const [qi, setQi] = useState(0);
  const [shown, setShown] = useState(false);
  const [canSteal, setCanSteal] = useState(false);

  const q = ROUND2[qi];
  const isLast = qi === ROUND2.length - 1;

  function awardPts(player, isSteal) {
    const pts = isSteal ? Math.floor(q.pts / 2) : q.pts;
    setScores((s) => ({ ...s, [player]: s[player] + pts }));
    advance();
  }

  function miss() {
    setCanSteal(true);
  }

  function advance() {
    setShown(false);
    setCanSteal(false);
    if (isLast) {
      onNext();
    } else {
      setQi((q) => q + 1);
      setCurrentPlayer((p) => (p === 1 ? 2 : 1));
    }
  }

  const activeColor = currentPlayer === 1 ? AMBER : TEAL;
  const chipColor = q.type === "org→drug" ? { bg: "#1E3A5F", text: "#93C5FD" } : { bg: "#3D1F5E", text: "#C4B5FD" };

  return (
    <div style={styles.main}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: AMBER, marginBottom: "4px" }}>
          Round 2 of 4
        </div>
        <h2 style={styles.h2}>Bug vs Drug Faceoff</h2>
        <div style={{ fontSize: "0.85rem", color: "#64748B", fontFamily: "'Georgia', serif" }}>
          Organism → Drug or Drug → Organism · Points escalate by difficulty
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
          Question {qi + 1} of {ROUND2.length}
        </div>
        <span
          style={{
            ...styles.turnBadge,
            background: activeColor + "22",
            color: activeColor,
            border: `1px solid ${activeColor}`,
          }}
        >
          Player {currentPlayer}'s Turn
        </span>
      </div>

      <div style={styles.card}>
        <span
          style={{
            ...styles.typeChip,
            background: chipColor.bg,
            color: chipColor.text,
          }}
        >
          {q.type}
        </span>
        <span style={styles.pts}>{q.pts} {q.pts === 1 ? "pt" : "pts"}</span>
        <div style={{ ...styles.questionText, marginTop: "10px" }}>{q.q}</div>

        {!shown && (
          <div style={styles.btnRow}>
            <button style={{ ...styles.btn, ...styles.btnAmber }} onClick={() => setShown(true)}>
              Reveal Answer
            </button>
          </div>
        )}

        {shown && (
          <>
            <div style={styles.answerBox}>
              <div style={styles.answerLabel}>Correct Answer</div>
              <div style={styles.answerText}>{q.a}</div>
            </div>
            <div style={styles.pearlBox}>
              <div style={styles.pearlLabel}>Teaching Pearl</div>
              <div style={styles.pearlText}>{q.pearl}</div>
            </div>

            {!canSteal ? (
              <div style={styles.btnRow}>
                <button style={{ ...styles.btn, ...styles.btnGreen }} onClick={() => awardPts(`p${currentPlayer}`, false)}>
                  ✓ Player {currentPlayer} Got It (+{q.pts} pts)
                </button>
                <button style={{ ...styles.btn, ...styles.btnRed }} onClick={miss}>
                  ✗ Missed — Steal?
                </button>
              </div>
            ) : (
              <div style={{ ...styles.missBox, borderColor: AMBER + "88" }}>
                <div style={{ fontSize: "0.7rem", color: AMBER, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Steal — Player {currentPlayer === 1 ? 2 : 1} (+{Math.floor(q.pts / 2)} pts)
                </div>
                <div style={styles.btnRow}>
                  <button
                    style={{ ...styles.btn, ...styles.btnGreen }}
                    onClick={() => awardPts(`p${currentPlayer === 1 ? 2 : 1}`, true)}
                  >
                    ✓ Steal Correct
                  </button>
                  <button style={{ ...styles.btn, ...styles.btnRed }} onClick={advance}>
                    ✗ No Steal — Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {ROUND2.map((_, i) => (
          <div
            key={i}
            style={{
              width: "28px",
              height: "8px",
              borderRadius: "4px",
              background: i < qi ? "#16A34A" : i === qi ? AMBER : "#1E2D47",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Round3({ scores, setScores, onNext }) {
  const [qi, setQi] = useState(0);
  const [shown, setShown] = useState(false);
  const q = ROUND3[qi];
  const isLast = qi === ROUND3.length - 1;

  function awardPts(player) {
    setScores((s) => ({ ...s, [player]: s[player] + q.pts }));
    advance();
  }

  function advance() {
    setShown(false);
    if (isLast) onNext();
    else setQi((q) => q + 1);
  }

  return (
    <div style={styles.main}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: AMBER, marginBottom: "4px" }}>
          Round 3 of 4
        </div>
        <h2 style={styles.h2}>Clinical Case Lightning</h2>
        <div style={{ fontSize: "0.85rem", color: "#64748B", fontFamily: "'Georgia', serif" }}>
          Simultaneous · First correct answer wins · 2 points each
        </div>
      </div>

      <div style={{ ...styles.card, borderColor: "#7C3AED44", marginBottom: "16px", padding: "12px 20px" }}>
        <div style={{ fontSize: "0.75rem", color: "#A78BFA", fontFamily: "'Georgia', serif" }}>
          ⚡ Lightning Rules: Both players write or say their answer simultaneously. First correct answer earns full points. No steals — simultaneous format.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
          Case {qi + 1} of {ROUND3.length}
        </div>
        <span style={styles.pts}>{q.pts} pts</span>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionLabel}>Clinical Scenario</div>
        <div style={{ ...styles.questionText, marginTop: "8px", lineHeight: "1.75" }}>{q.scenario}</div>

        <ul style={styles.optionList}>
          {q.options.map((opt) => (
            <li key={opt} style={styles.optionItem}>{opt}</li>
          ))}
        </ul>

        {!shown && (
          <div style={styles.btnRow}>
            <button style={{ ...styles.btn, ...styles.btnAmber }} onClick={() => setShown(true)}>
              Reveal Answer
            </button>
          </div>
        )}

        {shown && (
          <>
            <div style={styles.answerBox}>
              <div style={styles.answerLabel}>Correct Answer</div>
              <div style={{ ...styles.answerText, fontSize: "1.05rem", fontWeight: "700", color: TEAL, marginBottom: "8px" }}>{q.answer}</div>
              <div style={styles.answerText}>{q.justify}</div>
            </div>
            <div style={styles.missBox}>
              <div style={styles.missLabel}>Common Mistake</div>
              <div style={styles.missText}>{q.mistake}</div>
            </div>

            <div style={{ ...styles.missBox, borderColor: "#7C3AED55", background: "#1A0E3A" }}>
              <div style={{ fontSize: "0.7rem", color: "#A78BFA", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                Award Points
              </div>
              <div style={styles.btnRow}>
                <button style={{ ...styles.btn, background: AMBER + "22", color: AMBER, border: `1px solid ${AMBER}` }} onClick={() => awardPts("p1")}>
                  Player 1 Won (+{q.pts})
                </button>
                <button style={{ ...styles.btn, background: TEAL + "22", color: TEAL, border: `1px solid ${TEAL}` }} onClick={() => awardPts("p2")}>
                  Player 2 Won (+{q.pts})
                </button>
                <button style={{ ...styles.btn, ...styles.btnGhost, borderColor: "#475569", color: "#94A3B8" }} onClick={advance}>
                  Tie / Skip
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FinalRound({ scores, setScores, onNext }) {
  const [phase, setPhase] = useState("wager"); // wager, questions, done
  const [wagers, setWagers] = useState({ p1: "", p2: "" });
  const [qi, setQi] = useState(0);
  const [shown, setShown] = useState(false);

  const q = FINAL_ROUND[qi];
  const isLast = qi === FINAL_ROUND.length - 1;

  function startQuestions() {
    setPhase("questions");
  }

  function awardPts(player) {
    const wager = parseInt(wagers[player] || 0);
    setScores((s) => ({ ...s, [player]: s[player] + wager }));
  }

  function deductPts(player) {
    const wager = parseInt(wagers[player] || 0);
    setScores((s) => ({ ...s, [player]: Math.max(0, s[player] - wager) }));
  }

  function advance() {
    setShown(false);
    if (isLast) onNext();
    else setQi((q) => q + 1);
  }

  if (phase === "wager") {
    return (
      <div style={styles.main}>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: AMBER, marginBottom: "4px" }}>
            Final Round
          </div>
          <h2 style={styles.h2}>The Broad Spectrum Gamble</h2>
          <div style={{ fontSize: "0.85rem", color: "#64748B", fontFamily: "'Georgia', serif" }}>
            3 advanced high-yield questions · Wager up to your total score
          </div>
        </div>

        <div style={{ ...styles.card, borderColor: AMBER + "66" }}>
          <div style={{ fontSize: "0.85rem", color: "#94A3B8", lineHeight: "1.7", fontFamily: "'Georgia', serif", marginBottom: "20px" }}>
            Each player secretly writes their wager — up to their current point total. If correct, you gain the wagered amount. If incorrect, you lose it.
            Enter your wagers below, then begin.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            {["p1", "p2"].map((p, i) => (
              <div key={p}>
                <div style={{ fontSize: "0.8rem", color: i === 0 ? AMBER : TEAL, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
                  Player {i + 1} Wager (max {scores[p]} pts)
                </div>
                <input
                  type="number"
                  min="0"
                  max={scores[p]}
                  value={wagers[p]}
                  onChange={(e) => setWagers((w) => ({ ...w, [p]: e.target.value }))}
                  style={{ ...styles.wagerInput, borderColor: i === 0 ? AMBER + "88" : TEAL + "88" }}
                  placeholder="0"
                />
              </div>
            ))}
          </div>

          <button style={{ ...styles.btn, ...styles.btnAmber, fontSize: "0.95rem", padding: "12px 32px" }} onClick={startQuestions}>
            Lock In Wagers & Begin →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.main}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: AMBER, marginBottom: "4px" }}>
          Final Round — Question {qi + 1} of {FINAL_ROUND.length}
        </div>
        <h2 style={styles.h2}>The Broad Spectrum Gamble</h2>
        <div style={{ fontSize: "0.85rem", color: "#64748B", fontFamily: "'Georgia', serif" }}>
          Wagers locked: Player 1 wagered {wagers.p1 || 0} pts · Player 2 wagered {wagers.p2 || 0} pts
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionLabel}>Final Round Question</div>
        <div style={{ ...styles.questionText, marginTop: "10px", fontSize: "1.25rem" }}>{q.q}</div>

        {!shown && (
          <div style={styles.btnRow}>
            <button style={{ ...styles.btn, ...styles.btnAmber }} onClick={() => setShown(true)}>
              Reveal Answer
            </button>
          </div>
        )}

        {shown && (
          <>
            <div style={styles.answerBox}>
              <div style={styles.answerLabel}>Correct Answer</div>
              <div style={styles.answerText}>{q.a}</div>
            </div>
            <div style={styles.pearlBox}>
              <div style={styles.pearlLabel}>Teaching Pearl</div>
              <div style={styles.pearlText}>{q.pearl}</div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <div style={{ fontSize: "0.7rem", color: "#6B7A9A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
                Award / Deduct Wagers
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {["p1", "p2"].map((p, i) => (
                  <div key={p} style={{ background: "#0D1526", border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "12px 14px" }}>
                    <div style={{ fontSize: "0.75rem", color: i === 0 ? AMBER : TEAL, marginBottom: "8px", fontWeight: "600" }}>
                      Player {i + 1} · Wager: {wagers[p] || 0} pts
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={{ ...styles.btn, ...styles.btnGreen, padding: "6px 14px", fontSize: "0.8rem" }} onClick={() => awardPts(p)}>
                        + Correct
                      </button>
                      <button style={{ ...styles.btn, ...styles.btnRed, padding: "6px 14px", fontSize: "0.8rem" }} onClick={() => deductPts(p)}>
                        − Wrong
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.btnRow}>
              <button style={{ ...styles.btn, ...styles.btnAmber }} onClick={advance}>
                {isLast ? "View Final Results →" : "Next Question →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Results({ scores }) {
  const p1Wins = scores.p1 > scores.p2;
  const tie = scores.p1 === scores.p2;
  const winner = tie ? null : p1Wins ? "Player 1" : "Player 2";

  return (
    <div style={styles.main}>
      <div style={{ textAlign: "center", marginBottom: "32px", paddingTop: "8px" }}>
        <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748B", marginBottom: "12px" }}>
          Game Over
        </div>
        {tie ? (
          <h2 style={{ ...styles.h2, color: TEAL, fontSize: "2rem" }}>It's a Tie!</h2>
        ) : (
          <>
            <h2 style={{ ...styles.h2, color: AMBER, fontSize: "2.2rem", marginBottom: "4px" }}>{winner} Wins!</h2>
            <div style={{ fontSize: "0.9rem", color: "#64748B", fontFamily: "'Georgia', serif" }}>Antimicrobial Stewardship Champion</div>
          </>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
        {["p1", "p2"].map((p, i) => {
          const isWinner = !tie && scores[p] > scores[p === "p1" ? "p2" : "p1"];
          return (
            <div
              key={p}
              style={{
                ...styles.card,
                textAlign: "center",
                borderColor: isWinner ? AMBER + "88" : BORDER,
                background: isWinner ? "#1A1400" : CARD,
              }}
            >
              {isWinner && <div style={{ fontSize: "0.65rem", color: AMBER, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>Champion</div>}
              <div style={{ fontSize: "0.75rem", color: i === 0 ? AMBER : TEAL, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                Player {i + 1}
              </div>
              <div style={{ fontSize: "3rem", fontWeight: "700", fontFamily: "'Georgia', serif", color: i === 0 ? AMBER : TEAL }}>
                {scores[p]}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748B" }}>points</div>
            </div>
          );
        })}
      </div>

      <div style={styles.card}>
        <div style={{ ...styles.h3, fontSize: "1rem", marginBottom: "16px" }}>
          10 High-Yield Spectrum Rules Every PGY1 Should Know
        </div>
        {RULES_10.map((rule, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "12px", paddingBottom: "12px", borderBottom: i < 9 ? `1px solid ${BORDER}` : "none" }}>
            <span style={styles.ruleNum}>{String(i + 1).padStart(2, "0")}</span>
            <span style={styles.ruleText}>{rule}</span>
          </div>
        ))}
      </div>

      <div style={{ ...styles.card, borderColor: AMBER + "55", background: "#0E0B00" }}>
        <div style={{ ...styles.h3, color: AMBER_LIGHT, marginBottom: "16px" }}>
          If You Remember Nothing Else — 5 Pearls
        </div>
        {PEARLS_5.map((pearl, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
            <span style={{ color: AMBER, fontWeight: "700", fontSize: "1.1rem", fontFamily: "'Georgia', serif", minWidth: "20px" }}>★</span>
            <span style={{ fontSize: "1rem", lineHeight: "1.6", color: "#FCD34D", fontFamily: "'Georgia', serif" }}>{pearl}</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "24px", marginBottom: "12px" }}>
        <div style={{ fontSize: "0.75rem", color: "#475569", fontFamily: "'Georgia', serif", lineHeight: "1.8" }}>
          Spectrum Showdown · PGY1 Pharmacy Resident Rumble<br />
          Antimicrobial Stewardship / Infectious Diseases Rotation
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | r1 | r2 | r3 | final | results
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const roundLabels = { intro: "Intro", r1: "Round 1", r2: "Round 2", r3: "Round 3", final: "Final", results: "Results" };

  return (
    <div style={styles.root}>
      {/* STICKY HEADER */}
      {screen !== "intro" && (
        <div style={styles.header}>
          <div>
            <div style={styles.title}>Spectrum Showdown</div>
            <div style={{ fontSize: "0.65rem", color: "#475569", letterSpacing: "0.1em" }}>{roundLabels[screen] || ""}</div>
          </div>
          <div style={styles.scoreBoard}>
            <div style={{ ...styles.scoreCard, borderColor: AMBER + "55", background: AMBER + "11" }}>
              <div style={{ ...styles.scoreName, color: AMBER }}>Player 1</div>
              <div style={{ ...styles.scoreVal, color: AMBER }}>{scores.p1}</div>
            </div>
            <div style={{ color: "#1E2D47", fontSize: "1.2rem" }}>vs</div>
            <div style={{ ...styles.scoreCard, borderColor: TEAL + "55", background: TEAL + "11" }}>
              <div style={{ ...styles.scoreName, color: TEAL }}>Player 2</div>
              <div style={{ ...styles.scoreVal, color: TEAL }}>{scores.p2}</div>
            </div>
          </div>
        </div>
      )}

      {screen === "intro" && <IntroScreen onStart={() => setScreen("r1")} />}
      {screen === "r1" && (
        <Round1
          scores={scores}
          setScores={setScores}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          onNext={() => { setScreen("r2"); setCurrentPlayer(1); }}
        />
      )}
      {screen === "r2" && (
        <Round2
          scores={scores}
          setScores={setScores}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          onNext={() => { setScreen("r3"); }}
        />
      )}
      {screen === "r3" && (
        <Round3
          scores={scores}
          setScores={setScores}
          onNext={() => setScreen("final")}
        />
      )}
      {screen === "final" && (
        <FinalRound
          scores={scores}
          setScores={setScores}
          onNext={() => setScreen("results")}
        />
      )}
      {screen === "results" && <Results scores={scores} />}

      {/* Round nav (shown after intro but before results) */}
      {!["intro", "results"].includes(screen) && (
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "40px", gap: "8px" }}>
          {[
            { id: "r1", label: "Round 1" },
            { id: "r2", label: "Round 2" },
            { id: "r3", label: "Round 3" },
            { id: "final", label: "Final" },
          ].map((r) => (
            <div
              key={r.id}
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 12px",
                borderRadius: "20px",
                fontFamily: "'Georgia', serif",
                background: screen === r.id ? AMBER + "22" : "transparent",
                color: screen === r.id ? AMBER : "#475569",
                border: `1px solid ${screen === r.id ? AMBER + "66" : "#1E2D47"}`,
              }}
            >
              {r.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
