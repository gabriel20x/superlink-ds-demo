import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from '@rollup/plugin-postcss';
import image from '@rollup/plugin-image';
import typescript from '@rollup/plugin-typescript';

export default {
  input: {
    index: 'src/index.ts',
    assets: 'src/assets/index.ts',
  },
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      interop: 'auto',
    },
    {
      dir: 'dist',
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    peerDepsExternal(),

    // 1) Let Rollup resolve your .css imports…
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.png'],
      preferBuiltins: true,
    }),

    // 2) Turn CommonJS modules into ES modules
    commonjs({
      include: /node_modules/,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),

    // 3) Then handle CSS modules
    postcss({
      modules: true,
      extensions: ['.css'],
      extract: true,      // emits a separate CSS file
      minimize: true,
      sourceMap: true,
    }),

    // 4) Inline any imported images
    image(),

    // 5) Finally, compile TS → JS
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['**/__tests__', '**/*.test.ts'],
      compilerOptions: {
        module: 'ESNext',
        declaration: true,
        declarationMap: true,
        sourceMap: true,
        jsx: 'react-jsx',
        target: 'ES2020',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      },
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react-hook-form',
    '@hookform/resolvers',
    'zod',
  ],
};
