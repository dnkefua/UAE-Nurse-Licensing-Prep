/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

/** Only absolute HTTP(S) destinations without embedded credentials are linkable. */
export function safeExternalUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password
      ? url.href : null;
  } catch {
    return null;
  }
}

// Kept for callers of the former reader. No network requests or HTML extraction.
export interface ReadableMeta { image: string; author: string; siteName: string; title: string; published: string; }
export interface ReadableResult { html: string | null; meta: ReadableMeta; finalUrl: string; }
export async function fetchReadableContent(url: string): Promise<ReadableResult> {
  return {
    html: null,
    meta: { image: '', author: '', siteName: '', title: '', published: '' },
    finalUrl: safeExternalUrl(url) || '',
  };
}

export function InAppArticle({ url, sourceName, label = 'Source details' }: {
  url: string; sourceName: string; label?: string; key?: React.Key;
}) {
  const destination = safeExternalUrl(url);
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-sm text-slate-700">
      <p>{label}: source content is available on {sourceName}. This app does not import or verify that page.</p>
      {destination ? (
        <a href={destination} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center text-blue-800 underline">
          <ExternalLink aria-hidden="true" className="w-4 h-4" /> Open {sourceName} (new tab)
        </a>
      ) : <p>Source link unavailable: the address is not a supported web URL.</p>}
    </div>
  );
}

/** Focus entry, containment, Escape dismissal, and restoration for portal dialogs. */
export function useModalAccessibility(
  ref: React.RefObject<HTMLDivElement | null>,
  onClose: () => void,
  enabled = true,
) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!enabled || !ref.current) return;
    const dialog = ref.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = (): HTMLElement[] => (Array.from(dialog.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )) as HTMLElement[]).filter(element => element.getClientRects().length > 0);
    (focusable()[0] || dialog).focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeRef.current();
      }
      if (event.key === 'Tab') {
        const elements = focusable();
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (!first) { event.preventDefault(); dialog.focus(); return; }
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
          event.preventDefault(); first.focus();
        }
      }
    };
    const containFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialog.contains(event.target)) (focusable()[0] || dialog).focus();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', containFocus);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', containFocus);
      document.body.style.overflow = previousOverflow;
      if (previous?.isConnected) previous.focus();
    };
  }, [enabled, ref]);
}
