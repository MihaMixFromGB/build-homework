import fs from "node:fs";
import path from "node:path";

const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const { imports } = packageJSON;
const aliasesToResolve = Object.keys(imports);
const rootDir = path.resolve(".");

const extensionsToResolve = ["js", "ts", "json"];

export function resolve(importPath, parentPath) {
  if (importPath.startsWith('#')) return resolveAlias(importPath);
  return resolveRelative(importPath, parentPath);
}

function resolveRelative(importPath, parentPath) {
  const fullPath = path.join(path.dirname(parentPath), importPath);
  return resolveExtension(fullPath);
}

function resolveAlias(importPath) {
  const alias = aliasesToResolve.find((alias) => importPath.startsWith(alias.slice(0, -1)));
  if (!alias) return null;
  const relativePath = importPath.replace(alias.slice(0, -1), imports[alias].slice(0, -1));
  const fullPath = path.join(rootDir, relativePath);
  return resolveExtension(fullPath);
}

function resolveExtension(modulePath) {
  const baseExtension = path.extname(modulePath);
  if (baseExtension) return isFileExists(modulePath);

  const extension = extensionsToResolve.find((extension) => isFileExists(path.join(`${modulePath}.${extension}`)));
  if (!extension) return null;
  return path.join(`${modulePath}.${extension}`);
}

function isFileExists(filePath) {
  try {
    fs.readFileSync(filePath);
    return filePath;
  } catch (err) {
    return null;
  }
}
