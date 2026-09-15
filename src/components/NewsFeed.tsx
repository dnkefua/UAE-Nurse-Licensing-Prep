import { useEffect, useState } from 'react';
import { ExternalLink, Newspaper, RefreshCw } from 'lucide-react';
import { apiJson } from '../lib/api';
import { safeExternalUrl } from '../lib/readable';

type Tab = 'all' | 'africa' | 'global' | 'nursing' | 'video';
type NewsItem = { title: string; snippet: string; url: string; thumbnail: string; source: string; flag: string; region: string; publishedAt: string; type: 'article' | 'video' };
const tabs: { id: Tab; label: string }[] = [{ id: 'all', label: 'Top stories' }, { id: 'africa', label: 'Africa' }, { id: 'global', label: 'Global' }, { id: 'nursing', label: 'Nursing' }, { id: 'video', label: 'Videos' }];

function parseItems(value: unknown): NewsItem[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap(item => {
    if (!item || typeof item !== 'object') return [];
    const data = item as Record<string, unknown>; const url = safeExternalUrl(typeof data.url === 'string' ? data.url : '');
    if (!url || typeof data.title !== 'string' || !data.title.trim()) return [];
    return [{ title: data.title.slice(0, 300), snippet: typeof data.snippet === 'string' ? data.snippet.slice(0, 500) : '', url,
      thumbnail: safeExternalUrl(typeof data.thumbnail === 'string' ? data.thumbnail : '') || '', source: typeof data.source === 'string' ? data.source.slice(0, 100) : 'Publisher',
      flag: typeof data.flag === 'string' ? data.flag : '', region: typeof data.region === 'string' ? data.region : 'global',
      publishedAt: typeof data.publishedAt === 'string' ? data.publishedAt : '', type: data.type === 'video' ? 'video' as const : 'article' as const }];
  });
}

export default function NewsFeed() {
  const [tab, setTab] = useState<Tab>('all'); const [items, setItems] = useState<NewsItem[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading'); const [refresh, setRefresh] = useState(0);
  useEffect(() => { let alive = true; setState('loading');
    apiJson<{ items: unknown }>(`/api/news?tab=${encodeURIComponent(tab)}`).then(data => { if (alive) { setItems(parseItems(data.items)); setState('ready'); } }).catch(() => { if (alive) setState('error'); });
    return () => { alive = false; };
  }, [tab, refresh]);
  return <div className="space-y-5"><header><h2 className="text-xl font-bold flex gap-2 items-center"><Newspaper className="w-5 h-5 text-blue-700" />Health news and learning resources</h2><p className="text-xs text-slate-600 mt-1">Publisher feeds supplied for convenience. Headlines and links are not reviewed or endorsed by this app.</p></header>
    <div className="flex gap-2 overflow-x-auto">{tabs.map(item => <button key={item.id} aria-pressed={tab === item.id} onClick={() => setTab(item.id)} className={`px-4 py-2 rounded-xl whitespace-nowrap ${tab === item.id ? 'bg-blue-700 text-white' : 'bg-white border'}`}>{item.label}</button>)}<button onClick={() => setRefresh(value => value + 1)} className="p-2 border rounded-xl" aria-label="Refresh feed"><RefreshCw className="w-4 h-4" /></button></div>
    {state === 'loading' && <p role="status" className="p-5">Loading publisher feeds…</p>}{state === 'error' && <p role="alert" className="p-5 bg-rose-50 border border-rose-200 rounded-xl">The feed is temporarily unavailable. Please try again later.</p>}
    {state === 'ready' && items.length === 0 && <p className="p-5 bg-slate-100 rounded-xl">No items are available from the selected feeds right now.</p>}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map((item, index) => <article key={`${item.url}-${index}`} className="bg-white border rounded-2xl overflow-hidden shadow-sm">{item.thumbnail && <img src={item.thumbnail} alt="" loading="lazy" referrerPolicy="no-referrer" className="w-full h-40 object-cover" onError={event => { event.currentTarget.hidden = true; }} />}<div className="p-4 space-y-2"><p className="text-[11px] text-slate-500">{item.flag} {item.source}{item.publishedAt ? ` · ${new Date(item.publishedAt).toLocaleDateString('en-AE')}` : ''}</p><h3 className="font-bold leading-snug">{item.title}</h3>{item.snippet && <p className="text-sm text-slate-600 line-clamp-3">{item.snippet}</p>}<a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 text-sm text-blue-800 underline"><ExternalLink className="w-4 h-4" />Open on publisher site (new tab)</a></div></article>)}</div>
  </div>;
}
