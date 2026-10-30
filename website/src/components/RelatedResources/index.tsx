import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

export type RelatedLink = {
  label: string;
  to?: string;
  href?: string;
};

type Props = {
  title?: string;
  links: RelatedLink[];
};

export default function RelatedResources({
  title = 'Related resources',
  links,
}: Props): ReactNode {
  if (!links?.length) return null;
  return (
    <aside className="margin-top--lg">
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to}>{link.label}</Link>
            ) : (
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
