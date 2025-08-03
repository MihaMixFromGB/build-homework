import esbuild from 'esbuild';

const options = {
    entryPoints: {
        entry: 'src/entry.js',
        performance: 'src/performance.js',
    },
    bundle: true,
    outdir: 'dist/esbuild',
    platform: 'browser',
    format: 'esm'
};

esbuild.build(options).catch(() => process.exit(1))
