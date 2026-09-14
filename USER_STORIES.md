# Aegora — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Personalisation product manager

- As a personalisation PM, I want next-best actions ranked with predicted uptake and constraint flags, so that campaigns respect travel and fraud holds.
- As a personalisation PM, I want to reuse existing content objects in recommendations, so that we do not rebuild copy for every model refresh.
- As a personalisation PM, I want blocked offers itemised by policy reason, so that I can fix consent gaps rather than guess.

### Fraud / cyber analyst

- As a fraud analyst, I want geo-clusters and convex-hull anomalies on card events, so that I can distinguish travel from cloning.
- As a fraud analyst, I want automatic provisional holds with investigator queues, so that loss is capped before human review finishes.
- As a SOC analyst, I want network-flow anomaly cases linked to host timelines, so that intrusion triage is evidence-based.

### Relationship manager

- As an RM, I want to override or soften an automated offer with a reason code, so that relationship context survives the model.
- As an RM, I want to see whether a customer is under an active protect hold before pitching, so that I do not sell into a blocked card experience.

### Privacy / model risk officer

- As a privacy officer, I want purpose tags on every action, so that marketing and security processing stay separable under audit.
- As a model-risk officer, I want lineage from feature set to deployed help/protect models, so that I can challenge unsafe promotions.
- As a privacy officer, I want a deny-by-default when legal basis is missing for help actions, so that protect can continue while help pauses.

### Customer care agent

- As a care agent, I want the alert rationale and resolution path for a disputed block, so that I can restore service without defeating fraud controls.
