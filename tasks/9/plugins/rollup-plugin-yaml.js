import fs from 'node:fs';
import yaml from 'yaml';

export default function yamlLoader() {
    return {
        name: 'yaml-loader',
        transform(_, id) {
            if (!/\.ya?ml$/.test(id)) return null;
            
            const data = yaml.parse(fs.readFileSync(id, 'utf-8'));
            const code = `export default ${JSON.stringify(data)};`;
            
            return { code, map: null };
        }
    }
}