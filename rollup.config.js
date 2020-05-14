import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';

module.exports = [
    {
        input: {
            node: 'src/index.js'
        },
        output: {
            dir: 'dist',
            format: 'es',
            sourcemap: true
        },
        watch: {
            include: 'src/**',
        },
        external: [
            'path',
            'fs',
            'crypto',
            'util',
            'tty',
            'os',
            'readline',
            'stream',
            'assert',
            'http',
            'https',
            'zlib',
            'url',
            'string_decoder',
            'events',
            'buffer',
            'constants',
            'readable-stream',
            '@flowscripter/cli-framework'
        ],
        plugins: [
            eslint({
                include: [
                    'src/**/*.js'
                ]
            }),
            commonjs(),
            resolve(),
            cleanup({ extensions: ['js'] })
        ]
    }
];
