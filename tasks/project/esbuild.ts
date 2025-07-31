import esbuild, {type BuildOptions} from 'esbuild';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';

const options = {
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outdir: 'dist/esbuild',
    publicPath: '/esbuild/',
    platform: 'browser',
    format: 'esm',
    loader: {
    '.ts': 'tsx',
    '.tsx': 'tsx',
    '.css': 'css',
    },
    plugins: [
        htmlPlugin({
            files: [{
                entryPoints: [
                    'src/index.tsx',
                ],
                filename: 'index.html',
                htmlTemplate: `
                <html>
                  <head>
                    <title>TODO App</title>
                  </head>
                  <body>
                    <div id="root"></div>
                  </body>
                </html>
                `,
            }]
        }),
    ],
} satisfies BuildOptions;

esbuild.build(options).catch(() => process.exit(1))
