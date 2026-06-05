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
    id: 'ethics-law',
    title: 'UAE Nursing Code of Ethics & Licensing Regulations',
    subtitle: 'Professional standards, scope of practice & patient rights under DHA, MOHAP and DOH/HAAD',
    category: 'Ethics & Regulations',
    readingTime: '18 min read',
    examWeight: '~10–15% of the licensing exam',
    objectives: [
      'Describe the legal framework governing nursing practice in the UAE.',
      'Apply the principles of informed consent, confidentiality and patient rights.',
      'Differentiate mandatory reporting duties from confidentiality obligations.',
      'Recognise the nurse\'s scope of practice and delegation boundaries.'
    ],
    sections: [
      {
        title: 'Legal Framework & Scope of Practice',
        content: 'Nursing in the UAE is regulated under Federal Decree-Law No. (4) of 2016 on Medical Liability (which replaced the earlier 2008 law) together with the standards of the relevant health authority — DHA (Dubai), MOHAP (Northern Emirates) and DOH/HAAD (Abu Dhabi). The nursing process — Assessment, Diagnosis, Planning, Implementation and Evaluation (ADPIE) — is the legal and professional backbone of safe care.',
        bullets: [
          'Active licensure: every clinician must hold a current licence from their regulating authority and practise only within its defined scope.',
          'Standard of care: nurses are accountable for delivering care that a reasonably prudent nurse would provide in the same situation.',
          'Cultural & religious respect: care must uphold patient dignity and Islamic values, including same-gender care where requested.',
          'Documentation: accurate, timely, objective records are a legal requirement and the nurse\'s best protection.'
        ]
      },
      {
        title: 'Informed Consent & Patient Rights',
        content: 'Informed consent must be obtained before invasive or high-risk procedures. The patient must be competent, informed of risks/benefits/alternatives, and consent voluntarily without coercion. The nurse often witnesses consent and confirms the patient understands — the treating physician is responsible for the explanation.',
        bullets: [
          'Valid consent = competent patient + adequate disclosure + voluntary decision.',
          'Emergencies: implied consent applies when delay would threaten life and the patient cannot consent.',
          'Minors / incompetent adults: consent is given by a legal guardian.',
          'A patient may refuse treatment; the nurse documents the refusal and informs the physician.'
        ]
      },
      {
        title: 'Confidentiality & Mandatory Reporting',
        content: 'Disclosure of patient information without authorization is prohibited under UAE law. The key exception is mandatory public-health reporting: notifiable communicable diseases must be reported to preventive medicine departments to protect public health.',
        bullets: [
          'Confidentiality protects records across electronic and paper systems.',
          'Exception: notifiable diseases (e.g., TB, measles, meningococcal meningitis) must be reported, usually within 24 hours.',
          'Sentinel events (e.g., medication error with harm, wrong-site surgery) are reported to the quality/risk department per policy.',
          'Breach of confidentiality can lead to disciplinary, civil and criminal liability.'
        ]
      },
      {
        title: 'Delegation, Advocacy & Professional Accountability',
        content: 'The registered nurse remains accountable for delegated tasks. Delegation must follow the "Five Rights": right task, right circumstance, right person, right direction/communication, and right supervision. The nurse is also the patient\'s advocate — protecting their safety, rights and preferences.',
        bullets: [
          'Delegate only tasks within the assistant\'s competence (e.g., routine ambulation, hygiene, basic vitals).',
          'Never delegate assessment, clinical judgement, teaching, or medication administration to unlicensed personnel.',
          'Advocacy: speak up for patient safety, question unsafe orders, and escalate concerns.',
          'Accountability cannot be transferred — the RN owns the outcome of delegated care.'
        ]
      }
    ],
    flashcards: [
      { question: 'Which federal law currently governs medical liability and professional conduct in the UAE?', answer: 'Federal Decree-Law No. (4) of 2016 on Medical Liability (which superseded the 2008 law), enforced alongside DHA, MOHAP and DOH standards.' },
      { question: 'When can patient information be disclosed without explicit consent?', answer: 'Only for mandatory public-health reporting of notifiable communicable diseases to the relevant authority, to protect public health.' },
      { question: 'Who is legally responsible for explaining a procedure for informed consent?', answer: 'The treating physician performing the procedure. The nurse may witness consent and confirm the patient\'s understanding.' },
      { question: 'List the "Five Rights" of delegation.', answer: 'Right task, right circumstance, right person, right direction/communication, and right supervision.' },
      { question: 'Which tasks can NOT be delegated to unlicensed assistive personnel?', answer: 'Assessment, nursing diagnosis, clinical judgement, patient teaching, and medication administration.' }
    ],
    quiz: [
      { question: 'A competent adult refuses a blood transfusion for religious reasons. What is the nurse\'s most appropriate action?', options: ['Administer the transfusion because it is life-saving', 'Respect the refusal, document it, and notify the physician', 'Ask the family to override the decision', 'Delay care until the patient changes their mind'], correctIndex: 1, rationale: 'A competent adult has the right to refuse treatment. The nurse must respect autonomy, document the informed refusal, and notify the physician — not coerce or override the patient.' },
      { question: 'A nurse may delegate which task to a qualified unlicensed assistive personnel (UAP)?', options: ['Assessing a new admission', 'Administering oral medications', 'Assisting a stable patient to ambulate to the bathroom', 'Teaching insulin self-injection'], correctIndex: 2, rationale: 'Routine ambulation of a stable patient is appropriate to delegate. Assessment, medication administration, and teaching require the licensed nurse\'s judgement.' },
      { question: 'Which situation requires mandatory reporting despite confidentiality rules?', options: ['A patient with controlled hypertension', 'A confirmed case of pulmonary tuberculosis', 'A patient requesting a second opinion', 'A patient refusing physiotherapy'], correctIndex: 1, rationale: 'Notifiable communicable diseases such as TB must be reported to preventive medicine departments — a recognised exception to confidentiality to protect public health.' },
      { question: 'For valid informed consent, all of the following are required EXCEPT:', options: ['The patient is competent', 'Risks, benefits and alternatives are disclosed', 'The decision is voluntary', 'A family member co-signs the form'], correctIndex: 3, rationale: 'Valid consent requires a competent patient, adequate disclosure, and a voluntary decision. A family co-signature is not required for a competent adult.' },
      { question: 'A nurse disagrees with a physician\'s order that appears unsafe. The best action is to:', options: ['Carry out the order to avoid conflict', 'Refuse and say nothing further', 'Question the order and escalate the concern through the chain of command', 'Ask another nurse to carry it out'], correctIndex: 2, rationale: 'As a patient advocate the nurse must clarify and question unsafe orders and escalate appropriately, documenting the concern — never silently carry out unsafe care.' }
    ]
  },
  {
    id: 'fundamentals',
    title: 'Fundamentals of Nursing & Patient Safety',
    subtitle: 'Vital signs, the nursing process, mobility, hygiene, and the safety priorities tested heavily on every exam',
    category: 'Fundamentals',
    readingTime: '20 min read',
    examWeight: '~15–20% of the licensing exam',
    objectives: [
      'Interpret normal adult vital-sign ranges and recognise abnormal values.',
      'Apply the nursing process (ADPIE) and prioritisation frameworks.',
      'Use ABC and Maslow\'s hierarchy to prioritise patient problems.',
      'Implement core safety measures: fall prevention, asepsis, and identification.'
    ],
    sections: [
      {
        title: 'Normal Adult Vital Signs',
        content: 'Vital signs are the foundation of assessment. Memorise the normal adult ranges and the values that demand action. Always interpret a value in the context of the patient\'s baseline and clinical picture.',
        bullets: [
          'Temperature: 36.1–37.2°C (oral). Fever ≥ 38°C.',
          'Heart rate: 60–100 bpm. Bradycardia < 60, tachycardia > 100.',
          'Respiratory rate: 12–20 breaths/min.',
          'Blood pressure: < 120/80 mmHg normal; ≥ 140/90 hypertension; sustained < 90 systolic suggests hypotension/shock.',
          'Oxygen saturation (SpO₂): 95–100% on room air.'
        ]
      },
      {
        title: 'The Nursing Process & Prioritisation',
        content: 'ADPIE — Assessment, Diagnosis, Planning, Implementation, Evaluation — guides every nurse-patient interaction. When choosing which problem to address first, use two complementary frameworks: ABC (Airway, Breathing, Circulation) and Maslow\'s hierarchy (physiological needs before safety, then psychosocial).',
        bullets: [
          'ABCs always come first: a patent airway and adequate breathing precede everything.',
          'Maslow: physiological needs (oxygen, fluids, nutrition, elimination) before safety and psychosocial needs.',
          'Acute, unstable, or life-threatening problems take priority over chronic, stable ones.',
          'Assessment precedes intervention — never act on incomplete data unless it is an emergency.'
        ]
      },
      {
        title: 'Patient Safety Essentials',
        content: 'Patient safety is a global priority and a major exam theme. Two-identifier verification, fall prevention, and infection prevention through hand hygiene are non-negotiable.',
        bullets: [
          'Use two identifiers (e.g., name + date of birth/MRN) before any medication, procedure, or specimen.',
          'WHO "5 Moments for Hand Hygiene": before patient contact, before aseptic task, after body-fluid exposure risk, after patient contact, after contact with patient surroundings.',
          'Fall prevention: bed in low position, call bell within reach, non-slip footwear, scheduled rounding, assess high-risk patients.',
          'Verify allergies and use barcode/medication checks to prevent errors.'
        ]
      }
    ],
    flashcards: [
      { question: 'What is the normal adult resting heart rate range?', answer: '60–100 beats per minute. Below 60 is bradycardia; above 100 is tachycardia.' },
      { question: 'Order the priority frameworks used to decide which patient need to address first.', answer: 'Airway, Breathing, Circulation (ABC) first; then Maslow\'s hierarchy — physiological needs before safety and psychosocial needs.' },
      { question: 'How many patient identifiers must be checked before giving a medication?', answer: 'At least two (e.g., full name and date of birth or medical record number) — never the room/bed number.' },
      { question: 'State the WHO "5 Moments for Hand Hygiene".', answer: 'Before patient contact, before an aseptic task, after body-fluid exposure risk, after patient contact, and after contact with the patient\'s surroundings.' },
      { question: 'What is the normal range for oxygen saturation on room air?', answer: '95–100%. Values below 90% indicate significant hypoxaemia requiring intervention.' }
    ],
    quiz: [
      { question: 'A nurse must prioritise care for four patients. Who should be seen FIRST?', options: ['A patient due for routine medications', 'A patient reporting new shortness of breath and SpO₂ 86%', 'A patient requesting help to the bathroom', 'A patient asking about discharge'], correctIndex: 1, rationale: 'Airway/Breathing problems take priority. New dyspnoea with SpO₂ 86% is a life-threatening physiological need and must be addressed first.' },
      { question: 'Before administering medication, the nurse should identify the patient using:', options: ['Room number and bed', 'The nurse\'s memory of the patient', 'Two identifiers such as name and date of birth', 'The diagnosis on the chart'], correctIndex: 2, rationale: 'Two patient identifiers (e.g., name + DOB/MRN) are required; room/bed numbers are not acceptable identifiers.' },
      { question: 'Which adult vital sign is clearly abnormal and needs action?', options: ['Temperature 36.8°C', 'Heart rate 72 bpm', 'Respiratory rate 30 breaths/min', 'Blood pressure 118/76 mmHg'], correctIndex: 2, rationale: 'Normal adult respiratory rate is 12–20/min. A rate of 30 (tachypnoea) is abnormal and warrants assessment.' },
      { question: 'According to Maslow, which need takes priority?', options: ['Self-esteem', 'Belonging', 'Oxygenation and fluid balance', 'Spiritual support'], correctIndex: 2, rationale: 'Physiological needs (oxygen, fluids, nutrition, elimination) are the base of Maslow\'s hierarchy and take priority over higher psychosocial needs.' },
      { question: 'A key fall-prevention intervention for a high-risk patient is to:', options: ['Keep the bed in the highest position', 'Place the call bell within reach and keep the bed low', 'Use restraints routinely', 'Remove the call bell to reduce noise'], correctIndex: 1, rationale: 'Keeping the bed low with the call bell within reach (plus non-slip footwear and rounding) reduces falls. Restraints are a last resort, not routine.' }
    ]
  },
  {
    id: 'med-surg',
    title: 'Medical-Surgical Core Nursing Systems',
    subtitle: 'Shock, cardiac emergencies, fluid & electrolytes, and acid-base balance',
    category: 'Clinical Core',
    readingTime: '24 min read',
    examWeight: '~20–25% of the licensing exam',
    objectives: [
      'Recognise and prioritise care for the major types of shock.',
      'Identify priority interventions for myocardial infarction and cardiac emergencies.',
      'Manage potassium, sodium and calcium imbalances safely.',
      'Interpret basic arterial blood gases (acid-base balance).'
    ],
    sections: [
      {
        title: 'Cardiovascular Systems & Shock Protocols',
        content: 'Early recognition of shock saves lives. Hypovolemic, cardiogenic, distributive (e.g., septic, anaphylactic) and obstructive shock share the final pathway of inadequate tissue perfusion. Prioritise oxygenation, circulation and rapid escalation.',
        bullets: [
          'Hypovolemic shock: tachycardia, cold/clammy skin, low urine output, narrowing pulse pressure — treat with fluids/blood and control bleeding.',
          'Myocardial infarction: priority interventions follow MONA as ordered — Morphine, Oxygen (if hypoxic), Nitroglycerin, Aspirin — plus immediate 12-lead ECG.',
          'Anaphylactic shock: ensure airway, give IM epinephrine (1:1000) first, then antihistamines/steroids as ordered.',
          'Sepsis: early recognition, blood cultures before antibiotics, fluid resuscitation, and source control.'
        ]
      },
      {
        title: 'Fluid & Electrolyte Imbalances',
        content: 'Electrolyte control is critical for cardiac and neuromuscular stability. Potassium, sodium and calcium abnormalities can be rapidly fatal.',
        bullets: [
          'Hyperkalemia (> 5.0 mEq/L): tall, peaked T-waves, widened QRS. Give calcium gluconate to protect the heart, then insulin/dextrose or Kayexalate to shift/remove potassium.',
          'Hypokalemia (< 3.5 mEq/L): flat T-waves, U-waves. Never give potassium by IV push — always dilute and infuse via pump.',
          'Hyponatremia: confusion, seizures; correct slowly to avoid osmotic demyelination.',
          'Hypocalcemia: positive Chvostek\'s and Trousseau\'s signs, tetany; hypercalcemia causes weakness and dysrhythmias.'
        ]
      },
      {
        title: 'Acid-Base Balance (ABG Basics)',
        content: 'Use the ROME mnemonic to interpret blood gases: Respiratory Opposite, Metabolic Equal. Normal values: pH 7.35–7.45, PaCO₂ 35–45 mmHg, HCO₃⁻ 22–26 mEq/L.',
        bullets: [
          'Respiratory acidosis: ↓pH, ↑PaCO₂ (e.g., hypoventilation/COPD).',
          'Respiratory alkalosis: ↑pH, ↓PaCO₂ (e.g., hyperventilation/anxiety).',
          'Metabolic acidosis: ↓pH, ↓HCO₃⁻ (e.g., DKA, diarrhoea, renal failure).',
          'Metabolic alkalosis: ↑pH, ↑HCO₃⁻ (e.g., vomiting, excess antacids).'
        ]
      }
    ],
    flashcards: [
      { question: 'What is the immediate priority action in suspected anaphylactic shock?', answer: 'Ensure a patent airway, position supine with legs elevated, and administer IM epinephrine (1:1000) as ordered — epinephrine first.' },
      { question: 'Why must concentrated potassium chloride never be given by IV push?', answer: 'It can cause immediate fatal cardiac arrest. It must always be diluted and infused slowly through a regulated pump.' },
      { question: 'Which ECG change is most characteristic of severe hyperkalemia?', answer: 'Tall, symmetrically peaked T-waves, followed by PR prolongation and QRS widening.' },
      { question: 'Interpret: pH 7.30, PaCO₂ 55, HCO₃⁻ 24.', answer: 'Respiratory acidosis (low pH with high CO₂) — uncompensated, as bicarbonate is still normal.' },
      { question: 'What is the first-line antidote that protects the myocardium in hyperkalemia?', answer: 'IV calcium gluconate stabilises the cardiac membrane; insulin + dextrose and Kayexalate then lower the potassium.' }
    ],
    quiz: [
      { question: 'A post-op patient has BP 88/60, HR 122, cool clammy skin and low urine output. The priority intervention is to:', options: ['Administer an antipyretic', 'Increase IV fluids/blood and identify the bleeding source', 'Place the patient in reverse Trendelenburg', 'Restrict fluids'], correctIndex: 1, rationale: 'These are signs of hypovolemic shock. Restoring circulating volume (fluids/blood) and controlling the source of loss is the priority.' },
      { question: 'A patient with serum potassium 6.8 mEq/L and peaked T-waves should first receive:', options: ['Oral potassium', 'IV calcium gluconate', 'A potassium-sparing diuretic', 'Normal saline bolus only'], correctIndex: 1, rationale: 'IV calcium gluconate is given first to stabilise the myocardium, followed by insulin/dextrose or Kayexalate to lower potassium.' },
      { question: 'ABG: pH 7.50, PaCO₂ 30, HCO₃⁻ 24. This represents:', options: ['Respiratory acidosis', 'Respiratory alkalosis', 'Metabolic acidosis', 'Metabolic alkalosis'], correctIndex: 1, rationale: 'High pH with low CO₂ = respiratory alkalosis (often from hyperventilation). Bicarbonate is normal, so it is uncompensated.' },
      { question: 'When infusing IV potassium chloride, the nurse must:', options: ['Give it rapidly as a bolus', 'Dilute it and infuse via an electronic pump', 'Push it undiluted over 1 minute', 'Mix it with the patient\'s blood'], correctIndex: 1, rationale: 'KCl must be diluted and infused slowly via a regulated pump; IV push can cause fatal dysrhythmias.' },
      { question: 'Which finding indicates hypocalcemia?', options: ['Positive Trousseau\'s and Chvostek\'s signs', 'Tall peaked T-waves', 'Flushed warm skin', 'Bounding pulses'], correctIndex: 0, rationale: 'Hypocalcemia increases neuromuscular excitability, producing positive Chvostek\'s (facial twitch) and Trousseau\'s (carpal spasm) signs and tetany.' }
    ]
  },
  {
    id: 'pharmacology',
    title: 'High-Alert Pharmacology & Dosage Calculations',
    subtitle: 'Drug-rate math, high-alert medications, antidotes and safe administration',
    category: 'Pharmacology',
    readingTime: '22 min read',
    examWeight: '~15–20% of the licensing exam',
    objectives: [
      'Perform accurate IV flow-rate and dosage calculations.',
      'Identify high-alert medications, their monitoring and antidotes.',
      'Apply the rights of medication administration to prevent errors.',
      'Recognise signs of common drug toxicities.'
    ],
    sections: [
      {
        title: 'Dosage Calculation Core Logic',
        content: 'Accurate calculation is the nurse\'s defence against medication harm. Memorise the two core formulas and always double-check weight-based paediatric doses against safe ranges.',
        bullets: [
          'Flow rate (gtt/min) = (Volume in mL × Drop factor) ÷ Time in minutes.',
          'Infusion rate (mL/hr) = Total volume in mL ÷ Total time in hours.',
          'Desired dose: (Desired ÷ Have) × Quantity.',
          'Microdrip tubing is always 60 gtt/mL; macrodrip is 10, 15 or 20 gtt/mL.'
        ]
      },
      {
        title: 'High-Alert Medications, Monitoring & Antidotes',
        content: 'High-alert drugs carry a heightened risk of significant harm. They require independent double-checks and close lab monitoring.',
        bullets: [
          'Heparin: monitor aPTT; antidote is protamine sulfate.',
          'Warfarin: monitor PT/INR (target 2.0–3.0); antidote is vitamin K.',
          'Digoxin: hold if apical pulse < 60; toxicity causes nausea, visual halos, dysrhythmias; antidote is digoxin immune Fab.',
          'Insulin & opioids: require independent double-checks; naloxone reverses opioid overdose.',
          'Magnesium sulfate toxicity (loss of reflexes, respiratory depression): antidote is calcium gluconate.'
        ]
      },
      {
        title: 'Safe Administration — The Rights',
        content: 'Apply the rights of medication administration every time, and verify allergies and the prescription before giving any drug.',
        bullets: [
          'Rights: right patient, drug, dose, route, time — plus documentation, reason, response and right to refuse.',
          'Check two identifiers and the allergy band before administration.',
          'Three checks: when retrieving, when preparing, and at the bedside before giving.',
          'Document immediately after administration — never before.'
        ]
      }
    ],
    flashcards: [
      { question: 'What is the antidote for heparin overdose?', answer: 'Protamine sulfate. (Warfarin\'s antidote is vitamin K.)' },
      { question: 'Calculate: infuse 1000 mL over 8 hours using microdrip (60 gtt/mL).', answer: '125 gtt/min. (1000 × 60) ÷ (8 × 60) = 60000 ÷ 480 = 125.' },
      { question: 'Before giving digoxin, what must the nurse assess and when is the dose held?', answer: 'Take the apical pulse for a full minute; hold and notify the physician if it is below 60 bpm in an adult.' },
      { question: 'Which lab monitors warfarin therapy and what is the typical target?', answer: 'PT/INR, with a usual therapeutic target of 2.0–3.0.' },
      { question: 'What is the antidote for magnesium sulfate toxicity?', answer: 'Calcium gluconate — given for loss of deep tendon reflexes or respiratory depression.' }
    ],
    quiz: [
      { question: 'Order: infuse 1 L of 0.9% saline over 10 hours. What rate (mL/hr) is set on the pump?', options: ['50 mL/hr', '100 mL/hr', '125 mL/hr', '200 mL/hr'], correctIndex: 1, rationale: '1000 mL ÷ 10 hr = 100 mL/hr.' },
      { question: 'A patient on heparin develops bleeding. The nurse anticipates giving:', options: ['Vitamin K', 'Protamine sulfate', 'Naloxone', 'Calcium gluconate'], correctIndex: 1, rationale: 'Protamine sulfate reverses heparin. Vitamin K reverses warfarin; naloxone reverses opioids.' },
      { question: 'Before administering digoxin to an adult, the nurse takes an apical pulse of 54 bpm. The nurse should:', options: ['Give the dose as ordered', 'Hold the dose and notify the physician', 'Give half the dose', 'Recheck in 4 hours then give'], correctIndex: 1, rationale: 'An apical pulse below 60 bpm requires holding digoxin and notifying the physician to avoid bradycardia and toxicity.' },
      { question: 'Order: 250 mg of a drug; available 125 mg/5 mL. How many mL are given?', options: ['5 mL', '10 mL', '12.5 mL', '2.5 mL'], correctIndex: 1, rationale: '(Desired 250 ÷ Have 125) × 5 mL = 2 × 5 = 10 mL.' },
      { question: 'Which medications are considered high-alert and require an independent double-check?', options: ['Paracetamol and vitamins', 'Insulin and IV opioids', 'Oral antacids', 'Topical emollients'], correctIndex: 1, rationale: 'Insulin and IV opioids (and anticoagulants like heparin) are high-alert drugs requiring an independent double-check to prevent serious harm.' }
    ]
  },
  {
    id: 'maternity-pediatrics',
    title: 'Maternity Care & Pediatric Nursing',
    subtitle: 'Labour, postpartum haemorrhage, newborn assessment and child development',
    category: 'Maternity & Child Care',
    readingTime: '22 min read',
    examWeight: '~15% of the licensing exam',
    objectives: [
      'Manage postpartum haemorrhage and recognise uterine atony.',
      'Score and interpret the APGAR assessment.',
      'Respond to obstetric emergencies (cord prolapse, shoulder dystocia).',
      'Apply paediatric dosing safety and developmental milestones.'
    ],
    sections: [
      {
        title: 'Postpartum Haemorrhage (PPH)',
        content: 'PPH is blood loss > 500 mL after vaginal birth or > 1000 mL after caesarean. Uterine atony is the leading cause. Frequent fundal assessment is essential.',
        bullets: [
          'First action for a boggy/atonic uterus: firm fundal massage to stimulate contraction.',
          'First-line drug: oxytocin (Pitocin); second-line: methylergonovine (avoid in hypertension).',
          'Monitor for signs of hypovolemic shock and quantify blood loss.',
          'Ensure IV access, fluids, and prepare blood products as ordered.'
        ]
      },
      {
        title: 'Newborn Assessment & APGAR',
        content: 'The APGAR score is assessed at 1 and 5 minutes after birth, scoring Heart rate, Respiratory effort, Muscle tone, Reflex irritability and Colour (0–2 each).',
        bullets: [
          'Score 7–10: normal transition.',
          'Score 4–6: moderate distress — stimulate and give oxygen.',
          'Score 0–3: severe distress — immediate resuscitation.',
          'Maintain warmth, airway and bonding; the first priority at birth is airway/breathing.'
        ]
      },
      {
        title: 'Obstetric Emergencies & Paediatric Safety',
        content: 'Cord prolapse and shoulder dystocia are acute emergencies. In paediatrics, weight-based dosing and developmental safety are emphasised.',
        bullets: [
          'Umbilical cord prolapse: relieve pressure on the cord with a gloved hand, place mother in knee-chest/Trendelenburg, prepare for emergency C-section.',
          'Shoulder dystocia: McRoberts maneuver + suprapubic pressure; fundal pressure is contraindicated.',
          'Paediatric doses are weight-based (mg/kg) — always verify against safe ranges.',
          'Suspected epiglottitis: never inspect the throat with a tongue blade (risk of laryngospasm).'
        ]
      }
    ],
    flashcards: [
      { question: 'What is the first nursing action for a postpartum woman with a soft, boggy uterus?', answer: 'Perform firm fundal massage to stimulate uterine contraction and control bleeding.' },
      { question: 'When is the APGAR score assessed and what does it measure?', answer: 'At 1 and 5 minutes after birth; it scores heart rate, respiratory effort, muscle tone, reflex irritability and colour (0–2 each).' },
      { question: 'What is the immediate management of umbilical cord prolapse?', answer: 'Use a gloved hand to lift the presenting part off the cord, place the mother in knee-chest or Trendelenburg, and prepare for emergency caesarean.' },
      { question: 'Which maneuver is used for shoulder dystocia and which action is contraindicated?', answer: 'McRoberts maneuver with suprapubic pressure; fundal pressure is contraindicated.' },
      { question: 'A newborn at 1 minute: HR 110, slow irregular cry, some flexion, active grimace, body pink with blue extremities. APGAR?', answer: 'Score 6 (HR 2, Resp 1, Tone 1, Reflex 1, Colour 1).' }
    ],
    quiz: [
      { question: 'A postpartum patient has heavy lochia and a boggy fundus. The nurse FIRST:', options: ['Administers oxytocin', 'Massages the fundus', 'Calls the physician', 'Inserts a urinary catheter'], correctIndex: 1, rationale: 'Fundal massage is the immediate first action for a boggy uterus (uterine atony). Oxytocin and other measures follow if massage is insufficient.' },
      { question: 'During a vaginal exam the nurse palpates a pulsating umbilical cord. The priority action is to:', options: ['Push the cord back in', 'Apply fundal pressure', 'Lift the presenting part off the cord and position knee-chest', 'Encourage the patient to push'], correctIndex: 2, rationale: 'Cord prolapse compresses fetal circulation. Relieving cord pressure with a gloved hand and a knee-chest/Trendelenburg position, then preparing for C-section, is the priority.' },
      { question: 'A newborn has an APGAR of 5 at one minute. The nurse should:', options: ['Document and take no action', 'Provide stimulation and oxygen, and reassess', 'Begin chest compressions immediately', 'Delay the 5-minute score'], correctIndex: 1, rationale: 'A score of 4–6 indicates moderate distress requiring tactile stimulation and oxygen, with reassessment at 5 minutes.' },
      { question: 'Methylergonovine (Methergine) for PPH is contraindicated in patients with:', options: ['Diabetes', 'Hypertension', 'Asthma', 'Anaemia'], correctIndex: 1, rationale: 'Methylergonovine causes vasoconstriction and can dangerously raise blood pressure, so it is contraindicated in hypertension.' },
      { question: 'A 4-year-old with drooling, high fever and tripod positioning likely has epiglottitis. The nurse must AVOID:', options: ['Giving humidified oxygen', 'Keeping the child calm on the parent\'s lap', 'Examining the throat with a tongue depressor', 'Preparing airway equipment'], correctIndex: 2, rationale: 'Inspecting the throat can trigger laryngospasm and complete airway obstruction in epiglottitis. Keep the child calm and have airway equipment ready.' }
    ]
  },
  {
    id: 'critical-emergency',
    title: 'Critical Care & Emergency Nursing',
    subtitle: 'Triage, ACLS basics, respiratory failure, and life-threatening dysrhythmias',
    category: 'Critical Care',
    readingTime: '20 min read',
    examWeight: '~10–15% of the licensing exam',
    objectives: [
      'Apply triage principles to prioritise multiple casualties.',
      'Recognise and respond to lethal cardiac rhythms.',
      'Manage acute respiratory distress and oxygen therapy safely.',
      'Identify early signs of clinical deterioration.'
    ],
    sections: [
      {
        title: 'Triage & Prioritisation',
        content: 'In emergency and mass-casualty situations, triage sorts patients by urgency. The nurse treats the most survivable, life-threatening conditions first using airway-breathing-circulation logic.',
        bullets: [
          'Emergent (red): immediate threat to life — airway obstruction, severe bleeding, shock.',
          'Urgent (yellow): serious but can wait briefly — stable fractures, moderate pain.',
          'Non-urgent (green): minor injuries.',
          'Always reassess — triage categories can change as patients deteriorate or improve.'
        ]
      },
      {
        title: 'Lethal Dysrhythmias & Basic ACLS',
        content: 'Pulseless rhythms require immediate high-quality CPR and, when shockable, rapid defibrillation. Distinguish shockable from non-shockable rhythms.',
        bullets: [
          'Shockable: ventricular fibrillation (VF) and pulseless ventricular tachycardia (VT) — defibrillate + CPR.',
          'Non-shockable: asystole and pulseless electrical activity (PEA) — CPR + epinephrine, treat reversible causes.',
          'Defibrillation is unsynchronised; cardioversion is synchronised and used for unstable rhythms WITH a pulse.',
          'High-quality CPR: push hard and fast (100–120/min), allow full recoil, minimise interruptions.'
        ]
      },
      {
        title: 'Acute Respiratory Failure & Oxygen Safety',
        content: 'Recognise respiratory distress early (rising rate, accessory muscle use, falling SpO₂, altered mental status). Deliver the correct oxygen device and watch special populations.',
        bullets: [
          'Escalate oxygen by device: nasal cannula → simple mask → non-rebreather → assisted ventilation.',
          'In chronic CO₂ retainers (severe COPD), high-flow oxygen can suppress the hypoxic drive — titrate carefully to target SpO₂.',
          'Position upright (high-Fowler\'s) to ease breathing unless contraindicated.',
          'A falling level of consciousness in a breathless patient is an ominous sign of fatigue/CO₂ retention.'
        ]
      }
    ],
    flashcards: [
      { question: 'Which cardiac rhythms are "shockable"?', answer: 'Ventricular fibrillation (VF) and pulseless ventricular tachycardia (pulseless VT). Asystole and PEA are non-shockable.' },
      { question: 'What is the difference between defibrillation and synchronised cardioversion?', answer: 'Defibrillation is an unsynchronised shock for pulseless VF/VT. Synchronised cardioversion times the shock to the R-wave and is used for unstable rhythms with a pulse.' },
      { question: 'In severe COPD, why is high-flow oxygen used cautiously?', answer: 'Chronic CO₂ retainers may rely on a hypoxic drive; excessive oxygen can suppress breathing, causing CO₂ retention and respiratory arrest. Titrate to a target SpO₂.' },
      { question: 'What are the components of high-quality CPR?', answer: 'Compressions 100–120/min at adequate depth, full chest recoil, minimal interruptions, and avoiding excessive ventilation.' },
      { question: 'In triage, which patient is treated first?', answer: 'The patient with the most survivable life threat to airway, breathing or circulation (emergent/red category).' }
    ],
    quiz: [
      { question: 'The monitor shows a chaotic, irregular waveform with no pulse and no breathing. The nurse should:', options: ['Perform synchronised cardioversion', 'Start CPR and prepare to defibrillate', 'Give oral medication', 'Check blood glucose first'], correctIndex: 1, rationale: 'This describes ventricular fibrillation — a pulseless shockable rhythm. Immediate high-quality CPR and defibrillation are required.' },
      { question: 'Synchronised cardioversion (not defibrillation) is appropriate for:', options: ['Pulseless VT', 'Ventricular fibrillation', 'Unstable SVT with a pulse', 'Asystole'], correctIndex: 2, rationale: 'Synchronised cardioversion is used for unstable tachydysrhythmias that still have a pulse (e.g., unstable SVT/VT with a pulse). Pulseless rhythms get defibrillation or CPR.' },
      { question: 'A COPD patient is given high-flow oxygen and becomes drowsy with slow breathing. The nurse should:', options: ['Increase the oxygen further', 'Reduce oxygen to a controlled target SpO₂ and reassess', 'Leave the patient to rest', 'Give a sedative'], correctIndex: 1, rationale: 'Excess oxygen can suppress the hypoxic drive in CO₂ retainers, causing hypoventilation and drowsiness. Titrate oxygen down to a controlled target and reassess.' },
      { question: 'Which patient in the emergency department should be seen FIRST?', options: ['A sprained ankle', 'A laceration needing sutures', 'A patient with stridor and difficulty breathing', 'A patient with a migraine'], correctIndex: 2, rationale: 'Stridor signals airway compromise — an immediate (emergent) threat to life and the top triage priority.' },
      { question: 'During CPR, compressions should be delivered at a rate of:', options: ['40–60 per minute', '60–80 per minute', '100–120 per minute', 'As fast as possible'], correctIndex: 2, rationale: 'High-quality CPR uses a compression rate of 100–120 per minute with full recoil and minimal interruptions.' }
    ]
  },
  {
    id: 'mental-health',
    title: 'Mental Health & Psychiatric Nursing',
    subtitle: 'Therapeutic communication, risk assessment, and management of acute presentations',
    category: 'Mental Health',
    readingTime: '16 min read',
    examWeight: '~10% of the licensing exam',
    objectives: [
      'Use therapeutic communication techniques effectively.',
      'Prioritise safety in suicidal and aggressive patients.',
      'Manage acute mania, anxiety and psychosis.',
      'Recognise key medication considerations in psychiatry.'
    ],
    sections: [
      {
        title: 'Therapeutic Communication',
        content: 'Therapeutic communication builds trust and supports assessment. Use open-ended questions, active listening, reflection and silence; avoid non-therapeutic blocks such as false reassurance, advice-giving and "why" questions.',
        bullets: [
          'Therapeutic: open-ended questions, reflecting, clarifying, offering self, using silence.',
          'Non-therapeutic: false reassurance ("Don\'t worry"), giving advice, changing the subject, asking "why".',
          'Acknowledge feelings before facts — empathy first.',
          'Maintain a calm, non-judgemental and safe environment.'
        ]
      },
      {
        title: 'Safety: Suicide & Aggression',
        content: 'Safety is always the priority in mental-health nursing. Directly assess suicide risk and provide a safe environment for agitated or aggressive patients.',
        bullets: [
          'Ask directly about suicidal thoughts and a plan — asking does not increase risk.',
          'A patient with a specific plan and means is high risk — ensure continuous observation and remove hazards.',
          'For aggression: maintain a safe distance, speak calmly, reduce stimulation; restraints/seclusion are a last resort with an order.',
          'Acute mania: provide a low-stimulation environment and high-calorie portable foods to meet metabolic needs safely.'
        ]
      },
      {
        title: 'Psychopharmacology Essentials',
        content: 'Key psychiatric medication safety points are frequently tested.',
        bullets: [
          'Lithium: narrow therapeutic range (0.6–1.2 mEq/L); monitor levels, maintain hydration and stable sodium intake; watch for toxicity (tremor, GI upset, confusion).',
          'SSRIs: risk of serotonin syndrome (agitation, hyperthermia, hyperreflexia) especially when combined with other serotonergic drugs.',
          'Antipsychotics: watch for extrapyramidal symptoms and neuroleptic malignant syndrome (high fever, rigidity, altered consciousness — a medical emergency).',
          'MAOIs: avoid tyramine-rich foods (aged cheese, cured meats) to prevent hypertensive crisis.'
        ]
      }
    ],
    flashcards: [
      { question: 'Is it safe to ask a patient directly about suicidal thoughts?', answer: 'Yes. Asking directly does not increase risk; it allows accurate assessment and timely protection.' },
      { question: 'What is the therapeutic lithium level and a sign of toxicity?', answer: 'Therapeutic range 0.6–1.2 mEq/L. Early toxicity signs include fine tremor, nausea/diarrhoea and confusion.' },
      { question: 'Give two non-therapeutic communication blocks to avoid.', answer: 'False reassurance ("Everything will be fine") and giving advice; also asking "why" and changing the subject.' },
      { question: 'How should the nurse manage a patient in acute mania?', answer: 'Provide a calm, low-stimulation environment and offer high-calorie finger foods so the patient can eat while active.' },
      { question: 'What is neuroleptic malignant syndrome?', answer: 'A life-threatening reaction to antipsychotics: high fever, muscle rigidity, autonomic instability and altered consciousness — stop the drug and treat as an emergency.' }
    ],
    quiz: [
      { question: 'A patient says, "I just feel like there\'s no point anymore." The best response is:', options: ['"Don\'t talk like that, you have so much to live for."', '"Are you having thoughts of harming or killing yourself?"', '"Why do you feel that way?"', '"Let\'s talk about something more positive."'], correctIndex: 1, rationale: 'Directly and calmly assessing for suicidal ideation and a plan is therapeutic and essential for safety. The other options are non-therapeutic blocks.' },
      { question: 'A patient on lithium reports vomiting, coarse tremor and confusion. The nurse suspects:', options: ['Therapeutic effect', 'Lithium toxicity', 'An allergic reaction', 'Normal side effects to ignore'], correctIndex: 1, rationale: 'These are signs of lithium toxicity. Hold the dose, check the level, and notify the physician; lithium has a narrow therapeutic range.' },
      { question: 'The priority intervention for an acutely manic, pacing patient is to:', options: ['Place them in a group activity', 'Provide a low-stimulation environment and portable high-calorie food', 'Apply restraints', 'Confront them firmly in front of peers'], correctIndex: 1, rationale: 'Reducing stimulation calms the manic patient, and portable high-calorie foods meet high metabolic demands while they remain active.' },
      { question: 'Which response is an example of therapeutic communication?', options: ['"I\'m sure everything will be fine."', '"If I were you, I would..."', '"You seem worried. Tell me more about what you\'re feeling."', '"Why are you so upset?"'], correctIndex: 2, rationale: 'Reflecting the patient\'s feeling and inviting them to elaborate is therapeutic. False reassurance, advice, and "why" questions are non-therapeutic.' },
      { question: 'A patient on an antipsychotic develops high fever, severe muscle rigidity and altered consciousness. The nurse recognises:', options: ['Expected sedation', 'Neuroleptic malignant syndrome — a medical emergency', 'Mild dystonia', 'Caffeine withdrawal'], correctIndex: 1, rationale: 'High fever, rigidity, autonomic instability and altered mental status indicate neuroleptic malignant syndrome — stop the drug and treat emergently.' }
    ]
  },
  {
    id: 'infection-community',
    title: 'Infection Control & Community Health',
    subtitle: 'Isolation precautions, asepsis, immunisation, and public-health priorities',
    category: 'Infection Control',
    readingTime: '16 min read',
    examWeight: '~10% of the licensing exam',
    objectives: [
      'Apply the correct transmission-based isolation precautions.',
      'Differentiate medical and surgical asepsis.',
      'Outline UAE immunisation and notifiable-disease principles.',
      'Prevent healthcare-associated infections (HAIs).'
    ],
    sections: [
      {
        title: 'Standard & Transmission-Based Precautions',
        content: 'Standard precautions apply to all patients. Transmission-based precautions are added according to how an organism spreads: contact, droplet or airborne.',
        bullets: [
          'Airborne (e.g., TB, measles, varicella): negative-pressure room + fit-tested N95 respirator.',
          'Droplet (e.g., influenza, meningococcus, pertussis): surgical mask within ~1–2 metres; private room preferred.',
          'Contact (e.g., MRSA, C. difficile): gown and gloves; dedicated equipment. For C. difficile, use soap and water (alcohol gel is not sporicidal).',
          'Standard precautions (hand hygiene, PPE as needed, safe sharps handling) apply to every patient, every time.'
        ]
      },
      {
        title: 'Asepsis & HAI Prevention',
        content: 'Medical asepsis reduces the number of organisms (clean technique); surgical asepsis eliminates them (sterile technique). Preventing device-related infections is a major safety target.',
        bullets: [
          'Hand hygiene is the single most effective measure to prevent infection.',
          'Central lines: chlorhexidine skin antisepsis, full barrier precautions, daily review of need (prevents CLABSI).',
          'Catheters: insert only when indicated and remove early (prevents CAUTI).',
          'Maintain sterile field integrity — anything below the waist or out of sight is considered contaminated.'
        ]
      },
      {
        title: 'Immunisation & Notifiable Diseases',
        content: 'Community and public-health nursing emphasise prevention. UAE newborns receive early vaccinations, and certain diseases must be reported.',
        bullets: [
          'UAE newborns typically receive BCG (tuberculosis) and the first hepatitis B dose before discharge.',
          'Notifiable communicable diseases must be reported to preventive medicine departments (often within 24 hours).',
          'Health promotion and screening reduce chronic-disease burden (e.g., diabetes, hypertension).',
          'Herd immunity protects the vulnerable when vaccination coverage is high.'
        ]
      }
    ],
    flashcards: [
      { question: 'What isolation precautions are required for active pulmonary tuberculosis?', answer: 'Airborne precautions: a negative-pressure isolation room and a fit-tested N95 respirator for staff.' },
      { question: 'Why must hand hygiene for C. difficile use soap and water?', answer: 'Alcohol-based gel does not kill C. difficile spores; mechanical washing with soap and water removes them.' },
      { question: 'Which two vaccines are typically given to UAE newborns before discharge?', answer: 'BCG (tuberculosis) and the first dose of hepatitis B vaccine.' },
      { question: 'Differentiate medical and surgical asepsis.', answer: 'Medical asepsis (clean technique) reduces the number of microorganisms; surgical asepsis (sterile technique) eliminates them entirely.' },
      { question: 'What distance and PPE are used for droplet precautions?', answer: 'A surgical mask within about 1–2 metres of the patient, ideally with a private room.' }
    ],
    quiz: [
      { question: 'A patient with suspected active pulmonary TB requires:', options: ['Standard precautions only', 'Droplet precautions with a surgical mask', 'Airborne precautions with a negative-pressure room and N95', 'Contact precautions with gown and gloves'], correctIndex: 2, rationale: 'TB is airborne; it requires a negative-pressure room and a fit-tested N95 respirator, not a surgical mask.' },
      { question: 'For a patient with Clostridioides difficile, the nurse should:', options: ['Use alcohol hand gel only', 'Wash hands with soap and water and use contact precautions', 'Use airborne precautions', 'No special precautions are needed'], correctIndex: 1, rationale: 'C. difficile forms spores resistant to alcohol gel; soap-and-water hand washing plus contact precautions (gown/gloves) are required.' },
      { question: 'The single most effective measure to prevent healthcare-associated infection is:', options: ['Wearing a gown at all times', 'Hand hygiene', 'Routine antibiotics', 'Daily room disinfection'], correctIndex: 1, rationale: 'Hand hygiene is the most effective single intervention to prevent the spread of infection.' },
      { question: 'Which finding breaks the sterile field?', options: ['Keeping items above waist level', 'A sterile item touching the edge of the drape', 'Facing the sterile field at all times', 'Holding sterile items in front of the body'], correctIndex: 1, rationale: 'The 2.5 cm outer edge of a sterile drape is considered contaminated; anything below the waist or out of sight is also non-sterile.' },
      { question: 'A confirmed case of measles is identified. The nurse must:', options: ['Keep it confidential and take no further action', 'Report it to the preventive medicine department', 'Discharge the patient immediately', 'Wait until the patient recovers to report'], correctIndex: 1, rationale: 'Measles is a notifiable communicable disease and must be reported to public-health authorities, typically within 24 hours.' }
    ]
  }
];

export const MOCK_QUESTIONS: Question[] = [
  // ================= DHA EXAM QUESTIONS (1 to 10) =================
  {
    id: 1,
    question: "A nurse on a cardiovascular unit is assessing a post-operative patient who underwent coronary artery bypass graft (CABG) surgery 12 hours ago. The patient suddenly displays hypotension, distant/muffled heart sounds, distended jugular veins, and a narrowing pulse pressure. What does the nurse identify as the priority medical emergency?",
    options: [
      "Acute pulmonary embolism",
      "Cardiac tamponade (Beck's Triad)",
      "Vaso-vagal syncopal collapse",
      "Hypovolemic hemorrhage shock"
    ],
    correctIndex: 1,
    rationale: "Beck's Triad consists of hypotension, muffled heart tones, and jugular venous distention (JVD). Together with narrowing pulse pressure (pulsus paradoxus), these findings indicate cardiac tamponade, a life-threatening emergency where fluid accumulates in the pericardial sac, compressing the heart. Immediate preparation for pericardiocentesis is required.",
    category: "Cardiovascular Care",
    examType: "DHA"
  } as any,
  {
    id: 2,
    question: "During the administration of a unit of packed red blood cells (PRBCs), the patient suddenly reports lower back pain, feeling cold, and dynpnea. The patient's temperature rises from 36.8°C to 38.4°C. What is the immediate sequence of prioritizing actions?",
    options: [
      "Slow down the infusion speed, administer intravenous paracetamol, and document the vital signs.",
      "Stop the infusion immediately, disconnect the blood tubing, and run normal saline at a keep-vein-open rate through a new infusion line.",
      "Formally notify the blood repository bank, request a urine culture, and perform an immediate ECG.",
      "Administer intramuscular epinephrine and place the patient in Trendelenburg position to support cardiac output."
    ],
    correctIndex: 1,
    rationale: "Lower back pain, chills, and fever during blood transfusion are classic indicators of an acute hemolytic transfusion reaction (ABO incompatibility). The immediate priority is saving the patient from further antigen exposure by stopping the transfusion, disconnecting the blood-set, and keeping the vein open with fresh Normal Saline and new tubing. The blood bag and patient samples are then bagged and sent back to the laboratory.",
    category: "Transfusion Safety",
    examType: "DHA"
  } as any,
  {
    id: 3,
    question: "A physician orders a Dopamine infusion at 5 mcg/kg/min for an adult patient weighing 80 kg. The pharmacy provides a premixed bag containing Dopamine 400 mg in 250 mL of D5W. What rate (mL/hr) should the nurse program into the automated infusion pump?",
    options: [
      "15 mL/hour",
      "24 mL/hour",
      "30 mL/hour",
      "12 mL/hour"
    ],
    correctIndex: 0,
    rationale: "Calculation steps: 1) Double check weight-based dose required: 5 mcg/kg/min * 80 kg = 400 mcg/min. 2) Convert to hourly dose: 400 mcg/min * 60 min/hr = 24,000 mcg/hr. 3) Convert to milligrams: 24,000 mcg / 1000 = 24 mg/hr. 4) Calculate rate: (Desired dose / Have dose) * Total Volume = (24 mg / 400 mg) * 250 mL = 0.06 * 250 = 15 mL/hr.",
    category: "Dosage Calculations",
    examType: "DHA"
  } as any,
  {
    id: 4,
    question: "A patient with traumatic head injury is admitted to the Intensive Care Unit. Which clinical manifestation should the nurse monitor for as the earliest indicator of rising intracranial pressure (ICP)?",
    options: [
      "Development of Cushing's Triad (bradycardia, irregular respirations, severe hypertension)",
      "Unilateral fixed and dilated pupil (blown pupil)",
      "Gradual change or deterioration in the level of consciousness (LOC)",
      "Decerebrate posturing when painful stimuli are applied"
    ],
    correctIndex: 2,
    rationale: "A change or sluggishness in the level of consciousness (such as restlessness, confusion, or increased lethargy) is the absolute earliest and most sensitive indicator of increased intracranial pressure. Cushing's triad, pupillary dilation, and decerebrate posturing are late, ominous signs indicating imminent brainstem herniation.",
    category: "Neurological Systems",
    examType: "DHA"
  } as any,
  {
    id: 5,
    question: "Under the Dubai Health Authority (DHA) clinical standards, what cultural consideration must be secured by the nurse when coordinating pelvic exams for female patients who verbalize Islamic modesty preferences?",
    options: [
      "Politely inform the patient that examiners cannot be selectively assigned due to administrative scheduling.",
      "Arrange for a female clinical examiner chaperone and maximize physical privacy draping.",
      "Cancel the clinic order and document patient non-compliance with the medical care plan.",
      "Require that the patient's male guardian remain in direct physical line of sight during the examination."
    ],
    correctIndex: 1,
    rationale: "Islamic modesty and physical boundaries are highly respected under UAE law and DHA licensing directives. When requested by a female patient, the nurse must prioritize arranging a female examiner/chaperone, maximizing proper draping, and securing structural privacy to build trust and respect cultural values.",
    category: "Ethics & Culture",
    examType: "DHA"
  } as any,
  {
    id: 6,
    question: "The obstetric nurse is managing a delivery when shoulder dystocia is identified (the head delivers but the anterior shoulder becomes wedged behind the symphysis pubis). What is the immediate priority sequence of nursing maneuvers?",
    options: [
      "Initiate high-flow pelvic fundal pressure to push the baby outward.",
      "Reposition key stirrups and perform immediate knee-chest flexion (McRoberts Maneuver) followed by firm suprapubic pressure.",
      "Administer IV oxytocin bolus to increase delivery uterine contractility.",
      "Prepare for emergency Caesarean delivery before performing physical repositioning."
    ],
    correctIndex: 1,
    rationale: "Shoulder dystocia is an acute obstetric emergency. The nurse must immediately perform the McRoberts maneuver (flexing the mother's thighs tightly against her abdomen to widen the pelvic outlet) and apply downward suprapubic pressure to dislodge the wedged shoulder. Traditional fundal pressure is strictly contraindicated as it can rupture the uterus or impact the shoulder further.",
    category: "Maternity Care",
    examType: "DHA"
  } as any,
  {
    id: 7,
    question: "To prevent Central Line-Associated Bloodstream Infections (CLABSI) during dressing changes, which antiseptic agent is recommended under evidence-based guidelines?",
    options: [
      "Isopropyl alcohol 70% alone",
      "Povidone-iodine scrub followed by a sterile water rinse",
      "Chlorhexidine gluconate (2%) with isopropyl alcohol, mapping back-and-forth friction motion",
      "Sterile hydrogen peroxide solution"
    ],
    correctIndex: 2,
    rationale: "Evidence-based guidelines (including DHA and CDC recommendations) mandate skin antisepsis with chlorhexidine gluconate (CHG) with isopropyl alcohol. A friction back-and-forth friction rub for at least 30 seconds is utilized, allowing the site to air-dry completely before applying a chlorhexidine-impregnated patch and transparent dressing.",
    category: "Infection Control",
    examType: "DHA"
  } as any,
  {
    id: 8,
    question: "A patient diagnosed with Bipolar I Disorder is admitted in an acute manic state. The patient is pacing the corridors rapidly and shouting loudly. What is the priority nursing intervention to maintain safety?",
    options: [
      "Confront the patient in front of peers, requiring immediate compliance with quiet room parameters.",
      "Escort the patient to a quiet, low-stimulation environment, and offer high-calorie portable foods.",
      "Incorporate the patient into a structured interactive therapy group to focus cognitive energy.",
      "Obtain clinical orders for physical four-point limb restraints to stabilize hyperactive pacing."
    ],
    correctIndex: 1,
    rationale: "During an acute manic phase, the patient is highly hyperactive and easily overstimulated. Moving them to a calm, low-stimulation quiet setting decreases sensory triggers. Providing portable high-calorie finger foods allows the patient to meet high metabolic demands safely while pacing or moving.",
    category: "Psychiatry Care",
    examType: "DHA"
  } as any,
  {
    id: 9,
    question: "A 4-year-old child presents with drooling, high fever, dyspnea, and is sitting in a 'tripod' position (leaning forward with hands supporting). Epiglottitis is suspected. What action should the pediatric nurse avoid?",
    options: [
      "Assessing the child's throat directly with a tongue blade or swab.",
      "Keeping the child in a calm, seated position on the parent's lap.",
      "Preparing emergency airway equipment (intubation/tracheostomy kit) at the bedside.",
      "Administering humidified oxygen via blow-by tubing."
    ],
    correctIndex: 0,
    rationale: "With suspected acute epiglottitis, any invasive examination of the posterior pharynx (such as using a tongue blade or throat swab) can stimulate severe laryngospasm and lock the airway completely. The child must be kept extremely calm, in a comfortable seated position, with emergency airway systems immediately available at the bedside.",
    category: "Pediatric Core",
    examType: "DHA"
  } as any,
  {
    id: 10,
    question: "The nurse is planning care on a medical ward. Which task is most appropriate for the RN to delegate to a qualified Unlicensed Assistive Personnel (UAP)?",
    options: [
      "Auscultating bowel sounds on a clinical patient with suspected small bowel obstruction.",
      "Assisting a stable post-operative day 3 patient with safe ambulation to the bathroom.",
      "Administering oral antihypertensive medication to a patient with stable vitals.",
      "Teaching a post-stroke patient how to safely utilize a quad-cane device."
    ],
    correctIndex: 1,
    rationale: "Assisting a stable patient with routine ambient ambulation is an appropriate task to delegate to UAP. Tasks requiring clinical judgment (assessment like auscultating bowel sounds), medication delivery, and patient teaching must be completed by the licensed professional nurse.",
    category: "Coordination & Delegation",
    examType: "DHA"
  } as any,

  // ================= MOHAP EXAM QUESTIONS (11 to 20) =================
  {
    id: 11,
    question: "Under the UAE Ministry of Health and Prevention (MOHAP) national immunization guidelines, which primary vaccine is mandatorily administered to all healthy neonates prior to hospital discharge?",
    options: [
      "Measles, Mumps, Rubella (MMR)",
      "Bacille Calmette-Guérin (BCG) and Hepatitis B (Dose 0)",
      "Inactivated Poliovirus Vaccine (IPV)",
      "Diphtheria, Tetanus, Pertussis (DTaP)"
    ],
    correctIndex: 1,
    rationale: "UAE health immunization policies mandate that all healthy newborns receive the BCG (Tuberculosis) vaccine intradermally and the initial Dose 0 of the Hepatitis B vaccine intramuscularly within the first 24-48 hours of life, prior to clinic discharge.",
    category: "Ethics & Regulations",
    examType: "MOH"
  } as any,
  {
    id: 12,
    question: "An adult patient weighing 70 kg is admitted with 30% deep partial-thickness burns on the chest and thighs. Utilizing the Parkland Formula, calculate the total volume of Lactated Ringer's solution required over the first 8 hours post-injury.",
    options: [
      "8,400 mL",
      "4,200 mL",
      "2,100 mL",
      "5,600 mL"
    ],
    correctIndex: 1,
    rationale: "Parkland Formula calculations: Total fluid in 24 hours = 4 mL * Weight (kg) * % Burn Area. Total volume = 4 * 70 * 30 = 8,400 mL of Lactated Ringer's. Under resuscitation parameters, half (50%) of this total volume must be infused over the initial 8 hours: 8,400 mL / 2 = 4,200 mL. The remaining half is infused over the following 16 hours.",
    category: "Emergency Burn Care",
    examType: "MOH"
  } as any,
  {
    id: 13,
    question: "A nurse is preparing a combined dose of Regular Insulin and NPH insulin for a patient with diabetes. To prevent core contamination of the short-acting vial, what is the correct drawing sequence?",
    options: [
      "Draw NPH insulin first, then insert regular and draw second.",
      "Inject air into the NPH insulin, inject air into Regular, draw Regular, then draw NPH insulin ('clear before cloudy').",
      "Draw both insulins into separate syringes and administer as two separate subcutaneous injections.",
      "Inject air into the Regular, draw Regular, inject air into NPH, and draw NPH. ("
    ],
    correctIndex: 1,
    rationale: "To draw mixed insulins ('Clear before Cloudy'): 1) Inject air into NPH (cloudy), 2) Inject air into Regular (clear), 3) Draw Regular (clear), 4) Draw NPH (cloudy). This specific order prevents NPH proteins from entering the Regular insulin bottle, maintaining proper action profiles.",
    category: "Therapeutic Dosing",
    examType: "MOH"
  } as any,
  {
    id: 14,
    question: "A medical nurse experiences an accidental needle-stick injury while disposing of an active needle in a crowded clinic. What is the immediate, non-negotiable first action required of the nurse?",
    options: [
      "Locate the patient's record to check if they have active HIV or Hepatitis profiles.",
      "Wash the needle-puncture wound vigorously with soap and running water.",
      "Proceed immediately to employee health services to obtain post-exposure prophylaxis (PEP).",
      "Squeeze the puncture site firmly to induce bleeding and squeeze out the viral load."
    ],
    correctIndex: 1,
    rationale: "The absolute first action following an accidental sharps or needle-stick injury is rinsing the site immediately under running water and washing thoroughly with standard soap. Squeezing or milking the wound is not recommended as it can cause tissue trauma and increase local exposure. Reporting and PEP protocols follow immediately after skin washing.",
    category: "Occupational Safety",
    examType: "MOH"
  } as any,
  {
    id: 15,
    question: "A patient diagnosed with severe chronic obstructive pulmonary disease (COPD) is admitted with hypoxemia. When organizing low-flow oxygen therapy, why must the nurse avoid exceeding 2 L/min of oxygen via nasal cannula?",
    options: [
      "To prevent drying of nasal mucosa which causes nasal epistaxis.",
      "To prevent oxygen toxicity which can trigger pulmonary fibrosis.",
      "To prevent eliminating the patient's hypoxic drive to breathe.",
      "To prevent acute respiratory alkalosis from rapid hyperventilation."
    ],
    correctIndex: 2,
    rationale: "In chronic hypercapneic respiratory diseases like COPD, the high levels of carbon dioxide no longer stimulate the respiratory center. Instead, breathing is driven by low oxygen levels (hypoxic drive). Administering high concentrations of oxygen eliminates hypoxemia, which can suppress the hypoxic respiratory drive, leading to hypoventilation, CO2 retention, and respiratory arrest.",
    category: "Pulmonary Systems",
    examType: "MOH"
  } as any,
  {
    id: 16,
    question: "A physician prescribes paracetamol suspension 250 mg orally every 6 hours for a pediatric patient weighing 16 kg. The paracetamol suspension bottle is labeled as 120 mg/5 mL. What quantity should the nurse administer for each dose?",
    options: [
      "5.2 mL",
      "10.4 mL",
      "8 mL",
      "12 mL"
    ],
    correctIndex: 1,
    rationale: "Calculation steps: Desired dose = 250 mg. On-hand dose = 120 mg in 5 mL. D/H * V = (250 / 120) * 5 mL = 2.083 * 5 = 10.41 mL (rounded to 10.4 mL per dose).",
    category: "Pediatric Math",
    examType: "MOH"
  } as any,
  {
    id: 17,
    question: "A patient is admitted to a public hospital with suspected active pulmonary Tuberculosis (TB). Which combination of infection control precautions is required under MOHAP patient safety standards?",
    options: [
      "Standard precautions only inside general double-occupancy rooms.",
      "Droplet precautions alone, requiring a surgical mask when entering the client zone.",
      "Airborne precautions, including placement in a Negative Pressure Isolation Room (AIIR) and mandatory N95 respirator use.",
      "Contact isolation precautions, focusing on sterile gowns and gloves upon contact."
    ],
    correctIndex: 2,
    rationale: "Active pulmonary Tuberculosis is caused by Mycobacterium tuberculosis, which is transmitted via micro-aerosols. Airborne precautions are mandatory, which require an Airborne Infection Isolation Room (AIIR) with negative pressure ventilation (12 exchanges per hour) and all staff utilizing a fit-tested particulate respirator (N95 or higher).",
    category: "Infection Control",
    examType: "MOH"
  } as any,
  {
    id: 18,
    question: "On post-operative day 5 following extensive laparotomy, the patient's surgical incision coughs apart. Upon inspection, the nurse notes several loops of bowel protruding through the open wound. What is the priority nursing action sequence?",
    options: [
      "Instruct the patient to remain perfectly calm, cover the organs with sterile gauze soaked in warm normal saline, flex the patient's knees, and notify the surgeon immediately.",
      "Gently compress the organs back into the peritoneal cavity and apply a tight sterile bandage.",
      "Immediately slide the bed into a high-Fowler's position to maximize chest expansions during hyperventilation.",
      "Administer an immediate IM muscle relaxant to relieve muscle spasms around the loops."
    ],
    correctIndex: 0,
    rationale: "Surgical evisceration is an abdominal emergency. The nurse must cover the protruding abdominal contents with sterile, warm, saline-soaked dressings to keep them moist and prevent tissue necrosis. Placing the patient in a low semi-Fowler's position with hips and knees flexed decreases intra-abdominal tension. Forcefully pushing tissue back inside or active positioning triggers bowel rupturing or shock.",
    category: "Post-Operative Care",
    examType: "MOH"
  } as any,
  {
    id: 19,
    question: "Under MOHAP public health reporting guidelines, what is the legal and ethical requirement of the nurse if a patient is diagnosed with a highly communicable illness (Class A infectious disease e.g. Meningococcal Meningitis)?",
    options: [
      "Uphold absolute patient confidentiality by refusing to report the disease to external health divisions.",
      "Politely inform the hospital board and file a mandatory notification to preventive medicine departments within 24 hours.",
      "Request that the patient's relatives legally sign a release of registry information.",
      "File a post-event report strictly on the patient's discharge day."
    ],
    correctIndex: 1,
    rationale: "In the UAE, public health regulations mandate that Class A communicable diseases represent an exception to typical medical secrecy rules. All licensed clinical professionals must report confirmed or suspected Class A cases to preventive medicine departments within 24 hours to track exposure rings and protect public health.",
    category: "Legal & Ethical Practice",
    examType: "MOH"
  } as any,
  {
    id: 20,
    question: "A nurse is caring for an elderly patient who underwent a total left hip arthroplasty (hip replacement) 24 hours ago. Which position is recommended for the patient's left leg to prevent artificial joint prosthesis dislocation?",
    options: [
      "Keep the left leg in a state of high adduction with a standard wedge pillow.",
      "Maintain the left leg in a state of abduction using an abduction splint or pillows.",
      "Allow the left leg to turn fully inward (internal rotation) to relax local tendons.",
      "Position the bed in high Trendelenburg with knees hyperflexed."
    ],
    correctIndex: 1,
    rationale: "Following hip arthroplasty, the nurse must maintain the affected leg in moderate abduction, using a wedge-shaped abduction pillow or pillow configuration. This preserves the femoral head securely inside the acetabular cup. Extreme adduction, flexion past 90 degrees, or internal rotation risk instant displacement of the new prosthetic joint.",
    category: "Geriatric Rehabilitation",
    examType: "MOH"
  } as any,

  // ================= HAAD/DOH EXAM QUESTIONS (21 to 30) =================
  {
    id: 21,
    question: "While looking at a telemetry cardiac strip, the nurse notes rapid, chaotic, irregular, vibrating waves with no visible P-waves, QRS complexes, or T-waves. The adult patient is unconscious, has no pulse, and is not breathing. What is the immediate priority sequence?",
    options: [
      "Begin immediate chest compressions, administer high-flow oxygen, and request a 12-lead ECG.",
      "Activate the code blue team, begin CPR immediately, and apply the defibrillator immediately to deliver an asynchronous shock.",
      "Administer a rapid intravenous bolus of Amiodarone and check electrolyte panels.",
      "Perform immediate synchronised cardioversion at 50 Joules to stabilize sinus nodes."
    ],
    correctIndex: 1,
    rationale: "The strip indicates Ventricular Fibrillation (V-Fib) - a lethal pulseless arrhythmia. Immediate priority is activating emergency responders, starting high-quality chest compressions, and executing rapid defibrillation. Unsynchronized defibrillating shock depolarizes the myocardium to allow the sinus node to resume. Cardioversion is not used in pulseless chaotic rhythms as there are no R-waves to synchronize with.",
    category: "Critical Care",
    examType: "HAAD_DOH"
  } as any,
  {
    id: 22,
    question: "Under the Abu Dhabi Department of Health (DOH/HAAD) clinical protocols, how should a nurse respond to a patient who has a terminal diagnosis, is alert and cognitively intact, and explicitly requests a 'Do Not Resuscitate' (DNR) provision?",
    options: [
      "Explain that under UAE medical regulations, the active family guardian (sponsor) has sole power over resuscitation decisions, regardless of patient wishes.",
      "Honor the patient's verbal request immediately, removing resuscitation codes from the current charts.",
      "Involve the lead physician, organize a clinical consultation board, and document an official, witnessed DNR form signed by the clinical committee.",
      "Politely reject the request as DNR orders are strictly illegal in Abu Dhabi healthcare systems."
    ],
    correctIndex: 2,
    rationale: "DOH Abu Dhabi regulations permit formal 'Do Not Resuscitate' / 'Allow Natural Death' (AND) arrangements for terminal conditions under strictly regulated procedures. This requires a formal medical board review (usually 3 consultant physicians confirming prognosis), a signed document in the medical record, and detailed counseling of the family. A verbal statement alone is insufficient to change a default code state, but it must be immediately elevated to the medical director.",
    category: "Ethics & Legal Core",
    examType: "HAAD_DOH"
  } as any,
  {
    id: 23,
    question: "An emergency nurse is assessing a trauma victim using the Glasgow Coma Scale (GCS). The patient is unresponsive to verbal prompts, but displays decerebrate extension posturing to deep nailbed pressure, opens their eyes ONLY when painful stimuli are applied, and makes incoherent, incomprehensible grunting sounds. What score should the nurse document?",
    options: [
      "GCS Score of 5",
      "GCS Score of 6",
      "GCS Score of 7",
      "GCS Score of 8"
    ],
    correctIndex: 1,
    rationale: "Glasgow Coma Scale evaluation: Eye Opening: 2 (opens only to pain). Verbal Response: 2 (incomprehensible sounds/grunts). Motor Response: 2 (abnormal decerebrate extension posturing). Total GCS = 2 + 2 + 2 = 6.",
    category: "Neurological Trauma",
    examType: "HAAD_DOH"
  } as any,
  {
    id: 24,
    question: "A high-risk labor nurse performing a sterile vaginal exam detects a pulsating umbilical cord protruding into the vagina. What is the immediate priority sequence of nursing maneuvers?",
    options: [
      "Push the protruding loops of cord firmly back through the cervix into the uterine space.",
      "Apply sterile gloved-finger pressure to elevate the fetal presenting part off the cord, assist the patient into a knee-chest or exaggerated Trendelenburg position, and prepare for emergency C-section.",
      "Administer IV Oxytocin to accelerate uterine labor contractions and speed delivery.",
      "Instruct the patient to perform deep bearing-down efforts (Valsalva) to deliver the head quickly."
    ],
    correctIndex: 1,
    rationale: "This represents umbilical cord prolapse - a severe obstetric hazard where the fetus compresses the cord, blocking oxygen delivery. The nurse must hold the presenting part (e.g. head) off the cord with a sterile gloved hand, keep the hand in place, and position the patient in the knee-chest or Trendelenburg position to use gravity to slide the fetus away from the cervix. Immediate emergency Caesarean section is required.",
    category: "Maternity Care",
    examType: "HAAD_DOH"
  } as any,
  {
    id: 25,
    question: "A nurse is performing a vascular assessment on a chronic hemodialysis patient with an active arteriovenous (AV) fistula in the left arm. Which set of findings indicates a healthy and patent fistula?",
    options: [
      "Palpating a continuous rushing thrill over the anastomosis, and auscultating a soft, low-pitched swooshing bruit.",
      "The left arm displays a strong bounding radial pulse, with high visual redness and no auditory sounds.",
      "Auscultating a high-pitched systolic click, and noting a hard thrombus line upon palpation.",
      "Absence of any localized vibrating sensations to minimize skin friction."
    ],
    correctIndex: 0,
    rationale: "A patent arteriovenous (AV) fistula has high turbulent blood flow passing from the artery into the vein. This must display a palpable 'thrill' (vibration) and an audible 'bruit' (turbulent swooshing sound). Absence of thrill or bruit indicates stenosis or clot formation, requiring immediate vascular surgery evaluation. Redness suggests infection, and Blood Pressure cuffs must never be applied to the fistula arm.",
    category: "Renal Systems",
    examType: "HAAD_DOH"
  } as any,
  {
    id: 26,
    question: "A 10-month-old infant is brought to the pediatric emergency clinic with acute gastroenteritis. Which clinical presentation should the nurse identify as indicating a status of moderate dehydration?",
    options: [
      "A crying infant with moist tears, normal anterior fontanelle, and capillary refill of < 2 seconds.",
      "A dry-mouthed, irritable infant displaying a depressed, sunken anterior fontanelle, absence of tears on crying, and decreased wet diaper counts.",
      "An unresponsive, lethargic infant with bradycardia, deeply sunken eyes, cold extremities, and severe skin tenting.",
      "An hyperactive infant requesting high volumes of feeding with normal salivation."
    ],
    correctIndex: 1,
    rationale: "Moderate infant dehydration displays tachycardia, sunken fontanelles, dry mucus linings, decreased diaper counts, and dry, tearless crying. Option A describes a well-hydrated infant. Option C describes severe, life-threatening hypovolemic shock. Option D indicates mild or no metabolic distress.",
    category: "Pediatric Diagnostics",
    examType: "HAAD_DOH"
  } as any,
  {
    id: 27,
    question: "The medical-surgical nurse is managing an active intravenous block of Heparin. The clinical order requires infusing Heparin at a rate of 1,200 units/hour. The medication bag provided by the pharmacy contains Heparin 25,000 units diluted in 250 mL of 0.9% Normal Saline. What rate (mL/hr) must the nurse program into the infusion pump?",
    options: [
      "10 mL/hour",
      "12 mL/hour",
      "15 mL/hour",
      "18 mL/hour"
    ],
    correctIndex: 1,
    rationale: "Calculation steps: Desired Dose = 1,200 units/hour. Infusion concentration: 25,000 units in 250 mL = 100 units/mL. Rate = Desired Dose / Concentration = (1,200 units/hr) / (100 units/mL) = 12 mL/hr.",
    category: "Infusion calculations",
    examType: "HAAD_DOH"
  } as any,
  {
    id: 28,
    question: "A geriatric nurse is reviewing skin ulcers on a patient with chronic immobility. The nurse notes a deep crater-like wound on the sacrum where subcutaneous fat is visible, but muscle fascia, tendons, and bones are NOT exposed. How should the nurse stage this pressure injury?",
    options: [
      "Stage 1 Pressure Injury",
      "Stage 2 Pressure Injury",
      "Stage 3 Pressure Injury",
      "Stage 4 Pressure Injury"
    ],
    correctIndex: 2,
    rationale: "A Stage 3 pressure injury involves full-thickness skin loss. Subcutaneous fat may be visible (crater-like look), but bone, tendon, and muscle are not exposed. Stage 1 is non-blanchable erythema. Stage 2 is partial-thickness skin loss (abrasion/blister). Stage 4 involves exposed bone, tendon, or muscle tissues.",
    category: "Skin Integrity & Wounds",
    examType: "HAAD_DOH"
  } as any,
  {
    id: 29,
    question: "A nurse is preparing to administer the daily dose of Digoxin to a patient with chronic heart failure. Which action is the absolute safety requirement before giving this medication?",
    options: [
      "Check the patient's radial pulse for exactly 15 seconds, and hold the dose if the pulse exceeds 100 bpm.",
      "Auscultate the patient's apical pulse for a full 60 seconds, and hold the dose if the heart rate is below 60 bpm.",
      "Confirm that the patient's blood pressure reads a systolic value above 135 mmHg.",
      "Require that the patient drink at least 250 mL of water before swallowing the capsule."
    ],
    correctIndex: 1,
    rationale: "Digoxin increases myocardial contractility while slowing electrical conduction through the AV node, which decreases heart rate. The nurse must check the apical pulse for 1 full minute. If the heart rate is below 60 beats per minute in an adult, the dose must be held and the physician notified to prevent severe bradycardia and digoxin toxicity.",
    category: "Pharmacology & Safety",
    examType: "HAAD_DOH"
  } as any,
  {
    id: 30,
    question: "A patient undergoing active intravenous chemotherapy infusion for leukemia complains of severe burning and stinging at the peripheral IV insertion site. The nurse identifies swollen, blanched tissue around the line. What is the immediate priority sequence of nursing actions?",
    options: [
      "Slow down the rate of the chemotherapy pump, apply a warm wet compress, and reassess in one hour.",
      "Stop the infusion immediately, do NOT remove the IV cannula, aspirate any residual drug from the catheter, check for specific antidote orders, and notify the oncologist.",
      "Quickly pull the IV catheter out to stop skin exposure and apply direct high-pressure compression to the site.",
      "Dilute the chemotherapy drug by flushing the line with 10 mL of standard heparin block flush."
    ],
    correctIndex: 1,
    rationale: "Burning, stinging, blanching, and swelling indicate extravasation of a vesicant drug (chemotherapy). The immediate priority is stopping the pump to halt tissue damage. The cannula should be left in place to allow aspiration of any remaining drug and potential infusion of a local antidote. Pulling the line out immediately or flushing/diluting can cause further tissue necrosis or spread the drug into deeper tissue.",
    category: "Oncology & Safety",
    examType: "HAAD_DOH"
  } as any
];

