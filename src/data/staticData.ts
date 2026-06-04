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
    subtitle: 'Understanding DHA, MOH, and DOH/HAAD professional standards',
    category: 'Ethics & Regulations',
    sections: [
      {
        title: 'UAE Nursing Professional Scope & Practice Standards',
        content: 'Nurses practicing in the UAE must adhere to strict clinical boundaries authorized under Federal Decree-Law No. (10) of 2008 and respective health authorities (DHA, MOHAP, DOH). Practice covers assessment, care formulation, nursing interventions, and evaluation.',
        bullets: [
          'Professional Registry: All clinical staff must maintain active licensing with their regulating authority.',
          'Sovereign Cultural Respect: Nursing duties must uphold multi-national cultural parameters and respects patient dignity according to Islamic values.',
          'Informed Consent: UAE jurisprudence places strong emphasis on direct written consent for invasive procedures, usually coordinated via head surgeons or clinical directors.'
        ]
      },
      {
        title: 'Patient Privacy & Confidentiality (UAE Law Mandates)',
        content: 'Disclosure of medical records without direct patient authorization or legal mandate is strictly prohibited. The UAE Penal Code and Federal Health Data Protection systems protect patient charts across both electronic networks and standard folders.',
        bullets: [
          'Confidentiality: Keeping information private is a primary duty except when required to prevent public infectious harm.',
          'Incident Reporting: Sentinel events (e.g., medication errors with harm, wrong-site surgeries) must be reported to the quality board within 24 hours.'
        ]
      }
    ],
    flashcards: [
      {
        question: "What is the primary federal regulation governing nursing practice boundaries in the UAE?",
        answer: "Federal Decree-Law No. (10) of 2008 concerning medical liability and nursing regulations."
      },
      {
        question: "Under UAE Healthcare Law, when can a patient's medical details be disclosed without explicit consent?",
        answer: "Only for mandatory reporting of communicable diseases (e.g., TB, COVID-19) to respective regulatory bodies (MOHAP, DHA, DOH) to protect public health."
      },
      {
        question: "What health authority regulates medical licensing specifically in the Emirate of Dubai?",
        answer: "DHA (Dubai Health Authority)."
      }
    ]
  },
  {
    id: 'med-surg',
    title: 'Medical-Surgical Core Nursing Systems',
    subtitle: 'Electrolytes, Acute Cardiac Emergencies, and Renal Management',
    category: 'Clinical Core',
    sections: [
      {
        title: 'Cardiovascular Systems & Shock Protocols',
        content: 'Recognizing early symptoms of Hypovolemic, Cardiogenic, and Anaphylactic shock is essential. The nurse should quickly prioritize hemodynamic stability, oxygen supplement guidelines, and access validation for emergency infusions.',
        bullets: [
          'Hypovolemic Shock: Early signs include tachycardia, cold/clammy skin, decreased urine output, and narrowing pulse pressure.',
          'Myocardial Infarction: Priority interventions are MONA protocol (Morphine, Oxygen, Nitroglycerin, Aspirin) as delegated, with instant ECG reading.'
        ]
      },
      {
        title: 'Fluid & Electrolyte Core Distortions',
        content: 'Electrolyte control is critical for metabolic stability. Pay close attention to Potassium, Sodium, and Calcium discrepancies which carry elevated risk of neuromuscular or cardiac arrest complications.',
        bullets: [
          'Hyperkalemia (> 5.0 mEq/L): Causes tall, peaked T-waves, widened QRS. Administer calcium gluconate to stabilize myocardium, followed by insulin/dextrose or Kayexalate.',
          'Hypokalemia (< 3.5 mEq/L): Shows flat T-waves, prominent U-waves. Never administer Potassium via IV push; always use a secondary regulated pump.'
        ]
      }
    ],
    flashcards: [
      {
        question: "What is the immediate priority nursing action for a patient experiencing suspected anaphylactic shock?",
        answer: "Ensure a patent airway, place the patient in supine position with legs elevated, and administer IM Epinephrine (1:1000) as ordered."
      },
      {
        question: "Why should Potassium Chloride (KCl) never be administered via direct intravenous push?",
        answer: "IV push of concentrated Potassium Chloride triggers instant cardiac arrest. It must always be diluted and infused slowly via automated perfusion pump."
      },
      {
        question: "Which ECG change is most characteristic of severe hyperkalemia?",
        answer: "Tall, symmetrical peaked T-waves, followed by prolongation of the PR interval and widening of the QRS complex."
      }
    ]
  },
  {
    id: 'maternity-pediatrics',
    title: 'Maternity Care & Pediatric Milestones',
    subtitle: 'Labor pathways, postpartum safety, and child assessment metrics',
    category: 'Maternity & Child Care',
    sections: [
      {
        title: 'Maternal Assessment: Postpartum Hemorrhage (PPH)',
        content: 'PPH is defined as blood loss > 500 mL following vaginal birth or > 1000 mL following a Caesarean section. Uterine atony is the leading cause. Frequent fundal checks are required to assess tone.',
        bullets: [
          'Fundal Massage: The primary action for a boggy (atonic) uterus to stimulate contractility and control bleeding.',
          'Pharmacology: Oxytocin (Pitocin) infusion is the first-line medication, followed by Methylergonovine (Methergine) if un-contraindicated (avoid in hypertension).'
        ]
      },
      {
        title: 'Pediatric Development & APGAR System',
        content: 'The APGAR score is measured at 1 and 5 minutes post-delivery. Scoring assesses Heart Rate, Respiratory Effort, Muscle Tone, Reflex Irritability, and Color, with each receiving 0-2 points.',
        bullets: [
          'Score 7 - 10: Indicates normal infant adjustment transition.',
          'Score 4 - 6: Moderate distress, requiring tactile stimulation and oxygen mask.',
          'Score 0 - 3: Severe distress, requiring immediate neonatologist-led resuscitation.'
        ]
      }
    ],
    flashcards: [
      {
        question: "What is the lead nursing intervention for a postpartum patient presenting with a soft, boggy uterus and excessive lochia?",
        answer: "Perform immediate external fundal massage to stimulate contraction of the uterine muscle fibers."
      },
      {
        question: "At 1 minute, a newborn has a HR of 110 bpm, slow/irregular crying, some flexion of extremities, active grimace, and body pink with blue hands/feet. What is the APGAR score?",
        answer: "6 (HR: 2, Resp: 1, Tone: 1, Reflex: 1, Color: 1)."
      }
    ]
  },
  {
    id: 'pharmacology',
    title: 'High-Alert Pharmacology & Dosage Calculations',
    subtitle: 'Dosage formulation math and safety constraints',
    category: 'Pharmacology',
    sections: [
      {
        title: 'Dosage Calculation Core Logic',
        content: 'Calculating accurate IV flow rates and oral dosage ranges is the nurse’s defense against medication incidents. Always double-check pediatric weight-based calculations against toxic thresholds.',
        bullets: [
          'Flow Rate (gtt/min): (Volume in mL × Drop Factor) ÷ Time in minutes.',
          'Infusion Rate (mL/hr): Total Volume in mL ÷ Total Time in hours.'
        ]
      },
      {
        title: 'Anticoagulation & Insulin Management Guidelines',
        content: 'High-alert medications require dual clinical confirmation before administration. Always track matching laboratory diagnostic thresholds to guarantee patient safety.',
        bullets: [
          'Heparin: Monitor Activated Partial Thromboplastin Time (aPTT). The antidote is Protamine Sulfate.',
          'Warfarin (Coumadin): Monitor Prothrombin Time (PT) and International Normalized Ratio (INR). The antidote is Vitamin K.'
        ]
      }
    ],
    flashcards: [
      {
        question: "What is the antidote for a patient showing clinical signs of Heparin overdose?",
        answer: "Protamine Sulfate."
      },
      {
        question: "Calculate the drip rate: Infuse 1000 mL of 0.9% Normal Saline over 8 hours using a microdrip tubing set (60 gtt/mL).",
        answer: "125 gtt/min. (1000 mL × 60) ÷ (8 hours × 60 mins) = 1000 ÷ 8 = 125."
      },
      {
        question: "What is the critical laboratory test used to monitor therapeutic therapeutic levels of Warfarin?",
        answer: "INR (International Normalized Ratio), aiming for a target therapeutic range of 2.0 to 3.0 in standard conditions."
      }
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

