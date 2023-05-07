import type { Preview } from '@storybook/react'
import * as NextImage from 'next/image'
import React, { Suspense, useEffect } from 'react'
import DocsTemplate from '../src/stories/DocsTemplate.mdx'
import '../src/styles/globals.scss'
import i18n from './i18next'
import { I18nextProvider } from 'react-i18next'

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
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#100e19' },
        { name: 'darkSoft', value: '#353147' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    docs: {
      page: DocsTemplate,
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
