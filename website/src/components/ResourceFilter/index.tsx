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

/** Results rendered per "Show more" click. The full catalog is always searchable. */
export const PAGE_SIZE = 100;

export default function ResourceFilter(): ReactNode {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
    setVisible(PAGE_SIZE);
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
  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className={styles.filterBar}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search newsletters, tools, articles…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(PAGE_SIZE);
          }}
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
        {shown.length < filtered.length ? ` · showing ${shown.length}` : ''}
      </p>
      <ul className={styles.results}>
        {shown.map((item) => (
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
      {shown.length < filtered.length && (
        <div className={styles.moreRow}>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Show {Math.min(PAGE_SIZE, filtered.length - shown.length)} more
          </button>{' '}
          <button
            type="button"
            className="button button--link"
            onClick={() => setVisible(filtered.length)}>
            Show all {filtered.length}
          </button>
        </div>
      )}
    </div>
  );
}
