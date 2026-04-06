import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default [
	{
		input: 'lib/index.ts',
		output: {
			dir: 'dist/esm',
			format: 'es',
			entryFileNames: '[name].mjs',
			assetFileNames: '[name].mjs'
		},
		external: ['axios', '@vvo/tzdb', 'tinycolor2', 'valid-url', 'chrono-node'],
		plugins: [
			typescript({
				tsconfig: './tsconfig.json',
				exclude: ['**/__tests__/**/*']
			}),
			json(),
		]
	},
	{
		input: 'lib/index.ts',
		output: {
			dir: 'dist/cjs',
			format: 'cjs'
		},
		external: ['axios', '@vvo/tzdb', 'tinycolor2', 'valid-url', 'chrono-node'],
		plugins: [
			typescript({
				tsconfig: './tsconfig-cjs.json',
				exclude: ['**/__tests__/**/*']
			}),
			json(),
		]
	}
]