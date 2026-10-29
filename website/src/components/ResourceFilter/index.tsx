import type {ReactNode} from 'react';
import catalog from '@site/src/data/catalog.json';
import type {CatalogPayload} from '@site/src/data/types';

const data = catalog as CatalogPayload;

export default function ResourceFilter(): ReactNode {
  return (
    <div>
      <p>
        Catalog loaded with {(data.items ?? []).length} items.
        Merge the ResourceFilter component PR for full tag search UI.
      </p>
      <ul>
        {(data.items ?? []).slice(0, 25).map((item) => (
          <li key={`${item.id}-${item.url}`}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
