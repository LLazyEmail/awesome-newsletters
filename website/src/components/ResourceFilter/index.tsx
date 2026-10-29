import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import catalog from '@site/src/data/catalog.json';
import type {CatalogPayload} from '@site/src/data/types';

import styles from './styles.module.css';

const data = catalog as CatalogPayload;

export default function ResourceFilter(): ReactNode {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data.items ?? []).filter((item) => {
      if (selectedTags.length > 0) {
        const hasAll = selectedTags.every((t) => item.tags.includes(t));
        if (!hasAll) return false;
      }
      if (!q) return true;
      const hay = `${item.name} ${item.description} ${item.url} ${item.tags.join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, selectedTags]);

  const tags = data.tags?.length ? data.tags : [];

  return (
    <div>
      <div className={styles.filterBar}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search newsletters, tools, articles…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search catalog"
        />
      </div>
      {tags.length > 0 && (
        <div className={styles.tagRow} role="group" aria-label="Filter by tag">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={clsx(
                styles.tagChip,
                selectedTags.includes(tag) && styles.tagChipActive,
              )}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <p className={styles.count}>
        {filtered.length} result{filtered.length === 1 ? '' : 's'}
        {data.items?.length ? ` of ${data.items.length}` : ''}
      </p>
      <ul className={styles.results}>
        {filtered.slice(0, 200).map((item) => (
          <li key={`${item.id}-${item.url}`} className={styles.resultItem}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
            {item.description ? <> — {item.description}</> : null}
            <div className={styles.resultMeta}>
              {item.section}
              {item.sourcePage ? (
                <>
                  {' · '}
                  <Link to={item.sourcePage}>source</Link>
                </>
              ) : null}
              {item.tags?.length ? ` · ${item.tags.join(', ')}` : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
