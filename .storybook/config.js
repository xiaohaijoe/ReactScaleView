import { configure, addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

//指定story的位置
const req = require.context('../src/stories', true, /\.stories\.(js|mdx)$/);
function loadStories() {
  req.keys().map(fileName => req(fileName));
}

configure(loadStories, module);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
