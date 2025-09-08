---
title: PIN-Convert — Smart Contract Automation for Dolibarr
summary: Turn signed contracts into automated projects, invoices, tasks, notifications, and secure archives inside Dolibarr.
status: Under Development
tags: [Integration, ERP, Dolibarr, Automation, Security, API]
lastUpdated: 2025-09-07
links:
  - label: Case Study
    url: /docs/DigitalPin-Implementation-Case-Study.md
  - label: API Config (Dolibarr)
    url: /docs/API-config%20steps.md
---

# 🔗 PIN-Convert — Smart Contract Automation & Management

From “Signed” to “Done” in minutes. PIN‑Convert watches contract status changes in Dolibarr and automatically generates the follow‑up work with guardrails and an audit trail.

## ✨ Highlights

- ⚙️ Auto‑actions: projects, invoices, interventions, tasks, notifications
- 🧠 Rule engine: configurable by category, customer, amount, terms
- 🔐 Secure vault: AES‑256 encrypted contract archive with ACL
- 🧾 Full audit log: who/what/when for traceability and compliance

## 🧭 Flow Overview

```
User marks Contract = Signed
        ⬇ (Dolibarr Contrat status)
 [ PIN‑Convert Trigger & Hooks ]
        ⬇
 [ Rule Engine ] — maps terms → actions
        ⬇
 Actions: Project • Invoice • Tasks • Intervention • Emails
        ⬇
 Secure Vault (AES‑256) + Audit Log + Dashboard
```

## 🧩 Features

- Project creation linked to Contract and Thirdparty
- First invoice generation based on contract terms
- Tasks auto‑assignment to teams or users
- Intervention scheduling for service delivery
- Internal notifications and emails
- Encrypted archiving and access via permissions

## 🧰 Rule Examples

- IF Category = “IT Support” THEN Project “IT‑Onboarding‑[Client]”, Assign “Tech Team”, Create Setup Fee Invoice
- IF Amount > 50,000 THEN require Manager Approval before actions
- IF Customer Segment = “Enterprise” THEN add QBR Task in 90 days

## 🔐 Security

- Encryption at rest: AES‑256 via OpenSSL
- Key management: restricted to admin, rotation supported
- Access control: Dolibarr ACL groups/roles enforced everywhere
- Audit logging: contract → actions, user overrides, failures

## 🏗️ Module Structure (concept)

```
pinconvert/
├─ core/
│  ├─ boxes/                      # Dashboard widgets
│  └─ modules_pinconvert.php      # Module descriptor
├─ class/
│  └─ actions_pinconvert.class.php  # Hooks & triggers
├─ lib/
│  └─ pinconvert.lib.php          # Crypto, rules, helpers
├─ scripts/
│  └─ task_automation.php         # Cron / background tasks
├─ sql/
│  ├─ install.sql                 # Rules, logs, vault index
│  └─ uninstall.sql
└─ view/
   ├─ config.php                  # Configuration UI
   ├─ dashboard.php               # Process overview
   ├─ rules_setup.php             # Rule builder
   └─ archive.php                 # Encrypted vault access
```

## 📦 Requirements & Install

- Dolibarr v22+  
- Install: copy to `htdocs/custom/pinconvert/`, enable in Modules, set permissions
- Configure: vault path, key file location, rules, notifications, cron

## ✅ Status

Under development. See linked Case Study and API Config for related patterns.
