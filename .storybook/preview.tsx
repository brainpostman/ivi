import type { Preview } from '@storybook/react'
import * as NextImage from 'next/image'
import React, { Suspense, useEffect } from 'react'
import '../src/styles/globals.scss'
import i18n from './i18next'
import { I18nextProvider } from 'react-i18next'
import iviTheme from './themes/ivi.theme'
import lightTheme from './themes/light.theme'
import { MyDocsContainer } from './docs.container'
import { DocsContainer } from '@storybook/blocks'

const BREAKPOINTS = {
  xxs: 320,
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS).map(([key, value], index) => {
    return [
      key,
      {
        name: key,
        styles: {
          width: `${value}px`,
          height: `${(index + 5) * 10}vh`,
        },
      },
    ]
  })
)

const OriginalNextImage = NextImage.default
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />,
})

const withI18next = (Story, context) => {
  const { locale } = context.globals

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  )
}

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
      showName: true,
    },
  },
}

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['UI', ['Buttons', 'InputFields', 'Carousels', 'Cards']],
      },
    },
    darkMode: {
      current: iviTheme,
      dark: iviTheme,
      light: lightTheme,
    },
    viewport: { viewports: customViewports },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#100e19' },
        { name: 'darkSoft', value: '#353147' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    docs: {
      container: MyDocsContainer,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const decorators = [withI18next]
export default preview
