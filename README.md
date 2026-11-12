# 🗳️ VoterVoice Naija
### *Inclusive, Multilingual & Offline-Resilient Civic Technology for All Nigerians*

[![Hackathon: #AI4Elections](https://img.shields.io/badge/Hackathon-%23AI4Elections%20Track%203-008751?style=for-the-badge)](https://ai4elections.risenetworks.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-E07A5F?style=for-the-badge)](LICENSE)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-0284C7?style=for-the-badge&logo=python)](https://python.org)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)

**VoterVoice Naija** bridges Nigeria's democratic divide by delivering verified electoral information and ballot-protection guidance to over **40 million rural, non-literate, and PWD citizens**. 

Operating over **toll-free GSM voice calls (IVR)** and **USSD (`*384*24#`)**, the platform brings conversational Speech AI in **Hausa, Yoruba, Igbo, and Nigerian Pidgin** to basic 2G feature phones ("Yam phones") with **zero internet and zero data cost to the voter**.

---

## 📁 Repository Structure (Monorepo)

```
votervoice-naija/
├── docs/
│   └── VoterVoice_Naija_Track3_Pitch.pdf   # Official 6-page Hackathon Proposal
├── backend/                                # FastAPI Telephony & Speech AI Service
│   ├── .env.example
│   └── requirements.txt
├── frontend/                               # Next.js 14 + Tailwind CSS (v4) Web Simulator
│   ├── src/
│   │   ├── app/                            # App Router (Home & Layout)
│   │   └── components/
│   │       └── PhoneSimulator.tsx          # 2G Feature Phone Interactive Emulator
│   ├── package.json
│   ├── postcss.config.mjs
│   └── tsconfig.json
├── docker-compose.yml                      # Full-stack container orchestration
├── vercel.json                             # Root configuration for Vercel deployment
└── .gitignore
```

---

## 🚀 Quickstart: Deploying to Vercel (Live Prototype Link)

To get a live working prototype domain on Vercel for your hackathon submission:

1. Push your `develop` or `main` branch to GitHub.
2. Go to **[vercel.com/new](https://vercel.com/new)** and import your `votervoice-naija` repository.
3. In **Project Settings**:
   * **Root Directory:** Select `frontend` (or leave root as `vercel.json` automatically targets `frontend`).
   * **Framework Preset:** `Next.js`
4. Click **Deploy**. Vercel will build and assign you a live URL (e.g., `https://votervoice-naija.vercel.app`).

---

## 💻 Local Development Setup

### 1. Frontend Web Simulator (Member 3)
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000 to test the on-screen 2G feature phone simulator
```

### 2. Backend Telephony & AI API (Members 1 & 2)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## 👥 Team Zeniva — Roles & Responsibilities

* **Adeyemi Olusola (Product Manager & Lead AI/Speech Systems Engineer):** Overall product architecture, multilingual speech pipeline (ASR & TTS in Hausa, Yoruba, Igbo, Pidgin), and vector RAG grounding on the *Electoral Act 2022* with anti-hallucination guardrails.
* **Olalekan Olatunbosun (Telephony, USSD & Backend Engineer):** Real-time telecom infrastructure, Africa's Talking voice & USSD callback webhooks, Redis session caching for stateful multi-turn phone calls, and FastAPI microservices.
* **Martha Onweye (Accessibility UI/UX & Web Simulator Engineer):** Next.js 14 web application, interactive on-screen 2G feature-phone emulator, WCAG 2.1 AA design standards, and PWD suite (Nigerian Sign Language video & digital Form EC30PWD).
* **Richard Obodo (Civic Research, Content Translation & Demo Lead):** Ground-truth INEC legal research, native translation quality auditing in Hausa/Yoruba/Igbo/Pidgin, ballot-protection testing, and producing the mandatory 2-minute demonstration video.

---

## 📜 Official Pitch Document
For the complete technical blueprint, legal guardrails (Electoral Act 2022 Sections 47, 51, 56, 60), and human-centric design system, see:
[`docs/VoterVoice_Naija_Track3_Pitch.pdf`](docs/VoterVoice_Naija_Track3_Pitch.pdf)

---

## ⚖️ License
Distributed under the [MIT License](LICENSE). Built for the #AI4Elections Hackathon organized by Rise Networks and partners.

---

## 📁 Repository Structure (Monorepo)

```
votervoice-naija/
├── docs/
│   └── VoterVoice_Naija_Track3_Pitch.pdf   # Official 6-page Hackathon Proposal
├── backend/                                # FastAPI Telephony & Speech AI Service
│   ├── .env.example
│   └── requirements.txt
├── frontend/                               # Next.js 14 + Tailwind CSS (v4) Web Simulator
│   ├── src/
│   │   ├── app/                            # App Router (Home & Layout)
│   │   └── components/
│   │       └── PhoneSimulator.tsx          # 2G Feature Phone Interactive Emulator
│   ├── package.json
│   ├── postcss.config.mjs
│   └── tsconfig.json
├── docker-compose.yml                      # Full-stack container orchestration
├── vercel.json                             # Root configuration for Vercel deployment
└── .gitignore
```

---

## 🚀 Quickstart: Deploying to Vercel (Live Prototype Link)

To get a live working prototype domain on Vercel for your hackathon submission:

1. Push your `develop` or `main` branch to GitHub.
2. Go to **[vercel.com/new](https://vercel.com/new)** and import your `votervoice-naija` repository.
3. In **Project Settings**:
   * **Root Directory:** Select `frontend` (or leave root as `vercel.json` automatically targets `frontend`).
   * **Framework Preset:** `Next.js`
4. Click **Deploy**. Vercel will build and assign you a live URL (e.g., `https://votervoice-naija.vercel.app`).

---

## 💻 Local Development Setup

### 1. Frontend Web Simulator (Member 3)
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000 to test the on-screen 2G feature phone simulator
```

### 2. Backend Telephony & AI API (Members 1 & 2)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## 👥 Team Zeniva — Roles & Responsibilities

* **Adeyemi Olusola (Product Manager & Lead AI/Speech Systems Engineer):** Overall product architecture, multilingual speech pipeline (ASR & TTS in Hausa, Yoruba, Igbo, Pidgin), and vector RAG grounding on the *Electoral Act 2022* with anti-hallucination guardrails.
* **Olalekan Olatunbosun (Telephony, USSD & Backend Engineer):** Real-time telecom infrastructure, Africa's Talking voice & USSD callback webhooks, Redis session caching for stateful multi-turn phone calls, and FastAPI microservices.
* **Martha Onweye (Accessibility UI/UX & Web Simulator Engineer):** Next.js 14 web application, interactive on-screen 2G feature-phone emulator, WCAG 2.1 AA design standards, and PWD suite (Nigerian Sign Language video & digital Form EC30PWD).
* **Richard Obodo (Civic Research, Content Translation & Demo Lead):** Ground-truth INEC legal research, native translation quality auditing in Hausa/Yoruba/Igbo/Pidgin, ballot-protection testing, and producing the mandatory 2-minute demonstration video.

---

## 📜 Official Pitch Document
For the complete technical blueprint, legal guardrails (Electoral Act 2022 Sections 47, 51, 56, 60), and human-centric design system, see:
[`docs/VoterVoice_Naija_Track3_Pitch.pdf`](docs/VoterVoice_Naija_Track3_Pitch.pdf)

---

## ⚖️ License
Distributed under the [MIT License](LICENSE). Built for the #AI4Elections Hackathon organized by Rise Networks and partners.
