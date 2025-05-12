import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';

export default {
  input: {
    index: 'src/index.ts',
    assets: 'src/assets/index.ts'
  },
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      interop: 'auto'
    },
    {
      dir: 'dist',
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.css'],
      preferBuiltins: true
    }),
    commonjs({
      include: /node_modules/,
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    image(),
    postcss({
      modules: true,
      extract: true,
      minimize: true,
      sourceMap: true
    }),
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
        lib: ['ES2020', 'DOM', 'DOM.Iterable']
      }
    })
  ],
  external: ['react', 'react-dom', 'react-hook-form', '@hookform/resolvers', 'zod']
};
