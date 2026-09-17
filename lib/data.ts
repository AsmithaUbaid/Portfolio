// Single source of truth for all portfolio content.
// Every fact here is drawn directly from the resume — nothing invented.

export const profile = {
  name: "Asmitha U",
  location: "Singapore",
  email: "uasmitha@gmail.com",
  phone: "+65 8649 3335",
  linkedin: "https://linkedin.com/in/asmitha-ubaid",
  linkedinLabel: "linkedin.com/in/asmitha-ubaid",
  tagline: "AI Engineer · LLMs, RAG & Agentic Systems",
  headline: "I build AI systems that work beyond the demo.",
  subheadline:
    "Software engineer with 3+ years at Palo Alto Networks — now building and evaluating LLM, RAG, and agentic systems for real production constraints: accuracy, latency, cost, and failure modes.",
  summary:
    "Software engineer with 3+ years at Palo Alto Networks, progressing from Software Engineer Intern to Staff Software Engineer, building distributed backend services and cloud infrastructure across GCP, AWS, and Kubernetes. Pursuing an MSc in Enterprise Artificial Intelligence at NTU, with hands-on work in LLM applications, RAG, agentic workflows, multimodal document understanding, and evaluation of accuracy, latency, cost, and failure modes.",
  resumeFile: "/Asmitha_U_AI_Engineer_Resume.pdf",
  photo: "/headshot.jpg",
  availability: "Open to Applied AI / AI Engineering roles",
};

export const heroFacts = [
  { label: "Years in production engineering", value: "3+", suffix: "" },
  { label: "Storage & egress cost reduction delivered", value: "20", suffix: "–50%" },
  { label: "Published papers & research works", value: "4", suffix: "" },
  { label: "AI systems designed & evaluated", value: "3", suffix: "" },
  { label: "Unit-test coverage increase driven", value: "30", suffix: "–40%" },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Staff Software Engineer",
    company: "Palo Alto Networks",
    start: "Jun 2025",
    end: "Jun 2026",
    summary:
      "Owns technical delivery of an event-driven device lifecycle platform spanning REST and message-driven paths across enterprise systems.",
    highlights: [
      "Engineered an event-driven device lifecycle workflow on GCP Pub/Sub, defining duplicate-prevention, retry handling, and downstream consistency across concurrent REST and message-driven paths.",
      "Owned investigation of customer-impacting production incidents — lifecycle state drift, software-version conflicts, and distributed backend failures — partnering with Engineering, QA, and Product to prioritize fixes and improve release readiness.",
    ],
    tags: ["GCP Pub/Sub", "Distributed Systems", "Incident Response", "Event-Driven Architecture"],
  },
  {
    role: "Software Engineer",
    company: "Palo Alto Networks",
    start: "Aug 2023",
    end: "May 2025",
    summary:
      "Built cloud storage and platform-migration capabilities relied on across the product's backend, balancing cost, portability, and reliability trade-offs.",
    highlights: [
      "Designed a multi-cloud storage abstraction across Amazon S3 and Google Cloud Storage, cutting estimated storage and egress costs by 20–50% while reducing vendor lock-in.",
      "Led migration of legacy microservices from VMs to Kubernetes, upgrading NGINX, secrets management, and CI/CD deployment practices.",
      "Built APIs and batch workflows for enterprise software lifecycle management, automating end-of-life deallocation and version tracking across customer environments.",
      "Raised unit-test coverage by 30–40% with JUnit and WireMock, strengthening API validation and release confidence.",
    ],
    tags: ["AWS S3", "GCS", "Kubernetes", "CI/CD", "JUnit", "WireMock"],
  },
  {
    role: "Software Engineer Intern",
    company: "Palo Alto Networks",
    start: "Jan 2023",
    end: "Jul 2023",
    summary:
      "Shipped data-migration and compliance tooling used across GCP regions and security workflows.",
    highlights: [
      "Built a Python framework to migrate BigQuery data across GCP regions, improving transfer efficiency by 30% with zero data loss.",
      "Automated JSON-to-Excel security-scan reporting, cutting manual effort by 60%, and remediated Java vulnerabilities to improve compliance.",
      "Implemented MongoDB multi-region replica-set synchronization using AWS volume snapshots, reducing downtime by 40% while maintaining cross-region data consistency.",
    ],
    tags: ["Python", "BigQuery", "MongoDB", "AWS", "Security Automation"],
  },
];

export type EducationEntry = {
  school: string;
  degree: string;
  start: string;
  end: string;
  detail: string;
};

export const education: EducationEntry[] = [
  {
    school: "Nanyang Technological University, Singapore",
    degree: "MSc in Enterprise Artificial Intelligence",
    start: "Aug 2026",
    end: "Present",
    detail: "Coursework: Generative AI, Agentic AI, Enterprise AI Solutions, AI Project Management",
  },
  {
    school: "Amrita Vishwa Vidyapeetham",
    degree: "B.Tech, Computer Science Engineering (AI)",
    start: "Sep 2019",
    end: "May 2023",
    detail: "CGPA 9.22/10 · Coursework: Machine Learning, Deep Learning, Computer Vision, NLP",
  },
];

export type DiagramNode = {
  id: string;
  label: string;
  sublabel: string;
  detail: string;
  col: number;
  row: number;
};

export type DiagramEdge = { source: string; target: string };

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  problem: string;
  whyAI: string;
  contribution: string;
  evaluation: { label: string; value: string }[];
  tradeoffs: { decision: string; reasoning: string }[];
  result: string;
  diagram: { nodes: DiagramNode[]; edges: DiagramEdge[] };
  tags: string[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "expense-compliance-checker",
    name: "AI Corporate Expense Compliance Checker",
    oneLiner:
      "A multimodal receipt-review pipeline that reasons over policy, not just text on a page.",
    problem:
      "Manual expense review is slow and inconsistent: reviewers cross-check receipt images against written company policy by hand, and edge cases (ambiguous categories, missing fields, policy conflicts) either get rubber-stamped or stall in a queue.",
    whyAI:
      "The task isn't classification on structured data — it's reading unstructured receipt images, retrieving the relevant policy clause, and reasoning about whether the two are consistent. That combination of OCR, retrieval, and judgment is exactly where an LLM-based pipeline earns its complexity over a rules engine, as long as its decisions are gated and its failures are caught.",
    contribution:
      "Designed and prototyped the end-to-end pipeline: OCR extraction over receipt images, a lightweight RAG layer over company policy documents, and an LLM reasoning stage that produces a gated decision — approve, flag, or escalate to a human reviewer. Defined the evaluation harness across accuracy, latency, cost, and failure modes.",
    evaluation: [
      { label: "Evaluation axes", value: "Accuracy, latency, cost" },
      { label: "Failure-mode analysis", value: "Explicit taxonomy" },
      { label: "Escalation path", value: "Human-in-the-loop" },
    ],
    tradeoffs: [
      {
        decision: "Gated automation over full autonomy",
        reasoning:
          "Expense decisions carry financial and compliance risk, so low-confidence or ambiguous cases are routed to a human reviewer instead of being auto-approved — autonomy is earned by confidence, not assumed.",
      },
      {
        decision: "Lightweight RAG over a static rules engine",
        reasoning:
          "Company policy changes and has exceptions; retrieving the current relevant clause at inference time is more maintainable than hard-coding rules that drift out of sync with policy updates.",
      },
      {
        decision: "OCR + LLM reasoning as separate stages",
        reasoning:
          "Keeping extraction and reasoning decoupled makes each stage independently testable — OCR quality can be evaluated on its own before compounding errors into the policy-reasoning step.",
      },
    ],
    result:
      "A working prototype that turns a manual, inconsistent review process into a structured pipeline with explicit accuracy/latency/cost trade-offs and a defined human-escalation path for the cases that matter most.",
    diagram: {
      nodes: [
        { id: "input", label: "Receipt Image", sublabel: "Input", detail: "Unstructured receipt images submitted for expense review.", col: 0, row: 0 },
        { id: "ocr", label: "OCR", sublabel: "Extraction", detail: "Extracts structured fields (vendor, amount, date, category) from the receipt image.", col: 1, row: 0 },
        { id: "rag", label: "Policy RAG", sublabel: "Retrieval", detail: "Lightweight retrieval over company expense policy to surface the clause relevant to this receipt.", col: 2, row: 0 },
        { id: "llm", label: "LLM Reasoning", sublabel: "Model", detail: "Reasons over extracted fields and retrieved policy to judge compliance.", col: 3, row: 0 },
        { id: "gate", label: "Gated Decision", sublabel: "Guardrail", detail: "Confidence-gated output: approve, flag, or escalate — nothing high-risk is auto-approved silently.", col: 4, row: 0 },
        { id: "human", label: "Human Escalation", sublabel: "Review", detail: "Low-confidence or high-risk cases route to a human reviewer instead of being auto-decided.", col: 5, row: 0 },
      ],
      edges: [
        { source: "input", target: "ocr" },
        { source: "ocr", target: "rag" },
        { source: "rag", target: "llm" },
        { source: "llm", target: "gate" },
        { source: "gate", target: "human" },
      ],
    },
    tags: ["OCR", "RAG", "LLM Reasoning", "Guardrails", "Human-in-the-loop"],
    featured: true,
  },
  {
    slug: "nda-compliance-review",
    name: "Adaptive AI for Enterprise NDA Compliance Review",
    oneLiner:
      "Clause-level retrieval and classification for contract review, with measured risk recall — not just accuracy.",
    problem:
      "Legal and compliance teams review NDAs clause by clause to catch risky or non-standard terms. Doing this manually at enterprise volume is slow, and the cost of missing a risky clause is asymmetric — a false negative is far worse than a false positive.",
    whyAI:
      "This is a retrieval-and-classification problem over legal text where an adaptive RAG system can surface the exact clause in question and classify it, but because the cost of errors is asymmetric, the system needs calibrated confidence — not just a label — so uncertain cases can be routed to a human instead of silently misclassified.",
    contribution:
      "Designed an adaptive RAG system on the ContractNLI dataset for clause-level retrieval and three-way classification (entailment / contradiction / not-mentioned), with a low-confidence review path to a human reviewer. Defined the evaluation metrics: Macro-F1, risk recall, Retrieval Recall@K, latency, and cost.",
    evaluation: [
      { label: "Classification quality", value: "Macro-F1" },
      { label: "Missed-risk sensitivity", value: "Risk recall" },
      { label: "Retrieval quality", value: "Recall@K" },
      { label: "Operational cost", value: "Latency + cost tracked" },
    ],
    tradeoffs: [
      {
        decision: "Risk recall weighted above raw accuracy",
        reasoning:
          "In compliance review, a missed risky clause is far more costly than a false alarm — so the system is tuned and measured against risk recall specifically, not just overall classification accuracy.",
      },
      {
        decision: "Three-way classification over binary flagging",
        reasoning:
          "Entailment / contradiction / not-mentioned preserves the legal distinction reviewers actually need, instead of collapsing nuance into a single 'risky vs. not' flag.",
      },
      {
        decision: "Adaptive retrieval over fixed top-k",
        reasoning:
          "Clause relevance varies by contract length and structure, so retrieval depth adapts per query rather than using a single fixed K — measured directly via Retrieval Recall@K.",
      },
    ],
    result:
      "A clause-level review workflow with quantified retrieval and classification quality, and a defined confidence-gated escalation path — built to make the asymmetric cost of missed risk explicit in the evaluation, not just the output.",
    diagram: {
      nodes: [
        { id: "contract", label: "NDA Document", sublabel: "Input", detail: "Full contract text submitted for clause-level compliance review.", col: 0, row: 0 },
        { id: "retrieval", label: "Clause Retrieval", sublabel: "Retrieval", detail: "Adaptive retrieval over the contract to surface candidate clauses relevant to each compliance check.", col: 1, row: 0 },
        { id: "classify", label: "3-Way Classifier", sublabel: "Model", detail: "Classifies each retrieved clause as entailment, contradiction, or not-mentioned against the compliance policy.", col: 2, row: 0 },
        { id: "confidence", label: "Confidence Check", sublabel: "Guardrail", detail: "Low-confidence classifications are routed for human review instead of being auto-finalized.", col: 3, row: 0 },
        { id: "eval", label: "Evaluator", sublabel: "Evaluation", detail: "Scores output against Macro-F1, risk recall, Retrieval Recall@K, latency, and cost.", col: 4, row: 0 },
        { id: "review", label: "Human Review", sublabel: "Escalation", detail: "Low-confidence or high-risk clauses escalate to a human legal reviewer.", col: 3, row: 1 },
      ],
      edges: [
        { source: "contract", target: "retrieval" },
        { source: "retrieval", target: "classify" },
        { source: "classify", target: "confidence" },
        { source: "confidence", target: "eval" },
        { source: "confidence", target: "review" },
      ],
    },
    tags: ["Adaptive RAG", "ContractNLI", "Classification", "Risk Recall", "Evaluation"],
    featured: true,
  },
  {
    slug: "log-anomaly-detection",
    name: "Anomaly Detection for System Logs",
    oneLiner:
      "Comparing classical and deep models for real-time anomaly detection on operational log data.",
    problem:
      "Operational systems generate high-volume log data where failures and anomalies need to be caught in real time — well before they surface as customer-impacting incidents.",
    whyAI:
      "Anomalies in log data don't follow fixed rules — patterns shift over time and across systems — so the project compared multiple model families (sequence-aware and non-sequence-aware) to understand which approach fits which kind of anomaly, rather than assuming one model architecture is sufficient.",
    contribution:
      "Applied and compared ANN, CNN, RNN, Isolation Forest, and Decision Tree models on operational log data, evaluating each for real-time anomaly detection and system monitoring.",
    evaluation: [
      { label: "Models compared", value: "5 (ANN, CNN, RNN, Isolation Forest, Decision Tree)" },
      { label: "Use case", value: "Real-time monitoring" },
    ],
    tradeoffs: [
      {
        decision: "Multiple model families over a single default",
        reasoning:
          "Sequence models (RNN) capture temporal patterns that tree-based methods (Isolation Forest, Decision Trees) miss, while classical methods offer faster inference — comparing both surfaces the right trade-off for real-time constraints.",
      },
      {
        decision: "Real-time monitoring as the design constraint",
        reasoning:
          "Detection latency matters as much as detection quality for operational monitoring, which shaped model selection toward approaches that can run inline with log ingestion.",
      },
    ],
    result:
      "A comparative evaluation of classical and deep anomaly-detection approaches on real operational log data, informing which model family fits real-time system-monitoring constraints.",
    diagram: {
      nodes: [
        { id: "logs", label: "System Logs", sublabel: "Input", detail: "Streaming operational log data from production systems.", col: 0, row: 0 },
        { id: "features", label: "Feature Extraction", sublabel: "Processing", detail: "Log data transformed into feature representations for downstream models.", col: 1, row: 0 },
        { id: "classical", label: "Isolation Forest / Decision Tree", sublabel: "Classical Models", detail: "Fast, non-sequence-aware anomaly scoring for low-latency detection.", col: 2, row: 0 },
        { id: "deep", label: "ANN / CNN / RNN", sublabel: "Deep Models", detail: "Sequence- and pattern-aware models that capture temporal anomaly signatures.", col: 2, row: 1 },
        { id: "compare", label: "Comparative Evaluation", sublabel: "Evaluation", detail: "Models compared for detection quality vs. real-time latency trade-offs.", col: 3, row: 0.5 },
        { id: "monitor", label: "Monitoring Alert", sublabel: "Output", detail: "Flagged anomalies surfaced for system monitoring and response.", col: 4, row: 0.5 },
      ],
      edges: [
        { source: "logs", target: "features" },
        { source: "features", target: "classical" },
        { source: "features", target: "deep" },
        { source: "classical", target: "compare" },
        { source: "deep", target: "compare" },
        { source: "compare", target: "monitor" },
      ],
    },
    tags: ["Anomaly Detection", "RNN", "CNN", "Isolation Forest", "Monitoring"],
    featured: false,
  },
];

export type DecisionCard = {
  id: string;
  question: string;
  shortAnswer: string;
  reasoning: string;
};

export const howIThink: DecisionCard[] = [
  {
    id: "agent-vs-workflow",
    question: "When should I use an agent instead of a deterministic workflow?",
    shortAnswer: "Default to a deterministic workflow. Reach for an agent only when the path can't be fixed in advance.",
    reasoning:
      "In the expense-compliance pipeline, the steps were fixed and known — OCR, then retrieval, then reasoning, then a gated decision — so a deterministic workflow with explicit gates was the right shape. An agent earns its complexity when the next step genuinely depends on what the model discovers mid-task and can't be hard-coded. Autonomy should be scoped to where it's needed, not applied by default.",
  },
  {
    id: "when-rag",
    question: "When is RAG necessary?",
    shortAnswer: "When the ground truth changes or is too large to bake into the model — policy, contracts, live documents.",
    reasoning:
      "Company expense policy and NDA contract text both change over time and vary per customer — retrieval at inference time keeps the system aligned with current source documents instead of encoding stale rules into a prompt or fine-tune. If the knowledge is stable and small, RAG adds latency and failure surface for no benefit.",
  },
  {
    id: "model-selection",
    question: "How do I choose between two models?",
    shortAnswer: "Evaluate on the same axes every time: accuracy, latency, and cost — as a trade-off, not a leaderboard.",
    reasoning:
      "Across both AI projects, evaluation was defined up front across accuracy, latency, and cost rather than picking the model with the single best accuracy number. A model that's 2% more accurate but 5x the latency and cost is rarely the right production choice — the decision depends on what the system can't tolerate.",
  },
  {
    id: "cost-vs-accuracy",
    question: "When does cost matter more than accuracy?",
    shortAnswer: "When the task runs at high volume with low per-decision risk — cost compounds, and marginal accuracy doesn't.",
    reasoning:
      "High-volume, low-risk classification steps benefit more from a cheaper, faster model paired with a good escalation path than from squeezing out marginal accuracy at high per-call cost. Cost becomes the binding constraint once volume is high enough that the accuracy gain doesn't outweigh what it costs to get it — especially when a human-review gate already catches the tail of hard cases.",
  },
  {
    id: "autonomy-control",
    question: "How should AI autonomy be controlled?",
    shortAnswer: "Gate the decision, not just the output — confidence thresholds route to a human before anything risky auto-executes.",
    reasoning:
      "Both AI projects used the same pattern: a gated decision layer that gives the model room to act, but routes low-confidence or high-risk outcomes to a human reviewer instead of auto-committing. Autonomy is controlled by where the gate sits, not by limiting what the model is allowed to say.",
  },
  {
    id: "evaluation-before-deploy",
    question: "How do I evaluate an LLM application before deployment?",
    shortAnswer: "Define the metrics before the system exists, and include failure modes — not just aggregate accuracy.",
    reasoning:
      "For the NDA review system, evaluation metrics (Macro-F1, risk recall, Retrieval Recall@K, latency, cost) were defined as part of the design, not bolted on afterward — including risk recall specifically because false negatives were more costly than false positives. An LLM application isn't ready to ship until its failure modes have been named and measured, not just its success rate.",
  },
];

export type SkillCluster = { label: string; skills: string[] };

export const skillClusters: SkillCluster[] = [
  {
    label: "Applied AI & GenAI",
    skills: ["Generative AI", "LLMs", "RAG", "Agentic AI", "Multimodal Document Understanding"],
  },
  {
    label: "Machine Learning & NLP",
    skills: ["Machine Learning", "Deep Learning", "NLP", "ANN", "CNN", "RNN", "Isolation Forest", "Decision Trees"],
  },
  {
    label: "Evaluation",
    skills: ["Accuracy", "Latency", "Cost", "Failure-Mode Analysis", "Macro-F1", "Retrieval Recall@K", "Risk Recall"],
  },
  {
    label: "Backend Engineering",
    skills: ["Python", "Java", "SQL", "Bash", "REST APIs", "Microservices", "JUnit", "WireMock"],
  },
  {
    label: "Cloud & Infrastructure",
    skills: ["AWS", "GCP", "Kubernetes", "Docker", "CI/CD", "Jenkins", "NGINX", "MongoDB", "BigQuery"],
  },
  {
    label: "Reliability & Observability",
    skills: ["Kibana", "Datadog", "Grafana", "Git", "Linux", "Incident Response"],
  },
  {
    label: "Product & Systems Thinking",
    skills: [
      "Stakeholder Management",
      "Cross-functional Collaboration",
      "Technical Prioritization",
      "Requirements Analysis",
      "Agile",
      "Human-in-the-loop Workflows",
    ],
  },
];

export type Publication = { title: string; venue: string; note?: string };

export const publications: Publication[] = [
  {
    title: "Analysis of Stop Consonants and Vowels in Indian Languages: A Multifractal Approach",
    venue: "IEEE ICMSS 2021",
    note: "Best Paper Award",
  },
  {
    title: "DistilRoBERTa-Based Sentence Embedding for Rhetorical Role Labelling of Legal Case Documents",
    venue: "FIRE 2021",
  },
  {
    title: "Coconut Tree Detection Using Deep Learning Models",
    venue: "Springer, 2023",
  },
  {
    title: "Ensemble Deep Learning Models for Vehicle Classification in Motorized Traffic Analysis",
    venue: "Springer, 2023",
  },
];

export const awards: Publication[] = [
  {
    title: "Collaboration Team Award, Palo Alto Networks",
    venue: "Recognized for driving cross-functional alignment across Engineering, QA, and Product; mentored junior engineers.",
  },
];

export const certifications = [
  {
    title: "Google Cloud Certified — Professional Cloud Architect",
    period: "Jan 2026 – Jan 2028",
  },
];
