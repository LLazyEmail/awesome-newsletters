import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  to: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Directories & roundups',
    to: '/docs/directories',
    description: (
      <>Curated “best of” lists and directories of newsletters to subscribe to or study.</>
    ),
  },
  {
    title: 'Growth & monetization',
    to: '/docs/growth',
    description: (
      <>Demand Curve tactics, list-building ideas, and ways creators monetize newsletters.</>
    ),
  },
  {
    title: 'Templates & tooling',
    to: '/docs/templates',
    description: (
      <>HTML email guides, boilerplates, and GitHub repos for building newsletter templates.</>
    ),
  },
];

function Feature({title, to, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Link to={to}>{title}</Link>
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
