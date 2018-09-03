// rollup.config.js
import commonjs    from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	input: 'src/js/index.js',
	output: {
		file: 'lib/js/bundle.js',
		format: 'iife',
		name: 'game',
	},
	plugins: [
		nodeResolve({
			jsnext: true,
			main: true,
		}),
		commonjs(),
	]
};
