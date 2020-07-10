import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

module.exports = {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'navbar',
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [['@babel/preset-react']],
    }),
    resolve(),
    commonjs(),
    replace({
      // for React dependency
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    terser(),
  ],
};
