// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Sprig Docs',
  tagline: 'Sprig is a game console where every user is a creator. Made by teenagers @ Hack Club.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://sprig.hackclub.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hackclub', // Usually your GitHub org/user name.
  projectName: 'sprig', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Sprig Docs',
        logo: {
          alt: 'Sprig Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/hackclub/sprig',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Sprig',
            items: [
              {
                label: 'Docs',
                to: '/docs/intro',
              },
              {
                label: 'Gallery',
                href: 'https://sprig.hackclub.com/gallery'
              },
              {
                label: 'Editor',
                href: 'https://sprig.hackclub.com/editor'
              }
            ],
          },
          {
            title: 'Hack Club',
            items: [
              {
                label: 'Website',
                href: 'https://hackclub.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/hackclub',
              },
              {
                label: 'Slack',
                href: 'https://hackclub.com/slack',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Hack Club. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
