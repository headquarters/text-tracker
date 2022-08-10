import type { RollupOptions } from 'rollup';

import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';

const config: RollupOptions = {
  input: 'dist/src/TextTracker.js',
  output: {
    file: 'demo/TextTrackerIIFE.js',
    format: 'iife',
    name: 'TextTracker',
  },
  preserveEntrySignatures: 'strict',
  plugins: [
    // Resolve bare module specifiers to relative paths
    resolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts'],
    }),
    // Minify HTML template literals
    minifyHTML(),
    // Minify JS
    terser({
      ecma: 2020,
      module: true,
    }),
    // Print bundle summary
    summary(),
  ],
};

export default config;
