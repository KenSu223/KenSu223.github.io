/* =========================================================
   THE ONLY FILE YOU NEED TO EDIT FOR CONTENT UPDATES.
   Add a paper -> push an object to PUBS.
   Add a news line -> push an object to NEWS.
   Everything else (index.html) stays untouched.
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
     thumbLabel: short text shown when there is no teaser image (optional)
     tags     : topic labels; they become the filter chips above the list
     badges   : short labels, e.g. ["Oral"], ["Spotlight"], ["Co-first author"]
     insight  : one sentence on what the paper shows (optional but recommended)
     thumb    : path to a teaser image, e.g. "assets/img/pubs/larger.png" (optional)
     links    : [{label, url}, ...] — arXiv / PDF / Code / Poster / Slides
   --------------------------------------------------------- */
window.PUBS = [
  {
    title: "LARGER: Lexically Anchored Repository Graph Exploration and Retrieval",
    authors: "Yuntong Hu*, **Tongli Su***, Liang Zhao, Bowen Zhu, Hasibul Haque",
    venue: "arXiv preprint, 2026 (under review)",
    thumbLabel: "arXiv 2026",
    tags: ["LLM Agents", "Retrieval", "Code"],
    badges: [],
    insight: "Repository-level coding agents fail first at localization. LARGER turns an agent's own lexical matches into graph anchors and returns confidence-filtered local neighborhoods inside its existing search loop — +13.9 Acc@5 on LocBench over the strongest baseline, with no external graph database or new agent action.",
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
    thumbLabel: "IEEE EMBC 2026",
    tags: ["Generative Models", "Biosignals"],
    badges: ["Oral"],
    insight: "Reconstructs Doppler envelopes from dual-lead ECG with dilated convolutions and cross-modal attention, separating the electrically recoverable component of fetal hemodynamics from the purely mechanical residual. Cross-modal attention cuts PSD MSE by 39% over naive dual-channel concatenation, quantifying maternal–fetal coupling as selective rather than uniform.",
    thumb: "",
    links: [
      { label: "PDF", url: "assets/files/fECG2Doppler.pdf" }
    ]
  },
  {
    title: "A Review of Multimodal Pretraining Strategies for Physiological Wearable Sensor Foundation Models",
    authors: "**Tongli Su**, Nicki Barari, Nasim Katebi",
    venue: "Under review, 2026",
    thumbLabel: "Under review 2026",
    tags: ["Foundation Models", "Biosignals"],
    badges: [],
    insight: "Synthesizes 22 papers (2024–2026) into five multimodal pretraining paradigms — contrastive, generative/reconstruction, language-grounded alignment, missing-modality learning, and cross-modal distillation — and extracts the design principles shared by the current cohort of wearable foundation models.",
    thumb: "",
    links: []
  }
];
