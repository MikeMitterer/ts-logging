/**
 * Using Rollup - what do to first:
 *    - yarn add -D @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-replace @rollup/plugin-typescript rollup
 *    - Change "module" in tsconfig.lib.json to esnext
 *    - Add script to package.json: "build:rup": "rollup -c",
 */

import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace'

import pkg from './package.json' assert { type: 'json' };

// 'rollup-plugin-scss' hat immer zur Fehlermeldung:
//
//   Can't find stylesheet to import.
//   ╷
//   │ @import "~@mmit/styles/css/mobiad";
//   │         ^^^^^^^^^^^^^^^^^^^^^^^^^^
//
// geführt...
import css from 'rollup-plugin-css-porter';
import sass from 'rollup-plugin-sass';

import image from '@rollup/plugin-image';

const name = "logging"

const lib = {
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
        sass(),
        css(),
        replace({
            preventAssignment: true,
            __buildVersion__: pkg.version
        }),
        typescript({
            // typescript: require('typescript'),
            // module: 'esnext',
            //
            // declaration: true,
            // declarationDir: './lib/types/',
            rootDir: './src/main',
            outDir: './lib',
            module: 'esnext',
            tsconfig: "tsconfig.lib.json",
        }),
    ]
};

/**
 * Wird eigentlich nicht benötigt umd am [ 2023 05 10 ] als proof of concept gewertet.
 */
const dist = {
    // this is the entry file, this should expose our API
    input: 'src/browser/index.ts',

    // this is where the bundled javascript file will be put
    output: [{
        name,
        dir: `./dist`,
        format: 'esm', // the preferred format
        preserveModules: true,
        sourcemap: true,
    }],
    // Unterdrückt die Meldung:
    //      (!) Unresolved dependencies
    external: [
        // ...Object.keys(pkg.dependencies || {}),
        // "fs",
        '@mmit/muni', 'chai'
    ],
    plugins: [
        // scss({
        //     includePaths: [
        //         './node_modules/',
        //     ]
        // }),
        sass(),
        css(),
        image(),

        replace({
            preventAssignment: true,
            __buildVersion__: pkg.version
        }),
        typescript({
            // typescript: require('typescript'),
            // module: 'esnext',
            //
            // declaration: true,
            // declarationDir: './lib/types/',
            tsconfig: "tsconfig.lib.json",
            rootDir: './src',
            outDir: './dist',
            module: 'esnext',
            include: [
                "src/main/index.ts",
                "src/main/**/*.ts",
                "src/browser/*.ts",
                "src/browser/**/*.ts",
                "src/site/images/typings.d.ts",
                "src/types/*.d.ts"
            ]

        }),
    ]
};

// with using an array, we can create multiple bundled javascript files
export default [
    lib /*, dist*/
];
