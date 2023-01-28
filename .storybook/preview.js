// .storybook/preview.js

import '../styles/globals.css'
import './font.css'
import * as NextImage from 'next/image'
import { themes } from '@storybook/theming'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: '#0D2237', appContentBg: '#0D2237' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'white' },
    darkClass: 'dark',
    lightClass: 'light',
    classTarget: 'html',
    stylePreview: true,
  },
}
