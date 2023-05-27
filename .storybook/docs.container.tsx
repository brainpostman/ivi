import React, { FC } from 'react'
import { MDXProvider } from '@mdx-js/react'
import {
  DocsContainer,
  DocsContainerProps,
  Title,
  Description,
  Primary,
  Controls,
} from '@storybook/blocks'
import CodeLink from '../src/components/Storybook/CodeLink/CodeLink'

interface IContext {
  attachedCSFFile: {
    meta: {
      parameters: {
        docs: {
          codeLink?: string
        }
      }
    }
  }
}

export const MyDocsContainer: FC<DocsContainerProps> = props => {
  const defaultCodeLink = 'http://github.com/Hapnees/ivi'

  const context = props.context as unknown as IContext

  const codeLink =
    context.attachedCSFFile.meta.parameters.docs.codeLink || defaultCodeLink

  return (
    <MDXProvider>
      <DocsContainer {...props}>
        <Title />
        <CodeLink href={codeLink} />
        <Description />
        <Primary />
        <Controls />
      </DocsContainer>
    </MDXProvider>
  )
}
