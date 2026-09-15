import { useState } from 'react';
import type { User } from 'firebase/auth';
import { reload, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { auth, logoutUser } from '../lib/firebase';
import { apiJson } from '../lib/api';

export default function Account({ user }: { user: User }) {
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('general');
  const [busy, setBusy] = useState(false);
  const run = async (action: () => Promise<void>) => { setBusy(true); setMessage(''); try { await action(); } catch { setMessage('That action could not be completed. Please try again.'); } finally { setBusy(false); } };

  return <div className="max-w-2xl space-y-6">
    <section className="bg-white border rounded-2xl p-6 space-y-3"><h2 className="text-xl font-bold">Account & privacy</h2>
      <p className="text-sm"><strong>Email:</strong> {user.email}</p><p className="text-sm"><strong>Email verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
      {!user.emailVerified && <button disabled={busy} onClick={() => void run(async () => { await sendEmailVerification(user); setMessage('Verification email sent.'); })} className="p-3 bg-blue-700 text-white rounded-xl">Send verification email</button>}
      <button disabled={busy || !user.email} onClick={() => void run(async () => { await sendPasswordResetEmail(auth, user.email!); setMessage('Password-reset email sent.'); })} className="p-3 border rounded-xl ml-2">Reset password</button>
      <button disabled={busy} onClick={() => void run(async () => { await reload(user); location.reload(); })} className="p-3 border rounded-xl ml-2">Refresh account</button>
    </section>
    <section className="bg-white border rounded-2xl p-6 space-y-3"><h3 className="font-bold">Send feedback or report content</h3>
      <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border rounded-xl"><option value="general">General</option><option value="bug">Bug</option><option value="content">Content correction</option><option value="community">Community safety</option></select>
      <textarea value={feedback} onChange={e => setFeedback(e.target.value)} maxLength={2000} rows={5} className="w-full p-3 border rounded-xl" placeholder="Do not include patient or sensitive personal information." />
      <button disabled={busy || !feedback.trim()} onClick={() => void run(async () => { await apiJson('/api/feedback', { method: 'POST', body: JSON.stringify({ category, message: feedback }) }); setFeedback(''); setMessage('Feedback received.'); })} className="p-3 bg-slate-900 text-white rounded-xl">Submit feedback</button>
    </section>
    <section className="bg-rose-50 border border-rose-200 rounded-2xl p-6 space-y-3"><h3 className="font-bold text-rose-900">Delete account</h3>
      <p className="text-sm text-rose-900">This permanently queues deletion of your profile, attempts, posts, comments, sessions, membership, and sign-in account. You may be asked to sign in again first.</p>
      <button disabled={busy} onClick={() => { if (confirm('Permanently delete your account and app data? This cannot be undone.')) void run(async () => { await apiJson('/api/account/delete', { method: 'POST', body: '{}' }); await logoutUser(); }); }} className="p-3 bg-rose-700 text-white rounded-xl">Permanently delete account</button>
      <p className="text-xs"><a className="underline" href="/delete-account.html" target="_blank">Deletion details and support</a> · <a className="underline" href="/privacy">Privacy policy</a> · <a className="underline" href="/terms.html">Terms</a></p>
    </section>
    {message && <p role="status" className="rounded-xl bg-slate-100 p-3">{message}</p>}
  </div>;
}
