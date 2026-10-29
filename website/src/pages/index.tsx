import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import MetricsStrip from '@site/src/components/MetricsStrip';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/">
            Browse resources
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/explore"
            style={{marginLeft: '0.75rem'}}>
            Explore catalog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Awesome Newsletters"
      description="Curated newsletter directories, articles, tools, and resources.">
      <HomepageHeader />
      <MetricsStrip />
      <main>
        <HomepageFeatures />
        <section className={styles.features}>
          <div className="container">
            <p>
              Sister list:{' '}
              <a href="https://github.com/LLazyEmail/awesome-email-marketing">
                Awesome Email Marketing
              </a>
              . Source of truth for links lives in the repository{' '}
              <code>README.md</code>; docs pages mirror those sections.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
