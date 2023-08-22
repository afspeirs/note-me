import MarkdownToJSX from 'markdown-to-jsx';

import { classNames } from '@/utils/classNames';
import { RendererLink } from './RendererLink';
import { MarkdownProps } from './types';

export function Markdown({
  children,
}: MarkdownProps) {
  return (
    <MarkdownToJSX
      className={classNames(
        'w-full h-full px-4 pt-1 pb-safe-offset-4 overflow-auto prose dark:prose-invert',
        'prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0 prose-a:text-link',
        'prose-ol:m-0 prose-ul:m-0 prose-li:relative prose-li:my-1',
      )}
      options={{
        disableParsingRawHTML: true,
        forceWrapper: true,
        overrides: {
          a: RendererLink,
          input: {
            props: {
              className: 'absolute -left-5 top-2 m-0 accent-primary',
            },
          },
        },
      }}
    >
      {children}
    </MarkdownToJSX>
  );
}
