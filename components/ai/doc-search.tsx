'use client';

import { useState } from 'react';

type Result = {
  id: string;
  title: string;
  slug: string;
  path: string;
  similarity: number;
};

export default function DocSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  async function onSearch() {
    setLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const json = await res.json();
      setResults(json.results || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 border rounded-l p-2"
          placeholder="Search the docs…"
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="px-4 bg-blue-600 text-white rounded-r"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      <ul className="space-y-2">
        {results.map(r => (
          <li key={r.id}>
            <a
              href={`/docs/${r.slug}`}
              className="block p-4 bg-white rounded shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">{r.title}</h3>
                <span className="text-sm text-gray-500">
                  {(r.similarity * 100).toFixed(1)}%
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{r.path}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
