import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/journey-widget.js',
  output: {
    file: 'dist/journey-widget.iife.js',
    format: 'iife',
    name: 'JourneyWidget',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
  ],
};
