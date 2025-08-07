import yaml from 'yaml';

export default function YamlLoader(source) {
    const data = yaml.parse(source);
    return `export default ${JSON.stringify(data)};`;
}