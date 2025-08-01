import fs from "node:fs";
import path from "node:path";

/**
 * Примерный алгоритм работы бандлера:
 * 1. Прочитать entry и собрать список всех вызовов require
 * 2. Пройтись по полученным require (они могут быть вложенными)
 * 3. На выходе получится массив с исходным кодом всех модулей
 * 4. Склеить всё воедино обернув модули и entry в новый рантайм
 * 
 * Для чтения файлов используйте fs.readFileSync
 * Для резолва пути до модуля используйте path.resolve (вам нужен путь до родителя, где был вызван require)
 * Пока что сборщик упрощен, считаем что require из node_modules нет
 */

const bundle_modules = new Map();

const TEMPLATE_MODULES = `
  const __modules__ = {
    <MODULES>
  }
`;
const TEMPLATE_MODULE = `
  '<NAME>': () => {
    <CODE>
  }
`;
const __REQUIRE__ = `
  function __require__(module) {
    return __modules__[module]();
  }
`;

/**
 * @param {string} entryPath - путь к entry бандлинга
 */
export function bundle(entryPath) {
  buildTreeDeps(entryPath);
  return __REQUIRE__ + writeModules() + writeEntry(entryPath);
}

function buildTreeDeps(entryPath, module) {
  const code = fs.readFileSync(entryPath, "utf-8");
  bundle_modules.set(module ?? entryPath, code);

  if (code.includes("require")) {
    const requireCalls = searchRequireCalls(code);
    requireCalls.forEach((item) => {
      const modulePath = resolve(entryPath, item);
      buildTreeDeps(modulePath, item);
    });
  }
}

function writeEntry(entryPath) {
  return addRuntime(bundle_modules.get(entryPath));
}

function writeModules() {
  const modules = Array.from(bundle_modules.keys())
    .slice(1)
    .map((item) => writeModule(item))
    .join(",");
  return TEMPLATE_MODULES.replace(/<MODULES>/, modules);
}

function writeModule(module) {
  const code = addRuntime(bundle_modules.get(module));
  const output = TEMPLATE_MODULE
    .replace(/<NAME>/, module)
    .replace(/<CODE>/, code);
  return output;
}

function resolve(entryPath, module) {
  return path.resolve(path.dirname(entryPath), module);
}

function addRuntime(code) {
  return code
    .replace(/require/g, "__require__")
    .replace(/module.exports =/g, "return");;
}

/**
 * Функция для поиска в файле вызовов require
 * Возвращает id модулей
 * @param {string} code 
 */
function searchRequireCalls(code) {
  return [...code.matchAll(/require\(('|")(.*)('|")\)/g)].map(
    (item) => item[2]
  );
}