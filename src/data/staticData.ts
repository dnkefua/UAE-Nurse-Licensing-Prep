/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudyTopic, Question } from '../types';

// ── UAE Nursing Jobs (curated, legitimate official employers) ───────────────────

export type JobRole = 'Registered Nurse' | 'Nursing Assistant' | 'Specialist Nurse' | 'Midwife' | 'Home Care Nurse';

export interface JobEmployer {
  id: string;
  employer: string;
  logo: string;          // emoji
  emirate: string;
  type: 'Hospital Group' | 'Government' | 'Clinic Network' | 'Home Healthcare';
  roles: JobRole[];
  about: string;
  whyLegit: string;      // why this is a verified/legitimate employer
  careersUrl: string;    // official careers page
  verified: boolean;
  facts: { label: string; value: string }[];
}

/**
 * Each entry links to the employer's OFFICIAL careers portal — the only place
 * to apply. These are large, licensed UAE healthcare providers. Applications are
 * always free: legitimate UAE employers never charge candidates a placement fee.
 */
export const JOB_EMPLOYERS: JobEmployer[] = [
  {
    id: 'seha',
    employer: 'SEHA — Abu Dhabi Health Services',
    logo: '🏥', emirate: 'Abu Dhabi', type: 'Government',
    roles: ['Registered Nurse', 'Nursing Assistant', 'Specialist Nurse', 'Midwife'],
    about: 'The UAE\'s largest healthcare network, operating public hospitals and clinics across Abu Dhabi (including Sheikh Shakhbout Medical City, Tawam, and Mafraq).',
    whyLegit: 'Government-owned (Abu Dhabi Health Services Co.). Recruits directly via its official careers portal — no agency fees.',
    careersUrl: 'https://www.seha.ae/careers/',
    verified: true,
    facts: [
      { label: 'Regulator', value: 'DOH Abu Dhabi' },
      { label: 'Facilities', value: 'Hospitals + clinics' },
      { label: 'License', value: 'DOH required' },
    ],
  },
  {
    id: 'dubai-health',
    employer: 'Dubai Health (DHA hospitals)',
    logo: '🏛️', emirate: 'Dubai', type: 'Government',
    roles: ['Registered Nurse', 'Nursing Assistant', 'Specialist Nurse'],
    about: 'The integrated academic health system of Dubai — Rashid, Dubai, Latifa, and Hatta Hospitals, plus primary care centres.',
    whyLegit: 'Operated by Dubai Health (government). Official recruitment via Dubai Careers / Dubai Health portal.',
    careersUrl: 'https://www.dubaihealth.ae/careers',
    verified: true,
    facts: [
      { label: 'Regulator', value: 'DHA' },
      { label: 'Facilities', value: 'Public hospitals' },
      { label: 'License', value: 'DHA required' },
    ],
  },
  {
    id: 'ehs',
    employer: 'Emirates Health Services (EHS)',
    logo: '🇦🇪', emirate: 'Northern Emirates', type: 'Government',
    roles: ['Registered Nurse', 'Nursing Assistant', 'Midwife'],
    about: 'Federal health services operating hospitals and centres across Sharjah, Ajman, UAQ, RAK, and Fujairah.',
    whyLegit: 'Federal government body (formerly part of MOHAP). Hires through the official EHS / UAE government jobs portal.',
    careersUrl: 'https://www.ehs.gov.ae/en/careers',
    verified: true,
    facts: [
      { label: 'Regulator', value: 'MOHAP' },
      { label: 'Region', value: 'Northern Emirates' },
      { label: 'License', value: 'MOHAP required' },
    ],
  },
  {
    id: 'cleveland',
    employer: 'Cleveland Clinic Abu Dhabi',
    logo: '🩺', emirate: 'Abu Dhabi', type: 'Hospital Group',
    roles: ['Registered Nurse', 'Specialist Nurse'],
    about: 'A multispecialty hospital and a leading US academic medical centre\'s flagship in the Middle East.',
    whyLegit: 'Part of Mubadala Health. Applications only via the official Cleveland Clinic Abu Dhabi careers site.',
    careersUrl: 'https://www.clevelandclinicabudhabi.ae/en/careers',
    verified: true,
    facts: [
      { label: 'Regulator', value: 'DOH Abu Dhabi' },
      { label: 'Type', value: 'Tertiary hospital' },
      { label: 'Experience', value: '2+ yrs typical' },
    ],
  },
  {
    id: 'mediclinic',
    employer: 'Mediclinic Middle East',
    logo: '➕', emirate: 'Dubai / Abu Dhabi', type: 'Hospital Group',
    roles: ['Registered Nurse', 'Specialist Nurse', 'Midwife'],
    about: 'A private hospital and clinic group operating across Dubai, Abu Dhabi, and Al Ain.',
    whyLegit: 'Part of Mediclinic International (JSE-listed). Recruits via its official careers portal — no candidate fees.',
    careersUrl: 'https://www.mediclinic.ae/en/corporate/careers.html',
    verified: true,
    facts: [
      { label: 'Regulator', value: 'DHA / DOH' },
      { label: 'Type', value: 'Private hospitals' },
      { label: 'Experience', value: '2+ yrs typical' },
    ],
  },
  {
    id: 'nmc',
    employer: 'NMC Healthcare',
    logo: '🏨', emirate: 'UAE-wide', type: 'Hospital Group',
    roles: ['Registered Nurse', 'Nursing Assistant', 'Specialist Nurse'],
    about: 'One of the largest private healthcare networks in the UAE, with hospitals and medical centres nationwide.',
    whyLegit: 'Established licensed provider. Official applications via the NMC careers portal.',
    careersUrl: 'https://nmc.ae/careers/',
    verified: true,
    facts: [
      { label: 'Regulator', value: 'DHA / DOH / MOHAP' },
      { label: 'Type', value: 'Hospitals + clinics' },
      { label: 'Network', value: 'UAE-wide' },
    ],
  },
  {
    id: 'aster',
    employer: 'Aster DM Healthcare',
    logo: '💠', emirate: 'UAE-wide', type: 'Hospital Group',
    roles: ['Registered Nurse', 'Nursing Assistant', 'Home Care Nurse'],
    about: 'Operates Aster, Medcare, and Aster Clinics across the UAE, plus Aster Home Health Care.',
    whyLegit: 'Listed healthcare group. Careers managed through the official Aster careers site.',
    careersUrl: 'https://career.asterdmhealthcare.com/',
    verified: true,
    facts: [
      { label: 'Regulator', value: 'DHA / DOH / MOHAP' },
      { label: 'Brands', value: 'Aster, Medcare' },
      { label: 'Home care', value: 'Available' },
    ],
  },
  {
    id: 'burjeel',
    employer: 'Burjeel Holdings (VPS)',
    logo: '🔷', emirate: 'Abu Dhabi / Dubai', type: 'Hospital Group',
    roles: ['Registered Nurse', 'Specialist Nurse', 'Nursing Assistant'],
    about: 'A super-specialty hospital group (Burjeel, Medeor, LLH) across the UAE.',
    whyLegit: 'ADX-listed healthcare provider. Applications via the official Burjeel Holdings careers portal.',
    careersUrl: 'https://burjeelholdings.com/careers/',
    verified: true,
    facts: [
      { label: 'Regulator', value: 'DOH / DHA' },
      { label: 'Type', value: 'Super-specialty' },
      { label: 'Brands', value: 'Burjeel, Medeor' },
    ],
  },
  {
    id: 'ahd',
    employer: 'American Hospital Dubai',
    logo: '🏥', emirate: 'Dubai', type: 'Hospital Group',
    roles: ['Registered Nurse', 'Specialist Nurse'],
    about: 'A private American-standard (JCI-accredited) tertiary hospital in Dubai.',
    whyLegit: 'Long-established licensed hospital. Recruits directly via its official careers page.',
    careersUrl: 'https://www.ahdubai.com/careers',
    verified: true,
    facts: [
      { label: 'Regulator', value: 'DHA' },
      { label: 'Accreditation', value: 'JCI' },
      { label: 'Experience', value: '2+ yrs typical' },
    ],
  },
];

// ── Individual job postings (full detail, newest first) ─────────────────────────

export interface JobPosting {
  id: string;
  title: string;
  employer: string;
  logo: string;
  emirate: string;
  role: JobRole;
  employmentType: string;
  shift?: string;
  postedDate: string;   // ISO date — list is sorted by this, latest first
  salaryRange: string;  // indicative AED/month
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  applyUrl: string;     // official careers portal
  verified: boolean;
  // ── Live-listing extras (from the jobs API) ──
  logoUrl?: string;
  publisher?: string;
  directApply?: boolean;
  institution?: boolean;
  live?: boolean;
}

/**
 * Representative current openings at verified UAE employers. Full live vacancy
 * lists and the actual application form live on each employer's official careers
 * portal (the Apply button). Applying is always free — never pay a placement fee.
 * Sorted newest-first by postedDate in the component.
 */
export const JOB_POSTINGS: JobPosting[] = [
  {
    id: 'p-seha-medsurg',
    title: 'Registered Nurse — Medical / Surgical Ward',
    employer: 'SEHA — Abu Dhabi Health Services', logo: '🏥', emirate: 'Abu Dhabi',
    role: 'Registered Nurse', employmentType: 'Full-time', shift: 'Rotating (day/night)',
    postedDate: '2026-06-04', salaryRange: 'AED 9,000 – 13,000 / month + benefits',
    summary: 'Provide holistic, evidence-based nursing care to adult medical-surgical patients across SEHA hospitals, working within a multidisciplinary team to deliver safe, patient-centred care aligned with DOH standards.',
    responsibilities: [
      'Assess, plan, implement and evaluate individualised patient care plans.',
      'Administer medications and treatments safely per physician orders and policy.',
      'Monitor and document vital signs, intake/output, and clinical changes.',
      'Educate patients and families on care, discharge planning, and self-management.',
      'Maintain infection-control and patient-safety standards at all times.',
    ],
    requirements: [
      'Valid DOH (Abu Dhabi) licence or eligibility (DataFlow + exam passed).',
      'BSc Nursing or 3-year diploma with registration in home country.',
      'Minimum 2 years post-graduation clinical experience.',
      'Valid BLS; ACLS preferred.',
      'Good Standing Certificate and attested credentials.',
    ],
    benefits: ['Tax-free salary', 'Housing & transport allowance', 'Annual flights', 'Medical insurance', 'Paid annual leave'],
    applyUrl: 'https://www.seha.ae/careers/', verified: true,
  },
  {
    id: 'p-ccad-icu',
    title: 'Registered Nurse — Critical Care (ICU)',
    employer: 'Cleveland Clinic Abu Dhabi', logo: '🩺', emirate: 'Abu Dhabi',
    role: 'Specialist Nurse', employmentType: 'Full-time', shift: '12-hour rotating',
    postedDate: '2026-06-03', salaryRange: 'AED 14,000 – 19,000 / month + benefits',
    summary: 'Deliver advanced critical-care nursing to high-acuity patients in a JCI-accredited tertiary ICU, using best-practice protocols and advanced monitoring within a renowned academic medical centre.',
    responsibilities: [
      'Manage critically ill patients including ventilated and post-operative cases.',
      'Operate and interpret haemodynamic and cardiac monitoring equipment.',
      'Titrate vasoactive and sedation infusions per protocol.',
      'Respond to emergencies and participate in code/rapid-response teams.',
      'Document accurately in the electronic health record (EPIC).',
    ],
    requirements: [
      'Valid DOH licence or eligibility.',
      'BSc Nursing required.',
      'Minimum 2–3 years recent ICU/critical-care experience.',
      'Valid BLS and ACLS (PALS an asset).',
      'Strong English communication skills.',
    ],
    benefits: ['Tax-free salary', 'Furnished accommodation or allowance', 'Annual flights', 'Family medical cover', 'Continuing-education support'],
    applyUrl: 'https://www.clevelandclinicabudhabi.ae/en/careers', verified: true,
  },
  {
    id: 'p-nmc-na',
    title: 'Nursing Assistant / Patient Care Assistant',
    employer: 'NMC Healthcare', logo: '🏨', emirate: 'Dubai',
    role: 'Nursing Assistant', employmentType: 'Full-time', shift: 'Rotating',
    postedDate: '2026-06-02', salaryRange: 'AED 3,500 – 5,500 / month + benefits',
    summary: 'Support registered nurses in delivering basic patient care and maintaining a safe, clean, and comfortable environment across NMC hospitals and medical centres.',
    responsibilities: [
      'Assist patients with hygiene, mobility, feeding, and daily activities.',
      'Take and record basic observations (temperature, pulse, BP) as delegated.',
      'Maintain cleanliness and stock of clinical areas and equipment.',
      'Transport patients and samples safely within the facility.',
      'Report changes in patient condition to the registered nurse promptly.',
    ],
    requirements: [
      'Nursing Assistant / PCA certificate or equivalent healthcare qualification.',
      'DHA eligibility/registration as a Nursing Assistant (where applicable).',
      'Prior hospital or care-home experience preferred.',
      'Valid BLS certificate.',
      'Compassionate, team-oriented attitude.',
    ],
    benefits: ['Tax-free salary', 'Shared accommodation or allowance', 'Medical insurance', 'Annual leave & flight', 'Visa sponsorship'],
    applyUrl: 'https://nmc.ae/careers/', verified: true,
  },
  {
    id: 'p-mediclinic-ed',
    title: 'Registered Nurse — Emergency Department',
    employer: 'Mediclinic Middle East', logo: '➕', emirate: 'Dubai',
    role: 'Specialist Nurse', employmentType: 'Full-time', shift: '12-hour rotating',
    postedDate: '2026-05-30', salaryRange: 'AED 11,000 – 16,000 / month + benefits',
    summary: 'Provide rapid, high-quality emergency nursing care across triage, resuscitation, and treatment areas in a busy private ED, prioritising patient safety and timely intervention.',
    responsibilities: [
      'Perform triage and rapid assessment of presenting patients.',
      'Deliver emergency interventions and assist with resuscitation.',
      'Administer medications and manage IV access under pressure.',
      'Coordinate with physicians and specialists for admissions/referrals.',
      'Maintain accurate, timely clinical documentation.',
    ],
    requirements: [
      'Valid DHA licence or eligibility.',
      'BSc Nursing or recognised diploma.',
      'Minimum 2 years emergency / acute-care experience.',
      'Valid BLS and ACLS; PALS/TNCC an advantage.',
      'Ability to work calmly in a fast-paced environment.',
    ],
    benefits: ['Tax-free salary', 'Housing allowance', 'Annual flights', 'Comprehensive medical cover', 'Professional development'],
    applyUrl: 'https://www.mediclinic.ae/en/corporate/careers.html', verified: true,
  },
  {
    id: 'p-dubaihealth-midwife',
    title: 'Midwife / Labour & Delivery Nurse',
    employer: 'Dubai Health (Latifa Hospital)', logo: '🏛️', emirate: 'Dubai',
    role: 'Midwife', employmentType: 'Full-time', shift: 'Rotating',
    postedDate: '2026-05-28', salaryRange: 'AED 10,000 – 15,000 / month + benefits',
    summary: 'Provide expert maternity and newborn care across antenatal, labour, delivery, and postnatal services at a leading government women\'s & children\'s hospital.',
    responsibilities: [
      'Provide care and monitoring throughout labour and delivery.',
      'Conduct fetal heart and maternal monitoring; recognise complications early.',
      'Support normal births and assist with operative deliveries.',
      'Deliver postnatal care and breastfeeding/newborn education.',
      'Maintain accurate maternity records and escalate risks promptly.',
    ],
    requirements: [
      'Valid DHA licence or eligibility as Midwife / RN-Midwife.',
      'BSc Nursing/Midwifery or recognised midwifery qualification.',
      'Minimum 2 years labour-and-delivery experience.',
      'Valid BLS; NRP/fetal-monitoring certification preferred.',
      'Good Standing Certificate.',
    ],
    benefits: ['Tax-free salary', 'Government benefits package', 'Housing & transport', 'Annual flights', 'Medical insurance'],
    applyUrl: 'https://www.dubaihealth.ae/careers', verified: true,
  },
  {
    id: 'p-aster-homecare',
    title: 'Home Care Nurse',
    employer: 'Aster Home Health Care', logo: '💠', emirate: 'Dubai',
    role: 'Home Care Nurse', employmentType: 'Full-time', shift: 'Day shifts / on-call',
    postedDate: '2026-05-26', salaryRange: 'AED 7,000 – 10,000 / month + benefits',
    summary: 'Deliver one-to-one clinical care to patients in their homes — from post-operative and elderly care to chronic-disease management — representing Aster\'s home-health service.',
    responsibilities: [
      'Provide skilled nursing care in the patient\'s home per the care plan.',
      'Administer medications, wound care, and tube/catheter management.',
      'Monitor chronic conditions and educate family caregivers.',
      'Document visits and coordinate with the supervising physician.',
      'Ensure safety, dignity, and infection control in the home setting.',
    ],
    requirements: [
      'Valid DHA licence (Registered Nurse).',
      'BSc Nursing or diploma with registration.',
      'Minimum 2 years clinical experience; home-care exposure preferred.',
      'Valid BLS; UAE driving licence an advantage.',
      'Independent, reliable, and patient-focused.',
    ],
    benefits: ['Tax-free salary', 'Transport/allowance', 'Medical insurance', 'Annual leave & flight', 'Visa sponsorship'],
    applyUrl: 'https://career.asterdmhealthcare.com/', verified: true,
  },
  {
    id: 'p-burjeel-ot',
    title: 'Registered Nurse — Operating Theatre (Scrub/Circulating)',
    employer: 'Burjeel Holdings', logo: '🔷', emirate: 'Abu Dhabi',
    role: 'Specialist Nurse', employmentType: 'Full-time', shift: 'Rotating + on-call',
    postedDate: '2026-05-24', salaryRange: 'AED 11,000 – 16,000 / month + benefits',
    summary: 'Provide perioperative nursing as scrub and circulating nurse across a broad surgical caseload in a super-specialty hospital, ensuring sterile technique and patient safety.',
    responsibilities: [
      'Prepare the operating room, instruments, and sterile field.',
      'Function as scrub and/or circulating nurse during procedures.',
      'Perform surgical counts and maintain asepsis throughout.',
      'Monitor the patient and support the surgical team intra-operatively.',
      'Ensure correct handling of specimens and equipment.',
    ],
    requirements: [
      'Valid DOH licence or eligibility.',
      'BSc Nursing or recognised diploma.',
      'Minimum 2 years operating-theatre experience.',
      'Valid BLS; perioperative certification an asset.',
      'Strong attention to detail and teamwork.',
    ],
    benefits: ['Tax-free salary', 'Housing allowance', 'Annual flights', 'Medical cover', 'Career-growth pathways'],
    applyUrl: 'https://burjeelholdings.com/careers/', verified: true,
  },
  {
    id: 'p-ahd-peds',
    title: 'Registered Nurse — Paediatrics',
    employer: 'American Hospital Dubai', logo: '🏥', emirate: 'Dubai',
    role: 'Registered Nurse', employmentType: 'Full-time', shift: 'Rotating',
    postedDate: '2026-05-22', salaryRange: 'AED 11,000 – 15,000 / month + benefits',
    summary: 'Provide family-centred paediatric nursing care to infants, children, and adolescents in a JCI-accredited private hospital, partnering with families and the care team.',
    responsibilities: [
      'Deliver age-appropriate nursing care and accurate paediatric dosing.',
      'Monitor growth, development, and clinical status of paediatric patients.',
      'Support families with education and emotional reassurance.',
      'Recognise and escalate paediatric deterioration early.',
      'Maintain meticulous documentation and safety checks.',
    ],
    requirements: [
      'Valid DHA licence or eligibility.',
      'BSc Nursing required.',
      'Minimum 2 years paediatric nursing experience.',
      'Valid BLS and PALS.',
      'Excellent communication with children and families.',
    ],
    benefits: ['Tax-free salary', 'Housing allowance', 'Annual flights', 'Family medical insurance', 'Education support'],
    applyUrl: 'https://www.ahdubai.com/careers', verified: true,
  },
  {
    id: 'p-ehs-opd',
    title: 'Staff Nurse — Outpatient Clinics',
    employer: 'Emirates Health Services (EHS)', logo: '🇦🇪', emirate: 'Sharjah',
    role: 'Registered Nurse', employmentType: 'Full-time', shift: 'Day shifts',
    postedDate: '2026-05-20', salaryRange: 'AED 8,500 – 12,000 / month + benefits',
    summary: 'Provide nursing care across busy government outpatient and primary-care clinics in the Northern Emirates, supporting screening, treatment, and health-promotion services.',
    responsibilities: [
      'Assess and triage outpatients; record histories and vitals.',
      'Assist physicians with examinations and minor procedures.',
      'Administer vaccinations, injections, and treatments.',
      'Provide health education and chronic-disease follow-up.',
      'Maintain clinic stock, equipment, and documentation.',
    ],
    requirements: [
      'Valid MOHAP licence or eligibility.',
      'BSc Nursing or recognised diploma with registration.',
      'Minimum 2 years clinical experience.',
      'Valid BLS.',
      'Arabic language an advantage (not essential).',
    ],
    benefits: ['Tax-free salary', 'Government benefits', 'Housing & transport', 'Annual flights', 'Medical insurance'],
    applyUrl: 'https://www.ehs.gov.ae/en/careers', verified: true,
  },
  {
    id: 'p-nmc-dialysis',
    title: 'Dialysis Nurse (Haemodialysis)',
    employer: 'NMC Healthcare', logo: '🏨', emirate: 'Abu Dhabi',
    role: 'Specialist Nurse', employmentType: 'Full-time', shift: 'Rotating',
    postedDate: '2026-05-18', salaryRange: 'AED 10,000 – 14,000 / month + benefits',
    summary: 'Deliver safe, high-quality haemodialysis care to chronic kidney-disease patients, managing the dialysis procedure end-to-end and supporting long-term patient wellbeing.',
    responsibilities: [
      'Set up, prime, and operate haemodialysis machines safely.',
      'Assess vascular access (AV fistula/catheter) and manage complications.',
      'Monitor patients before, during, and after dialysis sessions.',
      'Administer medications such as heparin and erythropoietin per orders.',
      'Educate patients on fluid, diet, and access care.',
    ],
    requirements: [
      'Valid DOH licence or eligibility.',
      'BSc Nursing or diploma with registration.',
      'Minimum 1–2 years dialysis/renal experience.',
      'Valid BLS; dialysis certification preferred.',
      'Strong assessment and monitoring skills.',
    ],
    benefits: ['Tax-free salary', 'Housing allowance', 'Annual flights', 'Medical insurance', 'Visa sponsorship'],
    applyUrl: 'https://nmc.ae/careers/', verified: true,
  },
];

export interface JobBoard {
  id: string;
  name: string;
  note: string;
  searchUrl: string; // pre-filtered to UAE nursing roles
  icon: string;
}

/** Reputable job boards, deep-linked to UAE nursing searches for live listings. */
export const JOB_BOARDS: JobBoard[] = [
  { id: 'bayt',    name: 'Bayt.com',    icon: '🔎', note: 'Leading Middle East job site', searchUrl: 'https://www.bayt.com/en/uae/jobs/nurse-jobs/' },
  { id: 'linkedin',name: 'LinkedIn',    icon: '💼', note: 'Professional network jobs',     searchUrl: 'https://www.linkedin.com/jobs/search/?keywords=nurse&location=United%20Arab%20Emirates' },
  { id: 'indeed',  name: 'Indeed UAE',  icon: '📋', note: 'Global job aggregator',          searchUrl: 'https://ae.indeed.com/jobs?q=nurse&l=United+Arab+Emirates' },
  { id: 'naukri',  name: 'NaukriGulf',  icon: '🌊', note: 'Gulf-focused listings',          searchUrl: 'https://www.naukrigulf.com/nursing-jobs-in-uae' },
  { id: 'gulftalent', name: 'GulfTalent', icon: '⭐', note: 'Gulf professional jobs',        searchUrl: 'https://www.gulftalent.com/uae/jobs/title/nurse' },
];

// LinkedIn live searches — authentic recruiters, hospitals & clinics post here.
// Each opens LinkedIn's live job results filtered for UAE nursing roles.
export const LINKEDIN_SEARCHES: { id: string; label: string; note: string; url: string }[] = [
  { id: 'li-rn',  label: 'Registered Nurse — UAE', note: 'Hospitals & clinics hiring RNs', url: 'https://www.linkedin.com/jobs/search/?keywords=registered%20nurse&location=United%20Arab%20Emirates&f_TPR=r604800' },
  { id: 'li-na',  label: 'Nursing Assistant — UAE', note: 'PCA / nursing assistant roles',  url: 'https://www.linkedin.com/jobs/search/?keywords=nursing%20assistant&location=United%20Arab%20Emirates&f_TPR=r604800' },
  { id: 'li-staff', label: 'Staff / Specialist Nurse — UAE', note: 'ICU, ED, OT, theatre, etc.', url: 'https://www.linkedin.com/jobs/search/?keywords=staff%20nurse&location=United%20Arab%20Emirates&f_TPR=r604800' },
  { id: 'li-dubai', label: 'Nurse jobs in Dubai', note: 'All nursing roles in Dubai',       url: 'https://www.linkedin.com/jobs/search/?keywords=nurse&location=Dubai%2C%20United%20Arab%20Emirates&f_TPR=r604800' },
  { id: 'li-auh', label: 'Nurse jobs in Abu Dhabi', note: 'All nursing roles in Abu Dhabi', url: 'https://www.linkedin.com/jobs/search/?keywords=nurse&location=Abu%20Dhabi%2C%20United%20Arab%20Emirates&f_TPR=r604800' },
  { id: 'li-recruit', label: 'Healthcare recruiters — UAE', note: 'Verified agency recruiters', url: 'https://www.linkedin.com/search/results/people/?keywords=nurse%20recruiter%20UAE' },
];

// ── Nursing Workshops, Seminars & Conferences (curated, authentic organisers) ───

export type WorkshopCountry = 'UAE' | 'USA' | 'Canada' | 'UK' | 'Australia';

export interface Workshop {
  id: string;
  title: string;
  organizer: string;
  country: WorkshopCountry;
  flag: string;
  city: string;
  format: 'In-person' | 'Virtual' | 'Hybrid';
  dateLabel: string;   // e.g. "Annual · Jan" — confirm exact dates on the site
  topic: string;
  cpd: string;         // CPD / CE credit note
  cost: string;
  summary: string;
  highlights: string[];
  url: string;         // official event/registration page
}

export const WORKSHOPS: Workshop[] = [
  // ── UAE ──
  {
    id: 'w-arabhealth', title: 'Arab Health Congress', organizer: 'Informa Markets',
    country: 'UAE', flag: '🇦🇪', city: 'Dubai', format: 'In-person', dateLabel: 'Annual · January',
    topic: 'Multi-specialty CME/CPD + nursing track', cpd: 'CPD-accredited (DHA/DOH)', cost: 'Free expo; paid conference tracks',
    summary: 'The largest healthcare exhibition and congress in the Middle East, with dedicated nursing and CPD-accredited sessions across specialties.',
    highlights: ['Nursing & midwifery conference track', 'Hands-on clinical workshops', 'DHA/DOH CPD points', 'Global networking & exhibitors'],
    url: 'https://www.arabhealthonline.com/',
  },
  {
    id: 'w-eccc', title: 'Emirates Critical Care Conference (ECCC)', organizer: 'ECCC',
    country: 'UAE', flag: '🇦🇪', city: 'Dubai', format: 'In-person', dateLabel: 'Annual · April',
    topic: 'Critical care & emergency nursing', cpd: 'CPD-accredited', cost: 'Paid registration (nurse rates available)',
    summary: 'A leading regional conference for critical-care physicians and nurses, featuring ICU, ED, and acute-care workshops.',
    highlights: ['ICU & emergency nursing streams', 'Simulation workshops', 'Regional & international faculty'],
    url: 'https://www.eccc-dubai.com/',
  },
  {
    id: 'w-ghw', title: 'Abu Dhabi Global Healthcare Week', organizer: 'Abu Dhabi DoH / Informa',
    country: 'UAE', flag: '🇦🇪', city: 'Abu Dhabi', format: 'Hybrid', dateLabel: 'Annual · May',
    topic: 'Health system, innovation & workforce', cpd: 'CPD sessions available', cost: 'Free & paid passes',
    summary: 'A major Abu Dhabi gathering on healthcare innovation and workforce development, including nursing leadership sessions.',
    highlights: ['Nursing leadership & workforce talks', 'Digital health & innovation', 'Policy and CPD content'],
    url: 'https://www.globalhealthcareweek.com/',
  },
  // ── USA ──
  {
    id: 'w-nti', title: 'AACN National Teaching Institute (NTI)', organizer: 'Amer. Assoc. of Critical-Care Nurses',
    country: 'USA', flag: '🇺🇸', city: 'Rotating cities', format: 'Hybrid', dateLabel: 'Annual · May',
    topic: 'Critical & acute care nursing', cpd: 'CE/CNE contact hours', cost: 'Member & non-member rates',
    summary: 'One of the largest critical-care nursing conferences in the world, with hundreds of CE sessions and skills labs.',
    highlights: ['500+ CE sessions', 'Hands-on skills stations', 'Certification review courses'],
    url: 'https://www.aacn.org/nti',
  },
  {
    id: 'w-sigma', title: 'Sigma Nursing Conferences & Conventions', organizer: 'Sigma Theta Tau International',
    country: 'USA', flag: '🇺🇸', city: 'Various / Virtual', format: 'Hybrid', dateLabel: 'Multiple per year',
    topic: 'Research, leadership & EBP', cpd: 'CNE contact hours', cost: 'Member & non-member rates',
    summary: 'Global nursing honor society events focused on evidence-based practice, research, and leadership development.',
    highlights: ['Research & EBP sessions', 'Leadership academies', 'Global nursing network'],
    url: 'https://www.sigmanursing.org/connect-engage/meetings-events',
  },
  {
    id: 'w-ana', title: 'ANA Events & Nursing Conferences', organizer: 'American Nurses Association',
    country: 'USA', flag: '🇺🇸', city: 'Various / Virtual', format: 'Hybrid', dateLabel: 'Year-round',
    topic: 'Practice, policy & professional development', cpd: 'CNE contact hours', cost: 'Member & non-member rates',
    summary: 'A calendar of webinars, conferences, and CE events from the leading US nursing body.',
    highlights: ['Live & on-demand CE', 'Policy & advocacy', 'Specialty webinars'],
    url: 'https://www.nursingworld.org/education-events/',
  },
  // ── UK ──
  {
    id: 'w-rcn', title: 'RCN Congress & Events', organizer: 'Royal College of Nursing',
    country: 'UK', flag: '🇬🇧', city: 'Various / Online', format: 'Hybrid', dateLabel: 'Annual · May + year-round',
    topic: 'Practice, policy & professional issues', cpd: 'CPD-recognised', cost: 'Free & paid (member discounts)',
    summary: 'The UK\'s foremost nursing congress plus a programme of CPD events, webinars, and clinical updates.',
    highlights: ['Congress debates & policy', 'Clinical CPD webinars', 'Career & revalidation support'],
    url: 'https://www.rcn.org.uk/news-and-events/events',
  },
  {
    id: 'w-nt', title: 'Nursing Times Events & Summits', organizer: 'Nursing Times',
    country: 'UK', flag: '🇬🇧', city: 'UK / Online', format: 'Hybrid', dateLabel: 'Year-round',
    topic: 'Clinical updates & workforce', cpd: 'CPD-aligned', cost: 'Free & paid',
    summary: 'Summits, awards, and CPD webinars covering clinical practice, leadership, and workforce wellbeing.',
    highlights: ['Clinical CPD webinars', 'Leadership summits', 'Nursing Times Awards'],
    url: 'https://www.nursingtimes.net/events/',
  },
  // ── Canada ──
  {
    id: 'w-cna', title: 'Canadian Nurses Association Events', organizer: 'Canadian Nurses Association (CNA)',
    country: 'Canada', flag: '🇨🇦', city: 'Various / Virtual', format: 'Hybrid', dateLabel: 'Year-round',
    topic: 'Practice, policy & certification', cpd: 'CNA-recognised learning', cost: 'Member & non-member rates',
    summary: 'National nursing association events, webinars, and certification programmes for Canadian and internationally educated nurses.',
    highlights: ['Certification prep', 'Policy & practice webinars', 'NurseONE resources'],
    url: 'https://www.cna-aiic.ca/en/professional-development',
  },
  // ── Australia ──
  {
    id: 'w-acn', title: 'ACN National Nursing Forum & CPD', organizer: 'Australian College of Nursing',
    country: 'Australia', flag: '🇦🇺', city: 'Various / Online', format: 'Hybrid', dateLabel: 'Annual · Aug + year-round',
    topic: 'Leadership, practice & specialty CPD', cpd: 'CPD hours (AHPRA-aligned)', cost: 'Member & non-member rates',
    summary: 'The flagship Australian nursing forum plus an extensive CPD library aligned with AHPRA registration requirements.',
    highlights: ['National Nursing Forum', 'Specialty CPD courses', 'Leadership programmes'],
    url: 'https://www.acn.edu.au/events',
  },
  {
    id: 'w-crana', title: 'CRANAplus Conference (Remote & Rural)', organizer: 'CRANAplus',
    country: 'Australia', flag: '🇦🇺', city: 'Rotating', format: 'In-person', dateLabel: 'Annual · September',
    topic: 'Remote & rural health nursing', cpd: 'CPD hours', cost: 'Member & non-member rates',
    summary: 'Australia\'s peak body for remote and rural health, with hands-on workshops for nurses working in isolated settings.',
    highlights: ['Remote emergency care workshops', 'Rural & Indigenous health', 'Networking for bush nurses'],
    url: 'https://crana.org.au/education/conference',
  },
];

// ── Nursing Scholarships, Grants & Bursaries (curated, authentic providers) ─────

export type ScholarshipRegion = 'International' | 'USA' | 'UK' | 'Canada' | 'Australia' | 'UAE';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  region: ScholarshipRegion;
  flag: string;
  type: 'Scholarship' | 'Grant' | 'Bursary' | 'Fellowship' | 'Award';
  amount: string;
  level: string;          // e.g. 'BSN / Undergraduate', 'Graduate', 'All levels'
  deadlineLabel: string;  // e.g. 'Annual · varies'
  summary: string;
  eligibility: string[];
  url: string;            // official apply/info page
}

export const SCHOLARSHIPS: Scholarship[] = [
  // ── International ──
  {
    id: 's-sigma', name: 'Sigma Global Nursing Research Grants', provider: 'Sigma Theta Tau International',
    region: 'International', flag: '🌍', type: 'Grant', amount: 'Up to US$5,000+', level: 'Graduate / researchers',
    deadlineLabel: 'Annual cycles', summary: 'Research grants supporting nurses conducting evidence-based and clinical research worldwide.',
    eligibility: ['Registered nurse conducting research', 'Sigma membership for some grants', 'Defined research proposal'],
    url: 'https://www.sigmanursing.org/advance-elevate/research/research-grants',
  },
  {
    id: 's-jnj', name: 'Johnson & Johnson Nursing Scholarships Hub', provider: 'Johnson & Johnson (Discover Nursing)',
    region: 'International', flag: '🌍', type: 'Scholarship', amount: 'Varies (directory)', level: 'All levels',
    deadlineLabel: 'Varies by award', summary: 'A searchable directory of hundreds of nursing scholarships and funding opportunities curated by J&J.',
    eligibility: ['Nursing students & RNs', 'Criteria vary by listed award'],
    url: 'https://nursing.jnj.com/specialties-and-pathways/scholarships',
  },
  // ── USA ──
  {
    id: 's-anf', name: 'American Nurses Foundation Scholarships', provider: 'American Nurses Foundation',
    region: 'USA', flag: '🇺🇸', type: 'Scholarship', amount: 'Varies', level: 'All levels',
    deadlineLabel: 'Annual · varies', summary: 'Scholarships and grants supporting nursing education, research, and professional advancement in the US.',
    eligibility: ['US nursing students / RNs', 'Academic & financial-need criteria'],
    url: 'https://www.nursingworld.org/foundation/',
  },
  {
    id: 's-nhsc', name: 'NHSC Scholarship Program', provider: 'Health Resources & Services Admin (HRSA)',
    region: 'USA', flag: '🇺🇸', type: 'Scholarship', amount: 'Full tuition + stipend', level: 'Undergraduate / Graduate',
    deadlineLabel: 'Annual · Spring', summary: 'Pays tuition and fees in exchange for service in a high-need US community after graduation.',
    eligibility: ['US citizen', 'Eligible nursing/health program', 'Commit to service obligation'],
    url: 'https://nhsc.hrsa.gov/scholarships',
  },
  {
    id: 's-fnsna', name: 'FNSNA Scholarships', provider: 'Foundation of the National Student Nurses\' Association',
    region: 'USA', flag: '🇺🇸', type: 'Scholarship', amount: 'US$1,000 – $7,500', level: 'Nursing students',
    deadlineLabel: 'Annual · January', summary: 'General and specialty scholarships for enrolled nursing students across the US.',
    eligibility: ['Enrolled in a US nursing program', 'Academic merit & involvement'],
    url: 'https://www.nsna.org/foundation.html',
  },
  {
    id: 's-tylenol', name: 'Tylenol Future Care Scholarship', provider: 'Tylenol (Kenvue)',
    region: 'USA', flag: '🇺🇸', type: 'Scholarship', amount: 'Up to US$10,000', level: 'Undergraduate / Graduate',
    deadlineLabel: 'Annual · Summer', summary: 'Long-running scholarship for students pursuing nursing and other healthcare degrees.',
    eligibility: ['Pursuing healthcare/nursing degree', 'US-based study', 'Essay & academic record'],
    url: 'https://www.tylenol.com/news/scholarship',
  },
  // ── UK ──
  {
    id: 's-rcnf', name: 'RCN Foundation Grants & Bursaries', provider: 'RCN Foundation',
    region: 'UK', flag: '🇬🇧', type: 'Bursary', amount: 'Varies', level: 'Nurses & students',
    deadlineLabel: 'Open cycles', summary: 'Education bursaries and hardship grants for nurses, midwives, and healthcare support workers in the UK.',
    eligibility: ['UK-based nurses/midwives/HCSWs', 'Education or hardship criteria'],
    url: 'https://www.rcnfoundation.rcn.org.uk/',
  },
  {
    id: 's-fnf', name: 'Florence Nightingale Foundation Scholarships', provider: 'Florence Nightingale Foundation',
    region: 'UK', flag: '🇬🇧', type: 'Scholarship', amount: 'Varies', level: 'Registered nurses/midwives',
    deadlineLabel: 'Annual · varies', summary: 'Leadership, research, and travel scholarships to develop nurse and midwife leaders.',
    eligibility: ['Registered nurse/midwife', 'Leadership/research development focus'],
    url: 'https://florence-nightingale-foundation.org.uk/our-work/scholars-academy/',
  },
  // ── Canada ──
  {
    id: 's-cnf', name: 'Canadian Nurses Foundation Awards', provider: 'Canadian Nurses Foundation',
    region: 'Canada', flag: '🇨🇦', type: 'Award', amount: 'CA$1,000 – $10,000+', level: 'Students & RNs',
    deadlineLabel: 'Annual · Spring', summary: 'Scholarships and research awards for Canadian nursing students and registered nurses pursuing further study.',
    eligibility: ['Canadian nursing student or RN', 'Academic merit & goals'],
    url: 'https://cnf-fiic.ca/scholarships-awards/',
  },
  // ── Australia ──
  {
    id: 's-acn', name: 'ACN Scholarships', provider: 'Australian College of Nursing',
    region: 'Australia', flag: '🇦🇺', type: 'Scholarship', amount: 'Varies (incl. gov-funded)', level: 'All levels',
    deadlineLabel: 'Multiple rounds', summary: 'A range of scholarships, including Australian Government–funded places, for CPD, postgraduate study, and specialty training.',
    eligibility: ['Australian nurses/students', 'Program-specific criteria'],
    url: 'https://www.acn.edu.au/scholarships',
  },
  // ── UAE / Region ──
  {
    id: 's-hamdan', name: 'Hamdan Bin Rashid Al Maktoum Awards', provider: 'Hamdan Medical Award (Dubai)',
    region: 'UAE', flag: '🇦🇪', type: 'Grant', amount: 'Varies (research & training)', level: 'Health professionals',
    deadlineLabel: 'Biennial cycles', summary: 'Regional medical awards and research/training grants recognising excellence in healthcare, including nursing.',
    eligibility: ['Health professionals / researchers', 'Award-specific criteria'],
    url: 'https://www.hmaward.org.ae/',
  },
  {
    id: 's-who-emro', name: 'WHO EMRO Fellowships', provider: 'World Health Organization — Eastern Mediterranean',
    region: 'UAE', flag: '🌍', type: 'Fellowship', amount: 'Funded training', level: 'Health workforce',
    deadlineLabel: 'Via national health authority', summary: 'WHO fellowships and training opportunities for health workforce capacity-building across the region (applied through your Ministry of Health).',
    eligibility: ['Nominated via national health authority', 'Public-health/clinical focus'],
    url: 'https://www.emro.who.int/health-workforce/fellowships/',
  },
];

// ── Forum / Mentorship resources (real, working external links) ─────────────────

export interface ForumResource {
  id: string;
  name: string;
  note: string;
  url: string;
  icon: string;
}

export const FORUM_RESOURCES: ForumResource[] = [
  { id: 'dataflow', name: 'DataFlow Group (PSV)',       note: 'Primary source verification of your credentials', url: 'https://www.dataflowgroup.com/',  icon: '🔎' },
  { id: 'sheryan',  name: 'DHA Sheryan',                note: 'Dubai professional licensing portal',            url: 'https://services.dha.gov.ae/sheryan/', icon: '🏙️' },
  { id: 'prometric',name: 'Prometric',                  note: 'Book your DHA / MOHAP licensing exam',            url: 'https://www.prometric.com/',         icon: '🖥️' },
  { id: 'pearson',  name: 'Pearson VUE',                note: 'Book the DOH Abu Dhabi exam',                    url: 'https://home.pearsonvue.com/',       icon: '🖥️' },
  { id: 'icn',      name: 'Intl. Council of Nurses',    note: 'Global nursing body & resources',                url: 'https://www.icn.ch/',                icon: '🌐' },
  { id: 'sigma',    name: 'Sigma Nursing',              note: 'Mentorship, research & global community',        url: 'https://www.sigmanursing.org/',      icon: '⭐' },
  { id: 'who',      name: 'WHO — Nursing & Midwifery',  note: 'Global standards & workforce guidance',          url: 'https://www.who.int/health-topics/nursing', icon: '🏥' },
];

// Academy mentors / admins — real contact points for 1-on-1 mentorship.
export const ACADEMY_MENTORS: { name: string; role: string; email: string }[] = [
  { name: 'Academy Lead Mentor', role: 'Licensing & DataFlow guidance', email: 'loveline082022@gmail.com' },
  { name: 'Academy Coordinator', role: 'Study planning & exam prep',    email: 'uncledez8@gmail.com' },
];

// ── UAE Health Authority reference data (for in-app info panels) ────────────────

export interface AuthorityInfo {
  id: string;
  code: string;
  name: string;
  emirate: string;
  flag: string;
  color: 'blue' | 'emerald' | 'violet';
  overview: string;
  passMark: string;
  examProvider: string;
  licensingPortal: { label: string; url: string };
  officialSite: { label: string; url: string };
  steps: string[];
  facts: { label: string; value: string }[];
}

export const UAE_AUTHORITIES: AuthorityInfo[] = [
  {
    id: 'dha',
    code: 'DHA',
    name: 'Dubai Health Authority',
    emirate: 'Dubai',
    flag: '🏙️',
    color: 'blue',
    overview:
      'The Dubai Health Authority regulates all healthcare professionals and facilities in the Emirate of Dubai. Nurses must register through the DHA Sheryan platform and pass the DHA licensing assessment before practising in Dubai (outside free zones such as DHCC).',
    passMark: 'Typically 60% to pass the DHA computer-based assessment (Prometric-delivered).',
    examProvider: 'Prometric (computer-based MCQ)',
    licensingPortal: { label: 'DHA Sheryan Licensing Portal', url: 'https://services.dha.gov.ae/sheryan' },
    officialSite: { label: 'dha.gov.ae', url: 'https://www.dha.gov.ae' },
    steps: [
      'Create a Sheryan unique ID account on the DHA portal.',
      'Complete DataFlow primary source verification (PSV) of your credentials.',
      'Submit qualifications + Good Standing Certificate for evaluation.',
      'Receive eligibility, then book the DHA exam via Prometric.',
      'Pass the assessment, then apply for the professional licence.'
    ],
    facts: [
      { label: 'Region', value: 'Dubai' },
      { label: 'Min. Experience', value: '2 years post-graduation (RN)' },
      { label: 'Qualification', value: 'Bachelor / 3-yr Diploma in Nursing' },
      { label: 'PSV', value: 'DataFlow required' }
    ]
  },
  {
    id: 'mohap',
    code: 'MOHAP',
    name: 'Ministry of Health & Prevention',
    emirate: 'Northern Emirates',
    flag: '🇦🇪',
    color: 'emerald',
    overview:
      'MOHAP licenses healthcare professionals practising in the Northern Emirates (Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah). Registration is handled through the MOHAP unified electronic licensing system, with an MCQ assessment for most nursing cadres.',
    passMark: 'Typically 60% pass threshold on the MOHAP assessment (Prometric-delivered).',
    examProvider: 'Prometric (computer-based MCQ)',
    licensingPortal: { label: 'MOHAP e-Licensing Services', url: 'https://mohap.gov.ae/en/services/practice-license-for-health-professionals' },
    officialSite: { label: 'mohap.gov.ae', url: 'https://mohap.gov.ae' },
    steps: [
      'Register on the MOHAP smart services portal.',
      'Complete DataFlow primary source verification.',
      'Submit your degree, transcripts, and Good Standing Certificate.',
      'Obtain eligibility and schedule the Prometric exam.',
      'Pass and complete the licensing/evaluation payment.'
    ],
    facts: [
      { label: 'Region', value: 'Northern Emirates' },
      { label: 'Min. Experience', value: '2 years (varies by cadre)' },
      { label: 'Qualification', value: 'Recognised Nursing degree/diploma' },
      { label: 'PSV', value: 'DataFlow required' }
    ]
  },
  {
    id: 'doh',
    code: 'DOH / HAAD',
    name: 'Department of Health – Abu Dhabi',
    emirate: 'Abu Dhabi',
    flag: '🏛️',
    color: 'violet',
    overview:
      'The Department of Health Abu Dhabi (formerly HAAD) regulates the healthcare sector in the Emirate of Abu Dhabi. Professionals register through the DOH/Tamm platform and sit the Pearson VUE-delivered DOH examination before licensing.',
    passMark: 'Typically 60% pass mark on the DOH examination (Pearson VUE-delivered).',
    examProvider: 'Pearson VUE (computer-based MCQ)',
    licensingPortal: { label: 'DOH Health Professional Licensing', url: 'https://www.doh.gov.ae/en/license' },
    officialSite: { label: 'doh.gov.ae', url: 'https://www.doh.gov.ae' },
    steps: [
      'Create a DOH account and start the licensing application.',
      'Complete DataFlow primary source verification.',
      'Upload qualifications, experience certificates, and Good Standing.',
      'Receive exam eligibility and book via Pearson VUE.',
      'Pass the DOH exam, then finalise the professional licence.'
    ],
    facts: [
      { label: 'Region', value: 'Abu Dhabi' },
      { label: 'Min. Experience', value: '2 years post-graduation' },
      { label: 'Qualification', value: 'Bachelor / accredited Diploma' },
      { label: 'Exam Vendor', value: 'Pearson VUE' }
    ]
  }
];

export const STUDY_TOPICS: StudyTopic[] = [
  {
    "id": "ethics-law",
    "title": "UAE Nursing Code of Ethics & Licensing Regulations",
    "subtitle": "Professional standards, scope of practice, consent, confidentiality and patient rights under DHA, MOHAP and DOH/HAAD",
    "category": "Ethics & Regulations",
    "readingTime": "30 min read",
    "examWeight": "~10-15% of the licensing exam",
    "objectives": [
      "Describe the legal framework and scope of nursing practice in the UAE.",
      "Apply the principles of informed consent, autonomy and patient rights.",
      "Differentiate confidentiality duties from mandatory reporting obligations.",
      "Apply ethical principles and the Five Rights of delegation.",
      "Identify the nurse's role in advocacy, documentation and professional accountability."
    ],
    "sections": [
      {
        "title": "Legal Framework & Scope of Practice",
        "content": "Nursing in the UAE is regulated under Federal Decree-Law No. (4) of 2016 on Medical Liability together with the standards of the relevant health authority - DHA (Dubai), MOHAP (Northern Emirates) and DOH/HAAD (Abu Dhabi). The nursing process (ADPIE - Assessment, Diagnosis, Planning, Implementation, Evaluation) is the professional and legal backbone of safe care.",
        "bullets": [
          "Active licensure: every clinician must hold a current licence from their regulating authority and practise only within its defined scope.",
          "Standard of care: the nurse is accountable for the care a reasonably prudent nurse would deliver in the same situation.",
          "Cultural and religious respect: care must uphold dignity and Islamic values, including same-gender care and chaperoning when requested.",
          "Accurate, timely, objective documentation is a legal requirement and the nurse's strongest protection."
        ]
      },
      {
        "title": "Ethical Principles",
        "content": "Six core principles guide ethical nursing decisions. Exam questions often test the principle being demonstrated or violated.",
        "bullets": [
          "Autonomy: the patient's right to make their own informed decisions.",
          "Beneficence: acting in the patient's best interest (doing good).",
          "Non-maleficence: 'do no harm'.",
          "Justice: fair, equal treatment and resource allocation.",
          "Veracity: truthfulness. Fidelity: keeping commitments and confidentiality."
        ]
      },
      {
        "title": "Informed Consent & Patient Rights",
        "content": "Informed consent must precede invasive or high-risk procedures. The patient must be competent, adequately informed of risks/benefits/alternatives, and decide voluntarily. The treating physician explains the procedure; the nurse commonly witnesses consent and confirms understanding.",
        "bullets": [
          "Valid consent = competent patient + adequate disclosure + voluntary decision.",
          "Emergency: implied consent applies when delay threatens life and the patient cannot consent.",
          "Minors / incompetent adults: a legal guardian consents.",
          "A competent patient may refuse any treatment; the nurse documents the refusal and notifies the physician."
        ]
      },
      {
        "title": "Confidentiality & Mandatory Reporting",
        "content": "Disclosure of patient information without authorization is prohibited under UAE law. The principal exception is mandatory public-health reporting of notifiable communicable diseases.",
        "bullets": [
          "Confidentiality protects records across electronic and paper systems.",
          "Notifiable diseases (e.g., TB, measles, meningococcal meningitis) must be reported to preventive medicine, usually within 24 hours.",
          "Sentinel events (medication error with harm, wrong-site surgery) are reported to the quality/risk department.",
          "Suspected abuse must be reported per local child/vulnerable-adult protection policy."
        ]
      },
      {
        "title": "Delegation & the Five Rights",
        "content": "The registered nurse remains accountable for delegated care. Delegation follows the Five Rights and is limited to tasks within the assistant's competence.",
        "bullets": [
          "Five Rights: right task, right circumstance, right person, right direction/communication, right supervision.",
          "Delegate routine, stable, predictable tasks (hygiene, ambulation, basic vitals, intake/output).",
          "Never delegate assessment, clinical judgement, teaching, evaluation, or medication administration to unlicensed personnel.",
          "Accountability for the outcome cannot be transferred."
        ]
      },
      {
        "title": "Advocacy, Negligence & Professional Accountability",
        "content": "The nurse is the patient's advocate and is professionally and legally accountable. Negligence requires duty, breach, harm and causation.",
        "bullets": [
          "Advocacy: protect patient safety, question unsafe orders, escalate concerns through the chain of command.",
          "Negligence (malpractice) elements: duty owed, breach of standard, injury, and causation linking the two.",
          "Incident/occurrence reports document events for quality improvement and are not placed in the patient chart.",
          "Continuing professional development (CPD/CME) is required to maintain licensure."
        ]
      }
    ],
    "flashcards": [
      {
        "question": "Which law currently governs medical liability and professional conduct in the UAE?",
        "answer": "Federal Decree-Law No. (4) of 2016 on Medical Liability, enforced with DHA, MOHAP and DOH standards."
      },
      {
        "question": "Define autonomy.",
        "answer": "The patient's right to make their own informed decisions about their care."
      },
      {
        "question": "Define beneficence.",
        "answer": "Acting in the patient's best interest - doing good."
      },
      {
        "question": "Define non-maleficence.",
        "answer": "The duty to 'do no harm'."
      },
      {
        "question": "Define justice in healthcare ethics.",
        "answer": "Fair and equal treatment and allocation of resources."
      },
      {
        "question": "Define veracity.",
        "answer": "The duty to be truthful with patients."
      },
      {
        "question": "Define fidelity.",
        "answer": "Keeping commitments and maintaining confidentiality and trust."
      },
      {
        "question": "Three elements of valid informed consent?",
        "answer": "Competent patient, adequate disclosure of risks/benefits/alternatives, and a voluntary decision."
      },
      {
        "question": "Who is responsible for explaining a procedure for informed consent?",
        "answer": "The treating physician performing it; the nurse may witness consent and confirm understanding."
      },
      {
        "question": "When does implied consent apply?",
        "answer": "In emergencies when delay would threaten life and the patient cannot give consent."
      },
      {
        "question": "Who consents for a minor or an incompetent adult?",
        "answer": "A legal guardian or designated decision-maker."
      },
      {
        "question": "Can a competent adult refuse life-saving treatment?",
        "answer": "Yes; the nurse respects autonomy, documents the informed refusal, and notifies the physician."
      },
      {
        "question": "Main exception to patient confidentiality?",
        "answer": "Mandatory reporting of notifiable communicable diseases to public-health authorities."
      },
      {
        "question": "Within what timeframe are most notifiable diseases reported?",
        "answer": "Typically within 24 hours to the preventive medicine department."
      },
      {
        "question": "List the Five Rights of delegation.",
        "answer": "Right task, right circumstance, right person, right direction/communication, right supervision."
      },
      {
        "question": "Name three tasks that may be delegated to a UAP.",
        "answer": "Routine ambulation, hygiene/ADLs, and basic vital signs on a stable patient."
      },
      {
        "question": "Name tasks that may NOT be delegated to unlicensed personnel.",
        "answer": "Assessment, nursing diagnosis, clinical judgement, patient teaching, evaluation, and medication administration."
      },
      {
        "question": "Can a nurse transfer accountability for a delegated task?",
        "answer": "No; the RN remains accountable for the outcome of delegated care."
      },
      {
        "question": "Four elements required to prove negligence/malpractice?",
        "answer": "Duty, breach of the standard of care, injury/harm, and causation."
      },
      {
        "question": "Where is an incident (occurrence) report filed?",
        "answer": "In the facility's risk-management system - NOT in the patient's medical record."
      },
      {
        "question": "What is the nurse's role as a patient advocate?",
        "answer": "To protect patient safety and rights, question unsafe orders, and escalate concerns."
      },
      {
        "question": "What should a nurse do with an unclear or unsafe order?",
        "answer": "Clarify with the prescriber and, if still unsafe, escalate through the chain of command and document."
      },
      {
        "question": "What is required to maintain UAE nursing licensure?",
        "answer": "Active registration with the authority and ongoing continuing professional development (CPD/CME)."
      },
      {
        "question": "Which ethical principle is violated by disclosing patient information without consent?",
        "answer": "Confidentiality/fidelity (and the legal duty of privacy)."
      },
      {
        "question": "What is the priority when an ethical dilemma arises?",
        "answer": "Patient safety and rights; involve the team/ethics committee and follow policy."
      }
    ],
    "quiz": [
      {
        "question": "A competent adult refuses a blood transfusion for religious reasons. The nurse should:",
        "options": [
          "Administer it because it is life-saving",
          "Respect the refusal, document it, and notify the physician",
          "Ask the family to consent instead",
          "Wait until the patient is unconscious"
        ],
        "correctIndex": 1,
        "rationale": "A competent adult has the right to refuse treatment (autonomy). The nurse documents the informed refusal and notifies the physician."
      },
      {
        "question": "Which task is appropriate to delegate to a UAP?",
        "options": [
          "Assessing a new admission",
          "Administering oral medication",
          "Assisting a stable patient to ambulate",
          "Teaching wound care"
        ],
        "correctIndex": 2,
        "rationale": "Routine ambulation of a stable patient is delegable. Assessment, medication, and teaching require the licensed nurse."
      },
      {
        "question": "A confirmed case of pulmonary TB requires the nurse to:",
        "options": [
          "Keep it confidential",
          "Report it to preventive medicine",
          "Tell only the family",
          "Wait until discharge"
        ],
        "correctIndex": 1,
        "rationale": "Notifiable communicable diseases such as TB must be reported to public health - an exception to confidentiality."
      },
      {
        "question": "Informed consent is valid only if the patient is:",
        "options": [
          "Related to staff",
          "Competent, informed, and voluntary",
          "Over 40 years old",
          "Accompanied by family"
        ],
        "correctIndex": 1,
        "rationale": "Valid consent requires a competent, adequately informed patient deciding voluntarily."
      },
      {
        "question": "The nurse believes an order is unsafe. The best action is to:",
        "options": [
          "Carry it out anyway",
          "Ignore it silently",
          "Question and clarify it, escalating if needed",
          "Have a UAP do it"
        ],
        "correctIndex": 2,
        "rationale": "As advocate, the nurse clarifies and questions unsafe orders and escalates through the chain of command."
      },
      {
        "question": "Which principle means 'do no harm'?",
        "options": [
          "Beneficence",
          "Autonomy",
          "Non-maleficence",
          "Justice"
        ],
        "correctIndex": 2,
        "rationale": "Non-maleficence is the duty to avoid causing harm."
      },
      {
        "question": "A nurse gives a medication to the wrong patient but no harm occurs. The nurse should:",
        "options": [
          "Say nothing",
          "Complete an incident report and monitor the patient",
          "Document it in another patient's chart",
          "Blame the pharmacy"
        ],
        "correctIndex": 1,
        "rationale": "Errors are reported via an incident report and the patient is monitored, regardless of harm."
      },
      {
        "question": "Acting in the patient's best interest describes:",
        "options": [
          "Beneficence",
          "Veracity",
          "Fidelity",
          "Justice"
        ],
        "correctIndex": 0,
        "rationale": "Beneficence is acting to benefit the patient."
      },
      {
        "question": "A 15-year-old needs surgery. Consent is obtained from:",
        "options": [
          "The minor alone",
          "A friend",
          "The parent/legal guardian",
          "The nurse"
        ],
        "correctIndex": 2,
        "rationale": "Minors require consent from a parent or legal guardian (except where emancipated/emergency)."
      },
      {
        "question": "Which is the BEST example of patient advocacy?",
        "options": [
          "Following all orders without question",
          "Speaking up about an unsafe staffing or order",
          "Avoiding conflict with physicians",
          "Documenting after the shift"
        ],
        "correctIndex": 1,
        "rationale": "Advocacy means protecting patient safety, including raising concerns about unsafe care."
      },
      {
        "question": "An unconscious trauma patient needs emergency surgery and has no guardian present. The basis to proceed is:",
        "options": [
          "Expressed consent",
          "Implied (emergency) consent",
          "Written consent",
          "No consent needed ever"
        ],
        "correctIndex": 1,
        "rationale": "In a life-threatening emergency with no one to consent, implied consent applies."
      },
      {
        "question": "Which statement about documentation is correct?",
        "options": [
          "Document interventions before doing them",
          "Use opinions and labels",
          "Record objective, timely, factual entries",
          "Leave blank lines for later"
        ],
        "correctIndex": 2,
        "rationale": "Documentation must be objective, factual, timely, and contemporaneous."
      },
      {
        "question": "Telling a patient the truth about their diagnosis reflects:",
        "options": [
          "Veracity",
          "Justice",
          "Non-maleficence",
          "Fidelity"
        ],
        "correctIndex": 0,
        "rationale": "Veracity is the duty of truthfulness."
      },
      {
        "question": "Treating all patients equally regardless of nationality reflects:",
        "options": [
          "Autonomy",
          "Justice",
          "Beneficence",
          "Fidelity"
        ],
        "correctIndex": 1,
        "rationale": "Justice is fair, equal treatment for all."
      },
      {
        "question": "A nurse overhears a colleague discussing a patient in the cafeteria. This violates:",
        "options": [
          "Justice",
          "Confidentiality",
          "Beneficence",
          "Autonomy"
        ],
        "correctIndex": 1,
        "rationale": "Discussing identifiable patient information publicly breaches confidentiality."
      },
      {
        "question": "The Five Rights of delegation include all EXCEPT:",
        "options": [
          "Right task",
          "Right person",
          "Right diagnosis",
          "Right supervision"
        ],
        "correctIndex": 2,
        "rationale": "The Five Rights are task, circumstance, person, direction/communication, and supervision - not 'diagnosis'."
      },
      {
        "question": "Negligence requires proof of all EXCEPT:",
        "options": [
          "Duty",
          "Breach",
          "Harm",
          "Intent to harm"
        ],
        "correctIndex": 3,
        "rationale": "Negligence requires duty, breach, harm and causation - intent is not required (intent relates to other torts)."
      },
      {
        "question": "A patient asks the nurse to explain surgical risks before signing consent. The nurse should:",
        "options": [
          "Explain all risks personally",
          "Refer the question to the surgeon to ensure informed consent",
          "Tell them not to worry",
          "Witness the signature anyway"
        ],
        "correctIndex": 1,
        "rationale": "The physician must provide the explanation of risks; the nurse ensures the patient is informed before witnessing consent."
      },
      {
        "question": "Which patient information may be shared without specific consent?",
        "options": [
          "With the patient's employer",
          "With the care team directly involved in treatment",
          "With the patient's neighbour",
          "On social media"
        ],
        "correctIndex": 1,
        "rationale": "Information may be shared on a need-to-know basis among the treating care team."
      },
      {
        "question": "A nurse is asked to perform a task outside their scope of practice. The nurse should:",
        "options": [
          "Do it to help the team",
          "Decline and notify the supervisor",
          "Delegate it to a UAP",
          "Attempt it carefully"
        ],
        "correctIndex": 1,
        "rationale": "Practising outside one's scope is unsafe and unlawful; decline and escalate."
      },
      {
        "question": "Keeping a promise to return and check on a patient reflects:",
        "options": [
          "Fidelity",
          "Justice",
          "Autonomy",
          "Veracity"
        ],
        "correctIndex": 0,
        "rationale": "Fidelity is keeping commitments and being trustworthy."
      },
      {
        "question": "Which is a sentinel event requiring formal reporting?",
        "options": [
          "A patient refusing a meal",
          "Wrong-site surgery",
          "A late medication by 10 minutes",
          "A patient request for water"
        ],
        "correctIndex": 1,
        "rationale": "Wrong-site surgery is a sentinel event reported to quality/risk management."
      },
      {
        "question": "Before delegating, the nurse must FIRST consider:",
        "options": [
          "The UAP's break schedule",
          "Whether the task and patient are stable and within the UAP's competence",
          "The unit budget",
          "The physician's preference"
        ],
        "correctIndex": 1,
        "rationale": "Delegation depends on task stability/predictability and the delegatee's competence (right task/person/circumstance)."
      },
      {
        "question": "A competent patient signs consent then says they have changed their mind before the procedure. The nurse should:",
        "options": [
          "Proceed as the form is signed",
          "Stop and notify the physician; consent can be withdrawn",
          "Tell the patient it is too late",
          "Ask the family to decide"
        ],
        "correctIndex": 1,
        "rationale": "Consent may be withdrawn at any time; the nurse stops and notifies the physician."
      },
      {
        "question": "Cultural competence in the UAE includes:",
        "options": [
          "Ignoring religious requests to save time",
          "Arranging same-gender care/chaperone when requested",
          "Refusing interpreters",
          "Assuming all patients are alike"
        ],
        "correctIndex": 1,
        "rationale": "Respecting religious and cultural needs (e.g., same-gender care) is a professional and legal expectation."
      },
      {
        "question": "The MOST appropriate first step in any ethical dilemma is to:",
        "options": [
          "Act on personal values",
          "Gather the facts and identify the patient's wishes",
          "Ask the family to decide",
          "Refuse to participate"
        ],
        "correctIndex": 1,
        "rationale": "Ethical decision-making begins with gathering facts and clarifying the patient's values/wishes."
      },
      {
        "question": "A nurse documents care that was not actually performed. This is:",
        "options": [
          "Acceptable if busy",
          "Falsification - a serious professional/legal violation",
          "Standard practice",
          "Only a minor issue"
        ],
        "correctIndex": 1,
        "rationale": "Charting care not done is falsification and a serious legal/ethical breach."
      },
      {
        "question": "Which best protects the nurse legally after an adverse event?",
        "options": [
          "Avoiding documentation",
          "Accurate, complete, contemporaneous documentation",
          "Discussing it on social media",
          "Changing the record later"
        ],
        "correctIndex": 1,
        "rationale": "Accurate, timely documentation is the nurse's best legal protection; records must never be altered improperly."
      },
      {
        "question": "Reporting suspected child abuse is:",
        "options": [
          "Optional",
          "A mandatory legal/ethical duty",
          "A breach of confidentiality to avoid",
          "Only the physician's job"
        ],
        "correctIndex": 1,
        "rationale": "Suspected abuse must be reported under child/vulnerable-person protection requirements; it overrides ordinary confidentiality."
      },
      {
        "question": "Which action demonstrates respect for autonomy?",
        "options": [
          "Deciding for the patient",
          "Providing information and supporting the patient's own choice",
          "Persuading the patient to agree with staff",
          "Withholding options"
        ],
        "correctIndex": 1,
        "rationale": "Supporting the patient's informed, voluntary choice respects autonomy."
      }
    ]
  },
  {
    "id": "fundamentals",
    "title": "Fundamentals of Nursing & Patient Safety",
    "subtitle": "Vital signs, the nursing process, prioritisation, mobility, hygiene, and the safety priorities tested on every exam",
    "category": "Fundamentals",
    "readingTime": "30 min read",
    "examWeight": "~15-20% of the licensing exam",
    "objectives": [
      "Interpret normal adult vital-sign ranges and recognise abnormal values.",
      "Apply the nursing process (ADPIE) and prioritisation frameworks (ABC, Maslow).",
      "Implement core safety: identification, fall prevention, asepsis, and error prevention.",
      "Apply positioning, mobility, and basic hygiene principles safely.",
      "Recognise early signs of clinical deterioration."
    ],
    "sections": [
      {
        "title": "Normal Adult Vital Signs",
        "content": "Vital signs are the foundation of assessment. Memorise normal adult ranges and the values that demand action, always interpreting them against the patient's baseline.",
        "bullets": [
          "Temperature 36.1-37.2 C (oral); fever >= 38 C.",
          "Heart rate 60-100 bpm; <60 bradycardia, >100 tachycardia.",
          "Respiratory rate 12-20 breaths/min.",
          "Blood pressure <120/80 normal; >=140/90 hypertension; sustained <90 systolic suggests hypotension/shock.",
          "SpO2 95-100% on room air; <90% is significant hypoxaemia."
        ]
      },
      {
        "title": "The Nursing Process & Prioritisation",
        "content": "ADPIE guides every interaction. Prioritise using ABC (Airway, Breathing, Circulation) and Maslow's hierarchy (physiological before safety before psychosocial).",
        "bullets": [
          "ABCs first: a patent airway and adequate breathing precede everything.",
          "Maslow: physiological needs (oxygen, fluids, nutrition, elimination) before safety and psychosocial needs.",
          "Acute, unstable problems take priority over chronic, stable ones.",
          "Assessment precedes intervention, except in an immediate emergency."
        ]
      },
      {
        "title": "Patient Identification & Medication Safety",
        "content": "Two-identifier verification and the rights of medication administration prevent the most common errors.",
        "bullets": [
          "Use two identifiers (e.g., name + date of birth/MRN); never the room/bed number.",
          "Rights of medication: right patient, drug, dose, route, time, documentation, reason, response.",
          "Verify allergies before every administration.",
          "Perform three medication checks: retrieving, preparing, and at the bedside."
        ]
      },
      {
        "title": "Infection Prevention & Hand Hygiene",
        "content": "Hand hygiene is the single most effective measure to prevent healthcare-associated infection.",
        "bullets": [
          "WHO 5 Moments: before patient contact, before aseptic task, after body-fluid exposure risk, after patient contact, after contact with surroundings.",
          "Use alcohol-based hand rub when hands are not visibly soiled; soap and water when soiled or for spores (C. difficile).",
          "Apply standard precautions to every patient.",
          "Don and doff PPE in the correct sequence to avoid self-contamination."
        ]
      },
      {
        "title": "Fall Prevention & Restraints",
        "content": "Falls are a leading patient-safety event. Restraints are a last resort with strict rules.",
        "bullets": [
          "Keep the bed low and locked, call bell in reach, non-slip footwear, adequate lighting, scheduled rounding.",
          "Assess high-risk patients (age, medications, mobility, confusion) on admission and per policy.",
          "Restraints require a time-limited physician order, the least-restrictive type, and frequent monitoring of circulation, skin and needs.",
          "Never tie restraints to side rails; use a quick-release knot on the bed frame."
        ]
      },
      {
        "title": "Positioning, Mobility & Hygiene",
        "content": "Correct positioning protects airway, skin and comfort; early mobility prevents complications of immobility.",
        "bullets": [
          "Reposition immobile patients at least every 2 hours to prevent pressure injuries.",
          "Semi-Fowler's/high-Fowler's eases breathing; left-lateral (recovery) protects the airway in an unconscious patient.",
          "Immobility risks: pressure injury, DVT, pneumonia, constipation, muscle atrophy.",
          "Provide oral and skin care; assist ADLs while promoting independence."
        ]
      }
    ],
    "flashcards": [
      {
        "question": "Normal adult resting heart rate?",
        "answer": "60-100 bpm; below 60 is bradycardia, above 100 is tachycardia."
      },
      {
        "question": "Normal adult respiratory rate?",
        "answer": "12-20 breaths per minute."
      },
      {
        "question": "Normal oral temperature range?",
        "answer": "36.1-37.2 C; fever is >= 38 C."
      },
      {
        "question": "Normal adult blood pressure?",
        "answer": "Below 120/80 mmHg; hypertension is >= 140/90."
      },
      {
        "question": "Normal SpO2 on room air?",
        "answer": "95-100%; below 90% is significant hypoxaemia."
      },
      {
        "question": "What does ADPIE stand for?",
        "answer": "Assessment, Diagnosis, Planning, Implementation, Evaluation."
      },
      {
        "question": "First priority framework when choosing what to do first?",
        "answer": "Airway, Breathing, Circulation (ABC)."
      },
      {
        "question": "Base of Maslow's hierarchy (highest priority needs)?",
        "answer": "Physiological needs - oxygen, fluids, nutrition, elimination."
      },
      {
        "question": "How many patient identifiers before medication, and which are acceptable?",
        "answer": "Two - e.g., full name and date of birth or MRN; never room/bed number."
      },
      {
        "question": "List the core Rights of medication administration.",
        "answer": "Right patient, drug, dose, route, time, documentation, reason, and response."
      },
      {
        "question": "WHO 5 Moments for Hand Hygiene?",
        "answer": "Before patient contact, before aseptic task, after body-fluid exposure risk, after patient contact, after contact with surroundings."
      },
      {
        "question": "When must soap and water be used instead of alcohol rub?",
        "answer": "When hands are visibly soiled and for spore-forming organisms like C. difficile."
      },
      {
        "question": "Single most effective measure to prevent infection?",
        "answer": "Hand hygiene."
      },
      {
        "question": "How often should an immobile patient be repositioned?",
        "answer": "At least every 2 hours to prevent pressure injuries."
      },
      {
        "question": "Best position to ease breathing?",
        "answer": "Semi-Fowler's or high-Fowler's (sitting upright)."
      },
      {
        "question": "Best position for an unconscious, breathing patient?",
        "answer": "Left-lateral 'recovery' position to protect the airway."
      },
      {
        "question": "Key fall-prevention measures?",
        "answer": "Bed low and locked, call bell in reach, non-slip footwear, lighting, and scheduled rounding."
      },
      {
        "question": "Requirements for using restraints?",
        "answer": "A time-limited physician order, least-restrictive type, and frequent monitoring of circulation, skin and needs."
      },
      {
        "question": "How should a restraint be secured?",
        "answer": "With a quick-release knot to the bed frame - never to side rails."
      },
      {
        "question": "Three medication safety checks?",
        "answer": "When retrieving, when preparing, and at the bedside before administration."
      },
      {
        "question": "Complications of immobility?",
        "answer": "Pressure injuries, DVT, pneumonia, constipation, and muscle atrophy."
      },
      {
        "question": "Earliest sign of many forms of clinical deterioration?",
        "answer": "A change in level of consciousness or rising respiratory rate."
      },
      {
        "question": "What must be verified before every medication?",
        "answer": "The patient's allergies."
      },
      {
        "question": "Which assessment comes before intervention?",
        "answer": "Always assess first - except in an immediate life-threatening emergency."
      },
      {
        "question": "Correct order when removing (doffing) PPE concept?",
        "answer": "Remove most contaminated items first and perform hand hygiene to avoid self-contamination."
      }
    ],
    "quiz": [
      {
        "question": "Four patients need attention. Who is seen FIRST?",
        "options": [
          "Due for routine meds",
          "New dyspnoea with SpO2 86%",
          "Requesting the bathroom",
          "Asking about discharge"
        ],
        "correctIndex": 1,
        "rationale": "Airway/Breathing problems are the top priority; new dyspnoea with low SpO2 is life-threatening."
      },
      {
        "question": "Before giving medication, the nurse identifies the patient using:",
        "options": [
          "Room and bed number",
          "Two identifiers such as name and DOB",
          "The diagnosis",
          "The nurse's memory"
        ],
        "correctIndex": 1,
        "rationale": "Two identifiers (not room/bed) are required."
      },
      {
        "question": "Which adult vital sign is abnormal and needs action?",
        "options": [
          "Temp 36.8 C",
          "HR 72",
          "RR 30",
          "BP 118/76"
        ],
        "correctIndex": 2,
        "rationale": "Normal RR is 12-20; 30 (tachypnoea) is abnormal."
      },
      {
        "question": "According to Maslow, which need is highest priority?",
        "options": [
          "Self-esteem",
          "Belonging",
          "Oxygenation",
          "Spiritual support"
        ],
        "correctIndex": 2,
        "rationale": "Physiological needs like oxygenation are the base of the hierarchy."
      },
      {
        "question": "A key fall-prevention intervention is to:",
        "options": [
          "Keep the bed high",
          "Place the call bell in reach and keep the bed low",
          "Use restraints routinely",
          "Dim all lights"
        ],
        "correctIndex": 1,
        "rationale": "Bed low with call bell in reach reduces falls; restraints are a last resort."
      },
      {
        "question": "Hand hygiene with alcohol rub is appropriate when:",
        "options": [
          "Hands are visibly soiled",
          "Caring for C. difficile",
          "Hands are not visibly soiled",
          "After using the toilet"
        ],
        "correctIndex": 2,
        "rationale": "Alcohol rub is used when hands are not visibly soiled; soap/water for soiling and spores."
      },
      {
        "question": "The single most effective way to prevent infection is:",
        "options": [
          "Gowns",
          "Hand hygiene",
          "Antibiotics",
          "Room cleaning"
        ],
        "correctIndex": 1,
        "rationale": "Hand hygiene is the most effective single measure."
      },
      {
        "question": "An immobile patient should be repositioned at least every:",
        "options": [
          "8 hours",
          "2 hours",
          "12 hours",
          "30 minutes"
        ],
        "correctIndex": 1,
        "rationale": "Repositioning at least every 2 hours prevents pressure injuries."
      },
      {
        "question": "Best position for a dyspneic patient is:",
        "options": [
          "Supine flat",
          "High-Fowler's",
          "Trendelenburg",
          "Prone"
        ],
        "correctIndex": 1,
        "rationale": "Upright high-Fowler's improves lung expansion and eases breathing."
      },
      {
        "question": "An unconscious patient who is breathing should be placed in the:",
        "options": [
          "Supine position",
          "Left-lateral recovery position",
          "High-Fowler's",
          "Prone position"
        ],
        "correctIndex": 1,
        "rationale": "The recovery position protects the airway from aspiration."
      },
      {
        "question": "Which is NOT one of the rights of medication administration?",
        "options": [
          "Right dose",
          "Right route",
          "Right colour",
          "Right time"
        ],
        "correctIndex": 2,
        "rationale": "'Right colour' is not a recognised medication right."
      },
      {
        "question": "Before any medication, the nurse must verify:",
        "options": [
          "The patient's insurance",
          "Allergies",
          "Room number",
          "Visiting hours"
        ],
        "correctIndex": 1,
        "rationale": "Allergy status must be confirmed before administration."
      },
      {
        "question": "A patient's BP is 86/54 with dizziness. The nurse should FIRST:",
        "options": [
          "Ambulate the patient",
          "Lay the patient down/raise legs and reassess, notify as needed",
          "Give an antihypertensive",
          "Encourage caffeine"
        ],
        "correctIndex": 1,
        "rationale": "For hypotension, position supine with legs elevated, ensure safety, reassess, and escalate."
      },
      {
        "question": "Restraints require:",
        "options": [
          "A standing indefinite order",
          "A time-limited physician order and frequent monitoring",
          "Family permission only",
          "No order if brief"
        ],
        "correctIndex": 1,
        "rationale": "Restraints need a time-limited order, least-restrictive type, and frequent checks."
      },
      {
        "question": "A restraint should be tied to the:",
        "options": [
          "Side rail",
          "Bed frame with a quick-release knot",
          "Headboard tightly",
          "IV pole"
        ],
        "correctIndex": 1,
        "rationale": "Tie to the bed frame with a quick-release knot - never to side rails."
      },
      {
        "question": "The earliest indicator of clinical deterioration is often:",
        "options": [
          "A change in level of consciousness",
          "Hair loss",
          "Increased appetite",
          "Dry skin"
        ],
        "correctIndex": 0,
        "rationale": "An altered LOC (restlessness, confusion) is an early, sensitive sign of deterioration."
      },
      {
        "question": "Which is the correct assessment sequence for the abdomen?",
        "options": [
          "Inspect, palpate, percuss, auscultate",
          "Inspect, auscultate, percuss, palpate",
          "Palpate first",
          "Percuss first"
        ],
        "correctIndex": 1,
        "rationale": "For the abdomen, auscultate before percussion/palpation to avoid altering bowel sounds."
      },
      {
        "question": "A nurse finds a medication error after administration. The priority is to:",
        "options": [
          "Hide it",
          "Assess and monitor the patient, then report",
          "Chart it as given correctly",
          "Wait for symptoms"
        ],
        "correctIndex": 1,
        "rationale": "Patient safety first - assess/monitor the patient, then complete an incident report."
      },
      {
        "question": "Two-identifier checking applies to:",
        "options": [
          "Only high-risk drugs",
          "All medications, procedures and specimens",
          "Only IV drugs",
          "Only new patients"
        ],
        "correctIndex": 1,
        "rationale": "Two-identifier verification applies to all medications, procedures, and specimen collection."
      },
      {
        "question": "Which patient is at highest fall risk?",
        "options": [
          "A young athlete",
          "An older adult on sedatives with unsteady gait",
          "A patient on bed rest who is alert",
          "A visitor"
        ],
        "correctIndex": 1,
        "rationale": "Age, sedating drugs, and unsteady gait markedly increase fall risk."
      },
      {
        "question": "Normal capillary refill time is:",
        "options": [
          "Less than 3 seconds",
          "5-8 seconds",
          "10 seconds",
          "Instant only"
        ],
        "correctIndex": 0,
        "rationale": "Capillary refill under ~3 seconds indicates adequate peripheral perfusion."
      },
      {
        "question": "When delegating vital signs to a UAP, the RN must:",
        "options": [
          "Stop assessing the patient",
          "Still interpret the values and act on abnormalities",
          "Transfer accountability",
          "Avoid double-checking"
        ],
        "correctIndex": 1,
        "rationale": "Data collection may be delegated, but the RN interprets results and remains accountable."
      },
      {
        "question": "A postoperative patient refuses to deep-breathe due to pain. The nurse should:",
        "options": [
          "Skip breathing exercises",
          "Provide analgesia then encourage incentive spirometry",
          "Force the exercise",
          "Document refusal only"
        ],
        "correctIndex": 1,
        "rationale": "Treating pain enables effective breathing exercises that prevent atelectasis/pneumonia."
      },
      {
        "question": "Which finding requires immediate action?",
        "options": [
          "Temp 37.0 C",
          "RR 10 and shallow with SpO2 88%",
          "HR 78",
          "BP 122/80"
        ],
        "correctIndex": 1,
        "rationale": "Hypoventilation with hypoxaemia is an airway/breathing emergency."
      },
      {
        "question": "Standard precautions are used for:",
        "options": [
          "Only patients with known infection",
          "Every patient, every time",
          "Only ICU patients",
          "Only during procedures"
        ],
        "correctIndex": 1,
        "rationale": "Standard precautions apply to all patients regardless of diagnosis."
      },
      {
        "question": "The nurse should perform hand hygiene:",
        "options": [
          "Only after removing gloves",
          "Before and after patient contact and per the 5 Moments",
          "Once per shift",
          "Only when soiled"
        ],
        "correctIndex": 1,
        "rationale": "Hand hygiene follows the WHO 5 Moments, including before and after patient contact; gloves do not replace it."
      },
      {
        "question": "A confused patient keeps climbing out of bed. The FIRST intervention is to:",
        "options": [
          "Apply restraints",
          "Use least-restrictive measures: rounding, bed alarm, move closer to the station",
          "Sedate the patient",
          "Raise all four side rails"
        ],
        "correctIndex": 1,
        "rationale": "Least-restrictive safety measures are tried first; restraints/4 side rails are a last resort."
      },
      {
        "question": "Which is a physiological (Maslow) priority over a safety need?",
        "options": [
          "Fear of falling",
          "Adequate oxygenation",
          "Need for privacy",
          "Self-esteem"
        ],
        "correctIndex": 1,
        "rationale": "Oxygenation (physiological) outranks safety and psychosocial needs."
      },
      {
        "question": "Accurate documentation should be:",
        "options": [
          "Completed at end of week",
          "Objective, factual and timely",
          "Based on assumptions",
          "Erased if wrong"
        ],
        "correctIndex": 1,
        "rationale": "Records must be objective, factual, and contemporaneous; errors are corrected per policy, not erased."
      },
      {
        "question": "To prevent aspiration during feeding, position the patient:",
        "options": [
          "Flat supine",
          "Upright at 90 degrees (high-Fowler's)",
          "Trendelenburg",
          "Left side flat"
        ],
        "correctIndex": 1,
        "rationale": "Sitting upright reduces aspiration risk during and after meals."
      }
    ]
  },
  {
    "id": "med-surg",
    "title": "Medical-Surgical Core Nursing Systems",
    "subtitle": "Shock, cardiac emergencies, fluid and electrolytes, acid-base balance, respiratory, renal, endocrine and GI",
    "category": "Clinical Core",
    "readingTime": "30 min read",
    "examWeight": "~20-25% of the licensing exam",
    "objectives": [
      "Recognise and prioritise care for the major types of shock and cardiac emergencies.",
      "Manage potassium, sodium and calcium imbalances safely.",
      "Interpret arterial blood gases (acid-base balance).",
      "Apply nursing priorities for respiratory, renal, endocrine and GI conditions."
    ],
    "sections": [
      {
        "title": "Shock & Cardiovascular Emergencies",
        "content": "Shock is inadequate tissue perfusion. Recognise the type and prioritise oxygenation, circulation and rapid escalation.",
        "bullets": [
          "Hypovolemic: tachycardia, cold/clammy skin, low urine output, narrowing pulse pressure - give fluids/blood, control bleeding.",
          "Cardiogenic: pump failure (MI) - improve contractility, reduce workload.",
          "Distributive (septic, anaphylactic, neurogenic): vasodilation - fluids, vasopressors; anaphylaxis needs IM epinephrine first.",
          "MI priorities follow MONA as ordered (Morphine, Oxygen if hypoxic, Nitroglycerin, Aspirin) with immediate 12-lead ECG."
        ]
      },
      {
        "title": "Fluid & Electrolyte Imbalances",
        "content": "Electrolyte abnormalities can be rapidly fatal through cardiac and neuromuscular effects.",
        "bullets": [
          "Hyperkalemia (>5.0): peaked T-waves, wide QRS - calcium gluconate to protect the heart, then insulin/dextrose or Kayexalate.",
          "Hypokalemia (<3.5): flat T-waves, U-waves - never IV push potassium; dilute and infuse via pump.",
          "Hyponatremia: confusion, seizures - correct slowly. Hypernatremia: thirst, neuro changes.",
          "Hypocalcemia: positive Chvostek's/Trousseau's, tetany. Hypercalcemia: weakness, dysrhythmias, stones."
        ]
      },
      {
        "title": "Acid-Base Balance (ABGs)",
        "content": "Use ROME: Respiratory Opposite, Metabolic Equal. Normals: pH 7.35-7.45, PaCO2 35-45, HCO3 22-26.",
        "bullets": [
          "Respiratory acidosis: low pH, high CO2 (hypoventilation/COPD).",
          "Respiratory alkalosis: high pH, low CO2 (hyperventilation/anxiety).",
          "Metabolic acidosis: low pH, low HCO3 (DKA, diarrhoea, renal failure).",
          "Metabolic alkalosis: high pH, high HCO3 (vomiting, excess antacids)."
        ]
      },
      {
        "title": "Respiratory Conditions",
        "content": "Prioritise airway and oxygenation; tailor oxygen to the patient.",
        "bullets": [
          "COPD: titrate oxygen to target SpO2 (e.g., 88-92%) to avoid suppressing the hypoxic drive.",
          "Asthma: bronchodilators (e.g., salbutamol) first; a silent chest is an emergency.",
          "Pneumonia: cough, fever, crackles - antibiotics, hydration, deep breathing.",
          "Pulmonary embolism: sudden dyspnoea, pleuritic chest pain, tachycardia - oxygen, anticoagulation."
        ]
      },
      {
        "title": "Renal & Endocrine",
        "content": "Watch fluid balance and glucose; diabetic emergencies are common exam content.",
        "bullets": [
          "Chronic kidney disease/dialysis: protect the AV fistula (no BP/venipuncture in that arm; feel for thrill, hear bruit).",
          "DKA (type 1): hyperglycaemia, ketones, Kussmaul breathing, fruity breath - IV fluids, insulin, monitor potassium.",
          "Hypoglycaemia (<3.9 mmol/L): shaky, sweaty, confused - give fast-acting carbohydrate; if unconscious, IV dextrose/glucagon.",
          "Addisonian crisis vs thyroid storm - recognise life-threatening endocrine emergencies."
        ]
      },
      {
        "title": "Gastrointestinal & Post-operative",
        "content": "Recognise GI bleeding, obstruction and post-op complications early.",
        "bullets": [
          "Upper GI bleed: haematemesis/melena - airway, fluids, monitor for shock.",
          "Bowel obstruction: distension, vomiting, absent stool/flatus - NPO, NG decompression.",
          "Post-op evisceration: cover with sterile saline-soaked gauze, low-Fowler's with knees flexed, notify surgeon.",
          "Monitor for atelectasis, DVT/PE, infection and ileus after surgery."
        ]
      }
    ],
    "flashcards": [
      {
        "question": "Priority action in anaphylactic shock?",
        "answer": "Ensure airway and give IM epinephrine (1:1000) first; position supine with legs raised."
      },
      {
        "question": "Why never IV-push concentrated potassium chloride?",
        "answer": "It can cause immediate fatal cardiac arrest; always dilute and infuse via a pump."
      },
      {
        "question": "ECG hallmark of severe hyperkalemia?",
        "answer": "Tall, peaked T-waves, then PR prolongation and QRS widening."
      },
      {
        "question": "First drug to protect the heart in hyperkalemia?",
        "answer": "IV calcium gluconate; then insulin/dextrose and Kayexalate to lower potassium."
      },
      {
        "question": "Signs of hypovolemic shock?",
        "answer": "Tachycardia, cold clammy skin, low urine output, narrowing pulse pressure, hypotension."
      },
      {
        "question": "MONA for myocardial infarction?",
        "answer": "Morphine, Oxygen (if hypoxic), Nitroglycerin, Aspirin - given as ordered, with immediate ECG."
      },
      {
        "question": "Interpret pH 7.30, PaCO2 55, HCO3 24.",
        "answer": "Respiratory acidosis, uncompensated."
      },
      {
        "question": "Interpret pH 7.50, PaCO2 30, HCO3 24.",
        "answer": "Respiratory alkalosis, uncompensated."
      },
      {
        "question": "Interpret pH 7.30, PaCO2 38, HCO3 16.",
        "answer": "Metabolic acidosis."
      },
      {
        "question": "Mnemonic for ABG interpretation?",
        "answer": "ROME - Respiratory Opposite, Metabolic Equal."
      },
      {
        "question": "Hypocalcemia signs?",
        "answer": "Positive Chvostek's and Trousseau's signs, tetany, tingling."
      },
      {
        "question": "Target SpO2 approach in COPD?",
        "answer": "Titrate oxygen carefully (often 88-92%) to avoid suppressing the hypoxic drive."
      },
      {
        "question": "Emergency sign in acute asthma?",
        "answer": "A silent chest (no air movement) indicates severe, life-threatening obstruction."
      },
      {
        "question": "How is an AV fistula protected?",
        "answer": "No BP cuff or venipuncture in that arm; check for a palpable thrill and audible bruit."
      },
      {
        "question": "Classic DKA findings?",
        "answer": "Hyperglycaemia, ketones, Kussmaul (deep rapid) breathing, fruity breath, dehydration."
      },
      {
        "question": "DKA management essentials?",
        "answer": "IV fluids, regular insulin infusion, and close potassium monitoring."
      },
      {
        "question": "Hypoglycaemia treatment if conscious?",
        "answer": "15 g fast-acting carbohydrate (e.g., juice/glucose), recheck in 15 minutes."
      },
      {
        "question": "Hypoglycaemia treatment if unconscious?",
        "answer": "IV dextrose (or IM glucagon if no IV access)."
      },
      {
        "question": "Normal serum potassium range?",
        "answer": "3.5-5.0 mEq/L."
      },
      {
        "question": "Normal serum sodium range?",
        "answer": "135-145 mEq/L."
      },
      {
        "question": "Priority for upper GI bleed?",
        "answer": "Protect airway, give fluids/blood, and monitor for hypovolemic shock."
      },
      {
        "question": "Nursing action for surgical evisceration?",
        "answer": "Cover organs with sterile saline-soaked gauze, low-Fowler's with knees flexed, notify surgeon."
      },
      {
        "question": "Three classic signs of cardiac tamponade (Beck's triad)?",
        "answer": "Hypotension, muffled heart sounds, and jugular venous distension."
      },
      {
        "question": "Earliest sign of increased intracranial pressure?",
        "answer": "A change/decline in level of consciousness."
      },
      {
        "question": "Antidote concept for magnesium toxicity?",
        "answer": "Calcium gluconate (for loss of reflexes/respiratory depression)."
      }
    ],
    "quiz": [
      {
        "question": "A post-op patient has BP 88/60, HR 122, cool clammy skin, low urine output. Priority:",
        "options": [
          "Antipyretic",
          "Restore volume (fluids/blood) and find the bleeding source",
          "Reverse Trendelenburg",
          "Restrict fluids"
        ],
        "correctIndex": 1,
        "rationale": "Signs of hypovolemic shock - restore circulating volume and control the source."
      },
      {
        "question": "Potassium 6.8 with peaked T-waves. Give FIRST:",
        "options": [
          "Oral potassium",
          "IV calcium gluconate",
          "A potassium-sparing diuretic",
          "Saline only"
        ],
        "correctIndex": 1,
        "rationale": "Calcium gluconate protects the myocardium first; then lower the potassium."
      },
      {
        "question": "ABG pH 7.50, CO2 30, HCO3 24 indicates:",
        "options": [
          "Respiratory acidosis",
          "Respiratory alkalosis",
          "Metabolic acidosis",
          "Metabolic alkalosis"
        ],
        "correctIndex": 1,
        "rationale": "High pH with low CO2 is respiratory alkalosis."
      },
      {
        "question": "When infusing IV KCl the nurse must:",
        "options": [
          "Give a rapid bolus",
          "Dilute and infuse via a pump",
          "Push it undiluted",
          "Mix it with blood"
        ],
        "correctIndex": 1,
        "rationale": "KCl must be diluted and infused slowly via pump."
      },
      {
        "question": "Which finding indicates hypocalcemia?",
        "options": [
          "Positive Trousseau's/Chvostek's signs",
          "Peaked T-waves",
          "Warm flushed skin",
          "Bounding pulses"
        ],
        "correctIndex": 0,
        "rationale": "Hypocalcemia raises neuromuscular excitability, causing positive Chvostek's/Trousseau's and tetany."
      },
      {
        "question": "A COPD patient on high-flow O2 becomes drowsy with slow breathing. The nurse should:",
        "options": [
          "Increase oxygen",
          "Reduce O2 to a controlled target and reassess",
          "Leave to rest",
          "Give a sedative"
        ],
        "correctIndex": 1,
        "rationale": "Excess O2 can suppress the hypoxic drive; titrate down and reassess."
      },
      {
        "question": "Sudden dyspnoea, pleuritic chest pain and tachycardia post-op suggests:",
        "options": [
          "Pneumonia",
          "Pulmonary embolism",
          "Asthma",
          "Anxiety only"
        ],
        "correctIndex": 1,
        "rationale": "This classic picture suggests PE - give oxygen and anticipate anticoagulation."
      },
      {
        "question": "Priority assessment for a patient with an AV fistula?",
        "options": [
          "Apply a BP cuff to that arm",
          "Palpate for a thrill and auscultate a bruit",
          "Start an IV in that arm",
          "Keep the arm dependent"
        ],
        "correctIndex": 1,
        "rationale": "Patency is confirmed by a palpable thrill and audible bruit; protect the arm."
      },
      {
        "question": "A type 1 diabetic has glucose 28 mmol/L, ketones, Kussmaul breathing. This is:",
        "options": [
          "Hypoglycaemia",
          "DKA",
          "HHS only",
          "Normal"
        ],
        "correctIndex": 1,
        "rationale": "Hyperglycaemia with ketones and Kussmaul breathing indicates DKA."
      },
      {
        "question": "In DKA, as insulin is given the nurse closely monitors:",
        "options": [
          "Sodium only",
          "Potassium",
          "Calcium",
          "Magnesium"
        ],
        "correctIndex": 1,
        "rationale": "Insulin drives potassium into cells, risking hypokalemia; monitor closely."
      },
      {
        "question": "A conscious patient with glucose 3.2 mmol/L should receive:",
        "options": [
          "IV insulin",
          "15 g fast-acting carbohydrate",
          "Nothing by mouth",
          "A long-acting carbohydrate only"
        ],
        "correctIndex": 1,
        "rationale": "Treat hypoglycaemia with fast-acting carbohydrate and recheck in 15 minutes."
      },
      {
        "question": "Beck's triad (hypotension, muffled heart sounds, JVD) indicates:",
        "options": [
          "Pneumothorax",
          "Cardiac tamponade",
          "MI",
          "PE"
        ],
        "correctIndex": 1,
        "rationale": "Beck's triad indicates cardiac tamponade - prepare for pericardiocentesis."
      },
      {
        "question": "Earliest sign of rising intracranial pressure is:",
        "options": [
          "Fixed dilated pupil",
          "Decerebrate posturing",
          "Change in level of consciousness",
          "Cushing's triad"
        ],
        "correctIndex": 2,
        "rationale": "A change in LOC is the earliest, most sensitive sign; the others are late."
      },
      {
        "question": "A patient vomiting for 3 days likely has which acid-base imbalance?",
        "options": [
          "Metabolic acidosis",
          "Metabolic alkalosis",
          "Respiratory acidosis",
          "Respiratory alkalosis"
        ],
        "correctIndex": 1,
        "rationale": "Loss of gastric acid from vomiting causes metabolic alkalosis."
      },
      {
        "question": "Severe diarrhoea most likely causes:",
        "options": [
          "Metabolic alkalosis",
          "Metabolic acidosis",
          "Respiratory alkalosis",
          "No change"
        ],
        "correctIndex": 1,
        "rationale": "Loss of bicarbonate-rich stool causes metabolic acidosis."
      },
      {
        "question": "A silent chest in an asthmatic indicates:",
        "options": [
          "Improvement",
          "Life-threatening obstruction",
          "Normal finding",
          "Anxiety"
        ],
        "correctIndex": 1,
        "rationale": "No air movement (silent chest) signals severe, life-threatening bronchospasm."
      },
      {
        "question": "First nursing action for surgical wound evisceration:",
        "options": [
          "Push organs back in",
          "Cover with sterile saline-soaked gauze and notify surgeon",
          "Apply a tight dry bandage",
          "Give oral fluids"
        ],
        "correctIndex": 1,
        "rationale": "Keep exposed viscera moist with sterile saline gauze; position low-Fowler's, knees flexed; notify surgeon."
      },
      {
        "question": "Hyperkalemia is most dangerous because it can cause:",
        "options": [
          "Skin rash",
          "Fatal cardiac dysrhythmias",
          "Hair loss",
          "Constipation only"
        ],
        "correctIndex": 1,
        "rationale": "High potassium destabilises cardiac conduction, risking lethal dysrhythmias."
      },
      {
        "question": "A patient with chest pain receives nitroglycerin. The nurse monitors for:",
        "options": [
          "Hypertension",
          "Hypotension and headache",
          "Bradycardia only",
          "Hyperglycaemia"
        ],
        "correctIndex": 1,
        "rationale": "Nitroglycerin is a vasodilator; watch for hypotension and headache."
      },
      {
        "question": "The priority for an unresponsive patient is to:",
        "options": [
          "Check glucose",
          "Assess airway, breathing, circulation",
          "Obtain history",
          "Give oxygen by mask only"
        ],
        "correctIndex": 1,
        "rationale": "Always assess ABCs first in an unresponsive patient."
      },
      {
        "question": "A patient with MI is given aspirin to:",
        "options": [
          "Relieve fever",
          "Inhibit platelet aggregation",
          "Lower glucose",
          "Sedate the patient"
        ],
        "correctIndex": 1,
        "rationale": "Aspirin's antiplatelet effect limits clot extension in acute coronary syndrome."
      },
      {
        "question": "Normal serum sodium is:",
        "options": [
          "115-125",
          "135-145",
          "150-160",
          "100-110"
        ],
        "correctIndex": 1,
        "rationale": "Normal sodium is 135-145 mEq/L."
      },
      {
        "question": "A patient with hyponatremia and confusion needs:",
        "options": [
          "Rapid sodium correction",
          "Slow, controlled sodium correction",
          "Free water boluses",
          "No intervention"
        ],
        "correctIndex": 1,
        "rationale": "Correct sodium slowly to avoid osmotic demyelination."
      },
      {
        "question": "Kussmaul respirations are a compensatory response to:",
        "options": [
          "Metabolic acidosis",
          "Metabolic alkalosis",
          "Respiratory acidosis",
          "Hypothermia"
        ],
        "correctIndex": 0,
        "rationale": "Deep, rapid Kussmaul breathing blows off CO2 to compensate for metabolic acidosis (e.g., DKA)."
      },
      {
        "question": "A patient on a heparin infusion is monitored with:",
        "options": [
          "INR",
          "aPTT",
          "Blood glucose",
          "Lipid panel"
        ],
        "correctIndex": 1,
        "rationale": "Heparin therapy is monitored with aPTT (warfarin uses INR)."
      },
      {
        "question": "Which finding in a dialysis patient needs urgent attention?",
        "options": [
          "Bruit over the fistula",
          "Absent thrill over the fistula",
          "Healed access site",
          "Patient resting"
        ],
        "correctIndex": 1,
        "rationale": "Loss of thrill/bruit suggests clotting of the access - an urgent vascular concern."
      },
      {
        "question": "A patient with pneumonia should be encouraged to:",
        "options": [
          "Stay flat and still",
          "Deep breathe, cough, mobilise and hydrate",
          "Restrict all fluids",
          "Avoid coughing"
        ],
        "correctIndex": 1,
        "rationale": "Deep breathing, coughing, mobility and hydration help clear secretions and prevent complications."
      },
      {
        "question": "A patient with bowel obstruction is typically kept:",
        "options": [
          "On a full diet",
          "NPO with NG decompression",
          "On laxatives only",
          "Ambulating with meals"
        ],
        "correctIndex": 1,
        "rationale": "Bowel obstruction is managed with NPO status and NG tube decompression."
      },
      {
        "question": "Signs of digoxin toxicity include:",
        "options": [
          "Visual halos, nausea, bradycardia",
          "Hypertension",
          "Hyperglycaemia",
          "Diarrhoea only"
        ],
        "correctIndex": 0,
        "rationale": "Digoxin toxicity causes nausea, visual disturbances (halos) and bradycardia/dysrhythmias."
      },
      {
        "question": "The priority for active upper GI bleeding is to:",
        "options": [
          "Give oral iron",
          "Maintain airway, replace volume, monitor for shock",
          "Encourage ambulation",
          "Offer a large meal"
        ],
        "correctIndex": 1,
        "rationale": "Airway protection, fluid/blood replacement and shock monitoring are priorities in GI bleeding."
      }
    ]
  },
  {
    "id": "pharmacology",
    "title": "High-Alert Pharmacology & Dosage Calculations",
    "subtitle": "Drug-rate math, high-alert medications, antidotes, monitoring and safe administration",
    "category": "Pharmacology",
    "readingTime": "30 min read",
    "examWeight": "~15-20% of the licensing exam",
    "objectives": [
      "Perform accurate IV flow-rate and dosage calculations.",
      "Identify high-alert medications, their monitoring and antidotes.",
      "Apply the rights and checks of medication administration.",
      "Recognise common drug toxicities and interactions."
    ],
    "sections": [
      {
        "title": "Dosage Calculation Core Logic",
        "content": "Accurate calculation is the nurse's defence against medication harm. Memorise the formulas and double-check weight-based paediatric doses.",
        "bullets": [
          "Flow rate (gtt/min) = (Volume mL x Drop factor) / Time in minutes.",
          "Infusion rate (mL/hr) = Total volume mL / Total time in hours.",
          "Desired dose: (Desired / Have) x Quantity.",
          "Microdrip tubing = 60 gtt/mL; macrodrip = 10, 15 or 20 gtt/mL."
        ]
      },
      {
        "title": "High-Alert Medications & Antidotes",
        "content": "High-alert drugs carry a heightened risk of harm and need independent double-checks and lab monitoring.",
        "bullets": [
          "Heparin: monitor aPTT; antidote protamine sulfate.",
          "Warfarin: monitor PT/INR (target 2-3); antidote vitamin K.",
          "Digoxin: hold if apical pulse <60; toxicity = nausea, visual halos, dysrhythmias; antidote digoxin immune Fab.",
          "Opioids: antidote naloxone. Benzodiazepines: antidote flumazenil. Acetaminophen overdose: N-acetylcysteine.",
          "Magnesium sulfate toxicity: antidote calcium gluconate."
        ]
      },
      {
        "title": "The Rights & Checks of Administration",
        "content": "Apply the rights every time, verify allergies, and complete the three checks.",
        "bullets": [
          "Rights: patient, drug, dose, route, time, documentation, reason, response, and right to refuse.",
          "Two patient identifiers and allergy band checked before administration.",
          "Three checks: retrieving, preparing, and at the bedside.",
          "Document immediately AFTER administration - never before."
        ]
      },
      {
        "title": "Drug Classes & Key Cautions",
        "content": "Know the safety points most often tested.",
        "bullets": [
          "ACE inhibitors (-pril): dry cough, hyperkalemia, angioedema.",
          "Beta-blockers (-olol): hold for bradycardia/hypotension; do not stop abruptly.",
          "Aminoglycosides/vancomycin: nephro- and ototoxic; monitor levels and renal function.",
          "Insulin: regular insulin is the only type given IV; know onset/peak to time meals."
        ]
      },
      {
        "title": "Toxicities, Interactions & Special Populations",
        "content": "Recognise toxicity and tailor dosing in vulnerable groups.",
        "bullets": [
          "MAOIs: avoid tyramine-rich foods (aged cheese, cured meats) - hypertensive crisis risk.",
          "SSRIs: serotonin syndrome (agitation, hyperthermia, hyperreflexia).",
          "Statins: monitor for muscle pain (rhabdomyolysis) and liver enzymes.",
          "Paediatric and renal/hepatic patients need weight-based and adjusted dosing."
        ]
      }
    ],
    "flashcards": [
      {
        "question": "Antidote for heparin?",
        "answer": "Protamine sulfate."
      },
      {
        "question": "Antidote for warfarin?",
        "answer": "Vitamin K."
      },
      {
        "question": "Antidote for opioids?",
        "answer": "Naloxone."
      },
      {
        "question": "Antidote for benzodiazepines?",
        "answer": "Flumazenil."
      },
      {
        "question": "Antidote for acetaminophen (paracetamol) overdose?",
        "answer": "N-acetylcysteine."
      },
      {
        "question": "Antidote for digoxin toxicity?",
        "answer": "Digoxin immune Fab."
      },
      {
        "question": "Antidote for magnesium sulfate toxicity?",
        "answer": "Calcium gluconate."
      },
      {
        "question": "Lab to monitor heparin?",
        "answer": "aPTT."
      },
      {
        "question": "Lab and target to monitor warfarin?",
        "answer": "PT/INR, target 2.0-3.0."
      },
      {
        "question": "Calculate: 1000 mL over 8 h with microdrip (60 gtt/mL).",
        "answer": "125 gtt/min: (1000 x 60)/(8 x 60) = 125."
      },
      {
        "question": "Infusion rate formula (mL/hr)?",
        "answer": "Total volume mL / total time in hours."
      },
      {
        "question": "Flow rate formula (gtt/min)?",
        "answer": "(Volume mL x drop factor) / time in minutes."
      },
      {
        "question": "Assessment before digoxin and when to hold?",
        "answer": "Apical pulse for 1 minute; hold if below 60 bpm in an adult."
      },
      {
        "question": "Which insulin can be given IV?",
        "answer": "Regular (short-acting) insulin only."
      },
      {
        "question": "Classic side effect of ACE inhibitors?",
        "answer": "A persistent dry cough (also hyperkalemia and angioedema)."
      },
      {
        "question": "Key caution with beta-blockers?",
        "answer": "Hold for bradycardia/hypotension and never stop abruptly (rebound effects)."
      },
      {
        "question": "Toxic effects of aminoglycosides/vancomycin?",
        "answer": "Nephrotoxicity and ototoxicity - monitor levels and renal function."
      },
      {
        "question": "Foods to avoid on MAOIs?",
        "answer": "Tyramine-rich foods (aged cheese, cured/smoked meats) to prevent hypertensive crisis."
      },
      {
        "question": "Signs of serotonin syndrome?",
        "answer": "Agitation, hyperthermia, hyperreflexia, and autonomic instability."
      },
      {
        "question": "Microdrip vs macrodrip drop factors?",
        "answer": "Microdrip 60 gtt/mL; macrodrip 10, 15 or 20 gtt/mL."
      },
      {
        "question": "The three medication checks?",
        "answer": "When retrieving, when preparing, and at the bedside before giving."
      },
      {
        "question": "When is medication documented?",
        "answer": "Immediately after administration - never before."
      },
      {
        "question": "High-alert drugs needing an independent double-check?",
        "answer": "Insulin, IV opioids, anticoagulants (heparin), and concentrated electrolytes."
      },
      {
        "question": "Statin adverse effect to monitor?",
        "answer": "Muscle pain/weakness (rhabdomyolysis) and elevated liver enzymes."
      },
      {
        "question": "Calculate: 250 mg ordered; 125 mg/5 mL available.",
        "answer": "10 mL: (250/125) x 5 = 10 mL."
      }
    ],
    "quiz": [
      {
        "question": "Infuse 1 L over 10 hours. Pump rate (mL/hr)?",
        "options": [
          "50",
          "100",
          "125",
          "200"
        ],
        "correctIndex": 1,
        "rationale": "1000 mL / 10 h = 100 mL/hr."
      },
      {
        "question": "A patient on heparin is bleeding. Anticipate giving:",
        "options": [
          "Vitamin K",
          "Protamine sulfate",
          "Naloxone",
          "Flumazenil"
        ],
        "correctIndex": 1,
        "rationale": "Protamine sulfate reverses heparin."
      },
      {
        "question": "Apical pulse is 54 before digoxin. The nurse should:",
        "options": [
          "Give the dose",
          "Hold and notify the physician",
          "Give half",
          "Recheck in 4 h then give"
        ],
        "correctIndex": 1,
        "rationale": "Hold digoxin for an apical pulse below 60 and notify the physician."
      },
      {
        "question": "Order 250 mg; available 125 mg/5 mL. Give:",
        "options": [
          "5 mL",
          "10 mL",
          "12.5 mL",
          "2.5 mL"
        ],
        "correctIndex": 1,
        "rationale": "(250/125) x 5 = 10 mL."
      },
      {
        "question": "Which drugs require an independent double-check?",
        "options": [
          "Vitamins and antacids",
          "Insulin and IV opioids",
          "Topical creams",
          "Oral paracetamol"
        ],
        "correctIndex": 1,
        "rationale": "Insulin and IV opioids (and anticoagulants) are high-alert and need a double-check."
      },
      {
        "question": "Antidote for an opioid overdose with respiratory depression:",
        "options": [
          "Flumazenil",
          "Naloxone",
          "Protamine",
          "Vitamin K"
        ],
        "correctIndex": 1,
        "rationale": "Naloxone reverses opioids; flumazenil reverses benzodiazepines."
      },
      {
        "question": "Which insulin may be administered IV?",
        "options": [
          "NPH",
          "Glargine",
          "Regular",
          "Detemir"
        ],
        "correctIndex": 2,
        "rationale": "Only regular (short-acting) insulin is given IV."
      },
      {
        "question": "A patient on an ACE inhibitor reports a persistent dry cough. The nurse knows this is:",
        "options": [
          "An allergic emergency",
          "A known class side effect to report",
          "A sign of infection",
          "Unrelated"
        ],
        "correctIndex": 1,
        "rationale": "Dry cough is a recognised ACE-inhibitor effect; report for possible change to an ARB."
      },
      {
        "question": "Before giving a beta-blocker, the nurse checks:",
        "options": [
          "Temperature only",
          "Heart rate and blood pressure",
          "Blood glucose",
          "Urine output"
        ],
        "correctIndex": 1,
        "rationale": "Hold beta-blockers for bradycardia/hypotension."
      },
      {
        "question": "Warfarin therapy is monitored with:",
        "options": [
          "aPTT",
          "PT/INR",
          "CBC only",
          "Blood glucose"
        ],
        "correctIndex": 1,
        "rationale": "Warfarin is monitored with PT/INR (target 2-3)."
      },
      {
        "question": "A patient on an aminoglycoside should be monitored for:",
        "options": [
          "Hyperglycaemia",
          "Nephrotoxicity and ototoxicity",
          "Weight gain",
          "Cough"
        ],
        "correctIndex": 1,
        "rationale": "Aminoglycosides are nephro- and ototoxic; monitor renal function and levels."
      },
      {
        "question": "Infuse 500 mL over 4 h with macrodrip 15 gtt/mL. Rate (gtt/min)?",
        "options": [
          "~21",
          "~31",
          "~45",
          "~60"
        ],
        "correctIndex": 1,
        "rationale": "(500 x 15)/(4 x 60) = 7500/240 = ~31 gtt/min."
      },
      {
        "question": "A patient on an MAOI should avoid:",
        "options": [
          "Water",
          "Aged cheese and cured meats",
          "Rice",
          "Apples"
        ],
        "correctIndex": 1,
        "rationale": "Tyramine-rich foods can trigger a hypertensive crisis with MAOIs."
      },
      {
        "question": "Acetaminophen (paracetamol) overdose is treated with:",
        "options": [
          "Naloxone",
          "N-acetylcysteine",
          "Vitamin K",
          "Calcium gluconate"
        ],
        "correctIndex": 1,
        "rationale": "N-acetylcysteine is the antidote for acetaminophen toxicity."
      },
      {
        "question": "Medication should be documented:",
        "options": [
          "Before giving it",
          "Immediately after giving it",
          "At end of shift",
          "Only if a problem occurs"
        ],
        "correctIndex": 1,
        "rationale": "Document immediately after administration to keep records accurate."
      },
      {
        "question": "Order 1.5 g; available 500 mg tablets. Give:",
        "options": [
          "2 tablets",
          "3 tablets",
          "1 tablet",
          "4 tablets"
        ],
        "correctIndex": 1,
        "rationale": "1.5 g = 1500 mg; 1500/500 = 3 tablets."
      },
      {
        "question": "A patient develops agitation, fever and hyperreflexia on an SSRI plus another serotonergic drug. Suspect:",
        "options": [
          "Anaphylaxis",
          "Serotonin syndrome",
          "Hypoglycaemia",
          "Normal effect"
        ],
        "correctIndex": 1,
        "rationale": "This triad suggests serotonin syndrome; stop serotonergic agents and treat."
      },
      {
        "question": "The nurse identifies the patient before medication using:",
        "options": [
          "Bed number",
          "Two identifiers (name + DOB/MRN)",
          "Diagnosis",
          "Appearance"
        ],
        "correctIndex": 1,
        "rationale": "Two identifiers are required; room/bed numbers are not acceptable."
      },
      {
        "question": "Which statement about IV potassium is correct?",
        "options": [
          "Give by rapid push",
          "Always dilute and infuse via pump",
          "Give undiluted slowly",
          "Mix with the patient's blood"
        ],
        "correctIndex": 1,
        "rationale": "KCl must be diluted and infused via pump - never pushed."
      },
      {
        "question": "A statin patient reports muscle pain and dark urine. The nurse suspects:",
        "options": [
          "Normal effect",
          "Rhabdomyolysis - report and check CK",
          "Dehydration only",
          "Allergy"
        ],
        "correctIndex": 1,
        "rationale": "Muscle pain with dark urine suggests rhabdomyolysis; hold and report, check creatine kinase."
      },
      {
        "question": "Calculate gtt/min: 1000 mL over 12 h, macrodrip 20 gtt/mL.",
        "options": [
          "~14",
          "~28",
          "~42",
          "~33"
        ],
        "correctIndex": 1,
        "rationale": "(1000 x 20)/(12 x 60) = 20000/720 = ~28 gtt/min."
      },
      {
        "question": "Heparin is monitored with which test?",
        "options": [
          "INR",
          "aPTT",
          "Blood glucose",
          "Lipids"
        ],
        "correctIndex": 1,
        "rationale": "Heparin therapy is monitored with aPTT."
      },
      {
        "question": "Regular insulin given subcutaneously before a meal is timed because its onset is:",
        "options": [
          "8 hours",
          "About 30 minutes",
          "Immediate and lifelong",
          "24 hours"
        ],
        "correctIndex": 1,
        "rationale": "Regular insulin onset is ~30 minutes, so it is given before meals to match glucose rise."
      },
      {
        "question": "A patient weighs 20 kg; order is 10 mg/kg. Total dose?",
        "options": [
          "100 mg",
          "200 mg",
          "20 mg",
          "2000 mg"
        ],
        "correctIndex": 1,
        "rationale": "10 mg/kg x 20 kg = 200 mg."
      },
      {
        "question": "Naloxone is given and the patient improves but becomes drowsy again after 30 minutes. The nurse should:",
        "options": [
          "Do nothing",
          "Reassess and anticipate repeat dosing",
          "Discharge the patient",
          "Give a sedative"
        ],
        "correctIndex": 1,
        "rationale": "Naloxone has a short half-life; opioids may outlast it, so reassess and repeat as ordered."
      },
      {
        "question": "An order reads 0.125 mg; the vial is 0.25 mg/mL. Volume to give?",
        "options": [
          "0.5 mL",
          "1 mL",
          "2 mL",
          "0.25 mL"
        ],
        "correctIndex": 0,
        "rationale": "(0.125/0.25) x 1 mL = 0.5 mL."
      },
      {
        "question": "Before administering a blood-thinner, the nurse should:",
        "options": [
          "Encourage a high-vitamin-K diet",
          "Assess for bleeding and check the relevant clotting test",
          "Give it with aspirin routinely",
          "Skip allergy checks"
        ],
        "correctIndex": 1,
        "rationale": "Assess for bleeding and verify the monitoring test (aPTT/INR) before anticoagulants."
      },
      {
        "question": "Which is the correct nursing action if a drug dose seems unusually high?",
        "options": [
          "Give it as written",
          "Hold, verify with the prescriber and reference, and clarify",
          "Give half",
          "Ask a UAP"
        ],
        "correctIndex": 1,
        "rationale": "Question and verify doses that appear unsafe before administering."
      },
      {
        "question": "Vancomycin trough levels are monitored to:",
        "options": [
          "Increase the dose freely",
          "Ensure efficacy and avoid nephro/ototoxicity",
          "Lower glucose",
          "Speed infusion"
        ],
        "correctIndex": 1,
        "rationale": "Trough monitoring balances effectiveness against nephro- and ototoxicity."
      },
      {
        "question": "A patient refuses a prescribed medication. The nurse should:",
        "options": [
          "Hide it in food",
          "Respect the refusal, document, and notify the prescriber",
          "Force administration",
          "Chart it as given"
        ],
        "correctIndex": 1,
        "rationale": "Patients may refuse; document the refusal and inform the prescriber."
      }
    ]
  },
  {
    "id": "maternity-pediatrics",
    "title": "Maternity Care & Pediatric Nursing",
    "subtitle": "Antenatal/labour care, postpartum haemorrhage, newborn assessment, child development and paediatric safety",
    "category": "Maternity & Child Care",
    "readingTime": "30 min read",
    "examWeight": "~15% of the licensing exam",
    "objectives": [
      "Provide safe antenatal, intrapartum and postpartum care.",
      "Manage postpartum haemorrhage and recognise uterine atony.",
      "Score and interpret APGAR and perform essential newborn care.",
      "Respond to obstetric emergencies and apply paediatric dosing/development safety."
    ],
    "sections": [
      {
        "title": "Antenatal & Intrapartum Care",
        "content": "Routine antenatal assessment screens for risk; intrapartum care monitors mother and fetus.",
        "bullets": [
          "Monitor fetal heart rate (normal 110-160 bpm); late decelerations suggest uteroplacental insufficiency.",
          "Pre-eclampsia: hypertension + proteinuria; watch for headache, visual changes, epigastric pain; magnesium sulfate prevents seizures.",
          "Magnesium toxicity: loss of deep tendon reflexes, respiratory depression - antidote calcium gluconate.",
          "Gestational diabetes increases macrosomia and neonatal hypoglycaemia risk."
        ]
      },
      {
        "title": "Postpartum Haemorrhage (PPH)",
        "content": "PPH is blood loss >500 mL after vaginal birth or >1000 mL after caesarean. Uterine atony is the leading cause.",
        "bullets": [
          "First action for a boggy/atonic uterus: firm fundal massage.",
          "First-line drug oxytocin; second-line methylergonovine (avoid in hypertension); carboprost (avoid in asthma).",
          "Assess fundal tone/position, lochia and vital signs frequently.",
          "Ensure IV access, fluids and prepare blood products."
        ]
      },
      {
        "title": "Newborn Assessment & Care",
        "content": "APGAR at 1 and 5 minutes scores Heart rate, Respiratory effort, Muscle tone, Reflex irritability and Colour (0-2 each).",
        "bullets": [
          "Score 7-10 normal; 4-6 moderate distress (stimulate, oxygen); 0-3 severe (resuscitate).",
          "Priority at birth: maintain airway/breathing and warmth (dry, skin-to-skin, hat).",
          "Normal newborn vitals: HR 120-160, RR 30-60.",
          "Promote breastfeeding and bonding; give vitamin K and eye prophylaxis per policy."
        ]
      },
      {
        "title": "Obstetric Emergencies",
        "content": "Cord prolapse and shoulder dystocia are acute emergencies requiring immediate, specific action.",
        "bullets": [
          "Umbilical cord prolapse: lift the presenting part off the cord with a gloved hand, knee-chest/Trendelenburg, prepare for emergency C-section.",
          "Shoulder dystocia: McRoberts maneuver + suprapubic pressure; fundal pressure is contraindicated.",
          "Placenta previa: painless bright-red bleeding - no vaginal exams.",
          "Abruptio placentae: painful dark bleeding with a rigid uterus."
        ]
      },
      {
        "title": "Pediatric Development & Safety",
        "content": "Paediatric care emphasises weight-based dosing, developmental milestones and airway protection.",
        "bullets": [
          "Doses are weight-based (mg/kg); always verify against safe ranges.",
          "Suspected epiglottitis: never inspect the throat with a tongue blade (laryngospasm risk); keep the child calm, prepare airway equipment.",
          "Dehydration in infants: sunken fontanelle, no tears, decreased wet diapers, lethargy.",
          "Milestones: sits ~6 months, stands/cruises ~9-12 months, walks ~12-15 months."
        ]
      }
    ],
    "flashcards": [
      {
        "question": "First action for a boggy postpartum uterus?",
        "answer": "Firm fundal massage to stimulate contraction."
      },
      {
        "question": "First-line drug for PPH?",
        "answer": "Oxytocin (Pitocin)."
      },
      {
        "question": "PPH drug to avoid in hypertension?",
        "answer": "Methylergonovine (Methergine)."
      },
      {
        "question": "PPH drug to avoid in asthma?",
        "answer": "Carboprost (Hemabate)."
      },
      {
        "question": "What does APGAR assess and when?",
        "answer": "Heart rate, respiratory effort, muscle tone, reflex irritability, colour - at 1 and 5 minutes."
      },
      {
        "question": "APGAR 4-6 indicates and requires?",
        "answer": "Moderate distress - stimulation and oxygen, reassess."
      },
      {
        "question": "Normal fetal heart rate?",
        "answer": "110-160 bpm."
      },
      {
        "question": "Significance of late decelerations?",
        "answer": "Uteroplacental insufficiency - reposition, oxygen, stop oxytocin, notify provider."
      },
      {
        "question": "Immediate action for umbilical cord prolapse?",
        "answer": "Lift the presenting part off the cord, knee-chest/Trendelenburg, prepare for C-section."
      },
      {
        "question": "Maneuver for shoulder dystocia and contraindicated action?",
        "answer": "McRoberts + suprapubic pressure; fundal pressure is contraindicated."
      },
      {
        "question": "Placenta previa hallmark?",
        "answer": "Painless bright-red bleeding; avoid vaginal exams."
      },
      {
        "question": "Abruptio placentae hallmark?",
        "answer": "Painful dark-red bleeding with a rigid, tender uterus."
      },
      {
        "question": "Pre-eclampsia triad signs to watch?",
        "answer": "Hypertension, proteinuria, plus headache/visual changes/epigastric pain."
      },
      {
        "question": "Drug to prevent eclamptic seizures and its antidote?",
        "answer": "Magnesium sulfate; antidote calcium gluconate."
      },
      {
        "question": "Signs of magnesium toxicity?",
        "answer": "Loss of deep tendon reflexes, respiratory depression, decreased urine output."
      },
      {
        "question": "Newborn normal heart rate and respiratory rate?",
        "answer": "HR 120-160 bpm; RR 30-60 breaths/min."
      },
      {
        "question": "Priority newborn care at birth?",
        "answer": "Maintain airway/breathing and prevent heat loss (dry, skin-to-skin, hat)."
      },
      {
        "question": "Why is paediatric dosing weight-based?",
        "answer": "Children require mg/kg dosing checked against safe ranges to avoid toxicity."
      },
      {
        "question": "Action to AVOID in suspected epiglottitis?",
        "answer": "Inspecting the throat with a tongue blade - it can trigger laryngospasm."
      },
      {
        "question": "Signs of dehydration in an infant?",
        "answer": "Sunken fontanelle, no tears, fewer wet diapers, dry mucosa, lethargy."
      },
      {
        "question": "APGAR score for HR 110, slow cry, some flexion, grimace, blue extremities?",
        "answer": "6 (HR 2, Resp 1, Tone 1, Reflex 1, Colour 1)."
      },
      {
        "question": "Gestational diabetes neonatal risk?",
        "answer": "Macrosomia and neonatal hypoglycaemia."
      },
      {
        "question": "When is Rh immunoglobulin (anti-D) typically given?",
        "answer": "To Rh-negative mothers around 28 weeks and after birth of an Rh-positive infant."
      },
      {
        "question": "Normal milestone: when does a child usually walk?",
        "answer": "Around 12-15 months."
      },
      {
        "question": "First priority if a newborn is not breathing well?",
        "answer": "Airway and breathing - stimulate, position, and provide ventilation/resuscitation."
      }
    ],
    "quiz": [
      {
        "question": "A postpartum patient has heavy lochia and a boggy fundus. FIRST action:",
        "options": [
          "Give oxytocin",
          "Massage the fundus",
          "Call the physician",
          "Insert a catheter"
        ],
        "correctIndex": 1,
        "rationale": "Fundal massage is the immediate first action for uterine atony."
      },
      {
        "question": "A pulsating cord is palpated in the vagina. Priority action:",
        "options": [
          "Push the cord back",
          "Apply fundal pressure",
          "Lift the presenting part off the cord, knee-chest position",
          "Encourage pushing"
        ],
        "correctIndex": 2,
        "rationale": "Relieve cord compression and position knee-chest/Trendelenburg; prepare for emergency C-section."
      },
      {
        "question": "A newborn has APGAR 5 at one minute. The nurse should:",
        "options": [
          "Document only",
          "Provide stimulation and oxygen, reassess",
          "Start compressions",
          "Delay the 5-minute score"
        ],
        "correctIndex": 1,
        "rationale": "Score 4-6 needs stimulation and oxygen with reassessment."
      },
      {
        "question": "Methylergonovine is contraindicated in patients with:",
        "options": [
          "Diabetes",
          "Hypertension",
          "Anaemia",
          "Asthma"
        ],
        "correctIndex": 1,
        "rationale": "Methylergonovine causes vasoconstriction and is contraindicated in hypertension."
      },
      {
        "question": "A 4-year-old with drooling, fever and tripod posture (epiglottitis). AVOID:",
        "options": [
          "Humidified oxygen",
          "Keeping the child calm",
          "Examining the throat with a tongue blade",
          "Preparing airway equipment"
        ],
        "correctIndex": 2,
        "rationale": "Throat inspection can cause laryngospasm and airway obstruction."
      },
      {
        "question": "Late decelerations on the fetal monitor indicate:",
        "options": [
          "Head compression",
          "Uteroplacental insufficiency",
          "Normal variability",
          "Cord around neck only"
        ],
        "correctIndex": 1,
        "rationale": "Late decelerations reflect uteroplacental insufficiency; reposition, give O2, stop oxytocin, notify provider."
      },
      {
        "question": "A pre-eclamptic patient on magnesium sulfate loses her deep tendon reflexes. The nurse should:",
        "options": [
          "Increase the magnesium",
          "Stop the infusion and prepare calcium gluconate",
          "Do nothing",
          "Give oxytocin"
        ],
        "correctIndex": 1,
        "rationale": "Absent reflexes signal magnesium toxicity; stop the drug and give the antidote calcium gluconate."
      },
      {
        "question": "Painless, bright-red vaginal bleeding in the third trimester suggests:",
        "options": [
          "Abruptio placentae",
          "Placenta previa",
          "Normal labour",
          "Ruptured uterus"
        ],
        "correctIndex": 1,
        "rationale": "Painless bright-red bleeding is classic for placenta previa; avoid vaginal exams."
      },
      {
        "question": "Painful dark-red bleeding with a rigid uterus suggests:",
        "options": [
          "Placenta previa",
          "Abruptio placentae",
          "Normal show",
          "Cord prolapse"
        ],
        "correctIndex": 1,
        "rationale": "Painful bleeding with a board-like uterus indicates placental abruption."
      },
      {
        "question": "Priority for a newborn immediately after birth:",
        "options": [
          "Weigh the baby",
          "Maintain airway/breathing and warmth",
          "Give a bath",
          "Footprint the baby"
        ],
        "correctIndex": 1,
        "rationale": "Airway, breathing and thermoregulation take priority at birth."
      },
      {
        "question": "Shoulder dystocia is managed with:",
        "options": [
          "Fundal pressure",
          "McRoberts maneuver and suprapubic pressure",
          "Immediate forceps",
          "Maternal pushing only"
        ],
        "correctIndex": 1,
        "rationale": "McRoberts with suprapubic pressure relieves dystocia; fundal pressure is contraindicated."
      },
      {
        "question": "A normal fetal heart rate is:",
        "options": [
          "60-100",
          "110-160",
          "170-200",
          "80-110"
        ],
        "correctIndex": 1,
        "rationale": "Normal FHR is 110-160 bpm."
      },
      {
        "question": "An infant with gestational-diabetic mother is at risk for:",
        "options": [
          "Hyperthermia",
          "Hypoglycaemia",
          "Hypertension",
          "Polycythaemia only"
        ],
        "correctIndex": 1,
        "rationale": "Infants of diabetic mothers commonly develop neonatal hypoglycaemia."
      },
      {
        "question": "Signs of infant dehydration include:",
        "options": [
          "Bulging fontanelle",
          "Sunken fontanelle and no tears",
          "Increased wet diapers",
          "Bounding pulses"
        ],
        "correctIndex": 1,
        "rationale": "Sunken fontanelle, absent tears and fewer wet diapers indicate dehydration."
      },
      {
        "question": "The drug given to prevent eclamptic seizures is:",
        "options": [
          "Oxytocin",
          "Magnesium sulfate",
          "Insulin",
          "Heparin"
        ],
        "correctIndex": 1,
        "rationale": "Magnesium sulfate prevents seizures in pre-eclampsia."
      },
      {
        "question": "A newborn's normal respiratory rate is:",
        "options": [
          "12-20",
          "30-60",
          "60-80",
          "8-12"
        ],
        "correctIndex": 1,
        "rationale": "Newborn RR is 30-60 breaths/min."
      },
      {
        "question": "Rh immunoglobulin is given to:",
        "options": [
          "Rh-positive mothers",
          "Rh-negative mothers around 28 weeks and after delivery of an Rh-positive baby",
          "All newborns",
          "Only fathers"
        ],
        "correctIndex": 1,
        "rationale": "Anti-D prevents Rh sensitisation in Rh-negative mothers."
      },
      {
        "question": "First-line uterotonic for PPH is:",
        "options": [
          "Carboprost",
          "Oxytocin",
          "Methylergonovine",
          "Misoprostol"
        ],
        "correctIndex": 1,
        "rationale": "Oxytocin is first-line; others follow if needed with their contraindications."
      },
      {
        "question": "Carboprost (Hemabate) for PPH is avoided in patients with:",
        "options": [
          "Diabetes",
          "Asthma",
          "Anaemia",
          "Hypothyroidism"
        ],
        "correctIndex": 1,
        "rationale": "Carboprost can cause bronchospasm and is avoided in asthma."
      },
      {
        "question": "A child weighing 15 kg is ordered 10 mg/kg. Total dose:",
        "options": [
          "100 mg",
          "150 mg",
          "15 mg",
          "1500 mg"
        ],
        "correctIndex": 1,
        "rationale": "10 mg/kg x 15 kg = 150 mg."
      },
      {
        "question": "A reassuring sign of fetal wellbeing is:",
        "options": [
          "Late decelerations",
          "Moderate variability with accelerations",
          "Bradycardia",
          "Absent variability"
        ],
        "correctIndex": 1,
        "rationale": "Moderate variability with accelerations indicates fetal wellbeing."
      },
      {
        "question": "The priority assessment after birth of the placenta is:",
        "options": [
          "Newborn weight",
          "Maternal fundal tone and bleeding",
          "Visitor list",
          "Room temperature"
        ],
        "correctIndex": 1,
        "rationale": "Assess fundal tone and lochia to detect early postpartum haemorrhage."
      },
      {
        "question": "A mother on magnesium sulfate must have available at the bedside:",
        "options": [
          "Insulin",
          "Calcium gluconate",
          "Heparin",
          "Naloxone"
        ],
        "correctIndex": 1,
        "rationale": "Calcium gluconate (the antidote) must be readily available during magnesium therapy."
      },
      {
        "question": "An APGAR component is:",
        "options": [
          "Birth weight",
          "Reflex irritability",
          "Head circumference",
          "Blood type"
        ],
        "correctIndex": 1,
        "rationale": "APGAR scores heart rate, respiratory effort, muscle tone, reflex irritability and colour."
      },
      {
        "question": "To reduce neonatal heat loss, the nurse should:",
        "options": [
          "Bathe immediately",
          "Dry the infant, provide skin-to-skin and a hat",
          "Place near a window",
          "Use cold blankets"
        ],
        "correctIndex": 1,
        "rationale": "Drying, skin-to-skin contact and a hat reduce evaporative and convective heat loss."
      },
      {
        "question": "A laboring patient suddenly has a rigid abdomen and dark bleeding. The nurse should:",
        "options": [
          "Encourage ambulation",
          "Notify the provider urgently and prepare for emergency care",
          "Perform a vaginal exam",
          "Offer a meal"
        ],
        "correctIndex": 1,
        "rationale": "This suggests abruptio placentae - an emergency requiring urgent provider notification."
      },
      {
        "question": "Eye prophylaxis and vitamin K for the newborn are given to:",
        "options": [
          "Treat infection already present",
          "Prevent ophthalmia neonatorum and haemorrhagic disease",
          "Sedate the infant",
          "Improve feeding"
        ],
        "correctIndex": 1,
        "rationale": "Eye prophylaxis prevents neonatal conjunctivitis; vitamin K prevents bleeding."
      },
      {
        "question": "During the fourth stage (first hours postpartum), the priority is to:",
        "options": [
          "Discharge quickly",
          "Monitor fundus, lochia and vitals for haemorrhage",
          "Restrict bonding",
          "Withhold fluids"
        ],
        "correctIndex": 1,
        "rationale": "Close monitoring of the fundus, bleeding and vitals detects early PPH."
      },
      {
        "question": "A 6-month-old would typically be able to:",
        "options": [
          "Walk independently",
          "Sit with support and roll over",
          "Run",
          "Speak sentences"
        ],
        "correctIndex": 1,
        "rationale": "At ~6 months an infant sits with support and rolls over."
      },
      {
        "question": "If a newborn is apneic and limp at birth, the FIRST step is to:",
        "options": [
          "Weigh the baby",
          "Stimulate, position the airway and begin resuscitation",
          "Give a bath",
          "Call the family"
        ],
        "correctIndex": 1,
        "rationale": "Airway, stimulation and resuscitation are the immediate priority for a depressed newborn."
      }
    ]
  },
  {
    "id": "critical-emergency",
    "title": "Critical Care & Emergency Nursing",
    "subtitle": "Triage, basic and advanced life support, lethal dysrhythmias, trauma, shock and respiratory failure",
    "category": "Critical Care",
    "readingTime": "30 min read",
    "examWeight": "~10-15% of the licensing exam",
    "objectives": [
      "Apply triage principles to prioritise multiple casualties.",
      "Recognise and respond to lethal cardiac rhythms and perform high-quality CPR.",
      "Manage acute respiratory failure and oxygen therapy safely.",
      "Apply trauma and emergency assessment priorities."
    ],
    "sections": [
      {
        "title": "Triage & Emergency Priorities",
        "content": "Triage sorts patients by urgency; treat the most survivable life threats first using airway-breathing-circulation logic.",
        "bullets": [
          "Emergent (red): immediate life threat - airway obstruction, severe haemorrhage, shock.",
          "Urgent (yellow): serious but can wait briefly.",
          "Non-urgent (green): minor injuries.",
          "Reassess frequently - triage categories change as patients deteriorate or improve."
        ]
      },
      {
        "title": "Cardiac Arrest & Lethal Dysrhythmias",
        "content": "Pulseless rhythms need immediate high-quality CPR and, when shockable, rapid defibrillation.",
        "bullets": [
          "Shockable: ventricular fibrillation (VF) and pulseless VT - defibrillate + CPR.",
          "Non-shockable: asystole and PEA - CPR + epinephrine; treat reversible causes (Hs and Ts).",
          "Defibrillation is unsynchronised; synchronised cardioversion is for unstable rhythms WITH a pulse.",
          "High-quality CPR: 100-120 compressions/min, adequate depth, full recoil, minimal interruptions."
        ]
      },
      {
        "title": "Airway, Breathing & Respiratory Failure",
        "content": "Recognise distress early and escalate oxygen appropriately.",
        "bullets": [
          "Distress signs: rising RR, accessory muscle use, falling SpO2, altered mental status.",
          "Escalate devices: nasal cannula -> simple mask -> non-rebreather -> assisted ventilation.",
          "In severe COPD, titrate oxygen to a target SpO2 to avoid suppressing the hypoxic drive.",
          "A falling LOC in a breathless patient signals fatigue/CO2 retention - prepare to support ventilation."
        ]
      },
      {
        "title": "Trauma & Shock Management",
        "content": "Use a systematic primary survey and control life threats in order.",
        "bullets": [
          "Primary survey: Airway (with C-spine), Breathing, Circulation (control bleeding), Disability, Exposure.",
          "Tension pneumothorax: absent breath sounds, tracheal deviation, distended neck veins - needs decompression.",
          "Control external haemorrhage with direct pressure; treat shock with fluids/blood.",
          "Spinal injury: immobilise and avoid movement until cleared."
        ]
      },
      {
        "title": "Common Emergencies",
        "content": "Rapid recognition saves lives.",
        "bullets": [
          "Stroke (FAST): Face droop, Arm weakness, Speech difficulty, Time - urgent imaging; note last-known-well time.",
          "Anaphylaxis: IM epinephrine first, then airway support, antihistamines and steroids.",
          "Sepsis: early recognition, cultures before antibiotics, fluids, and source control.",
          "Burns: airway assessment for inhalation injury; estimate extent; fluid resuscitation (Parkland)."
        ]
      }
    ],
    "flashcards": [
      {
        "question": "Which cardiac rhythms are shockable?",
        "answer": "Ventricular fibrillation (VF) and pulseless VT; asystole and PEA are non-shockable."
      },
      {
        "question": "Difference between defibrillation and synchronised cardioversion?",
        "answer": "Defibrillation is an unsynchronised shock for pulseless VF/VT; cardioversion is synchronised for unstable rhythms with a pulse."
      },
      {
        "question": "High-quality CPR parameters?",
        "answer": "100-120 compressions/min, adequate depth, full recoil, minimal interruptions."
      },
      {
        "question": "First triage priority?",
        "answer": "The most survivable immediate threat to airway, breathing or circulation (emergent/red)."
      },
      {
        "question": "Order of the trauma primary survey?",
        "answer": "Airway (with C-spine), Breathing, Circulation, Disability, Exposure (ABCDE)."
      },
      {
        "question": "Signs of tension pneumothorax?",
        "answer": "Absent breath sounds, tracheal deviation, distended neck veins, hypotension - needs decompression."
      },
      {
        "question": "FAST stroke assessment?",
        "answer": "Face droop, Arm weakness, Speech difficulty, Time to call for help."
      },
      {
        "question": "First drug in anaphylaxis?",
        "answer": "IM epinephrine."
      },
      {
        "question": "Non-shockable rhythms are treated with?",
        "answer": "CPR and epinephrine while treating reversible causes (Hs and Ts)."
      },
      {
        "question": "When is synchronised cardioversion used?",
        "answer": "For unstable tachydysrhythmias that still have a pulse."
      },
      {
        "question": "Why titrate oxygen carefully in severe COPD?",
        "answer": "To avoid suppressing the hypoxic drive and causing CO2 retention."
      },
      {
        "question": "Early signs of respiratory distress?",
        "answer": "Rising respiratory rate, accessory muscle use, falling SpO2, restlessness/altered LOC."
      },
      {
        "question": "Ominous sign in a breathless patient?",
        "answer": "A falling level of consciousness (fatigue/CO2 retention)."
      },
      {
        "question": "First step for severe external bleeding?",
        "answer": "Apply direct pressure to control haemorrhage."
      },
      {
        "question": "Priority in suspected spinal injury?",
        "answer": "Immobilise and avoid movement until the spine is cleared."
      },
      {
        "question": "Sepsis bundle essentials?",
        "answer": "Early recognition, cultures before antibiotics, fluid resuscitation and source control."
      },
      {
        "question": "Parkland formula purpose?",
        "answer": "Calculates fluid resuscitation volume in major burns (4 mL x kg x %TBSA)."
      },
      {
        "question": "Inhalation injury clues in burns?",
        "answer": "Facial burns, singed nasal hair, soot, hoarseness, stridor - secure the airway early."
      },
      {
        "question": "What is PEA?",
        "answer": "Pulseless electrical activity - organised rhythm on the monitor but no pulse; non-shockable."
      },
      {
        "question": "Compression-to-ventilation ratio for adult one-rescuer CPR?",
        "answer": "30 compressions to 2 breaths."
      },
      {
        "question": "Most reliable confirmation of effective CPR/ROSC trend?",
        "answer": "Rising end-tidal CO2 (capnography) and return of a pulse."
      },
      {
        "question": "Immediate action when a monitored patient becomes pulseless in VF?",
        "answer": "Start CPR and defibrillate as soon as possible."
      },
      {
        "question": "Priority for an unconscious patient who is breathing?",
        "answer": "Protect the airway (recovery position) and monitor."
      },
      {
        "question": "Cushing's triad signals?",
        "answer": "Rising ICP/impending herniation: hypertension with widening pulse pressure, bradycardia, irregular respirations."
      },
      {
        "question": "First action in any emergency assessment?",
        "answer": "Assess and secure the airway (with breathing and circulation)."
      }
    ],
    "quiz": [
      {
        "question": "Monitor shows a chaotic waveform; patient pulseless and apneic. The nurse should:",
        "options": [
          "Synchronised cardioversion",
          "Start CPR and prepare to defibrillate",
          "Give oral medication",
          "Check glucose first"
        ],
        "correctIndex": 1,
        "rationale": "This is VF - a pulseless shockable rhythm needing CPR and defibrillation."
      },
      {
        "question": "Synchronised cardioversion is appropriate for:",
        "options": [
          "Pulseless VT",
          "Ventricular fibrillation",
          "Unstable SVT with a pulse",
          "Asystole"
        ],
        "correctIndex": 2,
        "rationale": "Cardioversion is for unstable rhythms that still have a pulse."
      },
      {
        "question": "Which ED patient is seen FIRST?",
        "options": [
          "A sprained ankle",
          "A sutured laceration",
          "A patient with stridor and difficulty breathing",
          "A migraine"
        ],
        "correctIndex": 2,
        "rationale": "Stridor indicates airway compromise - the top priority."
      },
      {
        "question": "Adult CPR compressions are delivered at:",
        "options": [
          "40-60/min",
          "60-80/min",
          "100-120/min",
          "As fast as possible"
        ],
        "correctIndex": 2,
        "rationale": "High-quality CPR uses 100-120 compressions per minute."
      },
      {
        "question": "Asystole on the monitor is treated with:",
        "options": [
          "Immediate defibrillation",
          "CPR and epinephrine, treat reversible causes",
          "Synchronised cardioversion",
          "Observation"
        ],
        "correctIndex": 1,
        "rationale": "Asystole is non-shockable; provide CPR and epinephrine and address Hs and Ts."
      },
      {
        "question": "A COPD patient given high-flow O2 becomes drowsy and hypoventilates. The nurse should:",
        "options": [
          "Increase O2",
          "Titrate O2 down to a target SpO2 and reassess",
          "Leave to rest",
          "Give a sedative"
        ],
        "correctIndex": 1,
        "rationale": "Excess O2 suppresses the hypoxic drive; titrate down and reassess."
      },
      {
        "question": "Absent breath sounds, tracheal deviation and distended neck veins indicate:",
        "options": [
          "Pneumonia",
          "Tension pneumothorax",
          "Asthma",
          "Anxiety"
        ],
        "correctIndex": 1,
        "rationale": "This is tension pneumothorax - an emergency needing decompression."
      },
      {
        "question": "In the trauma primary survey, what comes FIRST?",
        "options": [
          "Exposure",
          "Airway with C-spine protection",
          "Disability",
          "Circulation"
        ],
        "correctIndex": 1,
        "rationale": "Airway (with cervical spine protection) is first in ABCDE."
      },
      {
        "question": "For severe external haemorrhage, the FIRST action is:",
        "options": [
          "Elevate and observe",
          "Apply direct pressure",
          "Give oral fluids",
          "Obtain consent"
        ],
        "correctIndex": 1,
        "rationale": "Direct pressure is the immediate action to control bleeding."
      },
      {
        "question": "FAST is used to identify:",
        "options": [
          "Heart attack",
          "Stroke",
          "Sepsis",
          "Fracture"
        ],
        "correctIndex": 1,
        "rationale": "FAST (Face, Arm, Speech, Time) screens for stroke."
      },
      {
        "question": "The first medication in anaphylaxis is:",
        "options": [
          "Antihistamine",
          "IM epinephrine",
          "Corticosteroid",
          "Salbutamol"
        ],
        "correctIndex": 1,
        "rationale": "IM epinephrine is given first in anaphylaxis."
      },
      {
        "question": "A reliable sign of return of spontaneous circulation/effective CPR is:",
        "options": [
          "Falling EtCO2",
          "Rising end-tidal CO2 and a palpable pulse",
          "Dilated pupils",
          "Cold skin"
        ],
        "correctIndex": 1,
        "rationale": "A sharp rise in EtCO2 and a pulse indicate ROSC/effective CPR."
      },
      {
        "question": "Adult one-rescuer CPR ratio is:",
        "options": [
          "15:2",
          "30:2",
          "5:1",
          "10:2"
        ],
        "correctIndex": 1,
        "rationale": "One-rescuer adult CPR uses 30 compressions to 2 breaths."
      },
      {
        "question": "Cushing's triad (hypertension with widening pulse pressure, bradycardia, irregular breathing) indicates:",
        "options": [
          "Sepsis",
          "Rising intracranial pressure/herniation",
          "Hypoglycaemia",
          "Anaphylaxis"
        ],
        "correctIndex": 1,
        "rationale": "Cushing's triad is a late, ominous sign of raised ICP."
      },
      {
        "question": "A burn patient with facial burns, soot and hoarseness needs priority attention to the:",
        "options": [
          "Skin only",
          "Airway (inhalation injury)",
          "Diet",
          "Mobility"
        ],
        "correctIndex": 1,
        "rationale": "Inhalation injury threatens the airway; secure it early."
      },
      {
        "question": "PEA is best described as:",
        "options": [
          "A shockable rhythm",
          "An organised rhythm without a pulse",
          "Normal sinus rhythm",
          "Sinus bradycardia"
        ],
        "correctIndex": 1,
        "rationale": "PEA shows electrical activity but no pulse and is non-shockable."
      },
      {
        "question": "The priority for an unconscious, spontaneously breathing patient is to:",
        "options": [
          "Sit them upright",
          "Protect the airway (recovery position) and monitor",
          "Give oral fluids",
          "Restrain them"
        ],
        "correctIndex": 1,
        "rationale": "Protecting the airway prevents aspiration in the unconscious patient."
      },
      {
        "question": "Which is a reversible cause of cardiac arrest (an 'H' or 'T')?",
        "options": [
          "Hyperlipidaemia",
          "Hypoxia",
          "Hypertension",
          "Hyperthyroid history"
        ],
        "correctIndex": 1,
        "rationale": "Hypoxia is a reversible 'H' cause; others include hypovolaemia, hypo/hyperkalemia, tension pneumothorax, tamponade, thrombosis, toxins."
      },
      {
        "question": "During a mass-casualty event, a patient with minor cuts who can walk is tagged:",
        "options": [
          "Red (emergent)",
          "Green (non-urgent)",
          "Black (deceased)",
          "Yellow (urgent)"
        ],
        "correctIndex": 1,
        "rationale": "Walking-wounded with minor injuries are non-urgent (green)."
      },
      {
        "question": "Defibrillation works by:",
        "options": [
          "Pacing the heart",
          "Depolarising the myocardium to allow normal rhythm to resume",
          "Increasing heart rate",
          "Sedating the patient"
        ],
        "correctIndex": 1,
        "rationale": "A defibrillation shock depolarises the myocardium so the sinus node can resume control."
      },
      {
        "question": "A patient in suspected sepsis should have which obtained BEFORE antibiotics?",
        "options": [
          "A meal",
          "Blood cultures",
          "Discharge papers",
          "Physiotherapy"
        ],
        "correctIndex": 1,
        "rationale": "Blood cultures are drawn before antibiotics to identify the organism."
      },
      {
        "question": "The nurse notes SpO2 84% with accessory muscle use. The FIRST action is to:",
        "options": [
          "Document and wait",
          "Apply higher-concentration oxygen and reassess, escalate",
          "Encourage oral fluids",
          "Lay the patient flat"
        ],
        "correctIndex": 1,
        "rationale": "Provide oxygen, position upright, reassess and escalate - hypoxaemia with distress is urgent."
      },
      {
        "question": "Which finding requires immediate defibrillation?",
        "options": [
          "Sinus tachycardia with a pulse",
          "Pulseless ventricular tachycardia",
          "Atrial fibrillation with a pulse",
          "Sinus bradycardia"
        ],
        "correctIndex": 1,
        "rationale": "Pulseless VT is shockable and requires immediate defibrillation."
      },
      {
        "question": "A trauma patient is restless, tachycardic and hypotensive after blunt abdominal injury. Suspect:",
        "options": [
          "Anxiety",
          "Internal haemorrhage/hypovolemic shock",
          "Simple pain",
          "Dehydration only"
        ],
        "correctIndex": 1,
        "rationale": "These signs suggest internal bleeding and hypovolemic shock; act urgently."
      },
      {
        "question": "After defibrillation, the nurse should immediately:",
        "options": [
          "Check a 12-lead first",
          "Resume chest compressions",
          "Stop and observe",
          "Give oral medication"
        ],
        "correctIndex": 1,
        "rationale": "CPR is resumed immediately after a shock to maintain perfusion."
      },
      {
        "question": "The recovery position is used to:",
        "options": [
          "Improve circulation only",
          "Maintain a patent airway in an unconscious breathing patient",
          "Treat shock",
          "Reduce fever"
        ],
        "correctIndex": 1,
        "rationale": "The recovery (left-lateral) position keeps the airway clear and reduces aspiration risk."
      },
      {
        "question": "A patient with a suspected stroke has a last-known-well time 1 hour ago. The priority is to:",
        "options": [
          "Delay imaging",
          "Expedite assessment and CT to determine eligibility for treatment",
          "Give food",
          "Encourage sleep"
        ],
        "correctIndex": 1,
        "rationale": "Time is brain - rapid assessment/imaging determines thrombolysis/thrombectomy eligibility."
      },
      {
        "question": "The nurse should interrupt CPR compressions:",
        "options": [
          "Frequently to rest",
          "As little as possible",
          "Every 30 seconds",
          "Only to chart"
        ],
        "correctIndex": 1,
        "rationale": "Interruptions reduce perfusion; minimise them for high-quality CPR."
      },
      {
        "question": "A patient with major burns receives IV fluids primarily to:",
        "options": [
          "Prevent infection",
          "Maintain circulating volume and perfusion",
          "Improve nutrition",
          "Reduce pain"
        ],
        "correctIndex": 1,
        "rationale": "Large fluid shifts in burns require resuscitation to maintain perfusion (e.g., Parkland formula)."
      },
      {
        "question": "First action when a monitored patient suddenly becomes unresponsive and pulseless:",
        "options": [
          "Call family",
          "Start CPR and activate the code/defibrillator",
          "Document the time only",
          "Give oral glucose"
        ],
        "correctIndex": 1,
        "rationale": "Begin CPR immediately and activate emergency response/defibrillation."
      }
    ]
  },
  {
    "id": "mental-health",
    "title": "Mental Health & Psychiatric Nursing",
    "subtitle": "Therapeutic communication, risk assessment, crisis management and psychopharmacology",
    "category": "Mental Health",
    "readingTime": "30 min read",
    "examWeight": "~10% of the licensing exam",
    "objectives": [
      "Use therapeutic communication techniques and avoid non-therapeutic blocks.",
      "Prioritise safety in suicidal, aggressive and crisis situations.",
      "Manage acute mania, anxiety, depression and psychosis.",
      "Apply key psychiatric medication safety principles."
    ],
    "sections": [
      {
        "title": "Therapeutic Communication",
        "content": "Therapeutic communication builds trust and supports assessment. Acknowledge feelings before facts.",
        "bullets": [
          "Therapeutic: open-ended questions, reflecting, clarifying, offering self, using silence.",
          "Non-therapeutic: false reassurance, giving advice, changing the subject, asking 'why', minimising feelings.",
          "Empathy first - validate the patient's experience.",
          "Maintain a calm, non-judgemental, safe environment."
        ]
      },
      {
        "title": "Safety: Suicide & Aggression",
        "content": "Safety is always the priority in mental-health nursing.",
        "bullets": [
          "Ask directly about suicidal thoughts and a plan - asking does NOT increase risk.",
          "A specific plan and available means = high risk: continuous observation, remove hazards.",
          "For aggression: keep a safe distance, calm voice, reduce stimulation; restraints/seclusion are a last resort with an order.",
          "Acute mania: low-stimulation environment and high-calorie portable foods to meet metabolic needs."
        ]
      },
      {
        "title": "Mood, Anxiety & Psychotic Disorders",
        "content": "Recognise presentations and nursing priorities.",
        "bullets": [
          "Depression: assess suicide risk; energy may improve before mood (a higher-risk period).",
          "Bipolar mania: grandiosity, pressured speech, poor judgement; ensure safety and rest.",
          "Anxiety/panic: stay with the patient, calm low-stimulus environment, slow breathing.",
          "Psychosis: do not argue with delusions/hallucinations; acknowledge feelings and reorient to reality."
        ]
      },
      {
        "title": "Psychopharmacology",
        "content": "Key medication safety points are frequently tested.",
        "bullets": [
          "Lithium: narrow range 0.6-1.2 mEq/L; maintain hydration and stable sodium; toxicity = tremor, GI upset, confusion.",
          "SSRIs: serotonin syndrome (agitation, hyperthermia, hyperreflexia).",
          "Antipsychotics: extrapyramidal symptoms; neuroleptic malignant syndrome (high fever, rigidity, altered consciousness) is an emergency.",
          "MAOIs: avoid tyramine-rich foods to prevent hypertensive crisis; benzodiazepine dependence/withdrawal risk."
        ]
      },
      {
        "title": "Substance Use & Crisis",
        "content": "Recognise withdrawal and apply crisis principles.",
        "bullets": [
          "Alcohol withdrawal: tremor, tachycardia, hallucinations, seizures; delirium tremens is life-threatening; benzodiazepines used.",
          "Opioid overdose: respiratory depression, pinpoint pupils - naloxone.",
          "Crisis intervention is short-term, focused on safety and coping.",
          "Therapeutic milieu and de-escalation reduce the need for restraint."
        ]
      }
    ],
    "flashcards": [
      {
        "question": "Is it safe to ask directly about suicidal thoughts?",
        "answer": "Yes; asking does not increase risk and allows accurate assessment and protection."
      },
      {
        "question": "Highest-risk suicide profile?",
        "answer": "A specific plan with available means - requires continuous observation."
      },
      {
        "question": "Therapeutic lithium level?",
        "answer": "0.6-1.2 mEq/L (narrow therapeutic range)."
      },
      {
        "question": "Early signs of lithium toxicity?",
        "answer": "Fine tremor, nausea/diarrhoea and confusion."
      },
      {
        "question": "Two non-therapeutic communication blocks?",
        "answer": "False reassurance and giving advice (also 'why' questions and changing the subject)."
      },
      {
        "question": "Diet/lifestyle advice for lithium?",
        "answer": "Maintain adequate hydration and a stable, normal sodium intake."
      },
      {
        "question": "How to manage acute mania environment?",
        "answer": "Low-stimulation setting with high-calorie portable foods."
      },
      {
        "question": "Neuroleptic malignant syndrome features?",
        "answer": "High fever, severe muscle rigidity, autonomic instability, altered consciousness - an emergency."
      },
      {
        "question": "Serotonin syndrome features?",
        "answer": "Agitation, hyperthermia, hyperreflexia, autonomic instability."
      },
      {
        "question": "MAOI dietary restriction?",
        "answer": "Avoid tyramine-rich foods (aged cheese, cured meats) to prevent hypertensive crisis."
      },
      {
        "question": "How to respond to a patient's hallucination?",
        "answer": "Do not argue; acknowledge the feeling and gently reorient to reality."
      },
      {
        "question": "Why is improving energy in depression a higher-risk period?",
        "answer": "The patient may regain the energy to act on suicidal thoughts before mood fully lifts."
      },
      {
        "question": "First nursing approach to an aggressive patient?",
        "answer": "Maintain a safe distance, speak calmly, reduce stimulation; restraints are a last resort."
      },
      {
        "question": "Extrapyramidal symptoms include?",
        "answer": "Tremor, rigidity, akathisia, dystonia and tardive dyskinesia."
      },
      {
        "question": "Delirium tremens is?",
        "answer": "A life-threatening alcohol-withdrawal state with confusion, agitation, autonomic instability and seizures."
      },
      {
        "question": "Drug class used for alcohol withdrawal?",
        "answer": "Benzodiazepines."
      },
      {
        "question": "Opioid overdose signs and antidote?",
        "answer": "Respiratory depression and pinpoint pupils; antidote naloxone."
      },
      {
        "question": "Therapeutic use of silence?",
        "answer": "Allows the patient time to reflect and continue at their own pace."
      },
      {
        "question": "Crisis intervention focus?",
        "answer": "Short-term, safety-focused support to restore coping."
      },
      {
        "question": "Best response to a delusion of persecution?",
        "answer": "Acknowledge the feeling without reinforcing or arguing the false belief."
      },
      {
        "question": "Antidote for benzodiazepine overdose?",
        "answer": "Flumazenil (used cautiously)."
      },
      {
        "question": "Sign that an SSRI may be causing a dangerous reaction?",
        "answer": "Agitation, fever and hyperreflexia (serotonin syndrome) - stop and treat."
      },
      {
        "question": "Restraint/seclusion criteria?",
        "answer": "Imminent danger to self/others, least-restrictive option, time-limited order, frequent monitoring."
      },
      {
        "question": "Empathy in communication means?",
        "answer": "Acknowledging and validating the patient's feelings before facts."
      },
      {
        "question": "Priority assessment for any psychiatric patient?",
        "answer": "Safety - risk of harm to self or others."
      }
    ],
    "quiz": [
      {
        "question": "A patient says, 'There's no point anymore.' The BEST response is:",
        "options": [
          "'Don't talk like that.'",
          "'Are you having thoughts of harming yourself?'",
          "'Why do you feel that way?'",
          "'Let's discuss something positive.'"
        ],
        "correctIndex": 1,
        "rationale": "Directly assessing suicidal ideation is therapeutic and essential for safety."
      },
      {
        "question": "A patient on lithium has vomiting, coarse tremor and confusion. This suggests:",
        "options": [
          "Therapeutic effect",
          "Lithium toxicity",
          "An allergy",
          "Normal side effects"
        ],
        "correctIndex": 1,
        "rationale": "These indicate lithium toxicity; hold the dose, check the level and notify the physician."
      },
      {
        "question": "Priority for an acutely manic, pacing patient:",
        "options": [
          "A group activity",
          "Low-stimulation environment and portable high-calorie food",
          "Restraints",
          "Public confrontation"
        ],
        "correctIndex": 1,
        "rationale": "Reducing stimulation calms mania; portable food meets metabolic demands while active."
      },
      {
        "question": "Which is therapeutic communication?",
        "options": [
          "'I'm sure it'll be fine.'",
          "'If I were you...'",
          "'You seem worried; tell me more.'",
          "'Why are you upset?'"
        ],
        "correctIndex": 2,
        "rationale": "Reflecting feeling and inviting elaboration is therapeutic."
      },
      {
        "question": "Antipsychotic patient develops high fever, rigidity and altered consciousness. Recognise:",
        "options": [
          "Sedation",
          "Neuroleptic malignant syndrome",
          "Mild dystonia",
          "Caffeine withdrawal"
        ],
        "correctIndex": 1,
        "rationale": "This is NMS - stop the drug and treat as a medical emergency."
      },
      {
        "question": "The MOST important assessment for a depressed patient is:",
        "options": [
          "Sleep pattern",
          "Risk of suicide",
          "Appetite",
          "Hobbies"
        ],
        "correctIndex": 1,
        "rationale": "Safety - suicide risk - is the priority assessment."
      },
      {
        "question": "Lithium patients should be taught to:",
        "options": [
          "Restrict all fluids",
          "Maintain hydration and stable salt intake",
          "Take with grapefruit",
          "Skip doses when well"
        ],
        "correctIndex": 1,
        "rationale": "Stable fluid and sodium intake keep lithium levels safe."
      },
      {
        "question": "A patient reports hearing voices telling him he is worthless. The nurse should:",
        "options": [
          "Argue the voices are not real",
          "Acknowledge his fear and assess for command hallucinations/safety",
          "Ignore it",
          "Tell him to stop listening"
        ],
        "correctIndex": 1,
        "rationale": "Acknowledge feelings, assess content (especially command hallucinations) and ensure safety."
      },
      {
        "question": "When a patient is escalating toward aggression, the nurse should FIRST:",
        "options": [
          "Touch them to reassure",
          "Maintain a safe distance and use a calm voice in a low-stimulus setting",
          "Apply restraints",
          "Raise their voice"
        ],
        "correctIndex": 1,
        "rationale": "De-escalation with space and calm is first; restraints are a last resort."
      },
      {
        "question": "Which food must a patient on an MAOI avoid?",
        "options": [
          "Water",
          "Aged cheese",
          "Rice",
          "Bananas in moderation"
        ],
        "correctIndex": 1,
        "rationale": "Tyramine-rich aged cheese can cause a hypertensive crisis with MAOIs."
      },
      {
        "question": "Improvement of energy before mood lifts in depression is concerning because:",
        "options": [
          "It means recovery is complete",
          "The patient may now have energy to act on suicidal thoughts",
          "It is unrelated to risk",
          "Medication has failed"
        ],
        "correctIndex": 1,
        "rationale": "This is a higher-risk window for suicide attempts; maintain vigilance."
      },
      {
        "question": "A patient in alcohol withdrawal becomes confused with tremor and tachycardia. This may progress to:",
        "options": [
          "Mania",
          "Delirium tremens",
          "Serotonin syndrome",
          "NMS"
        ],
        "correctIndex": 1,
        "rationale": "Severe alcohol withdrawal can progress to life-threatening delirium tremens."
      },
      {
        "question": "First-line medication class for alcohol withdrawal is:",
        "options": [
          "Opioids",
          "Benzodiazepines",
          "Antipsychotics only",
          "Stimulants"
        ],
        "correctIndex": 1,
        "rationale": "Benzodiazepines are used to manage alcohol withdrawal and prevent seizures."
      },
      {
        "question": "A patient with a delusion insists staff are poisoning him. The nurse should:",
        "options": [
          "Agree to build trust",
          "Argue with evidence",
          "Acknowledge the feeling without reinforcing the belief",
          "Avoid the patient"
        ],
        "correctIndex": 2,
        "rationale": "Acknowledge the underlying feeling (fear) without confirming or arguing the delusion."
      },
      {
        "question": "Extrapyramidal side effects of antipsychotics include:",
        "options": [
          "Hypertension",
          "Tremor, rigidity and akathisia",
          "Hyperglycaemia",
          "Diarrhoea"
        ],
        "correctIndex": 1,
        "rationale": "EPS include parkinsonism (tremor/rigidity), akathisia and dystonia."
      },
      {
        "question": "A patient with panic-level anxiety needs the nurse to:",
        "options": [
          "Leave them alone",
          "Stay with them, reduce stimuli and guide slow breathing",
          "Give detailed teaching now",
          "Encourage a crowd"
        ],
        "correctIndex": 1,
        "rationale": "Staying present, reducing stimuli and slow breathing help a panicking patient."
      },
      {
        "question": "Serotonin syndrome is caused by:",
        "options": [
          "Too little serotonin",
          "Excess serotonergic activity, often from drug combinations",
          "Low blood sugar",
          "Dehydration only"
        ],
        "correctIndex": 1,
        "rationale": "Excess serotonergic activity (e.g., combined serotonergic drugs) causes serotonin syndrome."
      },
      {
        "question": "A suicidal patient with a detailed plan and access to means requires:",
        "options": [
          "Discharge with follow-up",
          "Continuous one-to-one observation and removal of means",
          "A group session",
          "No special action"
        ],
        "correctIndex": 1,
        "rationale": "High-risk patients need continuous observation and a safe environment."
      },
      {
        "question": "Naloxone is used to reverse:",
        "options": [
          "Benzodiazepine overdose",
          "Opioid overdose",
          "Lithium toxicity",
          "Alcohol withdrawal"
        ],
        "correctIndex": 1,
        "rationale": "Naloxone reverses opioid-induced respiratory depression."
      },
      {
        "question": "Which response best uses silence therapeutically?",
        "options": [
          "Filling every pause with advice",
          "Allowing a pause so the patient can reflect and continue",
          "Leaving the room",
          "Changing the topic"
        ],
        "correctIndex": 1,
        "rationale": "Therapeutic silence gives the patient space to reflect and continue."
      },
      {
        "question": "A patient on an SSRI plus another serotonergic drug develops fever and hyperreflexia. The nurse should:",
        "options": [
          "Continue both drugs",
          "Stop serotonergic agents and notify the physician",
          "Give more SSRI",
          "Encourage exercise"
        ],
        "correctIndex": 1,
        "rationale": "Suspected serotonin syndrome requires stopping the offending agents and urgent management."
      },
      {
        "question": "The therapeutic milieu aims to:",
        "options": [
          "Isolate patients",
          "Provide a safe, structured, healing environment",
          "Maximise stimulation",
          "Replace medication"
        ],
        "correctIndex": 1,
        "rationale": "A therapeutic milieu offers a safe, structured environment that supports recovery."
      },
      {
        "question": "A manic patient has not eaten for a day due to constant activity. The nurse should provide:",
        "options": [
          "A formal sit-down multi-course meal",
          "Portable high-calorie finger foods",
          "Only fluids",
          "Nothing until calm"
        ],
        "correctIndex": 1,
        "rationale": "Finger foods allow nutrition intake while the patient remains active."
      },
      {
        "question": "Which statement is non-therapeutic?",
        "options": [
          "'Tell me more about that.'",
          "'Everything happens for a reason.'",
          "'You sound frustrated.'",
          "'I'm here to listen.'"
        ],
        "correctIndex": 1,
        "rationale": "'Everything happens for a reason' minimises feelings and is non-therapeutic."
      },
      {
        "question": "Before administering an antipsychotic long-term, the nurse monitors for:",
        "options": [
          "Hair growth",
          "Metabolic effects and movement disorders (EPS/tardive dyskinesia)",
          "Improved vision",
          "Lowered cholesterol"
        ],
        "correctIndex": 1,
        "rationale": "Long-term antipsychotics require monitoring for metabolic effects and movement disorders."
      },
      {
        "question": "A patient experiencing a flashback (PTSD) is best helped by:",
        "options": [
          "Restraining immediately",
          "Grounding techniques and reorientation to the present and safety",
          "Leaving them alone",
          "Arguing it is not real"
        ],
        "correctIndex": 1,
        "rationale": "Grounding and reorientation to present safety help during a flashback."
      },
      {
        "question": "The priority when a patient threatens another patient is to:",
        "options": [
          "Document later",
          "Ensure the safety of others and de-escalate, intervening per policy",
          "Ignore unless contact occurs",
          "Discharge the patient"
        ],
        "correctIndex": 1,
        "rationale": "Protecting others and safe de-escalation are the immediate priority."
      },
      {
        "question": "Which is true about confidentiality in psychiatry?",
        "options": [
          "It never applies",
          "It applies, but may be broken if there is a serious risk of harm to self or others",
          "It applies only to physicians",
          "It is optional"
        ],
        "correctIndex": 1,
        "rationale": "Confidentiality applies but may be overridden when there is a serious, imminent risk of harm."
      },
      {
        "question": "A patient refuses medication and is not an imminent danger. The nurse should:",
        "options": [
          "Force the medication",
          "Respect the right to refuse, document and notify the prescriber",
          "Hide it in food",
          "Discharge immediately"
        ],
        "correctIndex": 1,
        "rationale": "A competent patient may refuse medication unless legal criteria for involuntary treatment are met."
      },
      {
        "question": "Which intervention reduces the need for restraint?",
        "options": [
          "Maximising noise",
          "Early de-escalation and a calm environment",
          "Confrontation",
          "Isolation without monitoring"
        ],
        "correctIndex": 1,
        "rationale": "Early de-escalation and a calm milieu reduce the need for restraint."
      }
    ]
  },
  {
    "id": "infection-community",
    "title": "Infection Control & Community Health",
    "subtitle": "Isolation precautions, asepsis, immunisation, notifiable diseases and public-health priorities",
    "category": "Infection Control",
    "readingTime": "30 min read",
    "examWeight": "~10% of the licensing exam",
    "objectives": [
      "Apply correct standard and transmission-based precautions.",
      "Differentiate medical and surgical asepsis and prevent HAIs.",
      "Outline UAE immunisation and notifiable-disease principles.",
      "Apply community and public-health nursing concepts."
    ],
    "sections": [
      {
        "title": "Standard & Transmission-Based Precautions",
        "content": "Standard precautions apply to all patients; transmission-based precautions are added by route of spread.",
        "bullets": [
          "Airborne (TB, measles, varicella): negative-pressure room + fit-tested N95.",
          "Droplet (influenza, meningococcus, pertussis): surgical mask within ~1-2 m; private room preferred.",
          "Contact (MRSA, C. difficile): gown and gloves; dedicated equipment; soap and water for C. difficile spores.",
          "Standard precautions (hand hygiene, PPE, safe sharps) apply to every patient, every time."
        ]
      },
      {
        "title": "Asepsis & PPE",
        "content": "Medical asepsis reduces microorganisms (clean technique); surgical asepsis eliminates them (sterile technique).",
        "bullets": [
          "Sterile field: the outer 2.5 cm of a drape and anything below waist/out of sight is contaminated.",
          "Don PPE: gown, mask, goggles, gloves. Doff carefully, removing the most contaminated first, with hand hygiene.",
          "Sterile-to-sterile contact only; keep sterile items above the waist and in view.",
          "Hand hygiene before and after gloves - gloves do not replace it."
        ]
      },
      {
        "title": "Healthcare-Associated Infection (HAI) Prevention",
        "content": "Device-related infections are major safety targets.",
        "bullets": [
          "CLABSI: chlorhexidine antisepsis, full barrier precautions, daily review of line necessity.",
          "CAUTI: insert catheters only when indicated and remove early; maintain a closed system.",
          "VAP: head of bed 30-45 degrees, oral care, sedation breaks.",
          "Surgical-site infection: aseptic technique, glucose control, timely prophylactic antibiotics."
        ]
      },
      {
        "title": "Immunisation & Notifiable Diseases",
        "content": "Prevention is central to community health. UAE newborns receive early vaccines and certain diseases are reportable.",
        "bullets": [
          "UAE newborns typically receive BCG (TB) and the first hepatitis B dose before discharge.",
          "Live vaccines (MMR, varicella) are avoided in pregnancy and significant immunosuppression.",
          "Notifiable communicable diseases must be reported to preventive medicine, usually within 24 hours.",
          "Herd immunity protects the vulnerable when coverage is high."
        ]
      },
      {
        "title": "Community & Public Health",
        "content": "Community nursing focuses on prevention, screening and health promotion.",
        "bullets": [
          "Primary prevention: prevent disease (immunisation, education). Secondary: early detection (screening). Tertiary: limit complications (rehabilitation).",
          "Health promotion targets chronic disease (diabetes, hypertension, obesity) common in the region.",
          "Epidemiology tracks incidence/prevalence to guide public-health action.",
          "Cultural sensitivity improves engagement and adherence."
        ]
      }
    ],
    "flashcards": [
      {
        "question": "Precautions for active pulmonary TB?",
        "answer": "Airborne: negative-pressure room and a fit-tested N95 respirator."
      },
      {
        "question": "Why use soap and water for C. difficile?",
        "answer": "Alcohol gel does not kill spores; mechanical washing removes them."
      },
      {
        "question": "Droplet precaution PPE and distance?",
        "answer": "Surgical mask within ~1-2 metres; private room preferred."
      },
      {
        "question": "Contact precaution PPE?",
        "answer": "Gown and gloves with dedicated/disposable equipment."
      },
      {
        "question": "Two vaccines for UAE newborns before discharge?",
        "answer": "BCG (tuberculosis) and the first hepatitis B dose."
      },
      {
        "question": "Difference between medical and surgical asepsis?",
        "answer": "Medical asepsis reduces microorganisms (clean); surgical asepsis eliminates them (sterile)."
      },
      {
        "question": "Which part of a sterile drape is contaminated?",
        "answer": "The outer 2.5 cm border, plus anything below the waist or out of sight."
      },
      {
        "question": "Single most effective HAI prevention measure?",
        "answer": "Hand hygiene."
      },
      {
        "question": "Key measures to prevent CLABSI?",
        "answer": "Chlorhexidine antisepsis, full barrier precautions, and daily review of line need."
      },
      {
        "question": "Key measures to prevent CAUTI?",
        "answer": "Insert only when indicated, remove early, and maintain a closed drainage system."
      },
      {
        "question": "Key measures to prevent VAP?",
        "answer": "Head of bed 30-45 degrees, oral care, and sedation breaks."
      },
      {
        "question": "Vaccines to avoid in pregnancy?",
        "answer": "Live vaccines such as MMR and varicella."
      },
      {
        "question": "When are notifiable diseases reported?",
        "answer": "To preventive medicine, usually within 24 hours."
      },
      {
        "question": "What is herd immunity?",
        "answer": "Protection of the unvaccinated/vulnerable when a high proportion of the population is immune."
      },
      {
        "question": "Primary prevention examples?",
        "answer": "Immunisation and health education to prevent disease occurring."
      },
      {
        "question": "Secondary prevention examples?",
        "answer": "Screening for early detection (e.g., blood pressure, blood glucose, cancer screening)."
      },
      {
        "question": "Tertiary prevention examples?",
        "answer": "Rehabilitation and managing complications of established disease."
      },
      {
        "question": "Order to don PPE?",
        "answer": "Gown, mask, goggles/face shield, then gloves."
      },
      {
        "question": "Why perform hand hygiene even after glove removal?",
        "answer": "Gloves can have micro-tears and hands can be contaminated during removal."
      },
      {
        "question": "Airborne diseases requiring N95?",
        "answer": "Tuberculosis, measles, and varicella (chickenpox)."
      },
      {
        "question": "Droplet-spread diseases?",
        "answer": "Influenza, pertussis, and meningococcal disease."
      },
      {
        "question": "Contact-spread organisms?",
        "answer": "MRSA, VRE, and C. difficile."
      },
      {
        "question": "Definition of an HAI?",
        "answer": "An infection acquired in a healthcare facility that was not present or incubating on admission."
      },
      {
        "question": "What does epidemiology study?",
        "answer": "The distribution and determinants of health/disease in populations (incidence and prevalence)."
      },
      {
        "question": "Most important step before and after every patient contact?",
        "answer": "Hand hygiene."
      }
    ],
    "quiz": [
      {
        "question": "A patient with suspected active TB requires:",
        "options": [
          "Standard precautions only",
          "Droplet with a surgical mask",
          "Airborne: negative-pressure room and N95",
          "Contact with gown and gloves"
        ],
        "correctIndex": 2,
        "rationale": "TB is airborne - negative pressure and a fit-tested N95 are required."
      },
      {
        "question": "For a patient with C. difficile, the nurse should:",
        "options": [
          "Use alcohol gel only",
          "Wash with soap and water and use contact precautions",
          "Use airborne precautions",
          "Use no precautions"
        ],
        "correctIndex": 1,
        "rationale": "C. difficile spores resist alcohol; soap-and-water plus contact precautions are required."
      },
      {
        "question": "The single most effective measure to prevent HAIs is:",
        "options": [
          "Gowns",
          "Hand hygiene",
          "Routine antibiotics",
          "Room disinfection"
        ],
        "correctIndex": 1,
        "rationale": "Hand hygiene is the most effective single intervention."
      },
      {
        "question": "Which breaks the sterile field?",
        "options": [
          "Items above waist level",
          "A sterile item touching the drape edge",
          "Facing the field",
          "Holding items in front"
        ],
        "correctIndex": 1,
        "rationale": "The outer 2.5 cm of the drape is contaminated."
      },
      {
        "question": "A confirmed measles case must be:",
        "options": [
          "Kept confidential",
          "Reported to preventive medicine",
          "Discharged at once",
          "Reported after recovery"
        ],
        "correctIndex": 1,
        "rationale": "Measles is a notifiable disease requiring prompt public-health reporting."
      },
      {
        "question": "Influenza requires which precautions?",
        "options": [
          "Airborne",
          "Droplet",
          "Contact only",
          "None"
        ],
        "correctIndex": 1,
        "rationale": "Influenza spreads by droplets - a surgical mask within ~1-2 m and a private room are preferred."
      },
      {
        "question": "UAE newborns typically receive which vaccines before discharge?",
        "options": [
          "MMR and DTaP",
          "BCG and hepatitis B",
          "Varicella and polio",
          "Influenza and HPV"
        ],
        "correctIndex": 1,
        "rationale": "BCG and the first hepatitis B dose are given to newborns."
      },
      {
        "question": "Which vaccine is contraindicated in pregnancy?",
        "options": [
          "Inactivated influenza",
          "Tetanus toxoid",
          "MMR (live)",
          "Hepatitis B"
        ],
        "correctIndex": 2,
        "rationale": "Live vaccines such as MMR are avoided in pregnancy."
      },
      {
        "question": "To prevent ventilator-associated pneumonia, the nurse should:",
        "options": [
          "Lay the patient flat",
          "Elevate the head of bed 30-45 degrees and provide oral care",
          "Avoid sedation breaks",
          "Stop suctioning"
        ],
        "correctIndex": 1,
        "rationale": "Head-of-bed elevation, oral care and sedation breaks reduce VAP."
      },
      {
        "question": "To prevent CAUTI, the nurse should:",
        "options": [
          "Keep the catheter as long as possible",
          "Remove the catheter as early as clinically appropriate",
          "Open the system frequently",
          "Place the bag above the bladder"
        ],
        "correctIndex": 1,
        "rationale": "Early removal and a closed system reduce catheter-associated UTI; keep the bag below bladder level."
      },
      {
        "question": "Primary prevention is best illustrated by:",
        "options": [
          "Mammography screening",
          "Immunisation and health education",
          "Stroke rehabilitation",
          "Wound care"
        ],
        "correctIndex": 1,
        "rationale": "Primary prevention stops disease before it occurs (e.g., vaccination, education)."
      },
      {
        "question": "Screening a population for high blood pressure is:",
        "options": [
          "Primary prevention",
          "Secondary prevention",
          "Tertiary prevention",
          "Not prevention"
        ],
        "correctIndex": 1,
        "rationale": "Screening for early detection is secondary prevention."
      },
      {
        "question": "Cardiac rehabilitation after a heart attack is:",
        "options": [
          "Primary prevention",
          "Secondary prevention",
          "Tertiary prevention",
          "Health promotion only"
        ],
        "correctIndex": 2,
        "rationale": "Limiting complications of established disease is tertiary prevention."
      },
      {
        "question": "The correct order to don PPE is:",
        "options": [
          "Gloves, gown, mask",
          "Gown, mask, goggles, gloves",
          "Mask, gloves, gown",
          "Goggles, gloves, gown"
        ],
        "correctIndex": 1,
        "rationale": "Don gown, then mask, then goggles/face shield, then gloves."
      },
      {
        "question": "Hand hygiene after glove removal is needed because:",
        "options": [
          "It is optional",
          "Gloves may have micro-tears and hands can be contaminated during doffing",
          "Gloves are sterile always",
          "It wastes time"
        ],
        "correctIndex": 1,
        "rationale": "Gloves do not replace hand hygiene; hands may be contaminated."
      },
      {
        "question": "Varicella (chickenpox) requires which precautions?",
        "options": [
          "Contact only",
          "Droplet only",
          "Airborne (and contact)",
          "Standard only"
        ],
        "correctIndex": 2,
        "rationale": "Varicella is spread by the airborne route (with contact precautions for lesions)."
      },
      {
        "question": "Herd immunity protects:",
        "options": [
          "Only the vaccinated",
          "The unvaccinated and vulnerable when coverage is high",
          "No one",
          "Only adults"
        ],
        "correctIndex": 1,
        "rationale": "High vaccination coverage indirectly protects those who cannot be vaccinated."
      },
      {
        "question": "An HAI is defined as an infection that:",
        "options": [
          "Was present on admission",
          "Was acquired in the facility and not incubating on admission",
          "Only occurs at home",
          "Is never preventable"
        ],
        "correctIndex": 1,
        "rationale": "HAIs are acquired in healthcare and were not present/incubating on admission."
      },
      {
        "question": "Which organism is spread by contact and needs gown/gloves?",
        "options": [
          "Tuberculosis",
          "Measles",
          "MRSA",
          "Influenza"
        ],
        "correctIndex": 2,
        "rationale": "MRSA is contact-spread and requires gown and gloves."
      },
      {
        "question": "To maintain a sterile field, sterile items must be kept:",
        "options": [
          "Below the waist",
          "Above the waist and within sight",
          "Behind the nurse",
          "On the floor"
        ],
        "correctIndex": 1,
        "rationale": "Sterile items are kept above the waist and in continuous view."
      },
      {
        "question": "A nurse with a productive cough and fever should:",
        "options": [
          "Work as normal",
          "Report and follow occupational-health/return-to-work policy",
          "Hide symptoms",
          "Only wear gloves"
        ],
        "correctIndex": 1,
        "rationale": "Symptomatic staff must report to occupational health to prevent transmission."
      },
      {
        "question": "The best way to prevent surgical-site infection includes:",
        "options": [
          "Skipping antibiotics",
          "Aseptic technique, glucose control and timely prophylactic antibiotics",
          "Shaving with a razor immediately",
          "Leaving wounds open"
        ],
        "correctIndex": 1,
        "rationale": "Asepsis, glycaemic control and correctly timed prophylaxis reduce SSIs."
      },
      {
        "question": "A meningococcal meningitis patient requires:",
        "options": [
          "Airborne precautions",
          "Droplet precautions",
          "No precautions",
          "Contact only"
        ],
        "correctIndex": 1,
        "rationale": "Meningococcus is droplet-spread; use a surgical mask and a private room."
      },
      {
        "question": "After caring for a C. difficile patient, the nurse should:",
        "options": [
          "Use alcohol rub and move on",
          "Wash hands with soap and water",
          "Skip hand hygiene",
          "Re-use the gown"
        ],
        "correctIndex": 1,
        "rationale": "Soap-and-water washing physically removes C. difficile spores."
      },
      {
        "question": "Epidemiology helps public health by:",
        "options": [
          "Treating individuals only",
          "Tracking incidence and prevalence to guide interventions",
          "Replacing vaccination",
          "Ignoring populations"
        ],
        "correctIndex": 1,
        "rationale": "Epidemiology studies disease patterns to direct public-health action."
      },
      {
        "question": "When removing PPE, the nurse should remove the gloves:",
        "options": [
          "Last",
          "First (most contaminated), then perform hand hygiene as indicated",
          "Never",
          "With teeth"
        ],
        "correctIndex": 1,
        "rationale": "Gloves (most contaminated) are typically removed first during doffing, with hand hygiene as indicated."
      },
      {
        "question": "A community health nurse promoting healthy diet and exercise is performing:",
        "options": [
          "Tertiary prevention",
          "Health promotion / primary prevention",
          "Acute care",
          "Screening"
        ],
        "correctIndex": 1,
        "rationale": "Promoting healthy behaviours to prevent disease is primary prevention/health promotion."
      },
      {
        "question": "Which patient needs a negative-pressure room?",
        "options": [
          "A patient with MRSA",
          "A patient with influenza",
          "A patient with active pulmonary TB",
          "A patient with a UTI"
        ],
        "correctIndex": 2,
        "rationale": "Active pulmonary TB (airborne) requires a negative-pressure room and N95."
      },
      {
        "question": "The purpose of standard precautions is to:",
        "options": [
          "Apply only to infected patients",
          "Protect against blood/body fluids for ALL patients",
          "Replace transmission-based precautions",
          "Be used only in surgery"
        ],
        "correctIndex": 1,
        "rationale": "Standard precautions protect against blood and body fluids for every patient."
      },
      {
        "question": "A patient on contact precautions is transferred to radiology. The nurse should:",
        "options": [
          "Skip notifying radiology",
          "Communicate the precautions and ensure they are maintained during transport",
          "Remove all PPE first",
          "Cancel the test"
        ],
        "correctIndex": 1,
        "rationale": "Precautions continue during transport; receiving departments must be informed."
      }
    ]
  }
];

export const MOCK_QUESTIONS: Question[] = [
  {
    "id": 1,
    "question": "Before administering any medication, the nurse must verify the patient's identity using:",
    "options": [
      "The room and bed number",
      "Two identifiers such as full name and date of birth",
      "The diagnosis on the chart",
      "The patient's appearance"
    ],
    "correctIndex": 1,
    "rationale": "Two identifiers (e.g., name and DOB/MRN) are required; room/bed numbers are not acceptable identifiers.",
    "category": "Patient Safety",
    "examType": "DHA"
  },
  {
    "id": 2,
    "question": "A nurse is caring for four patients. Which should be assessed FIRST?",
    "options": [
      "A patient awaiting discharge teaching",
      "A patient with new onset shortness of breath and SpO2 85%",
      "A patient requesting pain medication",
      "A patient asking for a meal tray"
    ],
    "correctIndex": 1,
    "rationale": "Airway/breathing problems are the highest priority; new dyspnoea with hypoxaemia is life-threatening.",
    "category": "Prioritisation",
    "examType": "DHA"
  },
  {
    "id": 3,
    "question": "Which is the single most effective measure to prevent healthcare-associated infection?",
    "options": [
      "Wearing gloves at all times",
      "Hand hygiene",
      "Routine antibiotic use",
      "Daily room disinfection"
    ],
    "correctIndex": 1,
    "rationale": "Hand hygiene is the most effective single intervention to prevent infection transmission.",
    "category": "Infection Control",
    "examType": "DHA"
  },
  {
    "id": 4,
    "question": "An immobile patient should be repositioned at least every:",
    "options": [
      "8 hours",
      "2 hours",
      "12 hours",
      "30 minutes"
    ],
    "correctIndex": 1,
    "rationale": "Repositioning at least every 2 hours prevents pressure injuries.",
    "category": "Fundamentals",
    "examType": "DHA"
  },
  {
    "id": 5,
    "question": "A confused older patient repeatedly tries to climb out of bed. The FIRST nursing action is to:",
    "options": [
      "Apply wrist restraints",
      "Use least-restrictive measures: bed alarm, frequent rounding, move near the station",
      "Sedate the patient",
      "Raise all four side rails"
    ],
    "correctIndex": 1,
    "rationale": "Least-restrictive interventions are tried before restraints, which are a last resort.",
    "category": "Patient Safety",
    "examType": "DHA"
  },
  {
    "id": 6,
    "question": "To prevent aspiration during and after feeding, the nurse positions the patient:",
    "options": [
      "Supine flat",
      "Upright at 90 degrees (high-Fowler's)",
      "Trendelenburg",
      "Flat on the left side"
    ],
    "correctIndex": 1,
    "rationale": "Sitting upright reduces aspiration risk during and after meals.",
    "category": "Fundamentals",
    "examType": "DHA"
  },
  {
    "id": 7,
    "question": "Normal adult oxygen saturation on room air is:",
    "options": [
      "85-90%",
      "95-100%",
      "75-85%",
      "100% only"
    ],
    "correctIndex": 1,
    "rationale": "Normal SpO2 is 95-100%; below 90% indicates significant hypoxaemia.",
    "category": "Assessment",
    "examType": "DHA"
  },
  {
    "id": 8,
    "question": "A patient with serum potassium of 6.9 mEq/L and peaked T-waves should FIRST receive:",
    "options": [
      "Oral potassium",
      "IV calcium gluconate",
      "A potassium-sparing diuretic",
      "Normal saline only"
    ],
    "correctIndex": 1,
    "rationale": "Calcium gluconate stabilises the myocardium first; insulin/dextrose or Kayexalate then lower potassium.",
    "category": "Fluid & Electrolytes",
    "examType": "DHA"
  },
  {
    "id": 9,
    "question": "When infusing IV potassium chloride, the nurse must:",
    "options": [
      "Give a rapid IV push",
      "Dilute it and infuse via an electronic pump",
      "Push it undiluted over one minute",
      "Mix it with blood"
    ],
    "correctIndex": 1,
    "rationale": "Concentrated KCl is never pushed; it must be diluted and infused slowly via a pump to prevent fatal dysrhythmias.",
    "category": "Pharmacology Safety",
    "examType": "DHA"
  },
  {
    "id": 10,
    "question": "A post-operative patient has BP 86/58, HR 124, cool clammy skin and low urine output. The priority is to:",
    "options": [
      "Give an antipyretic",
      "Restore circulating volume and identify the source of bleeding",
      "Place in reverse Trendelenburg",
      "Restrict fluids"
    ],
    "correctIndex": 1,
    "rationale": "These indicate hypovolemic shock; restore volume (fluids/blood) and control the source.",
    "category": "Shock",
    "examType": "DHA"
  },
  {
    "id": 11,
    "question": "Which ECG change is most characteristic of severe hyperkalemia?",
    "options": [
      "Flat T-waves",
      "Tall, peaked T-waves with widening QRS",
      "ST elevation only",
      "U-waves"
    ],
    "correctIndex": 1,
    "rationale": "Hyperkalemia causes tall peaked T-waves, PR prolongation and QRS widening.",
    "category": "Cardiac",
    "examType": "DHA"
  },
  {
    "id": 12,
    "question": "A COPD patient on high-flow oxygen becomes drowsy with slow, shallow breathing. The nurse should:",
    "options": [
      "Increase the oxygen further",
      "Reduce oxygen to a controlled target SpO2 and reassess",
      "Allow the patient to sleep",
      "Administer a sedative"
    ],
    "correctIndex": 1,
    "rationale": "Excess oxygen can suppress the hypoxic drive in CO2 retainers; titrate to target and reassess.",
    "category": "Respiratory",
    "examType": "DHA"
  },
  {
    "id": 13,
    "question": "Arterial blood gas: pH 7.30, PaCO2 55, HCO3 24. This indicates:",
    "options": [
      "Respiratory alkalosis",
      "Respiratory acidosis",
      "Metabolic acidosis",
      "Metabolic alkalosis"
    ],
    "correctIndex": 1,
    "rationale": "Low pH with high CO2 (normal HCO3) is uncompensated respiratory acidosis.",
    "category": "Acid-Base",
    "examType": "DHA"
  },
  {
    "id": 14,
    "question": "A hemodialysis patient has an AV fistula in the left arm. The nurse should:",
    "options": [
      "Take blood pressure in that arm",
      "Avoid BP and venipuncture in that arm and check for a thrill/bruit",
      "Start an IV in that arm",
      "Keep the arm dependent"
    ],
    "correctIndex": 1,
    "rationale": "Protect the fistula: no BP/venipuncture in that arm; patency is confirmed by a palpable thrill and audible bruit.",
    "category": "Renal",
    "examType": "DHA"
  },
  {
    "id": 15,
    "question": "A patient with a myocardial infarction is given aspirin to:",
    "options": [
      "Reduce fever",
      "Inhibit platelet aggregation and limit clot extension",
      "Lower blood glucose",
      "Provide sedation"
    ],
    "correctIndex": 1,
    "rationale": "Aspirin's antiplatelet action limits thrombus extension in acute coronary syndrome.",
    "category": "Cardiac",
    "examType": "DHA"
  },
  {
    "id": 16,
    "question": "Hypotension, muffled heart sounds and jugular venous distension (Beck's triad) indicate:",
    "options": [
      "Pneumothorax",
      "Cardiac tamponade",
      "Pulmonary embolism",
      "Myocardial infarction"
    ],
    "correctIndex": 1,
    "rationale": "Beck's triad indicates cardiac tamponade; prepare for pericardiocentesis.",
    "category": "Cardiac",
    "examType": "DHA"
  },
  {
    "id": 17,
    "question": "The earliest sign of increased intracranial pressure is:",
    "options": [
      "A fixed dilated pupil",
      "Decerebrate posturing",
      "A change in level of consciousness",
      "Cushing's triad"
    ],
    "correctIndex": 2,
    "rationale": "An altered level of consciousness is the earliest, most sensitive sign; the others are late.",
    "category": "Neurology",
    "examType": "DHA"
  },
  {
    "id": 18,
    "question": "A type 1 diabetic presents with glucose 26 mmol/L, ketones and deep rapid (Kussmaul) breathing. This is:",
    "options": [
      "Hypoglycaemia",
      "Diabetic ketoacidosis",
      "Hyperthyroidism",
      "Normal"
    ],
    "correctIndex": 1,
    "rationale": "Hyperglycaemia with ketones and Kussmaul respirations indicates DKA.",
    "category": "Endocrine",
    "examType": "DHA"
  },
  {
    "id": 19,
    "question": "During insulin therapy for DKA, the nurse closely monitors:",
    "options": [
      "Calcium",
      "Potassium",
      "Sodium only",
      "Magnesium"
    ],
    "correctIndex": 1,
    "rationale": "Insulin shifts potassium into cells, risking hypokalemia; monitor closely.",
    "category": "Endocrine",
    "examType": "DHA"
  },
  {
    "id": 20,
    "question": "A conscious patient has a blood glucose of 3.1 mmol/L. The nurse should give:",
    "options": [
      "IV insulin",
      "15 g of fast-acting carbohydrate, then recheck",
      "Nothing by mouth",
      "A long-acting carbohydrate only"
    ],
    "correctIndex": 1,
    "rationale": "Treat hypoglycaemia with fast-acting carbohydrate and recheck in 15 minutes.",
    "category": "Endocrine",
    "examType": "DHA"
  },
  {
    "id": 21,
    "question": "Infuse 1000 mL over 8 hours. What pump rate (mL/hr) is set?",
    "options": [
      "100 mL/hr",
      "125 mL/hr",
      "150 mL/hr",
      "83 mL/hr"
    ],
    "correctIndex": 1,
    "rationale": "1000 mL / 8 h = 125 mL/hr.",
    "category": "Dosage Calculation",
    "examType": "DHA"
  },
  {
    "id": 22,
    "question": "The antidote for heparin overdose is:",
    "options": [
      "Vitamin K",
      "Protamine sulfate",
      "Naloxone",
      "Flumazenil"
    ],
    "correctIndex": 1,
    "rationale": "Protamine sulfate reverses heparin; vitamin K reverses warfarin.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 23,
    "question": "Before administering digoxin, the nurse counts an apical pulse of 52 bpm. The nurse should:",
    "options": [
      "Give the dose",
      "Hold the dose and notify the physician",
      "Give half the dose",
      "Recheck in 4 hours and give"
    ],
    "correctIndex": 1,
    "rationale": "Hold digoxin for an apical pulse below 60 bpm and notify the physician.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 24,
    "question": "Order: 250 mg; available 125 mg/5 mL. The nurse administers:",
    "options": [
      "5 mL",
      "10 mL",
      "2.5 mL",
      "12.5 mL"
    ],
    "correctIndex": 1,
    "rationale": "(250/125) x 5 mL = 10 mL.",
    "category": "Dosage Calculation",
    "examType": "DHA"
  },
  {
    "id": 25,
    "question": "Warfarin therapy is monitored using:",
    "options": [
      "aPTT",
      "PT/INR",
      "Blood glucose",
      "CBC only"
    ],
    "correctIndex": 1,
    "rationale": "Warfarin is monitored with PT/INR (target 2-3); heparin uses aPTT.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 26,
    "question": "A patient on an ACE inhibitor reports a persistent dry cough. The nurse recognises this as:",
    "options": [
      "An allergic emergency",
      "A known class side effect to report",
      "A sign of pneumonia",
      "Unrelated to the drug"
    ],
    "correctIndex": 1,
    "rationale": "Dry cough is a recognised ACE-inhibitor effect; report for possible change to an ARB.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 27,
    "question": "Which medications require an independent double-check before administration?",
    "options": [
      "Vitamins and antacids",
      "Insulin and IV opioids",
      "Topical creams",
      "Oral paracetamol"
    ],
    "correctIndex": 1,
    "rationale": "Insulin, IV opioids and anticoagulants are high-alert drugs requiring an independent double-check.",
    "category": "Pharmacology Safety",
    "examType": "DHA"
  },
  {
    "id": 28,
    "question": "A postpartum patient has heavy lochia and a soft, boggy uterus. The FIRST action is to:",
    "options": [
      "Administer oxytocin",
      "Perform fundal massage",
      "Notify the physician",
      "Insert a urinary catheter"
    ],
    "correctIndex": 1,
    "rationale": "Fundal massage is the immediate first action for uterine atony.",
    "category": "Maternity",
    "examType": "DHA"
  },
  {
    "id": 29,
    "question": "Methylergonovine (Methergine) for postpartum haemorrhage is contraindicated in patients with:",
    "options": [
      "Diabetes",
      "Hypertension",
      "Anaemia",
      "Asthma"
    ],
    "correctIndex": 1,
    "rationale": "Methylergonovine causes vasoconstriction and is contraindicated in hypertension.",
    "category": "Maternity",
    "examType": "DHA"
  },
  {
    "id": 30,
    "question": "A pulsating umbilical cord is palpated in the vagina. The priority action is to:",
    "options": [
      "Push the cord back in",
      "Lift the presenting part off the cord and place the mother knee-chest",
      "Apply fundal pressure",
      "Encourage pushing"
    ],
    "correctIndex": 1,
    "rationale": "Relieve cord compression and position knee-chest/Trendelenburg; prepare for emergency caesarean.",
    "category": "Obstetric Emergency",
    "examType": "DHA"
  },
  {
    "id": 31,
    "question": "APGAR is assessed at:",
    "options": [
      "Birth and 30 minutes",
      "1 and 5 minutes after birth",
      "5 and 10 minutes",
      "Only at 10 minutes"
    ],
    "correctIndex": 1,
    "rationale": "APGAR is scored at 1 and 5 minutes (and repeated if low).",
    "category": "Newborn",
    "examType": "DHA"
  },
  {
    "id": 32,
    "question": "A pre-eclamptic patient on magnesium sulfate loses her deep tendon reflexes. The nurse should:",
    "options": [
      "Increase the magnesium",
      "Stop the infusion and prepare calcium gluconate",
      "Take no action",
      "Give oxytocin"
    ],
    "correctIndex": 1,
    "rationale": "Absent reflexes signal magnesium toxicity; stop the drug and give the antidote calcium gluconate.",
    "category": "Maternity",
    "examType": "DHA"
  },
  {
    "id": 33,
    "question": "A 4-year-old presents with drooling, high fever and a tripod posture (suspected epiglottitis). The nurse must AVOID:",
    "options": [
      "Giving humidified oxygen",
      "Keeping the child calm on the parent's lap",
      "Inspecting the throat with a tongue depressor",
      "Preparing airway equipment"
    ],
    "correctIndex": 2,
    "rationale": "Throat inspection can trigger laryngospasm and complete airway obstruction.",
    "category": "Pediatrics",
    "examType": "DHA"
  },
  {
    "id": 34,
    "question": "Which finding indicates moderate dehydration in an infant?",
    "options": [
      "Bulging fontanelle",
      "Sunken fontanelle, no tears, fewer wet diapers",
      "Increased urine output",
      "Bounding pulses"
    ],
    "correctIndex": 1,
    "rationale": "Sunken fontanelle, absent tears and decreased wet diapers indicate dehydration.",
    "category": "Pediatrics",
    "examType": "DHA"
  },
  {
    "id": 35,
    "question": "A child weighing 18 kg is ordered a drug at 10 mg/kg. The total dose is:",
    "options": [
      "100 mg",
      "180 mg",
      "18 mg",
      "1800 mg"
    ],
    "correctIndex": 1,
    "rationale": "10 mg/kg x 18 kg = 180 mg.",
    "category": "Pediatric Dosage",
    "examType": "DHA"
  },
  {
    "id": 36,
    "question": "Paediatric medication doses are calculated based on:",
    "options": [
      "Age only",
      "Body weight (mg/kg) verified against safe ranges",
      "Height only",
      "The adult dose halved"
    ],
    "correctIndex": 1,
    "rationale": "Paediatric dosing is weight-based and checked against safe ranges to avoid toxicity.",
    "category": "Pediatrics",
    "examType": "DHA"
  },
  {
    "id": 37,
    "question": "The monitor shows a chaotic, irregular waveform; the patient is pulseless and apneic. The nurse should:",
    "options": [
      "Perform synchronised cardioversion",
      "Begin CPR and defibrillate as soon as possible",
      "Give oral medication",
      "Check blood glucose first"
    ],
    "correctIndex": 1,
    "rationale": "This is ventricular fibrillation, a pulseless shockable rhythm requiring CPR and defibrillation.",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 38,
    "question": "Adult CPR chest compressions are delivered at a rate of:",
    "options": [
      "40-60/min",
      "60-80/min",
      "100-120/min",
      "As fast as possible"
    ],
    "correctIndex": 2,
    "rationale": "High-quality CPR uses 100-120 compressions per minute.",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 39,
    "question": "The first medication given in anaphylaxis is:",
    "options": [
      "An antihistamine",
      "IM epinephrine",
      "A corticosteroid",
      "Salbutamol"
    ],
    "correctIndex": 1,
    "rationale": "IM epinephrine is administered first in anaphylaxis.",
    "category": "Emergency",
    "examType": "DHA"
  },
  {
    "id": 40,
    "question": "In a trauma primary survey, which is addressed FIRST?",
    "options": [
      "Exposure",
      "Airway with cervical spine protection",
      "Disability",
      "Circulation"
    ],
    "correctIndex": 1,
    "rationale": "Airway with C-spine protection is first in the ABCDE primary survey.",
    "category": "Trauma",
    "examType": "DHA"
  },
  {
    "id": 41,
    "question": "FAST is used to rapidly identify:",
    "options": [
      "Myocardial infarction",
      "Stroke",
      "Sepsis",
      "Fracture"
    ],
    "correctIndex": 1,
    "rationale": "FAST (Face, Arm, Speech, Time) screens for stroke.",
    "category": "Emergency",
    "examType": "DHA"
  },
  {
    "id": 42,
    "question": "A patient states, 'There is no point in living anymore.' The nurse's BEST response is:",
    "options": [
      "'Do not talk like that.'",
      "'Are you having thoughts of harming or killing yourself?'",
      "'Why do you feel that way?'",
      "'Let us discuss something positive.'"
    ],
    "correctIndex": 1,
    "rationale": "Directly and calmly assessing suicidal ideation is therapeutic and essential for safety.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 43,
    "question": "A patient on lithium develops vomiting, coarse tremor and confusion. The nurse suspects:",
    "options": [
      "Therapeutic effect",
      "Lithium toxicity",
      "An allergic reaction",
      "Normal side effects"
    ],
    "correctIndex": 1,
    "rationale": "These indicate lithium toxicity; hold the dose, check the level and notify the physician.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 44,
    "question": "The priority intervention for an acutely manic, pacing patient is to:",
    "options": [
      "Place the patient in a group activity",
      "Provide a low-stimulation environment and portable high-calorie food",
      "Apply restraints",
      "Confront the patient firmly"
    ],
    "correctIndex": 1,
    "rationale": "Reducing stimulation calms mania; portable food meets metabolic demands while the patient is active.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 45,
    "question": "Which response is an example of therapeutic communication?",
    "options": [
      "'I am sure everything will be fine.'",
      "'You seem worried; tell me more about what you are feeling.'",
      "'If I were you, I would...'",
      "'Why are you so upset?'"
    ],
    "correctIndex": 1,
    "rationale": "Reflecting feeling and inviting elaboration is therapeutic; the others are non-therapeutic blocks.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 46,
    "question": "A patient with suspected active pulmonary tuberculosis requires:",
    "options": [
      "Standard precautions only",
      "Droplet precautions with a surgical mask",
      "Airborne precautions: negative-pressure room and N95",
      "Contact precautions with gown and gloves"
    ],
    "correctIndex": 2,
    "rationale": "TB is airborne and requires a negative-pressure room and a fit-tested N95 respirator.",
    "category": "Infection Control",
    "examType": "DHA"
  },
  {
    "id": 47,
    "question": "For a patient with Clostridioides difficile, the nurse should:",
    "options": [
      "Use alcohol hand gel only",
      "Wash hands with soap and water and use contact precautions",
      "Use airborne precautions",
      "Use no precautions"
    ],
    "correctIndex": 1,
    "rationale": "C. difficile spores resist alcohol; soap-and-water washing plus contact precautions are required.",
    "category": "Infection Control",
    "examType": "DHA"
  },
  {
    "id": 48,
    "question": "Screening a community for high blood pressure is an example of:",
    "options": [
      "Primary prevention",
      "Secondary prevention",
      "Tertiary prevention",
      "Not prevention"
    ],
    "correctIndex": 1,
    "rationale": "Screening for early detection is secondary prevention.",
    "category": "Community Health",
    "examType": "DHA"
  },
  {
    "id": 49,
    "question": "A competent adult refuses a recommended blood transfusion. The nurse should:",
    "options": [
      "Administer it because it is life-saving",
      "Respect the refusal, document it, and notify the physician",
      "Ask the family to consent",
      "Wait until the patient is unconscious"
    ],
    "correctIndex": 1,
    "rationale": "A competent adult may refuse treatment; respect autonomy, document, and notify the physician.",
    "category": "Ethics",
    "examType": "DHA"
  },
  {
    "id": 50,
    "question": "Which task is appropriate to delegate to an unlicensed assistive personnel (UAP)?",
    "options": [
      "Assessing a new admission",
      "Administering oral medication",
      "Assisting a stable patient to ambulate",
      "Teaching wound care"
    ],
    "correctIndex": 2,
    "rationale": "Routine ambulation of a stable patient is delegable; assessment, medication and teaching require the nurse.",
    "category": "Delegation",
    "examType": "DHA"
  },
  {
    "id": 51,
    "question": "A nurse believes a prescribed order is unsafe. The most appropriate action is to:",
    "options": [
      "Carry out the order to avoid conflict",
      "Question and clarify the order, escalating if it remains unsafe",
      "Ignore the order silently",
      "Ask a UAP to perform it"
    ],
    "correctIndex": 1,
    "rationale": "As a patient advocate, the nurse clarifies and escalates unsafe orders through the chain of command.",
    "category": "Professional Practice",
    "examType": "DHA"
  },
  {
    "id": 52,
    "question": "Under MOHAP national immunisation policy, which vaccines are given to a healthy newborn before discharge?",
    "options": [
      "MMR and DTaP",
      "BCG and the first hepatitis B dose",
      "Varicella and IPV",
      "Influenza and HPV"
    ],
    "correctIndex": 1,
    "rationale": "UAE newborns receive BCG (tuberculosis) and the first hepatitis B dose before discharge.",
    "category": "Community Health",
    "examType": "MOH"
  },
  {
    "id": 53,
    "question": "The nurse is preparing to administer medications. The correct number of patient identifiers is:",
    "options": [
      "One",
      "Two",
      "Three",
      "None if the nurse knows the patient"
    ],
    "correctIndex": 1,
    "rationale": "At least two identifiers (e.g., name and DOB/MRN) must be verified.",
    "category": "Patient Safety",
    "examType": "MOH"
  },
  {
    "id": 54,
    "question": "Which finding requires the nurse to act immediately?",
    "options": [
      "Temperature 37.0 C",
      "Respiratory rate 10 and shallow with SpO2 87%",
      "Heart rate 78 bpm",
      "Blood pressure 122/80"
    ],
    "correctIndex": 1,
    "rationale": "Hypoventilation with hypoxaemia is an airway/breathing emergency.",
    "category": "Prioritisation",
    "examType": "MOH"
  },
  {
    "id": 55,
    "question": "Standard precautions apply to:",
    "options": [
      "Only patients with a known infection",
      "Every patient, every time",
      "Only ICU patients",
      "Only during invasive procedures"
    ],
    "correctIndex": 1,
    "rationale": "Standard precautions are used for all patients regardless of diagnosis.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 56,
    "question": "After a needle-stick injury, the nurse's immediate FIRST action is to:",
    "options": [
      "Check the patient's HIV status",
      "Wash the site with soap and running water",
      "Squeeze the wound to bleed it",
      "Apply a tourniquet"
    ],
    "correctIndex": 1,
    "rationale": "Wash the puncture immediately with soap and water; do not squeeze. Reporting and PEP follow.",
    "category": "Occupational Safety",
    "examType": "MOH"
  },
  {
    "id": 57,
    "question": "A patient on bed rest should be encouraged to perform which to prevent venous thromboembolism?",
    "options": [
      "Strict immobility",
      "Leg/ankle exercises, early mobilisation and hydration",
      "Crossing the legs",
      "Knee gatching"
    ],
    "correctIndex": 1,
    "rationale": "Leg exercises, early mobility and hydration reduce DVT risk during immobility.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 58,
    "question": "The correct order to assess the abdomen is:",
    "options": [
      "Inspect, palpate, percuss, auscultate",
      "Inspect, auscultate, percuss, palpate",
      "Palpate first",
      "Percuss first"
    ],
    "correctIndex": 1,
    "rationale": "For the abdomen, auscultate before percussion and palpation to avoid altering bowel sounds.",
    "category": "Assessment",
    "examType": "MOH"
  },
  {
    "id": 59,
    "question": "A patient with severe COPD is prescribed low-flow oxygen. The nurse titrates to a target SpO2 of:",
    "options": [
      "100%",
      "88-92%",
      "Below 85%",
      "Exactly 95%"
    ],
    "correctIndex": 1,
    "rationale": "In chronic CO2 retainers, oxygen is titrated to ~88-92% to avoid suppressing the hypoxic drive.",
    "category": "Respiratory",
    "examType": "MOH"
  },
  {
    "id": 60,
    "question": "Which is a classic sign of hypocalcemia?",
    "options": [
      "Tall peaked T-waves",
      "Positive Chvostek's and Trousseau's signs",
      "Warm flushed skin",
      "Bounding pulses"
    ],
    "correctIndex": 1,
    "rationale": "Hypocalcemia increases neuromuscular excitability, causing positive Chvostek's/Trousseau's signs and tetany.",
    "category": "Fluid & Electrolytes",
    "examType": "MOH"
  },
  {
    "id": 61,
    "question": "A patient vomiting persistently for three days is most likely to develop:",
    "options": [
      "Metabolic acidosis",
      "Metabolic alkalosis",
      "Respiratory acidosis",
      "Respiratory alkalosis"
    ],
    "correctIndex": 1,
    "rationale": "Loss of gastric acid from vomiting causes metabolic alkalosis.",
    "category": "Acid-Base",
    "examType": "MOH"
  },
  {
    "id": 62,
    "question": "Sudden dyspnoea, pleuritic chest pain and tachycardia in a post-operative patient suggest:",
    "options": [
      "Pneumonia",
      "Pulmonary embolism",
      "Asthma",
      "Anxiety"
    ],
    "correctIndex": 1,
    "rationale": "This classic picture suggests pulmonary embolism; give oxygen and anticipate anticoagulation.",
    "category": "Respiratory",
    "examType": "MOH"
  },
  {
    "id": 63,
    "question": "A patient with chronic kidney disease has a potassium of 6.5 mEq/L. The nurse anticipates:",
    "options": [
      "Encouraging a high-potassium diet",
      "Calcium gluconate and measures to lower potassium",
      "Withholding all treatment",
      "A potassium infusion"
    ],
    "correctIndex": 1,
    "rationale": "Hyperkalemia is treated by stabilising the heart (calcium gluconate) and shifting/removing potassium.",
    "category": "Renal",
    "examType": "MOH"
  },
  {
    "id": 64,
    "question": "Before administering a beta-blocker, the nurse assesses:",
    "options": [
      "Temperature only",
      "Heart rate and blood pressure",
      "Blood glucose",
      "Urine specific gravity"
    ],
    "correctIndex": 1,
    "rationale": "Hold beta-blockers for bradycardia or hypotension.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 65,
    "question": "A patient with acute asthma has a 'silent chest' on auscultation. This indicates:",
    "options": [
      "Improvement",
      "Severe, life-threatening obstruction",
      "A normal finding",
      "Anxiety"
    ],
    "correctIndex": 1,
    "rationale": "A silent chest means no air movement, signalling severe bronchospasm and impending respiratory failure.",
    "category": "Respiratory",
    "examType": "MOH"
  },
  {
    "id": 66,
    "question": "Which dietary instruction is correct for a patient on warfarin?",
    "options": [
      "Eat large amounts of leafy greens daily",
      "Maintain a consistent intake of vitamin K-containing foods",
      "Avoid all protein",
      "Double the dose if a meal is missed"
    ],
    "correctIndex": 1,
    "rationale": "Consistent vitamin K intake keeps the INR stable; large swings interfere with warfarin.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 67,
    "question": "A patient with a chest tube has continuous bubbling in the water-seal chamber. This suggests:",
    "options": [
      "Normal lung re-expansion",
      "An air leak in the system",
      "The lung has fully re-expanded",
      "The tube should be clamped"
    ],
    "correctIndex": 1,
    "rationale": "Continuous bubbling in the water-seal chamber indicates an air leak that must be investigated.",
    "category": "Respiratory",
    "examType": "MOH"
  },
  {
    "id": 68,
    "question": "The priority for a patient with upper gastrointestinal bleeding is to:",
    "options": [
      "Give oral iron",
      "Maintain the airway, replace volume, and monitor for shock",
      "Encourage ambulation",
      "Provide a large meal"
    ],
    "correctIndex": 1,
    "rationale": "Airway protection, fluid/blood replacement and shock monitoring are priorities in GI bleeding.",
    "category": "Gastrointestinal",
    "examType": "MOH"
  },
  {
    "id": 69,
    "question": "Signs of digoxin toxicity include:",
    "options": [
      "Hypertension and diarrhoea",
      "Nausea, visual halos and bradycardia",
      "Hyperglycaemia",
      "Hair loss"
    ],
    "correctIndex": 1,
    "rationale": "Digoxin toxicity causes nausea, visual disturbances (halos) and bradycardia/dysrhythmias.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 70,
    "question": "A patient with cirrhosis and rising ammonia develops confusion. The nurse anticipates administering:",
    "options": [
      "A high-protein supplement",
      "Lactulose",
      "An antacid",
      "A diuretic bolus"
    ],
    "correctIndex": 1,
    "rationale": "Lactulose lowers ammonia by promoting its excretion in hepatic encephalopathy.",
    "category": "Gastrointestinal",
    "examType": "MOH"
  },
  {
    "id": 71,
    "question": "After a thyroidectomy, the nurse keeps which at the bedside for emergency airway obstruction or tetany?",
    "options": [
      "A glucometer",
      "A tracheostomy set and calcium gluconate",
      "An insulin pen",
      "A nebuliser only"
    ],
    "correctIndex": 1,
    "rationale": "Post-thyroidectomy risks include airway swelling and hypocalcemic tetany; keep a trach set and calcium ready.",
    "category": "Endocrine",
    "examType": "MOH"
  },
  {
    "id": 72,
    "question": "Order: infuse 500 mL over 4 hours with a macrodrip set of 15 gtt/mL. The rate is approximately:",
    "options": [
      "21 gtt/min",
      "31 gtt/min",
      "45 gtt/min",
      "60 gtt/min"
    ],
    "correctIndex": 1,
    "rationale": "(500 x 15)/(4 x 60) = 7500/240 = ~31 gtt/min.",
    "category": "Dosage Calculation",
    "examType": "MOH"
  },
  {
    "id": 73,
    "question": "The antidote for an opioid overdose with respiratory depression is:",
    "options": [
      "Flumazenil",
      "Naloxone",
      "Protamine sulfate",
      "Vitamin K"
    ],
    "correctIndex": 1,
    "rationale": "Naloxone reverses opioids; flumazenil reverses benzodiazepines.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 74,
    "question": "Which insulin can be administered intravenously?",
    "options": [
      "NPH",
      "Glargine",
      "Regular",
      "Detemir"
    ],
    "correctIndex": 2,
    "rationale": "Only regular (short-acting) insulin may be given IV.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 75,
    "question": "Order: 1.5 g; available 500 mg tablets. The nurse gives:",
    "options": [
      "1 tablet",
      "2 tablets",
      "3 tablets",
      "4 tablets"
    ],
    "correctIndex": 2,
    "rationale": "1.5 g = 1500 mg; 1500/500 = 3 tablets.",
    "category": "Dosage Calculation",
    "examType": "MOH"
  },
  {
    "id": 76,
    "question": "A patient on an aminoglycoside antibiotic must be monitored for:",
    "options": [
      "Hyperglycaemia",
      "Nephrotoxicity and ototoxicity",
      "Weight gain",
      "Cough"
    ],
    "correctIndex": 1,
    "rationale": "Aminoglycosides are nephro- and ototoxic; monitor renal function and drug levels.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 77,
    "question": "Acetaminophen (paracetamol) overdose is treated with:",
    "options": [
      "Naloxone",
      "N-acetylcysteine",
      "Vitamin K",
      "Calcium gluconate"
    ],
    "correctIndex": 1,
    "rationale": "N-acetylcysteine is the antidote for acetaminophen toxicity.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 78,
    "question": "Medication should be documented:",
    "options": [
      "Before administration",
      "Immediately after administration",
      "At the end of the shift",
      "Only if an error occurs"
    ],
    "correctIndex": 1,
    "rationale": "Document immediately after administration to keep records accurate.",
    "category": "Pharmacology Safety",
    "examType": "MOH"
  },
  {
    "id": 79,
    "question": "First-line uterotonic medication for postpartum haemorrhage is:",
    "options": [
      "Carboprost",
      "Oxytocin",
      "Methylergonovine",
      "Misoprostol"
    ],
    "correctIndex": 1,
    "rationale": "Oxytocin is the first-line uterotonic; others follow with their contraindications.",
    "category": "Maternity",
    "examType": "MOH"
  },
  {
    "id": 80,
    "question": "Painless, bright-red vaginal bleeding in the third trimester is most suggestive of:",
    "options": [
      "Abruptio placentae",
      "Placenta previa",
      "Normal labour",
      "Ruptured uterus"
    ],
    "correctIndex": 1,
    "rationale": "Painless bright-red bleeding is classic for placenta previa; avoid vaginal exams.",
    "category": "Maternity",
    "examType": "MOH"
  },
  {
    "id": 81,
    "question": "A reassuring sign of fetal wellbeing on the monitor is:",
    "options": [
      "Late decelerations",
      "Moderate variability with accelerations",
      "Bradycardia",
      "Absent variability"
    ],
    "correctIndex": 1,
    "rationale": "Moderate variability with accelerations indicates fetal wellbeing.",
    "category": "Maternity",
    "examType": "MOH"
  },
  {
    "id": 82,
    "question": "Rh immunoglobulin (anti-D) is given to:",
    "options": [
      "Rh-positive mothers",
      "Rh-negative mothers around 28 weeks and after delivery of an Rh-positive infant",
      "All newborns",
      "Only fathers"
    ],
    "correctIndex": 1,
    "rationale": "Anti-D prevents Rh sensitisation in Rh-negative mothers.",
    "category": "Maternity",
    "examType": "MOH"
  },
  {
    "id": 83,
    "question": "To reduce neonatal heat loss immediately after birth, the nurse should:",
    "options": [
      "Bathe the newborn at once",
      "Dry the infant, provide skin-to-skin contact and a hat",
      "Place the infant near a window",
      "Use cold blankets"
    ],
    "correctIndex": 1,
    "rationale": "Drying, skin-to-skin and a hat reduce evaporative and convective heat loss.",
    "category": "Newborn",
    "examType": "MOH"
  },
  {
    "id": 84,
    "question": "A normal heart rate range for a newborn is:",
    "options": [
      "60-100 bpm",
      "120-160 bpm",
      "40-60 bpm",
      "180-220 bpm"
    ],
    "correctIndex": 1,
    "rationale": "Newborn heart rate is 120-160 bpm.",
    "category": "Pediatrics",
    "examType": "MOH"
  },
  {
    "id": 85,
    "question": "The nurse should question an order for which intervention in a child with suspected epiglottitis?",
    "options": [
      "Humidified oxygen",
      "Throat examination with a tongue blade",
      "Calm positioning with a parent",
      "Bedside airway equipment"
    ],
    "correctIndex": 1,
    "rationale": "Throat examination can cause laryngospasm; it is contraindicated.",
    "category": "Pediatrics",
    "examType": "MOH"
  },
  {
    "id": 86,
    "question": "An infant with severe diarrhoea is at greatest risk for:",
    "options": [
      "Hypertension",
      "Dehydration and electrolyte imbalance",
      "Obesity",
      "Polycythaemia"
    ],
    "correctIndex": 1,
    "rationale": "Diarrhoea causes fluid and electrolyte loss; infants dehydrate rapidly.",
    "category": "Pediatrics",
    "examType": "MOH"
  },
  {
    "id": 87,
    "question": "When administering oral medication to a toddler, the nurse should:",
    "options": [
      "Mix it into a full bottle of milk",
      "Use a calibrated oral syringe and offer choices where possible",
      "Force the dose quickly",
      "Leave it for the parent to give later"
    ],
    "correctIndex": 1,
    "rationale": "An oral syringe ensures accuracy; offering choices improves cooperation. Avoid mixing in essential foods.",
    "category": "Pediatrics",
    "examType": "MOH"
  },
  {
    "id": 88,
    "question": "Asystole on the monitor is treated with:",
    "options": [
      "Immediate defibrillation",
      "CPR and epinephrine while treating reversible causes",
      "Synchronised cardioversion",
      "Observation only"
    ],
    "correctIndex": 1,
    "rationale": "Asystole is non-shockable; provide CPR and epinephrine and address reversible causes (Hs and Ts).",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 89,
    "question": "Synchronised cardioversion (rather than defibrillation) is used for:",
    "options": [
      "Pulseless ventricular tachycardia",
      "Ventricular fibrillation",
      "An unstable tachydysrhythmia with a pulse",
      "Asystole"
    ],
    "correctIndex": 2,
    "rationale": "Cardioversion is for unstable rhythms that still have a pulse.",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 90,
    "question": "Absent breath sounds, tracheal deviation and distended neck veins indicate:",
    "options": [
      "Pneumonia",
      "Tension pneumothorax",
      "Asthma",
      "Anxiety"
    ],
    "correctIndex": 1,
    "rationale": "This is tension pneumothorax, an emergency requiring decompression.",
    "category": "Emergency",
    "examType": "MOH"
  },
  {
    "id": 91,
    "question": "For severe external haemorrhage, the FIRST action is to:",
    "options": [
      "Elevate and observe",
      "Apply firm direct pressure",
      "Give oral fluids",
      "Obtain consent"
    ],
    "correctIndex": 1,
    "rationale": "Direct pressure is the immediate action to control bleeding.",
    "category": "Trauma",
    "examType": "MOH"
  },
  {
    "id": 92,
    "question": "During a mass-casualty incident, a walking patient with minor cuts is triaged as:",
    "options": [
      "Red (emergent)",
      "Green (non-urgent)",
      "Black (deceased)",
      "Yellow (urgent)"
    ],
    "correctIndex": 1,
    "rationale": "Walking-wounded with minor injuries are non-urgent (green).",
    "category": "Emergency",
    "examType": "MOH"
  },
  {
    "id": 93,
    "question": "A patient on a selective serotonin reuptake inhibitor plus another serotonergic drug develops agitation, fever and hyperreflexia. The nurse suspects:",
    "options": [
      "Anaphylaxis",
      "Serotonin syndrome",
      "Hypoglycaemia",
      "A normal effect"
    ],
    "correctIndex": 1,
    "rationale": "This triad suggests serotonin syndrome; stop serotonergic agents and treat.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 94,
    "question": "A patient experiencing a panic attack is best helped by the nurse:",
    "options": [
      "Leaving the patient alone",
      "Staying with the patient, reducing stimuli and guiding slow breathing",
      "Providing detailed teaching now",
      "Encouraging a crowd"
    ],
    "correctIndex": 1,
    "rationale": "Staying present, reducing stimuli and slow breathing help a patient in panic.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 95,
    "question": "Improvement of energy before mood lifts in a depressed patient is concerning because the patient:",
    "options": [
      "Has fully recovered",
      "May now have the energy to act on suicidal thoughts",
      "Is no longer at risk",
      "Has failed treatment"
    ],
    "correctIndex": 1,
    "rationale": "This is a higher-risk window for suicide; maintain close monitoring.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 96,
    "question": "When a patient describes a fixed false belief (delusion), the nurse should:",
    "options": [
      "Agree to build trust",
      "Argue with evidence to correct it",
      "Acknowledge the underlying feeling without reinforcing the belief",
      "Avoid the patient"
    ],
    "correctIndex": 2,
    "rationale": "Acknowledge the feeling (e.g., fear) without confirming or arguing the delusion.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 97,
    "question": "Influenza requires which type of precautions?",
    "options": [
      "Airborne",
      "Droplet",
      "Contact only",
      "None"
    ],
    "correctIndex": 1,
    "rationale": "Influenza spreads by droplets; use a surgical mask within ~1-2 m and a private room when possible.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 98,
    "question": "Live vaccines such as MMR are contraindicated in:",
    "options": [
      "Healthy adults",
      "Pregnancy and significant immunosuppression",
      "Children over 5",
      "Healthcare workers"
    ],
    "correctIndex": 1,
    "rationale": "Live vaccines are avoided in pregnancy and significant immunosuppression.",
    "category": "Community Health",
    "examType": "MOH"
  },
  {
    "id": 99,
    "question": "Promoting healthy diet and exercise in a community clinic is an example of:",
    "options": [
      "Tertiary prevention",
      "Primary prevention/health promotion",
      "Acute care",
      "Screening"
    ],
    "correctIndex": 1,
    "rationale": "Promoting healthy behaviours to prevent disease is primary prevention.",
    "category": "Community Health",
    "examType": "MOH"
  },
  {
    "id": 100,
    "question": "A nurse is asked to perform a task outside their licensed scope of practice. The nurse should:",
    "options": [
      "Perform it to help the team",
      "Decline and notify the supervisor",
      "Delegate it to a UAP",
      "Attempt it carefully"
    ],
    "correctIndex": 1,
    "rationale": "Practising outside one's scope is unsafe and unlawful; decline and escalate.",
    "category": "Professional Practice",
    "examType": "MOH"
  },
  {
    "id": 101,
    "question": "A patient with a confirmed notifiable communicable disease must be:",
    "options": [
      "Kept strictly confidential with no reporting",
      "Reported to the preventive medicine department",
      "Reported only after discharge",
      "Reported only by the physician"
    ],
    "correctIndex": 1,
    "rationale": "Notifiable diseases must be reported to public-health authorities, an exception to confidentiality.",
    "category": "Ethics",
    "examType": "MOH"
  },
  {
    "id": 102,
    "question": "Which action best demonstrates patient advocacy?",
    "options": [
      "Following every order without question",
      "Speaking up about an unsafe order or staffing concern",
      "Avoiding conflict with physicians",
      "Documenting only at shift end"
    ],
    "correctIndex": 1,
    "rationale": "Advocacy includes raising concerns about unsafe care to protect the patient.",
    "category": "Professional Practice",
    "examType": "MOH"
  },
  {
    "id": 103,
    "question": "Under DOH Abu Dhabi standards, a terminally ill, alert patient requests a 'Do Not Resuscitate' order. The nurse should:",
    "options": [
      "Honour the verbal request immediately and remove the code status",
      "Involve the physician and document a formal, witnessed DNR per the medical board process",
      "Refuse as DNR is illegal in Abu Dhabi",
      "State the family decides alone regardless of the patient"
    ],
    "correctIndex": 1,
    "rationale": "DOH permits formal DNR/AND under a regulated process (board review, signed documentation); a verbal statement alone is insufficient but must be escalated.",
    "category": "Ethics & Legal",
    "examType": "HAAD_DOH"
  },
  {
    "id": 104,
    "question": "Which is the priority nursing action before a blood transfusion?",
    "options": [
      "Warm the blood in a microwave",
      "Verify the patient and blood product with two nurses and check vital signs",
      "Infuse rapidly to finish quickly",
      "Add medication to the blood bag"
    ],
    "correctIndex": 1,
    "rationale": "Two-person verification of patient/product and baseline vitals prevent transfusion reactions.",
    "category": "Patient Safety",
    "examType": "HAAD_DOH"
  },
  {
    "id": 105,
    "question": "A nurse identifies a near-miss medication error that did not reach the patient. The nurse should:",
    "options": [
      "Ignore it since no harm occurred",
      "Complete an incident/occurrence report",
      "Tell only a colleague",
      "Document it in the chart"
    ],
    "correctIndex": 1,
    "rationale": "Near-misses are reported via incident reports to improve safety; they are not charted in the medical record.",
    "category": "Patient Safety",
    "examType": "HAAD_DOH"
  },
  {
    "id": 106,
    "question": "To prevent a central line-associated bloodstream infection (CLABSI), the nurse should:",
    "options": [
      "Use povidone-iodine without drying",
      "Use chlorhexidine antisepsis, full barrier precautions and review line need daily",
      "Leave the line in as long as possible",
      "Avoid hand hygiene to save time"
    ],
    "correctIndex": 1,
    "rationale": "Chlorhexidine skin antisepsis, maximal barrier precautions and daily review of line necessity prevent CLABSI.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 107,
    "question": "A patient is on contact precautions and must go to radiology. The nurse should:",
    "options": [
      "Not inform radiology",
      "Communicate the precautions and maintain them during transport",
      "Remove all PPE before transport",
      "Cancel the test"
    ],
    "correctIndex": 1,
    "rationale": "Precautions continue during transport; the receiving department must be informed.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 108,
    "question": "Which is an appropriate two-identifier check?",
    "options": [
      "Room number and diagnosis",
      "Full name and date of birth",
      "Bed number and appearance",
      "Nurse's recognition only"
    ],
    "correctIndex": 1,
    "rationale": "Two acceptable identifiers include full name and date of birth (or MRN).",
    "category": "Patient Safety",
    "examType": "HAAD_DOH"
  },
  {
    "id": 109,
    "question": "The nurse notes a stage 3 pressure injury (full-thickness loss, visible subcutaneous fat, no exposed bone/muscle). Priority care includes:",
    "options": [
      "Vigorous massage of the area",
      "Pressure relief, moist wound healing and nutrition optimisation",
      "Leaving it open to air only",
      "Daily harsh scrubbing"
    ],
    "correctIndex": 1,
    "rationale": "Stage 3 injuries need pressure offloading, appropriate moist dressings and nutritional support.",
    "category": "Skin Integrity",
    "examType": "HAAD_DOH"
  },
  {
    "id": 110,
    "question": "A telemetry strip shows chaotic, irregular waves with no identifiable QRS; the patient is unresponsive and pulseless. The nurse should:",
    "options": [
      "Administer amiodarone first",
      "Start CPR and defibrillate immediately",
      "Perform synchronised cardioversion",
      "Give oral aspirin"
    ],
    "correctIndex": 1,
    "rationale": "Ventricular fibrillation is a pulseless shockable rhythm requiring CPR and immediate defibrillation.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 111,
    "question": "Which patient finding indicates digoxin should be held?",
    "options": [
      "Apical pulse 88",
      "Apical pulse 52",
      "Blood pressure 130/82",
      "Respiratory rate 16"
    ],
    "correctIndex": 1,
    "rationale": "Hold digoxin and notify the physician for an apical pulse below 60 bpm.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 112,
    "question": "A patient with a new ileostomy has output that is:",
    "options": [
      "Formed and brown",
      "Loose to liquid, requiring skin protection",
      "Absent for days normally",
      "Bright red blood always"
    ],
    "correctIndex": 1,
    "rationale": "Ileostomy output is liquid to loose; protect peristomal skin and monitor fluid/electrolytes.",
    "category": "Gastrointestinal",
    "examType": "HAAD_DOH"
  },
  {
    "id": 113,
    "question": "A patient with heart failure is short of breath. The best position is:",
    "options": [
      "Supine flat",
      "High-Fowler's",
      "Trendelenburg",
      "Prone"
    ],
    "correctIndex": 1,
    "rationale": "Upright high-Fowler's reduces venous return and eases the work of breathing.",
    "category": "Cardiac",
    "examType": "HAAD_DOH"
  },
  {
    "id": 114,
    "question": "A patient is admitted with a sodium of 118 mEq/L and confusion. Correction should be:",
    "options": [
      "Rapid with hypertonic boluses",
      "Slow and controlled to avoid osmotic demyelination",
      "With free water boluses",
      "Not needed"
    ],
    "correctIndex": 1,
    "rationale": "Severe hyponatremia is corrected slowly to prevent osmotic demyelination syndrome.",
    "category": "Fluid & Electrolytes",
    "examType": "HAAD_DOH"
  },
  {
    "id": 115,
    "question": "The hallmark of metabolic acidosis on an ABG is:",
    "options": [
      "High pH, high HCO3",
      "Low pH, low HCO3",
      "High pH, low CO2",
      "Low pH, high CO2"
    ],
    "correctIndex": 1,
    "rationale": "Metabolic acidosis shows a low pH with a low bicarbonate (e.g., DKA, diarrhoea).",
    "category": "Acid-Base",
    "examType": "HAAD_DOH"
  },
  {
    "id": 116,
    "question": "A patient receiving a unit of packed red cells develops fever, chills and back pain after 50 mL. The nurse should FIRST:",
    "options": [
      "Slow the infusion",
      "Stop the transfusion and keep the line open with normal saline",
      "Give an antipyretic and continue",
      "Increase the rate"
    ],
    "correctIndex": 1,
    "rationale": "These signs suggest an acute haemolytic reaction; stop the transfusion immediately and maintain IV access with saline.",
    "category": "Transfusion Safety",
    "examType": "HAAD_DOH"
  },
  {
    "id": 117,
    "question": "A patient with an acute exacerbation of asthma is given which medication first?",
    "options": [
      "An oral steroid only",
      "A short-acting bronchodilator (e.g., salbutamol)",
      "A long-acting beta-agonist alone",
      "An antibiotic"
    ],
    "correctIndex": 1,
    "rationale": "A short-acting bronchodilator is given first to relieve acute bronchospasm.",
    "category": "Respiratory",
    "examType": "HAAD_DOH"
  },
  {
    "id": 118,
    "question": "A patient on a heparin infusion has an aPTT well above the target range and bruising. The nurse anticipates:",
    "options": [
      "Increasing the heparin",
      "Holding heparin and possibly giving protamine sulfate",
      "Giving vitamin K",
      "Giving more aspirin"
    ],
    "correctIndex": 1,
    "rationale": "An excessively high aPTT with bleeding requires holding heparin; protamine sulfate is the antidote.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 119,
    "question": "A patient post-total hip replacement must avoid:",
    "options": [
      "Abduction of the operated leg",
      "Hip flexion beyond 90 degrees and crossing the legs",
      "Using an abduction pillow",
      "Toe-touch weight bearing as ordered"
    ],
    "correctIndex": 1,
    "rationale": "To prevent dislocation, avoid flexion past 90 degrees, adduction and internal rotation; maintain abduction.",
    "category": "Orthopaedics",
    "examType": "HAAD_DOH"
  },
  {
    "id": 120,
    "question": "A patient with acute pancreatitis is typically managed with:",
    "options": [
      "A high-fat diet",
      "NPO status, IV fluids and pain control",
      "Immediate oral feeding",
      "Daily laxatives"
    ],
    "correctIndex": 1,
    "rationale": "Resting the pancreas (NPO), IV fluids and analgesia are central to acute pancreatitis care.",
    "category": "Gastrointestinal",
    "examType": "HAAD_DOH"
  },
  {
    "id": 121,
    "question": "Which finding in a patient on a calcium channel blocker requires the nurse to hold the dose and notify the physician?",
    "options": [
      "Heart rate 80",
      "Heart rate 44 with hypotension",
      "Blood pressure 128/78",
      "Mild headache"
    ],
    "correctIndex": 1,
    "rationale": "Significant bradycardia with hypotension warrants holding the drug and notifying the physician.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 122,
    "question": "Order a dopamine drip at 5 mcg/kg/min for an 80 kg patient; bag is 400 mg in 250 mL. The pump rate is:",
    "options": [
      "15 mL/hr",
      "24 mL/hr",
      "30 mL/hr",
      "12 mL/hr"
    ],
    "correctIndex": 0,
    "rationale": "5 x 80 = 400 mcg/min = 24,000 mcg/hr = 24 mg/hr; (24/400) x 250 = 15 mL/hr.",
    "category": "Dosage Calculation",
    "examType": "HAAD_DOH"
  },
  {
    "id": 123,
    "question": "Order: heparin at 1,200 units/hr; bag is 25,000 units in 250 mL. The pump rate is:",
    "options": [
      "10 mL/hr",
      "12 mL/hr",
      "15 mL/hr",
      "18 mL/hr"
    ],
    "correctIndex": 1,
    "rationale": "Concentration 100 units/mL; 1,200 / 100 = 12 mL/hr.",
    "category": "Dosage Calculation",
    "examType": "HAAD_DOH"
  },
  {
    "id": 124,
    "question": "Order: paracetamol 250 mg; suspension is 120 mg/5 mL. The volume to give is approximately:",
    "options": [
      "5.2 mL",
      "10.4 mL",
      "8 mL",
      "12 mL"
    ],
    "correctIndex": 1,
    "rationale": "(250/120) x 5 = ~10.4 mL.",
    "category": "Dosage Calculation",
    "examType": "HAAD_DOH"
  },
  {
    "id": 125,
    "question": "To draw up mixed Regular and NPH insulin, the correct sequence is:",
    "options": [
      "Draw NPH first",
      "Air into NPH, air into Regular, draw Regular, then draw NPH ('clear before cloudy')",
      "Mix in the same syringe in any order",
      "Give as two separate injections always"
    ],
    "correctIndex": 1,
    "rationale": "Inject air into NPH then Regular, draw Regular (clear) first, then NPH (cloudy) to avoid contamination.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 126,
    "question": "Which lab value must be checked before giving most chemotherapy or before certain antibiotics affecting the kidneys?",
    "options": [
      "Bilirubin only",
      "Renal function (creatinine) and relevant counts",
      "Amylase",
      "Lipase"
    ],
    "correctIndex": 1,
    "rationale": "Renal function and blood counts guide safe dosing of nephrotoxic or myelosuppressive drugs.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 127,
    "question": "A patient is prescribed an MAOI antidepressant. The nurse teaches the patient to avoid:",
    "options": [
      "Water and rice",
      "Aged cheese and cured meats (tyramine)",
      "Fresh vegetables",
      "Bananas in moderation"
    ],
    "correctIndex": 1,
    "rationale": "Tyramine-rich foods can precipitate a hypertensive crisis with MAOIs.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 128,
    "question": "Vancomycin trough levels are monitored to:",
    "options": [
      "Allow unlimited dosing",
      "Balance effectiveness against nephro- and ototoxicity",
      "Lower blood glucose",
      "Speed up the infusion"
    ],
    "correctIndex": 1,
    "rationale": "Trough monitoring ensures efficacy while minimising kidney and ear toxicity.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 129,
    "question": "During labour, the nurse notes recurrent late decelerations. The FIRST action is to:",
    "options": [
      "Increase oxytocin",
      "Reposition the mother, give oxygen, stop oxytocin and notify the provider",
      "Encourage pushing",
      "Do nothing"
    ],
    "correctIndex": 1,
    "rationale": "Late decelerations suggest uteroplacental insufficiency; intrauterine resuscitation measures are taken and the provider is notified.",
    "category": "Maternity",
    "examType": "HAAD_DOH"
  },
  {
    "id": 130,
    "question": "Shoulder dystocia is managed with the McRoberts maneuver and:",
    "options": [
      "Fundal pressure",
      "Suprapubic pressure",
      "Immediate forceps",
      "Maternal Valsalva only"
    ],
    "correctIndex": 1,
    "rationale": "McRoberts plus suprapubic pressure relieves dystocia; fundal pressure is contraindicated.",
    "category": "Obstetric Emergency",
    "examType": "HAAD_DOH"
  },
  {
    "id": 131,
    "question": "A newborn at 1 minute has HR 110, slow irregular respirations, some flexion, active grimace, and pink body with blue extremities. The APGAR is:",
    "options": [
      "8",
      "6",
      "4",
      "10"
    ],
    "correctIndex": 1,
    "rationale": "HR 2, Resp 1, Tone 1, Reflex 1, Colour 1 = 6.",
    "category": "Newborn",
    "examType": "HAAD_DOH"
  },
  {
    "id": 132,
    "question": "An infant of a mother with gestational diabetes is at greatest risk for:",
    "options": [
      "Hypertension",
      "Hypoglycaemia",
      "Hyperthermia",
      "Constipation"
    ],
    "correctIndex": 1,
    "rationale": "Infants of diabetic mothers commonly develop neonatal hypoglycaemia.",
    "category": "Newborn",
    "examType": "HAAD_DOH"
  },
  {
    "id": 133,
    "question": "Magnesium sulfate is administered to a pre-eclamptic patient primarily to:",
    "options": [
      "Lower blood glucose",
      "Prevent seizures",
      "Increase contractions",
      "Treat infection"
    ],
    "correctIndex": 1,
    "rationale": "Magnesium sulfate prevents eclamptic seizures; calcium gluconate is the antidote for toxicity.",
    "category": "Maternity",
    "examType": "HAAD_DOH"
  },
  {
    "id": 134,
    "question": "A 10-month-old with acute gastroenteritis shows a sunken fontanelle, dry mucosa and decreased wet diapers. This indicates:",
    "options": [
      "Overhydration",
      "Moderate dehydration",
      "Normal hydration",
      "Hyperthermia only"
    ],
    "correctIndex": 1,
    "rationale": "These findings indicate dehydration requiring rehydration and monitoring.",
    "category": "Pediatrics",
    "examType": "HAAD_DOH"
  },
  {
    "id": 135,
    "question": "Which immunisation is given to a healthy neonate in the UAE before discharge?",
    "options": [
      "MMR",
      "BCG and hepatitis B (dose 0)",
      "Varicella",
      "HPV"
    ],
    "correctIndex": 1,
    "rationale": "BCG and the first hepatitis B dose are given to newborns.",
    "category": "Pediatrics",
    "examType": "HAAD_DOH"
  },
  {
    "id": 136,
    "question": "The safest method to verify a paediatric medication dose is to:",
    "options": [
      "Estimate from the adult dose",
      "Calculate mg/kg and confirm against the safe range, with an independent check for high-alert drugs",
      "Use the same dose as an adult",
      "Round up generously"
    ],
    "correctIndex": 1,
    "rationale": "Weight-based calculation verified against safe ranges (with double-checks for high-alert drugs) ensures safety.",
    "category": "Pediatrics",
    "examType": "HAAD_DOH"
  },
  {
    "id": 137,
    "question": "A child with suspected epiglottitis should be:",
    "options": [
      "Examined immediately with a tongue blade",
      "Kept calm with airway equipment ready and no throat examination",
      "Made to lie flat",
      "Left alone to reduce stimulation"
    ],
    "correctIndex": 1,
    "rationale": "Avoid throat examination (laryngospasm risk); keep the child calm with emergency airway equipment available.",
    "category": "Pediatrics",
    "examType": "HAAD_DOH"
  },
  {
    "id": 138,
    "question": "A patient is pulseless with an organised rhythm on the monitor (PEA). The nurse should:",
    "options": [
      "Defibrillate immediately",
      "Begin CPR and give epinephrine while treating reversible causes",
      "Perform synchronised cardioversion",
      "Observe"
    ],
    "correctIndex": 1,
    "rationale": "PEA is non-shockable; provide CPR and epinephrine and treat reversible causes (Hs and Ts).",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 139,
    "question": "After delivering a defibrillation shock, the nurse should immediately:",
    "options": [
      "Check a 12-lead ECG first",
      "Resume chest compressions",
      "Stop and observe",
      "Give an oral medication"
    ],
    "correctIndex": 1,
    "rationale": "CPR is resumed immediately after a shock to maintain perfusion.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 140,
    "question": "A patient with major burns and facial soot, singed nasal hair and hoarseness needs priority attention to the:",
    "options": [
      "Skin grafting",
      "Airway (inhalation injury)",
      "Nutrition",
      "Mobility"
    ],
    "correctIndex": 1,
    "rationale": "Inhalation injury threatens the airway; secure it early.",
    "category": "Emergency",
    "examType": "HAAD_DOH"
  },
  {
    "id": 141,
    "question": "A reliable indicator of effective CPR / return of spontaneous circulation is:",
    "options": [
      "A falling end-tidal CO2",
      "A rise in end-tidal CO2 and a palpable pulse",
      "Dilated fixed pupils",
      "Cold extremities"
    ],
    "correctIndex": 1,
    "rationale": "A sharp rise in EtCO2 and a pulse indicate effective CPR/ROSC.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 142,
    "question": "Cushing's triad (hypertension with widening pulse pressure, bradycardia and irregular respirations) signals:",
    "options": [
      "Sepsis",
      "Rising intracranial pressure / impending herniation",
      "Hypoglycaemia",
      "Anaphylaxis"
    ],
    "correctIndex": 1,
    "rationale": "Cushing's triad is a late, ominous sign of raised intracranial pressure.",
    "category": "Neurology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 143,
    "question": "A suicidal patient who has a specific plan and access to means requires:",
    "options": [
      "Discharge with outpatient follow-up",
      "Continuous one-to-one observation and removal of hazards",
      "A group therapy session",
      "No special precautions"
    ],
    "correctIndex": 1,
    "rationale": "High-risk patients need continuous observation and a safe environment.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 144,
    "question": "A patient on an antipsychotic develops high fever, severe muscle rigidity, and altered consciousness. The nurse recognises:",
    "options": [
      "Expected sedation",
      "Neuroleptic malignant syndrome - a medical emergency",
      "Mild dystonia",
      "Caffeine withdrawal"
    ],
    "correctIndex": 1,
    "rationale": "These indicate neuroleptic malignant syndrome; stop the drug and treat emergently.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 145,
    "question": "Which statement by the nurse is non-therapeutic?",
    "options": [
      "'Tell me more about how you are feeling.'",
      "'Everything happens for a reason.'",
      "'You sound frustrated.'",
      "'I am here to listen.'"
    ],
    "correctIndex": 1,
    "rationale": "'Everything happens for a reason' minimises the patient's feelings and is non-therapeutic.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 146,
    "question": "A patient in alcohol withdrawal becomes confused, tremulous and tachycardic. This may progress to the life-threatening state of:",
    "options": [
      "Mania",
      "Delirium tremens",
      "Serotonin syndrome",
      "Neuroleptic malignant syndrome"
    ],
    "correctIndex": 1,
    "rationale": "Severe alcohol withdrawal can progress to delirium tremens; benzodiazepines are used.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 147,
    "question": "Which patient requires a negative-pressure isolation room?",
    "options": [
      "A patient with MRSA",
      "A patient with influenza",
      "A patient with active pulmonary tuberculosis",
      "A patient with a urinary tract infection"
    ],
    "correctIndex": 2,
    "rationale": "Active pulmonary TB is airborne and requires a negative-pressure room and N95 respirator.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 148,
    "question": "After caring for a patient with Clostridioides difficile, the nurse should:",
    "options": [
      "Use alcohol rub and move on",
      "Wash hands with soap and water",
      "Skip hand hygiene",
      "Re-use the same gown"
    ],
    "correctIndex": 1,
    "rationale": "Soap-and-water washing physically removes C. difficile spores that alcohol does not kill.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 149,
    "question": "Cardiac rehabilitation after a myocardial infarction is an example of:",
    "options": [
      "Primary prevention",
      "Secondary prevention",
      "Tertiary prevention",
      "Health promotion only"
    ],
    "correctIndex": 2,
    "rationale": "Limiting complications and restoring function in established disease is tertiary prevention.",
    "category": "Community Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 150,
    "question": "A nurse delegates a task but the unlicensed assistant performs it incorrectly, harming the patient. Accountability:",
    "options": [
      "Lies only with the assistant",
      "Remains with the registered nurse who delegated and supervised",
      "Belongs to the physician",
      "Cannot be assigned"
    ],
    "correctIndex": 1,
    "rationale": "The RN remains accountable for appropriate delegation and supervision; accountability is not transferred.",
    "category": "Delegation",
    "examType": "HAAD_DOH"
  },
  {
    "id": 151,
    "question": "A competent patient withdraws consent just before a procedure. The nurse should:",
    "options": [
      "Proceed because the form is signed",
      "Stop and notify the physician; consent can be withdrawn at any time",
      "Tell the patient it is too late",
      "Let the family decide"
    ],
    "correctIndex": 1,
    "rationale": "Consent may be withdrawn at any time; the nurse stops and notifies the physician.",
    "category": "Ethics",
    "examType": "HAAD_DOH"
  },
  {
    "id": 152,
    "question": "Maintaining a consistent, normal sodium intake and adequate hydration is patient teaching for which medication?",
    "options": [
      "Warfarin",
      "Lithium",
      "Insulin",
      "Heparin"
    ],
    "correctIndex": 1,
    "rationale": "Stable sodium and hydration keep lithium levels in the safe therapeutic range.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 153,
    "question": "A patient with left-sided heart failure is most likely to present with:",
    "options": [
      "Peripheral oedema and ascites",
      "Pulmonary crackles and dyspnoea",
      "Jugular venous distension only",
      "Hepatomegaly"
    ],
    "correctIndex": 1,
    "rationale": "Left-sided failure backs up into the lungs, causing crackles, dyspnoea and orthopnoea; right-sided failure causes peripheral/venous congestion.",
    "category": "Cardiac",
    "examType": "DHA"
  },
  {
    "id": 154,
    "question": "A patient is admitted with deep vein thrombosis. The nurse should:",
    "options": [
      "Massage the affected leg",
      "Maintain bed rest as ordered, elevate the limb and avoid massaging it",
      "Apply firm pressure to the calf",
      "Encourage vigorous leg exercises"
    ],
    "correctIndex": 1,
    "rationale": "Massaging or pressing a DVT can dislodge the clot causing embolism; elevate and avoid manipulation.",
    "category": "Vascular",
    "examType": "DHA"
  },
  {
    "id": 155,
    "question": "The priority assessment after a patient receives a new prescription for furosemide is:",
    "options": [
      "Blood glucose",
      "Serum potassium and fluid/electrolyte status",
      "Liver enzymes",
      "White cell count"
    ],
    "correctIndex": 1,
    "rationale": "Loop diuretics cause potassium loss; monitor potassium and fluid/electrolyte balance.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 156,
    "question": "A patient with cirrhosis develops confusion and asterixis. The priority is to:",
    "options": [
      "Increase dietary protein",
      "Administer lactulose as ordered and monitor neuro status",
      "Restrict all fluids",
      "Give an iron supplement"
    ],
    "correctIndex": 1,
    "rationale": "Hepatic encephalopathy is managed by lowering ammonia with lactulose; protein may be moderated.",
    "category": "Gastrointestinal",
    "examType": "DHA"
  },
  {
    "id": 157,
    "question": "A nurse is teaching a patient about a 24-hour urine collection. The correct instruction is:",
    "options": [
      "Save only the first morning void",
      "Discard the first void, then collect all urine for 24 hours including the final void",
      "Collect random samples",
      "Refrigeration is never needed"
    ],
    "correctIndex": 1,
    "rationale": "Discard the first void to start timing, then collect everything for 24 hours and keep it cool.",
    "category": "Diagnostics",
    "examType": "DHA"
  },
  {
    "id": 158,
    "question": "A patient with Addison's disease is at risk for:",
    "options": [
      "Hypertension and hypernatremia",
      "Hypotension, hyponatremia and hyperkalemia",
      "Hyperglycaemia",
      "Fluid overload"
    ],
    "correctIndex": 1,
    "rationale": "Adrenal insufficiency causes low cortisol/aldosterone, leading to hypotension, low sodium and high potassium.",
    "category": "Endocrine",
    "examType": "DHA"
  },
  {
    "id": 159,
    "question": "A patient with hyperthyroidism (thyroid storm) presents with high fever and tachycardia. The priority is to:",
    "options": [
      "Warm the patient",
      "Reduce temperature, support cardiac function and give prescribed antithyroid therapy",
      "Encourage activity",
      "Restrict fluids"
    ],
    "correctIndex": 1,
    "rationale": "Thyroid storm is a hypermetabolic emergency; cool the patient, protect the heart and treat the thyroid.",
    "category": "Endocrine",
    "examType": "DHA"
  },
  {
    "id": 160,
    "question": "Which finding in a patient receiving a blood transfusion suggests fluid overload (TACO)?",
    "options": [
      "Hypothermia",
      "Dyspnoea, crackles, hypertension and distended neck veins",
      "A drop in blood pressure",
      "Decreased respiratory rate"
    ],
    "correctIndex": 1,
    "rationale": "Transfusion-associated circulatory overload causes dyspnoea, crackles, hypertension and JVD; slow/stop and treat.",
    "category": "Transfusion",
    "examType": "DHA"
  },
  {
    "id": 161,
    "question": "A patient with a nasogastric tube for decompression should be positioned:",
    "options": [
      "Flat supine",
      "With the head of the bed elevated 30-45 degrees",
      "In Trendelenburg",
      "Prone"
    ],
    "correctIndex": 1,
    "rationale": "Head-of-bed elevation reduces reflux and aspiration risk with an NG tube.",
    "category": "Fundamentals",
    "examType": "DHA"
  },
  {
    "id": 162,
    "question": "The nurse should verify NG tube placement most reliably by:",
    "options": [
      "Auscultating air over the stomach",
      "Checking pH of aspirate and confirming with X-ray as policy requires",
      "Asking the patient to talk",
      "Observing for bubbling"
    ],
    "correctIndex": 1,
    "rationale": "pH testing of aspirate and radiographic confirmation are reliable; the air-auscultation method is unreliable.",
    "category": "Fundamentals",
    "examType": "DHA"
  },
  {
    "id": 163,
    "question": "A patient on prolonged corticosteroids should be monitored for:",
    "options": [
      "Hypoglycaemia and weight loss",
      "Hyperglycaemia, infection risk and osteoporosis",
      "Bradycardia",
      "Hyperkalemia"
    ],
    "correctIndex": 1,
    "rationale": "Long-term steroids raise glucose, mask/increase infection risk and cause bone loss; do not stop abruptly.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 164,
    "question": "A patient is scheduled for a contrast CT. The nurse must check for allergy to:",
    "options": [
      "Penicillin",
      "Iodine/contrast media and assess renal function",
      "Latex only",
      "Eggs only"
    ],
    "correctIndex": 1,
    "rationale": "Iodinated contrast can cause reactions and nephropathy; check allergy and renal function (creatinine).",
    "category": "Diagnostics",
    "examType": "DHA"
  },
  {
    "id": 165,
    "question": "Which is the priority nursing diagnosis for a patient in acute respiratory distress?",
    "options": [
      "Anxiety",
      "Ineffective airway clearance/impaired gas exchange",
      "Knowledge deficit",
      "Disturbed sleep"
    ],
    "correctIndex": 1,
    "rationale": "Airway and gas exchange take priority over psychosocial needs in respiratory distress.",
    "category": "Respiratory",
    "examType": "DHA"
  },
  {
    "id": 166,
    "question": "A patient with a seizure disorder begins a generalised tonic-clonic seizure. The nurse should:",
    "options": [
      "Restrain the limbs",
      "Protect the head, turn the patient to the side, and time the seizure",
      "Insert a tongue blade",
      "Give oral medication"
    ],
    "correctIndex": 1,
    "rationale": "Protect from injury, position side-lying for airway, and time the event; never force objects into the mouth.",
    "category": "Neurology",
    "examType": "DHA"
  },
  {
    "id": 167,
    "question": "A patient with diabetes asks about foot care. The nurse teaches to:",
    "options": [
      "Walk barefoot at home",
      "Inspect feet daily, wear protective footwear and avoid cutting corns",
      "Soak feet in hot water nightly",
      "Use a heating pad on the feet"
    ],
    "correctIndex": 1,
    "rationale": "Diabetic neuropathy increases injury risk; daily inspection and protective footwear prevent ulcers.",
    "category": "Endocrine",
    "examType": "DHA"
  },
  {
    "id": 168,
    "question": "A patient develops a pressure injury with intact skin and non-blanchable redness. This is:",
    "options": [
      "Stage 1",
      "Stage 2",
      "Stage 3",
      "Stage 4"
    ],
    "correctIndex": 0,
    "rationale": "Non-blanchable erythema of intact skin is a stage 1 pressure injury.",
    "category": "Skin Integrity",
    "examType": "DHA"
  },
  {
    "id": 169,
    "question": "Before a paracentesis, the nurse asks the patient to:",
    "options": [
      "Drink large amounts of fluid",
      "Empty the bladder to reduce the risk of injury",
      "Lie flat",
      "Eat a heavy meal"
    ],
    "correctIndex": 1,
    "rationale": "Emptying the bladder reduces the risk of bladder puncture during abdominal paracentesis.",
    "category": "Procedures",
    "examType": "DHA"
  },
  {
    "id": 170,
    "question": "A patient is receiving total parenteral nutrition (TPN). The nurse monitors closely for:",
    "options": [
      "Hypothermia",
      "Hyperglycaemia and infection at the central line",
      "Bradycardia",
      "Hair loss"
    ],
    "correctIndex": 1,
    "rationale": "TPN raises infection risk (central line) and glucose; monitor blood sugar and the site.",
    "category": "Nutrition",
    "examType": "DHA"
  },
  {
    "id": 171,
    "question": "Which instruction is correct for a patient using a metered-dose inhaler with a corticosteroid?",
    "options": [
      "Avoid rinsing the mouth",
      "Rinse the mouth after use to prevent oral thrush",
      "Use it only during attacks",
      "Hold the breath for 1 second only"
    ],
    "correctIndex": 1,
    "rationale": "Rinsing after inhaled corticosteroids prevents oral candidiasis.",
    "category": "Respiratory",
    "examType": "DHA"
  },
  {
    "id": 172,
    "question": "A patient post-cataract surgery should be taught to avoid:",
    "options": [
      "Wearing the eye shield",
      "Bending at the waist and heavy lifting",
      "Instilling prescribed drops",
      "Wearing sunglasses"
    ],
    "correctIndex": 1,
    "rationale": "Bending and lifting raise intraocular pressure; avoid them after eye surgery.",
    "category": "Sensory",
    "examType": "DHA"
  },
  {
    "id": 173,
    "question": "A patient with gout is advised to limit:",
    "options": [
      "Water",
      "Purine-rich foods such as organ meats and shellfish",
      "Whole grains",
      "Fresh fruit"
    ],
    "correctIndex": 1,
    "rationale": "High-purine foods raise uric acid; limiting them helps manage gout.",
    "category": "Musculoskeletal",
    "examType": "DHA"
  },
  {
    "id": 174,
    "question": "The nurse notes a patient's INR is 5.5 on warfarin with minor bleeding. The nurse anticipates:",
    "options": [
      "Increasing warfarin",
      "Holding warfarin and possibly giving vitamin K",
      "Giving aspirin",
      "Giving heparin"
    ],
    "correctIndex": 1,
    "rationale": "A high INR with bleeding requires holding warfarin; vitamin K reverses it.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 175,
    "question": "A patient with chronic kidney disease should limit dietary:",
    "options": [
      "Carbohydrates only",
      "Potassium, phosphorus and sodium as prescribed",
      "Vitamin C",
      "Fibre"
    ],
    "correctIndex": 1,
    "rationale": "CKD diets restrict potassium, phosphorus and sodium to reduce complications.",
    "category": "Renal",
    "examType": "DHA"
  },
  {
    "id": 176,
    "question": "Which is an early sign of shock the nurse should not overlook?",
    "options": [
      "Bradycardia",
      "Restlessness/anxiety and tachycardia",
      "Warm dry skin",
      "Increased urine output"
    ],
    "correctIndex": 1,
    "rationale": "Early compensated shock shows tachycardia and restlessness before hypotension develops.",
    "category": "Shock",
    "examType": "DHA"
  },
  {
    "id": 177,
    "question": "A patient receiving morphine for pain develops a respiratory rate of 8. The nurse should:",
    "options": [
      "Give more morphine",
      "Hold the opioid, stimulate the patient and prepare naloxone if needed",
      "Increase IV fluids only",
      "Apply oxygen and continue morphine"
    ],
    "correctIndex": 1,
    "rationale": "Opioid-induced respiratory depression requires holding the drug and readiness to give naloxone.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 178,
    "question": "A patient with a new colostomy expresses fear about the change. The nurse should:",
    "options": [
      "Avoid discussing it",
      "Acknowledge feelings, provide teaching and involve a stoma nurse",
      "Tell them it is nothing to worry about",
      "Delay all teaching"
    ],
    "correctIndex": 1,
    "rationale": "Acknowledge emotions and provide support/education to promote adjustment and self-care.",
    "category": "Psychosocial",
    "examType": "DHA"
  },
  {
    "id": 179,
    "question": "Which lab result requires the nurse to hold a scheduled dose of metformin before contrast imaging?",
    "options": [
      "Normal creatinine",
      "Elevated creatinine/impaired renal function",
      "Low cholesterol",
      "Normal glucose"
    ],
    "correctIndex": 1,
    "rationale": "Metformin is held around contrast in renal impairment due to lactic-acidosis risk.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 180,
    "question": "A patient is on droplet precautions for influenza. Visitors should:",
    "options": [
      "Enter without any protection",
      "Wear a surgical mask within the patient's room",
      "Wear an N95 always",
      "Avoid hand hygiene"
    ],
    "correctIndex": 1,
    "rationale": "Droplet precautions require a surgical mask near the patient; hand hygiene is always performed.",
    "category": "Infection Control",
    "examType": "DHA"
  },
  {
    "id": 181,
    "question": "The nurse is caring for a patient after a stroke with dysphagia. The priority is to:",
    "options": [
      "Offer thin liquids freely",
      "Assess swallowing, keep upright and follow the prescribed texture-modified diet",
      "Feed quickly",
      "Lay the patient flat to eat"
    ],
    "correctIndex": 1,
    "rationale": "Dysphagia raises aspiration risk; assess swallowing, sit upright and modify diet textures.",
    "category": "Neurology",
    "examType": "DHA"
  },
  {
    "id": 182,
    "question": "A patient's chest tube becomes disconnected from the drainage system. The nurse should:",
    "options": [
      "Clamp the tube and call later",
      "Submerge the tube end in sterile water and obtain a new system",
      "Reconnect with tape only",
      "Remove the chest tube"
    ],
    "correctIndex": 1,
    "rationale": "Placing the tube end in sterile water restores a water seal and prevents air entry while a new unit is obtained.",
    "category": "Respiratory",
    "examType": "DHA"
  },
  {
    "id": 183,
    "question": "Which finding indicates effective patient teaching about nitroglycerin for angina?",
    "options": [
      "'I will take up to three tablets, five minutes apart, and call emergency services if pain persists.'",
      "'I will take ten tablets at once.'",
      "'I will store it in sunlight.'",
      "'I will take it only after pain stops.'"
    ],
    "correctIndex": 0,
    "rationale": "Patients take a tablet every 5 minutes up to three doses and seek emergency help if pain persists.",
    "category": "Cardiac",
    "examType": "DHA"
  },
  {
    "id": 184,
    "question": "A patient with Parkinson's disease is at greatest risk for:",
    "options": [
      "Hypertension",
      "Falls due to bradykinesia and postural instability",
      "Hyperthermia",
      "Polyuria"
    ],
    "correctIndex": 1,
    "rationale": "Rigidity, bradykinesia and postural instability markedly increase fall risk.",
    "category": "Neurology",
    "examType": "DHA"
  },
  {
    "id": 185,
    "question": "The nurse should question an order to give potassium to a patient with:",
    "options": [
      "Hypokalemia",
      "Anuria/renal failure with hyperkalemia",
      "Diuretic-induced low potassium",
      "Vomiting and low potassium"
    ],
    "correctIndex": 1,
    "rationale": "Giving potassium to an anuric/hyperkalemic patient is dangerous; clarify the order.",
    "category": "Pharmacology Safety",
    "examType": "DHA"
  },
  {
    "id": 186,
    "question": "A patient with COPD and chronic CO2 retention should receive oxygen via:",
    "options": [
      "A non-rebreather at 15 L/min routinely",
      "Controlled low-flow oxygen titrated to target SpO2",
      "No oxygen ever",
      "High-flow regardless of saturation"
    ],
    "correctIndex": 1,
    "rationale": "Controlled low-flow oxygen titrated to target avoids suppressing the hypoxic drive.",
    "category": "Respiratory",
    "examType": "DHA"
  },
  {
    "id": 187,
    "question": "Which is the correct technique for a subcutaneous insulin injection?",
    "options": [
      "Inject at 90 degrees into a pinched fold (or 45 if thin) and rotate sites",
      "Always aspirate vigorously",
      "Massage the site firmly afterwards",
      "Use the same site daily"
    ],
    "correctIndex": 0,
    "rationale": "Subcutaneous insulin is given at 45-90 degrees into a fold with site rotation; massaging is avoided.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 188,
    "question": "A patient with acute kidney injury has a urine output of 15 mL/hr. The nurse should:",
    "options": [
      "Document and ignore",
      "Notify the physician; this is below the adequate output of about 30 mL/hr",
      "Increase potassium",
      "Restrict oxygen"
    ],
    "correctIndex": 1,
    "rationale": "Output under ~0.5 mL/kg/hr (about 30 mL/hr) signals inadequate perfusion/renal function; report it.",
    "category": "Renal",
    "examType": "DHA"
  },
  {
    "id": 189,
    "question": "A patient with a fractured femur suddenly develops dyspnoea, confusion and petechiae. The nurse suspects:",
    "options": [
      "Hypoglycaemia",
      "Fat embolism syndrome",
      "Anxiety",
      "Constipation"
    ],
    "correctIndex": 1,
    "rationale": "Long-bone fractures can cause fat embolism, presenting with respiratory distress, neuro changes and petechiae.",
    "category": "Musculoskeletal",
    "examType": "DHA"
  },
  {
    "id": 190,
    "question": "A patient is prescribed iron supplements. The nurse teaches to:",
    "options": [
      "Take with antacids",
      "Take with vitamin C/orange juice to enhance absorption and expect dark stools",
      "Avoid all fluids",
      "Crush enteric-coated tablets"
    ],
    "correctIndex": 1,
    "rationale": "Vitamin C improves iron absorption; stools darken normally; avoid antacids that reduce absorption.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 191,
    "question": "Which action prevents catheter-associated urinary tract infection?",
    "options": [
      "Routine catheter irrigation",
      "Keeping the drainage bag below bladder level and removing the catheter early",
      "Opening the system frequently",
      "Raising the bag above the bladder"
    ],
    "correctIndex": 1,
    "rationale": "Keep a closed system, bag below bladder level and remove the catheter as soon as possible.",
    "category": "Infection Control",
    "examType": "DHA"
  },
  {
    "id": 192,
    "question": "A patient on a low-sodium diet should avoid:",
    "options": [
      "Fresh vegetables",
      "Processed and canned foods high in sodium",
      "Plain rice",
      "Fresh fruit"
    ],
    "correctIndex": 1,
    "rationale": "Processed/canned foods are high in sodium and should be limited.",
    "category": "Nutrition",
    "examType": "DHA"
  },
  {
    "id": 193,
    "question": "A patient with myasthenia gravis is most at risk for:",
    "options": [
      "Hypertension",
      "Respiratory failure from muscle weakness",
      "Hyperglycaemia",
      "Polyuria"
    ],
    "correctIndex": 1,
    "rationale": "Progressive muscle weakness can impair respiratory muscles, risking respiratory failure (myasthenic crisis).",
    "category": "Neurology",
    "examType": "DHA"
  },
  {
    "id": 194,
    "question": "The nurse is reviewing a patient's potassium of 2.9 mEq/L. An expected ECG change is:",
    "options": [
      "Tall peaked T-waves",
      "Flat T-waves and U-waves",
      "No change",
      "Shortened QT"
    ],
    "correctIndex": 1,
    "rationale": "Hypokalemia causes flat T-waves and prominent U-waves.",
    "category": "Fluid & Electrolytes",
    "examType": "DHA"
  },
  {
    "id": 195,
    "question": "A patient post-abdominal surgery has not passed flatus and has a distended abdomen. This suggests:",
    "options": [
      "Normal recovery",
      "Paralytic ileus",
      "Improved peristalsis",
      "Diarrhoea"
    ],
    "correctIndex": 1,
    "rationale": "Absent flatus with distension after surgery suggests paralytic ileus; keep NPO and assess bowel sounds.",
    "category": "Post-operative",
    "examType": "DHA"
  },
  {
    "id": 196,
    "question": "Which is a priority when caring for a patient with neutropenia?",
    "options": [
      "Encourage fresh flowers in the room",
      "Strict protective (neutropenic) precautions and avoid sources of infection",
      "Share equipment freely",
      "Skip hand hygiene"
    ],
    "correctIndex": 1,
    "rationale": "Neutropenic patients need protective precautions and infection-source avoidance (no fresh flowers/raw foods).",
    "category": "Oncology",
    "examType": "DHA"
  },
  {
    "id": 197,
    "question": "A patient receiving chemotherapy reports tingling and numbness in the hands and feet. This indicates:",
    "options": [
      "Normal hydration",
      "Peripheral neuropathy - report it",
      "Improved circulation",
      "Hyperkalemia"
    ],
    "correctIndex": 1,
    "rationale": "Chemotherapy can cause peripheral neuropathy; report it for dose review and safety measures.",
    "category": "Oncology",
    "examType": "DHA"
  },
  {
    "id": 198,
    "question": "A patient with suspected meningitis has a stiff neck and photophobia. Priority precautions are:",
    "options": [
      "Contact only",
      "Droplet precautions until the cause is known",
      "No precautions",
      "Airborne only"
    ],
    "correctIndex": 1,
    "rationale": "Bacterial meningitis (e.g., meningococcal) requires droplet precautions until ruled out.",
    "category": "Infection Control",
    "examType": "DHA"
  },
  {
    "id": 199,
    "question": "Which assessment finding indicates compartment syndrome in a casted limb?",
    "options": [
      "Warm pink toes",
      "Severe pain unrelieved by analgesia, pallor and paraesthesia",
      "Strong pulses with no pain",
      "Mild itching"
    ],
    "correctIndex": 1,
    "rationale": "Unrelenting pain with pallor, paraesthesia and pulselessness signals compartment syndrome - an emergency.",
    "category": "Musculoskeletal",
    "examType": "DHA"
  },
  {
    "id": 200,
    "question": "A patient on a fluid restriction repeatedly asks for water. The nurse should:",
    "options": [
      "Allow unlimited water",
      "Offer ice chips/oral care within the restriction and explain the rationale",
      "Ignore the request",
      "Remove all fluids"
    ],
    "correctIndex": 1,
    "rationale": "Within the restriction, ice chips and oral care relieve thirst; explain the reason to support adherence.",
    "category": "Fundamentals",
    "examType": "DHA"
  },
  {
    "id": 201,
    "question": "The nurse should give priority to which postoperative patient?",
    "options": [
      "A patient with mild incisional pain",
      "A patient with oxygen saturation 88% and decreased breath sounds",
      "A patient requesting a blanket",
      "A patient asking about visiting hours"
    ],
    "correctIndex": 1,
    "rationale": "Hypoxaemia with decreased breath sounds (possible atelectasis) is the priority requiring intervention.",
    "category": "Post-operative",
    "examType": "DHA"
  },
  {
    "id": 202,
    "question": "A patient with hypertension is started on an ACE inhibitor. The nurse teaches to report:",
    "options": [
      "Mild headache that resolves",
      "Swelling of the lips/tongue (angioedema) immediately",
      "Improved blood pressure",
      "Normal urination"
    ],
    "correctIndex": 1,
    "rationale": "Angioedema is a serious ACE-inhibitor reaction requiring immediate attention.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 203,
    "question": "Synchronised cardioversion is appropriate for:",
    "options": [
      "Pulseless VT",
      "Ventricular fibrillation",
      "Unstable SVT with a pulse",
      "Asystole"
    ],
    "correctIndex": 2,
    "rationale": "Cardioversion is for unstable rhythms that still have a pulse.",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 204,
    "question": "Adult one-rescuer CPR ratio is:",
    "options": [
      "15:2",
      "30:2",
      "5:1",
      "10:2"
    ],
    "correctIndex": 1,
    "rationale": "One-rescuer adult CPR uses 30 compressions to 2 breaths.",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 205,
    "question": "Infuse 500 mL over 4 h with macrodrip 15 gtt/mL. Rate (gtt/min)?",
    "options": [
      "~21",
      "~31",
      "~45",
      "~60"
    ],
    "correctIndex": 1,
    "rationale": "(500 x 15)/(4 x 60) = 7500/240 = ~31 gtt/min.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 206,
    "question": "A manic patient has not eaten for a day due to constant activity. The nurse should provide:",
    "options": [
      "A formal sit-down multi-course meal",
      "Portable high-calorie finger foods",
      "Only fluids",
      "Nothing until calm"
    ],
    "correctIndex": 1,
    "rationale": "Finger foods allow nutrition intake while the patient remains active.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 207,
    "question": "Before administering an antipsychotic long-term, the nurse monitors for:",
    "options": [
      "Hair growth",
      "Metabolic effects and movement disorders (EPS/tardive dyskinesia)",
      "Improved vision",
      "Lowered cholesterol"
    ],
    "correctIndex": 1,
    "rationale": "Long-term antipsychotics require monitoring for metabolic effects and movement disorders.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 208,
    "question": "Which adult vital sign is abnormal and needs action?",
    "options": [
      "Temp 36.8 C",
      "HR 72",
      "RR 30",
      "BP 118/76"
    ],
    "correctIndex": 2,
    "rationale": "Normal RR is 12-20; 30 (tachypnoea) is abnormal.",
    "category": "Fundamentals",
    "examType": "DHA"
  },
  {
    "id": 209,
    "question": "A patient in suspected sepsis should have which obtained BEFORE antibiotics?",
    "options": [
      "A meal",
      "Blood cultures",
      "Discharge papers",
      "Physiotherapy"
    ],
    "correctIndex": 1,
    "rationale": "Blood cultures are drawn before antibiotics to identify the organism.",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 210,
    "question": "Improvement of energy before mood lifts in depression is concerning because:",
    "options": [
      "It means recovery is complete",
      "The patient may now have energy to act on suicidal thoughts",
      "It is unrelated to risk",
      "Medication has failed"
    ],
    "correctIndex": 1,
    "rationale": "This is a higher-risk window for suicide attempts; maintain vigilance.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 211,
    "question": "Which principle means 'do no harm'?",
    "options": [
      "Beneficence",
      "Autonomy",
      "Non-maleficence",
      "Justice"
    ],
    "correctIndex": 2,
    "rationale": "Non-maleficence is the duty to avoid causing harm.",
    "category": "Ethics & Regulations",
    "examType": "DHA"
  },
  {
    "id": 212,
    "question": "Antipsychotic patient develops high fever, rigidity and altered consciousness. Recognise:",
    "options": [
      "Sedation",
      "Neuroleptic malignant syndrome",
      "Mild dystonia",
      "Caffeine withdrawal"
    ],
    "correctIndex": 1,
    "rationale": "This is NMS - stop the drug and treat as a medical emergency.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 213,
    "question": "A patient on an MAOI should avoid:",
    "options": [
      "Water",
      "Aged cheese and cured meats",
      "Rice",
      "Apples"
    ],
    "correctIndex": 1,
    "rationale": "Tyramine-rich foods can trigger a hypertensive crisis with MAOIs.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 214,
    "question": "A patient develops agitation, fever and hyperreflexia on an SSRI plus another serotonergic drug. Suspect:",
    "options": [
      "Anaphylaxis",
      "Serotonin syndrome",
      "Hypoglycaemia",
      "Normal effect"
    ],
    "correctIndex": 1,
    "rationale": "This triad suggests serotonin syndrome; stop serotonergic agents and treat.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 215,
    "question": "A patient with bowel obstruction is typically kept:",
    "options": [
      "On a full diet",
      "NPO with NG decompression",
      "On laxatives only",
      "Ambulating with meals"
    ],
    "correctIndex": 1,
    "rationale": "Bowel obstruction is managed with NPO status and NG tube decompression.",
    "category": "Clinical Core",
    "examType": "DHA"
  },
  {
    "id": 216,
    "question": "Priority assessment for a patient with an AV fistula?",
    "options": [
      "Apply a BP cuff to that arm",
      "Palpate for a thrill and auscultate a bruit",
      "Start an IV in that arm",
      "Keep the arm dependent"
    ],
    "correctIndex": 1,
    "rationale": "Patency is confirmed by a palpable thrill and audible bruit; protect the arm.",
    "category": "Clinical Core",
    "examType": "DHA"
  },
  {
    "id": 217,
    "question": "A patient's BP is 86/54 with dizziness. The nurse should FIRST:",
    "options": [
      "Ambulate the patient",
      "Lay the patient down/raise legs and reassess, notify as needed",
      "Give an antihypertensive",
      "Encourage caffeine"
    ],
    "correctIndex": 1,
    "rationale": "For hypotension, position supine with legs elevated, ensure safety, reassess, and escalate.",
    "category": "Fundamentals",
    "examType": "DHA"
  },
  {
    "id": 218,
    "question": "Naloxone is given and the patient improves but becomes drowsy again after 30 minutes. The nurse should:",
    "options": [
      "Do nothing",
      "Reassess and anticipate repeat dosing",
      "Discharge the patient",
      "Give a sedative"
    ],
    "correctIndex": 1,
    "rationale": "Naloxone has a short half-life; opioids may outlast it, so reassess and repeat as ordered.",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 219,
    "question": "Potassium 6.8 with peaked T-waves. Give FIRST:",
    "options": [
      "Oral potassium",
      "IV calcium gluconate",
      "A potassium-sparing diuretic",
      "Saline only"
    ],
    "correctIndex": 1,
    "rationale": "Calcium gluconate protects the myocardium first; then lower the potassium.",
    "category": "Clinical Core",
    "examType": "DHA"
  },
  {
    "id": 220,
    "question": "Earliest sign of rising intracranial pressure is:",
    "options": [
      "Fixed dilated pupil",
      "Decerebrate posturing",
      "Change in level of consciousness",
      "Cushing's triad"
    ],
    "correctIndex": 2,
    "rationale": "A change in LOC is the earliest, most sensitive sign; the others are late.",
    "category": "Clinical Core",
    "examType": "DHA"
  },
  {
    "id": 221,
    "question": "Which is NOT one of the rights of medication administration?",
    "options": [
      "Right dose",
      "Right route",
      "Right colour",
      "Right time"
    ],
    "correctIndex": 2,
    "rationale": "'Right colour' is not a recognised medication right.",
    "category": "Fundamentals",
    "examType": "DHA"
  },
  {
    "id": 222,
    "question": "The drug given to prevent eclamptic seizures is:",
    "options": [
      "Oxytocin",
      "Magnesium sulfate",
      "Insulin",
      "Heparin"
    ],
    "correctIndex": 1,
    "rationale": "Magnesium sulfate prevents seizures in pre-eclampsia.",
    "category": "Maternity & Child Care",
    "examType": "DHA"
  },
  {
    "id": 223,
    "question": "A reliable sign of return of spontaneous circulation/effective CPR is:",
    "options": [
      "Falling EtCO2",
      "Rising end-tidal CO2 and a palpable pulse",
      "Dilated pupils",
      "Cold skin"
    ],
    "correctIndex": 1,
    "rationale": "A sharp rise in EtCO2 and a pulse indicate ROSC/effective CPR.",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 224,
    "question": "The priority assessment after birth of the placenta is:",
    "options": [
      "Newborn weight",
      "Maternal fundal tone and bleeding",
      "Visitor list",
      "Room temperature"
    ],
    "correctIndex": 1,
    "rationale": "Assess fundal tone and lochia to detect early postpartum haemorrhage.",
    "category": "Maternity & Child Care",
    "examType": "DHA"
  },
  {
    "id": 225,
    "question": "Which statement is non-therapeutic?",
    "options": [
      "'Tell me more about that.'",
      "'Everything happens for a reason.'",
      "'You sound frustrated.'",
      "'I'm here to listen.'"
    ],
    "correctIndex": 1,
    "rationale": "'Everything happens for a reason' minimises feelings and is non-therapeutic.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 226,
    "question": "A 15-year-old needs surgery. Consent is obtained from:",
    "options": [
      "The minor alone",
      "A friend",
      "The parent/legal guardian",
      "The nurse"
    ],
    "correctIndex": 2,
    "rationale": "Minors require consent from a parent or legal guardian (except where emancipated/emergency).",
    "category": "Ethics & Regulations",
    "examType": "DHA"
  },
  {
    "id": 227,
    "question": "PEA is best described as:",
    "options": [
      "A shockable rhythm",
      "An organised rhythm without a pulse",
      "Normal sinus rhythm",
      "Sinus bradycardia"
    ],
    "correctIndex": 1,
    "rationale": "PEA shows electrical activity but no pulse and is non-shockable.",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 228,
    "question": "Shoulder dystocia is managed with:",
    "options": [
      "Fundal pressure",
      "McRoberts maneuver and suprapubic pressure",
      "Immediate forceps",
      "Maternal pushing only"
    ],
    "correctIndex": 1,
    "rationale": "McRoberts with suprapubic pressure relieves dystocia; fundal pressure is contraindicated.",
    "category": "Maternity & Child Care",
    "examType": "DHA"
  },
  {
    "id": 229,
    "question": "Which is a reversible cause of cardiac arrest (an 'H' or 'T')?",
    "options": [
      "Hyperlipidaemia",
      "Hypoxia",
      "Hypertension",
      "Hyperthyroid history"
    ],
    "correctIndex": 1,
    "rationale": "Hypoxia is a reversible 'H' cause; others include hypovolaemia, hypo/hyperkalemia, tension pneumothorax, tamponade, thrombosis, toxins.",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 230,
    "question": "A patient with hyponatremia and confusion needs:",
    "options": [
      "Rapid sodium correction",
      "Slow, controlled sodium correction",
      "Free water boluses",
      "No intervention"
    ],
    "correctIndex": 1,
    "rationale": "Correct sodium slowly to avoid osmotic demyelination.",
    "category": "Clinical Core",
    "examType": "DHA"
  },
  {
    "id": 231,
    "question": "A patient on an SSRI plus another serotonergic drug develops fever and hyperreflexia. The nurse should:",
    "options": [
      "Continue both drugs",
      "Stop serotonergic agents and notify the physician",
      "Give more SSRI",
      "Encourage exercise"
    ],
    "correctIndex": 1,
    "rationale": "Suspected serotonin syndrome requires stopping the offending agents and urgent management.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 232,
    "question": "After caring for a C. difficile patient, the nurse should:",
    "options": [
      "Use alcohol rub and move on",
      "Wash hands with soap and water",
      "Skip hand hygiene",
      "Re-use the gown"
    ],
    "correctIndex": 1,
    "rationale": "Soap-and-water washing physically removes C. difficile spores.",
    "category": "Infection Control",
    "examType": "DHA"
  },
  {
    "id": 233,
    "question": "A postpartum patient has heavy lochia and a boggy fundus. FIRST action:",
    "options": [
      "Give oxytocin",
      "Massage the fundus",
      "Call the physician",
      "Insert a catheter"
    ],
    "correctIndex": 1,
    "rationale": "Fundal massage is the immediate first action for uterine atony.",
    "category": "Maternity & Child Care",
    "examType": "DHA"
  },
  {
    "id": 234,
    "question": "The correct order to don PPE is:",
    "options": [
      "Gloves, gown, mask",
      "Gown, mask, goggles, gloves",
      "Mask, gloves, gown",
      "Goggles, gloves, gown"
    ],
    "correctIndex": 1,
    "rationale": "Don gown, then mask, then goggles/face shield, then gloves.",
    "category": "Infection Control",
    "examType": "DHA"
  },
  {
    "id": 235,
    "question": "Cushing's triad (hypertension with widening pulse pressure, bradycardia, irregular breathing) indicates:",
    "options": [
      "Sepsis",
      "Rising intracranial pressure/herniation",
      "Hypoglycaemia",
      "Anaphylaxis"
    ],
    "correctIndex": 1,
    "rationale": "Cushing's triad is a late, ominous sign of raised ICP.",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 236,
    "question": "Best position for a dyspneic patient is:",
    "options": [
      "Supine flat",
      "High-Fowler's",
      "Trendelenburg",
      "Prone"
    ],
    "correctIndex": 1,
    "rationale": "Upright high-Fowler's improves lung expansion and eases breathing.",
    "category": "Fundamentals",
    "examType": "DHA"
  },
  {
    "id": 237,
    "question": "The therapeutic milieu aims to:",
    "options": [
      "Isolate patients",
      "Provide a safe, structured, healing environment",
      "Maximise stimulation",
      "Replace medication"
    ],
    "correctIndex": 1,
    "rationale": "A therapeutic milieu offers a safe, structured environment that supports recovery.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 238,
    "question": "Varicella (chickenpox) requires which precautions?",
    "options": [
      "Contact only",
      "Droplet only",
      "Airborne (and contact)",
      "Standard only"
    ],
    "correctIndex": 2,
    "rationale": "Varicella is spread by the airborne route (with contact precautions for lesions).",
    "category": "Infection Control",
    "examType": "DHA"
  },
  {
    "id": 239,
    "question": "A patient vomiting for 3 days likely has which acid-base imbalance?",
    "options": [
      "Metabolic acidosis",
      "Metabolic alkalosis",
      "Respiratory acidosis",
      "Respiratory alkalosis"
    ],
    "correctIndex": 1,
    "rationale": "Loss of gastric acid from vomiting causes metabolic alkalosis.",
    "category": "Clinical Core",
    "examType": "DHA"
  },
  {
    "id": 240,
    "question": "A patient with chest pain receives nitroglycerin. The nurse monitors for:",
    "options": [
      "Hypertension",
      "Hypotension and headache",
      "Bradycardia only",
      "Hyperglycaemia"
    ],
    "correctIndex": 1,
    "rationale": "Nitroglycerin is a vasodilator; watch for hypotension and headache.",
    "category": "Clinical Core",
    "examType": "DHA"
  },
  {
    "id": 241,
    "question": "A burn patient with facial burns, soot and hoarseness needs priority attention to the:",
    "options": [
      "Skin only",
      "Airway (inhalation injury)",
      "Diet",
      "Mobility"
    ],
    "correctIndex": 1,
    "rationale": "Inhalation injury threatens the airway; secure it early.",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 242,
    "question": "A patient with a delusion insists staff are poisoning him. The nurse should:",
    "options": [
      "Agree to build trust",
      "Argue with evidence",
      "Acknowledge the feeling without reinforcing the belief",
      "Avoid the patient"
    ],
    "correctIndex": 2,
    "rationale": "Acknowledge the underlying feeling (fear) without confirming or arguing the delusion.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 243,
    "question": "Warfarin therapy is monitored with:",
    "options": [
      "aPTT",
      "PT/INR",
      "CBC only",
      "Blood glucose"
    ],
    "correctIndex": 1,
    "rationale": "Warfarin is monitored with PT/INR (target 2-3).",
    "category": "Pharmacology",
    "examType": "DHA"
  },
  {
    "id": 244,
    "question": "Which vaccine is contraindicated in pregnancy?",
    "options": [
      "Inactivated influenza",
      "Tetanus toxoid",
      "MMR (live)",
      "Hepatitis B"
    ],
    "correctIndex": 2,
    "rationale": "Live vaccines such as MMR are avoided in pregnancy.",
    "category": "Infection Control",
    "examType": "DHA"
  },
  {
    "id": 245,
    "question": "A patient on a heparin infusion is monitored with:",
    "options": [
      "INR",
      "aPTT",
      "Blood glucose",
      "Lipid panel"
    ],
    "correctIndex": 1,
    "rationale": "Heparin therapy is monitored with aPTT (warfarin uses INR).",
    "category": "Clinical Core",
    "examType": "DHA"
  },
  {
    "id": 246,
    "question": "Reporting suspected child abuse is:",
    "options": [
      "Optional",
      "A mandatory legal/ethical duty",
      "A breach of confidentiality to avoid",
      "Only the physician's job"
    ],
    "correctIndex": 1,
    "rationale": "Suspected abuse must be reported under child/vulnerable-person protection requirements; it overrides ordinary confidentiality.",
    "category": "Ethics & Regulations",
    "examType": "DHA"
  },
  {
    "id": 247,
    "question": "Treating all patients equally regardless of nationality reflects:",
    "options": [
      "Autonomy",
      "Justice",
      "Beneficence",
      "Fidelity"
    ],
    "correctIndex": 1,
    "rationale": "Justice is fair, equal treatment for all.",
    "category": "Ethics & Regulations",
    "examType": "DHA"
  },
  {
    "id": 248,
    "question": "The nurse believes an order is unsafe. The best action is to:",
    "options": [
      "Carry it out anyway",
      "Ignore it silently",
      "Question and clarify it, escalating if needed",
      "Have a UAP do it"
    ],
    "correctIndex": 2,
    "rationale": "As advocate, the nurse clarifies and questions unsafe orders and escalates through the chain of command.",
    "category": "Ethics & Regulations",
    "examType": "DHA"
  },
  {
    "id": 249,
    "question": "A patient experiencing a flashback (PTSD) is best helped by:",
    "options": [
      "Restraining immediately",
      "Grounding techniques and reorientation to the present and safety",
      "Leaving them alone",
      "Arguing it is not real"
    ],
    "correctIndex": 1,
    "rationale": "Grounding and reorientation to present safety help during a flashback.",
    "category": "Mental Health",
    "examType": "DHA"
  },
  {
    "id": 250,
    "question": "Informed consent is valid only if the patient is:",
    "options": [
      "Related to staff",
      "Competent, informed, and voluntary",
      "Over 40 years old",
      "Accompanied by family"
    ],
    "correctIndex": 1,
    "rationale": "Valid consent requires a competent, adequately informed patient deciding voluntarily.",
    "category": "Ethics & Regulations",
    "examType": "DHA"
  },
  {
    "id": 251,
    "question": "A patient with major burns receives IV fluids primarily to:",
    "options": [
      "Prevent infection",
      "Maintain circulating volume and perfusion",
      "Improve nutrition",
      "Reduce pain"
    ],
    "correctIndex": 1,
    "rationale": "Large fluid shifts in burns require resuscitation to maintain perfusion (e.g., Parkland formula).",
    "category": "Critical Care",
    "examType": "DHA"
  },
  {
    "id": 252,
    "question": "A type 1 diabetic has glucose 28 mmol/L, ketones, Kussmaul breathing. This is:",
    "options": [
      "Hypoglycaemia",
      "DKA",
      "HHS only",
      "Normal"
    ],
    "correctIndex": 1,
    "rationale": "Hyperglycaemia with ketones and Kussmaul breathing indicates DKA.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 253,
    "question": "Which food must a patient on an MAOI avoid?",
    "options": [
      "Water",
      "Aged cheese",
      "Rice",
      "Bananas in moderation"
    ],
    "correctIndex": 1,
    "rationale": "Tyramine-rich aged cheese can cause a hypertensive crisis with MAOIs.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 254,
    "question": "A COPD patient on high-flow O2 becomes drowsy with slow breathing. The nurse should:",
    "options": [
      "Increase oxygen",
      "Reduce O2 to a controlled target and reassess",
      "Leave to rest",
      "Give a sedative"
    ],
    "correctIndex": 1,
    "rationale": "Excess O2 can suppress the hypoxic drive; titrate down and reassess.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 255,
    "question": "Apical pulse is 54 before digoxin. The nurse should:",
    "options": [
      "Give the dose",
      "Hold and notify the physician",
      "Give half",
      "Recheck in 4 h then give"
    ],
    "correctIndex": 1,
    "rationale": "Hold digoxin for an apical pulse below 60 and notify the physician.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 256,
    "question": "Herd immunity protects:",
    "options": [
      "Only the vaccinated",
      "The unvaccinated and vulnerable when coverage is high",
      "No one",
      "Only adults"
    ],
    "correctIndex": 1,
    "rationale": "High vaccination coverage indirectly protects those who cannot be vaccinated.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 257,
    "question": "FAST is used to identify:",
    "options": [
      "Heart attack",
      "Stroke",
      "Sepsis",
      "Fracture"
    ],
    "correctIndex": 1,
    "rationale": "FAST (Face, Arm, Speech, Time) screens for stroke.",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 258,
    "question": "The MOST appropriate first step in any ethical dilemma is to:",
    "options": [
      "Act on personal values",
      "Gather the facts and identify the patient's wishes",
      "Ask the family to decide",
      "Refuse to participate"
    ],
    "correctIndex": 1,
    "rationale": "Ethical decision-making begins with gathering facts and clarifying the patient's values/wishes.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 259,
    "question": "A patient with a suspected stroke has a last-known-well time 1 hour ago. The priority is to:",
    "options": [
      "Delay imaging",
      "Expedite assessment and CT to determine eligibility for treatment",
      "Give food",
      "Encourage sleep"
    ],
    "correctIndex": 1,
    "rationale": "Time is brain - rapid assessment/imaging determines thrombolysis/thrombectomy eligibility.",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 260,
    "question": "The MOST important assessment for a depressed patient is:",
    "options": [
      "Sleep pattern",
      "Risk of suicide",
      "Appetite",
      "Hobbies"
    ],
    "correctIndex": 1,
    "rationale": "Safety - suicide risk - is the priority assessment.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 261,
    "question": "A restraint should be tied to the:",
    "options": [
      "Side rail",
      "Bed frame with a quick-release knot",
      "Headboard tightly",
      "IV pole"
    ],
    "correctIndex": 1,
    "rationale": "Tie to the bed frame with a quick-release knot - never to side rails.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 262,
    "question": "Primary prevention is best illustrated by:",
    "options": [
      "Mammography screening",
      "Immunisation and health education",
      "Stroke rehabilitation",
      "Wound care"
    ],
    "correctIndex": 1,
    "rationale": "Primary prevention stops disease before it occurs (e.g., vaccination, education).",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 263,
    "question": "A trauma patient is restless, tachycardic and hypotensive after blunt abdominal injury. Suspect:",
    "options": [
      "Anxiety",
      "Internal haemorrhage/hypovolemic shock",
      "Simple pain",
      "Dehydration only"
    ],
    "correctIndex": 1,
    "rationale": "These signs suggest internal bleeding and hypovolemic shock; act urgently.",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 264,
    "question": "Late decelerations on the fetal monitor indicate:",
    "options": [
      "Head compression",
      "Uteroplacental insufficiency",
      "Normal variability",
      "Cord around neck only"
    ],
    "correctIndex": 1,
    "rationale": "Late decelerations reflect uteroplacental insufficiency; reposition, give O2, stop oxytocin, notify provider.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 265,
    "question": "Before giving a beta-blocker, the nurse checks:",
    "options": [
      "Temperature only",
      "Heart rate and blood pressure",
      "Blood glucose",
      "Urine output"
    ],
    "correctIndex": 1,
    "rationale": "Hold beta-blockers for bradycardia/hypotension.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 266,
    "question": "To prevent aspiration during feeding, position the patient:",
    "options": [
      "Flat supine",
      "Upright at 90 degrees (high-Fowler's)",
      "Trendelenburg",
      "Left side flat"
    ],
    "correctIndex": 1,
    "rationale": "Sitting upright reduces aspiration risk during and after meals.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 267,
    "question": "A nurse gives a medication to the wrong patient but no harm occurs. The nurse should:",
    "options": [
      "Say nothing",
      "Complete an incident report and monitor the patient",
      "Document it in another patient's chart",
      "Blame the pharmacy"
    ],
    "correctIndex": 1,
    "rationale": "Errors are reported via an incident report and the patient is monitored, regardless of harm.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 268,
    "question": "Sudden dyspnoea, pleuritic chest pain and tachycardia post-op suggests:",
    "options": [
      "Pneumonia",
      "Pulmonary embolism",
      "Asthma",
      "Anxiety only"
    ],
    "correctIndex": 1,
    "rationale": "This classic picture suggests PE - give oxygen and anticipate anticoagulation.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 269,
    "question": "Which statement about IV potassium is correct?",
    "options": [
      "Give by rapid push",
      "Always dilute and infuse via pump",
      "Give undiluted slowly",
      "Mix with the patient's blood"
    ],
    "correctIndex": 1,
    "rationale": "KCl must be diluted and infused via pump - never pushed.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 270,
    "question": "Before any medication, the nurse must verify:",
    "options": [
      "The patient's insurance",
      "Allergies",
      "Room number",
      "Visiting hours"
    ],
    "correctIndex": 1,
    "rationale": "Allergy status must be confirmed before administration.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 271,
    "question": "Two-identifier checking applies to:",
    "options": [
      "Only high-risk drugs",
      "All medications, procedures and specimens",
      "Only IV drugs",
      "Only new patients"
    ],
    "correctIndex": 1,
    "rationale": "Two-identifier verification applies to all medications, procedures, and specimen collection.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 272,
    "question": "In DKA, as insulin is given the nurse closely monitors:",
    "options": [
      "Sodium only",
      "Potassium",
      "Calcium",
      "Magnesium"
    ],
    "correctIndex": 1,
    "rationale": "Insulin drives potassium into cells, risking hypokalemia; monitor closely.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 273,
    "question": "Infuse 1 L over 10 hours. Pump rate (mL/hr)?",
    "options": [
      "50",
      "100",
      "125",
      "200"
    ],
    "correctIndex": 1,
    "rationale": "1000 mL / 10 h = 100 mL/hr.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 274,
    "question": "Which finding requires immediate defibrillation?",
    "options": [
      "Sinus tachycardia with a pulse",
      "Pulseless ventricular tachycardia",
      "Atrial fibrillation with a pulse",
      "Sinus bradycardia"
    ],
    "correctIndex": 1,
    "rationale": "Pulseless VT is shockable and requires immediate defibrillation.",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 275,
    "question": "A competent adult refuses a blood transfusion for religious reasons. The nurse should:",
    "options": [
      "Administer it because it is life-saving",
      "Respect the refusal, document it, and notify the physician",
      "Ask the family to consent instead",
      "Wait until the patient is unconscious"
    ],
    "correctIndex": 1,
    "rationale": "A competent adult has the right to refuse treatment (autonomy). The nurse documents the informed refusal and notifies the physician.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 276,
    "question": "Priority for a newborn immediately after birth:",
    "options": [
      "Weigh the baby",
      "Maintain airway/breathing and warmth",
      "Give a bath",
      "Footprint the baby"
    ],
    "correctIndex": 1,
    "rationale": "Airway, breathing and thermoregulation take priority at birth.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 277,
    "question": "According to Maslow, which need is highest priority?",
    "options": [
      "Self-esteem",
      "Belonging",
      "Oxygenation",
      "Spiritual support"
    ],
    "correctIndex": 2,
    "rationale": "Physiological needs like oxygenation are the base of the hierarchy.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 278,
    "question": "Carboprost (Hemabate) for PPH is avoided in patients with:",
    "options": [
      "Diabetes",
      "Asthma",
      "Anaemia",
      "Hypothyroidism"
    ],
    "correctIndex": 1,
    "rationale": "Carboprost can cause bronchospasm and is avoided in asthma.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 279,
    "question": "First nursing action for surgical wound evisceration:",
    "options": [
      "Push organs back in",
      "Cover with sterile saline-soaked gauze and notify surgeon",
      "Apply a tight dry bandage",
      "Give oral fluids"
    ],
    "correctIndex": 1,
    "rationale": "Keep exposed viscera moist with sterile saline gauze; position low-Fowler's, knees flexed; notify surgeon.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 280,
    "question": "First action when a monitored patient suddenly becomes unresponsive and pulseless:",
    "options": [
      "Call family",
      "Start CPR and activate the code/defibrillator",
      "Document the time only",
      "Give oral glucose"
    ],
    "correctIndex": 1,
    "rationale": "Begin CPR immediately and activate emergency response/defibrillation.",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 281,
    "question": "Which task is appropriate to delegate to a UAP?",
    "options": [
      "Assessing a new admission",
      "Administering oral medication",
      "Assisting a stable patient to ambulate",
      "Teaching wound care"
    ],
    "correctIndex": 2,
    "rationale": "Routine ambulation of a stable patient is delegable. Assessment, medication, and teaching require the licensed nurse.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 282,
    "question": "A suicidal patient with a detailed plan and access to means requires:",
    "options": [
      "Discharge with follow-up",
      "Continuous one-to-one observation and removal of means",
      "A group session",
      "No special action"
    ],
    "correctIndex": 1,
    "rationale": "High-risk patients need continuous observation and a safe environment.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 283,
    "question": "A newborn has APGAR 5 at one minute. The nurse should:",
    "options": [
      "Document only",
      "Provide stimulation and oxygen, reassess",
      "Start compressions",
      "Delay the 5-minute score"
    ],
    "correctIndex": 1,
    "rationale": "Score 4-6 needs stimulation and oxygen with reassessment.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 284,
    "question": "Which finding in a dialysis patient needs urgent attention?",
    "options": [
      "Bruit over the fistula",
      "Absent thrill over the fistula",
      "Healed access site",
      "Patient resting"
    ],
    "correctIndex": 1,
    "rationale": "Loss of thrill/bruit suggests clotting of the access - an urgent vascular concern.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 285,
    "question": "Hand hygiene after glove removal is needed because:",
    "options": [
      "It is optional",
      "Gloves may have micro-tears and hands can be contaminated during doffing",
      "Gloves are sterile always",
      "It wastes time"
    ],
    "correctIndex": 1,
    "rationale": "Gloves do not replace hand hygiene; hands may be contaminated.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 286,
    "question": "Calculate gtt/min: 1000 mL over 12 h, macrodrip 20 gtt/mL.",
    "options": [
      "~14",
      "~28",
      "~42",
      "~33"
    ],
    "correctIndex": 1,
    "rationale": "(1000 x 20)/(12 x 60) = 20000/720 = ~28 gtt/min.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 287,
    "question": "A laboring patient suddenly has a rigid abdomen and dark bleeding. The nurse should:",
    "options": [
      "Encourage ambulation",
      "Notify the provider urgently and prepare for emergency care",
      "Perform a vaginal exam",
      "Offer a meal"
    ],
    "correctIndex": 1,
    "rationale": "This suggests abruptio placentae - an emergency requiring urgent provider notification.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 288,
    "question": "Which action demonstrates respect for autonomy?",
    "options": [
      "Deciding for the patient",
      "Providing information and supporting the patient's own choice",
      "Persuading the patient to agree with staff",
      "Withholding options"
    ],
    "correctIndex": 1,
    "rationale": "Supporting the patient's informed, voluntary choice respects autonomy.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 289,
    "question": "Lithium patients should be taught to:",
    "options": [
      "Restrict all fluids",
      "Maintain hydration and stable salt intake",
      "Take with grapefruit",
      "Skip doses when well"
    ],
    "correctIndex": 1,
    "rationale": "Stable fluid and sodium intake keep lithium levels safe.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 290,
    "question": "Methylergonovine is contraindicated in patients with:",
    "options": [
      "Diabetes",
      "Hypertension",
      "Anaemia",
      "Asthma"
    ],
    "correctIndex": 1,
    "rationale": "Methylergonovine causes vasoconstriction and is contraindicated in hypertension.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 291,
    "question": "Standard precautions are used for:",
    "options": [
      "Only patients with known infection",
      "Every patient, every time",
      "Only ICU patients",
      "Only during procedures"
    ],
    "correctIndex": 1,
    "rationale": "Standard precautions apply to all patients regardless of diagnosis.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 292,
    "question": "A nurse with a productive cough and fever should:",
    "options": [
      "Work as normal",
      "Report and follow occupational-health/return-to-work policy",
      "Hide symptoms",
      "Only wear gloves"
    ],
    "correctIndex": 1,
    "rationale": "Symptomatic staff must report to occupational health to prevent transmission.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 293,
    "question": "The nurse identifies the patient before medication using:",
    "options": [
      "Bed number",
      "Two identifiers (name + DOB/MRN)",
      "Diagnosis",
      "Appearance"
    ],
    "correctIndex": 1,
    "rationale": "Two identifiers are required; room/bed numbers are not acceptable.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 294,
    "question": "A confused patient keeps climbing out of bed. The FIRST intervention is to:",
    "options": [
      "Apply restraints",
      "Use least-restrictive measures: rounding, bed alarm, move closer to the station",
      "Sedate the patient",
      "Raise all four side rails"
    ],
    "correctIndex": 1,
    "rationale": "Least-restrictive safety measures are tried first; restraints/4 side rails are a last resort.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 295,
    "question": "A child weighing 15 kg is ordered 10 mg/kg. Total dose:",
    "options": [
      "100 mg",
      "150 mg",
      "15 mg",
      "1500 mg"
    ],
    "correctIndex": 1,
    "rationale": "10 mg/kg x 15 kg = 150 mg.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 296,
    "question": "Hand hygiene with alcohol rub is appropriate when:",
    "options": [
      "Hands are visibly soiled",
      "Caring for C. difficile",
      "Hands are not visibly soiled",
      "After using the toilet"
    ],
    "correctIndex": 2,
    "rationale": "Alcohol rub is used when hands are not visibly soiled; soap/water for soiling and spores.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 297,
    "question": "Beck's triad (hypotension, muffled heart sounds, JVD) indicates:",
    "options": [
      "Pneumothorax",
      "Cardiac tamponade",
      "MI",
      "PE"
    ],
    "correctIndex": 1,
    "rationale": "Beck's triad indicates cardiac tamponade - prepare for pericardiocentesis.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 298,
    "question": "A postoperative patient refuses to deep-breathe due to pain. The nurse should:",
    "options": [
      "Skip breathing exercises",
      "Provide analgesia then encourage incentive spirometry",
      "Force the exercise",
      "Document refusal only"
    ],
    "correctIndex": 1,
    "rationale": "Treating pain enables effective breathing exercises that prevent atelectasis/pneumonia.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 299,
    "question": "Painful dark-red bleeding with a rigid uterus suggests:",
    "options": [
      "Placenta previa",
      "Abruptio placentae",
      "Normal show",
      "Cord prolapse"
    ],
    "correctIndex": 1,
    "rationale": "Painful bleeding with a board-like uterus indicates placental abruption.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 300,
    "question": "Before administering a blood-thinner, the nurse should:",
    "options": [
      "Encourage a high-vitamin-K diet",
      "Assess for bleeding and check the relevant clotting test",
      "Give it with aspirin routinely",
      "Skip allergy checks"
    ],
    "correctIndex": 1,
    "rationale": "Assess for bleeding and verify the monitoring test (aPTT/INR) before anticoagulants.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 301,
    "question": "Which is therapeutic communication?",
    "options": [
      "'I'm sure it'll be fine.'",
      "'If I were you...'",
      "'You seem worried; tell me more.'",
      "'Why are you upset?'"
    ],
    "correctIndex": 2,
    "rationale": "Reflecting feeling and inviting elaboration is therapeutic.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 302,
    "question": "The recovery position is used to:",
    "options": [
      "Improve circulation only",
      "Maintain a patent airway in an unconscious breathing patient",
      "Treat shock",
      "Reduce fever"
    ],
    "correctIndex": 1,
    "rationale": "The recovery (left-lateral) position keeps the airway clear and reduces aspiration risk.",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 303,
    "question": "The priority when a patient threatens another patient is to:",
    "options": [
      "Document later",
      "Ensure the safety of others and de-escalate, intervening per policy",
      "Ignore unless contact occurs",
      "Discharge the patient"
    ],
    "correctIndex": 1,
    "rationale": "Protecting others and safe de-escalation are the immediate priority.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 304,
    "question": "When delegating vital signs to a UAP, the RN must:",
    "options": [
      "Stop assessing the patient",
      "Still interpret the values and act on abnormalities",
      "Transfer accountability",
      "Avoid double-checking"
    ],
    "correctIndex": 1,
    "rationale": "Data collection may be delegated, but the RN interprets results and remains accountable.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 305,
    "question": "A confirmed measles case must be:",
    "options": [
      "Kept confidential",
      "Reported to preventive medicine",
      "Discharged at once",
      "Reported after recovery"
    ],
    "correctIndex": 1,
    "rationale": "Measles is a notifiable disease requiring prompt public-health reporting.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 306,
    "question": "Which insulin may be administered IV?",
    "options": [
      "NPH",
      "Glargine",
      "Regular",
      "Detemir"
    ],
    "correctIndex": 2,
    "rationale": "Only regular (short-acting) insulin is given IV.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 307,
    "question": "An HAI is defined as an infection that:",
    "options": [
      "Was present on admission",
      "Was acquired in the facility and not incubating on admission",
      "Only occurs at home",
      "Is never preventable"
    ],
    "correctIndex": 1,
    "rationale": "HAIs are acquired in healthcare and were not present/incubating on admission.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 308,
    "question": "Rh immunoglobulin is given to:",
    "options": [
      "Rh-positive mothers",
      "Rh-negative mothers around 28 weeks and after delivery of an Rh-positive baby",
      "All newborns",
      "Only fathers"
    ],
    "correctIndex": 1,
    "rationale": "Anti-D prevents Rh sensitisation in Rh-negative mothers.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 309,
    "question": "A patient on an aminoglycoside should be monitored for:",
    "options": [
      "Hyperglycaemia",
      "Nephrotoxicity and ototoxicity",
      "Weight gain",
      "Cough"
    ],
    "correctIndex": 1,
    "rationale": "Aminoglycosides are nephro- and ototoxic; monitor renal function and levels.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 310,
    "question": "Which best protects the nurse legally after an adverse event?",
    "options": [
      "Avoiding documentation",
      "Accurate, complete, contemporaneous documentation",
      "Discussing it on social media",
      "Changing the record later"
    ],
    "correctIndex": 1,
    "rationale": "Accurate, timely documentation is the nurse's best legal protection; records must never be altered improperly.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 311,
    "question": "Acting in the patient's best interest describes:",
    "options": [
      "Beneficence",
      "Veracity",
      "Fidelity",
      "Justice"
    ],
    "correctIndex": 0,
    "rationale": "Beneficence is acting to benefit the patient.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 312,
    "question": "For a patient with C. difficile, the nurse should:",
    "options": [
      "Use alcohol gel only",
      "Wash with soap and water and use contact precautions",
      "Use airborne precautions",
      "Use no precautions"
    ],
    "correctIndex": 1,
    "rationale": "C. difficile spores resist alcohol; soap-and-water plus contact precautions are required.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 313,
    "question": "Which organism is spread by contact and needs gown/gloves?",
    "options": [
      "Tuberculosis",
      "Measles",
      "MRSA",
      "Influenza"
    ],
    "correctIndex": 2,
    "rationale": "MRSA is contact-spread and requires gown and gloves.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 314,
    "question": "Extrapyramidal side effects of antipsychotics include:",
    "options": [
      "Hypertension",
      "Tremor, rigidity and akathisia",
      "Hyperglycaemia",
      "Diarrhoea"
    ],
    "correctIndex": 1,
    "rationale": "EPS include parkinsonism (tremor/rigidity), akathisia and dystonia.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 315,
    "question": "Which is a sentinel event requiring formal reporting?",
    "options": [
      "A patient refusing a meal",
      "Wrong-site surgery",
      "A late medication by 10 minutes",
      "A patient request for water"
    ],
    "correctIndex": 1,
    "rationale": "Wrong-site surgery is a sentinel event reported to quality/risk management.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 316,
    "question": "Which is the correct assessment sequence for the abdomen?",
    "options": [
      "Inspect, palpate, percuss, auscultate",
      "Inspect, auscultate, percuss, palpate",
      "Palpate first",
      "Percuss first"
    ],
    "correctIndex": 1,
    "rationale": "For the abdomen, auscultate before percussion/palpation to avoid altering bowel sounds.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 317,
    "question": "A post-op patient has BP 88/60, HR 122, cool clammy skin, low urine output. Priority:",
    "options": [
      "Antipyretic",
      "Restore volume (fluids/blood) and find the bleeding source",
      "Reverse Trendelenburg",
      "Restrict fluids"
    ],
    "correctIndex": 1,
    "rationale": "Signs of hypovolemic shock - restore circulating volume and control the source.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 318,
    "question": "A confirmed case of pulmonary TB requires the nurse to:",
    "options": [
      "Keep it confidential",
      "Report it to preventive medicine",
      "Tell only the family",
      "Wait until discharge"
    ],
    "correctIndex": 1,
    "rationale": "Notifiable communicable diseases such as TB must be reported to public health - an exception to confidentiality.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 319,
    "question": "The earliest indicator of clinical deterioration is often:",
    "options": [
      "A change in level of consciousness",
      "Hair loss",
      "Increased appetite",
      "Dry skin"
    ],
    "correctIndex": 0,
    "rationale": "An altered LOC (restlessness, confusion) is an early, sensitive sign of deterioration.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 320,
    "question": "A patient with pneumonia should be encouraged to:",
    "options": [
      "Stay flat and still",
      "Deep breathe, cough, mobilise and hydrate",
      "Restrict all fluids",
      "Avoid coughing"
    ],
    "correctIndex": 1,
    "rationale": "Deep breathing, coughing, mobility and hydration help clear secretions and prevent complications.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 321,
    "question": "Which is the correct nursing action if a drug dose seems unusually high?",
    "options": [
      "Give it as written",
      "Hold, verify with the prescriber and reference, and clarify",
      "Give half",
      "Ask a UAP"
    ],
    "correctIndex": 1,
    "rationale": "Question and verify doses that appear unsafe before administering.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 322,
    "question": "Normal capillary refill time is:",
    "options": [
      "Less than 3 seconds",
      "5-8 seconds",
      "10 seconds",
      "Instant only"
    ],
    "correctIndex": 0,
    "rationale": "Capillary refill under ~3 seconds indicates adequate peripheral perfusion.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 323,
    "question": "Order 250 mg; available 125 mg/5 mL. Give:",
    "options": [
      "5 mL",
      "10 mL",
      "12.5 mL",
      "2.5 mL"
    ],
    "correctIndex": 1,
    "rationale": "(250/125) x 5 = 10 mL.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 324,
    "question": "Naloxone is used to reverse:",
    "options": [
      "Benzodiazepine overdose",
      "Opioid overdose",
      "Lithium toxicity",
      "Alcohol withdrawal"
    ],
    "correctIndex": 1,
    "rationale": "Naloxone reverses opioid-induced respiratory depression.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 325,
    "question": "Which breaks the sterile field?",
    "options": [
      "Items above waist level",
      "A sterile item touching the drape edge",
      "Facing the field",
      "Holding items in front"
    ],
    "correctIndex": 1,
    "rationale": "The outer 2.5 cm of the drape is contaminated.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 326,
    "question": "A statin patient reports muscle pain and dark urine. The nurse suspects:",
    "options": [
      "Normal effect",
      "Rhabdomyolysis - report and check CK",
      "Dehydration only",
      "Allergy"
    ],
    "correctIndex": 1,
    "rationale": "Muscle pain with dark urine suggests rhabdomyolysis; hold and report, check creatine kinase.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 327,
    "question": "A meningococcal meningitis patient requires:",
    "options": [
      "Airborne precautions",
      "Droplet precautions",
      "No precautions",
      "Contact only"
    ],
    "correctIndex": 1,
    "rationale": "Meningococcus is droplet-spread; use a surgical mask and a private room.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 328,
    "question": "For severe external haemorrhage, the FIRST action is:",
    "options": [
      "Elevate and observe",
      "Apply direct pressure",
      "Give oral fluids",
      "Obtain consent"
    ],
    "correctIndex": 1,
    "rationale": "Direct pressure is the immediate action to control bleeding.",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 329,
    "question": "A patient on contact precautions is transferred to radiology. The nurse should:",
    "options": [
      "Skip notifying radiology",
      "Communicate the precautions and ensure they are maintained during transport",
      "Remove all PPE first",
      "Cancel the test"
    ],
    "correctIndex": 1,
    "rationale": "Precautions continue during transport; receiving departments must be informed.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 330,
    "question": "A patient with MI is given aspirin to:",
    "options": [
      "Relieve fever",
      "Inhibit platelet aggregation",
      "Lower glucose",
      "Sedate the patient"
    ],
    "correctIndex": 1,
    "rationale": "Aspirin's antiplatelet effect limits clot extension in acute coronary syndrome.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 331,
    "question": "A patient says, 'There's no point anymore.' The BEST response is:",
    "options": [
      "'Don't talk like that.'",
      "'Are you having thoughts of harming yourself?'",
      "'Why do you feel that way?'",
      "'Let's discuss something positive.'"
    ],
    "correctIndex": 1,
    "rationale": "Directly assessing suicidal ideation is therapeutic and essential for safety.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 332,
    "question": "First-line medication class for alcohol withdrawal is:",
    "options": [
      "Opioids",
      "Benzodiazepines",
      "Antipsychotics only",
      "Stimulants"
    ],
    "correctIndex": 1,
    "rationale": "Benzodiazepines are used to manage alcohol withdrawal and prevent seizures.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 333,
    "question": "Painless, bright-red vaginal bleeding in the third trimester suggests:",
    "options": [
      "Abruptio placentae",
      "Placenta previa",
      "Normal labour",
      "Ruptured uterus"
    ],
    "correctIndex": 1,
    "rationale": "Painless bright-red bleeding is classic for placenta previa; avoid vaginal exams.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 334,
    "question": "A conscious patient with glucose 3.2 mmol/L should receive:",
    "options": [
      "IV insulin",
      "15 g fast-acting carbohydrate",
      "Nothing by mouth",
      "A long-acting carbohydrate only"
    ],
    "correctIndex": 1,
    "rationale": "Treat hypoglycaemia with fast-acting carbohydrate and recheck in 15 minutes.",
    "category": "Clinical Core",
    "examType": "MOH"
  },
  {
    "id": 335,
    "question": "To prevent CAUTI, the nurse should:",
    "options": [
      "Keep the catheter as long as possible",
      "Remove the catheter as early as clinically appropriate",
      "Open the system frequently",
      "Place the bag above the bladder"
    ],
    "correctIndex": 1,
    "rationale": "Early removal and a closed system reduce catheter-associated UTI; keep the bag below bladder level.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 336,
    "question": "Screening a population for high blood pressure is:",
    "options": [
      "Primary prevention",
      "Secondary prevention",
      "Tertiary prevention",
      "Not prevention"
    ],
    "correctIndex": 1,
    "rationale": "Screening for early detection is secondary prevention.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 337,
    "question": "A patient reports hearing voices telling him he is worthless. The nurse should:",
    "options": [
      "Argue the voices are not real",
      "Acknowledge his fear and assess for command hallucinations/safety",
      "Ignore it",
      "Tell him to stop listening"
    ],
    "correctIndex": 1,
    "rationale": "Acknowledge feelings, assess content (especially command hallucinations) and ensure safety.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 338,
    "question": "The nurse should interrupt CPR compressions:",
    "options": [
      "Frequently to rest",
      "As little as possible",
      "Every 30 seconds",
      "Only to chart"
    ],
    "correctIndex": 1,
    "rationale": "Interruptions reduce perfusion; minimise them for high-quality CPR.",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 339,
    "question": "A patient on heparin is bleeding. Anticipate giving:",
    "options": [
      "Vitamin K",
      "Protamine sulfate",
      "Naloxone",
      "Flumazenil"
    ],
    "correctIndex": 1,
    "rationale": "Protamine sulfate reverses heparin.",
    "category": "Pharmacology",
    "examType": "MOH"
  },
  {
    "id": 340,
    "question": "A patient on lithium has vomiting, coarse tremor and confusion. This suggests:",
    "options": [
      "Therapeutic effect",
      "Lithium toxicity",
      "An allergy",
      "Normal side effects"
    ],
    "correctIndex": 1,
    "rationale": "These indicate lithium toxicity; hold the dose, check the level and notify the physician.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 341,
    "question": "A community health nurse promoting healthy diet and exercise is performing:",
    "options": [
      "Tertiary prevention",
      "Health promotion / primary prevention",
      "Acute care",
      "Screening"
    ],
    "correctIndex": 1,
    "rationale": "Promoting healthy behaviours to prevent disease is primary prevention/health promotion.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 342,
    "question": "A nurse is asked to perform a task outside their scope of practice. The nurse should:",
    "options": [
      "Do it to help the team",
      "Decline and notify the supervisor",
      "Delegate it to a UAP",
      "Attempt it carefully"
    ],
    "correctIndex": 1,
    "rationale": "Practising outside one's scope is unsafe and unlawful; decline and escalate.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 343,
    "question": "An unconscious trauma patient needs emergency surgery and has no guardian present. The basis to proceed is:",
    "options": [
      "Expressed consent",
      "Implied (emergency) consent",
      "Written consent",
      "No consent needed ever"
    ],
    "correctIndex": 1,
    "rationale": "In a life-threatening emergency with no one to consent, implied consent applies.",
    "category": "Ethics & Regulations",
    "examType": "MOH"
  },
  {
    "id": 344,
    "question": "When a patient is escalating toward aggression, the nurse should FIRST:",
    "options": [
      "Touch them to reassure",
      "Maintain a safe distance and use a calm voice in a low-stimulus setting",
      "Apply restraints",
      "Raise their voice"
    ],
    "correctIndex": 1,
    "rationale": "De-escalation with space and calm is first; restraints are a last resort.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 345,
    "question": "A normal fetal heart rate is:",
    "options": [
      "60-100",
      "110-160",
      "170-200",
      "80-110"
    ],
    "correctIndex": 1,
    "rationale": "Normal FHR is 110-160 bpm.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 346,
    "question": "The purpose of standard precautions is to:",
    "options": [
      "Apply only to infected patients",
      "Protect against blood/body fluids for ALL patients",
      "Replace transmission-based precautions",
      "Be used only in surgery"
    ],
    "correctIndex": 1,
    "rationale": "Standard precautions protect against blood and body fluids for every patient.",
    "category": "Infection Control",
    "examType": "MOH"
  },
  {
    "id": 347,
    "question": "The first medication in anaphylaxis is:",
    "options": [
      "Antihistamine",
      "IM epinephrine",
      "Corticosteroid",
      "Salbutamol"
    ],
    "correctIndex": 1,
    "rationale": "IM epinephrine is given first in anaphylaxis.",
    "category": "Critical Care",
    "examType": "MOH"
  },
  {
    "id": 348,
    "question": "Restraints require:",
    "options": [
      "A standing indefinite order",
      "A time-limited physician order and frequent monitoring",
      "Family permission only",
      "No order if brief"
    ],
    "correctIndex": 1,
    "rationale": "Restraints need a time-limited order, least-restrictive type, and frequent checks.",
    "category": "Fundamentals",
    "examType": "MOH"
  },
  {
    "id": 349,
    "question": "Which response best uses silence therapeutically?",
    "options": [
      "Filling every pause with advice",
      "Allowing a pause so the patient can reflect and continue",
      "Leaving the room",
      "Changing the topic"
    ],
    "correctIndex": 1,
    "rationale": "Therapeutic silence gives the patient space to reflect and continue.",
    "category": "Mental Health",
    "examType": "MOH"
  },
  {
    "id": 350,
    "question": "First-line uterotonic for PPH is:",
    "options": [
      "Carboprost",
      "Oxytocin",
      "Methylergonovine",
      "Misoprostol"
    ],
    "correctIndex": 1,
    "rationale": "Oxytocin is first-line; others follow if needed with their contraindications.",
    "category": "Maternity & Child Care",
    "examType": "MOH"
  },
  {
    "id": 351,
    "question": "Serotonin syndrome is caused by:",
    "options": [
      "Too little serotonin",
      "Excess serotonergic activity, often from drug combinations",
      "Low blood sugar",
      "Dehydration only"
    ],
    "correctIndex": 1,
    "rationale": "Excess serotonergic activity (e.g., combined serotonergic drugs) causes serotonin syndrome.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 352,
    "question": "Epidemiology helps public health by:",
    "options": [
      "Treating individuals only",
      "Tracking incidence and prevalence to guide interventions",
      "Replacing vaccination",
      "Ignoring populations"
    ],
    "correctIndex": 1,
    "rationale": "Epidemiology studies disease patterns to direct public-health action.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 353,
    "question": "Severe diarrhoea most likely causes:",
    "options": [
      "Metabolic alkalosis",
      "Metabolic acidosis",
      "Respiratory alkalosis",
      "No change"
    ],
    "correctIndex": 1,
    "rationale": "Loss of bicarbonate-rich stool causes metabolic acidosis.",
    "category": "Clinical Core",
    "examType": "HAAD_DOH"
  },
  {
    "id": 354,
    "question": "A patient refuses a prescribed medication. The nurse should:",
    "options": [
      "Hide it in food",
      "Respect the refusal, document, and notify the prescriber",
      "Force administration",
      "Chart it as given"
    ],
    "correctIndex": 1,
    "rationale": "Patients may refuse; document the refusal and inform the prescriber.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 355,
    "question": "The priority for active upper GI bleeding is to:",
    "options": [
      "Give oral iron",
      "Maintain airway, replace volume, monitor for shock",
      "Encourage ambulation",
      "Offer a large meal"
    ],
    "correctIndex": 1,
    "rationale": "Airway protection, fluid/blood replacement and shock monitoring are priorities in GI bleeding.",
    "category": "Clinical Core",
    "examType": "HAAD_DOH"
  },
  {
    "id": 356,
    "question": "An infant with gestational-diabetic mother is at risk for:",
    "options": [
      "Hyperthermia",
      "Hypoglycaemia",
      "Hypertension",
      "Polycythaemia only"
    ],
    "correctIndex": 1,
    "rationale": "Infants of diabetic mothers commonly develop neonatal hypoglycaemia.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 357,
    "question": "A reassuring sign of fetal wellbeing is:",
    "options": [
      "Late decelerations",
      "Moderate variability with accelerations",
      "Bradycardia",
      "Absent variability"
    ],
    "correctIndex": 1,
    "rationale": "Moderate variability with accelerations indicates fetal wellbeing.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 358,
    "question": "The single most effective measure to prevent HAIs is:",
    "options": [
      "Gowns",
      "Hand hygiene",
      "Routine antibiotics",
      "Room disinfection"
    ],
    "correctIndex": 1,
    "rationale": "Hand hygiene is the most effective single intervention.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 359,
    "question": "A patient refuses medication and is not an imminent danger. The nurse should:",
    "options": [
      "Force the medication",
      "Respect the right to refuse, document and notify the prescriber",
      "Hide it in food",
      "Discharge immediately"
    ],
    "correctIndex": 1,
    "rationale": "A competent patient may refuse medication unless legal criteria for involuntary treatment are met.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 360,
    "question": "Keeping a promise to return and check on a patient reflects:",
    "options": [
      "Fidelity",
      "Justice",
      "Autonomy",
      "Veracity"
    ],
    "correctIndex": 0,
    "rationale": "Fidelity is keeping commitments and being trustworthy.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 361,
    "question": "When infusing IV KCl the nurse must:",
    "options": [
      "Give a rapid bolus",
      "Dilute and infuse via a pump",
      "Push it undiluted",
      "Mix it with blood"
    ],
    "correctIndex": 1,
    "rationale": "KCl must be diluted and infused slowly via pump.",
    "category": "Clinical Core",
    "examType": "HAAD_DOH"
  },
  {
    "id": 362,
    "question": "A patient in alcohol withdrawal becomes confused with tremor and tachycardia. This may progress to:",
    "options": [
      "Mania",
      "Delirium tremens",
      "Serotonin syndrome",
      "NMS"
    ],
    "correctIndex": 1,
    "rationale": "Severe alcohol withdrawal can progress to life-threatening delirium tremens.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 363,
    "question": "Which finding indicates hypocalcemia?",
    "options": [
      "Positive Trousseau's/Chvostek's signs",
      "Peaked T-waves",
      "Warm flushed skin",
      "Bounding pulses"
    ],
    "correctIndex": 0,
    "rationale": "Hypocalcemia raises neuromuscular excitability, causing positive Chvostek's/Trousseau's and tetany.",
    "category": "Clinical Core",
    "examType": "HAAD_DOH"
  },
  {
    "id": 364,
    "question": "Hyperkalemia is most dangerous because it can cause:",
    "options": [
      "Skin rash",
      "Fatal cardiac dysrhythmias",
      "Hair loss",
      "Constipation only"
    ],
    "correctIndex": 1,
    "rationale": "High potassium destabilises cardiac conduction, risking lethal dysrhythmias.",
    "category": "Clinical Core",
    "examType": "HAAD_DOH"
  },
  {
    "id": 365,
    "question": "Which drugs require an independent double-check?",
    "options": [
      "Vitamins and antacids",
      "Insulin and IV opioids",
      "Topical creams",
      "Oral paracetamol"
    ],
    "correctIndex": 1,
    "rationale": "Insulin and IV opioids (and anticoagulants) are high-alert and need a double-check.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 366,
    "question": "A pulsating cord is palpated in the vagina. Priority action:",
    "options": [
      "Push the cord back",
      "Apply fundal pressure",
      "Lift the presenting part off the cord, knee-chest position",
      "Encourage pushing"
    ],
    "correctIndex": 2,
    "rationale": "Relieve cord compression and position knee-chest/Trendelenburg; prepare for emergency C-section.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 367,
    "question": "Which is true about confidentiality in psychiatry?",
    "options": [
      "It never applies",
      "It applies, but may be broken if there is a serious risk of harm to self or others",
      "It applies only to physicians",
      "It is optional"
    ],
    "correctIndex": 1,
    "rationale": "Confidentiality applies but may be overridden when there is a serious, imminent risk of harm.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 368,
    "question": "A 4-year-old with drooling, fever and tripod posture (epiglottitis). AVOID:",
    "options": [
      "Humidified oxygen",
      "Keeping the child calm",
      "Examining the throat with a tongue blade",
      "Preparing airway equipment"
    ],
    "correctIndex": 2,
    "rationale": "Throat inspection can cause laryngospasm and airway obstruction.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 369,
    "question": "Normal serum sodium is:",
    "options": [
      "115-125",
      "135-145",
      "150-160",
      "100-110"
    ],
    "correctIndex": 1,
    "rationale": "Normal sodium is 135-145 mEq/L.",
    "category": "Clinical Core",
    "examType": "HAAD_DOH"
  },
  {
    "id": 370,
    "question": "A patient weighs 20 kg; order is 10 mg/kg. Total dose?",
    "options": [
      "100 mg",
      "200 mg",
      "20 mg",
      "2000 mg"
    ],
    "correctIndex": 1,
    "rationale": "10 mg/kg x 20 kg = 200 mg.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 371,
    "question": "A mother on magnesium sulfate must have available at the bedside:",
    "options": [
      "Insulin",
      "Calcium gluconate",
      "Heparin",
      "Naloxone"
    ],
    "correctIndex": 1,
    "rationale": "Calcium gluconate (the antidote) must be readily available during magnesium therapy.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 372,
    "question": "Signs of infant dehydration include:",
    "options": [
      "Bulging fontanelle",
      "Sunken fontanelle and no tears",
      "Increased wet diapers",
      "Bounding pulses"
    ],
    "correctIndex": 1,
    "rationale": "Sunken fontanelle, absent tears and fewer wet diapers indicate dehydration.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 373,
    "question": "Which finding requires immediate action?",
    "options": [
      "Temp 37.0 C",
      "RR 10 and shallow with SpO2 88%",
      "HR 78",
      "BP 122/80"
    ],
    "correctIndex": 1,
    "rationale": "Hypoventilation with hypoxaemia is an airway/breathing emergency.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 374,
    "question": "The priority for an unconscious, spontaneously breathing patient is to:",
    "options": [
      "Sit them upright",
      "Protect the airway (recovery position) and monitor",
      "Give oral fluids",
      "Restrain them"
    ],
    "correctIndex": 1,
    "rationale": "Protecting the airway prevents aspiration in the unconscious patient.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 375,
    "question": "Which intervention reduces the need for restraint?",
    "options": [
      "Maximising noise",
      "Early de-escalation and a calm environment",
      "Confrontation",
      "Isolation without monitoring"
    ],
    "correctIndex": 1,
    "rationale": "Early de-escalation and a calm milieu reduce the need for restraint.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 376,
    "question": "Influenza requires which precautions?",
    "options": [
      "Airborne",
      "Droplet",
      "Contact only",
      "None"
    ],
    "correctIndex": 1,
    "rationale": "Influenza spreads by droplets - a surgical mask within ~1-2 m and a private room are preferred.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 377,
    "question": "Negligence requires proof of all EXCEPT:",
    "options": [
      "Duty",
      "Breach",
      "Harm",
      "Intent to harm"
    ],
    "correctIndex": 3,
    "rationale": "Negligence requires duty, breach, harm and causation - intent is not required (intent relates to other torts).",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 378,
    "question": "Eye prophylaxis and vitamin K for the newborn are given to:",
    "options": [
      "Treat infection already present",
      "Prevent ophthalmia neonatorum and haemorrhagic disease",
      "Sedate the infant",
      "Improve feeding"
    ],
    "correctIndex": 1,
    "rationale": "Eye prophylaxis prevents neonatal conjunctivitis; vitamin K prevents bleeding.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 379,
    "question": "The best way to prevent surgical-site infection includes:",
    "options": [
      "Skipping antibiotics",
      "Aseptic technique, glucose control and timely prophylactic antibiotics",
      "Shaving with a razor immediately",
      "Leaving wounds open"
    ],
    "correctIndex": 1,
    "rationale": "Asepsis, glycaemic control and correctly timed prophylaxis reduce SSIs.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 380,
    "question": "A patient on an ACE inhibitor reports a persistent dry cough. The nurse knows this is:",
    "options": [
      "An allergic emergency",
      "A known class side effect to report",
      "A sign of infection",
      "Unrelated"
    ],
    "correctIndex": 1,
    "rationale": "Dry cough is a recognised ACE-inhibitor effect; report for possible change to an ARB.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 381,
    "question": "Which patient is at highest fall risk?",
    "options": [
      "A young athlete",
      "An older adult on sedatives with unsteady gait",
      "A patient on bed rest who is alert",
      "A visitor"
    ],
    "correctIndex": 1,
    "rationale": "Age, sedating drugs, and unsteady gait markedly increase fall risk.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 382,
    "question": "The nurse notes SpO2 84% with accessory muscle use. The FIRST action is to:",
    "options": [
      "Document and wait",
      "Apply higher-concentration oxygen and reassess, escalate",
      "Encourage oral fluids",
      "Lay the patient flat"
    ],
    "correctIndex": 1,
    "rationale": "Provide oxygen, position upright, reassess and escalate - hypoxaemia with distress is urgent.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 383,
    "question": "A patient with panic-level anxiety needs the nurse to:",
    "options": [
      "Leave them alone",
      "Stay with them, reduce stimuli and guide slow breathing",
      "Give detailed teaching now",
      "Encourage a crowd"
    ],
    "correctIndex": 1,
    "rationale": "Staying present, reducing stimuli and slow breathing help a panicking patient.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 384,
    "question": "A COPD patient given high-flow O2 becomes drowsy and hypoventilates. The nurse should:",
    "options": [
      "Increase O2",
      "Titrate O2 down to a target SpO2 and reassess",
      "Leave to rest",
      "Give a sedative"
    ],
    "correctIndex": 1,
    "rationale": "Excess O2 suppresses the hypoxic drive; titrate down and reassess.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 385,
    "question": "A nurse documents care that was not actually performed. This is:",
    "options": [
      "Acceptable if busy",
      "Falsification - a serious professional/legal violation",
      "Standard practice",
      "Only a minor issue"
    ],
    "correctIndex": 1,
    "rationale": "Charting care not done is falsification and a serious legal/ethical breach.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 386,
    "question": "A nurse finds a medication error after administration. The priority is to:",
    "options": [
      "Hide it",
      "Assess and monitor the patient, then report",
      "Chart it as given correctly",
      "Wait for symptoms"
    ],
    "correctIndex": 1,
    "rationale": "Patient safety first - assess/monitor the patient, then complete an incident report.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 387,
    "question": "Priority for an acutely manic, pacing patient:",
    "options": [
      "A group activity",
      "Low-stimulation environment and portable high-calorie food",
      "Restraints",
      "Public confrontation"
    ],
    "correctIndex": 1,
    "rationale": "Reducing stimulation calms mania; portable food meets metabolic demands while active.",
    "category": "Mental Health",
    "examType": "HAAD_DOH"
  },
  {
    "id": 388,
    "question": "If a newborn is apneic and limp at birth, the FIRST step is to:",
    "options": [
      "Weigh the baby",
      "Stimulate, position the airway and begin resuscitation",
      "Give a bath",
      "Call the family"
    ],
    "correctIndex": 1,
    "rationale": "Airway, stimulation and resuscitation are the immediate priority for a depressed newborn.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 389,
    "question": "The priority for an unresponsive patient is to:",
    "options": [
      "Check glucose",
      "Assess airway, breathing, circulation",
      "Obtain history",
      "Give oxygen by mask only"
    ],
    "correctIndex": 1,
    "rationale": "Always assess ABCs first in an unresponsive patient.",
    "category": "Clinical Core",
    "examType": "HAAD_DOH"
  },
  {
    "id": 390,
    "question": "Which ED patient is seen FIRST?",
    "options": [
      "A sprained ankle",
      "A sutured laceration",
      "A patient with stridor and difficulty breathing",
      "A migraine"
    ],
    "correctIndex": 2,
    "rationale": "Stridor indicates airway compromise - the top priority.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 391,
    "question": "Four patients need attention. Who is seen FIRST?",
    "options": [
      "Due for routine meds",
      "New dyspnoea with SpO2 86%",
      "Requesting the bathroom",
      "Asking about discharge"
    ],
    "correctIndex": 1,
    "rationale": "Airway/Breathing problems are the top priority; new dyspnoea with low SpO2 is life-threatening.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 392,
    "question": "To reduce neonatal heat loss, the nurse should:",
    "options": [
      "Bathe immediately",
      "Dry the infant, provide skin-to-skin and a hat",
      "Place near a window",
      "Use cold blankets"
    ],
    "correctIndex": 1,
    "rationale": "Drying, skin-to-skin contact and a hat reduce evaporative and convective heat loss.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 393,
    "question": "The single most effective way to prevent infection is:",
    "options": [
      "Gowns",
      "Hand hygiene",
      "Antibiotics",
      "Room cleaning"
    ],
    "correctIndex": 1,
    "rationale": "Hand hygiene is the most effective single measure.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 394,
    "question": "Cardiac rehabilitation after a heart attack is:",
    "options": [
      "Primary prevention",
      "Secondary prevention",
      "Tertiary prevention",
      "Health promotion only"
    ],
    "correctIndex": 2,
    "rationale": "Limiting complications of established disease is tertiary prevention.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 395,
    "question": "A silent chest in an asthmatic indicates:",
    "options": [
      "Improvement",
      "Life-threatening obstruction",
      "Normal finding",
      "Anxiety"
    ],
    "correctIndex": 1,
    "rationale": "No air movement (silent chest) signals severe, life-threatening bronchospasm.",
    "category": "Clinical Core",
    "examType": "HAAD_DOH"
  },
  {
    "id": 396,
    "question": "A key fall-prevention intervention is to:",
    "options": [
      "Keep the bed high",
      "Place the call bell in reach and keep the bed low",
      "Use restraints routinely",
      "Dim all lights"
    ],
    "correctIndex": 1,
    "rationale": "Bed low with call bell in reach reduces falls; restraints are a last resort.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 397,
    "question": "A 6-month-old would typically be able to:",
    "options": [
      "Walk independently",
      "Sit with support and roll over",
      "Run",
      "Speak sentences"
    ],
    "correctIndex": 1,
    "rationale": "At ~6 months an infant sits with support and rolls over.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 398,
    "question": "Which statement about documentation is correct?",
    "options": [
      "Document interventions before doing them",
      "Use opinions and labels",
      "Record objective, timely, factual entries",
      "Leave blank lines for later"
    ],
    "correctIndex": 2,
    "rationale": "Documentation must be objective, factual, timely, and contemporaneous.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 399,
    "question": "Which is a physiological (Maslow) priority over a safety need?",
    "options": [
      "Fear of falling",
      "Adequate oxygenation",
      "Need for privacy",
      "Self-esteem"
    ],
    "correctIndex": 1,
    "rationale": "Oxygenation (physiological) outranks safety and psychosocial needs.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 400,
    "question": "When removing PPE, the nurse should remove the gloves:",
    "options": [
      "Last",
      "First (most contaminated), then perform hand hygiene as indicated",
      "Never",
      "With teeth"
    ],
    "correctIndex": 1,
    "rationale": "Gloves (most contaminated) are typically removed first during doffing, with hand hygiene as indicated.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 401,
    "question": "Which patient needs a negative-pressure room?",
    "options": [
      "A patient with MRSA",
      "A patient with influenza",
      "A patient with active pulmonary TB",
      "A patient with a UTI"
    ],
    "correctIndex": 2,
    "rationale": "Active pulmonary TB (airborne) requires a negative-pressure room and N95.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 402,
    "question": "A patient with suspected active TB requires:",
    "options": [
      "Standard precautions only",
      "Droplet with a surgical mask",
      "Airborne: negative-pressure room and N95",
      "Contact with gown and gloves"
    ],
    "correctIndex": 2,
    "rationale": "TB is airborne - negative pressure and a fit-tested N95 are required.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 403,
    "question": "Adult CPR compressions are delivered at:",
    "options": [
      "40-60/min",
      "60-80/min",
      "100-120/min",
      "As fast as possible"
    ],
    "correctIndex": 2,
    "rationale": "High-quality CPR uses 100-120 compressions per minute.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 404,
    "question": "UAE newborns typically receive which vaccines before discharge?",
    "options": [
      "MMR and DTaP",
      "BCG and hepatitis B",
      "Varicella and polio",
      "Influenza and HPV"
    ],
    "correctIndex": 1,
    "rationale": "BCG and the first hepatitis B dose are given to newborns.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 405,
    "question": "To maintain a sterile field, sterile items must be kept:",
    "options": [
      "Below the waist",
      "Above the waist and within sight",
      "Behind the nurse",
      "On the floor"
    ],
    "correctIndex": 1,
    "rationale": "Sterile items are kept above the waist and in continuous view.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 406,
    "question": "During a mass-casualty event, a patient with minor cuts who can walk is tagged:",
    "options": [
      "Red (emergent)",
      "Green (non-urgent)",
      "Black (deceased)",
      "Yellow (urgent)"
    ],
    "correctIndex": 1,
    "rationale": "Walking-wounded with minor injuries are non-urgent (green).",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 407,
    "question": "Defibrillation works by:",
    "options": [
      "Pacing the heart",
      "Depolarising the myocardium to allow normal rhythm to resume",
      "Increasing heart rate",
      "Sedating the patient"
    ],
    "correctIndex": 1,
    "rationale": "A defibrillation shock depolarises the myocardium so the sinus node can resume control.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 408,
    "question": "Accurate documentation should be:",
    "options": [
      "Completed at end of week",
      "Objective, factual and timely",
      "Based on assumptions",
      "Erased if wrong"
    ],
    "correctIndex": 1,
    "rationale": "Records must be objective, factual, and contemporaneous; errors are corrected per policy, not erased.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 409,
    "question": "Before giving medication, the nurse identifies the patient using:",
    "options": [
      "Room and bed number",
      "Two identifiers such as name and DOB",
      "The diagnosis",
      "The nurse's memory"
    ],
    "correctIndex": 1,
    "rationale": "Two identifiers (not room/bed) are required.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 410,
    "question": "Monitor shows a chaotic waveform; patient pulseless and apneic. The nurse should:",
    "options": [
      "Synchronised cardioversion",
      "Start CPR and prepare to defibrillate",
      "Give oral medication",
      "Check glucose first"
    ],
    "correctIndex": 1,
    "rationale": "This is VF - a pulseless shockable rhythm needing CPR and defibrillation.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 411,
    "question": "The Five Rights of delegation include all EXCEPT:",
    "options": [
      "Right task",
      "Right person",
      "Right diagnosis",
      "Right supervision"
    ],
    "correctIndex": 2,
    "rationale": "The Five Rights are task, circumstance, person, direction/communication, and supervision - not 'diagnosis'.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 412,
    "question": "Regular insulin given subcutaneously before a meal is timed because its onset is:",
    "options": [
      "8 hours",
      "About 30 minutes",
      "Immediate and lifelong",
      "24 hours"
    ],
    "correctIndex": 1,
    "rationale": "Regular insulin onset is ~30 minutes, so it is given before meals to match glucose rise.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 413,
    "question": "During the fourth stage (first hours postpartum), the priority is to:",
    "options": [
      "Discharge quickly",
      "Monitor fundus, lochia and vitals for haemorrhage",
      "Restrict bonding",
      "Withhold fluids"
    ],
    "correctIndex": 1,
    "rationale": "Close monitoring of the fundus, bleeding and vitals detects early PPH.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 414,
    "question": "A competent patient signs consent then says they have changed their mind before the procedure. The nurse should:",
    "options": [
      "Proceed as the form is signed",
      "Stop and notify the physician; consent can be withdrawn",
      "Tell the patient it is too late",
      "Ask the family to decide"
    ],
    "correctIndex": 1,
    "rationale": "Consent may be withdrawn at any time; the nurse stops and notifies the physician.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 415,
    "question": "ABG pH 7.50, CO2 30, HCO3 24 indicates:",
    "options": [
      "Respiratory acidosis",
      "Respiratory alkalosis",
      "Metabolic acidosis",
      "Metabolic alkalosis"
    ],
    "correctIndex": 1,
    "rationale": "High pH with low CO2 is respiratory alkalosis.",
    "category": "Clinical Core",
    "examType": "HAAD_DOH"
  },
  {
    "id": 416,
    "question": "A patient asks the nurse to explain surgical risks before signing consent. The nurse should:",
    "options": [
      "Explain all risks personally",
      "Refer the question to the surgeon to ensure informed consent",
      "Tell them not to worry",
      "Witness the signature anyway"
    ],
    "correctIndex": 1,
    "rationale": "The physician must provide the explanation of risks; the nurse ensures the patient is informed before witnessing consent.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 417,
    "question": "Heparin is monitored with which test?",
    "options": [
      "INR",
      "aPTT",
      "Blood glucose",
      "Lipids"
    ],
    "correctIndex": 1,
    "rationale": "Heparin therapy is monitored with aPTT.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 418,
    "question": "An order reads 0.125 mg; the vial is 0.25 mg/mL. Volume to give?",
    "options": [
      "0.5 mL",
      "1 mL",
      "2 mL",
      "0.25 mL"
    ],
    "correctIndex": 0,
    "rationale": "(0.125/0.25) x 1 mL = 0.5 mL.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 419,
    "question": "Before delegating, the nurse must FIRST consider:",
    "options": [
      "The UAP's break schedule",
      "Whether the task and patient are stable and within the UAP's competence",
      "The unit budget",
      "The physician's preference"
    ],
    "correctIndex": 1,
    "rationale": "Delegation depends on task stability/predictability and the delegatee's competence (right task/person/circumstance).",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 420,
    "question": "Which is the BEST example of patient advocacy?",
    "options": [
      "Following all orders without question",
      "Speaking up about an unsafe staffing or order",
      "Avoiding conflict with physicians",
      "Documenting after the shift"
    ],
    "correctIndex": 1,
    "rationale": "Advocacy means protecting patient safety, including raising concerns about unsafe care.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 421,
    "question": "The nurse should perform hand hygiene:",
    "options": [
      "Only after removing gloves",
      "Before and after patient contact and per the 5 Moments",
      "Once per shift",
      "Only when soiled"
    ],
    "correctIndex": 1,
    "rationale": "Hand hygiene follows the WHO 5 Moments, including before and after patient contact; gloves do not replace it.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 422,
    "question": "A newborn's normal respiratory rate is:",
    "options": [
      "12-20",
      "30-60",
      "60-80",
      "8-12"
    ],
    "correctIndex": 1,
    "rationale": "Newborn RR is 30-60 breaths/min.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 423,
    "question": "A nurse overhears a colleague discussing a patient in the cafeteria. This violates:",
    "options": [
      "Justice",
      "Confidentiality",
      "Beneficence",
      "Autonomy"
    ],
    "correctIndex": 1,
    "rationale": "Discussing identifiable patient information publicly breaches confidentiality.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 424,
    "question": "In the trauma primary survey, what comes FIRST?",
    "options": [
      "Exposure",
      "Airway with C-spine protection",
      "Disability",
      "Circulation"
    ],
    "correctIndex": 1,
    "rationale": "Airway (with cervical spine protection) is first in ABCDE.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 425,
    "question": "Antidote for an opioid overdose with respiratory depression:",
    "options": [
      "Flumazenil",
      "Naloxone",
      "Protamine",
      "Vitamin K"
    ],
    "correctIndex": 1,
    "rationale": "Naloxone reverses opioids; flumazenil reverses benzodiazepines.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 426,
    "question": "Cultural competence in the UAE includes:",
    "options": [
      "Ignoring religious requests to save time",
      "Arranging same-gender care/chaperone when requested",
      "Refusing interpreters",
      "Assuming all patients are alike"
    ],
    "correctIndex": 1,
    "rationale": "Respecting religious and cultural needs (e.g., same-gender care) is a professional and legal expectation.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 427,
    "question": "An APGAR component is:",
    "options": [
      "Birth weight",
      "Reflex irritability",
      "Head circumference",
      "Blood type"
    ],
    "correctIndex": 1,
    "rationale": "APGAR scores heart rate, respiratory effort, muscle tone, reflex irritability and colour.",
    "category": "Maternity & Child Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 428,
    "question": "To prevent ventilator-associated pneumonia, the nurse should:",
    "options": [
      "Lay the patient flat",
      "Elevate the head of bed 30-45 degrees and provide oral care",
      "Avoid sedation breaks",
      "Stop suctioning"
    ],
    "correctIndex": 1,
    "rationale": "Head-of-bed elevation, oral care and sedation breaks reduce VAP.",
    "category": "Infection Control",
    "examType": "HAAD_DOH"
  },
  {
    "id": 429,
    "question": "Which patient information may be shared without specific consent?",
    "options": [
      "With the patient's employer",
      "With the care team directly involved in treatment",
      "With the patient's neighbour",
      "On social media"
    ],
    "correctIndex": 1,
    "rationale": "Information may be shared on a need-to-know basis among the treating care team.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 430,
    "question": "Telling a patient the truth about their diagnosis reflects:",
    "options": [
      "Veracity",
      "Justice",
      "Non-maleficence",
      "Fidelity"
    ],
    "correctIndex": 0,
    "rationale": "Veracity is the duty of truthfulness.",
    "category": "Ethics & Regulations",
    "examType": "HAAD_DOH"
  },
  {
    "id": 431,
    "question": "After defibrillation, the nurse should immediately:",
    "options": [
      "Check a 12-lead first",
      "Resume chest compressions",
      "Stop and observe",
      "Give oral medication"
    ],
    "correctIndex": 1,
    "rationale": "CPR is resumed immediately after a shock to maintain perfusion.",
    "category": "Critical Care",
    "examType": "HAAD_DOH"
  },
  {
    "id": 432,
    "question": "Order 1.5 g; available 500 mg tablets. Give:",
    "options": [
      "2 tablets",
      "3 tablets",
      "1 tablet",
      "4 tablets"
    ],
    "correctIndex": 1,
    "rationale": "1.5 g = 1500 mg; 1500/500 = 3 tablets.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 433,
    "question": "An unconscious patient who is breathing should be placed in the:",
    "options": [
      "Supine position",
      "Left-lateral recovery position",
      "High-Fowler's",
      "Prone position"
    ],
    "correctIndex": 1,
    "rationale": "The recovery position protects the airway from aspiration.",
    "category": "Fundamentals",
    "examType": "HAAD_DOH"
  },
  {
    "id": 434,
    "question": "Kussmaul respirations are a compensatory response to:",
    "options": [
      "Metabolic acidosis",
      "Metabolic alkalosis",
      "Respiratory acidosis",
      "Hypothermia"
    ],
    "correctIndex": 0,
    "rationale": "Deep, rapid Kussmaul breathing blows off CO2 to compensate for metabolic acidosis (e.g., DKA).",
    "category": "Clinical Core",
    "examType": "HAAD_DOH"
  },
  {
    "id": 435,
    "question": "A patient on continuous bladder irrigation after prostate surgery has bright-red output with clots. The nurse should:",
    "options": [
      "Stop the irrigation",
      "Increase the irrigation rate and assess for clot obstruction",
      "Clamp the catheter",
      "Remove the catheter"
    ],
    "correctIndex": 1,
    "rationale": "Bright-red drainage with clots needs a faster irrigation rate to prevent catheter obstruction; assess and notify if it persists.",
    "category": "Post-operative",
    "examType": "HAAD_DOH"
  },
  {
    "id": 436,
    "question": "A patient with SIADH is expected to have:",
    "options": [
      "Hypernatremia and dehydration",
      "Hyponatremia and water retention",
      "Hyperkalemia",
      "Polyuria"
    ],
    "correctIndex": 1,
    "rationale": "Syndrome of inappropriate ADH causes water retention and dilutional hyponatremia.",
    "category": "Endocrine",
    "examType": "HAAD_DOH"
  },
  {
    "id": 437,
    "question": "Which intervention is the priority for a patient with diabetes insipidus?",
    "options": [
      "Restrict all fluids",
      "Monitor for dehydration and replace fluids; expect large dilute urine output",
      "Give insulin",
      "Encourage a high-sodium diet"
    ],
    "correctIndex": 1,
    "rationale": "Diabetes insipidus causes excessive dilute urine and dehydration; fluid replacement and monitoring are priorities.",
    "category": "Endocrine",
    "examType": "HAAD_DOH"
  },
  {
    "id": 438,
    "question": "A patient with a tracheostomy requires suctioning. The nurse should:",
    "options": [
      "Apply suction while inserting the catheter",
      "Apply suction only on withdrawal, limiting each pass to about 10-15 seconds",
      "Suction for 60 seconds",
      "Reuse the same catheter for the day"
    ],
    "correctIndex": 1,
    "rationale": "Suction only on withdrawal for 10-15 seconds to limit hypoxia and mucosal trauma.",
    "category": "Respiratory",
    "examType": "HAAD_DOH"
  },
  {
    "id": 439,
    "question": "A patient receiving a continuous opioid infusion has pinpoint pupils and RR 7. The FIRST action is to:",
    "options": [
      "Increase the infusion",
      "Stop the infusion, stimulate the patient and prepare naloxone",
      "Give a sedative",
      "Apply restraints"
    ],
    "correctIndex": 1,
    "rationale": "Opioid-induced respiratory depression requires stopping the drug and readiness to administer naloxone.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 440,
    "question": "A patient with a below-knee amputation reports pain in the missing limb. The nurse recognises:",
    "options": [
      "The patient is confused",
      "Phantom limb pain, which is real and should be treated",
      "Malingering",
      "A surgical error"
    ],
    "correctIndex": 1,
    "rationale": "Phantom limb pain is a genuine phenomenon and should be acknowledged and managed.",
    "category": "Musculoskeletal",
    "examType": "HAAD_DOH"
  },
  {
    "id": 441,
    "question": "Which finding after a lumbar puncture should the nurse report?",
    "options": [
      "Lying flat for a few hours",
      "Severe headache, neck stiffness or fever",
      "Mild thirst",
      "Normal leg movement"
    ],
    "correctIndex": 1,
    "rationale": "Severe headache, neck stiffness or fever after LP may indicate complications and must be reported.",
    "category": "Neurology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 442,
    "question": "A patient with chronic liver disease is at risk of bleeding because the liver:",
    "options": [
      "Produces too many platelets",
      "Fails to produce clotting factors",
      "Increases vitamin K",
      "Raises fibrinogen"
    ],
    "correctIndex": 1,
    "rationale": "The diseased liver produces fewer clotting factors, increasing bleeding risk.",
    "category": "Gastrointestinal",
    "examType": "HAAD_DOH"
  },
  {
    "id": 443,
    "question": "The priority teaching for a patient discharged on warfarin is to:",
    "options": [
      "Take double doses if one is missed",
      "Report unusual bleeding/bruising and keep regular INR checks",
      "Stop the drug when feeling well",
      "Avoid all activity"
    ],
    "correctIndex": 1,
    "rationale": "Patients must monitor for bleeding and attend INR checks; never double dose.",
    "category": "Pharmacology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 444,
    "question": "A patient with acute coronary syndrome is most appropriately positioned:",
    "options": [
      "Flat supine",
      "Upright/semi-Fowler's to ease cardiac workload and breathing",
      "Trendelenburg",
      "Prone"
    ],
    "correctIndex": 1,
    "rationale": "Semi-Fowler's reduces preload and eases breathing in cardiac patients.",
    "category": "Cardiac",
    "examType": "HAAD_DOH"
  },
  {
    "id": 445,
    "question": "A patient with a new ileal conduit (urostomy) should be taught that the stoma output is:",
    "options": [
      "Formed stool",
      "Continuous urine, requiring an appliance at all times",
      "Absent for days",
      "Bright-red blood"
    ],
    "correctIndex": 1,
    "rationale": "A urostomy continuously drains urine and needs a collection appliance; monitor for skin breakdown and infection.",
    "category": "Renal",
    "examType": "HAAD_DOH"
  },
  {
    "id": 446,
    "question": "The nurse caring for a patient in skeletal traction should:",
    "options": [
      "Remove the weights to reposition",
      "Ensure weights hang freely and maintain correct body alignment",
      "Rest the weights on the floor",
      "Loosen the traction at night"
    ],
    "correctIndex": 1,
    "rationale": "Traction weights must hang freely and not be removed; maintain alignment to ensure effectiveness.",
    "category": "Musculoskeletal",
    "examType": "HAAD_DOH"
  },
  {
    "id": 447,
    "question": "A patient develops a sudden severe headache described as 'the worst of my life.' The nurse suspects:",
    "options": [
      "Tension headache",
      "Subarachnoid haemorrhage - an emergency",
      "Migraine only",
      "Sinusitis"
    ],
    "correctIndex": 1,
    "rationale": "A sudden 'thunderclap' worst-ever headache suggests subarachnoid haemorrhage; act urgently.",
    "category": "Neurology",
    "examType": "HAAD_DOH"
  },
  {
    "id": 448,
    "question": "Which is the correct action when a patient's oxygen saturation reads 90% with a cold extremity and poor waveform?",
    "options": [
      "Document 90% as accurate",
      "Reposition the probe/warm the site and reassess for an accurate reading",
      "Increase oxygen immediately without checking",
      "Remove the probe permanently"
    ],
    "correctIndex": 1,
    "rationale": "Poor perfusion/cold extremity can give inaccurate pulse oximetry; correct the probe and reassess.",
    "category": "Assessment",
    "examType": "HAAD_DOH"
  },
  {
    "id": 449,
    "question": "A patient with hypoparathyroidism is most likely to develop:",
    "options": [
      "Hypercalcemia",
      "Hypocalcemia with tetany",
      "Hyperkalemia",
      "Hypernatremia"
    ],
    "correctIndex": 1,
    "rationale": "Low parathyroid hormone lowers calcium, causing hypocalcemia and tetany.",
    "category": "Endocrine",
    "examType": "HAAD_DOH"
  },
  {
    "id": 450,
    "question": "A patient receiving radiation therapy to the skin is taught to:",
    "options": [
      "Scrub the marked area",
      "Keep the skin clean and dry, avoid rubbing, and not remove radiation markings",
      "Apply ice packs",
      "Use perfumed lotions"
    ],
    "correctIndex": 1,
    "rationale": "Protect irradiated skin: keep it dry, avoid friction/irritants, and preserve treatment markings.",
    "category": "Oncology",
    "examType": "HAAD_DOH"
  }
];
