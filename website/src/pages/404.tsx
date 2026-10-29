import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

export default function NotFound(): ReactNode {
  return (
    <Layout title="Page not found">
      <main className="container margin-vert--xl">
        <Heading as="h1">Page not found</Heading>
        <p>That URL is not in Awesome Newsletters.</p>
        <p>
          Try the <Link to="/">home page</Link>,{' '}
          <Link to="/docs/">docs</Link>, or{' '}
          <Link to="/explore">Explore</Link>.
        </p>
      </main>
    </Layout>
  );
}
