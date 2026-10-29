import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Awesome Newsletters',
  tagline:
    'A curated collection of newsletter directories, articles, tools, and resources.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://llazyemail.github.io',
  baseUrl: '/awesome-newsletters/',
  trailingSlash: false,

  organizationName: 'LLazyEmail',
  projectName: 'awesome-newsletters',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap',
      type: 'text/css',
    },
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
        indexBlog: true,
        searchBarShortcutHint: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/LLazyEmail/awesome-newsletters/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {type: ['rss', 'atom'], xslt: true},
          editUrl:
            'https://github.com/LLazyEmail/awesome-newsletters/tree/main/website/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        name: 'description',
        content:
          'Curated newsletter directories, articles, growth tactics, templates, and tools.',
      },
      {
        name: 'keywords',
        content:
          'newsletters, email marketing, list building, monetization, HTML email, awesome list',
      },
      {property: 'og:type', content: 'website'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Awesome Newsletters',
      logo: {
        alt: 'Awesome Newsletters Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Resources',
        },
        {
          to: '/explore',
          label: 'Explore',
          position: 'left',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/LLazyEmail/awesome-newsletters',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://github.com/LLazyEmail/awesome-email-marketing',
          label: 'Email Marketing list',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Overview', to: '/docs/'},
            {label: 'Directories', to: '/docs/directories'},
            {label: 'Catalog API', href: 'https://llazyemail.github.io/awesome-newsletters/api/v1/catalog.json'},
            {label: 'Growth tactics', to: '/docs/growth'},
            {label: 'Templates', to: '/docs/templates'},
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/LLazyEmail/awesome-newsletters',
            },
            {
              label: 'Contributing',
              href: 'https://github.com/LLazyEmail/awesome-newsletters/blob/main/CONTRIBUTING.md',
            },
            {
              label: 'Awesome Email Marketing',
              href: 'https://github.com/LLazyEmail/awesome-email-marketing',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LLazyEmail. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
