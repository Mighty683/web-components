import { resolve } from 'path';

/** @type {import('vite').UserConfig} */

export default {
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'web-components',
      fileName: 'index',
    },
  },
};
