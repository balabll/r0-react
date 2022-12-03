import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const pagPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist = false) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pagPath}/${pkgName}`;
}

export function getPackageJson(pkgName) {
	// package.json路径
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf-8' });

	return JSON.parse(str);
}

export function getBaseRolluoPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}
