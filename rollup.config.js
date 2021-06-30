/**
 * Using Rollup - what do to first:
 *    - yarn add -D @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-replace @rollup/plugin-typescript rollup
 *    - Change "module" in tsconfig.lib.json to esnext
 *    - Add script to package.json: "build:rup": "rollup -c",
 */

import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace'

import pkg from './package.json' // Convert CommonJS modules to ES6

const name = "logging"

const incrementalDependencyLoader = {
    // this is the entry file, this should expose our API
    input: 'src/main/index.ts',
    // this is where the bundled javascript file will be put
    output: [{
        name,
        dir: `./lib`,
        format: 'esm', // the preferred format
        preserveModules: true,
        sourcemap: true,
    }],
    // Unterdrückt die Meldung:
    //      (!) Unresolved dependencies
    external: [
        // ...Object.keys(pkg.dependencies || {}),
        // "fs",
    ],
    plugins: [
        replace({
            preventAssignment: true,
            __buildVersion__: pkg.version
        }),
        typescript({
            typescript: require('typescript'),
            // module: 'esnext',
            //
            // declaration: true,
            // declarationDir: './lib/types/',
            rootDir: './src/main',
            
            tsconfig: "tsconfig.lib.json",
        }),
    ]
};

// with using an array, we can create multiple bundled javascript files
export default [
    incrementalDependencyLoader
];
