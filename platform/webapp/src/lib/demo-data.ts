export const demoOffers = [
  {
    offerId: "ofr_01DEMO00000000000000000001",
    customerId: "cust_ing_4412",
    productCode: "PREAUTH-CC",
    contentObjectId: "cms_pfm_insight_12",
    status: "ranked",
    predictedUptake: 0.31,
    constraintFlags: ["travel"],
    explanation:
      "Segment: omnichannel PFM users with revolving balance; feature: 90-day spend mix on travel vs grocery.",
    consentBasisPresent: true,
    probabilityOfDefault: 0.08,
    activeProtectHold: false,
  },
  {
    offerId: "ofr_01DEMO00000000000000000002",
    customerId: "cust_ing_7781",
    productCode: "SME-KABBAGE",
    contentObjectId: "cms_sme_kabbage",
    status: "blocked",
    predictedUptake: 0.22,
    constraintFlags: ["consentGap", "policyBlock"],
    explanation: "Blocked: legal basis missing for help channel. Protect continues.",
    consentBasisPresent: false,
    probabilityOfDefault: 0.19,
    policyBlockReason: "No personalisation consent (BR-8)",
    activeProtectHold: false,
  },
  {
    offerId: "ofr_01DEMO00000000000000000003",
    customerId: "cust_ing_2209",
    productCode: "WELAB-MINUTE",
    contentObjectId: "cms_consumer_loan",
    status: "heldForRm",
    predictedUptake: 0.41,
    constraintFlags: ["protectHold"],
    explanation: "Credit-adjacent offer. PD shown as probability, not a credibility badge.",
    consentBasisPresent: true,
    probabilityOfDefault: 0.27,
    activeProtectHold: true,
  },
];

export const demoAlerts = [
  {
    alertId: "alt_01DEMO00000000000000000001",
    customerId: "cust_ing_2209",
    alertType: "geoCluster",
    status: "open",
    severity: "high",
    slaDeadlineAt: new Date(Date.now() + 8 * 60 * 1000).toISOString(),
    slaBreached: false,
    clusterCentroid: { lat: 51.5, lng: -0.12 },
    convexHull: { venues: 4 },
    priorVenues: ["London ATM", "Paris POS", "Amsterdam app"],
  },
];

export const demoHolds = [
  {
    holdId: "hld_01DEMO00000000000000000001",
    customerId: "cust_ing_2209",
    alertId: "alt_01DEMO00000000000000000001",
    status: "active",
    reason: "Geo hull anomaly vs 30-day venues",
    customerSafeRationale: "We paused a card authorisation while we confirm unusual travel.",
    disputeWindowEndsAt: new Date(Date.now() + 36 * 3600 * 1000).toISOString(),
    falsePositive: false,
  },
];

export const demoCases = [
  {
    caseId: "cse_01DEMO00000000000000000001",
    hostIds: ["host-12027"],
    status: "investigating",
    summary: "Flow-record anomaly over 36-day corpus (aggregated). No PCAP in marketing views.",
    assignedTo: "soc.demo",
  },
];

export const demoPolicies = [
  {
    policyId: "pol_01DEMO00000000000000000001",
    name: "Fraud score may suppress help offers",
    enabled: true,
    fromPurpose: "protect",
    toPurpose: "help",
    effect: "requireReview",
    approvalCount: 1,
    approved: false,
    silentReuseDetected: true,
    feeIncentiveNote: "Vendor take-rate must not inflate alerts or spam offers (BR-12).",
  },
];

export const demoConsent = [
  {
    consentRecordId: "cns_01DEMO00000000000000000001",
    customerId: "cust_ing_4412",
    purpose: "help",
    legalBasis: "consent",
    basisPresent: true,
  },
  {
    consentRecordId: "cns_01DEMO00000000000000000002",
    customerId: "cust_ing_7781",
    purpose: "help",
    legalBasis: "none",
    basisPresent: false,
  },
];

export const demoModels = [
  {
    modelId: "mdl_01DEMO00000000000000000001",
    channel: "help",
    name: "next-best-v3",
    status: "candidate",
    lineage: "featureset-pfm-2026-03 → train-run-88",
    lineageComplete: true,
  },
  {
    modelId: "mdl_01DEMO00000000000000000002",
    channel: "protect",
    name: "geo-dbscan-hull",
    status: "production",
    lineage: "card-auth-stream → cluster-job-12",
    lineageComplete: true,
  },
];

export const demoAudits = [
  {
    auditId: "aud_01DEMO00000000000000000001",
    status: "ready",
    periodFrom: "2026-08-01T00:00:00Z",
    periodTo: "2026-08-31T23:59:59Z",
    purpose: "both",
    incompletePurposeTags: 0,
    integrityHash: "sha256:demo",
  },
];
