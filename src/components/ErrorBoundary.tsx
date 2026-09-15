import React from 'react';
import { apiJson } from '../lib/api';

export default class ErrorBoundary extends React.Component<{ children?: React.ReactNode }, { failed: boolean }> {
  declare readonly props: Readonly<{ children?: React.ReactNode }>;
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() {
    // Never transmit component state, study content, email addresses, or stack traces.
    void apiJson('/api/client-error', { method: 'POST', body: JSON.stringify({ code: 'ui-render', message: 'A screen could not render.' }) }).catch(() => {});
  }
  render() {
    return this.state.failed ? <main className="p-8 max-w-xl mx-auto space-y-4" role="alert">
      <h1 className="text-2xl font-bold">This screen could not load</h1>
      <p>Your saved progress is still available. Reload the app to try again.</p>
      <button onClick={() => location.reload()} className="rounded-xl bg-blue-700 text-white p-3">Reload app</button>
      <a className="block underline" href="/help.html">Get help</a>
    </main> : this.props.children;
  }
}
