/* =========================================================
   NEWS AND PUBLICATION DATA — run `node scripts/build-content.mjs` after editing.
   Add a paper -> push an object to PUBS.
   Add a news line -> push an object to NEWS.
   The script refreshes static HTML in index.html; browsers do not need JavaScript to read it.
   ========================================================= */

/* ---------------------------------------------------------
   NEWS — newest first. `date` is free text; "2026.05" style
   keeps the column tidy.
   (Optional: add a line for the Causal Dynamics Lab internship.)
   --------------------------------------------------------- */
window.NEWS = [
  {
    date: "2026.05",
    html: '<strong>LARGER</strong> is on arXiv — lexically anchored repository graph retrieval for CLI coding agents (<a href="https://arxiv.org/abs/2605.16352" target="_blank" rel="noopener">arXiv:2605.16352</a>).'
  },
  {
    date: "2026.04",
    html: 'Our paper on <strong>cross-modal ECG → Doppler generation</strong> was accepted to <strong>IEEE EMBC 2026</strong> as an <strong>Oral</strong> presentation. 🎉'
  },
  {
    date: "2025.08",
    html: 'Started my Ph.D. in Computer Science at <strong>Emory University</strong>.'
  }
];

/* How many news items to show before the "Show all news" button. */
window.NEWS_VISIBLE = 5;

/* ---------------------------------------------------------
   PUBLICATIONS — newest first.
     title    : paper title
     authors  : full author string; wrap YOUR name in ** ** to bold it,
                e.g. "Yuntong Hu*, **Tongli Su***, Liang Zhao"
     venue    : e.g. "IEEE EMBC 2026" / "arXiv preprint, 2026"
     authorNote: optional author contribution note
     badges   : short labels, e.g. ["Oral"], ["Spotlight"], ["Co-first author"]
     insight  : one sentence on what the paper shows (optional but recommended)
     thumb    : path to a teaser image, e.g. "assets/img/pubs/larger.png" (optional)
     links    : [{label, url}, ...] — arXiv / PDF / Code / Poster / Slides
   --------------------------------------------------------- */
window.PUBS = [
  {
    title: "LARGER: Lexically Anchored Repository Graph Exploration and Retrieval",
    authors: "Yuntong Hu*, **Tongli Su***, Liang Zhao, Bowen Zhu, Hasibul Haque",
    authorNote: "* Equal contribution",
    venue: "arXiv preprint, 2026 (under review)",
    badges: [],
    insight: "Helps coding agents find relevant code by bringing repository structure directly into their existing search workflow, supporting codebase understanding and test generation.",
    thumb: "",                                     // TODO: drop a teaser figure at assets/img/pubs/larger.png
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2605.16352" }
      // { label: "Code", url: "https://github.com/YOUR_GITHUB/LARGER" }
    ]
  },
  {
    title: "Cross-Modal Generative Framework for Signal Translation from Fetal–Maternal Electrocardiograms to Fetal Doppler Waveforms",
    authors: "**Tongli Su**, Alireza Rafiei, Marly van Assen, Reza Sameni, Gari D. Clifford, Faezeh Marzbanrad, Nasim Katebi",
    venue: "IEEE Engineering in Medicine & Biology Conference (EMBC), 2026",
    badges: ["Oral"],
    insight: "Uses fetal and maternal ECG to reconstruct Doppler waveforms and study which aspects of fetal cardiovascular function are recoverable across modalities.",
    thumb: "",
    links: [
      { label: "PDF", url: "assets/files/fECG2Doppler.pdf" }
    ]
  },
  {
    title: "A Review of Multimodal Pretraining Strategies for Physiological Wearable Sensor Foundation Models",
    authors: "**Tongli Su**, Nicki Barari, Nasim Katebi",
    venue: "Under review, 2026",
    badges: [],
    insight: "Reviews 22 studies of multimodal pretraining for wearable sensor foundation models, organizing five learning paradigms and identifying challenges in personalization, robustness, and generalization.",
    thumb: "",
    links: []
  }
];
