import generatePackageJson from 'rollup-plugin-generate-package-json';
import { getPackageJson, resolvePkgPath, getBaseRolluoPlugins } from './utils';

const { name } = getPackageJson('react');
// react包的路径
const pkgPath = resolvePkgPath(name);
// 产物路径
const distPath = resolvePkgPath(name, true);

export default [
	// react
	{
		input: `${pkgPath}/index.ts`,
		output: {
			file: `${distPath}/index.ts`,
			name: 'react',
			format: 'umd'
		},
		plugins: [
			...getBaseRolluoPlugins(),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: distPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// jsx
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			// jsx-runtime
			{
				file: `${distPath}/jsx-runtime.ts`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			// jsx-dev-runtime
			{
				file: `${distPath}/jsx-dev-runtime.ts`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: getBaseRolluoPlugins()
	}
];
