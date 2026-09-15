import { auth } from './firebase';
import { Capacitor } from '@capacitor/core';

const API_ORIGIN = Capacitor.isNativePlatform() ? 'https://uae-nurse-licensing-prep-feb76.web.app' : '';

/** All API traffic carries the current Firebase identity; membership is checked by the server. */
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (!path.startsWith('/api/')) throw new Error('Invalid API path.');
  const user = auth.currentUser;
  if (!user) throw new Error('Please sign in to continue.');
  const token = await user.getIdToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);
  if (init.body) headers.set('Content-Type', 'application/json');
  try {
    const response = await fetch(`${API_ORIGIN}${path}`, { ...init, headers, signal: init.signal ?? AbortSignal.timeout(60000) });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const fallback = response.status === 429 ? 'Please wait a little before trying again.' : 'Request failed. Please try again.';
      throw new Error(typeof data.error === 'string' ? data.error : fallback);
    }
    return response;
  } catch (error) {
    if (error instanceof DOMException && /Timeout|Abort/.test(error.name)) throw new Error('The connection timed out. Please retry.');
    throw error;
  }
}

export async function apiJson<T = Record<string, unknown>>(path: string, init: RequestInit = {}): Promise<T> {
  return (await apiFetch(path, init)).json();
}
