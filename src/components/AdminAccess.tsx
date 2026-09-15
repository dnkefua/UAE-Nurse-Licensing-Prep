import React, { useCallback, useEffect, useState } from 'react';
import { Copy, RefreshCw, ShieldCheck, UserMinus, UserPlus } from 'lucide-react';
import { apiJson } from '../lib/api';

type Member = { uid: string; email: string | null; status: 'active' | 'revoked' | 'pending' };

export default function AdminAccess() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const activeCount = members.filter(member => member.status === 'active').length;
  const pendingCount = members.filter(member => member.status === 'pending').length;

  const load = useCallback(async () => {
    try {
      const data = await apiJson<{ members: Member[] }>('/api/admin/members');
      setMembers(data.members);
    } catch { setMessage('The tester list could not be loaded. Refresh your sign-in and try again.'); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const invite = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage(''); setCode('');
    try {
      const data = await apiJson<{ code: string }>('/api/admin/invites', { method: 'POST', body: JSON.stringify({ email }) });
      setCode(data.code); setEmail(''); setMessage('A one-time, email-bound invite was created. It expires in seven days.');
    } catch { setMessage('The invite could not be created. Confirm the address and try again.'); }
    finally { setBusy(false); }
  };

  const revoke = async (member: Member) => {
    if (!confirm(`Revoke access for ${member.email || member.uid}?`)) return;
    setBusy(true); setMessage('');
    try {
      if (member.status === 'pending') await apiJson('/api/admin/invites/revoke-email', { method: 'POST', body: JSON.stringify({ email: member.email }) });
      else await apiJson('/api/admin/revoke', { method: 'POST', body: JSON.stringify({ uid: member.uid }) });
      setMessage(member.status === 'pending' ? 'Pending invitation was revoked.' : 'Tester access was revoked.'); await load();
    } catch { setMessage('Access could not be revoked.'); }
    finally { setBusy(false); }
  };

  return <section className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm space-y-5" aria-labelledby="tester-access-title">
    <div className="flex items-center justify-between gap-4">
      <div><h2 id="tester-access-title" className="font-bold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-amber-600" />Tester access</h2>
        <p className="text-xs text-slate-600 mt-1">One membership list. Invites are unique, email-bound, single-use, and revocable.</p></div>
      <button type="button" onClick={() => void load()} className="p-2 rounded-lg border" aria-label="Refresh tester list"><RefreshCw className="w-4 h-4" /></button>
    </div>
    <form onSubmit={invite} className="flex flex-col sm:flex-row gap-2">
      <label className="sr-only" htmlFor="tester-email">Tester email</label>
      <input id="tester-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tester@example.com" className="flex-1 p-3 border rounded-xl" />
      <button disabled={busy} className="p-3 rounded-xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2"><UserPlus className="w-4 h-4" />Create invite</button>
    </form>
    {code && <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <p className="text-xs font-semibold">Copy this code and send it only to the address entered:</p>
      <div className="mt-2 flex gap-2"><code className="flex-1 break-all bg-white p-2 rounded border select-all">{code}</code>
        <button type="button" onClick={() => void navigator.clipboard.writeText(code)} className="p-2 border rounded-lg" aria-label="Copy invite code"><Copy className="w-4 h-4" /></button></div>
    </div>}
    {message && <p role="status" className="text-sm text-slate-700">{message}</p>}
    <div className="overflow-x-auto"><table className="w-full text-sm">
      <caption className="text-left font-semibold pb-2">One tester list — {activeCount} active, {pendingCount} pending, {members.length} total records</caption>
      <thead><tr className="border-b text-left"><th className="py-2">Email</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
      <tbody>{members.map(member => <tr key={member.uid} className="border-b"><td className="py-3">{member.email || member.uid}</td><td>{member.status}</td><td className="text-right">
        {(member.status === 'active' || member.status === 'pending') && <button type="button" disabled={busy} onClick={() => void revoke(member)} className="p-2 text-rose-700" aria-label={`Revoke ${member.email || member.uid}`}><UserMinus className="w-4 h-4" /></button>}
      </td></tr>)}</tbody>
    </table></div>
  </section>;
}
