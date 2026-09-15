/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { ACADEMY_MENTORS } from '../data/staticData';

export default function Consultation() {
  const [topic, setTopic] = useState('');
  const [availability, setAvailability] = useState('');
  const email = ACADEMY_MENTORS[0].email;
  const body = `Hello Academy team,\n\nI would like to enquire about a consultation.\nTopic: ${topic.trim()}\nPreferred availability and time zone: ${availability.trim() || 'To discuss'}\n\nPlease let me know whether support is available and any fees or next steps.`;
  const href = `mailto:${email}?subject=${encodeURIComponent('Consultation enquiry — Centered Nurse Academy')}&body=${encodeURIComponent(body)}`;

  return (
    <section className="space-y-6 text-slate-900 max-w-2xl">
      <h2 className="text-xl font-bold">Request a consultation</h2>
      <p className="text-sm text-slate-700">
        Contact the academy to ask about study support. This page does not book appointments,
        provide live chat, or connect you to an educator. Availability, fees, and any meeting
        arrangements must be confirmed directly by the academy.
      </p>
      <div className="space-y-4 bg-white border border-slate-200 rounded-2xl p-6">
        <div>
          <label htmlFor="consultation-topic" className="block text-sm font-semibold mb-2">What would you like help with?</label>
          <textarea id="consultation-topic" value={topic} onChange={e => setTopic(e.target.value)}
            maxLength={1500} rows={4} className="w-full border border-slate-300 rounded-lg p-3"
            aria-describedby="consultation-privacy" />
        </div>
        <div>
          <label htmlFor="consultation-availability" className="block text-sm font-semibold mb-2">Preferred availability and time zone (optional)</label>
          <input id="consultation-availability" value={availability} onChange={e => setAvailability(e.target.value)}
            maxLength={200} className="w-full border border-slate-300 rounded-lg p-3" />
        </div>
        <p id="consultation-privacy" className="text-sm text-slate-700">Include only study-related information. Do not include patient details, identity documents, or other sensitive information.</p>
        <a href={href} className="inline-flex items-center gap-2 bg-blue-700 text-white rounded-xl px-4 py-3 font-semibold">
          <Mail aria-hidden="true" className="w-4 h-4" /> Open email draft
        </a>
        <p className="text-sm text-slate-700">
          Opens your email app with a draft addressed to {email}. Review and send it yourself.
          Opening the draft does not send a request or confirm a booking. If no email app opens,
          you can write to this address manually.
        </p>
      </div>
    </section>
  );
}
