import fs from 'node:fs';
import yaml from 'yaml';

export default function yamlLoader() {
    return {
        name: 'yaml-loader',
        setup(build) {
            build.onLoad({ filter: /\.ya?ml$/ }, ({ path }) => {
                const data = yaml.parse(fs.readFileSync(path, 'utf-8'));
                return {
                    contents: `export default ${JSON.stringify(data)}`,
                };
            });
        },
    }
}